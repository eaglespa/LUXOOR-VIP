import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { PolicyType } from './PolicyModal';

interface FooterProps {
  onOpenPolicy: (type: PolicyType) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onOpenAdmin }) => {
  const { t } = useI18n();

  return (
    <footer className="bg-[#0A0B0E] border-t border-stone-800 text-stone-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <span className="font-cinzel text-xl font-bold tracking-widest text-gold-gradient block mb-3">
              LUXOR.VIP
            </span>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#D6AD60] mt-4">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.footer.licensing}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-3">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#tours" className="hover:text-[#D6AD60] transition-colors">
                  Sunrise Hot Air Balloon
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-[#D6AD60] transition-colors">
                  Valley of the Kings & Nefertari
                </a>
              </li>
              <li>
                <a href="#flats" className="hover:text-[#D6AD60] transition-colors">
                  Nilefront Luxury Villas
                </a>
              </li>
              <li>
                <a href="#flats" className="hover:text-[#D6AD60] transition-colors">
                  Karnak Horizon Penthouses
                </a>
              </li>
              <li>
                <a href="#transport" className="hover:text-[#D6AD60] transition-colors">
                  Mercedes-Benz Chauffeur Fleet
                </a>
              </li>
            </ul>
          </div>

          {/* Archaeological Guides */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-3">
              {t.footer.guides}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#nile-banks" className="hover:text-[#D6AD60] transition-colors">
                  East Bank · Living Temples
                </a>
              </li>
              <li>
                <a href="#nile-banks" className="hover:text-[#D6AD60] transition-colors">
                  West Bank · Realm of Rebirth
                </a>
              </li>
              <li>
                <a href="#planner" className="hover:text-[#D6AD60] transition-colors">
                  Bespoke Odyssey Planner
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-[#D6AD60] transition-colors">
                  Dendera & Abydos Day Tour
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Concierge Offices */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-3">
              {t.footer.contact}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D6AD60] shrink-0 mt-0.5" />
                <span>Corniche El Nile, East Bank & Gezira Pier, West Bank, Luxor, Egypt</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D6AD60] shrink-0" />
                <a href="tel:+201000000000" className="hover:text-white transition-colors" dir="ltr">
                  +20 100 234 5678 (24/7 VIP Line)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D6AD60] shrink-0" />
                <a href="mailto:concierge@luxor.vip" className="hover:text-white transition-colors">
                  concierge@luxor.vip
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-300">
          <div>
            © {new Date().getFullYear()} {t.footer.rights}
          </div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-[#D6AD60] transition-colors"
            >
              {t.footer.privacy}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-[#D6AD60] transition-colors"
            >
              {t.footer.terms}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenPolicy('cancellation')}
              className="hover:text-[#D6AD60] transition-colors"
            >
              {t.footer.cancellation}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenPolicy('accessibility')}
              className="hover:text-[#D6AD60] transition-colors"
            >
              {t.footer.accessibility}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-300 hover:text-white transition-colors"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
