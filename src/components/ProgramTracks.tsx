import React, { useState } from 'react';
import { PROGRAM_TRACKS } from '../data/programsData';
import { ProgramTrack } from '../types';
import { Gamepad2, Smartphone, Bot, TrendingUp, Palette, Brain, ArrowRight, X, ExternalLink, Sparkles, Check } from 'lucide-react';

interface ProgramTracksProps {
  onSelectAudience: (audience: string) => void;
}

export const ProgramTracks: React.FC<ProgramTracksProps> = ({ onSelectAudience }) => {
  const [selectedTrack, setSelectedTrack] = useState<ProgramTrack | null>(null);

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6 text-[#1116A6]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#1116A6]" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#1116A6]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#1116A6]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#1116A6]" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#1116A6]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#1116A6]" />;
    }
  };

  const scrollToContact = () => {
    setSelectedTrack(null);
    onSelectAudience('Graduate');
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="programs" className="py-20 bg-slate-50 text-[#4B5568] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1116A6]/10 text-[#1116A6] text-xs font-mono font-semibold tracking-wider uppercase">
            <span>PROGRAMS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-grotesk text-[#0A0D66] tracking-tight">
            What students build
          </h2>

          <p className="text-base sm:text-lg text-[#4B5568] leading-relaxed">
            Six - Seven specialized practical pathways designed to turn zero-experience high schoolers and graduates into capable creators.
          </p>
        </div>

        {/* 6 Program Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAM_TRACKS.map((track) => (
            <div
              key={track.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#1116A6]/10 border border-[#1116A6]/20 flex items-center justify-center group-hover:bg-[#1116A6] group-hover:text-white transition-all">
                    {getTrackIcon(track.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#1116A6] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {track.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold font-grotesk text-[#0A0D66] mb-2 group-hover:text-[#1116A6] transition-colors">
                  {track.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4B5568] leading-relaxed mb-4">
                  {track.description}
                </p>

                {/* Tools Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {track.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-[#0A0D66] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedTrack(track)}
                  className="text-xs font-mono text-[#1116A6] font-semibold hover:text-[#0A0D66] flex items-center gap-1 group/btn"
                >
                  <span>Sample Student Output</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => setSelectedTrack(track)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#D4AF37] hover:text-[#0A0D66] flex items-center justify-center transition-colors text-[#1116A6]"
                  title="View Details"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Sample Output Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 bg-[#0A0D66]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#D4AF37] relative space-y-6">
            
            <button
              onClick={() => setSelectedTrack(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1116A6] text-[#D4AF37] flex items-center justify-center font-bold">
                {getTrackIcon(selectedTrack.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono text-[#1116A6] font-semibold">
                  PROGRAM DETAIL
                </span>
                <h3 className="text-2xl font-bold font-grotesk text-[#0A0D66]">
                  {selectedTrack.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#4B5568]">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-mono text-[#0A0D66] font-bold uppercase mb-1">
                  Verified Student Portfolio Output:
                </h4>
                <p className="text-sm font-medium text-[#1116A6]">
                  "{selectedTrack.studentOutput}"
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#0A0D66] font-bold uppercase mb-2">
                  Primary Tech & Tools Taught:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.tools.map((t, idx) => (
                    <span key={idx} className="bg-[#1116A6]/10 text-[#1116A6] font-mono text-xs px-2.5 py-1 rounded border border-[#1116A6]/20 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#D4AF37]" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#4B5568] leading-relaxed">
                {selectedTrack.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToContact}
                className="w-full bg-[#D4AF37] hover:bg-[#c29e2f] text-[#0A0D66] font-bold py-3 px-4 rounded-xl text-sm font-grotesk flex items-center justify-center gap-2"
              >
                <span>Apply for this Track</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setSelectedTrack(null)}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-xl text-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
