"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Hero = () => (
  <section className="bg-hero relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(220_80%_56%/0.08),transparent_60%)]" />
    <div className="container relative mx-auto px-6 pb-24 pt-32 md:pb-32 md:pt-40">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          custom={0}
          variants={fade}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-hero-muted/20 bg-hero-foreground/5 px-4 py-1.5 text-sm text-hero-muted"
        >
          <Phone className="h-3.5 w-3.5" />
          Built for high-value inbound businesses
        </motion.div>

        <motion.h1
          custom={1}
          variants={fade}
          className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-hero-foreground md:text-6xl lg:text-7xl"
        >
          Turn Missed Calls Into{" "}
          <span className="text-gradient">Captured Clients</span>{" "}
          Automatically
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-hero-muted md:text-xl"
        >
          When your team is busy or unavailable, CallCapture instantly responds
          to inbound callers, captures their information, and helps you convert
          more opportunities without lifting a finger.
        </motion.p>

        <motion.div
          custom={3}
          variants={fade}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="hero" size="lg" className="h-12 px-8 text-base">
            Try the Live Demo
          </Button>
          <Button variant="heroOutline" size="lg" className="h-12 px-8 text-base">
            Book a Call
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
