import { Button } from "@/components/ui/button";
import { BOOKING_URL, DEMO_NUMBER, DISPLAY_NUMBER, FORM_EMAIL } from "@/lib/contact";

const BookingSection = () => (
  <section id="book" className="bg-background py-24 md:py-32">
    <div className="container mx-auto px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-8 shadow-lg md:p-12">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Book A Demo
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Start the conversation without losing the lead
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Fill this out and we’ll have the booking details in one place.
              For now, there’s also a temporary Calendly handoff below so the
              page is fully clickable while the final scheduler gets wired in.
            </p>
            <div className="mt-8 rounded-2xl border border-primary/15 bg-primary/5 p-5 text-sm text-muted-foreground">
              Same live demo line as ServiceLock:{" "}
              <a
                href={`tel:${DEMO_NUMBER}`}
                className="font-semibold text-foreground underline-offset-4 transition hover:text-primary hover:underline"
                aria-label={`Call demo at ${DISPLAY_NUMBER}`}
              >
                {DISPLAY_NUMBER}
              </a>
            </div>
          </div>

          <div>
            <form
              action={`https://formsubmit.co/${FORM_EMAIL}`}
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_subject" value="New CallCapture lead request" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="https://callcapture.cc/#book"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Full name"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                />
                <input
                  name="companyName"
                  type="text"
                  placeholder="Company name"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                />
              </div>

              <textarea
                name="notes"
                rows={5}
                placeholder="What kind of calls are you missing today?"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
              />

              <div className="space-y-3">
                <Button type="submit" variant="hero" size="lg" className="h-12 w-full">
                  Start Free Trial
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Prefer to talk first?{" "}
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary underline-offset-4 transition hover:underline"
                  >
                    Book a demo
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BookingSection;
