import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface Props {
  onUnlock: () => void;
}

const IntroGate: React.FC<Props> = ({ onUnlock }) => {
  const handleClick = () => {
    sounds.playFanfare();

    // Soft elegant pastel confetti burst on entry
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FBCFE8', '#FDE68A', '#E9D5FF', '#FFF1F2', '#F472B6']
    });

    onUnlock();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0b0813]/90 backdrop-blur-3xl overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-rose-400/10 rounded-full blur-[140px] pointer-events-none animate-pulse-luminous" />
      <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -30, transition: { duration: 0.6 } }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass-champagne max-w-xl w-full p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-rose-200/20"
      >
        {/* Subtle shimmer banner */}
        <div className="absolute inset-0 shimmer-elegance pointer-events-none" />

        {/* Delicate Sparkle Icon Aura */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 15, delay: 0.2 }}
          className="w-18 h-18 sm:w-20 sm:h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-rose-200/20 via-pink-300/30 to-amber-200/25 flex items-center justify-center border border-rose-200/40 shadow-[0_0_30px_rgba(244,114,182,0.25)] text-rose-200"
        >
          <Sparkles className="w-9 h-9 sm:w-10 sm:h-10 text-rose-200 animate-spin" style={{ animationDuration: '9s' }} />
        </motion.div>

        {/* Dedicated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-rose-200/25 text-rose-200 text-xs sm:text-sm font-medium tracking-wide mb-5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>A Special Birthday Celebration</span>
          <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/60" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight mb-5 text-white font-serif-luxury leading-tight"
        >
          Happy Birthday, <br />
          <span className="text-gradient-rose-gold drop-shadow-[0_0_30px_rgba(244,114,182,0.3)]">
            Dr. Shravya ✨
          </span>
        </motion.h1>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-rose-100/90 text-sm sm:text-base mb-9 max-w-md mx-auto font-light leading-relaxed italic"
        >
          &ldquo;Today isn&apos;t just another day.
          It&apos;s a celebration of someone who makes the world a little brighter simply by being in it.&rdquo;
        </motion.p>

        {/* Begin Journey CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(244,114,182,0.45)' }}
          whileTap={{ scale: 0.96 }}
          onClick={handleClick}
          className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200 text-[#1f0b18] font-semibold text-base sm:text-lg rounded-full shadow-[0_10px_30px_rgba(244,114,182,0.35)] transition-all cursor-pointer flex items-center justify-center gap-3 mx-auto"
        >
          <Sparkles className="w-5 h-5 text-[#1f0b18]" />
          <span>Begin Your Birthday Journey ✨</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default IntroGate;

