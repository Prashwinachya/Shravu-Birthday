import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onNext: () => void;
}

const IntroScreen: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass-card p-12 rounded-3xl max-w-2xl w-full border border-white/40 shadow-2xl backdrop-blur-xl"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-12 text-gray-800 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Are you ready for the surprise? 👀✨
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(236, 72, 153, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all cursor-pointer"
        >
          YES, SHOW ME ❤️
        </motion.button>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
