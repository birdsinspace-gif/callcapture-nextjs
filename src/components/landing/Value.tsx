"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Value = () => (
  <section className="bg-hero py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Zap className="h-7 w-7 text-primary" />
        </div>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-hero-foreground md:text-5xl">
          Be the First to Respond, Every Time
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-hero-muted">
          CallCapture ensures every inbound call is handled instantly, even when
          you can&apos;t answer. Speed wins business. We make sure you never miss the
          moment.
        </p>
      </motion.div>
    </div>
  </section>
);

export default Value;
