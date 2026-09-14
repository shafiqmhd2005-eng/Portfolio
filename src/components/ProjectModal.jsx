import React from 'react';
import { X, CheckCircle, Cpu, Layers, HardDrive, ShieldCheck, ArrowRight } from 'lucide-react';
import CardioDigitalTwinSim from './CardioDigitalTwinSim';
import SolarTrackerSim from './SolarTrackerSim';
import SegmentClockSim from './SegmentClockSim';
import { sound } from '../utils/audio';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-space-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl border border-cyan-400/40 p-6 sm:p-8 text-slate-200">
        
        {/* Modal Close Button */}
        <button
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-space-900/80 border border-cyan-500/30 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-cyan-500/20">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{project.code}</span>
            <span>//</span>
            <span className="text-purple-400">{project.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
            {project.title}
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-cyan-950/50 text-cyan-300 border border-cyan-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Embedded Interactive Live Simulation */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-300 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            LIVE HARDWARE EMULATION & TELEMETRY DEMO
          </h3>
          {project.id === 'project-01' && <CardioDigitalTwinSim />}
          {project.id === 'project-02' && <SolarTrackerSim />}
          {project.id === 'project-03' && <SegmentClockSim />}
        </div>

        {/* System Architecture Flow Diagram */}
        {project.architectureSteps && (
          <div className="mb-8 glass-panel p-5 rounded-xl border border-cyan-500/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-300 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              SYSTEM ARCHITECTURE DATA FLOW
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {project.architectureSteps.map((step, idx) => (
                <React.Fragment key={step.label}>
                  <div className="p-3 rounded-lg bg-space-900 border border-cyan-500/25 flex flex-col h-full justify-between">
                    <div className="text-[10px] font-mono text-cyan-400 font-bold mb-1">
                      NODE 0{idx + 1}
                    </div>
                    <div className="text-xs font-bold text-white mb-1">{step.label}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{step.desc}</div>
                  </div>
                  {idx < project.architectureSteps.length - 1 && (
                    <div className="hidden sm:flex justify-center text-cyan-400">
                      <ArrowRight className="w-4 h-4 animate-pulse" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Deep Technical Dossier Sections */}
        <div className="space-y-6 text-sm">
          {/* Objective */}
          {project.details.objective && (
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
              <h4 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                ENGINEERING OBJECTIVE
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans">{project.details.objective}</p>
            </div>
          )}

          {/* Hardware & Components */}
          {project.details.hardware && (
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
              <h4 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider mb-3 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                HARDWARE ARCHITECTURE & BOM
              </h4>
              <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                {project.details.hardware.map((hw, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">›</span>
                    <span>{hw}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Firmware & Protocols */}
          {project.details.firmware && (
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
              <h4 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                FIRMWARE LOGIC & PERIPHERAL DRIVERS
              </h4>
              <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                {project.details.firmware.map((fw, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">›</span>
                    <span>{fw}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Testing & Debugging */}
          {project.details.testing && (
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
              <h4 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                VALIDATION, SIMULATION & TESTING
              </h4>
              <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                {project.details.testing.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <span className="text-slate-400">
            RECORD SOURCE: <span className="text-cyan-300">VERIFIED FROM ACADEMIC & LAB PORTFOLIO</span>
          </span>
          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 transition-all shadow-neon-cyan"
          >
            CLOSE DOSSIER
          </button>
        </div>

        {/* Corner Brackets */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />
      </div>
    </div>
  );
}
