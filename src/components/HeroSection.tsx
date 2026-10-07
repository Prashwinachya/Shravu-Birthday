import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, Stethoscope } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

const HeroSection: React.FC = () => {
  const triggerPetalShower = () => {
    sounds.playFanfare();

    const count = 180;
    const defaults = { origin: { y: 0.7 }, zIndex: 100 };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 30, startVelocity: 45, colors: ['#FBCFE8', '#FDE68A', '#FFF1F2'] });
    fire(0.2, { spread: 60, colors: ['#E9D5FF', '#F472B6', '#FEE2E2'] });
    fire(0.35, { spread: 90, decay: 0.92, scalar: 0.9 });
    fire(0.1, { spread: 110, startVelocity: 25, decay: 0.94, scalar: 1.1 });
    fire(0.1, { spread: 120, startVelocity: 40 });
  };

  return (
    <section id="hero" className="relative z-10 pt-2 pb-14 px-4 max-w-4xl mx-auto text-center">
      {/* Top Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-rose-200/25 text-rose-200 text-xs sm:text-sm font-medium mb-6 shadow-md backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-200" />
        <span>A Celebration of Grace & Brilliance</span>
        <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/60" />
      </motion.div>

      {/* Main Headline for Dr. Shravya Acharya */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight font-serif-luxury mb-4 text-white">
          Happy Birthday, <br />
          <span className="text-gradient-rose-gold drop-shadow-[0_0_35px_rgba(244,114,182,0.35)]">
            Dr. Shravya Acharya
          </span>{' '}
          ✨🌸
        </h1>

        <p className="text-rose-100/85 text-base sm:text-lg font-light max-w-2xl mx-auto mt-4 leading-relaxed italic">
          Celebrating the wonderful spirit, kind heart, and brilliant journey of someone truly exceptional.
          May your special day bloom with all the joy, peace, and beauty you effortlessly bring into the world.
        </p>
      </motion.div>

      {/* Action Button: Petal & Stardust Shower */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-14"
      >
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(244,114,182,0.4)' }}
          whileTap={{ scale: 0.96 }}
          onClick={triggerPetalShower}
          className="px-8 py-3.5 bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200 text-[#1f0b18] font-semibold text-base sm:text-lg rounded-full shadow-[0_10px_25px_rgba(244,114,182,0.3)] transition-all cursor-pointer flex items-center gap-2.5"
        >
          <Sparkles className="w-5 h-5 text-[#1f0b18]" />
          <span>Shower Stardust & Petals 🌸</span>
        </motion.button>
      </motion.div>

      {/* Elegant Appreciation Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left"
      >
        <div className="glass-pearl p-5 rounded-2xl border border-rose-200/15 hover:border-rose-300/30 transition-colors">
          <div className="flex items-center gap-2 text-rose-300 mb-2">
            <Stethoscope className="w-4 h-4 text-rose-300" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-200/70">Healing</span>
          </div>
          <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">Compassion</p>
          <p className="text-xs text-rose-100/70 mt-1 font-light">Gentle healing touch</p>
        </div>

        <div className="glass-pearl p-5 rounded-2xl border border-amber-200/15 hover:border-amber-300/30 transition-colors">
          <div className="flex items-center gap-2 text-amber-200 mb-2">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-100/70">Aura</span>
          </div>
          <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">Brilliance</p>
          <p className="text-xs text-rose-100/70 mt-1 font-light">Grace & intellect</p>
        </div>

        <div className="glass-pearl p-5 rounded-2xl border border-purple-200/15 hover:border-purple-300/30 transition-colors">
          <div className="flex items-center gap-2 text-purple-200 mb-2">
            <Heart className="w-4 h-4 text-purple-300" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-100/70">Spirit</span>
          </div>
          <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">Warmth</p>
          <p className="text-xs text-rose-100/70 mt-1 font-light">Radiant & uplifting</p>
        </div>

        <div className="glass-pearl p-5 rounded-2xl border border-pink-200/15 hover:border-pink-300/30 transition-colors">
          <div className="flex items-center gap-2 text-pink-300 mb-2">
            <Star className="w-4 h-4 text-pink-300" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-100/70">Future</span>
          </div>
          <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">Infinite</p>
          <p className="text-xs text-rose-100/70 mt-1 font-light">Dreams coming true</p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

