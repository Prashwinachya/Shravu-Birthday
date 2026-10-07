import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface BlessingItem {
  id: string;
  title: string;
  message: string;
  symbol: string;
  color: string;
  glowColor: string;
  top: string;
  left: string;
  floatDuration: number;
  floatDelay: number;
}

const CELESTIAL_BLESSINGS: BlessingItem[] = [
  {
    id: 'b-1',
    title: 'Radiant Peace 🌸',
    message: 'May your days be calm, serene, and filled with quiet beauty and genuine joy.',
    symbol: '🌸',
    color: 'from-pink-400 via-rose-300 to-amber-200',
    glowColor: 'rgba(244,114,182,0.5)',
    top: '18%',
    left: '14%',
    floatDuration: 5.5,
    floatDelay: 0
  },
  {
    id: 'b-2',
    title: 'Golden Milestones 🩺',
    message: 'May your noble medical journey reach extraordinary heights of success, wisdom, and healing impact.',
    symbol: '🩺',
    color: 'from-amber-300 via-yellow-200 to-rose-300',
    glowColor: 'rgba(251,191,36,0.5)',
    top: '25%',
    left: '48%',
    floatDuration: 6.2,
    floatDelay: 0.8
  },
  {
    id: 'b-3',
    title: 'Pure Joy & Laughter 💫',
    message: 'May your heart always be light, surrounded by true friends and endless cheerful moments.',
    symbol: '💫',
    color: 'from-purple-300 via-pink-300 to-rose-200',
    glowColor: 'rgba(192,132,252,0.5)',
    top: '20%',
    left: '80%',
    floatDuration: 4.8,
    floatDelay: 1.2
  },
  {
    id: 'b-4',
    title: 'Gentle Grace 🌷',
    message: 'Thank you for your empathy, warmth, and the effortless kindness you share with the world.',
    symbol: '🌷',
    color: 'from-rose-300 via-pink-400 to-purple-300',
    glowColor: 'rgba(251,113,133,0.5)',
    top: '62%',
    left: '22%',
    floatDuration: 5.8,
    floatDelay: 0.5
  },
  {
    id: 'b-5',
    title: 'Health & Vitality 🤍',
    message: 'Wishing you abundant wellness, energy, peaceful mornings, and lifelong inner harmony.',
    symbol: '🤍',
    color: 'from-amber-200 via-rose-200 to-pink-300',
    glowColor: 'rgba(253,230,138,0.5)',
    top: '68%',
    left: '52%',
    floatDuration: 5.1,
    floatDelay: 1.5
  },
  {
    id: 'b-6',
    title: 'Dreams Realized 🌟',
    message: 'May every aspiration you hold close to your heart unfold into beautiful realities.',
    symbol: '🌟',
    color: 'from-yellow-300 via-amber-200 to-rose-200',
    glowColor: 'rgba(252,211,77,0.5)',
    top: '58%',
    left: '82%',
    floatDuration: 6.5,
    floatDelay: 0.3
  }
];

const BalloonGame: React.FC = () => {
  const [collectedIds, setCollectedIds] = useState<string[]>([]);
  const [activeBlessing, setActiveBlessing] = useState<BlessingItem | null>(null);

  const handleStarClick = (blessing: BlessingItem) => {
    sounds.playPop();

    if (!collectedIds.includes(blessing.id)) {
      const updated = [...collectedIds, blessing.id];
      setCollectedIds(updated);

      if (updated.length === CELESTIAL_BLESSINGS.length) {
        sounds.playFanfare();
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FBCFE8', '#FDE68A', '#E9D5FF', '#FFF1F2']
        });
      }
    }

    setActiveBlessing(blessing);
  };

  const resetConstellation = () => {
    sounds.playClick();
    setCollectedIds([]);
    setActiveBlessing(null);
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
            Tap the floating celestial stars to reveal special birthday blessings for Dr. Shravya.
          </p>
        </div>

        {/* Collection Tracker Bar */}
        <div className="flex items-center justify-between bg-[#0b0813]/80 px-5 py-3.5 rounded-2xl border border-white/10 mb-6 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-rose-200 text-xs sm:text-sm font-medium">
            <Star className="w-4 h-4 text-amber-200 fill-amber-200" />
            <span>Blessings Collected:</span>
            <span className="font-bold text-white font-serif-luxury text-base">
              {collectedIds.length} / {CELESTIAL_BLESSINGS.length}
            </span>
          </div>

          {collectedIds.length > 0 && (
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
        <div className="relative w-full h-[380px] sm:h-[400px] bg-gradient-to-b from-[#090610] via-[#130d22] to-[#0d0918] rounded-2xl border border-white/10 overflow-hidden shadow-inner flex flex-col items-center justify-center select-none">
          {/* Subtle celestial stars background dots */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/25 via-transparent to-transparent pointer-events-none" />

          {/* Background star twinkle dots */}
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
              style={{
                top: `${(i * 19) % 92 + 4}%`,
                left: `${(i * 31) % 94 + 3}%`,
                animationDuration: `${2 + (i % 4)}s`
              }}
            />
          ))}

          {/* Interactive Floating Stars */}
          {CELESTIAL_BLESSINGS.map((blessing) => {
            const isCollected = collectedIds.includes(blessing.id);
            return (
              <motion.button
                key={blessing.id}
                onClick={() => handleStarClick(blessing)}
                animate={{
                  y: [0, -12, 0],
                  x: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: blessing.floatDuration,
                  repeat: Infinity,
                  delay: blessing.floatDelay,
                  ease: 'easeInOut'
                }}
                whileHover={{ scale: 1.2, zIndex: 30 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr ${blessing.color} flex flex-col items-center justify-center cursor-pointer shadow-lg transition-all border ${
                  isCollected
                    ? 'border-amber-200 ring-2 ring-amber-300/40'
                    : 'border-white/40 hover:border-white'
                }`}
                style={{
                  top: blessing.top,
                  left: blessing.left,
                  boxShadow: `0 0 25px ${blessing.glowColor}`
                }}
                title={blessing.title}
              >
                <span className="text-xl sm:text-2xl drop-shadow-md">{blessing.symbol}</span>
                {isCollected && (
                  <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-emerald-300 fill-[#0b0813]" />
                )}
              </motion.button>
            );
          })}

          {/* Active Revealed Blessing Modal / Overlay */}
          <AnimatePresence>
            {activeBlessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                className="z-30 p-6 sm:p-7 max-w-sm w-full mx-4 rounded-3xl bg-[#0f0a1c]/95 backdrop-blur-xl border border-rose-200/40 text-center shadow-[0_15px_45px_rgba(0,0,0,0.8)]"
              >
                <div className="w-11 h-11 rounded-full bg-rose-500/20 text-rose-200 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">{activeBlessing.symbol}</span>
                </div>
                <h3 className="text-xl font-bold text-white font-serif-luxury mb-2">
                  {activeBlessing.title}
                </h3>
                <p className="text-rose-100/90 text-sm font-light leading-relaxed mb-4">
                  {activeBlessing.message}
                </p>
                <button
                  onClick={() => setActiveBlessing(null)}
                  className="px-5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 text-xs font-medium border border-rose-200/30 transition-all cursor-pointer"
                >
                  Keep in Star Jar ✨
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!activeBlessing && (
            <p className="absolute bottom-3 text-xs text-rose-200/60 pointer-events-none font-light bg-[#0b0813]/60 px-4 py-1 rounded-full border border-white/5 backdrop-blur-sm">
              Tap any star to unfold its birthday blessing ✨
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BalloonGame;


