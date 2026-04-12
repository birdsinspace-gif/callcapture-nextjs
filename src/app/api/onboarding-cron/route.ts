import { NextResponse, type NextRequest } from "next/server";
import { processDueOnboardingEmails } from "@/lib/server/onboarding";

export const runtime = "nodejs";

function isAuthorized(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  return process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await processDueOnboardingEmails();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("CallCapture onboarding cron failed.", error);
    return NextResponse.json(
      { ok: false, message: "Onboarding cron failed." },
      { status: 500 }
    );
  }
}
