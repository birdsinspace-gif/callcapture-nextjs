"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Connect Your Phone Workflow",
    description:
      "Use your existing business number and route missed calls into CallCapture.",
  },
  {
    number: "02",
    title: "Instant Lead Qualification",
    description:
      "We immediately text back and gather lead details automatically.",
  },
  {
    number: "03",
    title: "Deliver Leads to Your Team",
    description:
      "Qualified opportunities are sent to your team, CRM, or workflow instantly.",
  },
];

const HowItWorks = () => (
  <section id="how" className="bg-background py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary">
          How It Works
        </p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Turn missed calls into qualified leads automatically
        </h2>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="rounded-3xl border border-border bg-card p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
          >
            <span className="text-sm font-semibold tracking-[0.24em] text-primary">
              {step.number}
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground">
              {step.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
