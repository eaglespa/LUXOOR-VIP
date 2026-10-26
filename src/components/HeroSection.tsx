import React, { useState } from 'react';
import { Currency, ServiceCategory } from '../types';
import { formatPrice } from '../data/luxorData';
import {
  Calendar,
  Users,
  Compass,
  Home,
  Car,
  Plane,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Mic,
  Crown,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';
import { LuxorWeather } from './LuxorWeather';

interface HeroSectionProps {
  currentCurrency: Currency;
  onQuickBook: (category: ServiceCategory, date: string, guests: number) => void;
  onPlanJourney: () => void;
  onOpenVoiceSearch?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentCurrency,
  onQuickBook,
  onPlanJourney,
  onOpenVoiceSearch,
}) => {
  const { t, isRTL } = useI18n();
  const [activeCategory, setActiveCategory] = useState<'tours' | 'flats' | 'transfers' | 'airport' | 'drivers' | 'packages'>('tours');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceCategory: ServiceCategory =
      activeCategory === 'flats' ? 'flats' : activeCategory === 'tours' ? 'tours' : 'transport';
    onQuickBook(serviceCategory, date, guests);
  };

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden">
      {/* Background with Midnight Nile and atmospheric Egyptian lighting */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#101D2B] via-[#142334] to-[#101D2B]" />

      {/* Radiant golden dawn light over the Nile */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-t from-[#D6AD60]/15 via-[#B88E3E]/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Floating Animated Balloons in the Distance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-70">
        {/* Balloon 1 */}
        <motion.div
          initial={{ y: 80, x: -20 }}
          animate={{ y: -40, x: 20 }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-24 left-[10%] sm:left-[18%]"
        >
          <div className="w-12 h-16 sm:w-16 sm:h-20 bg-gradient-to-br from-[#D6AD60] via-[#E25822] to-[#4A1525] rounded-t-full rounded-b-2xl shadow-lg border border-amber-300/30 relative flex flex-col items-center">
            <div className="w-full h-1/2 bg-amber-400/20 rounded-t-full" />
            <div className="absolute -bottom-3 w-4 h-3 bg-[#3A2012] rounded-sm border border-amber-500/40" />
            <div className="absolute -bottom-1 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping" />
          </div>
        </motion.div>

        {/* Balloon 2 */}
        <motion.div
          initial={{ y: 20, x: 10 }}
          animate={{ y: -50, x: -15 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2 }}
          className="absolute top-36 right-[12%] sm:right-[20%] scale-75 opacity-75"
        >
          <div className="w-14 h-18 bg-gradient-to-br from-[#176C70] via-[#0284c7] to-[#101D2B] rounded-t-full rounded-b-2xl shadow-lg border border-cyan-300/30 relative flex flex-col items-center">
            <div className="absolute -bottom-3 w-4 h-3 bg-[#101D2B] rounded-sm border border-cyan-400/40" />
          </div>
        </motion.div>
      </div>

      {/* Hero Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-4">
        {/* Curatorial Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715]/90 border border-[#D6AD60]/30 text-xs uppercase tracking-widest text-[#E9D8B5] mb-6 backdrop-blur-sm">
          <Star className="w-3 h-3 text-[#D6AD60] fill-[#D6AD60]" />
          <span>{t.hero.kicker}</span>
        </div>

        {/* Exact Master Prompt Headline: "Discover Luxor. Experience Eternity." */}
        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18] text-balance">
          {t.hero.title}
        </h1>

        {/* Exact Master Prompt Supporting Text */}
        <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
          {t.hero.subtitle}
        </p>

        {/* Hero CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#tours"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-95 text-[#101D2B] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D6AD60]/20 active:scale-95 transition-all"
          >
            {t.hero.primaryCta}
          </a>
          <button
            onClick={onPlanJourney}
            className="px-6 py-3 rounded-xl bg-[#181715]/80 hover:bg-[#181715] border border-[#D6AD60]/40 text-stone-200 font-semibold text-xs uppercase tracking-wider transition-all"
          >
            {t.hero.secondaryCta}
          </button>
        </div>

        {/* Current Weather in Luxor Live Meteorological Component */}
        <LuxorWeather />

        {/* Master Prompt Section 3.C: Quick Booking Panel with 6 Searchable Categories */}
        <div className="mt-8 max-w-4xl mx-auto bg-[#181715]/95 border border-[#D6AD60]/30 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          {/* 6 Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 mb-4 border-b border-stone-800 pb-3 overflow-x-auto scrollbar-none">
            {[
              { id: 'tours', label: t.hero.catTours, icon: Compass },
              { id: 'flats', label: t.hero.catFlats, icon: Home },
              { id: 'transfers', label: t.hero.catTransfers, icon: Car },
              { id: 'airport', label: t.hero.catAirport, icon: Plane },
              { id: 'drivers', label: t.hero.catDrivers, icon: Clock },
              { id: 'packages', label: t.hero.catPackages, icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    activeCategory === tab.id
                      ? 'bg-[#D6AD60] text-[#101D2B] shadow-md font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {onOpenVoiceSearch && (
              <button
                type="button"
                onClick={onOpenVoiceSearch}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#D6AD60]/15 border border-[#D6AD60]/40 text-[#D6AD60] hover:bg-[#D6AD60]/25 transition-all whitespace-nowrap shrink-0 group shadow-sm active:scale-95"
                title="Voice Command: Say 'Book a balloon ride' or 'Show villas in West Bank'"
              >
                <Mic className="w-3.5 h-3.5 text-[#D6AD60] animate-pulse" />
                <span className="font-cinzel text-[11px] font-bold">Voice Search</span>
              </button>
            )}
          </div>

          {/* Form fields */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-start">
            {/* Field 1: Route / Destination / Category Specific Field */}
            <div className="sm:col-span-5 bg-[#101D2B]/90 border border-stone-800 rounded-xl p-2.5">
              <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-400 mb-1">
                {activeCategory === 'tours' && 'Excursion Category'}
                {activeCategory === 'flats' && 'Accommodation Area'}
                {activeCategory === 'transfers' && 'Pickup & Destination'}
                {activeCategory === 'airport' && 'Airport Meet & Assist'}
                {activeCategory === 'drivers' && 'Dedicated Chauffeur Duration'}
                {activeCategory === 'packages' && 'Curated Itinerary Route'}
              </label>
              <div className="text-xs sm:text-sm font-semibold text-white truncate">
                {activeCategory === 'tours' && 'Hot Air Balloon & Valley of Kings'}
                {activeCategory === 'flats' && 'West Bank & Nilefront Villas'}
                {activeCategory === 'transfers' && 'Luxor East Bank to West Bank / Temples'}
                {activeCategory === 'airport' && 'Luxor International Airport (LXR) Curbside'}
                {activeCategory === 'drivers' && '10 Hours Full-Day Executive Service'}
                {activeCategory === 'packages' && '3 to 7 Days Complete Theban Odyssey'}
              </div>
            </div>

            {/* Field 2: Date Picker */}
            <div className="sm:col-span-3 bg-[#101D2B]/90 border border-stone-800 rounded-xl p-2.5">
              <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-400 mb-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#D6AD60]" /> {t.hero.date}
                </span>
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none font-medium cursor-pointer"
              />
            </div>

            {/* Field 3: Travelers */}
            <div className="sm:col-span-2 bg-[#101D2B]/90 border border-stone-800 rounded-xl p-2.5">
              <label className="block text-[10px] font-medium uppercase tracking-wider text-stone-400 mb-1">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#D6AD60]" /> {t.hero.travelers}
                </span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#101D2B] text-xs sm:text-sm text-white focus:outline-none font-medium cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? t.hero.guest : t.hero.guests}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Button */}
            <div className="sm:col-span-2 flex items-stretch">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-95 text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 py-3 sm:py-0"
              >
                <span>{t.hero.checkAvailability}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </form>

          {/* Verification strip & Loyalty Notice */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-stone-300 px-1 pt-2 border-t border-stone-800/60 gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6AD60]" />
                {t.hero.verifiedBadge}
              </span>
              <span className="flex items-center gap-1 text-[#D6AD60]">
                <Crown className="w-3.5 h-3.5" />
                <span>Earn 10–20 Luxor Points / $1</span>
              </span>
            </div>
            <span>
              {t.hero.ratesFrom}{' '}
              <strong className="text-white">
                {activeCategory === 'flats'
                  ? `${formatPrice(140, currentCurrency)}/${t.hero.perNight}`
                  : activeCategory === 'tours'
                  ? formatPrice(95, currentCurrency)
                  : formatPrice(45, currentCurrency)}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
