import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.click();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-space-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel-glow rounded-2xl border border-cyan-400/40 p-6 sm:p-10 text-slate-100">
        
        {/* Actions Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-cyan-500/30 print:hidden">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>OFFICIAL RESUME DOSSIER // MOHAMED SHAFIQ M</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 text-xs font-mono transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>
            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-space-900 border border-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="space-y-6 text-slate-200">
          {/* Header */}
          <div className="border-b border-slate-700/60 pb-6">
            <h1 className="text-3xl font-display font-bold tracking-wide text-white">
              {resumeData.personal.name}
            </h1>
            <p className="text-cyan-400 font-mono text-sm tracking-wide mt-1">
              {resumeData.personal.role} | Embedded Systems • IoT • Firmware • PCB Design
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {resumeData.personal.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                {resumeData.personal.phones.join(' / ')}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {resumeData.personal.location}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {resumeData.about.bio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-2">
              EDUCATION
            </h2>
            <div className="border-l-2 border-cyan-500/40 pl-3">
              <div className="flex flex-wrap justify-between items-baseline">
                <h3 className="text-sm font-bold text-white">{resumeData.education.degree}</h3>
                <span className="text-xs font-mono text-slate-400">{resumeData.education.duration}</span>
              </div>
              <p className="text-xs text-slate-300">
                {resumeData.education.institution} ({resumeData.education.affiliation})
              </p>
              <div className="text-xs font-mono text-cyan-300 font-bold mt-1">
                CGPA: {resumeData.education.cgpa}
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {resumeData.skills.categories.map((cat) => (
                <div key={cat.category} className="p-2.5 rounded bg-space-900/60 border border-slate-800">
                  <div className="font-bold text-cyan-300 font-mono text-[11px] mb-1">
                    {cat.category}:
                  </div>
                  <div className="text-slate-300">
                    {cat.items.map((it) => it.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
              ENGINEERING INTERNSHIPS
            </h2>
            <div className="space-y-4">
              {resumeData.experience.missions.map((exp) => (
                <div key={exp.role + exp.period} className="border-l-2 border-cyan-500/30 pl-3">
                  <div className="flex flex-wrap justify-between items-baseline">
                    <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                    <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                  </div>
                  <div className="text-xs text-cyan-300 font-mono mb-2">{exp.company}</div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
              ACADEMIC & HARDWARE PROJECTS
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((prj) => (
                <div key={prj.id} className="border-l-2 border-cyan-500/30 pl-3">
                  <h3 className="text-sm font-bold text-white">{prj.title}</h3>
                  <div className="text-xs font-mono text-cyan-300 mb-1.5">
                    {prj.technologies.join(' • ')}
                  </div>
                  <p className="text-xs text-slate-300 mb-2">{prj.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-3">
              CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {resumeData.certifications.items.map((cert) => (
                <div key={cert.id} className="p-2 rounded bg-space-900/60 border border-slate-800">
                  <div className="font-bold text-slate-200">{cert.name}</div>
                  <div className="text-[11px] text-cyan-400 font-mono">{cert.issuer}{cert.date && ` • ${cert.date}`}</div>
                  {cert.certificateUrl && (
                    <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-cyan-300 hover:text-cyan-100 underline">
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-2">
              LEADERSHIP & CO-CURRICULAR
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {resumeData.leadership.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200">{item.title}: </span>
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold mb-2">
              LANGUAGES
            </h2>
            <p className="text-xs text-slate-300">{resumeData.about.languages.join(', ')}</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-slate-700/60 text-center text-xs font-mono text-slate-500">
          Source: Verified Resume of Mohamed Shafiq M • Bangalore, Karnataka, India
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
