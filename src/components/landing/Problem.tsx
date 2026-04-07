"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const bullets = [
  "Most callers don\u2019t leave voicemails",
  "They move on to the next provider within minutes",
  "Every missed call is a lost opportunity",
];

const Problem = () => (
  <section className="bg-background py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Missed Calls Are{" "}
          <span className="text-gradient">Missed Revenue</span>
        </h2>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-5 md:grid-cols-3">
        {bullets.map((text, i) => (
          <motion.div
            key={i}
            className="rounded-xl border border-border bg-card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            <XCircle className="mx-auto mb-4 h-8 w-8 text-destructive/70" />
            <p className="text-sm font-medium leading-relaxed text-foreground md:text-base">
              {text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Problem;
