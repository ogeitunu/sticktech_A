import React from 'react';

interface HeaderProps {
  onSelectAudience: (audience: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectAudience }) => {
  return (
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-xl text-[#1116A6]">StickTech Africa</span>
        </div>

        {/* Navigation / Audience Selector */}
        <nav className="hidden md:flex space-x-6">
          <button 
            onClick={() => onSelectAudience('School Owner / Proprietor')}
            className="text-sm font-medium hover:text-[#1116A6] transition-colors"
          >
            For Schools
          </button>
          <button 
            onClick={() => onSelectAudience('Individual Student / Parent')}
            className="text-sm font-medium hover:text-[#1116A6] transition-colors"
          >
            For Students & Parents
          </button>
        </nav>
      </div>
    </header>
  );
};