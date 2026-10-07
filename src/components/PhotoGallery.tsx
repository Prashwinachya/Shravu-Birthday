import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Maximize2, X, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { sounds } from '../utils/audio';

export interface PhotoData {
  id: string;
  url: string;
  title: string;
  badge: string;
  description: string;
  likes: number;
}

const SHRAVYA_PHOTOS: PhotoData[] = [
  {
    id: 'photo-1',
    url: '/photos/IMG_8770.jpg',
    title: 'Radiant Elegance ✨',
    badge: 'Portrait of Grace',
    description: 'Capturing your warmth, kind presence, and the effortless brilliance you carry wherever you go.',
    likes: 142
  },
  {
    id: 'photo-2',
    url: '/photos/IMG_8783.png',
    title: 'Joy & Serenity 🌸',
    badge: 'Timeless Moments',
    description: 'Moments of genuine happiness, peaceful smiles, and cherished memories that illuminate every room.',
    likes: 168
  },
  {
    id: 'photo-3',
    url: '/photos/IMG_8784.png',
    title: 'Poise & Charm 💫',
    badge: 'Golden Radiance',
    description: 'Exuding confidence, quiet strength, and an inspiring dedication to your noble journey in medicine.',
    likes: 155
  },
  {
    id: 'photo-4',
    url: '/photos/d522d4fd-693f-4d67-a99a-78839a244129.JPG',
    title: 'Cherished Memories 🌟',
    badge: 'Beautiful Journey',
    description: 'Every chapter holds stories of growth, kindness, and unforgettable milestones made richer by you.',
    likes: 173
  }
];

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoData[]>(SHRAVYA_PHOTOS);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
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

  const openLightbox = (index: number) => {
    sounds.playClick();
    setSelectedPhotoIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
  };

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <section id="photos" className="relative z-10 py-14 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-rose-200/25 text-rose-200 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>PORTRAIT GALLERY & MOMENTS</span>
          <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/60" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-serif-luxury">
          Memories & <span className="text-gradient-rose-gold">Moments 📸🌸</span>
        </h2>
        <p className="text-rose-100/70 text-sm sm:text-base mt-2 max-w-lg mx-auto font-light">
          A collection celebrating your wonderful spirit. Tap any memory to view in high resolution or leave a heart!
        </p>
      </div>

      {/* Grid of 4 Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {photos.map((photo, index) => {
          const isLiked = likedMap[photo.id];
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => openLightbox(index)}
              className="group glass-pearl rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_45px_rgba(0,0,0,0.5)] cursor-pointer hover:border-rose-300/40 transition-all duration-500 flex flex-col"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#150f24]">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                  loading="lazy"
                />

                {/* Soft ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0813] via-[#0b0813]/30 to-transparent opacity-85 group-hover:opacity-65 transition-opacity duration-300" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0b0813]/75 backdrop-blur-md border border-rose-200/25 text-rose-200 text-xs font-medium flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3 text-amber-200" />
                  <span>{photo.badge}</span>
                </div>

                {/* Expand Icon Indicator */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-[#0b0813]/70 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Card Info */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 font-serif-luxury group-hover:text-rose-200 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-rose-100/80 text-xs sm:text-sm font-light line-clamp-2 mb-4 leading-relaxed">
                    {photo.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <button
                      onClick={(e) => handleLike(photo.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                          : 'bg-white/10 hover:bg-white/15 text-rose-100 border border-white/10'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white text-white animate-pulse' : 'text-rose-300'}`} />
                      <span>{photo.likes} Hearts</span>
                    </button>

                    <span className="text-xs text-rose-200/80 font-medium flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> View Photo
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
        {selectedPhoto && selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 p-4 sm:p-6 bg-[#0b0813]/95 backdrop-blur-3xl flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[92vh] glass-pearl rounded-3xl overflow-hidden border border-rose-200/25 shadow-[0_0_80px_rgba(244,114,182,0.2)] flex flex-col cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#0b0813]/80 hover:bg-rose-500 text-white transition-all cursor-pointer border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#0b0813]/70 hover:bg-rose-500 text-white backdrop-blur-md transition-all border border-white/20 shadow-lg cursor-pointer hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#0b0813]/70 hover:bg-rose-500 text-white backdrop-blur-md transition-all border border-white/20 shadow-lg cursor-pointer hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto max-h-[85vh]">
                <div className="w-full bg-black/40 flex items-center justify-center p-2 min-h-[350px]">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    className="max-h-[60vh] w-auto object-contain rounded-xl select-none"
                  />
                </div>

                <div className="p-6 sm:p-8 text-left bg-[#0f0b18]/90">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/20 text-rose-200 text-xs font-semibold uppercase tracking-wider">
                      {selectedPhoto.badge}
                    </span>
                    <span className="text-xs text-rose-200/60">
                      {selectedPhotoIndex + 1} of {photos.length}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-serif-luxury">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-rose-100/80 text-sm sm:text-base font-light leading-relaxed mb-6">
                    {selectedPhoto.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      onClick={(e) => handleLike(selectedPhoto.id, e)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                        likedMap[selectedPhoto.id]
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                          : 'bg-white/10 hover:bg-white/15 text-rose-100 border border-white/15'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedMap[selectedPhoto.id] ? 'fill-white text-white' : 'text-rose-300'
                        }`}
                      />
                      <span>{selectedPhoto.likes} Hearts for Dr. Shravya</span>
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

