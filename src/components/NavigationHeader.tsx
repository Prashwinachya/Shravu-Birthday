import React from 'react';
import { Crown, Image, Flame, MessageSquareHeart, Gamepad2, Palette } from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const NavigationHeader: React.FC<Props> = ({ activeTab, setActiveTab, theme, setTheme }) => {
  const tabs = [
    { id: 'hero', label: 'Main', icon: Crown },
    { id: 'photos', label: 'Memories', icon: Image },
    { id: 'cake', label: 'Cake', icon: Flame },
    { id: 'wishes', label: 'Toasts & Wishes', icon: MessageSquareHeart },
    { id: 'game', label: 'Arcade', icon: Gamepad2 },
  ];

  const cycleTheme = () => {
    sounds.playClick();
    if (theme === 'gold') setTheme('cyber');
    else if (theme === 'cyber') setTheme('cosmic');
    else setTheme('gold');
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
    <header className="sticky top-4 z-40 px-4 max-w-5xl mx-auto w-full mb-8">
      <nav className="glass-panel p-2.5 rounded-full flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-slate-700/50">
        {/* Brand Badge */}
        <div className="flex items-center gap-2 pl-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-bold text-sm shadow-md">
            👑
          </div>
          <span className="font-extrabold text-white text-base tracking-tight hidden sm:inline">
            PAVAN&apos;S <span className="text-amber-400">VIP</span>
          </span>
        </div>

        {/* Tab Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Theme Toggle Button */}
        <div className="pr-1">
          <button
            onClick={cycleTheme}
            title={`Current Theme: ${theme.toUpperCase()} (Click to toggle)`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 text-xs font-semibold border border-amber-500/20 transition-all cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span className="capitalize hidden sm:inline">{theme} Vibe</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavigationHeader;
