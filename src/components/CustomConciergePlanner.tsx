import React, { useState } from 'react';
import { Currency } from '../types';
import { formatPrice } from '../data/luxorData';
import { Sparkles, Calendar, Users, Home, CheckSquare, Send } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface CustomConciergePlannerProps {
  currentCurrency: Currency;
  onOpenBookingModalWithCustom: (summaryText: string, estimatedPriceUSD: number) => void;
}

export const CustomConciergePlanner: React.FC<CustomConciergePlannerProps> = ({
  currentCurrency,
  onOpenBookingModalWithCustom,
}) => {
  const { t } = useI18n();
  const [days, setDays] = useState<number>(3);
  const [partySize, setPartySize] = useState<number>(2);
  const [flatPreference, setFlatPreference] = useState<string>('villa');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'balloon',
    'nefertari',
    'dahabiya',
  ]);

  const activities = [
    { id: 'balloon', name: 'Sunrise Hot Air Balloon Odyssey', baseCost: 110 },
    { id: 'nefertari', name: 'Tomb of Nefertari & Kings Private Access', baseCost: 185 },
    { id: 'dahabiya', name: 'Private Sunset Dahabiya Dinner Cruise', baseCost: 140 },
    { id: 'karnak', name: 'Karnak & Luxor Temple Twilight Walk', baseCost: 95 },
    { id: 'chauffeur', name: 'Dedicated Mercedes Chauffeur (Daily)', baseCost: 140 },
    { id: 'dendera', name: 'Dendera Hathor & Abydos Sacred Expedition', baseCost: 230 },
  ];

  const flatCosts: Record<string, number> = {
    none: 0,
    penthouse: 210,
    villa: 320,
    heritage: 165,
  };

  const calculateEstimate = () => {
    const accommodationTotal = flatCosts[flatPreference] * (days > 1 ? days - 1 : 1);
    const activitiesTotal = selectedActivities.reduce((acc, actId) => {
      const act = activities.find((a) => a.id === actId);
      return acc + (act ? act.baseCost * partySize : 0);
    }, 0);
    return accommodationTotal + activitiesTotal;
  };

  const totalUSD = calculateEstimate();

  const toggleActivity = (id: string) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== id));
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  };

  const handleLaunchInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = `${days}-Day Bespoke Luxor Journey for ${partySize} guests. Accommodation: ${flatPreference}. Experiences: ${selectedActivities.join(', ')}`;
    onOpenBookingModalWithCustom(summary, totalUSD);
  };

  return (
    <section id="planner" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          {t.planner.kicker}
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-2">
          {t.planner.heading}
        </h2>
        <p className="mt-3 text-stone-300 text-sm leading-relaxed">
          {t.planner.desc}
        </p>
      </div>

      {/* Planner Card */}
      <div className="bg-stone-900/90 border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <form onSubmit={handleLaunchInquiry} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Left Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Days & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" /> {t.planner.duration}
                </label>
                <div className="flex items-center gap-2">
                  {[2, 3, 5, 7].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDays(d)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        days === d
                          ? 'bg-[#D4AF37] text-stone-950 shadow-sm'
                          : 'bg-stone-900 text-stone-400 hover:text-white'
                      }`}
                    >
                      {d} {t.planner.days}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[#D4AF37]" /> {t.planner.partySize}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 4, 6].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPartySize(p)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        partySize === p
                          ? 'bg-[#D4AF37] text-stone-950 shadow-sm'
                          : 'bg-stone-900 text-stone-400 hover:text-white'
                      }`}
                    >
                      {p} {p === 1 ? t.hero.guest : t.hero.guests}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Accommodation Selection */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2 mb-3">
                <Home className="w-4 h-4 text-[#D4AF37]" /> {t.planner.accommodation}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'villa', name: 'The Theban Royal Nilefront Villa', desc: 'Private Pool & West Bank Views', rate: 320 },
                  { id: 'penthouse', name: 'Karnak Horizon Penthouse', desc: 'Rooftop Lounge & East Bank City', rate: 210 },
                  { id: 'heritage', name: 'Al-Qurna Heritage Dome Riad', desc: 'Nubian Vaults & Citrus Court', rate: 165 },
                  { id: 'none', name: 'Tour & Transport Only', desc: 'Already have hotel arranged', rate: 0 },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFlatPreference(item.id)}
                    className={`p-3.5 rounded-xl border text-start transition-all ${
                      flatPreference === item.id
                        ? 'bg-stone-950 border-[#D4AF37] shadow-md shadow-[#D4AF37]/10'
                        : 'bg-stone-950/40 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white">{item.name}</div>
                    <div className="text-[11px] text-stone-300 mt-0.5">{item.desc}</div>
                    <div className="text-[11px] text-[#D4AF37] mt-1 font-semibold">
                      {item.rate > 0 ? `${formatPrice(item.rate, currentCurrency)} / ${t.hero.night}` : t.planner.noLodging}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Experiences to Include */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2 mb-3">
                <CheckSquare className="w-4 h-4 text-[#D4AF37]" /> {t.planner.activities}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activities.map((act) => {
                  const isChecked = selectedActivities.includes(act.id);
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => toggleActivity(act.id)}
                      className={`p-3 rounded-xl border text-start transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-stone-950/90 border-[#D4AF37] text-white'
                          : 'bg-stone-950/30 border-stone-800/80 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-xs font-medium pe-2 truncate">
                        {act.name}
                      </div>
                      <div className="text-[11px] text-[#D4AF37] font-bold shrink-0">
                        +{formatPrice(act.baseCost, currentCurrency)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estimate & Concierge Booking Box Right Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-stone-950/80 border border-[#D4AF37]/30 rounded-2xl p-6 lg:p-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{t.planner.summaryTitle}</span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white mb-4">
                {t.planner.proposal}
              </h3>

              <div className="space-y-3 text-xs text-stone-300 border-y border-stone-800 py-4 mb-6">
                <div className="flex justify-between">
                  <span>{t.planner.duration}:</span>
                  <strong className="text-white">
                    {days} {t.planner.days}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>{t.planner.partySize}:</span>
                  <strong className="text-white">
                    {partySize} {partySize === 1 ? t.hero.guest : t.hero.guests}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>{t.planner.accommodation}:</span>
                  <strong className="text-white capitalize">
                    {flatPreference === 'none' ? t.planner.noLodging : flatPreference}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>{t.planner.activities}:</span>
                  <strong className="text-white">{selectedActivities.length}</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-800/60">
                  <span>VIP Chauffeur:</span>
                  <strong className="text-emerald-400">{t.planner.included}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Egyptologist:</span>
                  <strong className="text-emerald-400">{t.planner.licensedGuide}</strong>
                </div>
              </div>

              {/* Estimated Total */}
              <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-xl mb-6">
                <div className="text-[11px] uppercase tracking-wider text-stone-400">
                  {t.planner.totalForGuests}
                </div>
                <div className="font-cinzel text-3xl font-bold text-gold-gradient mt-1 tabular-nums">
                  {formatPrice(totalUSD, currentCurrency)}
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  {t.planner.inclusive}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#DFB15B] to-[#D4AF37] hover:from-[#ECC94B] hover:to-[#DFB15B] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>{t.planner.lockIn}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
