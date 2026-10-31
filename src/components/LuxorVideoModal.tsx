import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Compass, MapPin, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LuxorVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreTours: () => void;
}

interface Chapter {
  id: string;
  title: string;
  era: string;
  location: string;
  description: string;
  embedId: string;
  videoSrc?: string;
  poster: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'balloons',
    title: 'Sunrise Hot Air Balloon Flight',
    era: 'Daily at Dawn',
    location: 'West Bank & Valley of Kings',
    description: 'Drift 2,000 feet above the Valley of the Kings as the golden Egyptian sunrise illuminates the Nile and ancient limestone cliffs.',
    embedId: '5a2xW3xK8-s',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hot-air-balloon-rising-at-sunrise-42289-large.mp4',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'karnak',
    title: 'Karnak Temple & Hypostyle Hall',
    era: 'c. 2000–100 BCE (Middle & New Kingdoms)',
    location: 'East Bank, Luxor',
    description: 'Walk through 134 towering sandstone columns rising 70 feet into the azure sky—the largest religious complex ever built by human hands.',
    embedId: 'v1p_6kQ6_f0',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-pyramids-of-giza-in-egypt-41712-large.mp4',
    poster: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'hatshepsut',
    title: 'Mortuary Temple of Hatshepsut',
    era: 'c. 1479–1458 BCE (18th Dynasty)',
    location: 'Deir el-Bahari, West Bank',
    description: 'A masterpiece of ancient classical architecture terraced directly into the sheer limestone cliffs of the Theban mountain range.',
    embedId: 'r53R_wMh4oE',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hot-air-balloon-rising-at-sunrise-42289-large.mp4',
    poster: 'https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'nile',
    title: 'Sunset Felucca on Sacred Nile',
    era: 'Timeless Theban Waters',
    location: 'River Nile, Banana Island Reach',
    description: 'Sail the eternal Nile on a handcrafted wooden felucca as warm breezes whisper across fertile banks and the sun sinks behind the West Bank.',
    embedId: 'vjXh2C4784M',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hot-air-balloon-rising-at-sunrise-42289-large.mp4',
    poster: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
  },
];

export const LuxorVideoModal: React.FC<LuxorVideoModalProps> = ({
  isOpen,
  onClose,
  onExploreTours,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [useHtml5Fallback, setUseHtml5Fallback] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentChapter = CHAPTERS[activeChapterIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#060B11]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0A121D] border border-[#D6AD60]/40 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(214,173,96,0.15)] overflow-hidden flex flex-col max-h-[92vh] z-10"
        >
          {/* Header Bar */}
          <div className="px-5 py-4 border-b border-stone-800/80 bg-gradient-to-r from-[#0E1A29] via-[#0A121D] to-[#0E1A29] flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D6AD60]/15 border border-[#D6AD60]/40 flex items-center justify-center text-[#D6AD60]">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wider">
                    GO VOYAGE 4K CINEMATIC LUXOR
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D6AD60]/20 text-[#D6AD60] border border-[#D6AD60]/30 uppercase font-mono">
                    Ultra HD
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-light hidden sm:block">
                  Immersive drone footage and archaeological vistas of Thebes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUseHtml5Fallback(!useHtml5Fallback)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold border border-stone-700 bg-stone-900/60 text-stone-300 hover:text-[#D6AD60] hover:border-[#D6AD60]/40 transition-colors hidden sm:block"
              >
                {useHtml5Fallback ? 'Switch to YouTube 4K' : 'Switch to Ambient Video'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700/60 transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Video Player Display Area */}
          <div className="relative bg-black aspect-video w-full overflow-hidden shrink-0">
            {useHtml5Fallback ? (
              <video
                key={currentChapter.id}
                src={currentChapter.videoSrc}
                poster={currentChapter.poster}
                autoPlay={isPlaying}
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                key={currentChapter.id}
                src={`https://www.youtube-nocookie.com/embed/${currentChapter.embedId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                title={currentChapter.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}

            {/* In-Video Watermark Tag */}
            <div className="absolute top-3 left-3 pointer-events-none px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-cinzel text-amber-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>GO VOYAGE Cinema</span>
            </div>
          </div>

          {/* Video Metadata & Chapter Navigation */}
          <div className="p-5 overflow-y-auto space-y-4 bg-[#0A121D]">
            {/* Active Landmark Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#D6AD60] font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentChapter.location}</span>
                  <span className="text-stone-500">•</span>
                  <span className="text-stone-400">{currentChapter.era}</span>
                </div>
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                  {currentChapter.title}
                </h4>
                <p className="mt-1 text-xs text-stone-300 leading-relaxed max-w-2xl font-light">
                  {currentChapter.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreTours();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-95 text-[#101D2B] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D6AD60]/20 flex items-center gap-1.5 transition-all"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Book This Experience</span>
                </button>
              </div>
            </div>

            {/* Chapter Selection Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Select Landmark Journey
                </span>
                <span className="text-[11px] text-[#D6AD60]">
                  Chapter {activeChapterIndex + 1} of {CHAPTERS.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CHAPTERS.map((ch, idx) => {
                  const isActive = idx === activeChapterIndex;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`relative rounded-xl p-2.5 text-left border transition-all overflow-hidden flex flex-col gap-1 ${
                        isActive
                          ? 'border-[#D6AD60] bg-[#142334]/90 shadow-md shadow-[#D6AD60]/10 ring-1 ring-[#D6AD60]'
                          : 'border-stone-800 bg-[#070D14]/80 hover:border-stone-700 hover:bg-[#0E1724]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#D6AD60] font-semibold">
                          0{idx + 1}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD60] animate-pulse" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-white line-clamp-1">
                        {ch.title}
                      </span>
                      <span className="text-[10px] text-stone-400 line-clamp-1 font-light">
                        {ch.location}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Guarantee */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/60">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Private Egyptologist Guided Access Included with All Tours</span>
              </div>
              <span className="text-[#D6AD60] font-cinzel">GO VOYAGE LUXOR</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
