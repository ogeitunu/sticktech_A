import React from 'react';
import { STATS_DATA } from '../data/programsData';
import { Users, BookOpen, HeartHandshake } from 'lucide-react';

export const StatsBand: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-6 h-6 text-[#1116A6]" />;
      case 1:
        return <BookOpen className="w-6 h-6 text-[#1116A6]" />;
      default:
        return <HeartHandshake className="w-6 h-6 text-[#1116A6]" />;
    }
  };

  return (
    <section className="bg-slate-50 border-y border-slate-200 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {STATS_DATA.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-grotesk text-[#1116A6] group-hover:text-[#0A0D66] transition-colors">
                    {stat.value}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-[#D4AF37]/50 group-hover:bg-[#1116A6]/5 transition-all">
                    {getIcon(idx)}
                  </div>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#1116A6]/10 text-[#1116A6] mb-2">
                  {stat.highlight}
                </div>

                <h3 className="text-base font-bold text-[#0A0D66] mb-1 font-grotesk">
                  {stat.label}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#4B5568] leading-relaxed mt-2 border-t border-slate-100 pt-3">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
