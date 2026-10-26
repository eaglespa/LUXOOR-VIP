import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'cancellation' | 'accessibility';

interface PolicyModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap: Record<PolicyType, { title: string; body: React.ReactNode }> = {
    privacy: {
      title: 'Privacy Charter & Data Governance',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <p>
            At <strong>LUXOR.VIP</strong>, client discretion is sacred. We collect personal contact information (name, phone/WhatsApp, email) solely for coordinating executive transfers, securing temple entrance permits, and delivering confirmed vouchers.
          </p>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">1. Information We Secure</h4>
          <p>
            Passenger manifests, passport identification details necessary for Upper Egyptian regional security checkpoints, and flight numbers for complimentary terminal waiting.
          </p>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">2. Zero Commercial Sharing</h4>
          <p>
            We never trade, monetize, or disclose traveler databases to third-party advertising networks. Your journey details remain strictly between you and our licensed concierge team.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Carriage & Service Agreement',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <p>
            All bookings arranged via <strong>LUXOR.VIP</strong> are operated under full licensing by the Egyptian Ministry of Tourism and Antiquities and the Egyptian Civil Aviation Authority.
          </p>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">1. Safety & Aviation Authority</h4>
          <p>
            Hot air balloon ascents are subject to daily dawn wind and visibility clearance by Egyptian Civil Aviation meteorologists. Safety is paramount; flights postponed due to weather are 100% refunded or rescheduled.
          </p>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">2. Vehicle Standards</h4>
          <p>
            All Mercedes-Benz and tourist vehicles undergo rigorous technical inspection, include dual climate control, and are operated by certified professional chauffeurs.
          </p>
        </div>
      ),
    },
    cancellation: {
      title: 'Cancellation, Rescheduling & Refund Policy',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <p>
            We understand international travel itineraries may evolve. Our policies are crafted to provide maximum peace of mind.
          </p>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">1. Free Cancellation up to 24 Hours</h4>
          <p>
            Private day tours, airport transfers, and hot air balloon bookings may be cancelled or rescheduled with zero fees up to 24 hours prior to departure.
          </p>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">2. Villa & Flat Bookings</h4>
          <p>
            Luxury residences can be cancelled without penalty up to 7 days before check-in. For cancellations within 7 days, a 50% reservation credit applies to future dates.
          </p>
        </div>
      ),
    },
    accessibility: {
      title: 'Accessibility & Universal Inclusion Statement',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <p>
            <strong>LUXOR.VIP</strong> is dedicated to ensuring ancient Egypt is accessible to all travelers. We adhere to WCAG 2.2 AA digital accessibility standards with keyboard navigation and screen-reader support.
          </p>
          <h4 className="font-bold text-white uppercase text-xs tracking-wider">1. Wheelchair-Accessible Ground Mobility</h4>
          <p>
            Specially configured executive minivans with ramps and gentle boarding assistance are available upon request for temple tours and transfers.
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#101D2B] border border-[#D6AD60]/40 rounded-3xl shadow-2xl p-6 sm:p-8 text-stone-100">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D6AD60]" />
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
              {current.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pe-2">
          {current.body}
        </div>

        <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#D6AD60] text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#E9D8B5] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
