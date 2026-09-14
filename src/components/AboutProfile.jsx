import React from 'react';
import { Cpu, Terminal, Radio, Activity, CheckCircle2, ShieldCheck } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

const iconMap = {
  Cpu: Cpu,
  Terminal: Terminal,
  Radio: Radio,
  Activity: Activity,
};

export default function AboutProfile() {
  return (
    <section id="about" className="relative py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>02 // DOSSIER</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400">{resumeData.about.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
            {resumeData.about.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded mt-3" />
        </div>

        {/* Mission Briefing Box */}
        <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 mb-12 relative border border-cyan-400/30">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>MISSION SUMMARY // VERIFIED CANDIDATE QUALIFICATION</span>
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans">
                {resumeData.about.bio}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['ESP32', 'Arduino', 'UART', 'SPI', 'I2C', 'GPIO', 'KiCad', 'Proteus'].map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded bg-space-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="w-full lg:w-72 glass-panel p-4 rounded-xl border border-cyan-500/20 font-mono text-xs space-y-3 shrink-0">
              <div className="text-slate-400 text-[11px] pb-2 border-b border-cyan-500/20 flex justify-between">
                <span>QUALIFICATION BADGE</span>
                <span className="text-emerald-400">READY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">DEGREE:</span>
                <span className="text-cyan-300 font-bold">B.E. ECE (2026)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AFFILIATION:</span>
                <span className="text-slate-200">Anna University</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ACADEMIC CGPA:</span>
                <span className="text-cyan-300 font-bold">{resumeData.education.cgpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-slate-200">Bangalore, India</span>
              </div>
            </div>
          </div>

          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />
        </div>

        {/* 4 Futuristic Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resumeData.about.domains.map((card) => {
            const IconComponent = iconMap[card.icon] || Cpu;
            return (
              <div
                key={card.id}
                onMouseEnter={() => sound.hover()}
                className="glass-panel p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-neon-cyan transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500/20 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono text-cyan-400/70 border border-cyan-500/20 px-2 py-0.5 rounded">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>VALIDATED IN LAB</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
