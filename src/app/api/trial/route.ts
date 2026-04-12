import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
  const alertEmail = process.env.CALLCAPTURE_TRIAL_ALERT_EMAIL;
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
      from: fromEmail,
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
