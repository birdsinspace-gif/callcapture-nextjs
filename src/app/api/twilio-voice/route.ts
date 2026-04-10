import { NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

const SMS_BODY = `Hey — thanks for your call.

We just caught your missed call. This is exactly how businesses capture new jobs instantly.

To get started, just reply with:

1. What do you need help with?
2. Is this urgent? (yes/no)

We’ll take it from there 👍`;

const VOICE_MESSAGE =
  "Thanks for calling. We are tied up right now, but we will text you immediately.";

function buildTwiml() {
  const response = new twilio.twiml.VoiceResponse();
  response.say(VOICE_MESSAGE);
  response.hangup();
  return response.toString();
}

async function sendFollowUpSms(callerNumber: string, calledNumber: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !from) {
    throw new Error("Missing required Twilio environment variables.");
  }

  console.log("Attempting to send missed-call follow-up SMS.", {
    from,
    to: callerNumber,
    calledNumber,
  });

  const client = twilio(accountSid, authToken);
  const message = await client.messages.create({
    body: SMS_BODY,
    from,
    to: callerNumber,
  });

  console.log("Missed-call follow-up SMS sent successfully.", {
    sid: message.sid,
    status: message.status,
    from,
    to: callerNumber,
    calledNumber,
  });
}

function xmlResponse(body: string) {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/twilio-voice",
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const from = formData.get("From")?.toString().trim() ?? "";
  const to = formData.get("To")?.toString().trim() ?? "";

  if (from) {
    try {
      await sendFollowUpSms(from, to);
    } catch (error) {
      console.error("Failed to send missed-call follow-up SMS.", {
        error,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: from,
        calledNumber: to,
      });
    }
  } else {
    console.error("Twilio voice webhook missing caller number.", {
      calledNumber: to,
    });
  }

  return xmlResponse(buildTwiml());
}
