'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Core',
    price: 397,
    annual: 327,
    description: 'For growing high-value inbound teams',
    features: [
      'Up to 150 missed calls / text responses per month',
      'Instant professional SMS follow-up',
      'Capture name, service need & urgency',
      'Clean ready-to-follow-up lead delivery',
      'Basic calendar / CRM note integration',
      'Team notifications (up to 4 users)',
      'Basic analytics',
      'No setup fee • No contract • Cancel anytime',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: 597,
    annual: 497,
    description: 'Best for most high-intent inbound businesses',
    features: [
      'Up to 400 missed calls / text responses per month',
      'Advanced qualification (urgency scoring)',
      'Multi-step workflows & time-of-day rules',
      'Deeper CRM & scheduling integrations',
      'Detailed ROI analytics',
      'Priority support + quick onboarding',
      'Team access up to 8 users',
      'No setup fee • No contract • Cancel anytime',
    ],
    popular: true,
  },
  {
    name: 'Pro',
    price: 997,
    annual: 827,
    description: 'For premium & high-volume operations',
    features: [
      'Up to 800+ missed calls / text responses per month',
      'Fully custom scripts & branching logic',
      'Advanced CRM & intake system sync',
      'Premium reporting & revenue attribution',
      'White-glove onboarding',
      'Higher team limits & priority support',
      'Low-cost overages if needed',
      'No setup fee • No contract • Cancel anytime',
    ],
    popular: false,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Simple Pricing for High-Value Results</h2>
          <p className="text-xl text-zinc-400">14-Day Free Trial on every plan • No contract • Cancel anytime</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-zinc-900 rounded-2xl p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-3 rounded-xl transition-all ${!isAnnual ? 'bg-zinc-800 shadow-md' : 'text-zinc-400'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-3 rounded-xl transition-all ${isAnnual ? 'bg-zinc-800 shadow-md' : 'text-zinc-400'}`}
            >
              Annual <span className="text-yellow-400 text-xs">— Save ~17%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => {
            const currentPrice = isAnnual ? tier.annual : tier.price;
            return (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-10 border flex flex-col transition-all ${
                  tier.popular 
                    ? 'border-yellow-500 bg-zinc-900 scale-[1.02] shadow-2xl shadow-yellow-500/10' 
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-zinc-950 px-6 py-1 rounded-full text-xs font-bold tracking-wider">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-4xl font-semibold">{tier.name}</h3>
                  <p className="text-zinc-400 mt-2">{tier.description}</p>
                </div>

                <div className="mb-10">
                  <span className="text-6xl font-bold tracking-tighter">${currentPrice}</span>
                  <span className="text-zinc-400 ml-2">/month</span>
                  {isAnnual && <p className="text-yellow-400 text-sm mt-1">Billed annually</p>}
                </div>

                <ul className="space-y-4 mb-12 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`block text-center py-4 rounded-2xl font-semibold text-lg transition-all ${
                    tier.popular 
                      ? 'bg-yellow-500 hover:bg-yellow-400 text-zinc-950' 
                      : 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700'
                  }`}
                >
                  Start 14-Day Free Trial
                </a>

                <p className="text-center text-xs text-zinc-500 mt-6">14-day risk-free trial • One captured high-value client often covers months</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
