import React, { useState, useEffect, useRef } from 'react';
import { Sun, Compass, Sliders, Play, Pause, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

export default function SolarTrackerSim() {
  // Sun coordinates normalized from -1 to 1
  const [sunPos, setSunPos] = useState({ x: 0.3, y: -0.6 });
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const containerRef = useRef(null);

  // Auto orbit animation
  useEffect(() => {
    if (!isAutoOrbit) return;
    let angle = 0.5;
    const interval = setInterval(() => {
      angle += 0.02;
      setSunPos({
        x: Math.cos(angle) * 0.7,
        y: -Math.abs(Math.sin(angle)) * 0.7 - 0.1
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoOrbit]);

  // Compute LDR values based on sun position
  // 4 quadrants: TL (-0.3, -0.3), TR (0.3, -0.3), BL (-0.3, 0.3), BR (0.3, 0.3)
  const calcLdr = (lx, ly) => {
    const dist = Math.hypot(sunPos.x - lx, sunPos.y - ly);
    const intensity = Math.max(0.1, 1 - dist * 0.7);
    return Math.round(intensity * 1023);
  };

  const ldrTL = calcLdr(-0.35, -0.35);
  const ldrTR = calcLdr(0.35, -0.35);
  const ldrBL = calcLdr(-0.35, 0.35);
  const ldrBR = calcLdr(0.35, 0.35);

  // Servo angles based on differential
  const diffH = (ldrTL + ldrBL) - (ldrTR + ldrBR);
  const diffV = (ldrTL + ldrTR) - (ldrBL + ldrBR);

  // Map sun pos to servo angles: Azimuth (0° to 180°), Elevation (10° to 90°)
  const azimuth = Math.round(90 + (sunPos.x * 70));
  const elevation = Math.round(50 + (-sunPos.y * 40));

  // Efficiency %
  const alignmentEfficiency = Math.round(Math.max(78, 100 - (Math.abs(diffH) + Math.abs(diffV)) * 0.015));

  const handlePointerMove = (e) => {
    if (isAutoOrbit) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setSunPos({
      x: Math.max(-0.85, Math.min(0.85, nx)),
      y: Math.max(-0.85, Math.min(0.2, ny))
    });
  };

  return (
    <div className="glass-panel p-4 md:p-6 rounded-xl border border-cyan-500/30 font-mono">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-cyan-500/20">
        <div className="flex items-center space-x-2">
          <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
          <span className="text-cyan-300 font-bold text-xs uppercase tracking-wider">
            DUAL-AXIS SOLAR TRACKING ENGINE // ARDUINO + 4x LDR + DUAL SERVO
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => {
              setIsAutoOrbit(!isAutoOrbit);
              sound.click();
            }}
            className={`px-3 py-1 rounded text-[11px] flex items-center space-x-1.5 transition-all ${
              isAutoOrbit
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan'
                : 'bg-space-800 text-slate-300 border border-slate-700'
            }`}
          >
            {isAutoOrbit ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isAutoOrbit ? 'ORBITING SUN' : 'MANUAL DRAG'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Sky Dome Tracker Arena */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          className="relative h-[220px] rounded-lg border border-cyan-500/25 bg-space-950 overflow-hidden flex items-center justify-center cursor-crosshair select-none"
        >
          {/* Orbital grid lines */}
          <div className="absolute inset-4 rounded-full border border-cyan-500/10" />
          <div className="absolute inset-12 rounded-full border border-cyan-500/20 border-dashed" />
          <div className="absolute inset-20 rounded-full border border-cyan-500/15" />
          <div className="absolute w-full h-[1px] bg-cyan-500/15" />
          <div className="absolute h-full w-[1px] bg-cyan-500/15" />

          {/* Interactive Sun Token */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-75 pointer-events-none"
            style={{
              left: `${((sunPos.x + 1) / 2) * 100}%`,
              top: `${((sunPos.y + 1) / 2) * 100}%`,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-amber-400 shadow-[0_0_25px_#f59e0b] flex items-center justify-center text-space-950">
              <Sun className="w-5 h-5" />
            </div>
            <span className="text-[9px] text-amber-300 font-bold absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              SOLAR VECTOR
            </span>
          </div>

          {/* 3D-styled Dual-Axis Solar Panel Model */}
          <div
            className="w-24 h-24 rounded-lg bg-gradient-to-br from-cyan-950 via-space-900 to-blue-950 border-2 border-cyan-400 shadow-neon-cyan flex flex-col items-center justify-center relative transition-transform duration-200"
            style={{
              transform: `perspective(400px) rotateX(${(elevation - 50) * 0.5}deg) rotateY(${(azimuth - 90) * 0.6}deg)`
            }}
          >
            {/* 4 LDR Sensor Points */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-cyan-400" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />

            <div className="w-16 h-16 grid grid-cols-2 grid-rows-2 gap-1 p-1">
              <div className="bg-cyan-500/20 border border-cyan-400/40 rounded" />
              <div className="bg-cyan-500/20 border border-cyan-400/40 rounded" />
              <div className="bg-cyan-500/20 border border-cyan-400/40 rounded" />
              <div className="bg-cyan-500/20 border border-cyan-400/40 rounded" />
            </div>
          </div>

          <div className="absolute bottom-2 left-3 text-[10px] text-slate-500">
            {isAutoOrbit ? 'MODE: AUTO-ORBIT TEST' : 'CLICK & DRAG SUN IN SKY DOME'}
          </div>
        </div>

        {/* Real-time Servo & LDR Telemetry */}
        <div className="space-y-3">
          {/* Dual Servo Angles */}
          <div className="grid grid-cols-2 gap-2">
            <div className="glass-panel p-3 rounded-lg border border-cyan-500/20">
              <div className="text-[10px] text-slate-400 mb-0.5">AZIMUTH SERVO (HORIZ)</div>
              <div className="text-xl font-bold text-cyan-300 flex items-baseline space-x-1">
                <span>{azimuth}°</span>
                <span className="text-[10px] text-slate-500 font-normal">PWM PIN 9</span>
              </div>
              <div className="w-full bg-space-900 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full transition-all" style={{ width: `${(azimuth / 180) * 100}%` }} />
              </div>
            </div>

            <div className="glass-panel p-3 rounded-lg border border-cyan-500/20">
              <div className="text-[10px] text-slate-400 mb-0.5">ELEVATION SERVO (VERT)</div>
              <div className="text-xl font-bold text-cyan-300 flex items-baseline space-x-1">
                <span>{elevation}°</span>
                <span className="text-[10px] text-slate-500 font-normal">PWM PIN 10</span>
              </div>
              <div className="w-full bg-space-900 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full transition-all" style={{ width: `${(elevation / 90) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* 4 Quadrant LDR ADC Matrix */}
          <div className="glass-panel p-3 rounded-lg border border-cyan-500/20">
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2">
              <span>LDR 10-BIT ADC READINGS (0-1023)</span>
              <span className="text-emerald-400 font-bold">EFFICIENCY: {alignmentEfficiency}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-1.5 bg-space-900/90 rounded flex justify-between border border-cyan-500/10">
                <span className="text-slate-400">TOP-LEFT (A0):</span>
                <span className="text-cyan-300 font-bold">{ldrTL}</span>
              </div>
              <div className="p-1.5 bg-space-900/90 rounded flex justify-between border border-cyan-500/10">
                <span className="text-slate-400">TOP-RIGHT (A1):</span>
                <span className="text-cyan-300 font-bold">{ldrTR}</span>
              </div>
              <div className="p-1.5 bg-space-900/90 rounded flex justify-between border border-cyan-500/10">
                <span className="text-slate-400">BOT-LEFT (A2):</span>
                <span className="text-cyan-300 font-bold">{ldrBL}</span>
              </div>
              <div className="p-1.5 bg-space-900/90 rounded flex justify-between border border-cyan-500/10">
                <span className="text-slate-400">BOT-RIGHT (A3):</span>
                <span className="text-cyan-300 font-bold">{ldrBR}</span>
              </div>
            </div>
          </div>

          {/* Firmware Logic Snippet */}
          <div className="text-[10px] text-slate-500 flex items-center justify-between px-1">
            <span>ΔH: {diffH} | ΔV: {diffV}</span>
            <span>HYSTERESIS DEADBAND: ±15 COUNTS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
