import React from 'react';
import { Mail, Phone, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectAudience: (audience: string) => void;
}

const LinkedinIcon: React.FC = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TikTokIcon: React.FC = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.33 22a6.33 6.33 0 0 0 6.33-6.33V9.05a8.16 8.16 0 0 0 4.69 1.48V7.08a4.84 4.84 0 0 1-.76-.39z" />
  </svg>
);

const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: LinkedinIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/', Icon: InstagramIcon },
  { name: 'Facebook', href: 'https://www.facebook.com/', Icon: FacebookIcon },
  { name: 'TikTok', href: 'https://www.tiktok.com/@sticktech_a', Icon: TikTokIcon },
];

export const Footer: React.FC<FooterProps> = ({ onSelectAudience }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAudienceClick = (audience: string) => {
    onSelectAudience(audience);
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A0D66] text-white border-t border-[#1116A6] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid md:grid-cols-12 gap-8 pb-12 border-b border-white/10">

          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#1116A6] border-2 border-[#D4AF37]/60 flex items-center justify-center font-bold shadow-md shrink-0">
                <span className="font-mono text-2xl font-black text-[#D4AF37]">S</span>
                <span className="font-mono text-2xl font-black text-white -ml-0.5">A</span>
              </div>
              <span className="font-bold text-2xl font-grotesk tracking-tight text-white">
                StickTech <span className="text-[#D4AF37]">Africa</span>
              </span>
            </div>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Practical skills, where students already are. Real solutions, for the businesses that need them.
            </p>

            <div className="pt-1 space-y-2">
              <div>
                <a
                  href="tel:+2348067901364"
                  className="inline-flex items-center gap-2 text-sm font-mono text-[#D4AF37] hover:underline"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+234 806 790 1364</span>
                </a>
              </div>
              <div>
                <a
                  href="mailto:sticktechafrica@gmail.com"
                  className="inline-flex items-center gap-2 text-sm font-mono text-[#D4AF37] hover:underline"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>sticktechafrica@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Educational Pathways */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
              Pathways
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() => handleAudienceClick('School Owner / Proprietor')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  High Schools
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleAudienceClick('Graduate')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  Graduates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleAudienceClick('SME / Business Owner')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  SME Technology Solution &amp; Talent Retainers
                </button>
              </li>
              <li>
                <a href="#programs" className="hover:text-[#D4AF37] transition-colors">
                  Tracks
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Channels Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
              Social Media Channels
            </h4>

            <ul className="space-y-2.5 text-sm">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${name} page`}
                    className="inline-flex items-center gap-2.5 text-white/85 hover:text-[#D4AF37] transition-colors group"
                  >
                    <span className="p-1.5 rounded-md bg-[#1116A6] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A0D66] transition-colors">
                      <Icon />
                    </span>
                    <span className="font-medium">{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <p>© {currentYear} StickTech Africa. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#D4AF37] hover:underline"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};