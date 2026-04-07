'use client';
import { Zap, Phone } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-zinc-950" />
          </div>
          <span className="text-2xl font-semibold tracking-tight">CallCapture</span>
        </div>
        <div className="flex items-center gap-8 text-sm">
          <a href="#how" className="hover:text-yellow-400 transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-yellow-400 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-yellow-400 transition-colors">FAQ</a>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 px-6 py-2.5 rounded-2xl font-medium flex items-center gap-2 transition-all">
            Try Live Demo <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
