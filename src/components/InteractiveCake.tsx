import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, RefreshCw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

const InteractiveCake: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [makeWish, setMakeWish] = useState('');
  const [submittedWish, setSubmittedWish] = useState(false);

  const handleBlowCandles = () => {
    sounds.playBlowCandles();
    setCandlesBlown(true);

    // Soft pastel stardust celebratory fireworks
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FBCFE8', '#FDE68A', '#E9D5FF', '#FFF1F2', '#F472B6']
    });
  };

  const handleRelight = () => {
    sounds.playClick();
    setCandlesBlown(false);
    setSubmittedWish(false);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!makeWish.trim()) return;
    sounds.playFanfare();
    setSubmittedWish(true);
  };

  return (
    <section id="cake" className="relative z-10 py-14 px-4 max-w-3xl mx-auto text-center">
      <div className="glass-champagne p-8 sm:p-12 rounded-3xl border border-rose-200/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Section Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-rose-200/25 text-rose-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>BIRTHDAY CANDLE CEREMONY</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-serif-luxury">
            Make a Wish & <span className="text-gradient-rose-gold">Blow the Candles 🎂✨</span>
          </h2>
          <p className="text-rose-100/80 text-sm sm:text-base mt-2 font-light max-w-md mx-auto">
            {candlesBlown
              ? '✨ The candles are blown! May all your heartfelt wishes and dreams blossom into reality.'
              : 'Close your eyes, make a meaningful wish, and gently blow out the candles.'}
          </p>
        </div>

        {/* SVG Cake Container */}
        <div className="relative w-64 sm:w-80 mx-auto my-6 select-none">
          {/* Animated SVG Birthday Cake */}
          <svg viewBox="0 0 300 240" className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
            {/* Cake Plate with soft champagne rim */}
            <ellipse cx="150" cy="220" rx="130" ry="16" fill="#1b1226" stroke="#fbcfe8" strokeWidth="2" strokeOpacity="0.4" />
            <ellipse cx="150" cy="218" rx="122" ry="13" fill="#251a36" />

            {/* Bottom Cake Tier: Soft Velvet Cream */}
            <path d="M 45 170 Q 150 195 255 170 L 255 205 Q 150 230 45 205 Z" fill="#4a2840" />
            <path d="M 45 145 Q 150 170 255 145 L 255 175 Q 150 200 45 175 Z" fill="#6b3a5c" />
            
            {/* Bottom Tier Frosting Swirls */}
            <path
              d="M 45 145 Q 65 162 85 148 Q 105 165 125 148 Q 145 165 165 148 Q 185 165 205 148 Q 225 165 245 148 L 255 145"
              fill="none"
              stroke="#fed7aa"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Top Cake Tier: Strawberry Rose Crème */}
            <path d="M 75 105 Q 150 128 225 105 L 225 140 Q 150 162 75 140 Z" fill="#884d72" />
            {/* Top Glaze */}
            <ellipse cx="150" cy="105" rx="75" ry="18" fill="#fce7f3" />
            <ellipse cx="150" cy="105" rx="70" ry="15" fill="#fdf2f8" />

            {/* Decorative pearls on cake top */}
            {[
              { cx: 85, cy: 104 },
              { cx: 105, cy: 112 },
              { cx: 130, cy: 116 },
              { cx: 150, cy: 118 },
              { cx: 170, cy: 116 },
              { cx: 195, cy: 112 },
              { cx: 215, cy: 104 }
            ].map((p, idx) => (
              <circle key={idx} cx={p.cx} cy={p.cy} r="3" fill="#fde68a" />
            ))}

            {/* Candles (3 Candles) */}
            {[
              { id: 1, cx: 112, cy: 100 },
              { id: 2, cx: 150, cy: 96 },
              { id: 3, cx: 188, cy: 100 }
            ].map((candle) => (
              <g key={candle.id} onClick={handleBlowCandles} className="cursor-pointer">
                {/* Candle Stick */}
                <rect x={candle.cx - 4} y={candle.cy - 34} width="8" height="34" rx="2" fill="url(#roseGoldCandle)" />
                {/* Wick */}
                <line x1={candle.cx} y1={candle.cy - 34} x2={candle.cx} y2={candle.cy - 40} stroke="#475569" strokeWidth="1.8" />

                {/* Flame */}
                {!candlesBlown && (
                  <motion.g
                    animate={{
                      scale: [1, 1.12, 0.96, 1],
                      opacity: [0.9, 1, 0.85, 0.9]
                    }}
                    transition={{ repeat: Infinity, duration: 0.5 + candle.id * 0.12 }}
                  >
                    <ellipse cx={candle.cx} cy={candle.cy - 48} rx="6" ry="11" fill="#fbbf24" />
                    <ellipse cx={candle.cx} cy={candle.cy - 46} rx="3.5" ry="7" fill="#fef08a" />
                  </motion.g>
                )}

                {/* Delicate Smoke particle when blown */}
                {candlesBlown && (
                  <motion.circle
                    initial={{ opacity: 0.7, r: 2, cy: candle.cy - 42 }}
                    animate={{ opacity: 0, r: 10, cy: candle.cy - 70 }}
                    transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }}
                    cx={candle.cx}
                    fill="#e2e8f0"
                  />
                )}
              </g>
            ))}

            <defs>
              <linearGradient id="roseGoldCandle" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbcfe8" />
                <stop offset="50%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {!candlesBlown ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleBlowCandles}
              className="px-8 py-3.5 bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200 text-[#1f0b18] font-semibold text-base sm:text-lg rounded-full shadow-[0_10px_25px_rgba(244,114,182,0.3)] transition-all cursor-pointer flex items-center gap-2.5"
            >
              <Flame className="w-5 h-5 text-[#1f0b18]" />
              <span>Blow Out Candles 💨</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRelight}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-rose-200 font-medium text-sm sm:text-base rounded-full border border-rose-200/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-amber-200" />
              <span>Relight Candles 🕯️</span>
            </motion.button>
          )}
        </div>

        {/* Birthday Wish Card after Candles are blown */}
        <AnimatePresence>
          {candlesBlown && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-6 border-t border-white/10 max-w-md mx-auto"
            >
              {!submittedWish ? (
                <form onSubmit={handleWishSubmit} className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-rose-200 text-sm font-medium">
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Send a Birthday Blessing for Dr. Shravya</span>
                  </div>
                  <input
                    type="text"
                    value={makeWish}
                    onChange={(e) => setMakeWish(e.target.value)}
                    placeholder="e.g. Wishing you grand success in medicine and boundless joy! 🌸"
                    className="w-full px-4 py-3 rounded-2xl bg-[#0b0813]/80 border border-rose-200/30 text-white placeholder-rose-200/40 focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200 text-[#1f0b18] font-semibold text-sm shadow-md hover:opacity-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-[#1f0b18] text-[#1f0b18]" />
                    <span>Send Blessing ✨</span>
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 rounded-2xl bg-white/[0.06] border border-rose-200/30 text-rose-100 text-sm font-light leading-relaxed"
                >
                  🌸 Blessing registered for Dr. Shravya:{' '}
                  <strong className="text-white italic">&quot;{makeWish}&quot;</strong>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveCake;

