import React from 'react';
import { ArrowRight, Download, Activity, Cpu, Wifi, Layers, Terminal } from 'lucide-react';
import Hero3D from './Hero3D';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

export default function Hero({ onOpenResume, onOpenTerminal }) {
  const scrollToProjects = (e) => {
    e.preventDefault();
    sound.engage();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Top Status & Telemetry Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-xs text-slate-400">
          <div className="flex items-center space-x-2 glass-panel px-3 py-1.5 rounded-lg border border-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">● {resumeData.personal.status}</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300 uppercase">EMBEDDED ENGINEER</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 uppercase">BANGALORE, INDIA</span>
          </div>

          <div className="hidden sm:flex items-center space-x-4 text-[11px] text-slate-500">
            <span>MISSION ID: <strong className="text-cyan-400">{resumeData.personal.telemetry.missionId}</strong></span>
            <span>CORE TEMP: <strong className="text-cyan-400">{resumeData.personal.telemetry.coreTemp}</strong></span>
            <span>BUS BAUD: <strong className="text-purple-400">{resumeData.personal.telemetry.baudRate}</strong></span>
          </div>
        </div>

        {/* 2-Column Hero Grid: Left Content, Right 3D Interactive Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headings, Mission Tag, CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Small Label */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{resumeData.personal.tagline}</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                MOHAMED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400">
                  SHAFIQ M
                </span>
              </h1>
              
              {/* Subheading */}
              <div className="text-xl sm:text-2xl font-mono text-cyan-300 font-semibold tracking-wide flex items-center gap-2">
                <span>{resumeData.personal.role}</span>
              </div>
            </div>

            {/* Supporting Text */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-sans font-light">
              "{resumeData.personal.statement}"
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-space-950 font-bold font-mono text-xs tracking-wider uppercase flex items-center space-x-2 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-neon-cyan active:scale-95 group"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  sound.click();
                  onOpenResume();
                }}
                className="px-6 py-3.5 rounded-xl glass-panel text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 font-mono text-xs tracking-wider uppercase flex items-center space-x-2 transition-all hover:bg-space-800 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </button>
            </div>

            {/* Animated Telemetry Numbers (strictly verified telemetry status) */}
            <div className="pt-6 border-t border-cyan-500/15 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="glass-panel p-2.5 rounded-lg border border-cyan-500/20">
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  MCU
                </div>
                <div className="text-cyan-300 font-bold tracking-wider mt-0.5">
                  {resumeData.personal.telemetry.mcu}
                </div>
              </div>

              <div className="glass-panel p-2.5 rounded-lg border border-cyan-500/20">
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  FIRMWARE
                </div>
                <div className="text-emerald-400 font-bold tracking-wider mt-0.5">
                  {resumeData.personal.telemetry.firmware}
                </div>
              </div>

              <div className="glass-panel p-2.5 rounded-lg border border-cyan-500/20">
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-purple-400" />
                  IOT BUS
                </div>
                <div className="text-purple-300 font-bold tracking-wider mt-0.5">
                  {resumeData.personal.telemetry.iotBus}
                </div>
              </div>

              <div className="glass-panel p-2.5 rounded-lg border border-cyan-500/20">
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-blue-400" />
                  PCB DESIGN
                </div>
                <div className="text-blue-300 font-bold tracking-wider mt-0.5">
                  {resumeData.personal.telemetry.pcbFab}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Embedded Satellite Core */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full rounded-2xl glass-panel p-2 sm:p-4 border border-cyan-500/30 shadow-neon-cyan">
              
              {/* Telemetry Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-500/20 font-mono text-[11px] text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-300 font-bold">PRIMARY PAYLOAD: INTERACTIVE 3D SATELLITE & PCB</span>
                </div>
                <span className="text-slate-500 hidden sm:inline">WebGL 2.0 • 60 FPS</span>
              </div>

              {/* Three.js Canvas Container */}
              <Hero3D />

              {/* Bottom Quick Bar */}
              <div className="px-3 py-2 border-t border-cyan-500/15 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400">SOC:</span>
                  <span>ESP32 (240MHz)</span>
                </div>
                <button
                  onClick={() => {
                    sound.click();
                    onOpenTerminal();
                  }}
                  className="text-cyan-300 hover:text-white flex items-center space-x-1"
                >
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>OPEN CLI TELEMETRY</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
