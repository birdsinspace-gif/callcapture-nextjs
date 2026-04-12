"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Respond Instantly",
    description:
      "Lead response begins immediately after the missed call.",
  },
  {
    title: "Capture Key Details",
    description:
      "Automatically collect the information your team needs to follow up.",
  },
  {
    title: "Integrates Into Your Workflow",
    description:
      "Send leads to your inbox, CRM, or operational process instantly.",
  },
];

const TrustSection = () => (
  <section className="bg-background py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Built for Speed and Conversion
        </h2>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
          >
            <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
              {card.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
