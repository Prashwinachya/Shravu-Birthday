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
    name: 'With Endless Admiration 🌸',
    message: 'Happy Birthday Dr. Shravya! Your compassion, intellect, and grace inspire everyone fortunate enough to know you. May your path ahead be radiant!',
    time: 'Just now',
    emoji: '✨'
  },
  {
    id: 'w-2',
    name: 'Friends & Well-Wishers 💫',
    message: 'Wishing you a magnificent birthday Dr. Shravya! May you achieve every goal in medicine, travel to places that inspire you, and smile every single day!',
    time: '10m ago',
    emoji: '🌸'
  },
  {
    id: 'w-3',
    name: 'Healing & Light 🕊️',
    message: 'Happy Birthday! The care and kindness you bring to the world comes back to you multiplied a hundredfold in health, joy, and peace.',
    time: '25m ago',
    emoji: '🌷'
  }
];

const INSPIRING_BLESSINGS = [
  '🌸 "May your year be as gentle as your heart, as bright as your mind, and as beautiful as your soul."',
  '✨ "To Dr. Shravya: May you heal countless lives while finding time to nourish your own joy and dreams."',
  '💫 "Here’s to another chapter of quiet triumphs, laughter with loved ones, and inner peace."',
  '🌷 "May every door you knock on open with golden opportunities and every step bring you closer to your deepest aspirations."',
  '🕊️ "Happy Birthday Dr. Shravya! May this special year grant you clarity, happiness, and unforgettable adventures."'
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
          <span>FROM THE HEART</span>
          <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/60" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-serif-luxury">
          A Birthday Letter for <span className="text-gradient-rose-gold">Dr. Shravya Acharya 💌</span>
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
          <span>Dear Dr. Shravya,</span>
        </div>

        <p className="text-rose-100/90 text-base sm:text-lg leading-relaxed font-light mb-5 font-sans">
          On this very special day, I want to take a moment to celebrate everything that makes you who you are.
          Your dedication, your quiet strength, your gentle empathy, and the sincere warmth you bring to the people around you are rare and truly beautiful gifts.
        </p>

        <p className="text-rose-100/90 text-base sm:text-lg leading-relaxed font-light mb-5 font-sans">
          The path you have chosen in medicine is a reflection of your generous spirit and your passion for making a meaningful difference in the world. Even on the busiest and most challenging days, your kindness and steady grace stand out as an inspiration.
        </p>

        <p className="text-rose-100/90 text-base sm:text-lg leading-relaxed font-light mb-5 font-sans">
          As you step into this brand new chapter of your life, I wish you boundless happiness, peace of mind, fulfilling achievements, and time to enjoy every little joy that life offers. May your heart always remain as bright and compassionate as it is today.
        </p>

        <p className="text-rose-200 text-base sm:text-lg leading-relaxed font-medium mb-3 font-serif-luxury italic">
          Happy Birthday, Shravu Akka! Wishing you a day as wonderfully special, peaceful, and radiant as you are. ✨🌸🎂
        </p>
        <p className="text-amber-200 text-sm font-serif-luxury italic mb-8">
          — With all the best wishes, Prashwin ✨
        </p>

        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-rose-200 text-sm font-serif-luxury italic">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Celebrating you, today & always</span>
          </div>

          {/* Random Toast Generator Button */}
          <button
            onClick={nextToast}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-rose-200 text-xs sm:text-sm font-medium border border-rose-200/25 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-200" />
            <span>New Birthday Blessing 🌸</span>
          </button>
        </div>

        {/* Display Random Toast */}
        <div className="mt-5 p-4 rounded-2xl bg-[#0b0813]/60 border border-rose-200/20 text-rose-200 text-sm font-light italic leading-relaxed">
          {INSPIRING_BLESSINGS[toastIndex]}
        </div>
      </motion.div>

      {/* Interactive Wish Board Grid */}
      <div id="wishes" className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Wish Input Form */}
        <div className="glass-pearl p-6 sm:p-8 rounded-3xl border border-white/15 lg:col-span-1 h-fit">
          <div className="flex items-center gap-2 text-rose-200 font-semibold text-lg mb-4 font-serif-luxury">
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300/60" />
            <span>Leave a Birthday Blessing</span>
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
                placeholder="e.g. Well-wisher / Friend"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b0813]/80 border border-white/15 text-white placeholder-rose-200/40 focus:outline-none focus:border-rose-300 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-rose-200/70 uppercase tracking-wider mb-1">
                Your Message for Dr. Shravya
              </label>
              <textarea
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                rows={4}
                placeholder="Write your heartfelt birthday wishes..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0b0813]/80 border border-white/15 text-white placeholder-rose-200/40 focus:outline-none focus:border-rose-300 text-sm resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200 text-[#1f0b18] font-semibold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Post Birthday Blessing 💌</span>
            </button>

            {postedSuccess && (
              <p className="text-xs text-rose-200 text-center font-medium animate-bounce mt-2">
                ✨ Your message has been added to Dr. Shravya&apos;s wall!
              </p>
            )}
          </form>
        </div>

        {/* Live Wishes Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-200/70">
              Blessings & Messages ({wishes.length})
            </span>
            <span className="text-xs text-rose-200/80 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" /> Wall of Love & Respect
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

