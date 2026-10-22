import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send, Quote, RefreshCw, Feather } from 'lucide-react';
import { sounds } from '../utils/audio';

interface WishMessage {
  id: string;
  name: string;
  message: string;
  time: string;
  emoji: string;
}

const INITIAL_WISHES: WishMessage[] = [
  {
    id: 'w-1',
    name: 'Prashwin',
    message: 'Happy Birthday Shravu Akka! Always proud to see you doing so well as a doctor. Have a great day!',
    time: 'Just now',
    emoji: '🎂'
  },
  {
    id: 'w-2',
    name: 'Friends & Family',
    message: 'Wishing you a very happy birthday, Dr. Shravya! Hope you have a wonderful year full of happiness and success.',
    time: '10m ago',
    emoji: '🎉'
  },
  {
    id: 'w-3',
    name: 'Well-Wishers',
    message: 'Happy Birthday! Wishing you good health, peace of mind, and success in everything you do.',
    time: '25m ago',
    emoji: '⭐'
  }
];

const INSPIRING_BLESSINGS = [
  '"Wishing you peaceful shifts, good rest, and plenty of time to recharge."',
  '"To Dr. Shravya: Proud of the doctor you are and the wonderful person you\'ve always been."',
  '"Here’s to another year of good health, happy family moments, and well-earned success."',
  '"May this year bring you all the success you work so hard for, along with lots of peace of mind."',
  '"Happy Birthday, Shravu Akka! Wishing you all the happiness and warmth you give to everyone around you."'
];

const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>(INITIAL_WISHES);
  const [toastIndex, setToastIndex] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [postedSuccess, setPostedSuccess] = useState(false);

  const nextToast = () => {
    sounds.playClick();
    setToastIndex((prev) => (prev + 1) % INSPIRING_BLESSINGS.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !userMsg.trim()) return;

    sounds.playFanfare();
    const newEntry: WishMessage = {
      id: `w-${Date.now()}`,
      name: authorName.trim(),
      message: userMsg.trim(),
      time: 'Just now',
      emoji: ['🌸', '✨', '💫', '🌷', '🤍'][Math.floor(Math.random() * 5)]
    };

    setWishes([newEntry, ...wishes]);
    setAuthorName('');
    setUserMsg('');
    setPostedSuccess(true);
    setTimeout(() => setPostedSuccess(false), 4000);
  };

  return (
    <section id="letter" className="relative z-10 py-14 px-4 max-w-5xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-rose-200/25 text-rose-200 text-xs font-semibold uppercase tracking-wider mb-3">
          <Feather className="w-3.5 h-3.5 text-amber-200" />
          <span>A NOTE FOR YOU</span>
          <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/60" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-serif-luxury">
          A Birthday Note for <span className="text-gradient-rose-gold">Shravu Akka</span>
        </h2>
      </div>

      {/* Main Luxury Birthday Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-champagne p-8 sm:p-14 rounded-3xl mb-14 relative overflow-hidden border border-rose-200/30 text-left shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center gap-3 text-rose-200 font-bold text-xl sm:text-2xl mb-8 font-serif-luxury">
          <Quote className="w-8 h-8 text-amber-200 opacity-90" />
          <span>Dear Shravu Akka,</span>
        </div>

        <p className="text-rose-100/90 text-base sm:text-lg leading-relaxed font-light mb-5 font-sans">
          You might be Eeva&apos;s sister, but over the years, you&apos;ve always felt like my own sister. I&apos;ve always had so much respect for how down-to-earth, kind, and welcoming you are with everyone around you.
        </p>

        <p className="text-rose-100/90 text-base sm:text-lg leading-relaxed font-light mb-5 font-sans">
          Seeing you work so hard on your journey as a doctor is something we all look up to. Between the endless studying, long shifts, and everything medicine demands, you handle it with so much patience and genuine care for people. You make all of us really proud.
        </p>

        <p className="text-rose-100/90 text-base sm:text-lg leading-relaxed font-light mb-5 font-sans">
          On your birthday, I hope you get time to slow down, take a breather, and celebrate how far you&apos;ve come. Wishing you good health, genuine peace of mind, and all the happiness in the world in the year ahead.
        </p>

        <p className="text-rose-200 text-base sm:text-lg leading-relaxed font-medium mb-3 font-serif-luxury">
          Happy Birthday, Shravu Akka! Hope you have a wonderful day ahead.
        </p>
        <p className="text-amber-200 text-sm font-serif-luxury mb-8">
          — Prashwin
        </p>

        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-rose-200 text-sm font-serif-luxury">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Always wishing the best for you</span>
          </div>

          {/* Random Toast Generator Button */}
          <button
            onClick={nextToast}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-rose-200 text-xs sm:text-sm font-medium border border-rose-200/25 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-200" />
            <span>Show another wish</span>
          </button>
        </div>

        {/* Display Random Toast */}
        <div className="mt-5 p-4 rounded-2xl bg-[#0b0813]/60 border border-rose-200/20 text-rose-200 text-sm font-light leading-relaxed">
          {INSPIRING_BLESSINGS[toastIndex]}
        </div>
      </motion.div>

      {/* Interactive Wish Board Grid */}
      <div id="wishes" className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Wish Input Form */}
        <div className="glass-pearl p-6 sm:p-8 rounded-3xl border border-white/15 lg:col-span-1 h-fit">
          <div className="flex items-center gap-2 text-rose-200 font-semibold text-lg mb-4 font-serif-luxury">
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300/60" />
            <span>Leave a Birthday Message</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-rose-200/70 uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Prashwin / Friend"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b0813]/80 border border-white/15 text-white placeholder-rose-200/40 focus:outline-none focus:border-rose-300 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-rose-200/70 uppercase tracking-wider mb-1">
                Your Message for Shravu Akka
              </label>
              <textarea
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                rows={4}
                placeholder="Write a birthday wish..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b0813]/80 border border-white/15 text-white placeholder-rose-200/40 focus:outline-none focus:border-rose-300 text-sm resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200 text-[#1f0b18] font-semibold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Post Message</span>
            </button>

            {postedSuccess && (
              <p className="text-xs text-rose-200 text-center font-medium animate-bounce mt-2">
                Your message has been posted!
              </p>
            )}
          </form>
        </div>

        {/* Live Wishes Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-200/70">
              Messages ({wishes.length})
            </span>
            <span className="text-xs text-rose-200/80 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" /> Birthday Wall
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            <AnimatePresence>
              {wishes.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-pearl p-5 rounded-2xl border border-white/15 hover:border-rose-300/30 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{w.emoji}</span>
                      <span className="font-semibold text-white text-sm font-serif-luxury">{w.name}</span>
                    </div>
                    <span className="text-xs text-rose-200/50">{w.time}</span>
                  </div>
                  <p className="text-rose-100/80 text-sm font-light leading-relaxed">
                    {w.message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;

