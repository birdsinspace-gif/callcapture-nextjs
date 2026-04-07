import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Value from '@/components/landing/Value';
import HowItWorks from '@/components/landing/HowItWorks';
import BeTheFirst from '@/components/landing/BeTheFirst'; // or Problem.tsx if you prefer
import WhosItFor from '@/components/landing/WhosItFor';
import Pricing from '@/components/landing/Pricing';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Value />
      <HowItWorks />
      <BeTheFirst />
      <WhosItFor />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
