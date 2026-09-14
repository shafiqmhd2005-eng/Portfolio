import React, { useState } from 'react';
import { Layers, ArrowRight, ExternalLink, Activity, Sun, Clock, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import CardioDigitalTwinSim from './CardioDigitalTwinSim';
import SolarTrackerSim from './SolarTrackerSim';
import SegmentClockSim from './SegmentClockSim';
import ProjectModal from './ProjectModal';
import { sound } from '../utils/audio';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = resumeData.projects;
  const flagship = projects[0];
  const otherProjects = projects.slice(1);

  const openProject = (p) => {
    sound.engage();
    setSelectedProject(p);
  };

  return (
    <section id="projects" className="relative py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>05 // ARTIFACTS</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400">HARDWARE PROTOTYPES & RESEARCH MODULES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
            FEATURED ENGINEERING PROJECTS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded mt-3" />
        </div>

        {/* FLAGSHIP PROJECT HERO CARD (Project 01) */}
        <div className="mb-14">
          <div className="glass-panel-glow p-6 sm:p-10 rounded-2xl border-2 border-cyan-400/40 relative shadow-neon-cyan">
            
            {/* Flagship Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-cyan-500/25">
              <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold">{flagship.code}</span>
                <span className="text-slate-600">//</span>
                <span className="text-purple-400">{flagship.tag}</span>
              </div>

              <button
                onClick={() => openProject(flagship)}
                className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 hover:bg-cyan-500/30 text-xs font-mono font-bold flex items-center space-x-2 transition-all shadow-neon-cyan"
              >
                <span>OPEN FULL TECHNICAL DOSSIER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
                  {flagship.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                  {flagship.shortDescription}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {flagship.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-space-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* System Architecture Flow Diagram */}
                <div className="pt-4">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>SYSTEM ARCHITECTURE PIPELINE:</span>
                  </div>
                  
                  <div className="space-y-2 font-mono text-xs">
                    {flagship.architectureSteps.map((step, idx) => (
                      <div
                        key={step.label}
                        className="flex items-center space-x-2 p-2 rounded bg-space-900/80 border border-cyan-500/20"
                      >
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <span className="text-white font-bold">{step.label}</span>
                          <span className="text-slate-400 text-[11px] block sm:inline sm:ml-2">
                            {step.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Interactive Digital Twin Simulation */}
              <div className="lg:col-span-7">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-cyan-300 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      INTERACTIVE DIGITAL TWIN OSCILLOSCOPE & SENSOR FEED
                    </span>
                    <span className="text-[10px] text-emerald-400 hidden sm:inline">LIVE SIMULATION</span>
                  </div>

                  <CardioDigitalTwinSim />
                </div>
              </div>

            </div>

            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />
          </div>
        </div>

        {/* PROJECTS 02 & 03 CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* PROJECT 02: Dual-Axis Solar Tracker */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/25 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 font-mono text-xs">
                <span className="text-cyan-400 font-bold">{otherProjects[0].code}</span>
                <span className="text-purple-400">{otherProjects[0].tag}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {otherProjects[0].title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {otherProjects[0].shortDescription}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {otherProjects[0].technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-space-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Interactive Mini-Simulator */}
              <div className="mb-4">
                <SolarTrackerSim />
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-500/15 flex items-center justify-between">
              <button
                onClick={() => openProject(otherProjects[0])}
                className="text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center space-x-1.5 transition-all"
              >
                <span>VIEW COMPLETE SPECIFICATIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-500">ARDUINO + LDR + SERVO</span>
            </div>

            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
          </div>

          {/* PROJECT 03: 7-Segment Display Digital Clock */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/25 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 font-mono text-xs">
                <span className="text-cyan-400 font-bold">{otherProjects[1].code}</span>
                <span className="text-purple-400">{otherProjects[1].tag}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {otherProjects[1].title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {otherProjects[1].shortDescription}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {otherProjects[1].technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-space-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Interactive Mini-Simulator */}
              <div className="mb-4">
                <SegmentClockSim />
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-500/15 flex items-center justify-between">
              <button
                onClick={() => openProject(otherProjects[1])}
                className="text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center space-x-1.5 transition-all"
              >
                <span>VIEW COMPLETE SPECIFICATIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-500">POV MULTIPLEXING</span>
            </div>

            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
          </div>

        </div>

      </div>

      {/* Cinematic Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
