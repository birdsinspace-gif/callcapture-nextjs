import nodemailer from "nodemailer";

const BRAND_NAME = "CallCapture";
const DEFAULT_FROM_EMAIL = "hello@callcapture.cc";
const DEFAULT_REPLY_TO = "hello@callcapture.cc";

const SMTP_HOST = process.env.CALLCAPTURE_SMTP_HOST || "";
const SMTP_PORT = Number(process.env.CALLCAPTURE_SMTP_PORT || 465);
const SMTP_SECURE = (process.env.CALLCAPTURE_SMTP_SECURE || "true") !== "false";
const SMTP_USER = process.env.CALLCAPTURE_SMTP_USER || "";
const SMTP_PASSWORD = process.env.CALLCAPTURE_SMTP_PASSWORD || "";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export const CALLCAPTURE_FROM_EMAIL =
  process.env.CALLCAPTURE_FROM_EMAIL ||
  process.env.CALLCAPTURE_ONBOARDING_FROM_EMAIL ||
  process.env.CALLCAPTURE_TRIAL_FROM_EMAIL ||
  DEFAULT_FROM_EMAIL;

export const CALLCAPTURE_REPLY_TO_EMAIL =
  process.env.CALLCAPTURE_REPLY_TO_EMAIL ||
  process.env.CALLCAPTURE_ONBOARDING_REPLY_TO ||
  DEFAULT_REPLY_TO;

let transporter: nodemailer.Transporter | null = null;

function hasZohoSmtpConfig() {
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASSWORD);
}

function hasResendConfig() {
  return Boolean(RESEND_API_KEY && CALLCAPTURE_FROM_EMAIL);
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  return transporter;
}

export function hasCallCaptureMailTransport() {
  return hasZohoSmtpConfig() || hasResendConfig();
}

type SendCallCaptureEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendCallCaptureEmail({
  to,
  subject,
  html,
  text,
  replyTo = CALLCAPTURE_REPLY_TO_EMAIL,
}: SendCallCaptureEmailInput) {
  const normalizedTo = Array.isArray(to) ? to : [to];
  const from = `${BRAND_NAME} <${CALLCAPTURE_FROM_EMAIL}>`;

  if (hasZohoSmtpConfig()) {
    const info = await getTransporter().sendMail({
      from,
      to: normalizedTo.join(", "),
      replyTo,
      subject,
      html,
      text,
    });

    return {
      configured: true,
      provider: "smtp" as const,
      messageId: info.messageId || null,
    };
  }

  if (!hasResendConfig()) {
    throw new Error(
      "Missing CallCapture email configuration. Add Zoho SMTP env vars or a valid Resend setup."
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: normalizedTo,
      reply_to: replyTo,
      subject,
      html,
      text,
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

  return {
    configured: true,
    provider: "resend" as const,
    messageId: payload?.id ?? null,
  };
}
