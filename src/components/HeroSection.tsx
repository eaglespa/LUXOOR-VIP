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
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Mic,
  Crown,
  ChevronDown,
  Play,
  Pause,
  Film,
  Volume2,
  VolumeX,
  RotateCcw,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';
import { LuxorVideoModal } from './LuxorVideoModal';
import { ambientSound } from '../utils/ambientAudio';

interface VideoScene {
  id: string;
  label: string;
  location: string;
  embedId: string;
  poster: string;
}

const VIDEO_SCENES: VideoScene[] = [
  {
    id: 'balloons',
    label: 'Sunrise Hot Air Balloons',
    location: 'Valley of the Kings & West Bank',
    embedId: '5a2xW3xK8-s',
    poster: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'karnak',
    label: 'Karnak Hypostyle & Temples',
    location: 'East Bank & Avenue of Sphinxes',
    embedId: 'v1p_6kQ6_f0',
    poster: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'nile',
    label: 'Sacred Nile Sunset Waters',
    location: 'River Nile & Theban Horizons',
    embedId: 'vjXh2C4784M',
    poster: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=2000&q=85',
  },
];

// Entrance Animation Variants for Choreographed Luxury Reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const kickerVariants: Variants = {
  hidden: { opacity: 0, y: -24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)', scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

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
  const [activeCategory, setActiveCategory] = useState<'tours' | 'flats' | 'transfers' | 'airport' | 'packages'>('tours');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [showSceneSelector, setShowSceneSelector] = useState(false);
  const [entranceKey, setEntranceKey] = useState(0);

  const activeScene = VIDEO_SCENES[currentSceneIndex];

  // Replay Hero Entrance Animation
  const handleReplayEntrance = () => {
    setEntranceKey((prev) => prev + 1);
  };

  const toggleAmbientVideo = () => {
    setIsAmbientPlaying((prev) => !prev);
  };

  const handleToggleAudio = () => {
    const active = ambientSound.toggle();
    setIsAudioActive(active);
  };

  const handleSelectScene = (index: number) => {
    setCurrentSceneIndex(index);
    setShowSceneSelector(false);
    setIsAmbientPlaying(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceCategory: ServiceCategory =
      activeCategory === 'flats' ? 'flats' : activeCategory === 'tours' ? 'tours' : 'transport';
    onQuickBook(serviceCategory, date, guests);
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden">
      {/* =========================================================================
          1. HIGH-QUALITY CONTINUOUS LOOPING BACKGROUND VIDEO OF LUXOR'S LANDSCAPE
      ========================================================================= */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        {/* High-Resolution Landscape Poster Fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url(${activeScene.poster})` }}
        />

        {/* 4K Continuous Looping Video Stream of Luxor's Landscape */}
        {isAmbientPlaying && (
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <iframe
              key={activeScene.id}
              src={`https://www.youtube-nocookie.com/embed/${activeScene.embedId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${activeScene.embedId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&fs=0&modestbranding=1`}
              title="Luxor Landscape 4K Continuous Loop"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[160vh] min-w-full min-h-full pointer-events-none border-0 opacity-80 brightness-[0.82] contrast-[1.12]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Balanced Cinematic Gradient Scrims allowing Luxor's landscape to be vividly visible behind content */}
        <div className="absolute inset-0 bg-[#081019]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#101D2B]/85 via-[#101D2B]/30 to-[#101D2B]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#101D2B]/20 to-[#070D14]/85" />
      </div>

      {/* Radiant golden dawn light over the Nile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-t from-[#D6AD60]/20 via-[#B88E3E]/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10"
      />

      {/* Floating Animated Balloons in the Distance with Entrance Float */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-70">
        {/* Balloon 1 */}
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: -40, opacity: 1 }}
          transition={{
            y: { duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
            opacity: { duration: 1.5, delay: 0.5 },
          }}
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
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: -50, opacity: 0.75 }}
          transition={{
            y: { duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 1 },
            opacity: { duration: 1.8, delay: 0.8 },
          }}
          className="absolute top-36 right-[12%] sm:right-[20%] scale-75 opacity-75"
        >
          <div className="w-14 h-18 bg-gradient-to-br from-[#176C70] via-[#0284c7] to-[#101D2B] rounded-t-full rounded-b-2xl shadow-lg border border-cyan-300/30 relative flex flex-col items-center">
            <div className="absolute -bottom-3 w-4 h-3 bg-[#101D2B] rounded-sm border border-cyan-400/40" />
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          VIDEO CONTROLS & SCENE SWITCHER BAR
      ========================================================================= */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        {/* Scene Selector Menu Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSceneSelector(!showSceneSelector)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 hover:bg-black/85 border border-[#D6AD60]/40 text-stone-200 hover:text-white text-xs backdrop-blur-md transition-all group shadow-md"
            title="Change Ambient Video Scene"
          >
            <Layers className="w-3 h-3 text-[#D6AD60] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline text-[10px] font-mono tracking-wider text-[#E9D8B5]">
              {activeScene.label}
            </span>
            <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${showSceneSelector ? 'rotate-180' : ''}`} />
          </button>

          {/* Scene Switcher Dropdown */}
          <AnimatePresence>
            {showSceneSelector && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-2 w-64 bg-[#0A131F]/95 border border-[#D6AD60]/40 rounded-2xl shadow-2xl p-2 backdrop-blur-xl z-30"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#D6AD60] px-2.5 py-1 mb-1 border-b border-stone-800">
                  Select Video Scene
                </div>
                {VIDEO_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => handleSelectScene(idx)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                      idx === currentSceneIndex
                        ? 'bg-[#D6AD60]/20 text-[#E9D8B5] font-semibold border border-[#D6AD60]/30'
                        : 'text-stone-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-[11px] font-medium leading-tight">{scene.label}</div>
                      <div className="text-[9px] text-stone-400 font-light">{scene.location}</div>
                    </div>
                    {idx === currentSceneIndex && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD60]" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ambient Desert Audio Toggle */}
        <button
          type="button"
          onClick={handleToggleAudio}
          className="p-1.5 rounded-full bg-black/65 hover:bg-black/85 border border-[#D6AD60]/40 text-stone-300 hover:text-[#D6AD60] backdrop-blur-md transition-all shadow-md"
          title={isAudioActive ? 'Mute Atmospheric Desert Sound' : 'Play Atmospheric Desert Sound'}
        >
          {isAudioActive ? (
            <Volume2 className="w-3.5 h-3.5 text-[#D6AD60] animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Ambient Video Play/Pause Toggle */}
        <button
          type="button"
          onClick={toggleAmbientVideo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 hover:bg-black/85 border border-[#D6AD60]/40 text-stone-300 hover:text-white text-xs backdrop-blur-md transition-all group shadow-md"
          title={isAmbientPlaying ? 'Pause Ambient Nile Video' : 'Play Ambient Nile Video'}
        >
          {isAmbientPlaying ? (
            <>
              <Pause className="w-3 h-3 text-[#D6AD60]" />
              <span className="text-[10px] font-mono tracking-wider text-[#E9D8B5] hidden sm:inline">PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#D6AD60]" />
              <span className="text-[10px] font-mono tracking-wider text-stone-300 hidden sm:inline">PLAY</span>
            </>
          )}
        </button>

        {/* Replay Entrance Animation Button */}
        <button
          type="button"
          onClick={handleReplayEntrance}
          className="p-1.5 rounded-full bg-black/65 hover:bg-black/85 border border-stone-700 hover:border-[#D6AD60]/40 text-stone-400 hover:text-[#D6AD60] backdrop-blur-md transition-all shadow-md hidden lg:flex"
          title="Replay Hero Entrance Animation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =========================================================================
          2. CHOREOGRAPHED HERO ENTRANCE ANIMATION CONTAINER
      ========================================================================= */}
      <motion.div
        key={entranceKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-4 w-full"
      >
        {/* Curatorial Kicker */}
        <motion.div variants={kickerVariants} className="inline-block">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715]/90 border border-[#D6AD60]/40 text-xs uppercase tracking-widest text-[#E9D8B5] mb-6 backdrop-blur-md shadow-lg shadow-black/40">
            <Star className="w-3 h-3 text-[#D6AD60] fill-[#D6AD60]" />
            <span>{t.hero.kicker}</span>
          </div>
        </motion.div>

        {/* Exact Master Prompt Headline with Staggered Entrance Reveal */}
        <motion.h1
          variants={titleVariants}
          className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18] text-balance drop-shadow-md max-w-4xl mx-auto"
        >
          {t.hero.title}
        </motion.h1>

        {/* Exact Master Prompt Supporting Text */}
        <motion.p
          variants={subtitleVariants}
          className="mt-5 text-base sm:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed font-light drop-shadow"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          variants={ctaVariants}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#tours"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D6AD60] via-[#E8C576] to-[#E9D8B5] hover:brightness-105 text-[#101D2B] font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#D6AD60]/25 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <span>{t.hero.primaryCta}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Dedicated Watch Luxor Film Button */}
          <button
            type="button"
            onClick={() => setIsVideoModalOpen(true)}
            className="relative group px-5 py-3.5 rounded-xl bg-[#0C1522]/90 hover:bg-[#132235] border border-[#D6AD60]/70 hover:border-[#D6AD60] text-stone-100 font-semibold text-xs uppercase tracking-wider transition-all shadow-xl shadow-black/40 flex items-center gap-2.5 active:scale-95 backdrop-blur-md"
          >
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6AD60] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D6AD60]"></span>
            </span>
            <Play className="w-3.5 h-3.5 text-[#D6AD60] fill-[#D6AD60] group-hover:scale-110 transition-transform" />
            <span className="font-cinzel text-amber-200">Watch Luxor 4K Film</span>
            <span className="px-1.5 py-0.5 text-[9px] rounded bg-[#D6AD60]/20 text-[#D6AD60] font-mono border border-[#D6AD60]/40 font-bold">4K</span>
          </button>

          <button
            type="button"
            onClick={onPlanJourney}
            className="px-5 py-3.5 rounded-xl bg-[#181715]/80 hover:bg-[#181715] border border-stone-700/80 hover:border-[#D6AD60]/50 text-stone-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all backdrop-blur-md"
          >
            {t.hero.secondaryCta}
          </button>
        </motion.div>

        {/* Master Prompt Section 3.C: Quick Booking Panel - WIDER BY 25% (max-w-[1120px]) */}
        <motion.div
          variants={panelVariants}
          className="mt-9 w-full max-w-[1120px] mx-auto bg-gradient-to-b from-[#111A26]/95 via-[#0D1520]/95 to-[#090F17]/95 border border-[#D6AD60]/40 rounded-3xl p-6 sm:p-8 md:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_25px_rgba(214,173,96,0.12)] backdrop-blur-xl relative overflow-hidden text-start"
        >
          {/* Subtle Top Pharaoh Gold Radiance Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6AD60] to-transparent opacity-90" />
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#D6AD60]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Category Tabs in Floating Track */}
          <div className="bg-[#070D14]/90 p-2 rounded-2xl border border-stone-800/80 mb-6 flex items-center justify-start lg:justify-between gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'tours', label: t.hero.catTours, icon: Compass },
              { id: 'flats', label: t.hero.catFlats, icon: Home },
              { id: 'transfers', label: t.hero.catTransfers, icon: Car },
              { id: 'airport', label: t.hero.catAirport, icon: Plane },
              { id: 'packages', label: t.hero.catPackages, icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D6AD60] to-[#E8C576] text-stone-950 font-bold shadow-md shadow-[#D6AD60]/20 scale-[1.02]'
                      : 'text-stone-300 hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-[#D6AD60]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {onOpenVoiceSearch && (
              <button
                type="button"
                onClick={onOpenVoiceSearch}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-[#D6AD60]/15 border border-[#D6AD60]/40 text-[#D6AD60] hover:bg-[#D6AD60]/25 transition-all whitespace-nowrap shrink-0 group shadow-sm active:scale-95 ml-auto sm:ml-0"
                title="Voice Command: Say 'Book a balloon ride' or 'Show villas in West Bank'"
              >
                <Mic className="w-3.5 h-3.5 text-[#D6AD60] animate-pulse" />
                <span className="font-cinzel text-[11px] font-bold">Voice Search</span>
              </button>
            )}
          </div>

          {/* Form fields */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Field 1: Route / Destination / Category Specific Field */}
            <div className="sm:col-span-4 bg-[#090F17]/90 hover:bg-[#0C1520] border border-stone-700/80 hover:border-[#D6AD60]/50 rounded-2xl p-3.5 sm:p-4 transition-all group">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6AD60] mb-1">
                {activeCategory === 'tours' && 'Excursion Category'}
                {activeCategory === 'flats' && 'Accommodation Area'}
                {activeCategory === 'transfers' && 'Pickup & Destination'}
                {activeCategory === 'airport' && 'Airport Meet & Assist'}
                {activeCategory === 'packages' && 'Curated Itinerary Route'}
              </label>
              <div className="text-xs sm:text-sm font-semibold text-white truncate flex items-center justify-between">
                <span>
                  {activeCategory === 'tours' && 'Hot Air Balloon & Valley of Kings'}
                  {activeCategory === 'flats' && 'West Bank & Nilefront Villas'}
                  {activeCategory === 'transfers' && 'Luxor East Bank to West Bank / Temples'}
                  {activeCategory === 'airport' && 'Luxor International Airport (LXR) Curbside'}
                  {activeCategory === 'packages' && '3 to 7 Days Complete Theban Odyssey'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#D6AD60] shrink-0 ml-1 transition-colors" />
              </div>
            </div>

            {/* Field 2: Date Picker */}
            <div className="sm:col-span-3 bg-[#090F17]/90 hover:bg-[#0C1520] border border-stone-700/80 hover:border-[#D6AD60]/50 rounded-2xl p-3.5 sm:p-4 transition-all group">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6AD60] mb-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D6AD60]" /> {t.hero.date}
                </span>
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none font-semibold cursor-pointer scheme-dark"
              />
            </div>

            {/* Field 3: Travelers */}
            <div className="sm:col-span-2 bg-[#090F17]/90 hover:bg-[#0C1520] border border-stone-700/80 hover:border-[#D6AD60]/50 rounded-2xl p-3.5 sm:p-4 transition-all group">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6AD60] mb-1">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#D6AD60]" /> {t.hero.travelers}
                </span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none font-semibold cursor-pointer scheme-dark"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                  <option key={num} value={num} className="bg-[#0A0E17] text-white">
                    {num} {num === 1 ? t.hero.guest : t.hero.guests}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Button */}
            <div className="sm:col-span-3 flex items-stretch">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#DFB15B] via-[#D6AD60] to-[#E9D8B5] hover:brightness-110 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-[#D6AD60]/25 active:scale-[0.98] py-4 sm:py-0"
              >
                <span>{t.hero.checkAvailability}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </form>

          {/* Verification strip & Loyalty Notice */}
          <div className="mt-4 pt-3.5 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-300 gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-stone-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {t.hero.verifiedBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/10 border border-[#D6AD60]/30 text-[#D6AD60] font-semibold text-[11px]">
                <Crown className="w-3.5 h-3.5 text-[#D6AD60]" />
                <span>Earn 10–20 Luxor Points / $1</span>
              </span>
            </div>
            <span className="text-stone-400 font-light">
              {t.hero.ratesFrom}{' '}
              <strong className="text-white font-cinzel font-bold">
                {activeCategory === 'flats'
                  ? `${formatPrice(140, currentCurrency)}/${t.hero.perNight}`
                  : activeCategory === 'tours'
                  ? formatPrice(95, currentCurrency)
                  : formatPrice(45, currentCurrency)}
              </strong>
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 4K Cinematic Luxor Film Modal */}
      <LuxorVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onExploreTours={() => {
          const el = document.getElementById('tours');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </section>
  );
};

