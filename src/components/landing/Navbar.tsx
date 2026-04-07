"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => (
  <nav className="fixed top-0 z-50 w-full border-b border-hero-muted/10 bg-hero/80 backdrop-blur-lg">
    <div className="container mx-auto flex h-16 items-center justify-between px-6">
      <div className="flex items-center gap-2 font-display text-lg font-bold text-hero-foreground">
        <Phone className="h-5 w-5 text-primary" />
        CallCapture
      </div>
      <Button variant="hero" size="sm" className="text-sm">
        Book a Call
      </Button>
    </div>
  </nav>
);

export default Navbar;
