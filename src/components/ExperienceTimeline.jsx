import React from 'react';
import { Calendar, Building, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Simple Subtitle */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>04 // EXPERIENCE</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300">{resumeData.experience.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
            {resumeData.experience.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded mt-3" />
          <p className="text-slate-300 text-sm mt-3 font-sans max-w-xl">
            Practical hands-on industry internships in hardware engineering, IoT, and embedded firmware.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-[11px] sm:before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-purple-500 before:to-cyan-400/20">
          
          {resumeData.experience.missions.map((mission, index) => (
            <div
              key={mission.role + mission.period}
              onMouseEnter={() => sound.hover()}
              className="relative group"
            >
              {/* Timeline Orb Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full bg-space-950 border-2 border-cyan-400 flex items-center justify-center shadow-neon-cyan group-hover:scale-125 transition-transform duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
              </div>

              {/* Mission Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 group-hover:border-cyan-400/50 group-hover:shadow-neon-cyan transition-all duration-300 relative">
                
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 mb-4 border-b border-cyan-500/15">
                  <div>
                    <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span className="font-bold">INTERNSHIP 0{resumeData.experience.missions.length - index}</span>
                      <span className="text-slate-600">//</span>
                      <span className="text-purple-400 font-semibold">{mission.badge}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {mission.role}
                    </h3>

                    <div className="flex items-center space-x-2 text-sm text-slate-300 mt-1 font-mono">
                      <Building className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-slate-200">{mission.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end font-mono text-xs space-y-1">
                    <span className="flex items-center space-x-1 text-slate-200 bg-space-900 px-3 py-1 rounded border border-slate-700">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>{mission.period}</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold">
                      <CheckCircle2 className="w-3 h-3" /> {mission.status}
                    </span>
                  </div>
                </div>

                {/* Plain-Language Summary */}
                {mission.simpleSummary && (
                  <div className="mb-4 p-3 rounded-xl bg-space-900/80 border border-cyan-500/20 text-xs sm:text-sm text-cyan-200 font-sans">
                    <strong>Quick Summary:</strong> {mission.simpleSummary}
                  </div>
                )}

                {/* Responsibilities */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-mono text-slate-400 tracking-wider uppercase mb-2">
                    KEY RESPONSIBILITIES & ACCOMPLISHMENTS:
                  </h4>
                  <ul className="space-y-2 text-slate-300 text-sm font-sans">
                    {mission.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="pt-4 border-t border-cyan-500/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {mission.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-space-900 border border-cyan-500/25 text-cyan-300 text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] text-slate-500">
                    Official Internship Experience
                  </span>
                </div>

                <div className="hud-corner-tl" />
                <div className="hud-corner-br" />
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
