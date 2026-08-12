import React from 'react';
import { Building2, ArrowRight, Layers } from 'lucide-react';

interface TwoEnginesSectionProps {
  onSelectAudience: (audience: string) => void;
}

export const TwoEnginesSection: React.FC<TwoEnginesSectionProps> = ({ onSelectAudience }) => {
  const scrollToContact = (audience: string) => {
    onSelectAudience(audience);
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="py-20 bg-white text-[#4B5568] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1116A6]/10 text-[#1116A6] text-xs font-mono font-semibold tracking-wider uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>HOW WE'RE BUILT</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-grotesk text-[#0A0D66] tracking-tight">
            Two engines. <br className="hidden sm:inline" />
            <span className="text-[#1116A6]">One talent pipeline.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4B5568] leading-relaxed">
            Our academy trains young talent. Our solutions arm puts that same talent to work (via apprenticeships) for real clients, so students graduate with more than a certificate.
          </p>
        </div>

        {/* Two Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Academy (Royal Blue Card) */}
          <div className="bg-[#1116A6] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#0A0D66] flex flex-col justify-between relative overflow-hidden group">
            
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#0A0D66] border border-[#D4AF37]/40 flex items-center justify-center font-mono font-bold text-[#D4AF37] text-xl shadow-inner">
                  A
                </div>
                <span className="font-mono text-xs text-[#D4AF37] bg-[#0A0D66] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 uppercase font-semibold tracking-wider">
                  Academy
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-grotesk text-white mb-2">
                Academy: EdTech Training
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-mono mb-6">
                For high school students & secondary school graduates
              </p>

              <ul className="space-y-3.5 text-sm sm:text-base text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span><strong>Game Development</strong> (Simple code & 2D/3D Animation)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span><strong>Mobile Apps</strong> (low-code & no-code paths)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span><strong>AI Agent & Assistant Building</strong> (Notebooks & Google AI Studio)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span><strong>Digital Marketing & Creative Design</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
                  <span><strong>AI Literacy & Fluency</strong> across every learning track</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-white/70 font-mono">
                Goal: Portfolio-ready graduates
              </span>
              <button
                onClick={() => scrollToContact('School Owner / Proprietor')}
                className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#c29e2f] text-[#0A0D66] font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-grotesk"
              >
                <span>Partner Your School</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Card 2: Solutions (Gold Accent Border Card) */}
          <div className="bg-white text-[#4B5568] rounded-3xl p-8 sm:p-10 shadow-lg border-2 border-[#D4AF37] flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-shadow">
            
            <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A0D66] text-[10px] font-mono font-bold uppercase px-4 py-1 rounded-bl-xl tracking-wider">
              SME Client Services
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1116A6]/10 border border-[#1116A6]/20 flex items-center justify-center font-mono font-bold text-[#1116A6] text-xl">
                  S
                </div>
                <span className="font-mono text-xs text-[#1116A6] bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 uppercase font-semibold tracking-wider">
                  Solutions
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-grotesk text-[#0A0D66] mb-2">
                Solutions: SME Services
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5568] font-mono mb-6">
                For small & medium businesses seeking practical AI & marketing
              </p>

              <ul className="space-y-3.5 text-sm sm:text-base text-[#4B5568]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1116A6] shrink-0 mt-2" />
                  <span><strong>AI Agent Assistants</strong> built specifically for business workflow challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1116A6] shrink-0 mt-2" />
                  <span><strong>Digital Marketing & Social Media Management</strong> retainers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1116A6] shrink-0 mt-2" />
                  <span><strong>Graphics Design & Video Editing</strong> campaigns and branding kits</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1116A6] shrink-0 mt-2" />
                  <span><strong>Delivered in part by top graduates</strong> (real client work feeds student portfolios)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#4B5568] font-mono">
                High quality · Low overhead
              </span>
              <button
                onClick={() => scrollToContact('SME / Business Owner')}
                className="w-full sm:w-auto bg-[#1116A6] hover:bg-[#0A0D66] text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-grotesk"
              >
                <span>Get a Solutions Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

