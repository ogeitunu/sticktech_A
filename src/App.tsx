import React, { useState, useEffect } from 'react';
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
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { GitHubExportModal } from './components/GitHubExportModal';
import { AudienceType, SupabaseConfig } from './types';
import { checkSupabaseConnection } from './lib/supabase';

export default function App() {
  const [selectedAudience, setSelectedAudience] = useState<AudienceType>('School Owner / Proprietor');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>({
    url: '',
    anonKey: '',
    isConnected: false,
    statusText: 'Checking connection...'
  });

  useEffect(() => {
    async function initSupabaseCheck() {
      const config = await checkSupabaseConnection();
      setSupabaseConfig(config);
    }
    initSupabaseCheck();
  }, []);

  const handleAudienceSelection = (audience: string) => {
    setSelectedAudience(audience as AudienceType);
  };

  return (
    <div className="min-h-screen bg-white text-[#4B5568] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#1116A6]">
      
      {/* 1. HEADER */}
      <Header
        onOpenSupabaseConfig={() => setIsSupabaseModalOpen(true)}
        onOpenGitHubExport={() => setIsGitHubModalOpen(true)}
        supabaseConfig={supabaseConfig}
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
          supabaseConfig={supabaseConfig}
          onOpenSupabaseConfig={() => setIsSupabaseModalOpen(true)}
        />
      </main>

      {/* 9. FOOTER */}
      <Footer
        onOpenSupabaseConfig={() => setIsSupabaseModalOpen(true)}
        onOpenGitHubExport={() => setIsGitHubModalOpen(true)}
        onSelectAudience={handleAudienceSelection}
      />

      {/* MODAL DIALOGS */}
      <SupabaseConfigModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onConfigSaved={(config) => setSupabaseConfig(config)}
      />

      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

    </div>
  );
}
