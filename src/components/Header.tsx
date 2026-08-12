import React, { useState } from 'react';
import { Menu, X, Database, Github, ArrowRight, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { SupabaseConfig } from '../types';

interface HeaderProps {
  onOpenSupabaseConfig: () => void;
  onOpenGitHubExport: () => void;
  supabaseConfig: SupabaseConfig;
  onSelectAudience: (audience: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSupabaseConfig,
  onOpenGitHubExport,
  supabaseConfig,
  onSelectAudience
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, audiencePreset?: string) => {
    setMobileMenuOpen(false);
    if (audiencePreset) {
      onSelectAudience(audiencePreset);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1116A6]/95 backdrop-blur-md border-b border-[#0A0D66] shadow-lg text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-3.5 group focus:outline-none"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="w-12 h-12 rounded-xl bg-[#0A0D66] border-2 border-[#D4AF37]/60 flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform shrink-0">
              <span className="font-mono text-2xl font-black text-[#D4AF37]">S</span>
              <span className="font-mono text-2xl font-black text-white -ml-0.5">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl tracking-tight text-white font-grotesk flex items-center gap-1.5">
                StickTech <span className="text-[#D4AF37]">Africa</span>
              </span>
              <span className="text-[10px] font-mono text-[#D4AF37]/90 tracking-widest uppercase font-semibold">
                EdTech & AI Solutions
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
            <button
              onClick={() => handleNavClick('about')}
              className="text-white/80 hover:text-[#D4AF37] transition-colors py-2"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('programs')}
              className="text-white/80 hover:text-[#D4AF37] transition-colors py-2"
            >
              Programs
            </button>
            <button
              onClick={() => handleNavClick('contact', 'SME / Business Owner')}
              className="text-white/80 hover:text-[#D4AF37] transition-colors py-2"
            >
              SMEs
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-white/80 hover:text-[#D4AF37] transition-colors py-2"
            >
              Contact
            </button>
          </nav>

          {/* Action Tools & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Supabase Status Button */}
            <button
              onClick={onOpenSupabaseConfig}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                supabaseConfig.isConnected
                  ? 'bg-[#0A0D66] border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/20'
                  : 'bg-[#0A0D66]/80 border-white/20 text-white/70 hover:border-[#D4AF37] hover:text-white'
              }`}
              title="Click to manage Supabase database credentials and schema"
            >
              <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Supabase</span>
              {supabaseConfig.isConnected ? (
                <CheckCircle className="w-3 h-3 text-emerald-400" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>

            {/* GitHub Exporter Button */}
            <button
              onClick={onOpenGitHubExport}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-[#0A0D66] border border-white/20 text-white/90 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              title="View full GitHub repository code & export files"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Code</span>
            </button>

            {/* Primary Gold CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8952b] text-[#0A0D66] font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-grotesk group"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenSupabaseConfig}
              className="p-2 text-[#D4AF37] bg-[#0A0D66] rounded-md border border-[#D4AF37]/30"
              title="Supabase Config"
            >
              <Database className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#D4AF37] rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0D66] border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3 text-base">
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 px-3 rounded hover:bg-[#1116A6] text-white"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('programs')}
              className="text-left py-2 px-3 rounded hover:bg-[#1116A6] text-white/90"
            >
              Programs
            </button>
            <button
              onClick={() => handleNavClick('contact', 'SME / Business Owner')}
              className="text-left py-2 px-3 rounded hover:bg-[#1116A6] text-white/90"
            >
              SMEs (Services)
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 rounded hover:bg-[#1116A6] text-white/90"
            >
              Contact Us
            </button>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenGitHubExport(); }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1116A6] border border-white/20 text-white rounded-lg text-sm font-mono"
            >
              <Github className="w-4 h-4 text-[#D4AF37]" />
              <span>View GitHub Code & Exporter</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0A0D66] font-bold py-3 rounded-lg text-base"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
