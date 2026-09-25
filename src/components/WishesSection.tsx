import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MessageSquare, Send, Quote, RefreshCw } from 'lucide-react';
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
    name: 'Brotherhood Squad 👑',
    message: 'Happy Birthday Pavan! May this year bring you immense success, luxury, joy, and healthy moments. Keep shining brother!',
    time: 'Just now',
    emoji: '🔥'
  },
  {
    id: 'w-2',
    name: 'Foodie & Chill Crew 🍔',
    message: 'Wishing you a fantastic birthday Pavan! Unlimited good food, great trips, and epic memories ahead!',
    time: '5m ago',
    emoji: '🥳'
  },
  {
    id: 'w-3',
    name: 'Future Millionaire Club 🚀',
    message: 'Happy Birthday Boss Pavan! Keep grinding, keep achieving every single goal on your vision board!',
    time: '12m ago',
    emoji: '👑'
  }
];

const RANDOM_TOASTS = [
  '🥂 To Pavan: The guy who turns ordinary days into legendary memories!',
  '🚀 May your next 365 days be filled with big wins, zero stress, and high-value happiness!',
  '⚡ To Pavan: Unlimited health, unstoppable wealth, and endless happiness!',
  '👑 Happy Birthday Pavan! Keep inspiring everyone around you with your energy and smile!',
  '🍔 Here’s to more midnight snacks, epic road trips, and endless laughter with Pavan!'
];

const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>(INITIAL_WISHES);
  const [toastIndex, setToastIndex] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [postedSuccess, setPostedSuccess] = useState(false);

  const nextToast = () => {
    sounds.playClick();
    setToastIndex((prev) => (prev + 1) % RANDOM_TOASTS.length);
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
      emoji: ['👑', '⭐', '🔥', '🎉', '💎'][Math.floor(Math.random() * 5)]
    };

    setWishes([newEntry, ...wishes]);
    setAuthorName('');
    setUserMsg('');
    setPostedSuccess(true);
    setTimeout(() => setPostedSuccess(false), 4000);
  };

  return (
    <section id="wishes" className="relative z-10 py-12 px-4 max-w-5xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
          <span>CELEBRATION TOASTS & MESSAGES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
          SPECIAL WISHES FOR <span className="text-gradient-gold">PAVAN 📜❤️</span>
        </h2>
      </div>

      {/* Main Golden Birthday Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel-gold p-8 sm:p-12 rounded-3xl mb-12 relative overflow-hidden border border-amber-500/30 text-left"
      >
        <div className="flex items-center gap-3 text-amber-400 font-bold text-xl sm:text-2xl mb-6">
          <Quote className="w-8 h-8 text-amber-400 opacity-80" />
          <span>Dear Pavan, Happy Birthday! 🎂👑</span>
        </div>

        <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light mb-4">
          Wishing you a very Happy Birthday and an incredible year ahead! May this brand new chapter of your life be filled with prosperity, good health, peace of mind, and continuous growth. Keep chasing your ambitions with the same passion and confidence that defines you.
        </p>

        <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light mb-4">
          May your days be packed with genuine happiness, your hard work lead to giant victories, and your journey always be surrounded by true friends and uplifting energy.
        </p>

        <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light mb-6">
          Enjoy your special day to the absolute fullest! Have a magnificent birthday and an even better year ahead! 🥳🎉✨
        </p>

        <div className="pt-6 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
          <span className="text-amber-300 font-semibold text-sm sm:text-base">
            Cheers to great times & many more milestones together! 🥂✨
          </span>

          {/* Random Toast Generator Button */}
          <button
            onClick={nextToast}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold border border-amber-500/40 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Birthday Toast 🥂</span>
          </button>
        </div>

        {/* Display Random Toast */}
        <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-amber-500/20 text-amber-200 text-sm italic">
          {RANDOM_TOASTS[toastIndex]}
        </div>
      </motion.div>

      {/* Interactive Wish Board Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wish Input Form */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/60 lg:col-span-1 h-fit">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-4">
            <MessageSquare className="w-5 h-5" />
            <span>Leave a Birthday Wish</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Alex / College Buddy"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Your Birthday Wish for Pavan
              </label>
              <textarea
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                rows={4}
                placeholder="Write your personal birthday note for Pavan..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 text-white font-bold text-sm shadow-md hover:from-purple-500 hover:to-amber-400 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Post Birthday Note 💌</span>
            </button>

            {postedSuccess && (
              <p className="text-xs text-emerald-400 text-center font-medium animate-bounce mt-2">
                ✅ Your wish has been posted to Pavan&apos;s wall!
              </p>
            )}
          </form>
        </div>

        {/* Live Wishes Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Live Wall Messages ({wishes.length})
            </span>
            <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Pavan&apos;s Wall of Love
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
                  className="glass-panel p-5 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{w.emoji}</span>
                      <span className="font-bold text-white text-sm">{w.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">{w.time}</span>
                  </div>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
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
