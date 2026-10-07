import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  xOffset: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
}

const SYMBOLS = ['✨', '🌸', '💫', '✦', '🌷', '✧', '🤍', '✨'];

const createInitialParticles = (): Particle[] => {
  return Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 96 + 2,
    xOffset: Math.random() * 12 - 6,
    size: Math.random() * 14 + 10,
    duration: Math.random() * 12 + 14,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.4 + 0.3,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
  }));
};

interface Props {
  theme?: string;
}

const ParticleBackground: React.FC<Props> = ({ theme = 'rose' }) => {
  const [particles] = useState<Particle[]>(createInitialParticles);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic ambient background mesh depending on theme */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          theme === 'lavender'
            ? 'bg-gradient-to-b from-[#0d0a1a] via-[#1b122c] to-[#090711]'
            : theme === 'champagne'
            ? 'bg-gradient-to-b from-[#120e09] via-[#221812] to-[#0b0807]'
            : 'bg-gradient-to-b from-[#110a15] via-[#1d1022] to-[#0b0813]'
        }`}
      />

      {/* Soft Radial Ambient Glows */}
      <div
        className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-colors duration-1000 ${
          theme === 'lavender'
            ? 'bg-purple-500/10'
            : theme === 'champagne'
            ? 'bg-amber-400/10'
            : 'bg-rose-400/12'
        }`}
      />
      <div className="absolute top-1/3 -left-24 w-[500px] h-[500px] bg-pink-400/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 -right-24 w-[550px] h-[550px] bg-purple-400/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] bg-amber-300/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Animated Petals & Stardust */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '105vh', opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, p.opacity, p.opacity * 0.9, 0],
            scale: [0.5, 1, 1.1, 0.6],
            rotate: [0, 45, 90, 180],
            x: [`${p.x}%`, `${p.x + p.xOffset}%`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
          className="absolute select-none text-rose-200/70 drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]"
          style={{ left: `${p.x}%`, fontSize: `${p.size}px` }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleBackground;

