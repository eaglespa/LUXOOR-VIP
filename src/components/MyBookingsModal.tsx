import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { X, Search, Calendar, ShieldCheck, Download, MessageCircle, AlertCircle } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useI18n();
  const [searchRef, setSearchRef] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const mockBooking = {
    ref: 'LXR-VIP-8492',
    client: 'Lord Henry Kensington',
    service: 'Royal Sunrise Hot Air Balloon Odyssey',
    date: 'Tomorrow, 04:45 AM',
    pickup: 'Winter Palace Luxor, East Bank',
    guests: 2,
    totalPaid: '$280 USD',
    status: 'Confirmed & Pilot Assigned',
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#101D2B] border border-[#D6AD60]/40 rounded-3xl shadow-2xl p-6 sm:p-8 text-stone-100">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
              {t.nav.myBookings}
            </h3>
            <p className="text-xs text-stone-300 mt-0.5">
              Access your confirmed vouchers, flight passes, and driver details
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 start-3" />
            <input
              type="text"
              placeholder="Enter Reference ID (e.g. LXR-VIP-8492) or Email"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              className="w-full bg-[#181715] border border-stone-800 focus:border-[#D6AD60] rounded-xl py-3 ps-10 pe-4 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-[#D6AD60] hover:bg-[#E9D8B5] text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow"
          >
            Look Up
          </button>
        </form>

        {/* Result Card */}
        {searched ? (
          <div className="bg-[#181715] border border-[#D6AD60]/40 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#D6AD60] block">
                  Reference: {mockBooking.ref}
                </span>
                <h4 className="font-cinzel text-base font-bold text-white mt-0.5">
                  {mockBooking.service}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {mockBooking.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-300">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Guest</span>
                <span className="font-semibold text-white">{mockBooking.client}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Schedule</span>
                <span className="font-semibold text-white">{mockBooking.date}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Party</span>
                <span className="font-semibold text-white">{mockBooking.guests} Travelers</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Paid Total</span>
                <span className="font-semibold text-[#D6AD60]">{mockBooking.totalPaid}</span>
              </div>
            </div>

            <div className="p-3 bg-[#101D2B] rounded-xl border border-stone-800 text-xs text-stone-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Curbside Pickup:</strong> {mockBooking.pickup}. Chauffeur contact dispatched 60 mins before departure.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700"
              >
                <Download className="w-3.5 h-3.5" /> Print Boarding Pass
              </button>
              <a
                href={`https://wa.me/201000000000?text=Inquiry%20regarding%20booking%20${mockBooking.ref}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Modify / WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-stone-400 text-xs border border-dashed border-stone-800 rounded-2xl">
            Enter your booking reference or guest name above to review itinerary and passes.
          </div>
        )}
      </div>
    </div>
  );
};
