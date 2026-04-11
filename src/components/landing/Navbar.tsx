"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_NUMBER, DISPLAY_NUMBER } from "@/lib/contact";

const Navbar = () => (
  <nav className="fixed top-0 z-50 w-full border-b border-hero-muted/10 bg-hero/80 backdrop-blur-lg">
    <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-6">
      <div className="flex items-center gap-2 font-display text-lg font-bold text-hero-foreground">
        <Phone className="h-5 w-5 text-primary" />
        CallCapture
      </div>

      <div className="hidden items-center gap-8 text-sm text-hero-muted md:flex">
        <a href="#how" className="transition-colors hover:text-hero-foreground">
          How It Works
        </a>
        <a href="#pricing" className="transition-colors hover:text-hero-foreground">
          Pricing
        </a>
        <a href="#faq" className="transition-colors hover:text-hero-foreground">
          FAQ
        </a>
      </div>

      <Button asChild variant="hero" size="sm" className="text-sm">
        <a
          href={`tel:${DEMO_NUMBER}`}
          aria-label={`Call demo at ${DISPLAY_NUMBER}`}
        >
          Call Demo
        </a>
      </Button>
    </div>
  </nav>
);

export default Navbar;
