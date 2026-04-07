"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => (
  <section className="bg-background py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Simple, Scalable Pricing
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
          Flat monthly pricing. No contracts. Built to pay for itself with just
          one captured client.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto mt-14 max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        <div className="font-display text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
          $497
          <span className="text-xl font-medium text-muted-foreground">/mo</span>
        </div>

        <ul className="mx-auto mt-8 max-w-xs space-y-3 text-left text-sm text-foreground">
          {[
            "Instant missed-call response",
            "Lead capture & qualification",
            "Clean lead delivery",
            "No contracts, cancel anytime",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>

        <Button variant="default" size="lg" className="mt-8 w-full h-12 text-base font-semibold">
          Get Started
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Custom onboarding available for early partners
        </p>
      </motion.div>
    </div>
  </section>
);

export default Pricing;
