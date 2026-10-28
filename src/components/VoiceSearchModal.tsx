import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  X,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Calendar,
  Home,
  Car,
  Clock,
  Send,
  HelpCircle,
  Crown,
} from 'lucide-react';
import { TourItem, FlatItem, TransportItem } from '../types';
import { TOURS_DATA, FLATS_DATA, TRANSPORT_DATA } from '../data/luxorData';
import { useI18n } from '../i18n/I18nContext';

// Safe interface for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
}

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTour: (tour: TourItem) => void;
  onBookFlat: (flat: FlatItem) => void;
  onBookTransport: (transport: TransportItem) => void;
  onSetFlatsBankFilter: (bank: 'all' | 'west' | 'east') => void;
  onOpenNefertari: () => void;
  onOpenMyBookings: () => void;
  onOpenLoyalty?: () => void;
}

type CommandIntent =
  | 'BOOK_BALLOON'
  | 'SHOW_WEST_BANK_VILLAS'
  | 'SHOW_EAST_BANK_FLATS'
  | 'BOOK_NEFERTARI_TOMB'
  | 'BOOK_KARNAK'
  | 'BOOK_FELUCCA'
  | 'BOOK_AIRPORT_TRANSFER'
  | 'SHOW_TIMELINE'
  | 'SHOW_WEATHER'
  | 'OPEN_CONCIERGE'
  | 'OPEN_MY_BOOKINGS'
  | 'OPEN_LOYALTY'
  | 'UNKNOWN';

interface RecognizedCommand {
  intent: CommandIntent;
  title: string;
  subtitle: string;
  actionText: string;
  icon: React.ReactNode;
}

// Language mapping to BCP 47 locale codes
const LANG_MAP: Record<string, string> = {
  en: 'en-US',
  ar: 'ar-EG',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  it: 'it-IT',
  ru: 'ru-RU',
  'zh-CN': 'zh-CN',
};

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onBookTour,
  onBookFlat,
  onBookTransport,
  onSetFlatsBankFilter,
  onOpenNefertari,
  onOpenMyBookings,
  onOpenLoyalty,
}) => {
  const { language, isRTL } = useI18n();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recognizedCommand, setRecognizedCommand] = useState<RecognizedCommand | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const executionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Play a pleasant golden audio chime
  const playChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5 golden fifth

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  // Intent Parser
  const parseIntent = useCallback((text: string): RecognizedCommand => {
    const normalized = text
      .toLowerCase()
      .trim()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"“”]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ة]/g, 'ه');

    // 1. Book a balloon ride
    if (
      normalized.includes('balloon') ||
      normalized.includes('منطاد') ||
      normalized.includes('بالون') ||
      normalized.includes('montgolfiere') ||
      normalized.includes('ballon') ||
      normalized.includes('globo') ||
      normalized.includes('mongolfiera') ||
      normalized.includes('шаре') ||
      normalized.includes('热气球')
    ) {
      return {
        intent: 'BOOK_BALLOON',
        title: 'Royal Sunrise Hot Air Balloon',
        subtitle: 'Sunrise flight over the Valley of the Kings and Theban peaks',
        actionText: 'Launching Balloon Reservation Flow...',
        icon: <Compass className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 2. Show villas in West Bank
    if (
      (normalized.includes('west bank') ||
        normalized.includes('westbank') ||
        normalized.includes('البر الغربي') ||
        normalized.includes('الغربي') ||
        normalized.includes('rive ouest') ||
        normalized.includes('westufer') ||
        normalized.includes('западном берегу') ||
        normalized.includes('西岸')) &&
      (normalized.includes('villa') ||
        normalized.includes('flat') ||
        normalized.includes('stay') ||
        normalized.includes('apartment') ||
        normalized.includes('house') ||
        normalized.includes('شقق') ||
        normalized.includes('فيلات') ||
        normalized.includes('شقه') ||
        normalized.includes('سكن') ||
        normalized.includes('show') ||
        normalized.includes('view') ||
        normalized.includes('voir'))
    ) {
      return {
        intent: 'SHOW_WEST_BANK_VILLAS',
        title: 'West Bank Luxury Villas & Flats',
        subtitle: 'Filtering panoramic sunset penthouses and heritage estates on the West Bank',
        actionText: 'Navigating to West Bank Villas...',
        icon: <Home className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 3. Show villas / flats in East Bank
    if (
      normalized.includes('east bank') ||
      normalized.includes('البر الشرقي') ||
      normalized.includes('الشرقي') ||
      normalized.includes('rive est') ||
      normalized.includes('ostufer')
    ) {
      return {
        intent: 'SHOW_EAST_BANK_FLATS',
        title: 'East Bank Luxury Waterfront Flats',
        subtitle: 'Viewing residences near Corniche and Luxor Temple',
        actionText: 'Navigating to East Bank Residences...',
        icon: <Home className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 4. Book Nefertari / Valley of the Kings Tomb
    if (
      normalized.includes('nefertari') ||
      normalized.includes('kings') ||
      normalized.includes('tomb') ||
      normalized.includes('valley') ||
      normalized.includes('نفرتاري') ||
      normalized.includes('الملوك') ||
      normalized.includes('مقبره') ||
      normalized.includes('nefertiti')
    ) {
      return {
        intent: 'BOOK_NEFERTARI_TOMB',
        title: 'Valley of the Kings & Nefertari Tomb VIP Sanctuary',
        subtitle: 'Restricted chamber access and private Egyptologist masterclass',
        actionText: 'Opening Nefertari Sanctuary Booking...',
        icon: <Calendar className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 5. Karnak / Luxor Temples
    if (
      normalized.includes('karnak') ||
      normalized.includes('temple') ||
      normalized.includes('كرنك') ||
      normalized.includes('معبد') ||
      normalized.includes('luxor temple')
    ) {
      return {
        intent: 'BOOK_KARNAK',
        title: 'Karnak & Luxor Temple Illuminations',
        subtitle: 'Private sunrise or evening golden hour temple exploration',
        actionText: 'Opening Temple Expedition Booking...',
        icon: <Calendar className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 6. Nile Felucca
    if (
      normalized.includes('felucca') ||
      normalized.includes('sailing') ||
      normalized.includes('nile') ||
      normalized.includes('boat') ||
      normalized.includes('فلوكه') ||
      normalized.includes('ابحار') ||
      normalized.includes('مركب') ||
      normalized.includes('قارب')
    ) {
      return {
        intent: 'BOOK_FELUCCA',
        title: 'Sacred Nile Sunset Felucca Cruise',
        subtitle: 'Private teak wooden sailboat with Nubian hibiscus tea and sunset breeze',
        actionText: 'Opening Nile Felucca Booking...',
        icon: <Compass className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 7. Airport Limousine / VIP Transport
    if (
      normalized.includes('airport') ||
      normalized.includes('transfer') ||
      normalized.includes('limousine') ||
      normalized.includes('driver') ||
      normalized.includes('car') ||
      normalized.includes('مطار') ||
      normalized.includes('ليموزين') ||
      normalized.includes('سائق') ||
      normalized.includes('توصيل')
    ) {
      return {
        intent: 'BOOK_AIRPORT_TRANSFER',
        title: 'Royal Airport Limousine & Private Driver',
        subtitle: 'Chauffeured Mercedes-Benz S-Class or VIP luxury fleet',
        actionText: 'Opening VIP Transfer Booking...',
        icon: <Car className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 8. Historical Timeline
    if (
      normalized.includes('timeline') ||
      normalized.includes('history') ||
      normalized.includes('landmark') ||
      normalized.includes('تاريخ') ||
      normalized.includes('خط زمني') ||
      normalized.includes('معالم')
    ) {
      return {
        intent: 'SHOW_TIMELINE',
        title: 'Luxor Historical Chronology',
        subtitle: 'Scroll to the 4,000-year interactive Theban timeline',
        actionText: 'Navigating to Historical Timeline...',
        icon: <Clock className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 9. Current Weather
    if (
      normalized.includes('weather') ||
      normalized.includes('temperature') ||
      normalized.includes('forecast') ||
      normalized.includes('wind') ||
      normalized.includes('طقس') ||
      normalized.includes('حراره') ||
      normalized.includes('جو')
    ) {
      return {
        intent: 'SHOW_WEATHER',
        title: 'Live Luxor Weather & Flight Conditions',
        subtitle: 'Displaying real-time temperature, wind speeds, and balloon clearance',
        actionText: 'Viewing Luxor Meteorological Station...',
        icon: <Compass className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 10. Concierge / Nefertari AI
    if (
      normalized.includes('concierge') ||
      normalized.includes('nefertari') ||
      normalized.includes('assistant') ||
      normalized.includes('مساعد') ||
      normalized.includes('ذكاء')
    ) {
      return {
        intent: 'OPEN_CONCIERGE',
        title: 'Queen Nefertari AI Concierge',
        subtitle: 'Personal Egyptologist and luxury travel itinerary planner',
        actionText: 'Launching Nefertari AI Concierge...',
        icon: <Sparkles className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 11. My Bookings
    if (
      normalized.includes('booking') ||
      normalized.includes('reservation') ||
      normalized.includes('ticket') ||
      normalized.includes('حجز') ||
      normalized.includes('تذاكر')
    ) {
      return {
        intent: 'OPEN_MY_BOOKINGS',
        title: 'Guest Reservations Portal',
        subtitle: 'View your confirmed passes, flats, and VIP vouchers',
        actionText: 'Opening Guest Bookings Portal...',
        icon: <CheckCircle2 className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    // 12. Luxor Points / Loyalty System
    if (
      normalized.includes('point') ||
      normalized.includes('loyalty') ||
      normalized.includes('points') ||
      normalized.includes('reward') ||
      normalized.includes('club') ||
      normalized.includes('نقاط') ||
      normalized.includes('ولاء') ||
      normalized.includes('مكافآت') ||
      normalized.includes('fidelite')
    ) {
      return {
        intent: 'OPEN_LOYALTY',
        title: 'Luxor Points Royal Club',
        subtitle: 'View your digital cartouche card, tier benefits, and available perks',
        actionText: 'Opening Luxor Points Royal Club...',
        icon: <Crown className="w-5 h-5 text-[#D6AD60]" />,
      };
    }

    return {
      intent: 'UNKNOWN',
      title: 'Command Unrecognized',
      subtitle: `We couldn’t match "${text}". Try saying "Book a balloon ride" or "Show villas in West Bank".`,
      actionText: 'Please try another command...',
      icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
    };
  }, []);

  // Execute recognized command
  const executeCommand = useCallback(
    (command: RecognizedCommand) => {
      setIsExecuting(true);
      playChime();

      executionTimerRef.current = setTimeout(() => {
        setIsExecuting(false);
        onClose();

        switch (command.intent) {
          case 'BOOK_BALLOON': {
            const balloonTour =
              TOURS_DATA.find((t) => t.category === 'balloon' || t.id.includes('balloon')) ||
              TOURS_DATA[0];
            onBookTour(balloonTour);
            break;
          }
          case 'SHOW_WEST_BANK_VILLAS': {
            onSetFlatsBankFilter('west');
            const el = document.getElementById('flats');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
            break;
          }
          case 'SHOW_EAST_BANK_FLATS': {
            onSetFlatsBankFilter('east');
            const el = document.getElementById('flats');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
            break;
          }
          case 'BOOK_NEFERTARI_TOMB': {
            const nefertariTour =
              TOURS_DATA.find((t) => t.id.includes('nefertari') || t.title.includes('Nefertari')) ||
              TOURS_DATA[1];
            onBookTour(nefertariTour);
            break;
          }
          case 'BOOK_KARNAK': {
            const karnakTour =
              TOURS_DATA.find((t) => t.id.includes('karnak') || t.title.includes('Karnak')) ||
              TOURS_DATA[2];
            onBookTour(karnakTour);
            break;
          }
          case 'BOOK_FELUCCA': {
            const feluccaTour =
              TOURS_DATA.find((t) => t.category === 'nile' || t.id.includes('felucca')) ||
              TOURS_DATA[3];
            onBookTour(feluccaTour);
            break;
          }
          case 'BOOK_AIRPORT_TRANSFER': {
            const transport = TRANSPORT_DATA[0];
            onBookTransport(transport);
            break;
          }
          case 'SHOW_TIMELINE': {
            const el = document.getElementById('timeline');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
            break;
          }
          case 'SHOW_WEATHER': {
            const el = document.getElementById('weather-widget') || document.querySelector('section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
            break;
          }
          case 'OPEN_CONCIERGE': {
            onOpenNefertari();
            break;
          }
          case 'OPEN_MY_BOOKINGS': {
            onOpenMyBookings();
            break;
          }
          case 'OPEN_LOYALTY': {
            if (onOpenLoyalty) onOpenLoyalty();
            break;
          }
          default:
            break;
        }
      }, 750);
    },
    [onBookTour, onSetFlatsBankFilter, onBookTransport, onOpenNefertari, onOpenMyBookings, onOpenLoyalty, onClose, playChime]
  );

  // Initialize Speech Recognition
  const startListening = useCallback(() => {
    setErrorMessage(null);
    setRecognizedCommand(null);
    setTranscript('');
    setInterimTranscript('');

    const SpeechRecognitionConstructor =
      (window as unknown as { SpeechRecognition?: new () => ISpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => ISpeechRecognition }).webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      setErrorMessage(
        'Speech recognition is not natively supported by this browser. You can still test commands using the interactive buttons below or text input.'
      );
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = LANG_MAP[language] || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            final += item[0].transcript;
          } else {
            interim += item[0].transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        if (final) {
          setTranscript(final);
          setInterimTranscript('');
          const cmd = parseIntent(final);
          setRecognizedCommand(cmd);
          if (cmd.intent !== 'UNKNOWN') {
            executeCommand(cmd);
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === 'not-allowed') {
          setErrorMessage(
            'Microphone access was denied or is blocked by browser permissions. Click any suggested command below to test without microphone.'
          );
        } else if (event.error === 'no-speech') {
          setErrorMessage('No speech detected. Please try speaking again.');
        } else {
          setErrorMessage(`Speech recognition error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setErrorMessage(
        'Could not initialize speech recognition. You can use the quick command chips or text input below.'
      );
      setIsListening(false);
    }
  }, [language, parseIntent, executeCommand]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  // When modal opens, automatically start listening
  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      stopListening();
      if (executionTimerRef.current) {
        clearTimeout(executionTimerRef.current);
      }
    }
    return () => {
      stopListening();
      if (executionTimerRef.current) {
        clearTimeout(executionTimerRef.current);
      }
    };
  }, [isOpen, startListening, stopListening]);

  // Handle manual simulated voice click or text submit
  const handleSimulatedCommand = (phrase: string) => {
    setTranscript(phrase);
    setInterimTranscript('');
    const cmd = parseIntent(phrase);
    setRecognizedCommand(cmd);
    if (cmd.intent !== 'UNKNOWN') {
      executeCommand(cmd);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    handleSimulatedCommand(manualInput);
    setManualInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#101D2B] border border-[#D6AD60]/60 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col items-center text-center">
        {/* Decorative Golden Aura Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-44 bg-gradient-to-b from-[#D6AD60]/20 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close voice search"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182838] border border-[#D6AD60]/30 text-[11px] font-semibold text-[#D6AD60] uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>GO VOYAGE • Voice Command Search</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
          {isRTL ? 'تحدث بالأمر الصوتي' : 'Speak Your Request'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mb-6 leading-relaxed">
          {isRTL
            ? 'قل "احجز رحلة منطاد" أو "اعرض فيلات البر الغربي" لتفعيل الحجز فوراً'
            : 'Say "Book a balloon ride" or "Show villas in West Bank" to automatically trigger the booking flow.'}
        </p>

        {/* Animated Microphone Orb with Soundwaves */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Pulsating Waves when listening */}
          {isListening && (
            <>
              <div className="absolute w-36 h-36 rounded-full border border-[#D6AD60]/40 animate-ping opacity-60" />
              <div className="absolute w-44 h-44 rounded-full border border-[#D6AD60]/20 animate-pulse" />
            </>
          )}

          {/* Center Orb */}
          <button
            onClick={() => (isListening ? stopListening() : startListening())}
            className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${
              isListening
                ? 'bg-gradient-to-tr from-[#D6AD60] to-[#F9D371] text-[#101D2B] scale-110 shadow-[0_0_45px_rgba(214,173,96,0.5)]'
                : 'bg-stone-900 border-2 border-stone-700 text-stone-300 hover:border-[#D6AD60] hover:text-[#D6AD60]'
            }`}
            title={isListening ? 'Tap to pause microphone' : 'Tap to activate microphone'}
          >
            {isListening ? (
              <Mic className="w-8 h-8 animate-pulse text-[#101D2B]" />
            ) : (
              <MicOff className="w-8 h-8 text-stone-400" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
              {isListening ? (isRTL ? 'أستمع الآن' : 'Listening') : (isRTL ? 'انقر للبدء' : 'Tap to Speak')}
            </span>
          </button>
        </div>

        {/* Audio Visualizer Waves (Simulated Frequency Bars) */}
        {isListening && (
          <div className="flex items-center gap-1.5 h-8 my-2">
            {[40, 75, 100, 60, 90, 45, 80, 100, 70, 50, 90, 65, 35].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-[#D6AD60] rounded-full animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDuration: `${0.4 + (i % 5) * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Live Transcript Box */}
        <div className="w-full bg-[#0c1622]/90 border border-stone-800 rounded-2xl p-4 my-3 min-h-[70px] flex items-center justify-center text-center">
          {transcript || interimTranscript ? (
            <p className="font-medium text-sm sm:text-base text-white">
              <span className="text-[#D6AD60]">{transcript}</span>
              <span className="text-stone-400 italic"> {interimTranscript}</span>
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-stone-500 italic">
              {isListening
                ? isRTL
                  ? 'أستمع لصوتك الآن... تحدث بوضوح'
                  : 'Listening for your voice... speak now'
                : isRTL
                ? 'الميكروفون متوقف. انقر فوق الزر الذهبي للبدء'
                : 'Microphone paused. Tap orb to start or select a command below.'}
            </p>
          )}
        </div>

        {/* Error or Warning Message */}
        {errorMessage && (
          <div className="w-full flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs mb-3 text-start">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Recognized Command Confirmation Card */}
        {recognizedCommand && (
          <div
            className={`w-full p-4 rounded-2xl border transition-all duration-300 text-start my-2 ${
              recognizedCommand.intent !== 'UNKNOWN'
                ? 'bg-[#14293f] border-[#D6AD60] shadow-[0_0_25px_rgba(214,173,96,0.25)]'
                : 'bg-stone-900 border-amber-500/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-stone-950/80 border border-[#D6AD60]/40 shrink-0">
                {recognizedCommand.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-white text-sm font-bold">
                    {recognizedCommand.title}
                  </h4>
                  {isExecuting && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 animate-pulse">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isRTL ? 'جاري التنفيذ...' : 'Executing...'}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  {recognizedCommand.subtitle}
                </p>
                <div className="mt-2 text-[11px] font-semibold text-[#D6AD60] flex items-center gap-1">
                  <span>{recognizedCommand.actionText}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Voice Commands (Click to simulate/trigger directly) */}
        <div className="w-full mt-4 text-start">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
            {isRTL ? 'أوامر سريعة مقترحة (انقر للتجربة مباشرة):' : 'Suggested Voice Commands (Click to test instantly):'}
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              {
                text: isRTL ? 'احجز رحلة منطاد' : 'Book a balloon ride',
                desc: '🎈 Balloon Ride',
              },
              {
                text: isRTL ? 'اعرض فيلات البر الغربي' : 'Show villas in West Bank',
                desc: '🏡 West Bank Villas',
              },
              {
                text: isRTL ? 'احجز مقبرة نفرتاري' : 'Book Nefertari tomb',
                desc: '🏛️ Nefertari Sanctuary',
              },
              {
                text: isRTL ? 'ليموزين المطار' : 'Airport limousine transfer',
                desc: '🚗 Airport Limousine',
              },
              {
                text: isRTL ? 'فلوكة النيل وقت الغروب' : 'Nile felucca sunset',
                desc: '⛵ Nile Felucca',
              },
              {
                text: isRTL ? 'اعرض الخط الزمني' : 'Show historical timeline',
                desc: '📜 Timeline',
              },
              {
                text: isRTL ? 'طقس الأقصر اليوم' : 'Current weather in Luxor',
                desc: '☀️ Weather',
              },
              {
                text: isRTL ? 'نقاط الولاء الملكية' : 'Show my Luxor Points',
                desc: '👑 Luxor Points',
              },
            ].map((cmd, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSimulatedCommand(cmd.text)}
                className="px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-[#D6AD60]/20 border border-stone-800 hover:border-[#D6AD60]/50 text-xs text-stone-300 hover:text-white transition-all flex items-center gap-1.5 group"
              >
                <span>{cmd.desc}</span>
                <span className="text-[11px] text-[#D6AD60] group-hover:underline">"{cmd.text}"</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Manual Text Command Input */}
        <form onSubmit={handleManualSubmit} className="w-full mt-5 flex items-center gap-2">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder={
              isRTL
                ? 'أو اكتب أمرك هنا مثل: احجز رحلة منطاد...'
                : 'Or type command (e.g. "Book a balloon ride" or "Show villas in West Bank")...'
            }
            className="flex-1 bg-stone-900/90 border border-stone-800 focus:border-[#D6AD60] rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#D6AD60] hover:bg-[#E9D8B5] text-[#101D2B] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRTL ? 'إرسال' : 'Run'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
