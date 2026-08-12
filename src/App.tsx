import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StatsBand } from './components/StatsBand';
import { AboutSection } from './components/AboutSection';
import { TwoEnginesSection } from './components/TwoEnginesSection';
import { CurriculumPhilosophy } from './components/CurriculumPhilosophy';
import { ProgramTracks } from './components/ProgramTracks';
import { AudienceSplitSection } from './components/AudienceSplitSection';
import { ContactFormSection } from './components/ContactFormSection';
import { Footer } from './components/Footer';
import { AudienceType } from './types';

export default function App() {
  const [selectedAudience, setSelectedAudience] = useState<AudienceType>('School Owner / Proprietor');

  const handleAudienceSelection = (audience: string) => {
    setSelectedAudience(audience as AudienceType);
  };

  return (
    <div className="min-h-screen bg-white text-[#4B5568] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#1116A6]">
      
      {/* 1. HEADER */}
      <Header
        onSelectAudience={handleAudienceSelection}
      />

      {/* MAIN LANDING PAGE CONTENT */}
      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <HeroSection onSelectAudience={handleAudienceSelection} />

        {/* 3. PROOF / STATS BAND */}
        <StatsBand />

        {/* ABOUT SECTION (VISION, MISSION & OBJECTIVES) */}
        <AboutSection />

        {/* 4. TWO ENGINES (BUSINESS MODEL) */}
        <TwoEnginesSection onSelectAudience={handleAudienceSelection} />

        {/* 5. CURRICULUM PHILOSOPHY */}
        <CurriculumPhilosophy />

        {/* 6. PROGRAM TRACKS */}
        <ProgramTracks onSelectAudience={handleAudienceSelection} />

        {/* 7. AUDIENCE SPLIT SECTIONS */}
        <AudienceSplitSection onSelectAudience={handleAudienceSelection} />

        {/* 8. CONTACT FORM & SUPABASE INTEGRATION */}
        <ContactFormSection
          selectedAudience={selectedAudience}
          onAudienceChange={(aud) => setSelectedAudience(aud)}
        />
      </main>

      {/* 9. FOOTER */}
      <Footer
        onSelectAudience={handleAudienceSelection}
      />

    </div>
  );
}
