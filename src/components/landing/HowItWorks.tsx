"use client";

import { motion } from "framer-motion";
import { Phone, PhoneMissed, MessageSquare, ClipboardList, UserCheck } from "lucide-react";

const steps = [
  { icon: Phone, title: "A client calls your business" },
  { icon: PhoneMissed, title: "You miss the call" },
  { icon: MessageSquare, title: "CallCapture responds instantly with a professional text" },
  { icon: ClipboardList, title: "We collect key information \u2014 name, service need, urgency" },
  { icon: UserCheck, title: "You receive a clean, ready-to-follow-up lead" },
];

const HowItWorks = () => (
  <section className="bg-background py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.h2
        className="text-center font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h2>

      <div className="relative mx-auto mt-16 max-w-2xl">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-8 md:block" />

        <div className="space-y-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                className="flex items-start gap-5 md:gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card md:h-16 md:w-16">
                  <Icon className="h-5 w-5 text-primary md:h-6 md:w-6" />
                </div>
                <div className="pt-1 md:pt-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Step {i + 1}
                  </span>
                  <p className="mt-1 text-base font-medium text-foreground md:text-lg">
                    {step.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
