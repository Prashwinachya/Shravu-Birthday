import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface StarWish {
  id: number;
  x: number;
  speed: number;
  color: string;
  size: number;
  title: string;
  message: string;
  symbol: string;
}

const BLESSINGS_POOL = [
  { title: 'Radiant Peace 🌸', message: 'May your days be calm, serene, and filled with quiet beauty.', symbol: '🌸' },
  { title: 'Golden Milestones 🩺', message: 'May your noble medical journey reach new heights of success and impact.', symbol: '✨' },
  { title: 'Pure Joy & Laughter 💫', message: 'May your heart always be light and your smile ever genuine.', symbol: '💫' },
  { title: 'Deep Gratitude 🕊️', message: 'Thank you for bringing so much kindness and light into the world.', symbol: '🌷' },
  { title: 'Lifelong Health & Vitality 🤍', message: 'Wishing you abundant wellness, energy, and inner peace.', symbol: '🤍' },
  { title: 'Dreams Realized 🌟', message: 'May every aspiration you hold close to your heart unfold effortlessly.', symbol: '🌟' }
];

const STAR_STYLES = [
  'bg-gradient-to-tr from-rose-400/80 to-pink-300/90 shadow-[0_0_20px_rgba(244,114,182,0.6)] border border-rose-200/50',
  'bg-gradient-to-tr from-amber-300/80 to-yellow-200/90 shadow-[0_0_20px_rgba(251,191,36,0.6)] border border-amber-100/50',
  'bg-gradient-to-tr from-purple-400/80 to-indigo-300/90 shadow-[0_0_20px_rgba(192,132,252,0.6)] border border-purple-200/50',
  'bg-gradient-to-tr from-pink-300/80 to-rose-200/90 shadow-[0_0_20px_rgba(251,113,133,0.6)] border border-pink-100/50'
];

const BalloonGame: React.FC = () => {
  const [stars, setStars] = useState<StarWish[]>([]);
  const [unlockedBlessings, setUnlockedBlessings] = useState<string[]>([]);
  const [currentRevealed, setCurrentRevealed] = useState<{ title: string; message: string } | null>(null);

  // Spawn floating stars loop
  useEffect(() => {
    const spawner = setInterval(() => {
      setStars((prev) => {
        if (prev.length > 8) return prev;
        const blessing = BLESSINGS_POOL[Math.floor(Math.random() * BLESSINGS_POOL.length)];
        const newStar: StarWish = {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 10,
          speed: 7 + Math.random() * 5,
          color: STAR_STYLES[Math.floor(Math.random() * STAR_STYLES.length)],
          size: 48 + Math.random() * 14,
          title: blessing.title,
          message: blessing.message,
          symbol: blessing.symbol
        };
        return [...prev, newStar].slice(-10);
      });
    }, 1200);

    return () => clearInterval(spawner);
  }, []);

  // Catch a star
  const catchStar = (star: StarWish) => {
    sounds.playPop();

    if (!unlockedBlessings.includes(star.title)) {
      setUnlockedBlessings(prev => [...prev, star.title]);
      if (unlockedBlessings.length + 1 >= BLESSINGS_POOL.length) {
        sounds.playFanfare();
        confetti({
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#FBCFE8', '#FDE68A', '#E9D5FF']
        });
      }
    }

    setCurrentRevealed({ title: star.title, message: star.message });
    setStars(prev => prev.filter(s => s.id !== star.id));
  };

  const resetConstellation = () => {
    sounds.playClick();
    setUnlockedBlessings([]);
    setCurrentRevealed(null);
  };

  return (
    <section id="lanterns" className="relative z-10 py-14 px-4 max-w-4xl mx-auto">
      <div className="glass-pearl p-6 sm:p-10 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-rose-200/25 text-rose-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>INTERACTIVE STAR JAR</span>
            <Star className="w-3.5 h-3.5 text-rose-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-serif-luxury">
            Constellation of <span className="text-gradient-rose-gold">Wishes ✨</span>
          </h2>
          <p className="text-rose-100/75 text-sm sm:text-base mt-2 max-w-md mx-auto font-light">
            Tap any floating wish star to catch a special birthday blessing for Dr. Shravya.
          </p>
        </div>

        {/* Collection Tracker Bar */}
        <div className="flex items-center justify-between bg-[#0b0813]/80 p-4 rounded-2xl border border-white/10 mb-6 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-rose-200 text-xs sm:text-sm font-medium">
            <Star className="w-4 h-4 text-amber-200 fill-amber-200" />
            <span>Blessings Collected:</span>
            <span className="font-bold text-white font-serif-luxury text-base">
              {unlockedBlessings.length} / {BLESSINGS_POOL.length}
            </span>
          </div>

          {unlockedBlessings.length > 0 && (
            <button
              onClick={resetConstellation}
              className="text-xs text-rose-200/70 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Sky View Canvas */}
        <div className="relative w-full h-[360px] bg-gradient-to-b from-[#090610] via-[#130d22] to-[#0d0918] rounded-2xl border border-white/10 overflow-hidden shadow-inner flex flex-col items-center justify-center">
          {/* Subtle celestial stars background dots */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

          {/* Current Revealed Blessing Overlay Card */}
          <AnimatePresence>
            {currentRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="z-20 p-6 max-w-sm w-full mx-4 rounded-2xl bg-[#0f0a1c]/90 backdrop-blur-md border border-rose-200/30 text-center shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
              >
                <div className="w-9 h-9 rounded-full bg-rose-500/20 text-rose-200 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </div>
                <h3 className="text-lg font-bold text-white font-serif-luxury mb-1">
                  {currentRevealed.title}
                </h3>
                <p className="text-rose-100/80 text-xs sm:text-sm font-light leading-relaxed">
                  {currentRevealed.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Stars */}
          <AnimatePresence>
            {stars.map((s) => (
              <motion.button
                key={s.id}
                initial={{ y: '360px', opacity: 0, scale: 0.6 }}
                animate={{ y: '-60px', opacity: [0, 0.9, 0.9, 0], scale: [0.6, 1, 1, 0.8] }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: s.speed, ease: 'linear' }}
                onClick={() => catchStar(s)}
                className={`absolute rounded-full ${s.color} cursor-pointer flex items-center justify-center text-white text-base font-bold transition-transform active:scale-125 select-none hover:scale-110`}
                style={{
                  left: `${s.x}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`
                }}
                title={s.title}
              >
                <span>{s.symbol}</span>
              </motion.button>
            ))}
          </AnimatePresence>

          {!currentRevealed && (
            <p className="absolute bottom-4 text-xs text-rose-200/50 pointer-events-none font-light">
              Tap any star as it drifts across the sky ✨
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BalloonGame;

