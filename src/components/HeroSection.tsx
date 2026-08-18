import React, { useState } from 'react';
import { ArrowRight, Sparkles, School, GraduationCap, Building2, Code2, Cpu } from 'lucide-react';
import africanGraduatesBackdrop from '../assets/images/african_graduates_celebrating_1786131532337.jpg';

interface HeroSectionProps {
  onSelectAudience: (audience: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectAudience }) => {
  const [activeTab, setActiveTab] = useState<'academy' | 'solutions'>('academy');

  const scrollToContact = (audience: string) => {
    onSelectAudience(audience);
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrograms = () => {
    const elem = document.getElementById('programs');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#1116A6] text-white overflow-hidden py-16 lg:py-24 border-b border-[#0A0D66]">
      
      {/* 30-Second Background Video Animation of African Graduates */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Balanced Scrim Overlays - Keeps Graduates Clear & Vibrant while maintaining Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D66]/95 via-[#0A0D66]/70 to-[#0A0D66]/35 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D66] via-transparent to-[#0A0D66]/80 z-10" />
        
        {/* Clear & Vibrant Animated Background Media with 30s Pan/Zoom Loop */}
        <img
          src={africanGraduatesBackdrop}
          alt="Two young African men and two young African women smiling proudly in academic graduation gowns"
          className="w-full h-full object-cover object-center opacity-85 scale-105 animate-video-pan transition-all duration-1000 filter brightness-105 contrast-110"
        />
      </div>

      {/* Radial Gradient Glow Overlays */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A0D66] rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0D66] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-mono tracking-wider uppercase shadow-inner">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>EDTECH & AI SOLUTIONS · BUILT IN AFRICA</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-grotesk tracking-tight text-white leading-[1.12]">
              Practical tech & AI skills, <br className="hidden sm:inline" />
              <span className="text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-8">
                built where students
              </span> already are.
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-white/85 font-normal max-w-2xl leading-relaxed">
              StickTech Africa trains high school students and graduates in Game development,IOT, mobile apps, and AI agents inside the schools they already attend, then channels that same talent into real solutions for SMEs.
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToContact('School Owner / Proprietor')}
                className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c29e2f] text-[#0A0D66] font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-base font-grotesk group"
              >
                <School className="w-5 h-5 text-[#0A0D66]" />
                <span>Partner Your School</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToPrograms}
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-medium border border-white/30 hover:border-white px-6 py-3.5 rounded-xl transition-all text-base"
              >
                <span>Explore Programs</span>
              </button>
            </div>

            {/* Audience Quick Jump Pills */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs text-white/70">
              
              <button
                onClick={() => scrollToContact('School Owner / Proprietor')}
                className="hover:text-[#D4AF37] bg-[#0A0D66]/60 hover:bg-[#0A0D66] px-2.5 py-1 rounded border border-white/10 transition-colors flex items-center gap-1"
              >
                <School className="w-3 h-3 text-[#D4AF37]" />
                <span>Schools</span>
              </button>
              <button
                onClick={() => scrollToContact('Graduate')}
                className="hover:text-[#D4AF37] bg-[#0A0D66]/60 hover:bg-[#0A0D66] px-2.5 py-1 rounded border border-white/10 transition-colors flex items-center gap-1"
              >
                <GraduationCap className="w-3 h-3 text-[#D4AF37]" />
                <span>Graduates</span>
              </button>
              <button
                onClick={() => scrollToContact('SME / Business Owner')}
                className="hover:text-[#D4AF37] bg-[#0A0D66]/60 hover:bg-[#0A0D66] px-2.5 py-1 rounded border border-white/10 transition-colors flex items-center gap-1"
              >
                <Building2 className="w-3 h-3 text-[#D4AF37]" />
                <span>SMEs</span>
              </button>
            </div>

          </div>

          {/* Right Column - Interactive Tech Preview & Circuit Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A0D66] border-2 border-[#D4AF37]/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
              
              {/* Circuit glow nodes top header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Interactive Engine Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 my-4">
                <button
                  onClick={() => setActiveTab('academy')}
                  className={`py-2.5 px-3.5 rounded-lg text-sm font-grotesk font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'academy'
                      ? 'bg-[#1116A6] text-[#D4AF37] border border-[#D4AF37]/60 shadow'
                      : 'bg-[#0A0D66] text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>OUR STEM ACADEMY</span>
                </button>
                <button
                  onClick={() => setActiveTab('solutions')}
                  className={`py-2.5 px-3.5 rounded-lg text-sm font-grotesk font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'solutions'
                      ? 'bg-[#1116A6] text-[#D4AF37] border border-[#D4AF37]/60 shadow'
                      : 'bg-[#0A0D66] text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>SMEs Solution</span>
                </button>
              </div>

              {/* Tab Display Panel */}
              {activeTab === 'academy' ? (
                <div className="space-y-3 font-mono text-sm bg-[#1116A6]/80 p-4 rounded-xl border border-white/10">
                  <div className="text-[#D4AF37] flex items-center justify-between font-bold text-sm">
                    <span>ACADEMY TALENT PIPELINE</span>
                    <span className="font-mono font-bold text-xs text-white/80">High School & Graduates</span>
                  </div>
                  <div className="space-y-2 text-white/95 text-sm">
                    <p className="flex items-center gap-2"><span className="text-[#D4AF37] font-bold text-base">•</span> Game Dev</p>
                    <p className="flex items-center gap-2"><span className="text-[#D4AF37] font-bold text-base">•</span> Mobile Apps</p>
                    <p className="flex items-center gap-2"><span className="text-[#D4AF37] font-bold text-base">•</span> AI Agents</p>
                    <p className="flex items-center gap-2"><span className="text-[#D4AF37] font-bold text-base">•</span> Digital Marketing & Creative Design</p>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-xs text-white/80 flex justify-between items-center font-medium">
                    <span>Status: High Engagement</span>
                    <span className="text-[#D4AF37] font-bold">65% Female </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 font-mono text-sm bg-[#1116A6]/80 p-4 rounded-xl border border-white/10">
                  <div className="text-[#D4AF37] flex items-center justify-between font-bold text-sm">
                    <span>SME SOLUTIONS & APPRENTICESHIPS</span>
                    <span className="font-mono font-bold text-xs text-white/80">Graduate Apprentices</span>
                  </div>
                  <div className="space-y-2 text-white/95 text-sm">
                    <p className="flex items-center gap-2"><span className="text-[#D4AF37] font-bold text-base">•</span> AI Customer Agent Assistants</p>
                    <p className="flex items-center gap-2"><span className="text-[#D4AF37] font-bold text-base">•</span> Social Media Management & Ads</p>
                    <p className="flex items-center gap-2"><span className="text-[#D4AF37] font-bold text-base">•</span> Graphic Kits & Video Ads</p>
                    <p className="flex items-center gap-2"><span className="text-[#D4AF37] font-bold text-base">•</span> SME Retainers at Low Overhead</p>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-xs text-white/80 flex justify-between items-center font-medium">
                    <span>Quality: Apprentice-Vetted</span>
                    <span className="text-[#D4AF37] font-bold">Real Portfolios</span>
                  </div>
                </div>
              )}

              {/* Glowing Node Animation Strip */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="text-sm font-mono text-white/90">System Active</span>
                </div>
                <button
                  onClick={() => scrollToContact('School Owner / Proprietor')}
                  className="text-sm font-grotesk text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
                >
                  Join Next Cohort &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
