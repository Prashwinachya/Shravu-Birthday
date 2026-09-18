import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const createHeart = () => {
      setHearts(prev => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: 10 + Math.random() * 10,
          size: 10 + Math.random() * 20,
        }
      ].slice(-20));
    };

    const interval = setInterval(createHeart, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, scale: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.6, 0], scale: 1 }}
          transition={{ duration: heart.duration, ease: "linear" }}
          className="absolute text-pink-400"
          style={{ left: `${heart.left}%`, fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
      
      {/* Subtle sparkles in background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen" />
    </div>
  );
};

export default FloatingHearts;
