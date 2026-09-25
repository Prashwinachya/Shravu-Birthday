import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  xOffset: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  symbol: string;
}

const SYMBOLS = ['✨', '⭐', '🎈', '🎉', '👑', '⚡'];
const COLORS = ['text-amber-400', 'text-yellow-300', 'text-cyan-400', 'text-purple-400', 'text-pink-400'];

const createInitialParticles = (): Particle[] => {
  return Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    xOffset: Math.random() * 8 - 4,
    size: Math.random() * 18 + 12,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
  }));
};

const ParticleBackground: React.FC<{ theme?: string }> = ({ theme = 'gold' }) => {
  const [particles] = useState<Particle[]>(createInitialParticles);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic ambient background mesh depending on theme */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          theme === 'cyber'
            ? 'bg-gradient-to-b from-slate-950 via-purple-950/60 to-cyan-950/40'
            : theme === 'cosmic'
            ? 'bg-gradient-to-b from-gray-950 via-indigo-950/70 to-slate-950'
            : 'bg-gradient-to-b from-gray-950 via-amber-950/30 to-slate-950'
        }`}
      />

      {/* Radial Ambient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Animated Symbols */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '105vh', opacity: 0, scale: 0.4 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.7, 0.9, 0],
            scale: [0.4, 1, 1.1, 0.7],
            x: [`${p.x}%`, `${p.x + p.xOffset}%`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
          className={`absolute ${p.color} drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]`}
          style={{ left: `${p.x}%`, fontSize: `${p.size}px` }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleBackground;
