"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalCTA = () => (
  <section className="bg-hero relative overflow-hidden py-24 md:py-32">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(220_80%_56%/0.1),transparent_60%)]" />
    <div className="container relative mx-auto px-6">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-hero-foreground md:text-5xl">
          Stop Letting Opportunities Slip Through
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-hero-muted">
          Capture more clients, respond faster, and grow your business without
          adding headcount.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="hero" size="lg" className="h-12 px-8 text-base">
            Try the Demo
          </Button>
          <Button variant="heroOutline" size="lg" className="h-12 px-8 text-base">
            Book a Call
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
