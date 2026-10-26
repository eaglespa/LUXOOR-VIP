import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  MapPin,
  Sparkles,
  Calendar,
  Share2,
  Check,
  Download,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TourItem, FlatItem, TransportItem, ServiceCategory } from '../types';
import { getGalleryForItem, GalleryImage, ItemGallery, SERVICE_GALLERIES } from '../data/galleryData';
import { useI18n } from '../i18n/I18nContext';

interface LightboxGalleryModalProps {
  isOpen: boolean;
  item: TourItem | FlatItem | TransportItem | null;
  category: ServiceCategory;
  initialIndex?: number;
  onClose: () => void;
  onBookItem?: (item: TourItem | FlatItem | TransportItem, category: ServiceCategory) => void;
  onSelectItem?: (item: TourItem | FlatItem | TransportItem, category: ServiceCategory) => void;
}

export const LightboxGalleryModal: React.FC<LightboxGalleryModalProps> = ({
  isOpen,
  item,
  category,
  initialIndex = 0,
  onClose,
  onBookItem,
}) => {
  const { language, isRTL } = useI18n();

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Zoom pan state
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const startPanRef = useRef({ x: 0, y: 0 });

  // Touch swipe tracking
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Get active gallery
  const gallery: ItemGallery = item
    ? getGalleryForItem(item.id, 'title' in item ? item.title : item.name, category)
    : {
        itemId: '',
        itemTitle: 'Luxor Image Gallery',
        category: 'tours',
        subtitle: '',
        images: [],
      };

  const images = gallery.images;
  const currentImage: GalleryImage | undefined = images[currentIndex];

  // Reset index when item changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0);
      setIsZoomed(false);
      setImageLoaded(false);
    }
  }, [isOpen, item, initialIndex, images.length]);

  // Slideshow auto-advance
  useEffect(() => {
    if (!isOpen || !isPlaying || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsZoomed(false);
    }, 4000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, images.length]);

  // Handlers for next / previous navigation
  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
    setImageLoaded(false);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
    setImageLoaded(false);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        if (isRTL) handlePrev();
        else handleNext();
      } else if (e.key === 'ArrowLeft') {
        if (isRTL) handleNext();
        else handlePrev();
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, isRTL, handleNext, handlePrev, onClose]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Only swipe if horizontal motion is greater than vertical (prevents scroll conflicts)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        // Swiped right
        if (isRTL) handleNext();
        else handlePrev();
      } else {
        // Swiped left
        if (isRTL) handlePrev();
        else handleNext();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Zoom pan handlers
  const handleZoomToggle = () => {
    setIsZoomed((prev) => {
      const next = !prev;
      if (!next) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handlePanMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    isPanningRef.current = true;
    startPanRef.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
  };

  const handlePanMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed || !isPanningRef.current) return;
    const newX = e.clientX - startPanRef.current.x;
    const newY = e.clientY - startPanRef.current.y;
    // Bound panning
    setPanPosition({
      x: Math.max(-200, Math.min(200, newX)),
      y: Math.max(-150, Math.min(150, newY)),
    });
  };

  const handlePanMouseUp = () => {
    isPanningRef.current = false;
  };

  // Share photo link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!isOpen || !item || !currentImage) return null;

  const itemTitle = 'title' in item ? item.title : item.name;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl text-white select-none animate-fadeIn"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background ambient glow matching Luxor gold & nile colors */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-radial from-[#182a3d]/40 via-black to-black opacity-80" />

      {/* Top Header Control Bar */}
      <header className="relative z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        {/* Left: Item Title, Category Badge, Counter */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#142334] border border-[#D6AD60]/50 flex items-center justify-center text-[#D6AD60] shrink-0 shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6AD60]">
                {category === 'tours' ? 'Temple & Flight Gallery' : category === 'flats' ? 'Luxury Residence Gallery' : 'VIP Fleet Gallery'}
              </span>
              <span className="text-stone-500">·</span>
              <span className="text-xs font-semibold text-stone-300">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-white leading-tight truncate max-w-xs sm:max-w-md">
              {itemTitle}
            </h3>
          </div>
        </div>

        {/* Right: Gallery Control Buttons */}
        <div className="flex items-center gap-2">
          {/* Slideshow Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Slideshow (Space)' : 'Play Slideshow (Space)'}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
              isPlaying
                ? 'bg-[#D6AD60] text-[#101D2B] border-[#D6AD60]'
                : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:text-white hover:border-stone-700'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Zoom Toggle */}
          <button
            onClick={handleZoomToggle}
            title={isZoomed ? 'Reset Zoom (Z)' : 'Zoom In 2x (Z)'}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
              isZoomed
                ? 'bg-[#D6AD60] text-[#101D2B] border-[#D6AD60]'
                : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:text-white hover:border-stone-700'
            }`}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Toggle Info / Captions */}
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            title="Toggle Description Bar"
            className={`hidden sm:flex p-2.5 rounded-xl border backdrop-blur-md transition-all ${
              showCaptions
                ? 'bg-stone-800 text-[#D6AD60] border-stone-700'
                : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="hidden sm:flex p-2.5 rounded-xl bg-stone-900/80 text-stone-300 border border-stone-800 hover:text-white hover:border-stone-700 backdrop-blur-md transition-all"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Share Link */}
          <button
            onClick={handleShare}
            title="Share Photo Link"
            className="p-2.5 rounded-xl bg-stone-900/80 text-stone-300 border border-stone-800 hover:text-white hover:border-stone-700 backdrop-blur-md transition-all"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-2.5 rounded-xl bg-stone-900/90 text-stone-200 border border-stone-700 hover:text-[#D6AD60] hover:border-[#D6AD60] backdrop-blur-md transition-all ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Center Image Stage with Swipe & Pan */}
      <div
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
        onMouseDown={handlePanMouseDown}
        onMouseMove={handlePanMouseMove}
        onMouseUp={handlePanMouseUp}
        style={{ cursor: isZoomed ? (isPanningRef.current ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* Navigation Arrow Left */}
        <button
          onClick={isRTL ? handleNext : handlePrev}
          aria-label="Previous Image"
          className="absolute start-4 sm:start-8 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#D6AD60] text-white hover:text-[#101D2B] border border-stone-800 hover:border-[#D6AD60] backdrop-blur-md transition-all shadow-2xl active:scale-95 group"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Animated Image Frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative max-w-full max-h-full flex items-center justify-center"
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption}
              onLoad={() => setImageLoaded(true)}
              style={{
                transform: isZoomed
                  ? `scale(2.1) translate(${panPosition.x / 2}px, ${panPosition.y / 2}px)`
                  : 'none',
                transition: isPanningRef.current ? 'none' : 'transform 0.3s ease-out',
              }}
              className={`max-w-full max-h-[68vh] sm:max-h-[74vh] object-contain rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] border border-stone-800/80 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Loading Spinner */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#D6AD60] border-t-transparent animate-spin" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrow Right */}
        <button
          onClick={isRTL ? handlePrev : handleNext}
          aria-label="Next Image"
          className="absolute end-4 sm:end-8 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#D6AD60] text-white hover:text-[#101D2B] border border-stone-800 hover:border-[#D6AD60] backdrop-blur-md transition-all shadow-2xl active:scale-95 group"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Info Bar & Thumbnail Filmstrip */}
      <footer className="relative z-20 flex flex-col gap-3 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/85 to-transparent">
        {/* Caption & Location Card */}
        {showCaptions && (
          <div className="max-w-4xl mx-auto w-full bg-[#101D2B]/85 backdrop-blur-md border border-stone-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#D6AD60]/20 text-[#D6AD60] border border-[#D6AD60]/40 text-[10px] font-bold uppercase tracking-wider">
                  {currentImage.tag}
                </span>
                {currentImage.location && (
                  <span className="flex items-center gap-1 text-xs text-stone-400">
                    <MapPin className="w-3.5 h-3.5 text-[#D6AD60]" />
                    <span>{currentImage.location}</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                {currentImage.caption}
              </p>
            </div>

            {/* Quick Booking CTA from Lightbox */}
            {onBookItem && (
              <button
                onClick={() => {
                  onClose();
                  onBookItem(item, category);
                }}
                className="btn-gold-shimmer px-5 py-2.5 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-95 text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 text-[#101D2B]" />
                <span>
                  {category === 'tours'
                    ? 'Reserve Tour Pass'
                    : category === 'flats'
                    ? 'Book This Villa'
                    : 'Reserve Transport'}
                </span>
              </button>
            )}
          </div>
        )}

        {/* Thumbnail Filmstrip */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsZoomed(false);
                setImageLoaded(false);
              }}
              className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                idx === currentIndex
                  ? 'border-[#D6AD60] scale-105 shadow-[0_0_20px_rgba(214,173,96,0.6)] opacity-100'
                  : 'border-stone-800 opacity-50 hover:opacity-90 hover:border-stone-600'
              }`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {idx === currentIndex && (
                <div className="absolute inset-0 bg-[#D6AD60]/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};
