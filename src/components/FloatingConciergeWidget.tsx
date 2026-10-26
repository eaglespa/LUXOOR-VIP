import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface FloatingConciergeWidgetProps {
  onOpenBooking: () => void;
}

export const FloatingConciergeWidget: React.FC<FloatingConciergeWidgetProps> = ({
  onOpenBooking,
}) => {
  const { t, isRTL } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      message ||
        (isRTL
          ? 'مرحباً LUXOR.VIP، أود الاستفسار عن حجز تجربة فاخرة في الأقصر.'
          : 'Hello LUXOR.VIP, I would like to inquire about booking a luxury experience in Luxor.')
    );
    window.open(`https://wa.me/201000000000?text=${text}`, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40`}>
      {/* Quick Concierge Drawer Modal */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-stone-900 border border-[#D4AF37]/50 rounded-2xl shadow-2xl p-5 text-start text-white animate-fadeIn backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                {t.concierge.desk}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed mb-4">
            {t.concierge.welcome}
          </p>

          <form onSubmit={handleSendWhatsApp} className="space-y-3">
            <textarea
              rows={2}
              required
              placeholder={t.concierge.placeholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Send className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>{t.concierge.connectWhatsApp}</span>
            </button>
          </form>

          <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <span dir="ltr">+20 100 234 5678</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="text-[#D4AF37] hover:underline font-semibold"
            >
              {t.concierge.onlinePass}
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-[#0A0B0E] border border-[#D4AF37]/60 hover:border-[#D4AF37] text-white rounded-full shadow-2xl shadow-[#D4AF37]/20 hover:scale-105 active:scale-95 transition-all group"
        aria-label="Open VIP Concierge"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#DFB15B] to-[#D4AF37] flex items-center justify-center text-stone-950 shadow-sm">
          <MessageCircle className="w-4 h-4" />
        </div>
        <span className="text-xs font-cinzel font-bold tracking-wider text-gold-gradient hidden sm:inline">
          {t.concierge.ctaButton}
        </span>
      </button>
    </div>
  );
};
