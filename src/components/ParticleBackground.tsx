import React, { useMemo } from 'react';

interface Props {
  theme?: string;
}

const SYMBOLS = ['✨', '🌸', '💫', '✦', '🌷', '✧', '🤍'];

const ParticleBackground: React.FC<Props> = ({ theme = 'rose' }) => {
  // Pre-generate a modest, high-performance set of 14 floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7 + 4) % 94 + 2}%`,
      size: `${12 + (i % 4) * 3}px`,
      duration: `${14 + (i % 5) * 3}s`,
      delay: `${-(i * 2.2)}s`,
      symbol: SYMBOLS[i % SYMBOLS.length],
      opacity: 0.35 + (i % 3) * 0.15
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" style={{ contain: 'strict' }}>
      {/* Base Theme Mesh Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          theme === 'lavender'
            ? 'bg-gradient-to-b from-[#0d0a1a] via-[#1b122c] to-[#090711]'
            : theme === 'champagne'
            ? 'bg-gradient-to-b from-[#120e09] via-[#221812] to-[#0b0807]'
            : 'bg-gradient-to-b from-[#110a15] via-[#1d1022] to-[#0b0813]'
        }`}
      />

      {/* GPU-efficient Radial Glows (native gradient, zero blur recalculations) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            theme === 'lavender'
              ? 'radial-gradient(circle 600px at 50% 10%, rgba(192, 132, 252, 0.12), transparent 70%), radial-gradient(circle 450px at 85% 75%, rgba(244, 114, 182, 0.08), transparent 70%)'
              : theme === 'champagne'
              ? 'radial-gradient(circle 600px at 50% 10%, rgba(251, 191, 36, 0.12), transparent 70%), radial-gradient(circle 450px at 85% 75%, rgba(245, 158, 11, 0.08), transparent 70%)'
              : 'radial-gradient(circle 600px at 50% 10%, rgba(244, 114, 182, 0.13), transparent 70%), radial-gradient(circle 450px at 85% 75%, rgba(192, 132, 252, 0.08), transparent 70%), radial-gradient(circle 400px at 15% 45%, rgba(251, 113, 133, 0.06), transparent 70%)'
        }}
      />

      {/* High-Performance GPU CSS Animated Floating Particles */}
      <style>{`
        @keyframes floatUpGPU {
          0% {
            transform: translate3d(0, 105vh, 0) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: var(--p-op, 0.5);
            transform: translate3d(8px, 85vh, 0) rotate(25deg) scale(1);
          }
          85% {
            opacity: var(--p-op, 0.5);
            transform: translate3d(-10px, 15vh, 0) rotate(140deg) scale(1.05);
          }
          100% {
            transform: translate3d(0, -10vh, 0) rotate(180deg) scale(0.6);
            opacity: 0;
          }
        }
        .gpu-particle {
          will-change: transform, opacity;
          animation: floatUpGPU linear infinite;
        }
      `}</style>

      {particles.map((p) => (
        <span
          key={p.id}
          className="gpu-particle absolute select-none text-rose-200/70"
          style={
            {
              left: p.left,
              fontSize: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              '--p-op': p.opacity
            } as React.CSSProperties
          }
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};

export default ParticleBackground;
