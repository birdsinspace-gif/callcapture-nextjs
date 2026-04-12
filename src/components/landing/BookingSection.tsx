 "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, DEMO_NUMBER, DISPLAY_NUMBER } from "@/lib/contact";

type FormState = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  notes: string;
};

const initialFormState: FormState = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  notes: "",
};

const BookingSection = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    try {
      const response = await fetch("/api/trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Unable to submit your request.");
      }

      setSubmitSuccess(true);
      setFormData(initialFormState);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit your request."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                Fill this out and we’ll have the booking details in one place so
                your team can follow up quickly.
              </p>
              <div className="mt-8 rounded-2xl border border-primary/15 bg-primary/5 p-5 text-sm text-muted-foreground">
                Call the demo line anytime:{" "}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  />
                  <input
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  />
                </div>

                <textarea
                  name="notes"
                  rows={5}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="What kind of calls are you missing today?"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                />

                <div className="space-y-3">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="h-12 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Start Free Trial"}
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

                {submitSuccess ? (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground">
                    Lead request received. We’ll follow up with next steps.
                  </div>
                ) : null}

                {submitError ? (
                  <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {submitError}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
