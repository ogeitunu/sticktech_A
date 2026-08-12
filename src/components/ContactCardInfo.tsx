import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ShieldCheck } from 'lucide-react';
import { ContactFormSection } from './ContactFormSection';
import { AudienceType } from '../types';

interface ContactCardInfoProps {
  selectedAudience: AudienceType;
  onAudienceChange: (audience: AudienceType) => void;
}

export const ContactCardInfo: React.FC<ContactCardInfoProps> = ({
  selectedAudience,
  onAudienceChange
}) => {
  return (
    <div id="contact-info">
      
      {/* Contact Quick Cards Band */}
      <section className="bg-[#0A0D66] py-12 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Contact Card 1: Phone & WhatsApp */}
            <div className="bg-[#1116A6]/80 border border-[#D4AF37]/30 rounded-2xl p-5 flex items-center gap-4 hover:border-[#D4AF37] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0A0D66] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-white/60 block uppercase font-bold">Call / WhatsApp</span>
                <a href="tel:+2348067901364" className="text-sm font-bold font-grotesk text-[#D4AF37] hover:underline">
                  +234 806 790 1364
                </a>
              </div>
            </div>

            {/* Contact Card 2: Email Address */}
            <div className="bg-[#1116A6]/80 border border-[#D4AF37]/30 rounded-2xl p-5 flex items-center gap-4 hover:border-[#D4AF37] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0A0D66] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-white/60 block uppercase font-bold">Official Email</span>
                <a href="mailto:sticktechafrica@gmail.com" className="text-xs font-bold font-grotesk text-[#D4AF37] hover:underline truncate block max-w-[160px]">
                  sticktechafrica@gmail.com
                </a>
              </div>
            </div>

            {/* Contact Card 3: Location / Region */}
            <div className="bg-[#1116A6]/80 border border-[#D4AF37]/30 rounded-2xl p-5 flex items-center gap-4 hover:border-[#D4AF37] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0A0D66] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-white/60 block uppercase font-bold">Headquarters</span>
                <span className="text-xs font-bold font-grotesk text-white block">
                  Lagos & Abuja, Nigeria
                </span>
              </div>
            </div>

            {/* Contact Card 4: Operating Hours */}
            <div className="bg-[#1116A6]/80 border border-[#D4AF37]/30 rounded-2xl p-5 flex items-center gap-4 hover:border-[#D4AF37] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0A0D66] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-white/60 block uppercase font-bold">Working Hours</span>
                <span className="text-xs font-bold font-grotesk text-white block">
                  Mon – Fri: 8:00 AM – 6:00 PM
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <ContactFormSection
        selectedAudience={selectedAudience}
        onAudienceChange={onAudienceChange}
      />
      
    </div>
  );
};
