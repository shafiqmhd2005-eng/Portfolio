import React from 'react';
import { ArrowUp, Terminal, Cpu, Radio, Shield } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

export default function Footer({ onOpenTerminal, onOpenResume }) {
  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyan-500/20 bg-space-950/80 backdrop-blur-md py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Strip */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-cyan-500/10">
          <div>
            <div className="flex items-center space-x-2 text-white font-display font-bold text-base">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>MOHAMED SHAFIQ M</span>
              <span className="text-cyan-400 text-xs font-mono">// EMBEDDED OS</span>
            </div>
            <p className="text-slate-400 text-xs mt-1 font-sans">
              Junior Embedded Engineer | Embedded Systems • IoT • Firmware • PCB Design
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.click();
                onOpenTerminal();
              }}
              className="px-3 py-2 rounded-lg bg-space-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 flex items-center space-x-2 transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>LAUNCH TERMINAL CLI</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                onOpenResume();
              }}
              className="px-3 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 font-bold transition-all shadow-neon-cyan"
            >
              VIEW RESUME
            </button>

            <button
              onClick={scrollToTop}
              title="Return to Orbit / Top"
              className="p-2 rounded-lg bg-space-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Technical Telemetry & Copyright */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              TELEMETRY NOMINAL
            </span>
            <span>|</span>
            <span>BANGALORE, INDIA</span>
            <span>|</span>
            <span>B.E. ECE (2022–2026)</span>
          </div>

          <div>
            © {new Date().getFullYear()} Mohamed Shafiq M. Designed for Aerospace & Embedded Engineering Recruiters.
          </div>
        </div>

      </div>
    </footer>
  );
}
