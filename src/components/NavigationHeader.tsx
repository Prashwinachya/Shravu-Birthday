import React from 'react';
import { Sparkles, Image, Flame, Mail, HeartHandshake, Star, Palette } from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const NavigationHeader: React.FC<Props> = ({ activeTab, setActiveTab, theme, setTheme }) => {
  const tabs = [
    { id: 'hero', label: 'Celebration', icon: Sparkles },
    { id: 'photos', label: 'Memories', icon: Image },
    { id: 'cake', label: 'Cake & Wish', icon: Flame },
    { id: 'letter', label: 'Letter', icon: Mail },
    { id: 'wishes', label: 'Blessings Wall', icon: HeartHandshake },
    { id: 'lanterns', label: 'Star Jar', icon: Star },
  ];

  const cycleTheme = () => {
    sounds.playClick();
    if (theme === 'rose') setTheme('lavender');
    else if (theme === 'lavender') setTheme('champagne');
    else setTheme('rose');
  };

  const handleTabClick = (tabId: string) => {
    sounds.playClick();
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-4 z-40 px-3 sm:px-4 max-w-5xl mx-auto w-full mb-8">
      <nav className="glass-pearl p-2 sm:p-2.5 rounded-full flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/15">
        {/* Brand Badge */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-300 via-pink-400 to-amber-200 flex items-center justify-center text-[#1f0b18] font-bold text-xs shadow-md">
            ✨
          </div>
          <span className="font-serif-luxury font-semibold text-white text-base tracking-wide hidden sm:inline">
            Dr. Shravya <span className="text-rose-300 font-sans text-xs">✨</span>
          </span>
        </div>

        {/* Tab Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 max-w-[65vw] sm:max-w-none scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200 text-[#1f0b18] font-semibold shadow-md shadow-rose-500/20 scale-105'
                    : 'text-rose-100/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1f0b18]' : 'text-rose-300/80'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Theme Toggle Button */}
        <div className="pr-1">
          <button
            onClick={cycleTheme}
            title={`Current Theme: ${theme.toUpperCase()} (Click to toggle)`}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/10 text-rose-200 text-xs font-medium border border-rose-200/20 transition-all cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-amber-200" />
            <span className="capitalize hidden md:inline">{theme} Mood</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavigationHeader;

