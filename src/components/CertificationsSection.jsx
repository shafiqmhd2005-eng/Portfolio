import React from 'react';
import { ShieldCheck, Cpu, Network, Award, FileCheck, CheckCircle } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

const certIcons = {
  ShieldAlert: ShieldCheck,
  Cpu: Cpu,
  Network: Network,
  Award: Award,
  FileCheck: FileCheck,
};

export default function CertificationsSection() {
  const certs = resumeData.certifications.items;

  return (
    <section id="certifications" className="relative py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>07 // SECURITY VAULT</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400">{resumeData.certifications.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
            {resumeData.certifications.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded mt-3" />
        </div>

        {/* Vault Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, index) => {
            const Icon = certIcons[cert.icon] || ShieldCheck;
            return (
              <div
                key={cert.id}
                onMouseEnter={() => sound.hover()}
                className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-neon-cyan transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Vault Chip Identifier */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500/20 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-space-900 px-2 py-0.5 rounded border border-cyan-500/20">
                      TOKEN #0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {cert.name}
                  </h3>

                  <div className="text-xs font-mono text-cyan-300 mb-1">
                    {cert.issuer}
                  </div>

                  <p className="text-xs text-slate-400 font-sans mt-2">
                    {cert.domain}
                  </p>
                </div>

                {/* Vault Verification Badge */}
                <div className="mt-6 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" /> VERIFIED CREDENTIAL
                  </span>
                  <span className="text-slate-500">TAMIL NADU SKILL DEV</span>
                </div>

                <div className="hud-corner-tl" />
                <div className="hud-corner-br" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
