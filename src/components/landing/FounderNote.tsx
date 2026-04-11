"use client";

import { motion } from "framer-motion";

const supportPoints = [
  "Instant follow-up for missed opportunities",
  "Simple implementation with existing phone workflows",
  "Built to improve response speed without adding friction",
];

const FounderNote = () => (
  <section className="bg-background py-24 md:py-32">
    <div className="container mx-auto px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
        <motion.div
          className="rounded-3xl border border-border bg-card p-8 shadow-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
            Founder Note
          </p>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Built for businesses that cannot afford slow follow-up
          </h2>

          <div className="mt-8 space-y-3">
            {supportPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground"
              >
                {point}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Built around response speed
            </p>
            <p className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
              CallCapture was built for one reason: speed matters. When a
              prospect calls and no one answers, the opportunity starts
              disappearing immediately.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              We created CallCapture to help businesses respond faster, qualify
              leads automatically, and create a smoother path from missed call
              to real conversation.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              The focus is straightforward: reduce lead leakage, simplify
              follow-up, and help businesses recover more value from the demand
              they already have.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FounderNote;
