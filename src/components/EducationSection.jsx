import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function EducationSection() {
  const edu = resumeData.education;

  return (
    <section id="education" className="relative py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>06 // ORBIT</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400">{edu.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
            {edu.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded mt-3" />
        </div>

        {/* Orbital Milestone Card */}
        <div className="glass-panel-glow rounded-2xl p-6 sm:p-10 border border-cyan-400/30 relative shadow-neon-cyan">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Orbital Degree Visual */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 glass-panel rounded-xl border border-cyan-500/20 text-center relative overflow-hidden">
              {/* Concentric orbital rings */}
              <div className="w-40 h-40 rounded-full border border-cyan-500/30 flex items-center justify-center relative animate-spin" style={{ animationDuration: '40s' }}>
                <div className="w-28 h-28 rounded-full border border-purple-500/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-cyan-400/50 flex items-center justify-center bg-space-900 shadow-neon-cyan">
                    <GraduationCap className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                {/* Orbiting particle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
              </div>

              <div className="mt-4 font-mono">
                <div className="text-2xl font-bold text-cyan-300">{edu.cgpa}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">CUMULATIVE CGPA</div>
              </div>
            </div>

            {/* Right: Academic Credentials & Institution */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-cyan-500/20">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  ACADEMIC TENURE: {edu.duration}
                </span>
                <span className="text-xs font-mono text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 rounded">
                  ANNA UNIVERSITY AFFILIATED
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {edu.degree}
                </h3>
                <p className="text-slate-300 text-base font-semibold mt-1">
                  {edu.institution}
                </p>
                <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
                  {edu.affiliation}
                </p>
              </div>

              {/* Course Highlights */}
              <div className="pt-3 space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  CURRICULUM & LABORATORY EMPHASIS:
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
