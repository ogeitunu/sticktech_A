import React from 'react';
import { Building2, Bot, Megaphone, Palette, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface SmeCardInfoProps {
  onSelectAudience?: (audience: string) => void;
}

export const SmeCardInfo: React.FC<SmeCardInfoProps> = ({ onSelectAudience }) => {
  const handleRequestQuote = () => {
    if (onSelectAudience) {
      onSelectAudience('SME / Business Owner');
    }
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="smes" className="py-20 bg-slate-50 text-[#4B5568] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1116A6]/10 text-[#1116A6] text-xs font-mono font-semibold tracking-wider uppercase border border-[#1116A6]/20">
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>SME SOLUTIONS ARM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-grotesk text-[#0A0D66] tracking-tight">
            Tailored AI & Digital Services <br className="hidden sm:inline" />
            <span className="text-[#1116A6]">For Growing Businesses</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4B5568] leading-relaxed">
            Get elite digital agency capability without high agency retainer fees. Powered by supervised senior leads and top-tier African tech talent.
          </p>
        </div>

        {/* 3 Core SME Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Service Card 1: Custom AI Agents */}
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-[#1116A6] shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A0D66] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md">
                <Bot className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono font-bold text-[#1116A6] uppercase tracking-wider block mb-2">
                AUTOMATION & AI
              </span>

              <h3 className="text-xl font-bold font-grotesk text-[#0A0D66] mb-3 group-hover:text-[#1116A6] transition-colors">
                AI WhatsApp & Web Assistants
              </h3>

              <p className="text-sm text-[#4B5568] leading-relaxed mb-6">
                Automate customer inquiries, booking appointments, and lead qualification 24/7 with custom-trained AI models connected to your business data.
              </p>

              <ul className="space-y-2.5 text-xs text-[#0A0D66] font-medium mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>24/7 Instant customer response</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>WhatsApp API & Website integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Lead capture directly to database</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleRequestQuote}
              className="w-full bg-[#1116A6] hover:bg-[#0A0D66] text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-grotesk shadow"
            >
              <span>Get AI Assistant Quote</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Service Card 2: Digital Marketing Retainer */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#D4AF37] shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A0D66] text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-bl-xl">
              High Demand
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1116A6] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md">
                <Megaphone className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono font-bold text-[#1116A6] uppercase tracking-wider block mb-2">
                MARKETING & GROWTH
              </span>

              <h3 className="text-xl font-bold font-grotesk text-[#0A0D66] mb-3">
                Digital Marketing & Social Retainers
              </h3>

              <p className="text-sm text-[#4B5568] leading-relaxed mb-6">
                Consistent content creation, performance ads management, and social growth campaigns tailored to convert local and international buyers.
              </p>

              <ul className="space-y-2.5 text-xs text-[#0A0D66] font-medium mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Monthly content strategy & calendar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Paid social ads management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Monthly analytics & lead reports</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleRequestQuote}
              className="w-full bg-[#D4AF37] hover:bg-[#c29e2f] text-[#0A0D66] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-grotesk shadow"
            >
              <span>Request Marketing Retainer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Service Card 3: Design & Branding */}
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-[#1116A6] shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A0D66] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md">
                <Palette className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono font-bold text-[#1116A6] uppercase tracking-wider block mb-2">
                CREATIVE & DESIGN
              </span>

              <h3 className="text-xl font-bold font-grotesk text-[#0A0D66] mb-3 group-hover:text-[#1116A6] transition-colors">
                Brand Identity & Graphics Kits
              </h3>

              <p className="text-sm text-[#4B5568] leading-relaxed mb-6">
                Elevate your business image with professionally designed logos, flyer kits, corporate proposals, websites, and UI mockups.
              </p>

              <ul className="space-y-2.5 text-xs text-[#0A0D66] font-medium mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Complete visual identity & brand guidelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Fast turnaround promotional banners</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>High quality responsive web templates</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleRequestQuote}
              className="w-full bg-[#0A0D66] hover:bg-[#1116A6] text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-grotesk shadow"
            >
              <span>Get Branding Quote</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

        </div>

        {/* Quality & Value Banner */}
        <div className="bg-[#1116A6] text-white rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-mono font-bold uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>THE STICKTECH GUARANTEE</span>
            </div>
            <h4 className="text-2xl font-bold font-grotesk">
              Supervised Quality · Cost-Effective Delivery
            </h4>
            <p className="text-sm text-white/85 leading-relaxed">
              Every SME client project is supervised by experienced StickTech project leads while offering apprenticeship positions to top graduates — giving you premium outputs with lower overhead.
            </p>
          </div>

          <button
            onClick={handleRequestQuote}
            className="shrink-0 bg-[#D4AF37] hover:bg-[#c29e2f] text-[#0A0D66] font-extrabold px-6 py-3.5 rounded-xl transition-all text-sm font-grotesk shadow-md hover:scale-105"
          >
            Consult Our SME Team
          </button>
        </div>

      </div>
    </section>
  );
};
