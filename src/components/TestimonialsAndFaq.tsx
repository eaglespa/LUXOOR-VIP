import React, { useState } from 'react';
import { REVIEWS, FAQS } from '../data/luxorData';
import { Star, ChevronDown, ChevronUp, ShieldCheck, Award } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const TestimonialsAndFaq: React.FC = () => {
  const { t } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      {/* Proof KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[#D4AF37] mb-2">
            <Award className="w-5 h-5" />
            <span className="font-cinzel text-3xl font-bold text-white tabular-nums">4,200+</span>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-300">
            {t.reviews.flightsFlown}
          </div>
          <p className="text-[11px] text-stone-300 mt-1">
            {t.reviews.flightsSub}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-2">
            <Star className="w-5 h-5 fill-amber-400" />
            <span className="font-cinzel text-3xl font-bold text-white tabular-nums">4.98 / 5.0</span>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-300">
            {t.reviews.score}
          </div>
          <p className="text-[11px] text-stone-300 mt-1">
            {t.reviews.scoreSub}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="font-cinzel text-3xl font-bold text-white tabular-nums">100%</span>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-300">
            {t.reviews.meetAssist}
          </div>
          <p className="text-[11px] text-stone-300 mt-1">
            {t.reviews.meetAssistSub}
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            {t.reviews.endorsementsKicker}
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-2">
            {t.reviews.endorsementsHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-900/60 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xs text-stone-300 leading-relaxed italic mb-4 font-editorial">
                  “{rev.quote}”
                </blockquote>
              </div>

              <div className="pt-4 border-t border-stone-800/80">
                <div className="text-xs font-bold text-white">{rev.author}</div>
                <div className="text-[11px] text-[#D4AF37]">{rev.origin}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{rev.experience} · {rev.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            {t.reviews.faqKicker}
          </span>
          <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
            {t.reviews.faqHeading}
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-stone-900/70 border border-stone-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-start p-5 flex items-center justify-between gap-4"
                >
                  <span className="text-sm font-semibold text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-stone-300 leading-relaxed border-t border-stone-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
