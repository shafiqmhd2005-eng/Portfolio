import React, { useEffect, useRef, useState } from 'react';
import { Activity, Heart, Thermometer, Wind, Radio, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CardioDigitalTwinSim() {
  const canvasRef = useRef(null);
  const [rhythmMode, setRhythmMode] = useState('normal'); // 'normal', 'tachycardia', 'arrhythmia'
  const [bpm, setBpm] = useState(74);
  const [spo2, setSpo2] = useState(98);
  const [temp, setTemp] = useState(36.8);
  const [pressure, setPressure] = useState(1013.2);
  const [packetCount, setPacketCount] = useState(1482);
  const [lastSync, setLastSync] = useState('0.1s ago');

  useEffect(() => {
    // Mode parameters
    let targetBpm = 74;
    let targetSpo2 = 98;
    if (rhythmMode === 'tachycardia') {
      targetBpm = 126;
      targetSpo2 = 96;
    } else if (rhythmMode === 'arrhythmia') {
      targetBpm = 88;
      targetSpo2 = 94;
    }

    setBpm(targetBpm);
    setSpo2(targetSpo2);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 160);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 160;
    };
    window.addEventListener('resize', handleResize);

    // Waveform buffer
    const points = [];
    let t = 0;

    const render = () => {
      // Advance telemetry
      t += rhythmMode === 'tachycardia' ? 0.07 : rhythmMode === 'arrhythmia' ? 0.05 : 0.038;

      // Mathematical synthetic ECG model (P-Q-R-S-T wave)
      const beatProgress = (t % (Math.PI * 2)) / (Math.PI * 2);
      let ecgVal = 0;

      // P wave
      if (beatProgress > 0.1 && beatProgress < 0.2) {
        ecgVal += Math.sin((beatProgress - 0.1) * 10 * Math.PI) * 0.15;
      }
      // Q wave
      else if (beatProgress > 0.32 && beatProgress < 0.35) {
        ecgVal -= 0.18;
      }
      // R peak (QRS spike)
      else if (beatProgress >= 0.35 && beatProgress < 0.40) {
        ecgVal += 1.0;
        if (beatProgress > 0.37 && beatProgress < 0.39) sound.telemetryPulse();
      }
      // S wave
      else if (beatProgress >= 0.40 && beatProgress < 0.44) {
        ecgVal -= 0.35;
      }
      // T wave
      else if (beatProgress > 0.55 && beatProgress < 0.7) {
        ecgVal += Math.sin((beatProgress - 0.55) * 6.66 * Math.PI) * 0.28;
      }

      // Add mild physiological baseline noise
      ecgVal += (Math.random() - 0.5) * 0.04;

      // Extra erratic fluctuation in arrhythmia
      if (rhythmMode === 'arrhythmia' && Math.random() > 0.85) {
        ecgVal += (Math.random() - 0.5) * 0.4;
      }

      points.push(ecgVal);
      if (points.length > width) {
        points.shift();
      }

      // Draw background
      ctx.fillStyle = '#030814';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle oscilloscope grid
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center baseline line
      const midY = height * 0.55;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // Draw ECG trace
      if (points.length > 1) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = rhythmMode === 'arrhythmia' ? '#f43f5e' : rhythmMode === 'tachycardia' ? '#f59e0b' : '#00e5ff';
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 8;

        for (let i = 0; i < points.length; i++) {
          const x = i;
          const y = midY - points[i] * (height * 0.38);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Current leading beam head
        const lastX = points.length - 1;
        const lastY = midY - points[lastX] * (height * 0.38);
        ctx.beginPath();
        ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Packet counter ticker
    const packetInterval = setInterval(() => {
      setPacketCount((p) => p + 1);
      setLastSync('just now');
    }, 1200);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      clearInterval(packetInterval);
    };
  }, [rhythmMode]);

  return (
    <div className="glass-panel p-4 md:p-6 rounded-xl border border-cyan-500/30">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-cyan-500/20 font-mono">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-bold text-xs uppercase tracking-wider">
            DIGITAL TWIN TELEMETRY STREAM // ESP32 + AD8232 + MAX30102
          </span>
        </div>

        {/* State select buttons */}
        <div className="flex items-center space-x-1.5 text-xs">
          <span className="text-slate-400 text-[10px] hidden sm:inline mr-1">SIMULATION TEST:</span>
          {[
            { id: 'normal', label: 'NORMAL SINUS' },
            { id: 'tachycardia', label: 'TACHYCARDIA' },
            { id: 'arrhythmia', label: 'ARRHYTHMIA' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setRhythmMode(mode.id);
                sound.click();
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                rhythmMode === mode.id
                  ? mode.id === 'arrhythmia'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                    : mode.id === 'tachycardia'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-space-800 border border-slate-700'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Oscilloscope Canvas */}
      <div className="relative w-full h-[160px] rounded-lg overflow-hidden border border-cyan-500/20 mb-4 bg-space-950">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute top-2 left-3 text-[10px] font-mono text-cyan-400/80 bg-space-900/80 px-2 py-0.5 rounded border border-cyan-500/20">
          CH-1: AD8232 ECG BIOPOTENTIAL // 500 SAMPLES/S // DSP FILTER ACTIVE
        </div>
        <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-400 bg-space-900/80 px-2 py-0.5 rounded border border-slate-700">
          PACKETS SENT: <span className="text-cyan-300 font-bold">{packetCount}</span>
        </div>
      </div>

      {/* Real-time Telemetry Sensor Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        {/* BPM */}
        <div className="glass-panel p-3 rounded-lg border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              HEART RATE
            </span>
            <span className="text-[9px] text-slate-500">MAX30102</span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className={`text-xl font-bold ${rhythmMode === 'arrhythmia' ? 'text-rose-400' : 'text-cyan-300'}`}>
              {bpm}
            </span>
            <span className="text-slate-400 text-xs">BPM</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Peak-to-peak delta</div>
        </div>

        {/* SpO2 */}
        <div className="glass-panel p-3 rounded-lg border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              SPO2 OXYGEN
            </span>
            <span className="text-[9px] text-slate-500">OPTICAL</span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-bold text-cyan-300">{spo2}</span>
            <span className="text-slate-400 text-xs">%</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Red/IR ratio (R)</div>
        </div>

        {/* Temperature */}
        <div className="glass-panel p-3 rounded-lg border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              SKIN TEMP
            </span>
            <span className="text-[9px] text-slate-500">DS18B20</span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-bold text-amber-300">{temp}</span>
            <span className="text-slate-400 text-xs">°C</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">1-Wire protocol</div>
        </div>

        {/* Ambient Pressure */}
        <div className="glass-panel p-3 rounded-lg border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Wind className="w-3.5 h-3.5 text-purple-400" />
              PRESSURE
            </span>
            <span className="text-[9px] text-slate-500">BME280</span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-bold text-purple-300">{pressure}</span>
            <span className="text-slate-400 text-xs">hPa</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">I2C addr: 0x76</div>
        </div>
      </div>

      {/* Cloud Uplink Status bar */}
      <div className="mt-3 pt-2.5 border-t border-cyan-500/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center space-x-2">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>BROKER: <span className="text-slate-200">ThingSpeak / Blynk MQTT</span></span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400">QoS 1 ACKNOWLEDGED</span>
        </div>
        <div className="text-slate-500 text-[10px]">
          FIRMWARE TASK: FreeRTOS Core 1 (Priority 2)
        </div>
      </div>
    </div>
  );
}
