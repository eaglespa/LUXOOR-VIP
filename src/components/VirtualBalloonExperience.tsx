import React, { useState } from 'react';
import { Flame, Compass, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { ambientSound } from '../utils/ambientAudio';
import { useI18n } from '../i18n/I18nContext';

interface VirtualBalloonExperienceProps {
  onBookBalloon: () => void;
}

export const VirtualBalloonExperience: React.FC<VirtualBalloonExperienceProps> = ({
  onBookBalloon,
}) => {
  const { t } = useI18n();
  const [altitude, setAltitude] = useState<number>(1800); // 500 to 2500 ft
  const [timeStage, setTimeStage] = useState<'dawn' | 'sunrise' | 'golden'>('sunrise');
  const [isBurning, setIsBurning] = useState<boolean>(false);

  const handleBurnerPulse = () => {
    setIsBurning(true);
    ambientSound.playBurnerPulse();
    setTimeout(() => {
      setIsBurning(false);
    }, 1200);
  };

  // Sky styles based on time stage
  const getSkyGradient = () => {
    switch (timeStage) {
      case 'dawn':
        return 'from-[#141226] via-[#36203D] to-[#733B4E]';
      case 'sunrise':
        return 'from-[#181C38] via-[#7B3547] to-[#DF7A3E]';
      case 'golden':
        return 'from-[#213555] via-[#A86438] to-[#E5A93B]';
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          {t.balloon.kicker}
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-2">
          {t.balloon.heading}
        </h2>
        <p className="mt-3 text-stone-300 text-sm leading-relaxed">
          {t.balloon.desc}
        </p>
      </div>

      {/* Simulator Cockpit Container */}
      <div className="bg-stone-900 border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Top Control Bar */}
        <div className="bg-[#0A0B0E]/90 border-b border-stone-800 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          {/* Telemetry unboxed text */}
          <div className="flex items-center gap-6 text-xs text-stone-300">
            <div>
              <span className="text-[10px] uppercase text-stone-400 block">{t.balloon.corridor}</span>
              <span className="font-medium text-white flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> West Bank / Theban Valleys
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-400 block">{t.balloon.altitude}</span>
              <span className="font-mono text-sm font-bold text-[#D4AF37] tabular-nums">
                {altitude.toLocaleString()} FT
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-stone-400 block">{t.balloon.wind}</span>
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                4.2 KTS · Calm
              </span>
            </div>
          </div>

          {/* Time Stage Switcher */}
          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
            {[
              { id: 'dawn', label: t.balloon.dawnMist },
              { id: 'sunrise', label: t.balloon.sunriseFlash },
              { id: 'golden', label: t.balloon.goldenSands },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setTimeStage(st.id as typeof timeStage)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  timeStage === st.id
                    ? 'bg-[#D4AF37] text-stone-950 shadow-sm font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Viewport Frame */}
        <div
          className={`relative h-[420px] sm:h-[480px] w-full overflow-hidden bg-gradient-to-b ${getSkyGradient()} transition-colors duration-1000 flex flex-col justify-between`}
        >
          {/* Sun disc */}
          <div
            className={`absolute rounded-full transition-all duration-1000 blur-[2px] ${
              timeStage === 'dawn'
                ? 'w-24 h-24 -bottom-6 left-1/3 bg-amber-400/40 opacity-40'
                : timeStage === 'sunrise'
                ? 'w-32 h-32 bottom-20 left-1/2 -translate-x-1/2 bg-[#FFDF78] shadow-[0_0_80px_#FFA500]'
                : 'w-36 h-36 top-16 left-2/3 bg-[#FFF38A] shadow-[0_0_100px_#FFD700]'
            }`}
          />

          {/* Landscape Mountain range with perspective scaling according to altitude */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none transition-transform duration-700 ease-out"
            style={{
              transform: `scale(${1 + (2500 - altitude) / 3000}) translateY(${((2500 - altitude) / 2500) * 30}px)`,
            }}
          >
            {/* Theban Cliffs Silhouettes */}
            <svg viewBox="0 0 1440 380" className="w-full text-[#1A1215]" preserveAspectRatio="none">
              <path
                d="M0 380 L0 190 Q120 120 280 180 T600 110 Q780 70 940 180 T1440 120 L1440 380 Z"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M0 380 L0 230 Q220 170 480 260 T980 180 Q1180 140 1440 230 L1440 380 Z"
                fill="#0E0A0C"
              />
            </svg>

            {/* Glowing Nile River at the base */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-r from-[#0C1521] via-[#D47E3B]/60 to-[#0C1521] blur-[1px]" />
          </div>

          {/* Interactive Landmark Radar Hotspots */}
          <div className="relative w-full h-full p-6 pointer-events-auto">
            {/* Hatshepsut Temple Pin */}
            <div className="absolute top-[48%] left-[22%] -translate-x-1/2 group cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-[#DFB15B] animate-ping" />
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[#DFB15B] shadow-lg" />
              <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-stone-950/95 border border-[#D4AF37] p-2.5 rounded-xl text-start text-xs text-stone-200 z-30 shadow-2xl">
                <span className="font-bold text-[#D4AF37] block">Hatshepsut Terraces</span>
                Terraced limestone mortuary sanctuary cut into cliffs at Deir el-Bahari.
              </div>
            </div>

            {/* Valley of Kings Pin */}
            <div className="absolute top-[38%] left-[52%] -translate-x-1/2 group cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-cyan-400 shadow-lg" />
              <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-stone-950/95 border border-cyan-400 p-2.5 rounded-xl text-start text-xs text-stone-200 z-30 shadow-2xl">
                <span className="font-bold text-cyan-300 block">Valley of the Kings</span>
                Tombs of Tutankhamun, Ramesses II & 60+ pharaonic burial crypts.
              </div>
            </div>

            {/* Colossi of Memnon Pin */}
            <div className="absolute top-[62%] right-[28%] -translate-x-1/2 group cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-amber-300 animate-ping" />
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-amber-300 shadow-lg" />
              <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-stone-950/95 border border-amber-300 p-2.5 rounded-xl text-start text-xs text-stone-200 z-30 shadow-2xl">
                <span className="font-bold text-amber-200 block">Colossi of Memnon</span>
                Twin 18m quartzite guardians erected by Pharaoh Amenhotep III.
              </div>
            </div>
          </div>

          {/* Balloon Basket & Burner Foreground Rig */}
          <div className="relative w-full flex flex-col items-center justify-end pb-4 pointer-events-none z-20">
            {/* Burner Flame FX */}
            {isBurning && (
              <div className="w-20 h-28 -mb-6 bg-gradient-to-t from-transparent via-[#FF8C00] to-[#FFF44F] rounded-full blur-md animate-pulse z-20" />
            )}

            {/* Top Burner Rig & Envelope Cables */}
            <div className="w-48 h-12 flex justify-between px-8 relative">
              <div className="w-0.5 h-full bg-stone-400 rotate-12" />
              {/* Burner nozzle */}
              <div className="w-8 h-4 bg-stone-800 rounded-sm border border-amber-500/80 shadow" />
              <div className="w-0.5 h-full bg-stone-400 -rotate-12" />
            </div>

            {/* Wicker Basket Edge */}
            <div className="w-72 sm:w-96 h-14 bg-gradient-to-b from-[#5C3B1E] to-[#2E1A0A] rounded-t-2xl border-t-2 border-[#D4AF37]/60 shadow-2xl flex items-center justify-center text-xs font-cinzel text-amber-200/90 tracking-widest pointer-events-auto">
              LUXOR.VIP · ROYAL FLIGHT NO. 01
            </div>
          </div>
        </div>

        {/* Bottom Cockpit Interactive Bar */}
        <div className="bg-[#0A0B0E] p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-t border-stone-800">
          {/* Burner Trigger */}
          <button
            type="button"
            onClick={handleBurnerPulse}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/30 text-amber-200 font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
          >
            <Flame className={`w-4 h-4 text-amber-400 ${isBurning ? 'animate-bounce' : ''}`} />
            <span>{t.balloon.igniteBurner}</span>
          </button>

          {/* Altitude Slider Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400 font-medium">{t.balloon.altitude}:</span>
            <button
              onClick={() => setAltitude(Math.max(500, altitude - 300))}
              className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white"
              title={t.balloon.descend}
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <input
              type="range"
              min="500"
              max="2500"
              step="100"
              value={altitude}
              onChange={(e) => setAltitude(Number(e.target.value))}
              className="w-32 sm:w-48 accent-[#D4AF37] cursor-pointer"
            />
            <button
              onClick={() => setAltitude(Math.min(2500, altitude + 300))}
              className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white"
              title={t.balloon.ascend}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Book Flight CTA */}
          <button
            onClick={onBookBalloon}
            className="px-6 py-3 bg-gradient-to-r from-[#DFB15B] to-[#D4AF37] hover:from-[#ECC94B] hover:to-[#DFB15B] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.balloon.reserveFlight}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
