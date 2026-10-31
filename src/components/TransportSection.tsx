import React from 'react';
import { TransportItem, Currency, ServiceCategory } from '../types';
import { TRANSPORT_DATA, formatPrice } from '../data/luxorData';
import { Users, Briefcase, Check, Shield, Zap, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { VipFleetVisual } from './visuals/LuxorVisuals';
import { useI18n } from '../i18n/I18nContext';

interface TransportSectionProps {
  currentCurrency: Currency;
  onBookTransport: (item: TransportItem) => void;
  onOpenGallery?: (item: TransportItem, category: ServiceCategory) => void;
}

export const TransportSection: React.FC<TransportSectionProps> = ({
  currentCurrency,
  onBookTransport,
  onOpenGallery,
}) => {
  const { t } = useI18n();

  return (
    <section id="transport" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      {/* Section Header with Scroll-Triggered Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12"
      >
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            {t.transport.kicker}
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-2">
            {t.transport.heading}
          </h2>
          <p className="mt-3 text-stone-300 max-w-2xl text-sm leading-relaxed">
            {t.transport.desc}
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3 text-xs text-stone-300 bg-stone-900 border border-stone-800 px-4 py-2.5 rounded-xl">
          <Shield className="w-4 h-4 text-[#D4AF37]" />
          <span>{t.transport.flightTracking}</span>
        </div>
      </motion.div>

      {/* Transport Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRANSPORT_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] as const }}
            className="luxor-card-hover group bg-[#142334]/70 hover:bg-[#16273b] border border-stone-800 hover:border-[#D6AD60]/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Visual header */}
              <div className="relative overflow-hidden h-56 bg-stone-900">
                {item.imageUrl ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.photoAlt || item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.92] contrast-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142334] via-[#142334]/30 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <VipFleetVisual className="h-56" />
                )}
                <div className="absolute top-4 start-4 bg-stone-950/90 border border-[#D6AD60]/40 text-[#E9D8B5] text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md backdrop-blur-md z-10">
                  <Zap className="w-3 h-3 text-[#D6AD60]" />
                  <span>{item.vehicleType}</span>
                </div>

                {/* Full-Screen Lightbox Gallery Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenGallery?.(item, 'transport');
                  }}
                  className="absolute bottom-4 end-4 bg-stone-950/85 hover:bg-[#D6AD60] hover:text-[#101D2B] text-stone-200 border border-stone-700 hover:border-[#D6AD60] text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow backdrop-blur-md transition-all z-10"
                  title="View VIP fleet interior & exterior gallery"
                >
                  <Camera className="w-3.5 h-3.5 text-[#D6AD60]" />
                  <span>Fleet Photos</span>
                </button>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Capacity Badges (Unboxed) */}
                <div className="flex items-center gap-4 text-xs text-stone-400 mb-3 pb-3 border-b border-stone-800">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <Users className="w-4 h-4 text-[#D4AF37]" /> {t.transport.passengers} {item.passengers}
                  </span>
                  {item.luggage > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1.5 text-stone-300">
                        <Briefcase className="w-4 h-4 text-[#D4AF37]" /> {item.luggage} {t.transport.suitcases}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Features List */}
                <div className="space-y-1.5 text-xs text-stone-300">
                  {item.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Booking Footer */}
            <div className="p-6 pt-0 border-t border-stone-800/60 mt-4 flex items-center justify-between">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                  {item.rateType === 'per-trip' ? t.transport.fixedRate : t.transport.fullDay}
                </span>
                <span className="font-cinzel text-xl font-bold text-white">
                  {formatPrice(item.priceUSD, currentCurrency)}
                </span>
              </div>

              <button
                onClick={() => onBookTransport(item)}
                className="btn-gold-shimmer px-5 py-2.5 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-95 text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
              >
                {t.transport.reserveChauffeur}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
