import { NextResponse } from "next/server";

export const runtime = "nodejs";

const HUBSPOT_API_BASE = "https://api.hubapi.com";
const HUBSPOT_SOURCE = "callcapture_trial_form";

type TrialRequestBody = {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

type ContactProperties = Record<string, string>;

function splitName(fullName: string) {
  const trimmed = fullName.trim();

  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  const [firstName, ...rest] = trimmed.split(/\s+/);

  return {
    firstName,
    lastName: rest.join(" "),
  };
}

function buildContactProperties(body: Required<TrialRequestBody>): ContactProperties {
  const { firstName, lastName } = splitName(body.fullName);
  const properties: ContactProperties = {
    email: body.email,
    firstname: firstName || body.fullName,
    phone: body.phone,
  };

  if (lastName) {
    properties.lastname = lastName;
  }

  if (body.companyName) {
    properties.company = body.companyName;
  }

  const notesProperty = process.env.HUBSPOT_CALLCAPTURE_NOTES_PROPERTY;
  if (notesProperty && body.notes) {
    properties[notesProperty] = body.notes;
  }

  const sourceProperty = process.env.HUBSPOT_CALLCAPTURE_SOURCE_PROPERTY;
  if (sourceProperty) {
    properties[sourceProperty] = HUBSPOT_SOURCE;
  }

  return properties;
}

async function hubspotFetch(
  path: string,
  init: RequestInit,
  token: string
) {
  const response = await fetch(`${HUBSPOT_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.category ||
      `HubSpot request failed with status ${response.status}.`;

    throw new Error(message);
  }

  return payload;
}

async function findExistingContactId(email: string, token: string) {
  const payload = await hubspotFetch(
    "/crm/v3/objects/contacts/search",
    {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: email,
              },
            ],
          },
        ],
        limit: 1,
        properties: ["email"],
      }),
    },
    token
  );

  return payload?.results?.[0]?.id?.toString() ?? null;
}

async function upsertHubSpotContact(
  properties: ContactProperties,
  email: string,
  token: string
) {
  const existingContactId = await findExistingContactId(email, token);

  if (existingContactId) {
    const payload = await hubspotFetch(
      `/crm/v3/objects/contacts/${existingContactId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ properties }),
      },
      token
    );

    return {
      action: "updated",
      contactId: payload?.id?.toString() ?? existingContactId,
    };
  }

  const payload = await hubspotFetch(
    "/crm/v3/objects/contacts",
    {
      method: "POST",
      body: JSON.stringify({ properties }),
    },
    token
  );

  return {
    action: "created",
    contactId: payload?.id?.toString() ?? null,
  };
}

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
  const alertEmail = process.env.CALLCAPTURE_TRIAL_ALERT_EMAIL;
  const fromEmail = process.env.CALLCAPTURE_TRIAL_FROM_EMAIL;

  if (!resendApiKey || !alertEmail || !fromEmail) {
    return { attempted: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [alertEmail],
      reply_to: body.email,
      subject: `New CallCapture trial request${body.companyName ? ` - ${body.companyName}` : ` - ${body.fullName}`}`,
      html: buildInternalEmailHtml(body),
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error?.message ||
      `Resend request failed with status ${response.status}.`;

    throw new Error(message);
  }

  return { attempted: true };
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

    const hubspotToken =
      process.env.HUBSPOT_PRIVATE_APP_TOKEN ||
      process.env.HUBSPOT_ACCESS_TOKEN;

    if (!hubspotToken) {
      console.error(
        "CallCapture trial submission is missing HubSpot private app credentials."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Lead intake is not configured yet. Please contact us directly while we finish setup.",
        },
        { status: 500 }
      );
    }

    const properties = buildContactProperties(body);
    const hubspotResult = await upsertHubSpotContact(
      properties,
      body.email,
      hubspotToken
    );

    try {
      await sendInternalNotification(body);
    } catch (error) {
      console.error("CallCapture trial notification email failed.", error);
    }

    return NextResponse.json({
      success: true,
      message: "Lead request received. We’ll follow up with next steps.",
      contactId: hubspotResult.contactId,
      action: hubspotResult.action,
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
