import React from 'react';
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function EducationSection() {
  const edu = resumeData.education;

  return (
    <section id="education" className="relative py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Simple Subtitle */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>06 // EDUCATION</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300">{edu.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
            {edu.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded mt-3" />
          <p className="text-slate-300 text-sm mt-3 font-sans max-w-xl">
            My formal engineering degree, university accreditation, and academic coursework.
          </p>
        </div>

        {/* Milestone Card */}
        <div className="glass-panel-glow rounded-2xl p-6 sm:p-10 border border-cyan-400/30 relative shadow-neon-cyan">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Degree Badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 glass-panel rounded-xl border border-cyan-500/20 text-center relative overflow-hidden">
              {/* Concentric rings */}
              <div className="w-36 h-36 rounded-full border border-cyan-500/30 flex items-center justify-center relative animate-spin" style={{ animationDuration: '40s' }}>
                <div className="w-24 h-24 rounded-full border border-purple-500/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-cyan-400/50 flex items-center justify-center bg-space-900 shadow-neon-cyan">
                    <GraduationCap className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
              </div>

              <div className="mt-4 font-mono">
                <div className="text-3xl font-bold text-cyan-300">{edu.cgpa}</div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">CUMULATIVE CGPA</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Scale of 10.0</div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-cyan-500/20">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Graduating Class: {edu.duration}
                </span>
                <span className="text-xs font-mono text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 rounded">
                  ANNA UNIVERSITY AFFILIATED
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {edu.degree}
                </h3>
                <p className="text-slate-200 text-base font-semibold mt-1">
                  {edu.institution}
                </p>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  {edu.affiliation}
                </p>
              </div>

              {/* Course Highlights */}
              <div className="pt-3 space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  WHAT I STUDIED IN COLLEGE:
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-300 font-sans">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />
        </div>

      </div>
    </section>
  );
}
