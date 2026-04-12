import { NextResponse } from "next/server";

export const runtime = "nodejs";
const DEFAULT_ALERT_EMAIL = "KyleDChristopher@gmail.com";
const HUBSPOT_ACCESS_TOKEN =
  process.env.HUBSPOT_PRIVATE_APP_TOKEN || process.env.HUBSPOT_ACCESS_TOKEN;
const HUBSPOT_NOTES_PROPERTY =
  process.env.HUBSPOT_CALLCAPTURE_NOTES_PROPERTY ||
  process.env.HUBSPOT_NOTES_PROPERTY ||
  "";
const HUBSPOT_SOURCE_PROPERTY =
  process.env.HUBSPOT_CALLCAPTURE_SOURCE_PROPERTY ||
  process.env.HUBSPOT_SOURCE_PROPERTY ||
  "";
const HUBSPOT_SOURCE_VALUE = "callcapture_trial_form";

type TrialRequestBody = {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

function buildInternalEmailHtml(body: Required<TrialRequestBody>) {
  return `
    <h2>New CallCapture trial request</h2>
    <p><strong>Full name:</strong> ${body.fullName}</p>
    <p><strong>Company name:</strong> ${body.companyName || "Not provided"}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Phone:</strong> ${body.phone}</p>
    <p><strong>Notes:</strong> ${body.notes || "Not provided"}</p>
  `;
}

async function sendInternalNotification(body: Required<TrialRequestBody>) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const alertEmail =
    process.env.CALLCAPTURE_TRIAL_ALERT_EMAIL || DEFAULT_ALERT_EMAIL;
  const fromEmail = process.env.CALLCAPTURE_TRIAL_FROM_EMAIL;

  if (!resendApiKey || !alertEmail || !fromEmail) {
    throw new Error("Missing required CallCapture trial email environment variables.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Kyle <${fromEmail}>`,
      to: [alertEmail],
      reply_to: body.email,
      subject: `New CallCapture trial request${body.companyName ? ` - ${body.companyName}` : ` - ${body.fullName}`}`,
      html: buildInternalEmailHtml(body),
    }),
    cache: "no-store",
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error?.message ||
      `Resend request failed with status ${response.status}.`;

    throw new Error(message);
  }
}

async function upsertHubSpotContact(body: Required<TrialRequestBody>) {
  if (!HUBSPOT_ACCESS_TOKEN) {
    return { configured: false };
  }

  const [firstName = "", ...rest] = body.fullName.split(/\s+/);
  const lastName = rest.join(" ");
  const properties: Record<string, string> = {
    email: body.email,
    firstname: firstName,
    lastname: lastName,
    company: body.companyName || "",
    phone: body.phone,
  };

  if (HUBSPOT_NOTES_PROPERTY) {
    properties[HUBSPOT_NOTES_PROPERTY] = body.notes || "No notes provided";
  }

  if (HUBSPOT_SOURCE_PROPERTY) {
    properties[HUBSPOT_SOURCE_PROPERTY] = HUBSPOT_SOURCE_VALUE;
  }

  const searchResponse = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts/search",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: body.email,
              },
            ],
          },
        ],
        properties: ["email"],
        limit: 1,
      }),
      cache: "no-store",
    }
  );

  const searchPayload = await searchResponse.json().catch(() => null);

  if (!searchResponse.ok) {
    throw new Error(
      searchPayload?.message ||
        `HubSpot search failed with status ${searchResponse.status}.`
    );
  }

  const existingId = searchPayload?.results?.[0]?.id;
  const endpoint = existingId
    ? `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`
    : "https://api.hubapi.com/crm/v3/objects/contacts";
  const method = existingId ? "PATCH" : "POST";

  const upsertResponse = await fetch(endpoint, {
    method,
    headers: {
      Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
    cache: "no-store",
  });

  const upsertPayload = await upsertResponse.json().catch(() => null);

  if (!upsertResponse.ok) {
    throw new Error(
      upsertPayload?.message ||
        `HubSpot upsert failed with status ${upsertResponse.status}.`
    );
  }

  return {
    configured: true,
    id: upsertPayload?.id || existingId || null,
  };
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/trial" });
}

export async function POST(request: Request) {
  try {
    const rawBody = (await request.json()) as TrialRequestBody;
    const body = {
      fullName: rawBody?.fullName?.toString().trim() ?? "",
      companyName: rawBody?.companyName?.toString().trim() ?? "",
      email: rawBody?.email?.toString().trim().toLowerCase() ?? "",
      phone: rawBody?.phone?.toString().trim() ?? "",
      notes: rawBody?.notes?.toString().trim() ?? "",
    };

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete the required fields before submitting.",
        },
        { status: 400 }
      );
    }

    await sendInternalNotification(body);

    try {
      const hubspotResult = await upsertHubSpotContact(body);
      if (hubspotResult.configured) {
        console.log("CallCapture HubSpot contact synced.", {
          email: body.email,
          id: hubspotResult.id,
        });
      }
    } catch (hubspotError) {
      console.error("CallCapture HubSpot sync failed.", hubspotError);
    }

    return NextResponse.json({
      success: true,
      message: "Lead request received. We’ll follow up with next steps.",
    });
  } catch (error) {
    console.error("CallCapture trial submission failed.", error);

    return NextResponse.json(
      {
        success: false,
        message: "We couldn't submit the request just now. Please try again.",
      },
      { status: 500 }
    );
  }
}
