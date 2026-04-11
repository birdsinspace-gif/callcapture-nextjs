import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Value from "@/components/landing/Value";
import TrustSection from "@/components/landing/TrustSection";
import HowItWorks from "@/components/landing/HowItWorks";
import WhoItsFor from "@/components/landing/WhoItsFor";
import Pricing from "@/components/landing/Pricing";
import BookingSection from "@/components/landing/BookingSection";
import FounderNote from "@/components/landing/FounderNote";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <Value />
      <TrustSection />
      <HowItWorks />
      <WhoItsFor />
      <Pricing />
      <BookingSection />
      <FounderNote />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
