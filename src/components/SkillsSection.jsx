import React, { useState } from 'react';
import { Cpu, Terminal, Radio, Wrench, Wifi, Layers, Info } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

const categoryIcons = {
  Programming: Terminal,
  'Communication Protocols': Radio,
  'Microcontrollers / Platforms': Cpu,
  'Engineering Tools': Wrench,
  'IoT Platforms': Wifi,
  'Core Electronics': Layers,
};

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeSkill, setActiveSkill] = useState(null);

  const categories = resumeData.skills.categories;
  const filteredCategories =
    selectedCategory === 'ALL'
      ? categories
      : categories.filter((c) => c.category === selectedCategory);

  return (
    <section id="skills" className="relative py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>03 // MATRIX</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400">{resumeData.skills.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
            {resumeData.skills.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded mt-3" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              sound.click();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan'
                : 'glass-panel text-slate-400 hover:text-slate-200 border-cyan-500/20'
            }`}
          >
            ALL CAPABILITIES
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setSelectedCategory(cat.category);
                sound.click();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat.category
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-neon-cyan'
                  : 'glass-panel text-slate-400 hover:text-slate-200 border-cyan-500/20'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Holographic Category Grid */}
        <div className="space-y-10">
          {filteredCategories.map((group) => {
            const Icon = categoryIcons[group.category] || Cpu;
            return (
              <div key={group.category} className="space-y-4">
                
                {/* Category Header Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 font-mono text-xs">
                  <div className="flex items-center space-x-2 text-cyan-300">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold tracking-wider">{group.category}</span>
                  </div>
                  <span className="text-[10px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                    {group.badge}
                  </span>
                </div>

                {/* Skill Modules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {group.items.map((skill) => {
                    const isHovered = activeSkill === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => {
                          setActiveSkill(skill.name);
                          sound.hover();
                        }}
                        onMouseLeave={() => setActiveSkill(null)}
                        className={`relative rounded-xl p-4 transition-all duration-300 cursor-default flex flex-col justify-between ${
                          isHovered
                            ? 'glass-panel-glow border-cyan-400 -translate-y-1 shadow-neon-cyan'
                            : 'glass-panel border-cyan-500/20 hover:border-cyan-500/40'
                        }`}
                      >
                        <div>
                          {/* Module Header */}
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider">
                              {skill.name}
                            </span>
                            <span className="text-[9px] font-mono text-slate-400 bg-space-900 px-1.5 py-0.5 rounded border border-slate-700">
                              {skill.tag}
                            </span>
                          </div>

                          {/* Technical Explanation (always visible, expanded on hover) */}
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            {skill.description}
                          </p>
                        </div>

                        {/* Module Status Footer */}
                        <div className="mt-4 pt-2 border-t border-cyan-500/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            MODULE LOADED
                          </span>
                          <span className="text-slate-400">HARDWARE READY</span>
                        </div>

                        {/* Interactive circuit corner on hover */}
                        {isHovered && (
                          <>
                            <div className="hud-corner-tl" />
                            <div className="hud-corner-br" />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
