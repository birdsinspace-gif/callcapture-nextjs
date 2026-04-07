"use client";

import { motion } from "framer-motion";
import { Sparkles, Scale, Briefcase, CalendarCheck, PhoneIncoming } from "lucide-react";

const categories = [
  { icon: Sparkles, label: "Medical aesthetics", desc: "Med spas, cosmetic clinics" },
  { icon: Scale, label: "Legal intake", desc: "Law firms, case intake teams" },
  { icon: Briefcase, label: "Professional services", desc: "Consulting, financial advisory" },
  { icon: CalendarCheck, label: "Appointment-based businesses", desc: "Any scheduled-service provider" },
  { icon: PhoneIncoming, label: "Inbound-dependent businesses", desc: "Any business that depends on inbound calls" },
];

const WhoItsFor = () => (
  <section className="bg-hero py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.h2
        className="text-center font-display text-3xl font-extrabold tracking-tight text-hero-foreground md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Built for High-Intent{" "}
        <span className="text-gradient">Inbound Businesses</span>
      </motion.h2>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={i}
              className="rounded-xl border border-hero-muted/15 bg-hero-foreground/[0.03] p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-display text-base font-bold text-hero-foreground">
                {cat.label}
              </h3>
              <p className="mt-1 text-sm text-hero-muted">{cat.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhoItsFor;
