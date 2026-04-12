import { Redis } from "@upstash/redis";

type SequenceStepKey =
  | "welcome"
  | "best_practices"
  | "check_in"
  | "trial_ending"
  | "final_day";

type SequenceStep = {
  key: SequenceStepKey;
  dayOffset: number;
  subject: string;
  preview: string;
  ctaLabel: string;
  body: string[];
};

export type CallCaptureOnboardingLead = {
  email: string;
  firstName: string;
  brand: "callcapture";
  signupDate: string;
  onboardingStatus: "active" | "complete";
  trialEndDate: string;
  replyTo: string;
  companyName: string;
  phone: string;
  sendHistory: Array<{
    stepKey: SequenceStepKey;
    sentAt: string;
    messageId: string | null;
  }>;
};

type RegisterLeadInput = {
  email: string;
  firstName: string;
  companyName?: string;
  phone?: string;
  replyTo?: string;
};

type ProcessDueOptions = {
  forcedDateKey?: string;
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const BRAND = "callcapture";
const BRAND_NAME = "CallCapture";
const DEFAULT_REPLY_TO = "KyleDChristopher@gmail.com";
const CHECKOUT_URL =
  process.env.CALLCAPTURE_ONBOARDING_CHECKOUT_URL ||
  process.env.CALLCAPTURE_TRIAL_CHECKOUT_URL ||
  "";
const FROM_EMAIL =
  process.env.CALLCAPTURE_ONBOARDING_FROM_EMAIL ||
  process.env.CALLCAPTURE_TRIAL_FROM_EMAIL ||
  "";
const REPLY_TO =
  process.env.CALLCAPTURE_ONBOARDING_REPLY_TO || DEFAULT_REPLY_TO;
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const redis = createRedisClient();

const SEQUENCE: SequenceStep[] = [
  {
    key: "welcome",
    dayOffset: 0,
    subject: "Welcome to CallCapture",
    preview: "Here’s how to get set up and start capturing missed-call leads.",
    ctaLabel: "Open Your Trial",
    body: [
      "You’re in. CallCapture is designed to turn missed inbound calls into real follow-up opportunities without slowing your team down.",
      "Start by routing your missed-call flow, checking your demo line, and making sure the right person on your team is ready to respond quickly.",
      "If you want help with setup, just reply to this email and Kyle will help you get moving.",
    ],
  },
  {
    key: "best_practices",
    dayOffset: 1,
    subject: "Day 1: Best practices for your missed-call flow",
    preview: "A few quick wins to help you get better lead capture right away.",
    ctaLabel: "Review Trial Options",
    body: [
      "The teams who get the most from CallCapture keep the response path simple: a clear follow-up text, fast callback ownership, and one person accountable for new leads.",
      "If you have more than one location or service line, keep your first week focused on the highest-value missed calls so you can see the lift quickly.",
      "Reply if you want a second set of eyes on your setup or message flow.",
    ],
  },
  {
    key: "check_in",
    dayOffset: 5,
    subject: "Day 5: Need a hand getting more from CallCapture?",
    preview: "A quick check-in before your trial gets away from you.",
    ctaLabel: "Book A Quick Walkthrough",
    body: [
      "By this point you should have a feel for how CallCapture fits into your missed-call workflow.",
      "If something feels unclear, this is the best time to tighten it up before the end of your trial window.",
      "You can reply directly to this email if you want help reviewing setup, messaging, or conversion flow.",
    ],
  },
  {
    key: "trial_ending",
    dayOffset: 11,
    subject: "Day 11: Your trial is ending soon",
    preview: "A quick reminder before your trial window closes.",
    ctaLabel: "Continue With CallCapture",
    body: [
      "Your trial is almost over, so now is the time to decide whether you want CallCapture running continuously for your team.",
      "If the missed-call follow-up flow is already creating momentum, don’t let it shut off right as your team starts getting used to it.",
      "If you want help deciding, reply to this email and Kyle can walk through the right next step with you.",
    ],
  },
  {
    key: "final_day",
    dayOffset: 14,
    subject: "Final day: keep CallCapture live",
    preview: "Your trial ends today. Here’s the direct continuation link.",
    ctaLabel: "Activate Paid Access",
    body: [
      "Today is the last day of your current CallCapture trial window.",
      "If you want to keep your missed-call response flow active, use the continuation link below to move forward without losing momentum.",
      "If you still have questions, reply and Kyle can help before you make the switch.",
    ],
  },
];

function createRedisClient() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

function hasOnboardingInfrastructure() {
  return Boolean(redis && RESEND_API_KEY && FROM_EMAIL);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function leadKey(email: string) {
  return `onboarding:${BRAND}:lead:${normalizeEmail(email)}`;
}

function queueKey(dateKey: string) {
  return `onboarding:${BRAND}:queue:${dateKey}`;
}

function queueMember(email: string, stepKey: SequenceStepKey) {
  return `${normalizeEmail(email)}|${stepKey}`;
}

function parseQueueMember(member: string) {
  const [email, stepKey] = member.split("|") as [string, SequenceStepKey];
  return { email, stepKey };
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * DAY_IN_MS);
}

function getStep(stepKey: SequenceStepKey) {
  return SEQUENCE.find((step) => step.key === stepKey);
}

function buildEmailHtml(lead: CallCaptureOnboardingLead, step: SequenceStep) {
  const greetingName = lead.firstName || "there";
  const ctaUrl = step.key === "check_in"
    ? "https://calendly.com/kyledchristopher/demo"
    : CHECKOUT_URL || "https://calendly.com/kyledchristopher/demo";

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <p style="margin: 0 0 16px;">Hi ${greetingName},</p>
      ${step.body
        .map((paragraph) => `<p style="margin: 0 0 16px;">${paragraph}</p>`)
        .join("")}
      <p style="margin: 24px 0;">
        <a
          href="${ctaUrl}"
          style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-weight: 600;"
        >
          ${step.ctaLabel}
        </a>
      </p>
      <p style="margin: 24px 0 0; color: #4b5563;">Kyle</p>
      <p style="margin: 4px 0 0; color: #6b7280;">${BRAND_NAME}</p>
    </div>
  `;
}

async function sendSequenceEmail(
  lead: CallCaptureOnboardingLead,
  step: SequenceStep
) {
  if (!RESEND_API_KEY || !FROM_EMAIL) {
    return { configured: false, messageId: null };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Kyle <${FROM_EMAIL}>`,
      to: [lead.email],
      reply_to: lead.replyTo || REPLY_TO,
      subject: step.subject,
      html: buildEmailHtml(lead, step),
    }),
    cache: "no-store",
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.message ||
        payload?.error?.message ||
        `Resend request failed with status ${response.status}.`
    );
  }

  return { configured: true, messageId: payload?.id ?? null };
}

function buildFreshLead(input: RegisterLeadInput): CallCaptureOnboardingLead {
  const now = new Date();

  return {
    email: normalizeEmail(input.email),
    firstName: input.firstName,
    brand: "callcapture",
    signupDate: now.toISOString(),
    onboardingStatus: "active",
    trialEndDate: addDays(now, 14).toISOString(),
    replyTo: input.replyTo || REPLY_TO,
    companyName: input.companyName || "",
    phone: input.phone || "",
    sendHistory: [],
  };
}

async function saveLead(lead: CallCaptureOnboardingLead) {
  if (!redis) {
    return;
  }

  await redis.set(leadKey(lead.email), lead);
}

async function enqueueFutureSteps(lead: CallCaptureOnboardingLead) {
  if (!redis) {
    return;
  }

  const sent = new Set(lead.sendHistory.map((entry) => entry.stepKey));
  const signupDate = new Date(lead.signupDate);

  for (const step of SEQUENCE) {
    if (step.dayOffset === 0 || sent.has(step.key)) {
      continue;
    }

    await redis.sadd(
      queueKey(toDateKey(addDays(signupDate, step.dayOffset))),
      queueMember(lead.email, step.key)
    );
  }
}

async function markStepSent(
  lead: CallCaptureOnboardingLead,
  stepKey: SequenceStepKey,
  messageId: string | null
) {
  const nextHistory = lead.sendHistory.some((entry) => entry.stepKey === stepKey)
    ? lead.sendHistory
    : [
        ...lead.sendHistory,
        {
          stepKey,
          sentAt: new Date().toISOString(),
          messageId,
        },
      ];

  const nextLead: CallCaptureOnboardingLead = {
    ...lead,
    sendHistory: nextHistory,
    onboardingStatus: stepKey === "final_day" ? "complete" : lead.onboardingStatus,
  };

  await saveLead(nextLead);
  return nextLead;
}

export async function registerOnboardingLead(input: RegisterLeadInput) {
  if (!hasOnboardingInfrastructure()) {
    console.warn("CallCapture onboarding skipped: missing Redis or Resend configuration.");
    return { configured: false };
  }

  const existing = await redis!.get<CallCaptureOnboardingLead>(leadKey(input.email));
  const lead =
    !existing || existing.onboardingStatus === "complete"
      ? buildFreshLead(input)
      : {
          ...existing,
          firstName: input.firstName || existing.firstName,
          replyTo: input.replyTo || existing.replyTo,
          companyName: input.companyName || existing.companyName,
          phone: input.phone || existing.phone,
        };

  const hasWelcome = lead.sendHistory.some((entry) => entry.stepKey === "welcome");

  if (!hasWelcome) {
    const welcomeStep = getStep("welcome");
    if (welcomeStep) {
      const result = await sendSequenceEmail(lead, welcomeStep);
      if (result.configured) {
        await markStepSent(lead, "welcome", result.messageId);
      }
    }
  } else {
    await saveLead(lead);
  }

  const latestLead =
    (await redis!.get<CallCaptureOnboardingLead>(leadKey(input.email))) || lead;
  await enqueueFutureSteps(latestLead);

  return { configured: true };
}

export async function processDueOnboardingEmails(options: ProcessDueOptions = {}) {
  if (!hasOnboardingInfrastructure()) {
    return {
      configured: false,
      processed: 0,
      sent: 0,
    };
  }

  const todayKey = options.forcedDateKey || toDateKey(new Date());
  const members = await redis!.smembers<string[]>(queueKey(todayKey));
  let sent = 0;

  for (const member of members || []) {
    const { email, stepKey } = parseQueueMember(member);
    const step = getStep(stepKey);
    const lead = await redis!.get<CallCaptureOnboardingLead>(leadKey(email));

    if (!step || !lead || lead.onboardingStatus === "complete") {
      await redis!.srem(queueKey(todayKey), member);
      continue;
    }

    if (lead.sendHistory.some((entry) => entry.stepKey === stepKey)) {
      await redis!.srem(queueKey(todayKey), member);
      continue;
    }

    const result = await sendSequenceEmail(lead, step);
    if (result.configured) {
      await markStepSent(lead, stepKey, result.messageId);
      sent += 1;
    }

    await redis!.srem(queueKey(todayKey), member);
  }

  return {
    configured: true,
    processed: members?.length || 0,
    sent,
    dateKey: todayKey,
  };
}
