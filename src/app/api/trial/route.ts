import { NextResponse } from "next/server";
import { FORM_EMAIL } from "@/lib/contact";

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/trial" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = body?.fullName?.toString().trim() ?? "";
    const companyName = body?.companyName?.toString().trim() ?? "";
    const email = body?.email?.toString().trim() ?? "";
    const phone = body?.phone?.toString().trim() ?? "";
    const notes = body?.notes?.toString().trim() ?? "";

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete the required fields before submitting.",
        },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.set(
      "_subject",
      `New CallCapture lead request${companyName ? ` - ${companyName}` : ` - ${fullName}`}`
    );
    formData.set("_captcha", "false");
    formData.set("_template", "table");
    formData.set("_replyto", email);
    formData.set("Full Name", fullName);
    formData.set("Company Name", companyName || "Not provided");
    formData.set("Email", email);
    formData.set("Phone", phone);
    formData.set("Notes", notes || "Not provided");

    const response = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.message || "Form submission failed.");
    }

    return NextResponse.json({
      success: true,
      message: "Lead request received. We’ll follow up with next steps.",
    });
  } catch (error) {
    console.error("CallCapture trial submission failed", error);

    return NextResponse.json(
      {
        success: false,
        message: "We couldn't submit the request just now. Please try again.",
      },
      { status: 500 }
    );
  }
}
