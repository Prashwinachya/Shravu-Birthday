import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music/bgm.wav');
    audio.loop = true;
    audioRef.current = audio;

    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Audio playback was prevented by browser policy:", err);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="glass-card px-4 py-2.5 rounded-full flex items-center gap-2 text-pink-400 hover:text-pink-300 border border-pink-500/30 bg-black/40 backdrop-blur-md shadow-lg transition-all cursor-pointer"
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-pink-400' : 'text-gray-400'}`} />
        <span className="text-xs font-semibold tracking-wide uppercase">
          {isPlaying ? 'Music ON' : 'Music OFF'}
        </span>
        <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center ml-1">
          {isPlaying ? <Pause className="w-3 h-3 text-pink-300" /> : <Play className="w-3 h-3 text-pink-300 ml-0.5" />}
        </div>
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
