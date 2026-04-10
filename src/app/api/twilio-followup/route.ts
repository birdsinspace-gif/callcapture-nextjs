import { NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

const REPLY_BODY = `Perfect — this is exactly how your customers would engage.

We capture the lead, qualify it, and notify you instantly.

Want this set up for your business?`;

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/twilio-followup",
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const body = formData.get("Body")?.toString().trim() ?? "";

  const response = new twilio.twiml.MessagingResponse();

  if (body) {
    response.message(REPLY_BODY);
  }

  return new Response(response.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}
