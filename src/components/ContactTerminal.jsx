import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, ExternalLink, Github, Linkedin } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

export default function ContactTerminal() {
  const [formData, setFormData] = useState({
    senderName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isTransmitted, setIsTransmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const contact = resumeData.personal;

  const handleCopy = (text, field) => {
    sound.click();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.engage();
    setIsTransmitting(true);

    // Simulate uplink dispatch
    setTimeout(() => {
      setIsTransmitting(false);
      setIsTransmitted(true);

      // Construct mailto link as direct action
      const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(
        formData.subject || 'Embedded Engineering Inquiry'
      )}&body=${encodeURIComponent(
        `Name: ${formData.senderName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;

      setTimeout(() => {
        setIsTransmitted(false);
        setFormData({ senderName: '', email: '', subject: '', message: '' });
      }, 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>09 // UPLINK</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400">SECURE QUANTUM TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
            ESTABLISH CONNECTION
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded mt-3" />
          <p className="mt-3 text-slate-300 text-sm sm:text-base font-sans max-w-2xl">
            Open to opportunities in embedded systems, firmware, IoT and hardware engineering.
          </p>
        </div>

        {/* 2-Column Terminal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Hardware Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 relative">
              <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                DIRECT COMMUNICATION BEACONS
              </h3>

              <div className="space-y-4 font-mono text-xs">
                {/* Email */}
                <div className="p-3.5 rounded-xl bg-space-900/90 border border-cyan-500/20 flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">PRIMARY EMAIL</div>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-white hover:text-cyan-300 transition-colors font-bold"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(contact.email, 'email')}
                    title="Copy Email"
                    className="p-1.5 rounded bg-space-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 border border-slate-700"
                  >
                    {copiedField === 'email' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone 1 */}
                <div className="p-3.5 rounded-xl bg-space-900/90 border border-cyan-500/20 flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">VOICE // CELLULAR (PRIMARY)</div>
                      <a
                        href={`tel:${contact.phones[0]}`}
                        className="text-white hover:text-cyan-300 transition-colors font-bold"
                      >
                        {contact.phones[0]}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(contact.phones[0], 'phone1')}
                    title="Copy Phone"
                    className="p-1.5 rounded bg-space-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 border border-slate-700"
                  >
                    {copiedField === 'phone1' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone 2 */}
                <div className="p-3.5 rounded-xl bg-space-900/90 border border-cyan-500/20 flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">VOICE // SECONDARY LINE</div>
                      <a
                        href={`tel:${contact.phones[1]}`}
                        className="text-white hover:text-cyan-300 transition-colors font-bold"
                      >
                        {contact.phones[1]}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(contact.phones[1], 'phone2')}
                    title="Copy Phone"
                    className="p-1.5 rounded bg-space-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 border border-slate-700"
                  >
                    {copiedField === 'phone2' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-space-900/90 border border-cyan-500/20 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">BASE LOCATION</div>
                    <div className="text-slate-200 font-bold">{contact.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Channels / Profile links */}
              <div className="mt-6 pt-4 border-t border-cyan-500/20">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">
                  EXTERNAL PROFILES & HUBS (EDITABLE PLACEHOLDERS):
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={contact.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-3 py-2 rounded-lg bg-space-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/15 flex items-center justify-center space-x-2 text-xs font-mono transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LINKEDIN</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <a
                    href={contact.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-3 py-2 rounded-lg bg-space-900 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/15 flex items-center justify-center space-x-2 text-xs font-mono transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>

              <div className="hud-corner-tl" />
              <div className="hud-corner-br" />
            </div>
          </div>

          {/* Right Column: Futuristic Transmission Terminal Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl border border-cyan-400/40 relative shadow-neon-cyan">
              <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-widest mb-6 flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>DIRECT DISPATCH TRANSMISSION CONSOLE</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                      ORIGINATOR IDENTITY / NAME:
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      placeholder="e.g. Lead Hardware Recruiter"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-space-900/90 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder:text-slate-600 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                      RETURN FREQUENCY / EMAIL:
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="recruiter@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-space-900/90 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder:text-slate-600 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                    TRANSMISSION VECTOR / SUBJECT:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Embedded Firmware / IoT Engineer Position"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-space-900/90 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder:text-slate-600 font-mono text-xs"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                    TRANSMISSION PAYLOAD / MESSAGE:
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Shafiq, we reviewed your embedded engineering portfolio and would like to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-space-900/90 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder:text-slate-600 font-mono text-xs resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${
                      isTransmitted
                        ? 'bg-emerald-500 text-space-950 shadow-[0_0_20px_#10b981]'
                        : isTransmitting
                        ? 'bg-cyan-500/40 text-cyan-200 cursor-wait'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-space-950 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan active:scale-98'
                    }`}
                  >
                    {isTransmitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>TRANSMISSION DISPATCHED // OPENING MAIL CLIENT</span>
                      </>
                    ) : isTransmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-space-950 border-t-transparent rounded-full animate-spin" />
                        <span>ENCRYPTING & DISPATCHING PACKET...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND TRANSMISSION</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
