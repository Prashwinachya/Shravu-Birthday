import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Equalizer Spectrum Bars (Only visible when playing) */}
      {isPlaying && (
        <div className="hidden sm:flex items-end gap-1 px-3 py-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-500/30">
          <motion.div animate={{ height: [6, 18, 10, 22, 6] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-amber-400 rounded-full" />
          <motion.div animate={{ height: [14, 8, 20, 10, 14] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-amber-300 rounded-full" />
          <motion.div animate={{ height: [8, 22, 12, 18, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-yellow-400 rounded-full" />
        </div>
      )}

      {/* Main Play / Pause Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="px-4 py-2.5 rounded-full flex items-center gap-2.5 text-amber-300 hover:text-amber-200 border border-amber-500/40 bg-slate-900/85 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-amber-400' : 'text-slate-400'}`} />
        <span className="text-xs font-bold tracking-wider uppercase hidden xs:inline">
          {isPlaying ? 'PARTY BGM' : 'PLAY BGM'}
        </span>
        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center ml-1">
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-amber-300 ml-0.5" />}
        </div>
      </motion.button>

      {/* Mute / Unmute Button */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="p-2.5 rounded-full bg-slate-900/85 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
        </button>
      )}
    </div>
  );
};

export default MusicPlayer;
