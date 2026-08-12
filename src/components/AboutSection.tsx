import React from 'react';
import { Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 text-[#4B5568] relative overflow-hidden border-b border-slate-200">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1116A6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1116A6]/10 text-[#1116A6] text-xs font-mono font-bold tracking-wider uppercase border border-[#1116A6]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>WHO WE ARE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-grotesk text-[#0A0D66] tracking-tight">
            About <span className="text-[#1116A6]">StickTech</span> <span className="text-[#D4AF37]">Africa</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4B5568] leading-relaxed">
            Bridging technology education and real-world commercial solutions across Africa through practical skill acquisition and SME digital empowerment.
          </p>
        </div>

        {/* Vision, Mission, Objectives Cards (3 Sentences Each) */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          
          {/* 1. VISION */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 hover:border-[#1116A6]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#D4AF37] bg-[#0A0D66] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  OUR VISION
                </span>
              </div>

              <h3 className="text-2xl font-bold font-grotesk text-[#0A0D66] mb-4">
                Vision Statement
              </h3>

              <div className="space-y-3 text-sm leading-relaxed text-[#4B5568]">
                <p className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span>StickTech Africa envisions an empowered continent where every youth possesses real-world digital, artificial intelligence, and software craftsmanship skills.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span>We aspire to bridge the gap between classroom theory and industry requirements by embedding practical technology education directly into secondary schools and graduate hubs.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span>Through sustainable partnerships and innovation hubs, our vision is to turn Africa into a leading exporter of technical talent and practical software solutions.</span>
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-[#1116A6] font-semibold">
              <span>3 Core Pillar Statements</span>
              <span className="text-[#D4AF37]">Vision</span>
            </div>
          </div>

          {/* 2. MISSION */}
          <div className="bg-[#1116A6] text-white rounded-3xl p-8 shadow-xl border border-[#0A0D66] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#D4AF37]/15 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#D4AF37] bg-[#0A0D66] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  OUR MISSION
                </span>
              </div>

              <h3 className="text-2xl font-bold font-grotesk text-white mb-4">
                Mission Statement
              </h3>

              <div className="space-y-3 text-sm leading-relaxed text-white/90">
                <p className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span>Our mission is to deliver practical, market-relevant technology training in game development, mobile application design, and AI agent engineering to students across Africa.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span>We partner with forward-thinking secondary school proprietors and graduates to build portfolio-ready digital skills that unlock direct employment and entrepreneurial opportunities.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span>Simultaneously, we equip local SMEs with high-impact AI tools, digital marketing, and software retainers executed in part by our top trained talent.</span>
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#D4AF37] font-semibold">
              <span>3 Core Action Statements</span>
              <span>Mission</span>
            </div>
          </div>

          {/* 3. OBJECTIVES */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 hover:border-[#1116A6]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#D4AF37] bg-[#0A0D66] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  OUR OBJECTIVES
                </span>
              </div>

              <h3 className="text-2xl font-bold font-grotesk text-[#0A0D66] mb-4">
                Core Objectives
              </h3>

              <div className="space-y-3 text-sm leading-relaxed text-[#4B5568]">
                <p className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span>To integrate hands-on coding, low-code building, and AI literacy directly into secondary school curricula and post-graduate bootcamps.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span>To provide small and medium enterprises with cost-effective AI solutions, branding kits, and digital retainers that accelerate business productivity.</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span>To foster a sustainable tech ecosystem where student portfolios are fed by real client projects, ensuring long-term financial and career independence.</span>
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-[#1116A6] font-semibold">
              <span>3 Core Strategic Goals</span>
              <span className="text-[#D4AF37]">Objectives</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
