import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Maximize2, X, Sparkles, Star, Eye } from 'lucide-react';
import { sounds } from '../utils/audio';

export interface PhotoData {
  id: string;
  url: string;
  title: string;
  badge: string;
  description: string;
  likes: number;
}

const PAVAN_PHOTOS: PhotoData[] = [
  {
    id: 'photo-1',
    url: '/photos/IMG_8301.jpg',
    title: 'The Legend Stance 👑',
    badge: 'VIP Spotlight',
    description: 'Charismatic, sharp & leading with style. Always bringing top-tier confidence!',
    likes: 128
  },
  {
    id: 'photo-2',
    url: '/photos/IMG_8302.jpg',
    title: 'Vibrant Joy & Good Vibes ✨',
    badge: 'Pure Energy',
    description: 'Unfiltered happiness, great conversations, and creating unforgettable memories.',
    likes: 154
  }
];

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoData[]>(PAVAN_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();

    setLikedMap(prev => {
      const isAlreadyLiked = prev[id];
      const newStatus = !isAlreadyLiked;

      setPhotos(currentPhotos =>
        currentPhotos.map(p => {
          if (p.id === id) {
            return { ...p, likes: newStatus ? p.likes + 1 : p.likes - 1 };
          }
          return p;
        })
      );

      return { ...prev, [id]: newStatus };
    });
  };

  const openLightbox = (photo: PhotoData) => {
    sounds.playClick();
    setSelectedPhoto(photo);
  };

  return (
    <section id="photos" className="relative z-10 py-12 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Star className="w-3.5 h-3.5 text-cyan-400" />
          <span>PAVAN&apos;S PHOTO SPOTLIGHT</span>
          <Star className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
          MEMORIES & <span className="text-gradient-cyan">MOMENTS 📸</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto font-light">
          Tap any image to view in full resolution or send a heart!
        </p>
      </div>

      {/* Grid of Updated Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {photos.map((photo, index) => {
          const isLiked = likedMap[photo.id];
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => openLightbox(photo)}
              className="group glass-panel rounded-3xl overflow-hidden border border-slate-700/60 shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer hover:border-amber-500/40 transition-all duration-500 flex flex-col"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{photo.badge}</span>
                </div>

                {/* Hover Expand Icon Indicator */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Overlay Info on Card */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-light line-clamp-2 mb-4">
                    {photo.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <button
                      onClick={(e) => handleLike(photo.id, e)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-white text-white animate-pulse' : 'text-rose-400'}`} />
                      <span>{photo.likes} Likes</span>
                    </button>

                    <span className="text-xs text-amber-400/90 font-medium flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> View Full Image
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 p-4 sm:p-8 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] glass-panel rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_80px_rgba(245,158,11,0.3)] flex flex-col cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 text-white hover:text-slate-950 transition-all cursor-pointer border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto max-h-[85vh]">
                <div className="w-full bg-black/60 flex items-center justify-center p-2">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    className="max-h-[65vh] w-auto object-contain rounded-xl select-none"
                  />
                </div>

                <div className="p-6 sm:p-8 text-left bg-slate-900/90">
                  <div className="inline-block px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
                    {selectedPhoto.badge}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-heading">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-4">
                    {selectedPhoto.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
                    <button
                      onClick={(e) => handleLike(selectedPhoto.id, e)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                        likedMap[selectedPhoto.id]
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedMap[selectedPhoto.id] ? 'fill-white text-white' : 'text-rose-400'
                        }`}
                      />
                      <span>{selectedPhoto.likes} Hearts for Pavan</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
