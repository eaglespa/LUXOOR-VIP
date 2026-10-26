import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import {
  X,
  TrendingUp,
  Calendar,
  Users,
  Car,
  Home,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
} from 'lucide-react';
import { TOURS_DATA, FLATS_DATA, TRANSPORT_DATA } from '../data/luxorData';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DemoBooking {
  id: string;
  ref: string;
  client: string;
  service: string;
  date: string;
  guests: number;
  totalUSD: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'bookings' | 'tours' | 'properties' | 'fleet'>('bookings');
  const [filterQuery, setFilterQuery] = useState('');

  const [bookings, setBookings] = useState<DemoBooking[]>([
    {
      id: 'b-1',
      ref: 'LXR-VIP-8492',
      client: 'Lord Henry Kensington',
      service: 'Royal Sunrise Hot Air Balloon',
      date: 'Tomorrow, 04:45 AM',
      guests: 2,
      totalUSD: 280,
      status: 'confirmed',
    },
    {
      id: 'b-2',
      ref: 'LXR-VIP-7319',
      client: 'Elena Rostova',
      service: 'The Theban Royal Nilefront Villa',
      date: 'Oct 28 - Nov 02, 2026',
      guests: 4,
      totalUSD: 1600,
      status: 'confirmed',
    },
    {
      id: 'b-3',
      ref: 'LXR-VIP-6104',
      client: 'Marcus Vance',
      service: 'Airport VIP Chauffeur & Mercedes S-Class',
      date: 'Oct 29, 14:15 Flight MS062',
      guests: 2,
      totalUSD: 45,
      status: 'pending',
    },
    {
      id: 'b-4',
      ref: 'LXR-VIP-5520',
      client: 'Dr. Jean-Luc Moreau',
      service: 'Valley of the Kings & Nefertari VIP',
      date: 'Nov 01, 07:30 AM',
      guests: 3,
      totalUSD: 555,
      status: 'confirmed',
    },
  ]);

  if (!isOpen) return null;

  const toggleStatus = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const next =
            b.status === 'confirmed'
              ? 'pending'
              : b.status === 'pending'
              ? 'cancelled'
              : 'confirmed';
          return { ...b, status: next };
        }
        return b;
      })
    );
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.client.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.ref.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#101D2B] border border-[#D6AD60]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Header */}
        <div className="bg-[#181715] px-6 py-4 border-b border-[#D6AD60]/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg font-bold text-white tracking-wide">
                {t.admin.title}
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Live Operations
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">{t.admin.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top KPI Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-6 bg-[#181715]/50 border-b border-stone-800">
          <div className="p-3.5 rounded-xl bg-[#101D2B] border border-stone-800">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
              {t.admin.totalRevenue}
            </span>
            <span className="font-cinzel text-xl font-bold text-[#D6AD60] tabular-nums mt-1 block">
              $148,250 USD
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +18.4% vs last month
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#101D2B] border border-stone-800">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
              {t.admin.activeBookings}
            </span>
            <span className="font-cinzel text-xl font-bold text-white tabular-nums mt-1 block">
              142 Active
            </span>
            <span className="text-[10px] text-stone-400 mt-0.5 block">0 Double-bookings</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#101D2B] border border-stone-800">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
              {t.admin.fleetDeployed}
            </span>
            <span className="font-cinzel text-xl font-bold text-white tabular-nums mt-1 block">
              8 Vehicles On-Duty
            </span>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">100% On-Time Arrivals</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#101D2B] border border-stone-800">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
              {t.admin.occupancyRate}
            </span>
            <span className="font-cinzel text-xl font-bold text-[#D6AD60] tabular-nums mt-1 block">
              84.2%
            </span>
            <span className="text-[10px] text-stone-400 mt-0.5 block">Nilefront Portfolio</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {[
              { id: 'bookings', label: t.admin.bookingsTab, icon: Calendar },
              { id: 'tours', label: t.admin.toursTab, icon: Users },
              { id: 'properties', label: t.admin.propertiesTab, icon: Home },
              { id: 'fleet', label: t.admin.fleetTab, icon: Car },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#D6AD60] text-[#D6AD60] bg-[#181715]/70'
                      : 'border-transparent text-stone-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab === 'bookings' && (
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute top-1/2 -translate-y-1/2 start-3" />
              <input
                type="text"
                placeholder="Search guest or ref..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full bg-[#181715] border border-stone-800 rounded-lg py-1.5 ps-8 pe-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D6AD60]"
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="border border-stone-800 rounded-2xl overflow-hidden bg-[#181715]/40">
              <table className="w-full text-start text-xs">
                <thead className="bg-[#181715] text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                  <tr>
                    <th className="p-3 text-start">Reference ID</th>
                    <th className="p-3 text-start">Guest Name</th>
                    <th className="p-3 text-start">Reserved Service</th>
                    <th className="p-3 text-start">Date & Time</th>
                    <th className="p-3 text-start">Amount</th>
                    <th className="p-3 text-start">Status</th>
                    <th className="p-3 text-start">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#181715]/60 transition-colors">
                      <td className="p-3 font-mono font-bold text-[#D6AD60]">{b.ref}</td>
                      <td className="p-3 font-semibold text-white">{b.client}</td>
                      <td className="p-3 text-stone-300">{b.service}</td>
                      <td className="p-3 text-stone-400">{b.date}</td>
                      <td className="p-3 font-mono font-bold text-white tabular-nums">
                        ${b.totalUSD}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : b.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-red-500/10 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {b.status === 'confirmed' && <CheckCircle className="w-2.5 h-2.5" />}
                          {b.status === 'pending' && <Clock className="w-2.5 h-2.5" />}
                          {b.status === 'cancelled' && <AlertCircle className="w-2.5 h-2.5" />}
                          <span>{b.status}</span>
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleStatus(b.id)}
                          className="px-2.5 py-1 text-[11px] rounded bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium"
                        >
                          Cycle Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: TOURS */}
          {activeTab === 'tours' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOURS_DATA.map((tItem) => (
                <div
                  key={tItem.id}
                  className="p-4 rounded-xl bg-[#181715]/70 border border-stone-800 flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white">{tItem.title}</h4>
                    <span className="text-xs text-stone-400">{tItem.duration} · {tItem.bank}</span>
                    <div className="text-xs text-[#D6AD60] font-bold mt-2">
                      Base Rate: ${tItem.priceUSD} / guest
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                    Active Capacity
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PROPERTIES */}
          {activeTab === 'properties' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FLATS_DATA.map((flat) => (
                <div
                  key={flat.id}
                  className="p-4 rounded-xl bg-[#181715]/70 border border-stone-800 flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white">{flat.name}</h4>
                    <span className="text-xs text-stone-400">{flat.bank} · Up to {flat.maxGuests} guests</span>
                    <div className="text-xs text-[#D6AD60] font-bold mt-2">
                      Nightly Rate: ${flat.pricePerNightUSD} / night
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase">
                    Direct Calendar Sync
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: FLEET */}
          {activeTab === 'fleet' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRANSPORT_DATA.map((tr) => (
                <div
                  key={tr.id}
                  className="p-4 rounded-xl bg-[#181715]/70 border border-stone-800 flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white">{tr.name}</h4>
                    <span className="text-xs text-stone-400">{tr.vehicleType}</span>
                    <div className="text-xs text-[#D6AD60] font-bold mt-2">
                      Rate: ${tr.priceUSD} ({tr.rateType})
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                    Assigned & Inspected
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
