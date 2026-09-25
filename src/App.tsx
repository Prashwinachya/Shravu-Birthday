import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import IntroGate from './components/IntroGate';
import NavigationHeader from './components/NavigationHeader';
import HeroSection from './components/HeroSection';
import PhotoGallery from './components/PhotoGallery';
import InteractiveCake from './components/InteractiveCake';
import WishesSection from './components/WishesSection';
import BalloonGame from './components/BalloonGame';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [theme, setTheme] = useState('gold');

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Particle & Ambient background mesh */}
      <ParticleBackground theme={theme} />

      {/* Intro VIP Gate Screen */}
      <AnimatePresence>
        {!isUnlocked && (
          <IntroGate key="intro" onUnlock={() => setIsUnlocked(true)} />
        )}
      </AnimatePresence>

      {/* Main Birthday Experience */}
      {isUnlocked && (
        <div className="relative z-10 flex flex-col min-h-screen pb-16">
          <NavigationHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            theme={theme}
            setTheme={setTheme}
          />

          <main className="space-y-12 flex-grow">
            <HeroSection />
            <PhotoGallery />
            <InteractiveCake />
            <WishesSection />
            <BalloonGame />
          </main>

          {/* Footer Branding */}
          <footer className="mt-16 pt-8 pb-6 text-center border-t border-slate-800/60 max-w-4xl mx-auto w-full px-4">
            <p className="text-slate-400 text-xs sm:text-sm font-light">
              Crafted with ❤️ for <span className="text-amber-400 font-semibold">PAVAN&apos;S BIRTHDAY CELEBRATION 🎂</span>
            </p>
            <p className="text-slate-500 text-[11px] mt-1">
              Cheers to health, prosperity, happiness & endless success!
            </p>
          </footer>
        </div>
      )}

      {/* Persistent Background Music Player */}
      <MusicPlayer />
    </div>
  );
}

export default App;
