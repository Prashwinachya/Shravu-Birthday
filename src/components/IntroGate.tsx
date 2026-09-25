import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Zap } from 'lucide-react';
import { sounds } from '../utils/audio';

interface Props {
  onUnlock: () => void;
}

const IntroGate: React.FC<Props> = ({ onUnlock }) => {
  const handleClick = () => {
    sounds.playFanfare();
    onUnlock();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel-gold max-w-xl w-full p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.25)] border border-amber-500/30"
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer-effect pointer-events-none" />

        {/* Crown Icon Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.6)] text-slate-950"
        >
          <Crown className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
        </motion.div>

        {/* VIP Access Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Exclusive Birthday Surprise for PAVAN</span>
          <Zap className="w-4 h-4 text-amber-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white font-heading"
        >
          ARE YOU READY FOR THE <br />
          <span className="text-gradient-gold">MAIN EVENT? 👑⚡</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-slate-300 text-sm sm:text-base mb-8 max-w-md mx-auto font-light leading-relaxed"
        >
          Get ready to celebrate <strong className="text-amber-300 font-semibold">PAVAN</strong> with custom photos, interactive birthday cake, toasts, games & music!
        </motion.p>

        {/* Enter Celebration Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(245,158,11,0.7)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-extrabold text-lg sm:text-xl rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.4)] hover:from-amber-400 hover:to-yellow-200 transition-all cursor-pointer flex items-center justify-center gap-3 mx-auto"
        >
          <Sparkles className="w-6 h-6 text-slate-950 fill-slate-950" />
          <span>ENTER PAVAN&apos;S CELEBRATION 🎉</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default IntroGate;
