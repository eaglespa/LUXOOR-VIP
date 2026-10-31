import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Instagram, Facebook, Youtube, MessageCircle, Sparkles, PhoneCall } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { PolicyType } from './PolicyModal';
import { LuxorWeather } from './LuxorWeather';

interface FooterProps {
  onOpenPolicy: (type: PolicyType) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onOpenAdmin }) => {
  const { t } = useI18n();

  return (
    <footer className="bg-[#0A0B0E] border-t border-stone-800 text-stone-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxor Weather: Current Temperature & Historical Climate Advice for Tourists */}
        <div className="mb-14">
          <LuxorWeather variant="footer" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <span className="font-cinzel text-xl font-bold tracking-widest text-gold-gradient block mb-3">
              GO VOYAGE
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
                <a href="mailto:concierge@govoyage.vip" className="hover:text-white transition-colors">
                  concierge@govoyage.vip
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-300">
          <div className="flex flex-col md:flex-row items-center gap-3.5 sm:gap-5 flex-wrap">
            <span className="text-stone-400">
              © {new Date().getFullYear()} {t.footer.rights}
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-800 hover:border-[#D6AD60]/60 hover:bg-[#D6AD60]/15 text-stone-400 hover:text-[#D6AD60] flex items-center justify-center transition-all group shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-800 hover:border-[#D6AD60]/60 hover:bg-[#D6AD60]/15 text-stone-400 hover:text-[#D6AD60] flex items-center justify-center transition-all group shadow-sm"
              >
                <Facebook className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-800 hover:border-[#D6AD60]/60 hover:bg-[#D6AD60]/15 text-stone-400 hover:text-[#D6AD60] flex items-center justify-center transition-all group shadow-sm"
              >
                <Youtube className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://wa.me/201203031230"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-800 hover:border-[#D6AD60]/60 hover:bg-[#D6AD60]/15 text-stone-400 hover:text-[#D6AD60] flex items-center justify-center transition-all group shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Designed by Romero's Studios with phone numbers popover on hover */}
            <div className="relative group/romero inline-block">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 border border-stone-700/80 group-hover/romero:border-[#D6AD60] group-hover/romero:bg-[#142334] text-stone-300 group-hover/romero:text-[#E9D8B5] transition-all cursor-pointer shadow-sm">
                <Sparkles className="w-3 h-3 text-[#D6AD60] group-hover/romero:rotate-12 transition-transform" />
                <span className="text-[10px] tracking-wide">
                  DESIGNED BY <strong className="font-cinzel text-white group-hover/romero:text-[#D6AD60] font-bold">ROMERO'S STUDIOS</strong>
                </span>
              </div>

              {/* Hover Phone Numbers Card */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 pointer-events-none group-hover/romero:opacity-100 group-hover/romero:pointer-events-auto transition-all duration-300 z-50 min-w-[260px]">
                <div className="bg-[#0A121D] border border-[#D6AD60]/60 rounded-2xl p-3 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(214,173,96,0.2)] backdrop-blur-xl text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#D6AD60] mb-2 flex items-center justify-center gap-1.5">
                    <PhoneCall className="w-3 h-3" />
                    <span>Romero's Studios Direct</span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <a
                      href="tel:+201203031230"
                      className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-stone-900/90 hover:bg-[#D6AD60]/20 text-stone-200 hover:text-white border border-stone-800 hover:border-[#D6AD60]/50 transition-colors"
                    >
                      <span className="text-[10px] text-stone-400">Line 1:</span>
                      <span className="font-bold text-[#E9D8B5]">+20 120 303 1230</span>
                    </a>
                    <a
                      href="tel:+201224278490"
                      className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-stone-900/90 hover:bg-[#D6AD60]/20 text-stone-200 hover:text-white border border-stone-800 hover:border-[#D6AD60]/50 transition-colors"
                    >
                      <span className="text-[10px] text-stone-400">Line 2:</span>
                      <span className="font-bold text-[#E9D8B5]">+20 122 427 8490</span>
                    </a>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-2.5 h-2.5 bg-[#0A121D] border-r border-b border-[#D6AD60]/60 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                </div>
              </div>
            </div>
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
