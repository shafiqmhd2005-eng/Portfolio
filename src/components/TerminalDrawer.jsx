import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2, CornerDownLeft } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

export default function TerminalDrawer({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'MOHAMED SHAFIQ M // EMBEDDED SYSTEM FIRMWARE CONSOLE v2.6.4' },
    { type: 'system', text: 'Connected to target: ESP32-WROOM-32D via UART0 (115200 8-N-1)' },
    { type: 'system', text: 'Type "help" for an index of available diagnostics commands.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim().toLowerCase();
    sound.click();

    const newHistory = [...history, { type: 'user', text: `> ${input}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `AVAILABLE COMMANDS:
  help        - List available diagnostic commands
  whoami      - Print engineer profile & status
  skills      - Dump technical skills and protocol matrix
  experience  - Show engineering internship history
  projects    - Output verified project list
  ping esp32  - Ping virtual ESP32 target over UART
  contact     - Display uplink communication channels
  clear       - Clear console buffer
  exit        - Close terminal console`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'response',
          text: `ENGINEER: ${resumeData.personal.name}
ROLE: ${resumeData.personal.role}
EDUCATION: ${resumeData.education.degree} (${resumeData.education.duration})
STATUS: ${resumeData.personal.status} | LOC: ${resumeData.personal.location}
STATEMENT: "${resumeData.personal.statement}"`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `TECHNICAL STACK & CAPABILITIES:
- Languages: C, C++
- Protocols: UART, SPI, I2C, GPIO
- Platforms: ESP32, ATmega328P, Arduino
- EDA / Tools: KiCad, Proteus Design Suite, Arduino IDE, VS Code, LabVIEW
- IoT: Blynk, ThingSpeak
- Core: Digital/Analog Electronics, Schematics, Datasheet Analysis`
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'response',
          text: `MISSION LOG / INTERNSHIPS:
1. HARDWARE INTERN | Matt Engineering Solution (Dec 2025 – Feb 2026)
2. IoT INTERN      | Matt Engineering Solution (Jul 2025 – Aug 2025)
3. EMBEDDED INTERN | Srishti Innovative — Technopark (Jul 2024 – Aug 2024)`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `PROJECTS:
[PRJ-01] IoT-Enabled Digital Twin for Real-Time Cardiovascular Disease Monitoring
         (ESP32, MAX30102, AD8232, DS18B20, BME280)
[PRJ-02] Automatic Dual-Axis Solar Tracker (Arduino, 4x LDR, Dual Servo)
[PRJ-03] Seven-Segment Display Digital Clock (Arduino, POV Multiplexing)`
        });
        break;

      case 'ping esp32':
        newHistory.push({
          type: 'response',
          text: `PING 192.168.4.1 (ESP32-AP): 32 bytes data.
64 bytes from 192.168.4.1: icmp_seq=1 ttl=64 time=11.4 ms
64 bytes from 192.168.4.1: icmp_seq=2 ttl=64 time=9.8 ms
64 bytes from 192.168.4.1: icmp_seq=3 ttl=64 time=12.1 ms
--- 192.168.4.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, rtt min/avg/max = 9.8/11.1/12.1 ms`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `UPLINK CHANNELS:
- Email: ${resumeData.personal.email}
- Phone: ${resumeData.personal.phones.join(' / ')}
- Location: ${resumeData.personal.location}`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Unknown command: "${cmd}". Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[480px] flex flex-col bg-space-950 border border-cyan-500/40 rounded-xl shadow-neon-cyan overflow-hidden font-mono text-xs">
        
        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-space-900 border-b border-cyan-500/30 text-slate-300">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 font-bold tracking-wider">
              EMBEDDED_UART_TERMINAL // SHAFIQ_CLI
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-space-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Log Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-space-950/90 select-text">
          {history.map((item, index) => (
            <div
              key={index}
              className={`leading-relaxed whitespace-pre-wrap ${
                item.type === 'user'
                  ? 'text-cyan-300 font-bold'
                  : item.type === 'error'
                  ? 'text-rose-400'
                  : item.type === 'system'
                  ? 'text-purple-400/90'
                  : 'text-slate-300'
              }`}
            >
              {item.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-space-900/95 border-t border-cyan-500/30 flex items-center space-x-2">
          <span className="text-cyan-400 font-bold">esp32@shafiq:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type 'help' and press Enter..."
            className="flex-1 bg-transparent border-none outline-none text-cyan-200 placeholder:text-slate-600 font-mono text-xs"
          />
          <button
            onClick={() => handleCommand({ key: 'Enter' })}
            className="p-1.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Corner brackets */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />
      </div>
    </div>
  );
}
