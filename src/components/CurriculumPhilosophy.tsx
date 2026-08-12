import React from 'react';
import { PHILOSOPHY_STEPS } from '../data/programsData';
import { Lightbulb, Code, Target, Award } from 'lucide-react';

export const CurriculumPhilosophy: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Lightbulb className="w-5 h-5 text-[#D4AF37]" />;
      case 1:
        return <Code className="w-5 h-5 text-[#D4AF37]" />;
      case 2:
        return <Target className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <Award className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section className="py-20 bg-[#0A0D66] text-white relative overflow-hidden border-y border-[#1116A6]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1116A6]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1116A6] text-[#D4AF37] text-xs font-mono font-semibold tracking-wider uppercase border border-[#D4AF37]/30">
            <span>HOW WE TEACH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-grotesk text-white tracking-tight">
            Portfolio first. <span className="text-[#D4AF37]">Lecture never.</span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Our progressive 4-step framework ensures students transition rapidly from curiosity to shipping real software projects.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHILOSOPHY_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#1116A6]/80 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37] rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-extrabold text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#0A0D66] border border-[#D4AF37]/30 flex items-center justify-center">
                    {getStepIcon(idx)}
                  </div>
                </div>

                <span className="text-[11px] font-mono text-[#D4AF37] block uppercase tracking-wider mb-1">
                  {step.subtitle}
                </span>

                <h3 className="text-xl font-bold font-grotesk text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-[11px] font-mono text-white/60 flex items-center justify-between">
                <span>Phase {idx + 1} of 4</span>
                <span className="text-emerald-400">100% Practical</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
