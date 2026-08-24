import React from 'react';
import { School, GraduationCap, Building2, ArrowRight, Check } from 'lucide-react';

interface AudienceSplitSectionProps {
  onSelectAudience: (audience: string) => void;
}

export const AudienceSplitSection: React.FC<AudienceSplitSectionProps> = ({ onSelectAudience }) => {
  const handleAudienceClick = (audience: string) => {
    onSelectAudience(audience);
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="partnerships" className="py-20 bg-white text-[#4B5568] relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1116A6]/10 text-[#1116A6] text-xs font-mono font-semibold tracking-wider uppercase">
            <span>PARTNERSHIP PATHWAYS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-grotesk text-[#0A0D66]">
            Tailored for your specific goals
          </h2>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Card A: For Schools */}
          <div className="bg-slate-50 border-2 border-slate-200 hover:border-[#1116A6] rounded-3xl p-8 flex flex-col justify-between transition-all hover:shadow-xl group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1116A6] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md">
                <School className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono font-bold text-[#1116A6] uppercase tracking-wider block mb-2">
                FOR SCHOOL OWNERS & PROPRIETORS
              </span>

              <h3 className="text-2xl font-bold font-grotesk text-[#0A0D66] mb-4 group-hover:text-[#1116A6] transition-colors leading-snug">
                Your students already have the curiosity. We bring the curriculum.
              </h3>

              <p className="text-sm text-[#4B5568] leading-relaxed mb-6">
                StickTech Africa partners directly with schools to embed a hands-on Game Development, Mobile App, AI Agent, and Digital Marketing curriculum as an integral school program or holiday project.
              </p>

              <ul className="space-y-2 text-xs text-[#0A0D66] font-medium mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>On-site or embedded timetable integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Instructor-led hands-on delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Termly project showcases & parent expos</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleAudienceClick('School Owner / Proprietor')}
              className="w-full bg-[#1116A6] hover:bg-[#0A0D66] text-white font-bold py-3.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-grotesk shadow"
            >
              <span>Request a Partnership Proposal</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Card B: For Graduates */}
          <div className="bg-[#1116A6] text-white border-2 border-[#D4AF37] rounded-3xl p-8 flex flex-col justify-between transition-all shadow-xl group relative overflow-hidden">
            
            <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A0D66] text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-bl-xl">
              Most Popular
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A0D66] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center mb-6 shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
               FOR HIGH SCHOOLS & GRADUATES
              </span>

              <h3 className="text-2xl font-bold font-grotesk text-white mb-4 leading-snug">
                Build a portfolio, not just a certificate.
              </h3>

              <p className="text-sm text-white/85 leading-relaxed mb-6">
                If you've finished secondary school and want practical, employable skills, StickTech Africa gives you a fast, hands-on path into technology, building real, working projects from week one.
              </p>

              <ul className="space-y-2 text-xs text-white/90 font-medium mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Intensive practical bootcamps</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>SME apprenticeship pathway for top performers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Verifiable public portfolio site upon graduation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleAudienceClick('Graduate')}
              className="w-full bg-[#D4AF37] hover:bg-[#c29e2f] text-[#0A0D66] font-bold py-3.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-grotesk shadow"
            >
              <span>Apply to a Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card C: For SMEs */}
          <div className="bg-slate-50 border-2 border-slate-200 hover:border-[#1116A6] rounded-3xl p-8 flex flex-col justify-between transition-all hover:shadow-xl group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A0D66] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md">
                <Building2 className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono font-bold text-[#1116A6] uppercase tracking-wider block mb-2">
                FOR SMES & BUSINESS OWNERS
              </span>

              <h3 className="text-2xl font-bold font-grotesk text-[#0A0D66] mb-4 group-hover:text-[#1116A6] transition-colors leading-snug">
                Affordable AI, marketing & design, without an in-house team.
              </h3>

              <p className="text-sm text-[#4B5568] leading-relaxed mb-6">
                Our Solutions Arm delivers AI agent assistants, digital marketing, and design work for SMEs, staffed in part by our top graduates — giving you real capability at a fraction of the cost.
              </p>

              <ul className="space-y-2 text-xs text-[#0A0D66] font-medium mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Custom AI WhatsApp/Web assistants</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Social media management & graphic retainers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Supervised graduate talent quality guarantee</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleAudienceClick('SME / Business Owner')}
              className="w-full bg-[#0A0D66] hover:bg-[#1116A6] text-white font-bold py-3.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-grotesk shadow"
            >
              <span>Get a Solutions Quote</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
