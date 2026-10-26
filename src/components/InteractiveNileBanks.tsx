import React, { useState } from 'react';
import { LANDMARKS } from '../data/luxorData';
import { Landmark } from '../types';
import { Sun, Moon, MapPin, Compass, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';

export const InteractiveNileBanks: React.FC = () => {
  const { t } = useI18n();
  const [activeBank, setActiveBank] = useState<'east' | 'west'>('west');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark>(LANDMARKS[2]); // Valley of Kings

  const landmarksForBank = LANDMARKS.filter((l) => l.bank === activeBank);

  return (
    <section id="nile-banks" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          {t.nileBanks.kicker}
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-2">
          {t.nileBanks.heading}
        </h2>
        <p className="mt-3 text-stone-300 text-sm leading-relaxed">
          {t.nileBanks.desc}
        </p>

        {/* Bank Selector Switch */}
        <div className="inline-flex p-1.5 bg-stone-900 border border-stone-800 rounded-2xl mt-8">
          <button
            onClick={() => {
              setActiveBank('west');
              const first = LANDMARKS.find((l) => l.bank === 'west');
              if (first) setSelectedLandmark(first);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeBank === 'west'
                ? 'bg-gradient-to-r from-[#DFB15B] to-[#D4AF37] text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>{t.nileBanks.westBankTab}</span>
          </button>
          <button
            onClick={() => {
              setActiveBank('east');
              const first = LANDMARKS.find((l) => l.bank === 'east');
              if (first) setSelectedLandmark(first);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeBank === 'east'
                ? 'bg-gradient-to-r from-[#DFB15B] to-[#D4AF37] text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>{t.nileBanks.eastBankTab}</span>
          </button>
        </div>
      </div>

      {/* Interactive Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Landmark List for Active Bank */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 px-1 mb-2">
            {t.nileBanks.selectMonument}
          </div>
          {landmarksForBank.map((landmark) => {
            const isSelected = selectedLandmark.id === landmark.id;
            return (
              <button
                key={landmark.id}
                onClick={() => setSelectedLandmark(landmark)}
                className={`w-full text-start p-4 rounded-xl border transition-all flex items-start justify-between ${
                  isSelected
                    ? 'bg-stone-900/90 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : 'bg-stone-950/40 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4AF37]' : 'text-stone-300'}`} />
                    <span className={`font-cinzel text-sm font-bold ${isSelected ? 'text-white' : 'text-stone-300'}`}>
                      {landmark.name}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-300 mt-1 ps-5">
                    {landmark.century}
                  </div>
                </div>
                {isSelected && (
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                )}
              </button>
            );
          })}

          {/* Quick Bank Summary Card */}
          <div className="p-4 rounded-xl bg-stone-900/30 border border-stone-800/60 text-xs text-stone-400 mt-4 leading-relaxed">
            <span className="font-semibold text-stone-300 block mb-1">
              {activeBank === 'west' ? t.nileBanks.westBankEssence : t.nileBanks.eastBankEssence}
            </span>
            {activeBank === 'west' ? t.nileBanks.westBankSummary : t.nileBanks.eastBankSummary}
          </div>
        </div>

        {/* Right: Detailed Archaeological Dossier */}
        <div className="lg:col-span-7 bg-[#142334]/80 border border-[#D6AD60]/40 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Subtle Background Egyptian Glyph Watermark */}
          <div className="absolute top-2 end-4 text-7xl text-[#D6AD60]/5 font-serif select-none pointer-events-none">
            𓇳 𓋹
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLandmark.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D6AD60] font-semibold">
                    {t.nileBanks.dossier}
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                    {selectedLandmark.name}
                  </h3>
                </div>
                <div className="text-end">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block">
                    {t.nileBanks.era}
                  </span>
                  <span className="text-xs text-[#D6AD60] font-medium">
                    {selectedLandmark.century}
                  </span>
                </div>
              </div>

              <p className="text-sm text-stone-200 leading-relaxed mb-6 font-light">
                {selectedLandmark.brief}
              </p>

              {/* Defining Architectural Features */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#D6AD60]" />
                  {t.nileBanks.highlights}
                </h4>
                <div className="space-y-2">
                  {selectedLandmark.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-stone-300 bg-[#101D2B]/90 p-2.5 rounded-lg border border-stone-800/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD60] mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curatorial Insider Tip */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#D6AD60]/15 via-[#181715] to-[#101D2B] border border-[#D6AD60]/40 text-xs text-amber-200/90 flex items-start gap-2.5 shadow-md">
                <Info className="w-4 h-4 text-[#D6AD60] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">
                    {t.nileBanks.tipTitle}
                  </strong>
                  {selectedLandmark.tip}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
