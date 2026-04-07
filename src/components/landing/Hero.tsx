'use client';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-2 mb-8">
          <span className="text-yellow-400">⚡</span>
          <span className="text-sm font-medium">Missed calls = missed revenue</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
          CallCapture —<br />
          Turn Missed Calls<br />
          Into <span className="text-yellow-400">Captured Clients</span>
        </h1>

        <p className="text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Built for high-value inbound businesses.<br />
          Instant SMS response → capture key details → deliver clean, ready-to-follow-up leads.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#pricing" 
            className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-10 py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3 transition-all"
          >
            Start 14-Day Free Trial
            <ArrowRight className="w-5 h-5" />
          </a>
          <button className="border border-zinc-700 hover:border-zinc-500 px-8 py-4 rounded-2xl text-lg font-medium transition-all">
            Try the Live Demo
          </button>
        </div>

        <p className="text-sm text-zinc-500 mt-8">No credit card required • No setup fee • Cancel anytime</p>
      </div>
    </section>
  );
}
