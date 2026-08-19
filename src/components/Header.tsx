import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onSelectAudience: (audience: string) => void;
}

interface NavItem {
  label: string;
  sectionId: string;
  audiencePreset?: string;
  mobileLabel?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'About',
    sectionId: 'about',
  },
  {
    label: 'Programs',
    sectionId: 'programs',
  },
  {
    label: 'SMEs',
    sectionId: 'smes',
    audiencePreset: 'SME / Business Owner',
    mobileLabel: 'SMEs (Services)',
  },
  {
    label: 'Contact',
    sectionId: 'contact',
    mobileLabel: 'Contact Us',
  },
];

export const Header: React.FC<HeaderProps> = ({ onSelectAudience }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background page scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (
    sectionId: string,
    audiencePreset?: string
  ) => {
    setMobileMenuOpen(false);

    if (audiencePreset) {
      onSelectAudience(audiencePreset);
    }

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLogoClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1116A6]/95 backdrop-blur-md border-b border-[#0A0D66] shadow-lg text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo / Brand */}
          <a
            href="#"
            onClick={handleLogoClick}
            aria-label="StickTech Africa - Back to top"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg p-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0A0D66] border-2 border-[#D4AF37]/60 flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform shrink-0">
              <span className="font-mono text-2xl font-black text-[#D4AF37]">
                S
              </span>
              <span className="font-mono text-2xl font-black text-white -ml-0.5">
                A
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-2xl tracking-tight text-white font-grotesk flex items-center gap-1.5">
                StickTech{' '}
                <span className="text-[#D4AF37]">
                  Africa
                </span>
              </span>

              <span className="text-[10px] font-mono text-[#D4AF37]/90 tracking-widest uppercase font-semibold">
                EdTech &amp; AI Solutions
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-7 text-sm font-medium"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.sectionId}
                type="button"
                onClick={() =>
                  handleNavClick(
                    item.sectionId,
                    item.audiencePreset
                  )
                }
                className="text-white/80 hover:text-[#D4AF37] focus-visible:text-[#D4AF37] transition-colors py-2 focus:outline-none"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#b8952b] focus-visible:bg-[#b8952b] text-[#0A0D66] font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-grotesk group focus:outline-none"
            >
              <span>Get in Touch</span>

              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((open) => !open)
              }
              className="p-2 text-white hover:text-[#D4AF37] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden bg-[#0A0D66] border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 space-y-4 animate-fadeIn"
        >
          <nav
            className="flex flex-col space-y-1 text-base"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.sectionId}
                type="button"
                onClick={() =>
                  handleNavClick(
                    item.sectionId,
                    item.audiencePreset
                  )
                }
                className="text-left py-2.5 px-3 rounded-md hover:bg-[#1116A6] active:bg-[#1116A6] text-white/90 hover:text-white transition-colors"
              >
                {item.mobileLabel || item.label}
              </button>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#b8952b] active:bg-[#b8952b] text-[#0A0D66] font-bold py-3 rounded-lg text-base shadow-md transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};