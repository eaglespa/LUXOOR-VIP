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
  Clock,
  ShieldCheck,
  Award,
  Star,
  ListChecks,
  Compass,
  Camera,
  Sliders,
  Eye,
  BookOpen,
  Target,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TourItem, FlatItem, TransportItem, ServiceCategory } from '../types';
import {
  getGalleryForItem,
  GalleryImage,
  ItemGallery,
  SERVICE_GALLERIES,
  ImageHotspot,
  getHotspotsForImage,
} from '../data/galleryData';
import { useI18n } from '../i18n/I18nContext';

export type PhotoFilter = 'normal' | 'sepia' | 'vivid' | 'bw';

interface FilterOption {
  key: PhotoFilter;
  label: string;
  badge: string;
  cssFilter: string;
  description: string;
}

export const PHOTO_FILTERS: FilterOption[] = [
  {
    key: 'normal',
    label: 'Original',
    badge: 'RAW',
    cssFilter: 'none',
    description: 'Natural authentic archaeological colors',
  },
  {
    key: 'sepia',
    label: 'Sepia',
    badge: '1890',
    cssFilter: 'sepia(0.85) contrast(1.12) brightness(0.96) saturate(1.25)',
    description: 'Vintage 19th-century antiquities sepia tone',
  },
  {
    key: 'vivid',
    label: 'Vivid',
    badge: 'HDR',
    cssFilter: 'saturate(1.6) contrast(1.18) brightness(1.04)',
    description: 'Hyper-vivid pharaonic gold and lapis pigments',
  },
  {
    key: 'bw',
    label: 'B&W',
    badge: 'MONO',
    cssFilter: 'grayscale(1) contrast(1.28) brightness(0.95)',
    description: 'Timeless fine-art monochrome stone textures',
  },
];

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
  const [viewMode, setViewMode] = useState<'gallery' | 'trip-page'>('gallery');
  const [activeFilter, setActiveFilter] = useState<PhotoFilter>('normal');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [kenBurns, setKenBurns] = useState(true);

  // Hotspots state for clickable historical facts & architecture context
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<ImageHotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<ImageHotspot | null>(null);

  const activeFilterObj = PHOTO_FILTERS.find((f) => f.key === activeFilter) || PHOTO_FILTERS[0];

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
  const itemTitle = item ? ('title' in item ? item.title : item.name) : '';
  const currentHotspots = getHotspotsForImage(currentImage, itemTitle);

  // Reset index & hotspots when item changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0);
      setIsZoomed(false);
      setImageLoaded(false);
      setSelectedHotspot(null);
      setHoveredHotspot(null);
    }
  }, [isOpen, item, initialIndex, images.length]);

  // Slideshow auto-advance with 5-second interval
  useEffect(() => {
    if (!isOpen || !isPlaying || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsZoomed(false);
      setSelectedHotspot(null);
      setHoveredHotspot(null);
    }, 5000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, images.length]);

  // Handlers for next / previous navigation
  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
    setImageLoaded(false);
    setSelectedHotspot(null);
    setHoveredHotspot(null);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
    setImageLoaded(false);
    setSelectedHotspot(null);
    setHoveredHotspot(null);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedHotspot) {
          setSelectedHotspot(null);
        } else if (isZoomed) {
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
      } else if (e.key === 'b' || e.key === 'B') {
        setKenBurns((prev) => !prev);
      } else if (e.key === 'h' || e.key === 'H') {
        setShowHotspots((prev) => !prev);
        setSelectedHotspot(null);
      } else if (e.key === 'f' || e.key === 'F') {
        const filterKeys: PhotoFilter[] = ['normal', 'sepia', 'vivid', 'bw'];
        setActiveFilter((current) => {
          const nextIdx = (filterKeys.indexOf(current) + 1) % filterKeys.length;
          return filterKeys[nextIdx];
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, isRTL, selectedHotspot, handleNext, handlePrev, onClose]);

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

        {/* Center: View Switcher (Photo Gallery vs Trip Page) */}
        <div className="flex items-center rounded-xl bg-stone-900/90 border border-stone-800 p-0.5 mx-2">
          <button
            type="button"
            onClick={() => setViewMode('gallery')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'gallery'
                ? 'bg-[#D6AD60] text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Photo Gallery</span>
            <span className="text-[11px] opacity-80">({images.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('trip-page')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'trip-page'
                ? 'bg-[#D6AD60] text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Trip Page & Details</span>
          </button>
        </div>

        {/* Right: Gallery Control Buttons */}
        <div className="flex items-center gap-2">
          {/* Slideshow Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Auto Rotation (5s) (Space)' : 'Start 5s Auto Rotation (Space)'}
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

          {/* Subtle Ken Burns Motion Toggle */}
          <button
            onClick={() => setKenBurns(!kenBurns)}
            title={kenBurns ? 'Cinematic Ken Burns: Active (Press B to toggle)' : 'Cinematic Ken Burns: Disabled (B)'}
            className={`hidden sm:flex p-2.5 rounded-xl border backdrop-blur-md transition-all items-center gap-1.5 ${
              kenBurns
                ? 'bg-[#D6AD60]/20 text-[#D6AD60] border-[#D6AD60]/50 shadow-md'
                : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-white hover:border-stone-700'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${kenBurns ? 'animate-pulse text-[#D6AD60]' : ''}`} />
            <span className="text-[11px] font-semibold hidden xl:inline">Ken Burns</span>
          </button>

          {/* Interactive Hotspots & Facts Toggle */}
          <button
            onClick={() => {
              setShowHotspots(!showHotspots);
              setSelectedHotspot(null);
            }}
            title={showHotspots ? 'Interactive Hotspots: Active (Press H)' : 'Interactive Hotspots: Hidden (H)'}
            className={`hidden sm:flex p-2.5 rounded-xl border backdrop-blur-md transition-all items-center gap-1.5 ${
              showHotspots
                ? 'bg-[#D6AD60]/20 text-[#D6AD60] border-[#D6AD60]/50 shadow-md'
                : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-white hover:border-stone-700'
            }`}
          >
            <Eye className={`w-4 h-4 ${showHotspots ? 'text-[#D6AD60]' : ''}`} />
            <span className="text-[11px] font-semibold hidden xl:inline">
              Hotspots {showHotspots ? `(${currentHotspots.length})` : 'Off'}
            </span>
          </button>

          {/* Photo Filter Toggle Button & Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              title={`Photo Filter: ${activeFilterObj.label} (Press F to cycle)`}
              className={`p-2.5 rounded-xl border backdrop-blur-md transition-all flex items-center gap-1.5 ${
                activeFilter !== 'normal'
                  ? 'bg-[#D6AD60] text-[#101D2B] border-[#D6AD60] font-bold shadow-lg'
                  : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:text-white hover:border-stone-700'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden xl:inline text-xs font-semibold">
                {activeFilterObj.label}
              </span>
            </button>

            {/* Filter Dropdown Popover */}
            <AnimatePresence>
              {showFilterMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className={`absolute top-full mt-2 w-56 bg-[#0A131F]/95 border border-[#D6AD60]/40 rounded-2xl shadow-2xl p-2 backdrop-blur-xl z-50 ${isRTL ? 'left-0' : 'right-0'}`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#D6AD60] px-2.5 py-1 mb-1 border-b border-stone-800 flex items-center justify-between">
                    <span>Photo Filters</span>
                    <span className="text-[9px] text-stone-400 font-mono">Shortcut: F</span>
                  </div>
                  {PHOTO_FILTERS.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setActiveFilter(opt.key);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs transition-all flex items-center justify-between group ${
                        activeFilter === opt.key
                          ? 'bg-[#D6AD60]/20 text-[#E9D8B5] font-semibold border border-[#D6AD60]/30'
                          : 'text-stone-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] font-medium leading-tight flex items-center gap-1.5">
                          <span>{opt.label}</span>
                          <span className="px-1.5 py-0.2 rounded bg-black/40 text-[9px] font-mono text-stone-400 group-hover:text-stone-200">
                            {opt.badge}
                          </span>
                        </div>
                        <div className="text-[9px] text-stone-400 font-light truncate max-w-[170px]">{opt.description}</div>
                      </div>
                      {activeFilter === opt.key && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD60]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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

      {/* Body View Mode: Trip Page vs Photo Gallery */}
      {viewMode === 'trip-page' ? (
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-6xl mx-auto w-full space-y-8 scrollbar-thin">
          {/* Hero Banner with Key Metrics */}
          <div className="relative rounded-3xl overflow-hidden border border-[#D6AD60]/40 bg-gradient-to-b from-[#142334] to-[#0A121D] p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#D6AD60]/20 text-[#D6AD60] border border-[#D6AD60]/40 text-[11px] font-bold uppercase tracking-wider">
                    {category === 'tours' ? 'Signature Luxor Experience' : 'Luxury Residence'}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-stone-300">
                    <MapPin className="w-3.5 h-3.5 text-[#D6AD60]" />
                    {'location' in item ? (item as any).location : 'Luxor West Bank'}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-stone-300">
                    <Clock className="w-3.5 h-3.5 text-[#D6AD60]" />
                    {'duration' in item ? (item as any).duration : 'Full Service'}
                  </span>
                </div>
                <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {itemTitle}
                </h2>
                <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
                  {'description' in item ? (item as any).description : gallery.subtitle}
                </p>
              </div>

              {/* Action and Price */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="text-start lg:text-end">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">From</span>
                  <span className="font-cinzel text-3xl font-bold text-[#E9D8B5]">
                    ${'priceUSD' in item ? (item as any).priceUSD : 'pricePerNightUSD' in item ? (item as any).pricePerNightUSD : 110}
                  </span>
                  <span className="text-xs text-stone-400 ml-1">/ person</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('gallery')}
                    className="px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-900/90 hover:border-[#D6AD60] text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 text-[#D6AD60]" />
                    <span>View Slideshow</span>
                  </button>
                  {onBookItem && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onBookItem(item, category);
                      }}
                      className="btn-gold-shimmer px-5 py-2.5 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95"
                    >
                      Reserve Flight
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick credentials bar */}
            <div className="mt-6 pt-6 border-t border-stone-800/80 flex flex-wrap items-center gap-6 text-xs text-stone-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                {item.id === 'tombs-nefertari-kings'
                  ? 'Supreme Council of Antiquities Certified'
                  : item.id === 'nile-dahabiya-sunset'
                  ? 'Private Navigation Authority Luxury River Permit'
                  : item.id === 'dendera-abydos-day-expedition'
                  ? 'Supreme Council Inter-Governorate Expedition Permit'
                  : 'Egyptian Ministry of Civil Aviation Certified'}
              </span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Award className="w-4 h-4 text-[#D6AD60]" />
                {item.id === 'tombs-nefertari-kings'
                  ? 'Official Restricted Chamber Permit (QV66 Nefertari)'
                  : item.id === 'nile-dahabiya-sunset'
                  ? 'Certified Executive Chef & Private Teak Dahabiya Charter'
                  : item.id === 'dendera-abydos-day-expedition'
                  ? 'Master Egyptologist & Subterranean Osireion Access'
                  : 'Master Pilot Commemorative Certificate Included'}
              </span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                {'rating' in item ? `${(item as any).rating.toFixed(2)} Rating (${(item as any).reviewCount} Verified Guests)` : '4.98 Rating'}
              </span>
            </div>
          </div>

          {/* High-Resolution Photos Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#D6AD60]" />
                  Official Trip High-Resolution Photos ({images.length})
                </h3>
                <p className="text-xs text-stone-400">Click any photo to inspect in full-screen 4K viewer with zoom & slideshow</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex(0);
                  setViewMode('gallery');
                  setIsPlaying(true);
                }}
                className="text-xs text-[#D6AD60] hover:underline font-semibold flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Play Auto Slideshow</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setViewMode('gallery');
                  }}
                  className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-stone-800 hover:border-[#D6AD60] cursor-pointer bg-stone-900 transition-all duration-300 shadow-md hover:shadow-2xl hover:scale-[1.02]"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-2 start-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-[#D6AD60] border border-white/10">
                    #{idx + 1}
                  </div>
                  <div className="absolute bottom-2 start-2 end-2">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#D6AD60] truncate">
                      {img.tag}
                    </span>
                    <p className="text-[11px] text-stone-200 line-clamp-1 font-light">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Itinerary Timeline */}
          {'highlights' in item && (
            <div className="bg-[#0D1520]/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#D6AD60]" />
                {item.id === 'tombs-nefertari-kings'
                  ? 'Valley of the Kings & Nefertari VIP Itinerary'
                  : item.id === 'nile-dahabiya-sunset'
                  ? 'Private Sunset Dahabiya & Gourmet Feast Itinerary'
                  : item.id === 'karnak-luxor-night-illumination'
                  ? 'Karnak & Luxor Temple Twilight Grandeur Itinerary'
                  : item.id === 'dendera-abydos-day-expedition'
                  ? 'Dendera Hathor & Abydos Osiris Sacred Expedition'
                  : 'Trip Timeline & Itinerary'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(item.id === 'tombs-nefertari-kings'
                  ? [
                      {
                        time: '07:30 AM',
                        title: 'Private Mercedes Pickup',
                        desc: 'Executive AC Mercedes transfer directly from your Luxor hotel or Nile cruise dock with chilled refreshments.',
                      },
                      {
                        time: '08:00 AM',
                        title: 'Valley of the Kings Exploration',
                        desc: 'Fast-track VIP entrance to 3 royal pharaoh tombs & King Tutankhamun chamber with your Senior Egyptologist.',
                      },
                      {
                        time: '10:00 AM',
                        title: 'Restricted Nefertari Tomb (QV66)',
                        desc: 'Privileged access to the finest tomb in Egypt. Admire untouched 3,200-year-old lapis lazuli and gold murals.',
                      },
                      {
                        time: '11:15 AM',
                        title: 'Queen Hatshepsut Temple',
                        desc: 'Ascend the monumental three-tiered limestone terraces at Deir el-Bahari cut into the cliff face.',
                      },
                      {
                        time: '12:15 PM',
                        title: 'Colossi of Memnon Sentinels',
                        desc: 'Private masterclass and photo session before the towering 18m twin statues of Amenhotep III.',
                      },
                      {
                        time: '01:00 PM',
                        title: 'Chauffeur Return Escort',
                        desc: 'Smooth return transfer to your hotel or Nile cruiser with iced karkadeh hibiscus tea.',
                      },
                    ]
                  : item.id === 'nile-dahabiya-sunset'
                  ? [
                      {
                        time: '04:00 PM',
                        title: 'Executive Chauffeur Pickup',
                        desc: 'Private Mercedes transfer directly from your Luxor hotel or cruise dock to the private riverfront pier.',
                      },
                      {
                        time: '04:30 PM',
                        title: 'Boarding & Sunset Toast',
                        desc: 'Step aboard the handcrafted teak Dahabiya. Welcomed with chilled hibiscus karkadeh, fresh fruit, and scented towels.',
                      },
                      {
                        time: '05:00 PM',
                        title: 'Golden Hour Lateen Sailing',
                        desc: 'Sail along the timeless Nile under towering billowing sails as the sun sets behind the West Bank peaks.',
                      },
                      {
                        time: '06:15 PM',
                        title: 'Chef-Prepared Gourmet Feast',
                        desc: 'Multi-course banquet featuring grilled Nile specialties, prime Egyptian meats, oriental mezze, and om ali.',
                      },
                      {
                        time: '07:00 PM',
                        title: 'Live Acoustic Oud & Starlit Cruise',
                        desc: 'Traditional live acoustic oud and percussion melodies under the starlit sky with Egyptian mint tea.',
                      },
                      {
                        time: '07:30 PM',
                        title: 'Docking & Chauffeur Return',
                        desc: 'Smooth docking at the marina pier and comfortable private transfer escort back to your hotel or villa.',
                      },
                    ]
                  : item.id === 'dendera-abydos-day-expedition'
                  ? [
                      {
                        time: '07:00 AM',
                        title: 'Executive Mercedes Departure',
                        desc: 'Private Mercedes executive transfer pickup from your hotel or cruise dock with chilled drinks and breakfast hamper.',
                      },
                      {
                        time: '08:30 AM',
                        title: 'Temple of Hathor at Dendera',
                        desc: 'Marvel at the celestial astronomical zodiac ceiling, rooftop New Year chapel, crypts, and Hathor-headed columns.',
                      },
                      {
                        time: '11:15 AM',
                        title: 'Scenic Countryside Drive to Abydos',
                        desc: 'Private scenic drive north through agricultural villages and fertile Upper Egyptian date palm groves.',
                      },
                      {
                        time: '12:30 PM',
                        title: 'Seti I Temple & 7 Sanctuaries',
                        desc: 'Explore the miraculous colored reliefs of Abydos, raising of the Djed pillar, and the monumental King List gallery.',
                      },
                      {
                        time: '02:00 PM',
                        title: 'Enigmatic Osireion Sanctuary',
                        desc: 'Descend into the sacred subterranean megalithic Osireion water shrine dedicated to the god of the afterlife.',
                      },
                      {
                        time: '03:15 PM',
                        title: 'Country Banquet & Return Escort',
                        desc: 'Authentic countryside Egyptian lunch with freshly baked bread, followed by a relaxing chauffeur return to Luxor.',
                      },
                    ]
                  : [
                      {
                        time: '04:30 AM',
                        title: 'VIP Chauffeur Pickup',
                        desc: 'Private air-conditioned transfer directly from your Luxor hotel or Nile cruise dock.',
                      },
                      {
                        time: '04:50 AM',
                        title: 'Private Nile Boat Crossing',
                        desc: 'Tranquil water crossing to the West Bank with hot Egyptian coffee, mint tea & morning pastries.',
                      },
                      {
                        time: '05:15 AM',
                        title: 'Master Pilot Briefing',
                        desc: 'Meet your veteran pilot, witness burner envelope inflation & undergo Civil Aviation safety briefing.',
                      },
                      {
                        time: '05:35 AM',
                        title: 'Royal Sunrise Ascent (2,500 ft)',
                        desc: '55-minute gentle airborne glide above Queen Hatshepsut Temple, Valley of the Kings & Colossi of Memnon.',
                      },
                      {
                        time: '06:30 AM',
                        title: 'Desert Touchdown & Toast',
                        desc: 'Soft landing ceremony with master pilot signed commemorative certificate & celebratory sparklers.',
                      },
                      {
                        time: '07:15 AM',
                        title: 'Chauffeur Return Escort',
                        desc: 'Comfortable return ride back to your hotel or cruise ship with time to enjoy full breakfast.',
                      },
                    ]
                ).map((step, sIdx) => (
                  <div key={sIdx} className="bg-stone-900/80 border border-stone-800 p-4 rounded-2xl space-y-1.5">
                    <span className="text-xs font-mono font-bold text-[#D6AD60]">{step.time}</span>
                    <h4 className="font-cinzel text-sm font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Highlights Row */}
          {'highlights' in item && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0D1520]/90 border border-stone-800 rounded-3xl p-6 space-y-3">
                <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D6AD60]" />
                  Experience Highlights
                </h4>
                <ul className="space-y-2 text-xs text-stone-300">
                  {((item as any).highlights || []).map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D6AD60] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0D1520]/90 border border-stone-800 rounded-3xl p-6 space-y-3">
                <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-[#D6AD60]" />
                  VIP Inclusions
                </h4>
                <ul className="space-y-2 text-xs text-stone-300">
                  {((item as any).inclusions || []).map((inc: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Main Center Image Stage with Swipe & Pan */}
          <div
            className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
            onClick={() => setSelectedHotspot(null)}
            onMouseDown={handlePanMouseDown}
            onMouseMove={handlePanMouseMove}
            onMouseUp={handlePanMouseUp}
            style={{ cursor: isZoomed ? (isPanningRef.current ? 'grabbing' : 'grab') : 'default' }}
          >
            {/* Control Overlay: 5-Second Auto-Rotation with Pause Button & Filter Switcher */}
            <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 z-30 flex flex-wrap items-center justify-center gap-2 max-w-[95%]">
              {/* Auto Image Rotation Control Pill with 5-Second Interval & Pause/Play Button */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/85 backdrop-blur-md border border-[#D6AD60]/50 shadow-2xl">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 ${
                    isPlaying
                      ? 'bg-gradient-to-r from-amber-400 to-[#D6AD60] text-[#101D2B] hover:brightness-105'
                      : 'bg-white/10 hover:bg-[#D6AD60] text-stone-200 hover:text-[#101D2B]'
                  }`}
                  title={isPlaying ? 'Pause 5-second auto rotation' : 'Start 5-second auto rotation'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause</span>
                      <span className="text-[10px] font-mono px-1 rounded bg-black/25 text-[#101D2B]">5s</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play (5s)</span>
                    </>
                  )}
                </button>

                {/* Animated 5-Second Progress Bar */}
                {isPlaying && (
                  <div className="hidden sm:flex items-center pr-2 pl-0.5">
                    <div className="w-10 h-1 bg-stone-700/80 rounded-full overflow-hidden">
                      <motion.div
                        key={currentIndex}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        className="h-full bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Filter Segmented Floating Control */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D6AD60]/40 shadow-2xl">
                <div className="flex items-center gap-1 pl-2.5 pr-1 text-[10px] uppercase font-bold tracking-wider text-[#D6AD60]">
                  <Sliders className="w-3 h-3 text-[#D6AD60]" />
                  <span className="hidden sm:inline">Filter:</span>
                </div>
                {PHOTO_FILTERS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setActiveFilter(opt.key)}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                      activeFilter === opt.key
                        ? 'bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] text-[#101D2B] font-bold shadow-md scale-105'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={`${opt.label}: ${opt.description}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Interactive Hotspots & Historical Facts Toggle Pill */}
              <button
                type="button"
                onClick={() => {
                  setShowHotspots(!showHotspots);
                  setSelectedHotspot(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-2xl backdrop-blur-md border active:scale-95 ${
                  showHotspots
                    ? 'bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] text-[#101D2B] border-[#D6AD60] shadow-[0_0_15px_rgba(214,173,96,0.5)]'
                    : 'bg-black/80 text-stone-300 border-[#D6AD60]/40 hover:text-white hover:border-[#D6AD60]'
                }`}
                title={showHotspots ? 'Hotspots Active — Click to hide (Shortcut: H)' : 'Explore Historical Hotspots & Facts (Shortcut: H)'}
              >
                <Target className={`w-3.5 h-3.5 ${showHotspots ? 'text-[#101D2B]' : 'text-[#D6AD60]'}`} />
                <span>Hotspots</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  showHotspots ? 'bg-black/25 text-[#101D2B]' : 'bg-[#D6AD60]/20 text-[#D6AD60]'
                }`}>
                  {currentHotspots.length}
                </span>
              </button>
            </div>

            {/* Navigation Arrow Left */}
            <button
              onClick={isRTL ? handleNext : handlePrev}
              aria-label="Previous Image"
              className="absolute start-4 sm:start-8 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#D6AD60] text-white hover:text-[#101D2B] border border-stone-800 hover:border-[#D6AD60] backdrop-blur-md transition-all shadow-2xl active:scale-95 group"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Animated Image Frame with Seamless Cross-Fade and Subtle Ken Burns Effect */}
            <div className="relative w-full h-full max-h-[70vh] sm:max-h-[76vh] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="relative max-w-full max-h-full flex items-center justify-center pointer-events-auto">
                    <motion.img
                      key={currentImage.id}
                      src={currentImage.url}
                      alt={currentImage.caption}
                      onLoad={() => setImageLoaded(true)}
                      initial={
                        isZoomed
                          ? { scale: 2.1, x: panPosition.x / 2, y: panPosition.y / 2 }
                          : { scale: 1, x: 0, y: 0 }
                      }
                      animate={
                        isZoomed
                          ? {
                              scale: 2.1,
                              x: panPosition.x / 2,
                              y: panPosition.y / 2,
                              transition: isPanningRef.current
                                ? { duration: 0 }
                                : { duration: 0.25, ease: 'easeOut' },
                            }
                          : kenBurns
                          ? {
                              scale: [1, 1.055, 1.018],
                              x: [0, (currentIndex % 2 === 0 ? 8 : -8), 0],
                              y: [0, (currentIndex % 3 === 0 ? -6 : 6), 0],
                              transition: {
                                scale: { duration: 8.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
                                x: { duration: 8.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
                                y: { duration: 8.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
                              },
                            }
                          : { scale: 1, x: 0, y: 0, transition: { duration: 0.3 } }
                      }
                      style={{
                        filter: activeFilterObj.cssFilter,
                        transition: 'filter 0.4s ease',
                      }}
                      className={`max-w-full max-h-[68vh] sm:max-h-[74vh] object-contain rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] border border-stone-800/80 will-change-transform ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Loading Spinner */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-[#D6AD60] border-t-transparent animate-spin" />
                      </div>
                    )}

                    {/* Interactive Hotspots Layer Overlay */}
                    {imageLoaded && showHotspots && !isZoomed && currentHotspots.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none z-20">
                        {currentHotspots.map((spot, sIdx) => {
                          const isHovered = hoveredHotspot?.id === spot.id;
                          const isSelected = selectedHotspot?.id === spot.id;
                          const isActive = isSelected || isHovered;

                          // Category styling and icons
                          const categoryConfig = {
                            history: {
                              label: 'Ancient History',
                              badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                              icon: BookOpen,
                            },
                            architecture: {
                              label: 'Sacred Architecture',
                              badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
                              icon: Compass,
                            },
                            symbolism: {
                              label: 'Divine Symbolism',
                              badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
                              icon: Eye,
                            },
                            fact: {
                              label: 'Fun Fact',
                              badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                              icon: Sparkles,
                            },
                          }[spot.category] || {
                            label: 'Historical Insight',
                            badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                            icon: Sparkles,
                          };

                          const CategoryIcon = categoryConfig.icon;

                          // Smart card placement to ensure popovers stay in viewport
                          const isTopHalf = spot.y <= 55;
                          const isRightHalf = spot.x > 65;
                          const isLeftHalf = spot.x < 35;

                          return (
                            <div
                              key={spot.id}
                              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                            >
                              {/* Pulsing Beacon Button */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedHotspot((prev) => (prev?.id === spot.id ? null : spot));
                                }}
                                onMouseEnter={() => setHoveredHotspot(spot)}
                                onMouseLeave={() => setHoveredHotspot(null)}
                                aria-label={`Hotspot: ${spot.title}`}
                                className={`group relative flex items-center justify-center transition-transform duration-300 ${
                                  isActive ? 'scale-125 z-40' : 'hover:scale-115 z-30'
                                }`}
                              >
                                {/* Radiating radar ping */}
                                <span
                                  className={`absolute inline-flex h-8 w-8 rounded-full opacity-75 animate-ping ${
                                    isActive ? 'bg-[#E9D8B5]' : 'bg-[#D6AD60]'
                                  }`}
                                />
                                {/* Soft glow aura */}
                                <span
                                  className={`absolute inline-flex h-7 w-7 rounded-full transition-opacity duration-300 blur-xs ${
                                    isActive
                                      ? 'bg-gradient-to-r from-amber-400 to-[#D6AD60] opacity-100'
                                      : 'bg-[#D6AD60]/40 opacity-70 group-hover:opacity-100'
                                  }`}
                                />
                                {/* Solid Button Disc */}
                                <span
                                  className={`relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.8)] border-2 transition-all ${
                                    isActive
                                      ? 'bg-gradient-to-br from-[#E9D8B5] to-[#D6AD60] border-white text-[#101D2B]'
                                      : 'bg-[#101D2B]/90 border-[#D6AD60] text-[#D6AD60] group-hover:bg-[#D6AD60] group-hover:text-[#101D2B]'
                                  }`}
                                >
                                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                                </span>
                              </button>

                              {/* Interactive Glassmorphic Popover Card */}
                              <AnimatePresence>
                                {isActive && (
                                  <motion.div
                                    initial={{ opacity: 0, y: isTopHalf ? 8 : -8, scale: 0.94 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: isTopHalf ? 8 : -8, scale: 0.94 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`absolute z-50 w-72 sm:w-80 p-4 rounded-2xl bg-[#09111C]/95 backdrop-blur-xl border border-[#D6AD60]/60 shadow-[0_20px_50px_rgba(0,0,0,0.95)] pointer-events-auto ${
                                      isTopHalf ? 'top-full mt-3' : 'bottom-full mb-3'
                                    } ${
                                      isRightHalf
                                        ? 'right-0 translate-x-3'
                                        : isLeftHalf
                                        ? 'left-0 -translate-x-3'
                                        : 'left-1/2 -translate-x-1/2'
                                    }`}
                                  >
                                    {/* Header: Category Badge & Close Button */}
                                    <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-stone-800/80">
                                      <span
                                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${categoryConfig.badge}`}
                                      >
                                        <CategoryIcon className="w-3 h-3" />
                                        <span>{categoryConfig.label}</span>
                                      </span>

                                      <div className="flex items-center gap-1">
                                        <span className="text-[10px] text-stone-500 font-mono">
                                          #{sIdx + 1}/{currentHotspots.length}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedHotspot(null);
                                            setHoveredHotspot(null);
                                          }}
                                          className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                                          aria-label="Dismiss Hotspot"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Title */}
                                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#E9D8B5] leading-snug mb-1.5">
                                      {spot.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-xs text-stone-300 leading-relaxed font-light">
                                      {spot.description}
                                    </p>

                                    {/* Micro Hint */}
                                    <div className="mt-3 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] text-stone-400">
                                      <span className="flex items-center gap-1 text-[#D6AD60]/90">
                                        <Sparkles className="w-2.5 h-2.5" />
                                        <span>Click pin to keep open</span>
                                      </span>
                                      <span>Tap outside to close</span>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

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
                    style={{ filter: activeFilterObj.cssFilter, transition: 'filter 0.4s ease' }}
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
        </>
      )}
    </div>
  );
};
