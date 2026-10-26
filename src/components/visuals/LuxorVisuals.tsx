import React from 'react';

// Hot Air Balloon Sunrise Artwork
export const BalloonSunriseVisual: React.FC<{ className?: string }> = ({ className = 'h-64' }) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#1b1931] via-[#854048] to-[#e49354] ${className}`}>
      {/* Sun glow */}
      <div className="absolute -bottom-8 left-1/3 h-48 w-48 rounded-full bg-gradient-to-t from-[#ffd479] via-[#ff9b42] to-transparent blur-2xl opacity-80" />

      {/* Theban mountain silhouettes */}
      <svg className="absolute bottom-0 w-full h-32 text-[#24131b]" viewBox="0 0 1200 320" preserveAspectRatio="none">
        <path d="M0 320 L0 180 Q150 120 320 210 T700 140 Q880 80 1020 220 T1200 160 L1200 320 Z" fill="currentColor" opacity="0.6" />
        <path d="M0 320 L0 220 Q200 160 420 250 T820 180 Q980 140 1200 240 L1200 320 Z" fill="#130a10" />
      </svg>

      {/* Nile River shimmer */}
      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-r from-[#1c182d] via-[#d47638] to-[#1c182d] opacity-50 blur-[2px]" />

      {/* Hot Air Balloons with subtle motion */}
      <div className="absolute top-6 left-1/4 animate-bounce" style={{ animationDuration: '6s' }}>
        <svg width="68" height="92" viewBox="0 0 100 140" fill="none" className="drop-shadow-lg">
          <ellipse cx="50" cy="50" rx="42" ry="48" fill="url(#balloonGrad1)" />
          {/* Stripes */}
          <path d="M25 50 C25 20 75 20 75 50 C75 80 25 80 25 50 Z" stroke="#FFDF00" strokeWidth="3" opacity="0.7" />
          <path d="M50 2 C65 25 65 75 50 98 C35 75 35 25 50 2 Z" fill="#D4AF37" opacity="0.4" />
          {/* Burner flame glow */}
          <circle cx="50" cy="104" r="5" fill="#FFA500" className="animate-pulse" />
          {/* Basket ropes and basket */}
          <line x1="38" y1="98" x2="42" y2="114" stroke="#4A2E12" strokeWidth="1.5" />
          <line x1="62" y1="98" x2="58" y2="114" stroke="#4A2E12" strokeWidth="1.5" />
          <rect x="40" y="114" width="20" height="14" rx="2" fill="#784212" stroke="#B7950B" strokeWidth="1" />
          <defs>
            <radialGradient id="balloonGrad1" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="35%" stopColor="#E05638" />
              <stop offset="70%" stopColor="#8E2800" />
              <stop offset="100%" stopColor="#461000" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Distant secondary balloon */}
      <div className="absolute top-12 right-1/4 scale-75 opacity-90 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}>
        <svg width="45" height="60" viewBox="0 0 100 140" fill="none">
          <ellipse cx="50" cy="50" rx="40" ry="46" fill="url(#balloonGrad2)" />
          <rect x="42" y="112" width="16" height="12" rx="2" fill="#4A2E12" />
          <defs>
            <radialGradient id="balloonGrad2" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#85E3FF" />
              <stop offset="60%" stopColor="#0B4F6C" />
              <stop offset="100%" stopColor="#011926" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Third tiny balloon */}
      <div className="absolute top-20 right-12 scale-50 opacity-70">
        <svg width="35" height="50" viewBox="0 0 100 140" fill="none">
          <ellipse cx="50" cy="50" rx="38" ry="44" fill="#D4AF37" />
          <rect x="44" y="110" width="12" height="10" rx="1" fill="#222" />
        </svg>
      </div>
    </div>
  );
};

// Karnak Great Hypostyle Hall Artwork
export const KarnakPillarsVisual: React.FC<{ className?: string }> = ({ className = 'h-64' }) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#13151b] via-[#211a18] to-[#120f0e] ${className}`}>
      {/* Sun rays from above */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/25 via-transparent to-transparent" />

      {/* Stone Pillars */}
      <div className="absolute inset-0 flex justify-around items-end px-4 pb-0 opacity-90">
        {[0, 1, 2, 3].map((idx) => (
          <div key={idx} className="relative w-16 lg:w-20 bg-gradient-to-r from-[#8C6D46] via-[#B89668] to-[#5C452C] rounded-t-sm shadow-2xl flex flex-col items-center justify-between py-2 border-t-4 border-[#DFB15B]" style={{ height: `${85 + (idx % 2) * 10}%` }}>
            {/* Papyrus capital at top */}
            <div className="w-20 lg:w-24 -mt-3 h-6 bg-gradient-to-b from-[#DFB15B] to-[#8C6D46] rounded-t-lg shadow" />
            {/* Hieroglyphic carvings simulation */}
            <div className="w-full flex-1 flex flex-col justify-around items-center px-1 py-4 opacity-40 text-[9px] font-mono text-amber-200">
              <span>𓇳 𓁹 𓈖</span>
              <span>𓆣 𓏛 𓏤</span>
              <span>𓉐 𓌻 𓇋</span>
              <span>𓅃 𓊹 𓊪</span>
              <span>𓋹 𓍹𓇳𓏠𓈖𓍺</span>
            </div>
            {/* Pillar base */}
            <div className="w-20 lg:w-24 h-4 bg-[#3E2E1E] rounded-b-sm" />
          </div>
        ))}
      </div>

      {/* Atmospheric dust motes */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#DFB15B_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
    </div>
  );
};

// Luxury Nilefront Villa Artwork
export const LuxuryVillaVisual: React.FC<{ className?: string }> = ({ className = 'h-64' }) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#0B1522] via-[#102436] to-[#0A1118] ${className}`}>
      {/* Night Sky with subtle stars */}
      <div className="absolute top-4 right-8 w-12 h-12 rounded-full border-r-2 border-amber-100/70 rotate-12 blur-[0.5px]" />
      
      {/* Villa Arches & Terraces */}
      <div className="absolute bottom-12 inset-x-4 h-36 bg-[#E8D8C3] rounded-t-2xl shadow-2xl p-4 flex flex-col justify-between border border-[#DFB15B]/40">
        <div className="flex justify-around items-center pt-2">
          {/* Moorish / Egyptian Sandstone Arches */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-16 h-20 bg-[#2A1E17] rounded-t-full border-2 border-[#D4AF37]/60 flex items-center justify-center relative overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 blur-sm" />
              <div className="absolute bottom-1 w-2 h-4 bg-amber-300 rounded-sm shadow-amber-300 shadow-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Glowing Turquoise Swimming Pool */}
      <div className="absolute bottom-0 inset-x-8 h-12 bg-gradient-to-t from-[#06b6d4] via-[#0891b2] to-[#0e7490] rounded-t-lg shadow-cyan-500/40 shadow-xl opacity-90 border-t border-cyan-200/50">
        <div className="w-full h-full opacity-40 bg-[radial-gradient(circle,_rgba(255,255,255,0.8)_1px,_transparent_1px)] [background-size:12px_8px]" />
      </div>

      {/* Date Palm silhouettes */}
      <div className="absolute bottom-6 left-2 opacity-60 text-emerald-950 font-serif text-3xl">🌴</div>
      <div className="absolute bottom-6 right-2 opacity-60 text-emerald-950 font-serif text-3xl">🌴</div>
    </div>
  );
};

// VIP Mercedes & Chauffeur Fleet Artwork
export const VipFleetVisual: React.FC<{ className?: string }> = ({ className = 'h-64' }) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#090A0D] via-[#12141A] to-[#07080A] ${className}`}>
      {/* Grand Hotel Columns background */}
      <div className="absolute inset-x-0 top-0 h-32 flex justify-between px-8 opacity-25">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-6 h-full bg-amber-100/50 rounded-t-sm" />
        ))}
      </div>

      {/* Warm Ambient Hotel Lantern Glow */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 h-20 bg-amber-500/20 rounded-full blur-2xl" />

      {/* Executive Black Luxury Limousine Shape */}
      <div className="absolute bottom-6 inset-x-6 h-28 flex flex-col justify-end">
        {/* Car Silhouette */}
        <div className="relative w-full h-20 bg-gradient-to-b from-[#2B2E3A] via-[#15171C] to-[#0B0C0E] rounded-t-3xl border-t border-[#DFB15B]/50 shadow-2xl p-2">
          {/* Windows with tint */}
          <div className="flex justify-center gap-2 mt-1">
            <div className="w-20 h-6 bg-cyan-950/80 rounded-tl-xl border border-white/20" />
            <div className="w-24 h-6 bg-cyan-950/80 rounded-tr-xl border border-white/20" />
          </div>

          {/* Headlights & Gold Emblem */}
          <div className="absolute bottom-3 left-4 w-4 h-4 rounded-full bg-amber-200 shadow-lg shadow-amber-300" />
          <div className="absolute bottom-3 right-4 w-4 h-4 rounded-full bg-red-600/80 shadow-lg shadow-red-500/50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#DFB15B] text-xs font-cinzel font-bold tracking-widest">
            VIP CHAUFFEUR
          </div>
        </div>

        {/* Wheels */}
        <div className="flex justify-between px-8 -mt-3 z-10">
          <div className="w-9 h-9 rounded-full bg-[#1A1C23] border-2 border-[#DFB15B] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#DFB15B]" />
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1A1C23] border-2 border-[#DFB15B] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#DFB15B]" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Traditional Felucca Nile Sunset Artwork
export const FeluccaSunsetVisual: React.FC<{ className?: string }> = ({ className = 'h-64' }) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#211124] via-[#7B2E3D] to-[#D47E3B] ${className}`}>
      {/* Setting Sun */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-[#FCE38A] shadow-[0_0_50px_#F38181] blur-[1px]" />

      {/* Nile River Waters */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#14121F] via-[#3F1E29] to-[#8C3F2D] border-t border-amber-300/40">
        {/* Ripples */}
        <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse,_rgba(255,230,150,0.9)_1px,_transparent_1px)] [background-size:28px_6px]" />
      </div>

      {/* Felucca Boat Silhouette */}
      <div className="absolute bottom-8 left-1/3 -translate-x-1/2 flex flex-col items-center">
        {/* Triangular Lateen Sail */}
        <div
          className="w-0 h-0 border-l-[32px] border-l-transparent border-b-[68px] border-b-amber-50/95 border-r-[4px] border-r-transparent drop-shadow-md -rotate-6"
        />
        {/* Mast */}
        <div className="w-1 h-20 bg-[#3B2219] -mt-16 rotate-12 -z-0" />
        {/* Wooden Hull */}
        <div className="w-24 h-4 bg-[#21130D] rounded-b-xl border-t border-amber-400/40 -mt-1" />
      </div>
    </div>
  );
};
