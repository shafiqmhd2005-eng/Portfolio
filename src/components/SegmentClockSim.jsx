import React, { useState, useEffect } from 'react';
import { Clock, Cpu, Zap, RotateCw } from 'lucide-react';
import { sound } from '../utils/audio';

// 7-segment segment mapping (a-g) for digits 0-9
// [a, b, c, d, e, f, g]
const SEGMENT_MAP = {
  '0': [1, 1, 1, 1, 1, 1, 0],
  '1': [0, 1, 1, 0, 0, 0, 0],
  '2': [1, 1, 0, 1, 1, 0, 1],
  '3': [1, 1, 1, 1, 0, 0, 1],
  '4': [0, 1, 1, 0, 0, 1, 1],
  '5': [1, 0, 1, 1, 0, 1, 1],
  '6': [1, 0, 1, 1, 1, 1, 1],
  '7': [1, 1, 1, 0, 0, 0, 0],
  '8': [1, 1, 1, 1, 1, 1, 1],
  '9': [1, 1, 1, 1, 0, 1, 1],
  ' ': [0, 0, 0, 0, 0, 0, 0],
};

function SevenSegmentDigit({ char = '0', isActive = true, digitIndex = 0 }) {
  const segs = SEGMENT_MAP[char] || SEGMENT_MAP[' '];

  return (
    <div className={`relative w-12 h-20 sm:w-14 sm:h-24 p-1.5 rounded transition-all ${
      isActive ? 'bg-space-900 border border-cyan-500/40 shadow-neon-cyan' : 'bg-space-950/60 opacity-30 border border-slate-800'
    }`}>
      {/* Digit index indicator */}
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-400/80">
        D{digitIndex + 1}
      </span>

      {/* SVG 7-Segment Digit */}
      <svg viewBox="0 0 50 80" className="w-full h-full">
        {/* Segment a (top) */}
        <polygon
          points="10,8 40,8 36,14 14,14"
          fill={isActive && segs[0] ? '#00e5ff' : '#0e2438'}
          filter={isActive && segs[0] ? 'drop-shadow(0 0 4px #00e5ff)' : 'none'}
        />
        {/* Segment b (top-right) */}
        <polygon
          points="41,10 47,15 44,38 38,34"
          fill={isActive && segs[1] ? '#00e5ff' : '#0e2438'}
          filter={isActive && segs[1] ? 'drop-shadow(0 0 4px #00e5ff)' : 'none'}
        />
        {/* Segment c (bottom-right) */}
        <polygon
          points="38,42 44,38 41,66 35,61"
          fill={isActive && segs[2] ? '#00e5ff' : '#0e2438'}
          filter={isActive && segs[2] ? 'drop-shadow(0 0 4px #00e5ff)' : 'none'}
        />
        {/* Segment d (bottom) */}
        <polygon
          points="14,62 36,62 40,68 10,68"
          fill={isActive && segs[3] ? '#00e5ff' : '#0e2438'}
          filter={isActive && segs[3] ? 'drop-shadow(0 0 4px #00e5ff)' : 'none'}
        />
        {/* Segment e (bottom-left) */}
        <polygon
          points="6,38 12,42 15,61 9,66"
          fill={isActive && segs[4] ? '#00e5ff' : '#0e2438'}
          filter={isActive && segs[4] ? 'drop-shadow(0 0 4px #00e5ff)' : 'none'}
        />
        {/* Segment f (top-left) */}
        <polygon
          points="9,15 15,10 12,34 6,38"
          fill={isActive && segs[5] ? '#00e5ff' : '#0e2438'}
          filter={isActive && segs[5] ? 'drop-shadow(0 0 4px #00e5ff)' : 'none'}
        />
        {/* Segment g (center) */}
        <polygon
          points="13,36 37,36 39,40 37,44 13,44 11,40"
          fill={isActive && segs[6] ? '#00e5ff' : '#0e2438'}
          filter={isActive && segs[6] ? 'drop-shadow(0 0 4px #00e5ff)' : 'none'}
        />
      </svg>
    </div>
  );
}

export default function SegmentClockSim() {
  const [timeStr, setTimeStr] = useState('1200');
  const [activeDigitScan, setActiveDigitScan] = useState(0);
  const [isSlowMo, setIsSlowMo] = useState(false);
  const [colonBlink, setColonBlink] = useState(true);

  // Clock tick
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${h}${m}`);
      setColonBlink((b) => !b);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Multiplexing scanning simulation
  useEffect(() => {
    // Normal POV speed = high frequency (~4ms per digit = 250Hz)
    // Slow-mo speed = 400ms per digit to demonstrate POV persistence to human eyes
    const scanDelay = isSlowMo ? 350 : 25;
    const interval = setInterval(() => {
      setActiveDigitScan((d) => (d + 1) % 4);
    }, scanDelay);

    return () => clearInterval(interval);
  }, [isSlowMo]);

  const digits = timeStr.split('');

  return (
    <div className="glass-panel p-4 md:p-6 rounded-xl border border-cyan-500/30 font-mono">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-cyan-500/20">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-300 font-bold text-xs uppercase tracking-wider">
            7-SEGMENT POV MULTIPLEXER // ATMEGA328P + COMMON-CATHODE BJT SWITCHING
          </span>
        </div>

        <button
          onClick={() => {
            setIsSlowMo(!isSlowMo);
            sound.click();
          }}
          className={`px-3 py-1 rounded text-[11px] flex items-center space-x-1.5 transition-all ${
            isSlowMo
              ? 'bg-purple-500/20 text-purple-300 border border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
              : 'bg-space-800 text-slate-300 border border-slate-700'
          }`}
        >
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>{isSlowMo ? 'SLOW-MO POV: ON (3 Hz)' : 'POV NORMAL (250 Hz)'}</span>
        </button>
      </div>

      {/* Main Display Simulation Frame */}
      <div className="flex flex-col items-center justify-center p-6 bg-space-950 rounded-lg border border-cyan-500/20">
        <div className="flex items-center space-x-2 sm:space-x-4 mb-4">
          <SevenSegmentDigit
            char={digits[0]}
            digitIndex={0}
            isActive={!isSlowMo || activeDigitScan === 0}
          />
          <SevenSegmentDigit
            char={digits[1]}
            digitIndex={1}
            isActive={!isSlowMo || activeDigitScan === 1}
          />

          {/* Colon LEDs */}
          <div className="flex flex-col space-y-4 px-1">
            <div className={`w-2 h-2 rounded-full transition-all ${colonBlink ? 'bg-cyan-400 shadow-[0_0_8px_#00e5ff]' : 'bg-space-900'}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${colonBlink ? 'bg-cyan-400 shadow-[0_0_8px_#00e5ff]' : 'bg-space-900'}`} />
          </div>

          <SevenSegmentDigit
            char={digits[2]}
            digitIndex={2}
            isActive={!isSlowMo || activeDigitScan === 2}
          />
          <SevenSegmentDigit
            char={digits[3]}
            digitIndex={3}
            isActive={!isSlowMo || activeDigitScan === 3}
          />
        </div>

        {/* Multiplexing Hardware Strobe Diagram */}
        <div className="w-full max-w-md grid grid-cols-4 gap-2 text-center text-[10px] mt-2">
          {[0, 1, 2, 3].map((idx) => {
            const isScanningThis = isSlowMo ? activeDigitScan === idx : true;
            return (
              <div
                key={idx}
                className={`p-1.5 rounded border transition-all ${
                  isScanningThis
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                    : 'bg-space-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold">TRANSISTOR Q{idx + 1}</div>
                <div>{isScanningThis ? 'SINKING LOW' : 'CUTOFF'}</div>
                <div className="text-[8px] text-slate-400">PIN D{idx + 2}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Firmware Architecture Details */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
        <div className="glass-panel p-2.5 rounded border border-cyan-500/10">
          <span className="text-cyan-300 font-bold">POV MULTIPLEXING PRINCIPLE:</span>
          <p className="text-[10px] text-slate-400 mt-1">
            Only 1 digit is physically energized at any microsecond. By strobing across all 4 digits faster than human persistence of vision (~50Hz threshold), eyes perceive continuous display with only 8 + 4 = 12 MCU pins!
          </p>
        </div>
        <div className="glass-panel p-2.5 rounded border border-cyan-500/10">
          <span className="text-cyan-300 font-bold">TIMING LOGIC:</span>
          <p className="text-[10px] text-slate-400 mt-1">
            Hardware Timer2 generates 250Hz compare-match interrupt for smooth display scanning while Timer1 counts precise 1-second ticks for RTC accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}
