import React, { useState, useEffect } from 'react';
import { Currency } from '../types';
import { Volume2, VolumeX, Menu, X, Globe, UserCheck, ShieldCheck, Sparkles, ChevronDown, Mic, Crown } from 'lucide-react';
import { ambientSound } from '../utils/ambientAudio';
import { useI18n } from '../i18n/I18nContext';
import { Language, SUPPORTED_LANGUAGES } from '../i18n/translations';
import { useLoyalty } from '../hooks/useLoyalty';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenBookingModal: () => void;
  onOpenMyBookings: () => void;
  onOpenAdmin: () => void;
  onOpenNefertari: () => void;
  onOpenVoiceSearch: () => void;
  onOpenLoyalty: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenBookingModal,
  onOpenMyBookings,
  onOpenAdmin,
  onOpenNefertari,
  onOpenVoiceSearch,
  onOpenLoyalty,
}) => {
  const { points, tier } = useLoyalty();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const { language, setLanguage, t, isRTL } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const active = ambientSound.toggle();
    setAudioActive(active);
  };

  const navLinks = [
    { label: t.nav.experiences, href: '#tours' },
    { label: t.nav.stay, href: '#flats' },
    { label: t.nav.transportation, href: '#transport' },
    { label: t.nav.explore, href: '#timeline' },
    { label: t.nav.about, href: '#nile-banks' },
    { label: t.nav.privateTours, href: '#planner' },
  ];

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#101D2B]/95 backdrop-blur-md border-b border-[#D6AD60]/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-[#101D2B]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single text element wordmark in Cinzel display font */}
          <a
            href="/"
            className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-gold-gradient whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            LUXOR.VIP
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#D6AD60] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D6AD60]/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + 8-Language Switcher + Currency + Concierge Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Luxor Points Royal Club Status Button */}
            <button
              onClick={onOpenLoyalty}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#D6AD60]/60 bg-gradient-to-r from-[#D6AD60]/20 via-[#D6AD60]/10 to-[#181715]/80 hover:bg-[#D6AD60]/30 text-[#D6AD60] text-xs font-semibold transition-all group shadow-sm active:scale-95"
              title="Luxor Points Royal Club — View digital card, tiers & rewards"
            >
              <Crown className="w-3.5 h-3.5 text-[#D6AD60] group-hover:scale-110 transition-transform" />
              <span className="font-cinzel tracking-wider text-[11px] font-bold">
                {points.toLocaleString()} <span className="font-normal text-[10px]">PTS</span>
              </span>
            </button>

            {/* Voice-Activated Search Command Button */}
            <button
              onClick={onOpenVoiceSearch}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#D6AD60]/50 bg-[#D6AD60]/10 hover:bg-[#D6AD60]/25 text-[#D6AD60] text-xs font-semibold transition-all group shadow-sm active:scale-95"
              title="Voice Commands: Say 'Book a balloon ride', 'Show villas in West Bank'"
            >
              <Mic className="w-3.5 h-3.5 text-[#D6AD60] group-hover:scale-110 transition-transform animate-pulse" />
              <span className="hidden md:inline font-cinzel tracking-wider text-[11px]">Voice Search</span>
            </button>

            {/* Nefertari AI Voice Trigger */}
            <button
              onClick={onOpenNefertari}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D6AD60]/40 bg-[#181715]/80 hover:bg-[#D6AD60]/20 text-[#D6AD60] text-xs font-semibold transition-all group"
              title="Speak to Nefertari AI Concierge"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D6AD60]" />
              <span className="hidden sm:inline">Nefertari AI</span>
            </button>

            {/* Ambient Sound Atmosphere toggle */}
            <button
              onClick={handleToggleAudio}
              title={audioActive ? t.nav.soundActive : t.nav.soundMute}
              className="p-2 rounded-lg border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-[#D6AD60] hover:border-[#D6AD60]/40 transition-colors"
              aria-label="Toggle ambient desert audio"
            >
              {audioActive ? (
                <Volume2 className="w-4 h-4 text-[#D6AD60] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* 8-Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-800 bg-stone-900/80 text-xs text-stone-200 hover:border-[#D6AD60]/50 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#D6AD60]" />
                <span className="font-semibold">{currentLangObj.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {langMenuOpen && (
                <div
                  className={`absolute top-full mt-2 ${
                    isRTL ? 'start-0' : 'end-0'
                  } w-44 bg-[#181715] border border-[#D6AD60]/40 rounded-xl shadow-2xl py-1.5 z-50`}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        language === lang.code
                          ? 'bg-[#D6AD60]/20 text-[#D6AD60] font-bold'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-stone-300 uppercase">
                        {lang.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Switcher */}
            <div className="hidden md:flex items-center rounded-lg border border-stone-800 bg-stone-900/80 p-0.5 text-xs font-medium">
              {(['USD', 'EUR', 'GBP', 'EGP'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                    currentCurrency === curr
                      ? 'bg-[#D6AD60] text-stone-950 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* My Bookings link */}
            <button
              onClick={onOpenMyBookings}
              title={t.nav.myBookings}
              className="hidden lg:flex items-center gap-1 text-xs text-stone-300 hover:text-[#D6AD60] p-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#D6AD60]" />
              <span className="whitespace-nowrap">{t.nav.myBookings}</span>
            </button>

            {/* Primary CTA */}
            <button
              onClick={onOpenBookingModal}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-90 rounded-lg transition-all shadow-md shadow-[#D6AD60]/20 whitespace-nowrap shrink-0 active:scale-95 font-bold"
            >
              {t.nav.bookNow}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-stone-300 hover:text-white"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-4 pt-4 border-t border-stone-800/80 pb-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-300 hover:text-[#D6AD60] py-2 text-base font-medium px-2 rounded-md hover:bg-stone-900/50"
              >
                {link.label}
              </a>
            ))}

            {/* Luxor Points in Mobile Menu */}
            <div className="pt-2 px-2 border-t border-stone-800/80">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoyalty();
                }}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#D6AD60]/20 to-[#181715] border border-[#D6AD60]/40 text-[#D6AD60] text-xs font-semibold flex items-center justify-between hover:bg-[#D6AD60]/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#D6AD60]" />
                  <span className="font-cinzel font-bold">Luxor Points Club ({tier})</span>
                </div>
                <span className="bg-[#D6AD60] text-stone-950 px-2 py-0.5 rounded font-bold text-[11px]">
                  {points.toLocaleString()} PTS
                </span>
              </button>
            </div>

            {/* Voice Command Button in Mobile Menu */}
            <div className="px-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVoiceSearch();
                }}
                className="w-full py-2 px-3 rounded-lg bg-[#D6AD60]/15 border border-[#D6AD60]/40 text-[#D6AD60] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#D6AD60]/25 transition-colors"
              >
                <Mic className="w-4 h-4 animate-pulse text-[#D6AD60]" />
                <span>Voice Search Command</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 px-2 border-t border-stone-800/80">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="text-xs text-stone-300 hover:text-[#D6AD60] flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4 text-[#D6AD60]" />
                <span>{t.nav.myBookings}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-xs text-stone-300 hover:text-white flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.nav.adminDashboard}</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 bg-[#D6AD60] rounded-lg"
              >
                {t.nav.bookNow}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
