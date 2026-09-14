import React from 'react';
import { Flag, Trophy, Shield, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

const leaderIcons = {
  Flag: Flag,
  Trophy: Trophy,
};

export default function LeadershipSection() {
  const items = resumeData.leadership.items;

  return (
    <section id="leadership" className="relative py-20 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>08 // COMMAND</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400">{resumeData.leadership.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
            {resumeData.leadership.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded mt-3" />
        </div>

        {/* Leadership Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => {
            const Icon = leaderIcons[item.icon] || Shield;
            return (
              <div
                key={idx}
                onMouseEnter={() => sound.hover()}
                className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-neon-cyan transition-all duration-300 flex items-start space-x-4 relative"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    LEADERSHIP MISSION BADGE #0{idx + 1}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-purple-300 mb-2">
                    {item.organization}
                  </div>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="hud-corner-tl" />
                <div className="hud-corner-br" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
