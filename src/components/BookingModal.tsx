import React, { useState } from 'react';
import {
  Currency,
  ServiceCategory,
  TourItem,
  FlatItem,
  TransportItem,
  BookingDetails,
} from '../types';
import { TOURS_DATA, FLATS_DATA, TRANSPORT_DATA, VIP_ADDONS, formatPrice } from '../data/luxorData';
import {
  X,
  Calendar,
  Clock,
  Users,
  MapPin,
  ShieldCheck,
  Download,
  Sparkles,
  MessageCircle,
  Crown,
  Tag,
  Gift,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useLoyalty } from '../hooks/useLoyalty';
import { REWARD_CATALOG, TIER_BENEFITS } from '../utils/loyaltyService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  initialCategory?: ServiceCategory;
  initialItem?: TourItem | FlatItem | TransportItem | null;
  customSummary?: string;
  customEstimatedPriceUSD?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  initialCategory = 'tours',
  initialItem = null,
  customSummary,
  customEstimatedPriceUSD,
}) => {
  const { t, isRTL } = useI18n();
  if (!isOpen) return null;

  const [category, setCategory] = useState<ServiceCategory>(initialCategory);
  const [selectedTourId, setSelectedTourId] = useState<string>(
    initialItem && 'highlights' in initialItem ? initialItem.id : TOURS_DATA[0].id
  );
  const [selectedFlatId, setSelectedFlatId] = useState<string>(
    initialItem && 'bedrooms' in initialItem ? initialItem.id : FLATS_DATA[0].id
  );
  const [selectedTransportId, setSelectedTransportId] = useState<string>(
    initialItem && 'vehicleType' in initialItem ? initialItem.id : TRANSPORT_DATA[0].id
  );

  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('04:45 AM (Dawn Ascent)');
  const [nights, setNights] = useState<number>(3);
  const [guests, setGuests] = useState<number>(2);
  const [pickupLocation, setPickupLocation] = useState<string>('Hotel or Nile Cruise in Luxor');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['addon-egyptologist']);

  // Guest details
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Luxor Points Loyalty Integration
  const { points: userPoints, tier: userTier, earnPoints, redeemReward } = useLoyalty();
  const [selectedRewardId, setSelectedRewardId] = useState<string>('none');
  const [bookingPointsEarned, setBookingPointsEarned] = useState<number>(0);
  const [appliedRewardTitle, setAppliedRewardTitle] = useState<string | null>(null);

  // Confirmation state
  const [confirmation, setConfirmation] = useState<BookingDetails | null>(null);

  // Price calculation
  const calculateBaseTotal = (): number => {
    if (customEstimatedPriceUSD && customSummary) {
      return customEstimatedPriceUSD;
    }

    let base = 0;
    if (category === 'tours') {
      const tour = TOURS_DATA.find((t) => t.id === selectedTourId) || TOURS_DATA[0];
      base = tour.priceUSD * guests;
    } else if (category === 'flats') {
      const flat = FLATS_DATA.find((f) => f.id === selectedFlatId) || FLATS_DATA[0];
      base = flat.pricePerNightUSD * nights;
    } else if (category === 'transport') {
      const trans = TRANSPORT_DATA.find((t) => t.id === selectedTransportId) || TRANSPORT_DATA[0];
      base = trans.priceUSD;
    }

    const addonsCost = selectedAddons.reduce((sum, addonId) => {
      const item = VIP_ADDONS.find((a) => a.id === addonId);
      return sum + (item ? item.priceUSD : 0);
    }, 0);

    return base + addonsCost;
  };

  const selectedReward = REWARD_CATALOG.find((r) => r.id === selectedRewardId);
  const discountUSD = selectedReward?.discountUSD || 0;
  const subtotalUSD = calculateBaseTotal();
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);
  const tierMultiplier = TIER_BENEFITS[userTier].multiplier;
  const projectedPointsToEarn = Math.max(10, Math.round(totalUSD * tierMultiplier));

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let title = '';
    let itemId = '';

    if (customSummary) {
      title = customSummary;
      itemId = 'custom-concierge';
    } else if (category === 'tours') {
      const tour = TOURS_DATA.find((t) => t.id === selectedTourId) || TOURS_DATA[0];
      title = tour.title;
      itemId = tour.id;
    } else if (category === 'flats') {
      const flat = FLATS_DATA.find((f) => f.id === selectedFlatId) || FLATS_DATA[0];
      title = flat.name;
      itemId = flat.id;
    } else {
      const trans = TRANSPORT_DATA.find((t) => t.id === selectedTransportId) || TRANSPORT_DATA[0];
      title = trans.name;
      itemId = trans.id;
    }

    const bookingRef = `LXR-VIP-${Math.floor(1000 + Math.random() * 9000)}`;

    // Process Loyalty points redemption if selected
    if (selectedReward) {
      redeemReward(selectedReward.id);
      setAppliedRewardTitle(selectedReward.title);
    } else {
      setAppliedRewardTitle(null);
    }

    // Award loyalty points on completed booking!
    const { pointsEarned } = earnPoints(totalUSD, `${title} (${bookingRef})`, bookingRef);
    setBookingPointsEarned(pointsEarned);

    const details: BookingDetails = {
      serviceType: category,
      itemId,
      itemTitle: title,
      date,
      timeSlot: category === 'tours' ? timeSlot : undefined,
      nights: category === 'flats' ? nights : undefined,
      guests,
      pickupLocation,
      selectedAddons,
      currency: currentCurrency,
      guestName: guestName || 'Esteemed Guest',
      guestEmail: guestEmail || 'vip@govoyage.vip',
      guestPhone: guestPhone || '+20 100 000 0000',
      specialRequests,
      totalPriceUSD: totalUSD,
      bookingRef,
    };

    setConfirmation(details);
  };

  const handlePrintOrSave = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#0A0B0E] px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-cinzel text-lg font-bold text-white tracking-wider">
              {t.modal.passTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!confirmation ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Category Navigation (if not custom) */}
            {!customSummary && (
              <div className="flex items-center gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800">
                <button
                  type="button"
                  onClick={() => setCategory('tours')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    category === 'tours'
                      ? 'bg-[#D4AF37] text-stone-950 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {t.modal.tabTours}
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('flats')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    category === 'flats'
                      ? 'bg-[#D4AF37] text-stone-950 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {t.modal.tabFlats}
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('transport')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    category === 'transport'
                      ? 'bg-[#D4AF37] text-stone-950 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {t.modal.tabTransport}
                </button>
              </div>
            )}

            {/* Custom summary banner if launched from custom planner */}
            {customSummary && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-[#D4AF37]/40 text-xs text-amber-200">
                <span className="font-bold block mb-1">{t.modal.customPlan}</span>
                {customSummary}
              </div>
            )}

            {/* Item Selector based on category (if not custom) */}
            {!customSummary && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  {t.modal.selectItem}
                </label>
                <select
                  value={
                    category === 'tours'
                      ? selectedTourId
                      : category === 'flats'
                      ? selectedFlatId
                      : selectedTransportId
                  }
                  onChange={(e) => {
                    if (category === 'tours') setSelectedTourId(e.target.value);
                    else if (category === 'flats') setSelectedFlatId(e.target.value);
                    else setSelectedTransportId(e.target.value);
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {category === 'tours' &&
                    TOURS_DATA.map((tItem) => (
                      <option key={tItem.id} value={tItem.id}>
                        {tItem.title} — {formatPrice(tItem.priceUSD, currentCurrency)} / person
                      </option>
                    ))}
                  {category === 'flats' &&
                    FLATS_DATA.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} — {formatPrice(f.pricePerNightUSD, currentCurrency)} / {t.hero.night}
                      </option>
                    ))}
                  {category === 'transport' &&
                    TRANSPORT_DATA.map((tr) => (
                      <option key={tr.id} value={tr.id}>
                        {tr.name} ({tr.vehicleType}) — {formatPrice(tr.priceUSD, currentCurrency)}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Parameters Grid: Date, Time/Nights, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {t.modal.date}
                  </span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {category === 'tours' && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {t.modal.flightWave}
                    </span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="04:45 AM (Dawn Ascent)">04:45 AM (Dawn Ascent)</option>
                    <option value="05:30 AM (Sunrise Gold Wave)">05:30 AM (Sunrise Gold Wave)</option>
                    <option value="08:30 AM (Morning Tour)">08:30 AM (Morning Tour)</option>
                    <option value="04:00 PM (Sunset Cruise)">04:00 PM (Sunset Cruise)</option>
                  </select>
                </div>
              )}

              {category === 'flats' && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {t.modal.stayLength}
                    </span>
                  </label>
                  <select
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 10, 14].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? t.hero.night : `${t.hero.night}s`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {category === 'transport' && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {t.modal.pickupTime}
                    </span>
                  </label>
                  <input
                    type="time"
                    defaultValue="10:00"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> {t.modal.travelers}
                  </span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((g) => (
                    <option key={g} value={g}>
                      {g} {g === 1 ? t.hero.guest : t.hero.guests}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {t.modal.pickupLocation}
                </span>
              </label>
              <input
                type="text"
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder={t.modal.pickupPlaceholder}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* VIP Add-ons Selection */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                {t.modal.vipAddons}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {VIP_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border text-start flex items-start justify-between transition-all ${
                        isChecked
                          ? 'bg-stone-950 border-[#D4AF37] text-white'
                          : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-white">{addon.name}</div>
                        <div className="text-[11px] text-stone-400">{addon.desc}</div>
                      </div>
                      <span className="text-xs font-bold text-[#D4AF37] shrink-0 ms-2">
                        +{formatPrice(addon.priceUSD, currentCurrency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Traveler Information Form */}
            <div className="border-t border-stone-800 pt-4">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
                {t.modal.leadTraveler}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder={t.modal.fullName}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="email"
                  required
                  placeholder={t.modal.email}
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="tel"
                  required
                  placeholder={t.modal.phone}
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  dir="ltr"
                />
              </div>

              <textarea
                placeholder={t.modal.specialRequests}
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="mt-3 w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Luxor Points Loyalty Redemption Block */}
            <div className="bg-gradient-to-br from-[#121824] to-[#0D121B] p-4 sm:p-5 rounded-2xl border border-[#D6AD60]/40 shadow-md">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#D6AD60]/20 flex items-center justify-center text-[#D6AD60]">
                    <Crown className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-cinzel text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
                      LUXOR POINTS REWARDS
                      <span className="text-[10px] font-normal text-[#D6AD60] px-2 py-0.2 border border-[#D6AD60]/40 rounded-full">
                        {userTier}
                      </span>
                    </span>
                    <span className="text-[11px] text-stone-400 block">
                      Balance: <strong className="text-[#D6AD60] font-semibold">{userPoints} pts</strong> available
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" />
                  <span>Earn +{projectedPointsToEarn} pts on this trip</span>
                </div>
              </div>

              {/* Reward Selector */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-stone-400 block">
                  Redeem Points For Instant Privilege:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRewardId('none')}
                    className={`p-2.5 rounded-xl text-start text-xs border transition-all ${
                      selectedRewardId === 'none'
                        ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-white font-medium'
                        : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-semibold">Standard Booking</span>
                    <span className="text-[10px] text-stone-400">Keep points & earn on full price</span>
                  </button>

                  {REWARD_CATALOG.map((reward) => {
                    const canAfford = userPoints >= reward.pointsCost;
                    const isSelected = selectedRewardId === reward.id;
                    return (
                      <button
                        key={reward.id}
                        type="button"
                        disabled={!canAfford}
                        onClick={() => setSelectedRewardId(isSelected ? 'none' : reward.id)}
                        className={`p-2.5 rounded-xl text-start text-xs border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-white shadow-sm ring-1 ring-[#D6AD60]'
                            : canAfford
                            ? 'bg-stone-950/80 border-stone-800 hover:border-[#D6AD60]/50 text-stone-300'
                            : 'bg-stone-950/40 border-stone-900 text-stone-600 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-semibold text-xs text-white truncate">
                            {reward.title}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
                              canAfford
                                ? 'bg-[#D6AD60]/20 text-[#D6AD60] font-bold'
                                : 'bg-stone-900 text-stone-500'
                            }`}
                          >
                            {reward.pointsCost} pts
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-400 line-clamp-1">
                          {reward.valueDescription}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pricing Summary & Submit */}
            <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                  {t.modal.totalInvestment} ({currentCurrency})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-cinzel text-2xl font-bold text-gold-gradient tabular-nums">
                    {formatPrice(totalUSD, currentCurrency)}
                  </span>
                  {discountUSD > 0 && (
                    <span className="text-xs text-stone-400 line-through">
                      {formatPrice(subtotalUSD, currentCurrency)}
                    </span>
                  )}
                  {discountUSD > 0 && (
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      -${discountUSD} VIP Discount
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-400 block">
                  {t.modal.zeroFees} • +{projectedPointsToEarn} Luxor Points credited upon booking
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#DFB15B] to-[#D4AF37] hover:from-[#ECC94B] hover:to-[#DFB15B] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#D4AF37]/20 active:scale-95"
              >
                {t.modal.confirmButton}
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Boarding Pass View */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-[#0A0B0E] border-2 border-[#D4AF37] rounded-3xl p-6 relative overflow-hidden shadow-2xl">
              {/* Gold Ribbon Watermark */}
              <div
                className={`absolute top-0 ${
                  isRTL ? 'left-0 -rotate-45 -translate-x-6' : 'right-0 rotate-45 translate-x-6'
                } bg-[#D4AF37] text-stone-950 text-[10px] font-bold px-6 py-1 translate-y-2 uppercase tracking-widest shadow`}
              >
                {t.modal.confirmedRibbon}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4 mb-6">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                    {t.modal.voucherTitle}
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white mt-0.5">
                    {confirmation.itemTitle}
                  </h3>
                </div>
                <div className="bg-stone-900 border border-stone-700 px-3.5 py-1.5 rounded-xl text-center">
                  <span className="text-[10px] uppercase text-stone-400 block">{t.modal.refId}</span>
                  <span className="font-mono text-xs font-bold text-[#D4AF37]">
                    {confirmation.bookingRef}
                  </span>
                </div>
              </div>

              {/* Pass Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-4 pb-4 border-b border-stone-800">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">{t.modal.travelerLabel}</span>
                  <span className="font-semibold text-white">{confirmation.guestName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">{t.modal.dateLabel}</span>
                  <span className="font-semibold text-white">{confirmation.date}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">{t.modal.partyLabel}</span>
                  <span className="font-semibold text-white">
                    {confirmation.guests} {confirmation.guests === 1 ? t.hero.guest : t.hero.guests}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">{t.modal.totalPaid}</span>
                  <span className="font-semibold text-[#D4AF37]">
                    {formatPrice(confirmation.totalPriceUSD, confirmation.currency)}
                  </span>
                </div>
              </div>

              {/* Loyalty Reward & Points Earned Banner */}
              <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-[#D6AD60]/15 to-[#8C6D28]/10 border border-[#D6AD60]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#D6AD60] shrink-0" />
                  <span className="text-stone-200">
                    {appliedRewardTitle ? (
                      <>
                        Applied Privilege: <strong className="text-[#D6AD60]">{appliedRewardTitle}</strong>
                      </>
                    ) : (
                      'Royal Member Rewards Credited'
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-cinzel font-bold text-emerald-400 text-sm">
                    +{bookingPointsEarned} Luxor Points
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider">Earned</span>
                </div>
              </div>

              {/* QR Code and Pickup Instructions */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-stone-950/70 p-4 rounded-2xl border border-stone-800/80">
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow">
                  {/* Simulated QR Code */}
                  <div className="w-full h-full border-2 border-black grid grid-cols-5 gap-0.5 p-1">
                    {[1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1].map((cell, idx) => (
                      <div key={idx} className={cell ? 'bg-black' : 'bg-white'} />
                    ))}
                  </div>
                </div>

                <div className="text-xs text-stone-300 space-y-1 text-center sm:text-start">
                  <span className="font-semibold text-white flex items-center justify-center sm:justify-start gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {t.modal.verifiedPass}
                  </span>
                  <p>{t.modal.passInstructions}</p>
                  <p className="text-[11px] text-stone-400">
                    {t.modal.pickupPoint} <strong>{confirmation.pickupLocation}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrintOrSave}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t.modal.savePrint}</span>
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/201000000000?text=Hello%20GO%20VOYAGE,%20I%20have%20reservation%20${confirmation.bookingRef}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.modal.whatsappConcierge}</span>
                </a>

                <button
                  onClick={() => {
                    setConfirmation(null);
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-stone-950 text-xs font-bold uppercase tracking-wider"
                >
                  {t.modal.done}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
