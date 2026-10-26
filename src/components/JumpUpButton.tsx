import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';

export const JumpUpButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { isRTL } = useI18n();

  // Motion scroll progress for top luxury gold reading bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, Math.round(progress))));
      setIsVisible(scrollTop > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circumference for circular progress ring (radius = 20)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <>
      {/* 1. Global Scroll Progress Indicator Bar at the very top of the window */}
      <motion.div
        style={{ scaleX, transformOrigin: isRTL ? 'right' : 'left' }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B88E3E] via-[#D6AD60] to-[#E9D8B5] z-[100] shadow-[0_0_12px_rgba(214,173,96,0.8)] pointer-events-none"
      />

      {/* 2. Floating Jump Up Arrow Button with Circular Progress & Gold Glow */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`fixed bottom-6 z-40 ${
              isRTL ? 'right-6 sm:right-8' : 'left-6 sm:left-8'
            }`}
          >
            <button
              type="button"
              onClick={scrollToTop}
              title={isRTL ? 'الصعود لأعلى الصفحة' : 'Jump up to top of page'}
              aria-label={isRTL ? 'الصعود لأعلى الصفحة' : 'Jump up to top of page'}
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#101D2B]/95 hover:bg-[#181715] text-[#D6AD60] border border-[#D6AD60]/40 hover:border-[#D6AD60] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD60]"
            >
              {/* Radial Golden Aura Glow on Hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D6AD60]/20 via-[#B88E3E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />

              {/* SVG Circular Scroll Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
                viewBox="0 0 48 48"
              >
                {/* Background Ring Track */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="stroke-stone-800/80 fill-none"
                  strokeWidth="2.5"
                />
                {/* Dynamic Golden Fill Ring */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="stroke-[#D6AD60] fill-none transition-all duration-150 ease-out"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>

              {/* Jump Up Arrow Icon with upward bounce hover animation */}
              <div className="relative flex items-center justify-center">
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#E9D8B5] group-hover:text-white transition-all duration-300 group-hover:-translate-y-1" />
              </div>

              {/* Hover Tooltip Pill */}
              <div
                className={`absolute bottom-full mb-2.5 hidden sm:group-hover:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#181715]/95 border border-[#D6AD60]/40 text-[11px] font-semibold text-[#E9D8B5] shadow-xl whitespace-nowrap pointer-events-none transition-all duration-200 ${
                  isRTL ? 'left-0' : 'right-0'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#D6AD60]" />
                <span>{isRTL ? 'الصعود لأعلى' : 'Jump Up'}</span>
                <span className="text-stone-400 font-mono text-[10px]">
                  ({scrollPercent}%)
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
