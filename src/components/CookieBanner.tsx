import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('luxor_vip_cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const accept = () => {
    try {
      localStorage.setItem('luxor_vip_cookie_consent', 'accepted');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 start-4 end-4 sm:end-auto sm:max-w-md z-40 bg-[#181715]/95 border border-[#D6AD60]/40 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-stone-200 text-xs animate-fadeIn">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#D6AD60] shrink-0 mt-0.5" />
        <div>
          <p className="leading-relaxed">
            We use essential cookies and regional preferences to remember your language, currency, and verified booking cart.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={accept}
              className="px-4 py-1.5 bg-[#D6AD60] text-[#101D2B] font-bold text-[11px] uppercase tracking-wider rounded-lg hover:bg-[#E9D8B5] transition-colors"
            >
              Accept Preferences
            </button>
            <button
              onClick={() => setVisible(false)}
              className="px-3 py-1.5 text-[11px] text-stone-400 hover:text-white"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
