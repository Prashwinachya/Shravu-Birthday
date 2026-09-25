import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface Balloon {
  id: number;
  x: number;
  speed: number;
  color: string;
  size: number;
  points: number;
}

const BALLOON_COLORS = [
  'bg-amber-500 shadow-amber-500/50',
  'bg-cyan-500 shadow-cyan-500/50',
  'bg-purple-500 shadow-purple-500/50',
  'bg-rose-500 shadow-rose-500/50',
  'bg-emerald-500 shadow-emerald-500/50'
];

const BalloonGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  // Start mini-game
  const startGame = () => {
    sounds.playFanfare();
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(20);
    setBalloons([]);
  };

  // Timer countdown loop
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          sounds.playFanfare();
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setIsPlaying(false);
          setHighScore((currentHigh) => Math.max(currentHigh, score));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, score]);

  // Spawn balloons loop
  useEffect(() => {
    if (!isPlaying) return;

    const spawner = setInterval(() => {
      setBalloons((prev) => {
        if (prev.length > 12) return prev;
        const newBalloon: Balloon = {
          id: Date.now() + Math.random(),
          x: Math.random() * 85 + 5,
          speed: 3 + Math.random() * 4,
          color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          size: 45 + Math.random() * 25,
          points: 10
        };
        return [...prev, newBalloon].slice(-15);
      });
    }, 700);

    return () => clearInterval(spawner);
  }, [isPlaying]);

  // Pop a balloon
  const popBalloon = (id: number, points: number) => {
    sounds.playPop();
    setScore((prev) => prev + points);
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <section id="game" className="relative z-10 py-12 px-4 max-w-4xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span>PAVAN&apos;S BIRTHDAY ARCADE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            BALLOON POP <span className="text-gradient-cyan">CHALLENGE 🎈</span>
          </h2>
          <p className="text-slate-300 text-sm mt-1 font-light">
            Pop as many party balloons as you can before the time runs out!
          </p>
        </div>

        {/* Game Stats Bar */}
        <div className="flex items-center justify-around bg-slate-900/80 p-4 rounded-2xl border border-slate-700/60 mb-6 max-w-md mx-auto">
          <div className="text-center">
            <span className="text-xs text-slate-400 uppercase font-semibold">Time</span>
            <p className={`text-2xl font-extrabold ${timeLeft <= 5 && isPlaying ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`}>
              {timeLeft}s
            </p>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="text-center">
            <span className="text-xs text-slate-400 uppercase font-semibold">Score</span>
            <p className="text-2xl font-extrabold text-amber-400">{score}</p>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="text-center">
            <span className="text-xs text-slate-400 uppercase font-semibold">High Score</span>
            <p className="text-2xl font-extrabold text-purple-400">{highScore}</p>
          </div>
        </div>

        {/* Game Screen Canvas Box */}
        <div className="relative w-full h-[360px] bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex flex-col items-center justify-center">
          {!isPlaying && (
            <div className="text-center p-6 z-20">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-2">
                {score > 0 ? `Final Score: ${score} Points! 🎉` : 'Ready to Pop Balloons?'}
              </h3>
              <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
                {score > 0
                  ? 'Great score! Can you beat your high score?'
                  : 'Tap the start button to begin the 20-second party popping spree!'}
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-extrabold text-base rounded-2xl shadow-lg hover:from-cyan-400 transition-all cursor-pointer flex items-center gap-2 mx-auto"
              >
                {score > 0 ? <RotateCcw className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                <span>{score > 0 ? 'PLAY AGAIN 🔄' : 'START GAME 🎈'}</span>
              </button>
            </div>
          )}

          {/* Floating Balloons during gameplay */}
          {isPlaying && (
            <AnimatePresence>
              {balloons.map((b) => (
                <motion.button
                  key={b.id}
                  initial={{ y: '360px', opacity: 1, scale: 0.8 }}
                  animate={{ y: '-60px' }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: b.speed, ease: 'linear' }}
                  onClick={() => popBalloon(b.id, b.points)}
                  className={`absolute rounded-full shadow-lg ${b.color} cursor-pointer flex items-center justify-center text-white text-xs font-bold transition-transform active:scale-125 select-none`}
                  style={{
                    left: `${b.x}%`,
                    width: `${b.size}px`,
                    height: `${b.size * 1.25}px`,
                    borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%'
                  }}
                >
                  🎈
                </motion.button>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

export default BalloonGame;
