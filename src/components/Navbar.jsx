import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Menu, X, Cpu } from 'lucide-react';
import { sound } from '../utils/audio';

const NAV_ITEMS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT ME', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'CERTIFICATIONS', href: '#certifications' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar({ onOpenTerminal, onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.muted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const nextState = sound.toggleMute();
    setIsAudioMuted(nextState);
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    sound.click();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-xl sm:rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'glass-panel-glow py-2 sm:py-2.5 px-4 sm:px-6 shadow-neon-cyan'
            : 'glass-panel py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand / Name */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center space-x-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-neon-cyan group-hover:bg-cyan-500/20 transition-all">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-bold text-sm sm:text-base text-white tracking-wider flex items-center gap-1.5">
                <span>MOHAMED SHAFIQ M</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">AVAILABLE FOR HIRE</span>
                <span className="text-slate-600 hidden md:inline">|</span>
                <span className="text-cyan-300 hidden md:inline">Embedded Engineer</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 text-xs font-mono">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all relative ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-neon-cyan'
                      : 'text-slate-300 hover:text-cyan-300 hover:bg-space-800'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Utility Tools */}
          <div className="flex items-center space-x-2">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              title={isAudioMuted ? 'Turn on sound effects' : 'Mute sound effects'}
              className={`p-2 rounded-lg border text-xs font-mono transition-all ${
                isAudioMuted
                  ? 'border-slate-700 text-slate-500 hover:text-slate-300 bg-space-900/60'
                  : 'border-cyan-400/50 text-cyan-300 bg-cyan-500/20 shadow-neon-cyan'
              }`}
            >
              {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Embedded Terminal Button */}
            <button
              onClick={() => {
                sound.click();
                onOpenTerminal();
              }}
              title="Open Interactive Command Terminal"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-space-900/80 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/15 text-xs font-mono transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-[11px]">CONSOLE</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                sound.click();
                onOpenResume();
              }}
              className="hidden md:flex items-center px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 text-xs font-mono font-bold transition-all shadow-neon-cyan"
            >
              RESUME
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                sound.click();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="xl:hidden p-2 rounded-lg bg-space-900/80 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-cyan-500/20 flex flex-col space-y-2 font-mono text-xs animate-fadeIn">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-space-800 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-cyan-400 text-[10px]">›</span>
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
              <button
                onClick={() => {
                  sound.click();
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex-1 py-2 rounded-lg bg-space-900 border border-cyan-500/30 text-cyan-300 text-center flex items-center justify-center space-x-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CONSOLE</span>
              </button>
              <button
                onClick={() => {
                  sound.click();
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-center font-bold"
              >
                VIEW RESUME
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
