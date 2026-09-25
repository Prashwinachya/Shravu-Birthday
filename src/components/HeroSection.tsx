import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Zap, Flame, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

const HeroSection: React.FC = () => {
  const triggerExplosion = () => {
    sounds.playFanfare();

    const count = 250;
    const defaults = { origin: { y: 0.7 }, zIndex: 100 };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 35, startVelocity: 60, colors: ['#F59E0B', '#FCD34D', '#38BDF8'] });
    fire(0.2, { spread: 75, colors: ['#EC4899', '#A855F7', '#10B981'] });
    fire(0.35, { spread: 110, decay: 0.91, scalar: 1.1 });
    fire(0.1, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.3 });
    fire(0.1, { spread: 130, startVelocity: 50 });
  };

  return (
    <section id="hero" className="relative z-10 pt-4 pb-12 px-4 max-w-4xl mx-auto text-center">
      {/* Top Floating Crown Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-sm font-semibold mb-6 shadow-lg backdrop-blur-md"
      >
        <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
        <span>OFFICIAL BIRTHDAY CELEBRATION 2026</span>
        <Sparkles className="w-4 h-4 text-amber-400" />
      </motion.div>

      {/* Main Headline for PAVAN */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none font-heading mb-3">
          HAPPY BIRTHDAY <br />
          <span className="text-gradient-gold drop-shadow-[0_0_40px_rgba(245,158,11,0.5)]">
            PAVAN!
          </span>{' '}
          🎂👑
        </h1>

        <p className="text-slate-300 text-base sm:text-xl font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          Celebrating a true legend! Here&apos;s to another fantastic year of epic wins, unforgettable moments, non-stop laughter, and massive success. 🚀🔥
        </p>
      </motion.div>

      {/* Action Button: Confetti Cannon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-12"
      >
        <motion.button
          whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(245,158,11,0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerExplosion}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-extrabold text-lg sm:text-xl rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.35)] transition-all cursor-pointer flex items-center gap-3"
        >
          <Sparkles className="w-6 h-6 fill-slate-950" />
          <span>LAUNCH CONFETTI CANNON 💥</span>
        </motion.button>
      </motion.div>

      {/* VIP Stat Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left"
      >
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Energy</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-heading">100%</p>
          <p className="text-xs text-slate-400 mt-1">High Swagger Vibe</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Success</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-heading">NEXT LEVEL</p>
          <p className="text-xs text-slate-400 mt-1">Year of Big Wins</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Flame className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Attitude</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-heading">UNSTOPPABLE</p>
          <p className="text-xs text-slate-400 mt-1">Pure Boss Energy</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-pink-500/20">
          <div className="flex items-center gap-2 text-pink-400 mb-2">
            <Crown className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Friendship</span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-heading">∞ / ∞</p>
          <p className="text-xs text-slate-400 mt-1">Brotherhood Forever</p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
