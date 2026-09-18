import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';

export interface PhotoItem {
  url: string;
  title: string;
  caption: string;
}

interface Props {
  photos: PhotoItem[];
  name: string;
}

const FinalReveal: React.FC<Props> = ({ photos, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; size: number }[]>([]);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 100
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    // Initial celebration
    triggerConfetti();

    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({
        particleCount: 25,
        spread: 360,
        startVelocity: 25,
        origin: { x: Math.random(), y: Math.random() * 0.4 }
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Floating background hearts
  useEffect(() => {
    const createHeart = () => {
      setHearts(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 96 + 2,
          duration: 12 + Math.random() * 10,
          size: 16 + Math.random() * 18,
        }
      ].slice(-20));
    };
    const interval = setInterval(createHeart, 1500);
    return () => clearInterval(interval);
  }, []);

  // Auto slide photos every 6 seconds
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % photos.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [photos.length]);

  const handleManualNav = (newIndex: number) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + photos.length) % photos.length;
    handleManualNav(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % photos.length;
    handleManualNav(nextIdx);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 md:px-8 text-center relative overflow-hidden bg-gradient-to-b from-gray-950 via-purple-950 to-slate-950 text-white selection:bg-pink-500 selection:text-white">
      {/* Floating Hearts background layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '105vh', opacity: 0, scale: 0.5 }}
            animate={{ y: '-10vh', opacity: [0, 0.4, 0.7, 0], scale: [0.5, 1, 1.2, 0.8] }}
            transition={{ duration: heart.duration, ease: "linear" }}
            className="absolute text-pink-400 select-none drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]"
            style={{ left: `${heart.left}%`, fontSize: `${heart.size}px` }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Sparkles / Stardust textured overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-3xl max-h-3xl bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Birthday Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 mt-2 mb-6 md:mb-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-300 text-sm font-medium mb-3 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Special Birthday Celebration</span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 drop-shadow-[0_0_35px_rgba(244,114,182,0.6)] leading-tight">
          HAPPY BIRTHDAY<br />
          <span className="text-pink-400 drop-shadow-[0_0_25px_rgba(244,114,182,0.8)]">{name.toUpperCase()}</span> 🎂❤️
        </h1>
      </motion.div>

      {/* Main Interactive Photo Showcase */}
      <div className="relative z-10 w-full max-w-xl mx-auto mb-8 flex flex-col items-center">
        {/* Frame container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full aspect-[3/4] max-h-[560px] rounded-3xl overflow-hidden border-2 border-white/25 shadow-[0_10px_50px_rgba(236,72,153,0.35)] bg-black/40 backdrop-blur-sm group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.url}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className="w-full h-full object-cover select-none"
              />

              {/* Subtle gradient overlay for captions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Caption details */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-0 inset-x-0 p-6 text-left"
              >
                <div className="inline-block px-3 py-1 rounded-md bg-pink-500/80 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2 text-white">
                  {currentPhoto.title}
                </div>
                <p className="text-gray-200 text-sm md:text-base font-light drop-shadow-md">
                  {currentPhoto.caption}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Previous / Next Arrow Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-pink-600/80 text-white backdrop-blur-md transition-all duration-200 border border-white/20 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-pink-600/80 text-white backdrop-blur-md transition-all duration-200 border border-white/20 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo Counter Pill */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-pink-200">
            {currentIndex + 1} / {photos.length}
          </div>
        </motion.div>

        {/* 3 Clickable Thumbnails Row */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {photos.map((photo, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={photo.url}
                onClick={() => handleManualNav(idx)}
                className={`group relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${isActive
                    ? 'ring-2 ring-pink-400 scale-105 shadow-[0_0_15px_rgba(244,114,182,0.6)]'
                    : 'opacity-60 hover:opacity-100 ring-1 ring-white/20'
                  }`}
                style={{ width: '70px', height: '85px' }}
                aria-label={`View photo ${idx + 1}`}
              >
                <img
                  src={photo.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-pink-500/20 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Birthday Friendship Message Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="relative z-10 max-w-2xl w-full mx-auto"
      >
        <div className="backdrop-blur-xl bg-white/[0.07] p-8 md:p-10 rounded-3xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.4)] text-left relative overflow-hidden">
          <div className="flex items-center gap-2 text-pink-400 font-semibold text-lg md:text-xl mb-5">
            <Heart className="w-5 h-5 fill-pink-400" />
            <span>Happy Birthday, Rishitha! 🎂❤️✨</span>
          </div>

          <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light mb-4">
            Wishing you a very happy birthday and a wonderful year ahead! May this new year of your life bring you lots of happiness, success, peace, and countless beautiful moments. Keep smiling, keep enjoying the little things, and always stay the amazing person you are.
          </p>

          <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light mb-4">
            I hope you get everything you wish for and that every day ahead gives you another reason to smile. May your dreams turn into reality, your hard work bring you success, and your life always be surrounded by good people and good vibes.
          </p>

          <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light mb-5">
            Have a beautiful birthday and an even more beautiful year ahead! 🥳🎉✨
          </p>

          <p className="text-pink-300 font-medium text-base md:text-lg mb-6">
            Once again, Happy Birthday! ❤️
          </p>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm font-medium text-pink-300/80">
              Cheers to great memories & many more ahead 🥂✨
            </span>

            {/* Interactive Confetti Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                triggerConfetti();
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm shadow-md hover:from-pink-600 hover:to-rose-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Celebrate Again! 🎉</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinalReveal;
