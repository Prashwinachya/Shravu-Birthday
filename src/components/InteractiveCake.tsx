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

    // Explosive celebratory confetti fireworks
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#38BDF8', '#EC4899', '#10B981']
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
    <section id="cake" className="relative z-10 py-12 px-4 max-w-3xl mx-auto text-center">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-[0_20px_50px_rgba(245,158,11,0.15)] relative overflow-hidden">
        {/* Section Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>INTERACTIVE CAKE CEREMONY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            BLOW THE <span className="text-gradient-gold">CANDLES! 🎂</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
            {candlesBlown
              ? "All candles are blown out! Pavan's birthday wish is coming true! ✨"
              : "Tap the button or the flames to blow out Pavan's birthday candles!"}
          </p>
        </div>

        {/* SVG Cake Container */}
        <div className="relative w-64 sm:w-80 mx-auto my-8 select-none">
          {/* Animated SVG Birthday Cake */}
          <svg viewBox="0 0 300 240" className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
            {/* Cake Plate */}
            <ellipse cx="150" cy="220" rx="130" ry="18" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />

            {/* Bottom Cake Layer */}
            <path d="M 40 170 Q 150 200 260 170 L 260 205 Q 150 235 40 205 Z" fill="#7C2D12" />
            <path d="M 40 140 Q 150 170 260 140 L 260 175 Q 150 205 40 175 Z" fill="#B45309" />
            {/* Chocolate frosting drip */}
            <path d="M 40 140 Q 60 160 80 145 Q 100 165 120 145 Q 140 165 160 145 Q 180 165 200 145 Q 220 165 240 145 Q 260 160 260 140" fill="none" stroke="#FEF3C7" strokeWidth="6" strokeLinecap="round" />

            {/* Top Cake Layer */}
            <path d="M 70 100 Q 150 125 230 100 L 230 135 Q 150 160 70 135 Z" fill="#D97706" />
            {/* Cream Top frosting */}
            <ellipse cx="150" cy="100" rx="80" ry="20" fill="#FEF3C7" />

            {/* Candles (3 Candles) */}
            {[
              { id: 1, cx: 110, cy: 95 },
              { id: 2, cx: 150, cy: 92 },
              { id: 3, cx: 190, cy: 95 }
            ].map((candle) => (
              <g key={candle.id} onClick={handleBlowCandles} className="cursor-pointer">
                {/* Candle Stick */}
                <rect x={candle.cx - 5} y={candle.cy - 35} width="10" height="35" rx="3" fill="url(#candleGrad)" />
                {/* Wick */}
                <line x1={candle.cx} y1={candle.cy - 35} x2={candle.cx} y2={candle.cy - 42} stroke="#334155" strokeWidth="2" />

                {/* Flame (Only visible if not blown) */}
                {!candlesBlown && (
                  <motion.g
                    animate={{
                      scale: [1, 1.15, 0.95, 1],
                      opacity: [0.9, 1, 0.85, 0.9]
                    }}
                    transition={{ repeat: Infinity, duration: 0.6 + candle.id * 0.1 }}
                  >
                    <ellipse cx={candle.cx} cy={candle.cy - 50} rx="7" ry="12" fill="#F59E0B" />
                    <ellipse cx={candle.cx} cy={candle.cy - 48} rx="4" ry="8" fill="#FDE047" />
                  </motion.g>
                )}

                {/* Smoke particle when blown out */}
                {candlesBlown && (
                  <motion.circle
                    initial={{ opacity: 0.8, r: 2, cy: candle.cy - 45 }}
                    animate={{ opacity: 0, r: 12, cy: candle.cy - 75 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    cx={candle.cx}
                    fill="#94A3B8"
                  />
                )}
              </g>
            ))}

            <defs>
              <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {!candlesBlown ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowCandles}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-300 text-slate-950 font-extrabold text-base sm:text-lg rounded-2xl shadow-[0_10px_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center gap-2"
            >
              <Flame className="w-5 h-5 fill-slate-950" />
              <span>BLOW OUT CANDLES 💨</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRelight}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-sm sm:text-base rounded-2xl border border-amber-500/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>Relight Candles 🕯️</span>
            </motion.button>
          )}
        </div>

        {/* Birthday Wish Form after Candles are blown */}
        <AnimatePresence>
          {candlesBlown && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-6 border-t border-slate-700/60 max-w-md mx-auto"
            >
              {!submittedWish ? (
                <form onSubmit={handleWishSubmit} className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-amber-300 text-sm font-semibold">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Make a Birthday Wish for Pavan</span>
                  </div>
                  <input
                    type="text"
                    value={makeWish}
                    onChange={(e) => setMakeWish(e.target.value)}
                    placeholder="e.g. May you buy your dream car & hit all goals this year! 🚀"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-300 text-slate-950 font-bold text-sm shadow-md hover:from-amber-400 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-slate-950" />
                    <span>Send Wish to Pavan ✨</span>
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm font-medium"
                >
                  🎉 Wish registered for Pavan: <strong className="text-white italic">&quot;{makeWish}&quot;</strong>!
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
