import React, { useState } from 'react';
import SpaceBackground from './components/SpaceBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutProfile from './components/AboutProfile';
import SkillsSection from './components/SkillsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import CertificationsSection from './components/CertificationsSection';
import LeadershipSection from './components/LeadershipSection';
import ContactTerminal from './components/ContactTerminal';
import Footer from './components/Footer';
import TerminalDrawer from './components/TerminalDrawer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-space-950 text-slate-200 selection:bg-cyan-500 selection:text-space-950">
      {/* Interactive Custom Reticle Cursor */}
      <CustomCursor />

      {/* Parallax Starfield & Nebula Canvas */}
      <SpaceBackground />

      {/* Subtle Circuit Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none circuit-grid opacity-35 z-0" />

      {/* Subtle Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines opacity-30 z-0" />

      {/* Foreground Content Stack */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Futuristic Floating HUD Header */}
        <Navbar
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 01 // Hero with Interactive 3D Satellite & Cyber PCB */}
          <Hero
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />

          {/* 02 // Engineer Profile Mission Briefing */}
          <AboutProfile />

          {/* 03 // Holographic Tech Stack & Peripheral Matrix */}
          <SkillsSection />

          {/* 04 // Chronological Mission Log & Internships */}
          <ExperienceTimeline />

          {/* 05 // Interactive Projects with Live Emulations */}
          <ProjectsSection />

          {/* 06 // Academic Orbit (Anna University B.E. ECE) */}
          <EducationSection />

          {/* 07 // Holographic Certification Vault */}
          <CertificationsSection />

          {/* 08 // Command & Leadership Badges */}
          <LeadershipSection />

          {/* 09 // Uplink Transmission Terminal & Contact */}
          <ContactTerminal />
        </main>

        {/* Footer */}
        <Footer
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </div>

      {/* Interactive CLI Console Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* High-Fidelity Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
