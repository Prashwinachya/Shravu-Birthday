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
  const [theme, setTheme] = useState('rose');

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-rose-300 selection:text-[#2d0f1f] font-sans">
      {/* Particle & Ambient background mesh */}
      <ParticleBackground theme={theme} />

      {/* Opening Intro Gate Screen */}
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

          <main className="space-y-16 flex-grow">
            <HeroSection />
            <PhotoGallery />
            <InteractiveCake />
            <WishesSection />
            <BalloonGame />
          </main>

          {/* Footer */}
          <footer className="mt-16 pt-8 pb-8 text-center border-t border-white/10 max-w-4xl mx-auto w-full px-4">
            <p className="text-rose-200/90 text-sm sm:text-base font-serif-luxury font-medium tracking-wide">
              Crafted with ❤️ by <span className="text-gradient-champagne font-semibold">Prashwin</span> for <span className="text-gradient-rose-gold font-semibold">Shravya ✨🌸</span>
            </p>
            <p className="text-rose-200/50 text-[11px] sm:text-xs mt-1 font-light">
              Wishing you a year filled with endless smiles, peace of mind, radiant health & fulfilled dreams.
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

