import React, { useState } from 'react';
import { FlatItem, Currency, ServiceCategory } from '../types';
import { FLATS_DATA, formatPrice } from '../data/luxorData';
import { Bed, Bath, Users, Eye, Waves, Star, CheckCircle, Sparkles, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { LuxuryVillaVisual } from './visuals/LuxorVisuals';
import { useI18n } from '../i18n/I18nContext';

interface FlatsSectionProps {
  currentCurrency: Currency;
  onBookFlat: (flat: FlatItem) => void;
  bankFilter?: 'all' | 'west' | 'east';
  onBankFilterChange?: (filter: 'all' | 'west' | 'east') => void;
  onOpenGallery?: (flat: FlatItem, category: ServiceCategory) => void;
}

export const FlatsSection: React.FC<FlatsSectionProps> = ({
  currentCurrency,
  onBookFlat,
  bankFilter: externalBankFilter,
  onBankFilterChange,
  onOpenGallery,
}) => {
  const { t } = useI18n();
  const [internalBankFilter, setInternalBankFilter] = useState<'all' | 'west' | 'east'>('all');

  const activeBankFilter = externalBankFilter !== undefined ? externalBankFilter : internalBankFilter;

  const handleFilterChange = (val: 'all' | 'west' | 'east') => {
    setInternalBankFilter(val);
    onBankFilterChange?.(val);
  };

  const filteredFlats = FLATS_DATA.filter((flat) => {
    if (activeBankFilter === 'west') return flat.bank.includes('West Bank');
    if (activeBankFilter === 'east') return flat.bank.includes('East Bank');
    return true;
  });

  return (
    <section id="flats" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            {t.flats.kicker}
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-2">
            {t.flats.heading}
          </h2>
          <p className="mt-3 text-stone-300 max-w-2xl text-sm leading-relaxed">
            {t.flats.desc}
          </p>
        </div>

        {/* Bank filter tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-900 border border-stone-800 rounded-xl mt-6 md:mt-0">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeBankFilter === 'all'
                ? 'bg-[#D4AF37] text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            {t.flats.tabAll}
          </button>
          <button
            onClick={() => handleFilterChange('west')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeBankFilter === 'west'
                ? 'bg-[#D4AF37] text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            {t.flats.tabWest}
          </button>
          <button
            onClick={() => handleFilterChange('east')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeBankFilter === 'east'
                ? 'bg-[#D4AF37] text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            {t.flats.tabEast}
          </button>
        </div>
      </div>

      {/* Flats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredFlats.map((flat, idx) => (
          <motion.div
            key={flat.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="luxor-card-hover group bg-[#142334]/70 hover:bg-[#16273b] border border-stone-800 hover:border-[#D6AD60]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Visual Presentation */}
              <div className="relative overflow-hidden h-64 bg-stone-900">
                {flat.imageUrl ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={flat.imageUrl}
                      alt={flat.photoAlt || flat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.92] contrast-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142334] via-[#142334]/30 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <LuxuryVillaVisual className="h-64" />
                )}
                {flat.featured && (
                  <div className="absolute top-4 start-4 bg-stone-950/90 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-md z-10 backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Prime Nilefront</span>
                  </div>
                )}
                {/* Full-Screen Lightbox Gallery Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenGallery?.(flat, 'flats');
                  }}
                  className="absolute bottom-4 start-4 bg-stone-950/85 hover:bg-[#D6AD60] hover:text-[#101D2B] text-stone-200 border border-stone-700 hover:border-[#D6AD60] text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow backdrop-blur-md transition-all z-10"
                  title="View full-screen high-resolution residence gallery"
                >
                  <Camera className="w-3.5 h-3.5 text-[#D6AD60]" />
                  <span>Photos</span>
                </button>

                <div className="absolute bottom-4 end-4 bg-stone-950/85 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1.5 border border-stone-700 shadow-md z-10">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{flat.rating.toFixed(2)}</span>
                  <span className="text-stone-400">({flat.reviewCount})</span>
                </div>
              </div>

              {/* Residence Details */}
              <div className="p-6">
                <div className="text-xs text-[#D4AF37] font-medium uppercase tracking-wider mb-1">
                  {flat.bank}
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {flat.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  {flat.tagline}
                </p>

                {/* Specs Pill-free Row */}
                <div className="flex items-center gap-4 text-xs text-stone-300 my-4 py-2.5 border-y border-stone-800/80">
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-[#D4AF37]" /> {flat.bedrooms} {t.flats.bedrooms}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-[#D4AF37]" /> {flat.bathrooms} {t.flats.baths}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#D4AF37]" /> {t.flats.upTo} {flat.maxGuests}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  {flat.description}
                </p>

                {/* View & Distance */}
                <div className="space-y-1.5 text-xs text-stone-300 mb-4 bg-stone-950/50 p-3 rounded-xl border border-stone-800/50">
                  <div className="flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span><strong>{t.flats.vista}</strong> {flat.view}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Waves className="w-3.5 h-3.5 text-cyan-400" />
                    <span><strong>{t.flats.nileProximity}</strong> {flat.distanceToNile}</span>
                  </div>
                </div>

                {/* Key Amenities */}
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
                  {flat.amenities.slice(0, 4).map((amenity, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Booking Footer */}
            <div className="p-6 pt-0 border-t border-stone-800/60 mt-4 flex items-center justify-between">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                  {t.flats.nightlyRental}
                </span>
                <span className="font-cinzel text-xl font-bold text-white">
                  {formatPrice(flat.pricePerNightUSD, currentCurrency)}
                </span>
                <span className="text-xs text-stone-400 ml-1">/ {t.hero.night}</span>
              </div>

              <button
                onClick={() => onBookFlat(flat)}
                className="btn-gold-shimmer px-5 py-2.5 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-95 text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
              >
                {t.flats.reserveResidence}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
