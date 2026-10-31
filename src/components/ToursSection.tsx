import React, { useState } from 'react';
import { TourItem, Currency, ServiceCategory } from '../types';
import { TOURS_DATA, formatPrice } from '../data/luxorData';
import { Clock, MapPin, Star, Check, Sparkles, ChevronDown, ChevronUp, Box, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { BalloonSunriseVisual, KarnakPillarsVisual, FeluccaSunsetVisual } from './visuals/LuxorVisuals';
import { useI18n } from '../i18n/I18nContext';
import { ArTemplePreviewModal } from './ArTemplePreviewModal';

interface ToursSectionProps {
  currentCurrency: Currency;
  onBookTour: (tour: TourItem) => void;
  onOpenGallery?: (tour: TourItem, category: ServiceCategory) => void;
}

const AR_LABELS: Record<string, string> = {
  en: 'AR 3D View',
  ar: 'واقع معزز 3D',
  fr: 'Vue 3D RA',
  de: 'AR 3D Ansicht',
  es: 'Vista 3D RA',
  it: 'Vista 3D AR',
  ru: '3D AR Вид',
  'zh-CN': 'AR 3D 视图',
};

export const ToursSection: React.FC<ToursSectionProps> = ({
  currentCurrency,
  onBookTour,
  onOpenGallery,
}) => {
  const { t, language } = useI18n();
  const [filter, setFilter] = useState<'all' | 'balloon' | 'temples' | 'nile'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeArTour, setActiveArTour] = useState<TourItem | null>(null);

  const filteredTours = TOURS_DATA.filter((tour) => {
    if (filter === 'all') return true;
    return tour.category === filter;
  });

  const renderVisual = (tourId: string) => {
    if (tourId.includes('balloon')) {
      return <BalloonSunriseVisual className="h-56" />;
    } else if (tourId.includes('nile') || tourId.includes('dahabiya')) {
      return <FeluccaSunsetVisual className="h-56" />;
    } else {
      return <KarnakPillarsVisual className="h-56" />;
    }
  };

  return (
    <section id="tours" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            {t.tours.kicker}
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-2">
            {t.tours.heading}
          </h2>
          <p className="mt-3 text-stone-300 max-w-2xl text-sm leading-relaxed">
            {t.tours.desc}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-900 border border-stone-800 rounded-xl mt-6 md:mt-0 overflow-x-auto">
          {[
            { id: 'all', label: t.tours.tabAll },
            { id: 'balloon', label: t.tours.tabBalloon },
            { id: 'temples', label: t.tours.tabTemples },
            { id: 'nile', label: t.tours.tabNile },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-[#D4AF37] text-stone-950 shadow-sm font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map((tour, idx) => {
          const isExpanded = expandedId === tour.id;

          return (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="luxor-card-hover group bg-[#142334]/70 hover:bg-[#16273b] border border-stone-800 hover:border-[#D6AD60]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Artwork / Genuine Photo Header */}
                <div className="relative overflow-hidden h-56 bg-stone-900">
                  {tour.imageUrl ? (
                    <div className="w-full h-full relative overflow-hidden">
                      <img
                        src={tour.imageUrl}
                        alt={tour.photoAlt || tour.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.92] contrast-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#142334] via-[#142334]/30 to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    renderVisual(tour.id)
                  )}

                  {tour.badge && (
                    <div className="absolute top-3 start-3 bg-[#0A0B0E]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow z-10">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>{tour.badge}</span>
                    </div>
                  )}

                  {/* AR 3D View Floating Badge Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveArTour(tour);
                    }}
                    className="absolute top-3 end-3 bg-[#0A0B0E]/90 hover:bg-[#D6AD60] hover:text-[#101D2B] text-[#D6AD60] border border-[#D6AD60]/60 text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all group/ar z-10"
                    title="View in Augmented Reality (AR)"
                  >
                    <Box className="w-3.5 h-3.5 text-[#D6AD60] group-hover/ar:text-[#101D2B] transition-colors" />
                    <span>{AR_LABELS[language] || 'AR 3D View'}</span>
                  </button>

                  {/* Full-Screen Lightbox Gallery Trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenGallery?.(tour, 'tours');
                    }}
                    className="absolute bottom-3 start-3 bg-[#0A0B0E]/85 hover:bg-[#D6AD60] hover:text-[#101D2B] text-stone-200 border border-stone-700 hover:border-[#D6AD60] text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow backdrop-blur-md transition-all z-10"
                    title="View full-screen high-resolution image gallery"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#D6AD60]" />
                    <span>Photos</span>
                  </button>

                  <div className="absolute bottom-3 end-3 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1 border border-stone-700">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{tour.rating.toFixed(2)}</span>
                    <span className="text-stone-400 font-normal">({tour.reviewCount})</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {tour.duration}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      {tour.bank}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                    {tour.subtitle}
                  </p>

                  <p className="text-xs text-stone-300 mt-3 leading-relaxed">
                    {tour.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="mt-4 pt-4 border-t border-stone-800/80 space-y-1.5">
                    {tour.highlights.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Inclusions & Start Times */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-stone-800 text-xs space-y-3 bg-stone-950/40 -mx-6 px-6 pb-2">
                      <div>
                        <span className="font-semibold text-[#D4AF37] block mb-1">
                          {t.tours.vipInclusions}
                        </span>
                        <ul className="space-y-1 text-stone-300">
                          {tour.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold text-stone-300 block mb-1">
                          {t.tours.departureWaves}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {tour.startTimes.map((time, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-stone-800 text-[11px] text-stone-300">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Toggle details link */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : tour.id)}
                    className="mt-3 text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
                  >
                    {isExpanded ? (
                      <>
                        {t.tours.lessDetails} <ChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        {t.tours.fullInclusions} <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card Footer: Price & Booking Action */}
              <div className="p-6 pt-0 border-t border-stone-800/60 mt-4 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                    {t.tours.passFrom}
                  </span>
                  <span className="font-cinzel text-xl font-bold text-white">
                    {formatPrice(tour.priceUSD, currentCurrency)}
                  </span>
                  <span className="text-[11px] text-stone-400 ml-1">{t.tours.perPerson}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveArTour(tour)}
                    className="px-3 py-2 rounded-xl border border-[#D6AD60]/40 text-[#D6AD60] hover:bg-[#D6AD60]/15 hover:border-[#D6AD60] transition-all flex items-center gap-1 text-xs font-medium"
                    title="View in Augmented Reality"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline text-[11px] font-semibold">AR</span>
                  </button>

                  <button
                    onClick={() => onBookTour(tour)}
                    className="btn-gold-shimmer px-4 py-2.5 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-95 text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
                  >
                    {t.tours.reservePass}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Augmented Reality Temple & Monument Preview Modal */}
      <ArTemplePreviewModal
        isOpen={!!activeArTour}
        tour={activeArTour}
        onClose={() => setActiveArTour(null)}
        onBookTour={onBookTour}
      />
    </section>
  );
};
