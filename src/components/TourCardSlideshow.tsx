import React, { useState, useEffect } from 'react';
import { TourItem, ServiceCategory } from '../types';
import { Camera, Box, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface TourCardSlideshowProps {
  tour: TourItem;
  language: string;
  onOpenGallery?: (tour: TourItem, category: ServiceCategory) => void;
  onOpenAr?: (tour: TourItem) => void;
  renderVisual: (id: string) => React.ReactNode;
  arLabel: string;
}

export const TourCardSlideshow: React.FC<TourCardSlideshowProps> = ({
  tour,
  language: _language,
  onOpenGallery,
  onOpenAr,
  renderVisual,
  arLabel,
}) => {
  const images = tour.galleryImages || (tour.imageUrl ? [tour.imageUrl] : []);
  const hasMultipleImages = images.length > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance slideshow every 3.6s when not hovered
  useEffect(() => {
    if (!hasMultipleImages || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3600);

    return () => clearInterval(timer);
  }, [hasMultipleImages, isHovered, images.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative overflow-hidden h-56 bg-stone-900 group/slideshow select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
    >
      {/* Images container / Visual fallback */}
      {images.length > 0 ? (
        <div
          className="w-full h-full relative overflow-hidden cursor-pointer"
          onClick={() => onOpenGallery?.(tour, 'tours')}
          title="Click to open full high-resolution trip gallery and details"
        >
          {images.map((imgUrl, i) => (
            <img
              key={imgUrl}
              src={imgUrl}
              alt={`${tour.title} photo ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                i === currentIndex
                  ? 'opacity-100 scale-100 brightness-[0.93] contrast-[1.05]'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
          {/* Subtle bottom gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#142334] via-[#142334]/25 to-transparent pointer-events-none" />
        </div>
      ) : (
        renderVisual(tour.id)
      )}

      {/* Interactive Navigation Arrows (appear on hover / visible on touch) */}
      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute start-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/65 hover:bg-[#D6AD60] text-white hover:text-[#101D2B] border border-white/20 hover:border-[#D6AD60] flex items-center justify-center transition-all duration-200 z-20 shadow-lg active:scale-90 backdrop-blur-md opacity-85 sm:opacity-0 group-hover/slideshow:opacity-100"
            title="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute end-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/65 hover:bg-[#D6AD60] text-white hover:text-[#101D2B] border border-white/20 hover:border-[#D6AD60] flex items-center justify-center transition-all duration-200 z-20 shadow-lg active:scale-90 backdrop-blur-md opacity-85 sm:opacity-0 group-hover/slideshow:opacity-100"
            title="Next photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Top Left: Signature Experience Badge */}
      {tour.badge && (
        <div className="absolute top-3 start-3 bg-[#0A0B0E]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow z-20">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>{tour.badge}</span>
        </div>
      )}

      {/* Top Right: AR 3D View Floating Badge Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpenAr?.(tour);
        }}
        className="absolute top-3 end-3 bg-[#0A0B0E]/90 hover:bg-[#D6AD60] hover:text-[#101D2B] text-[#D6AD60] border border-[#D6AD60]/60 text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all group/ar z-20"
        title="View in Augmented Reality (AR)"
      >
        <Box className="w-3.5 h-3.5 text-[#D6AD60] group-hover/ar:text-[#101D2B] transition-colors" />
        <span>{arLabel}</span>
      </button>

      {/* Bottom Center: Pagination Dots for Slideshow */}
      {hasMultipleImages && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 pointer-events-auto max-w-[190px] overflow-x-auto scrollbar-none">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              aria-label={`Jump to photo ${i + 1}`}
              className={`transition-all duration-300 shrink-0 ${
                i === currentIndex
                  ? 'w-3.5 h-1.5 rounded-full bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] shadow-[0_0_8px_rgba(214,173,96,0.8)]'
                  : 'w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom Left: Full-Screen Lightbox Gallery Trigger & Photo Counter */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpenGallery?.(tour, 'tours');
        }}
        className="absolute bottom-2.5 start-2.5 bg-[#0A0B0E]/90 hover:bg-[#D6AD60] hover:text-[#101D2B] text-stone-200 border border-stone-700/80 hover:border-[#D6AD60] text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md backdrop-blur-md transition-all z-20 group/cam"
        title="View full-screen high-resolution image gallery"
      >
        <Camera className="w-3.5 h-3.5 text-[#D6AD60] group-hover/cam:text-[#101D2B] transition-colors" />
        <span>
          {hasMultipleImages
            ? `${currentIndex + 1}/${images.length} Photos`
            : 'Photos'}
        </span>
      </button>

      {/* Bottom Right: Rating & Review Count */}
      <div className="absolute bottom-2.5 end-2.5 bg-stone-950/85 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-semibold text-white flex items-center gap-1 border border-stone-700/80 z-20">
        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
        <span>{tour.rating.toFixed(2)}</span>
        <span className="text-stone-400 font-normal">({tour.reviewCount})</span>
      </div>
    </div>
  );
};
