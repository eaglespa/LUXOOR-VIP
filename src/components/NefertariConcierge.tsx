import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { Language } from '../i18n/translations';
import { ServiceCategory } from '../types';
import {
  Sparkles,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Calendar,
  Compass,
  ArrowRight,
  RefreshCw,
  MessageSquare,
} from 'lucide-react';

interface NefertariConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerBooking: (category: ServiceCategory, itemId?: string) => void;
}

interface Message {
  id: string;
  sender: 'nefertari' | 'user';
  text: string;
  timestamp: string;
  action?: {
    type: ServiceCategory;
    itemId?: string;
    label: string;
  };
}

export const NefertariConcierge: React.FC<NefertariConciergeProps> = ({
  isOpen,
  onClose,
  onTriggerBooking,
}) => {
  const { language, setLanguage, t, isRTL } = useI18n();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'nefertari',
      text: t.nefertari.greeting,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // Update greeting when language changes
  useEffect(() => {
    setMessages((prev) => [
      {
        id: `greeting-${language}`,
        sender: 'nefertari',
        text: t.nefertari.greeting,
        timestamp: 'Just now',
      },
    ]);
  }, [language, t.nefertari.greeting]);

  // Speech Recognition Setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Locale mapping
      const localeMap: Record<Language, string> = {
        en: 'en-US',
        ar: 'ar-EG',
        de: 'de-DE',
        fr: 'fr-FR',
        es: 'es-ES',
        it: 'it-IT',
        ru: 'ru-RU',
        'zh-CN': 'zh-CN',
      };
      recognition.lang = localeMap[language] || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [language]);

  // Speech Synthesis (Text-to-Speech)
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const localeMap: Record<Language, string> = {
      en: 'en-US',
      ar: 'ar-EG',
      de: 'de-DE',
      fr: 'fr-FR',
      es: 'es-ES',
      it: 'it-IT',
      ru: 'ru-RU',
      'zh-CN': 'zh-CN',
    };
    utterance.lang = localeMap[language] || 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleMic = () => {
    stopSpeaking();
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch {
        alert(
          'Microphone permission is needed. You may also type your inquiry in any of the 8 supported languages.'
        );
      }
    }
  };

  // Nefertari Intelligence Knowledge Engine
  const generateNefertariResponse = (query: string): { reply: string; action?: Message['action'] } => {
    const q = query.toLowerCase();

    // Hot Air Balloon Queries
    if (q.includes('balloon') || q.includes('منطاد') || q.includes('ballon') || q.includes('globo') || q.includes('шар') || q.includes('热气球') || q.includes('heißluftballon')) {
      if (language === 'ar') {
        return {
          reply:
            'رحلة المنطاد الملكي عند شروق الشمس هي أعظم تجارب الأقصر! ننطلق فجراً باللانش الفاخر عبر النيل، ونرتفع حتى 2,500 قدم فوق وادي الملوك ومعبد حتشبسوت مع إشراف وتراخيص سلطة الطيران المدني المصري. السعر يبدأ من 110 دولارات شامل الانتقالات وشهادة الطيران.',
          action: { type: 'tours', itemId: 'balloon-royal-sunrise', label: 'حجز رحلة المنطاد الآن' },
        };
      } else if (language === 'fr') {
        return {
          reply:
            'Le vol en montgolfière au lever du soleil est notre expérience signature. Départ à l’aube par bateau privé sur le Nil, puis ascension jusqu’à 2 500 pieds au-dessus de la Vallée des Rois et du temple d’Hatchepsout. Les vols sont audités par l’Aviation Civile Égyptienne. Tarif dès 110 $ par passager.',
          action: { type: 'tours', itemId: 'balloon-royal-sunrise', label: 'Réserver la Montgolfière' },
        };
      } else if (language === 'zh-CN') {
        return {
          reply:
            '皇家日出热气球是卢克索最震撼的体验！清晨乘私享木船横渡尼罗河，随之升空至2500英尺俯瞰帝王谷与哈特谢普苏特神庙全景，全程获埃及民航总局每日风向核准。特惠价110美元起，含往返专车与飞行证书。',
          action: { type: 'tours', itemId: 'balloon-royal-sunrise', label: '立即预订日出热气球' },
        };
      } else {
        return {
          reply:
            'The Royal Sunrise Hot Air Balloon Odyssey is Luxor’s premier airborne journey. We cross the tranquil Nile at dawn, ascending to 2,500 feet over the Valley of the Kings and Hatshepsut Temple. All flights adhere strictly to Egyptian Civil Aviation safety audits. Rates from $110 / guest.',
          action: { type: 'tours', itemId: 'balloon-royal-sunrise', label: 'Book Sunrise Balloon' },
        };
      }
    }

    // Accommodation & Villa Queries
    if (q.includes('villa') || q.includes('flat') || q.includes('stay') || q.includes('apartment') || q.includes('فيلا') || q.includes('شقة') || q.includes('piscine') || q.includes('pool') || q.includes('жилье') || q.includes('公寓') || q.includes('别墅') || q.includes('wohnung')) {
      if (language === 'ar') {
        return {
          reply:
            'أنصحك بفيلتنا الملكية بالبر الغربي (The Theban Royal Nilefront Villa)! تتميز بمسبح خاص مدفأ وتراس مباشر يواجه معبد الأقصر، مع شيف خاص وخدمة تنظيف يومية. كما يتوفر بنتهاوس الكرنك بالبر الشرقي بإطلالة بانورامية على الكورنيش.',
          action: { type: 'flats', itemId: 'villa-theban-nilefront', label: 'استعراض فيلا النيل وحجزها' },
        };
      } else if (language === 'fr') {
        return {
          reply:
            'Je vous recommande vivement The Theban Royal Nilefront Villa sur la Rive Ouest : piscine à débordement privée face au Nil et au temple de Louxor, terrasse panoramique et chef cuisinier dédié. Pour un séjour citadin, le Penthouse Horizon Karnak offre un jacuzzi sur le toit.',
          action: { type: 'flats', itemId: 'villa-theban-nilefront', label: 'Découvrir la Villa Royale' },
        };
      } else if (language === 'zh-CN') {
        return {
          reply:
            '强烈推荐西岸的“底比斯皇家尼罗河岸别墅”！拥有私人恒温无边泳池与直面卢克索神庙的开阔露台，配备私人主厨与高速星链Wi-Fi。若偏好城市生活，东岸的卡纳克天际顶层公寓配有空中按摩浴缸。',
          action: { type: 'flats', itemId: 'villa-theban-nilefront', label: '查看独立泳池别墅' },
        };
      } else {
        return {
          reply:
            'I highly recommend The Theban Royal Nilefront Villa on the West Bank: featuring a private heated infinity pool facing Luxor Temple across the Nile, private chef dining, and starry terraces. For an East Bank promenade stay, Karnak Horizon Penthouse features a rooftop jacuzzi.',
          action: { type: 'flats', itemId: 'villa-theban-nilefront', label: 'View Nilefront Villa' },
        };
      }
    }

    // Transport & Chauffeur Queries
    if (q.includes('driver') || q.includes('transfer') || q.includes('car') || q.includes('mercedes') || q.includes('airport') || q.includes('سائق') || q.includes('مطار') || q.includes('توصيل') || q.includes('chauffeur') || q.includes('трансфер') || q.includes('接送') || q.includes('专车')) {
      if (language === 'ar') {
        return {
          reply:
            'أسطول LUXOR.VIP يضم سيارات مرسيدس E-Class و S-Class وفانات V-Class الفاخرة مع سائقين معتمدين يتحدثون الإنجليزية ولغات متعددة. نوفر خدمة استقبال كبار الزوار بمطار الأقصر الدولي (LXR) مع 60 دقيقة انتظار مجانية بسعر 45 دولاراً فقط.',
          action: { type: 'transport', itemId: 'airport-vip-chauffeur', label: 'حجز سيارة مرسيدس وسائق' },
        };
      } else if (language === 'fr') {
        return {
          reply:
            'Notre flotte VIP met à votre disposition des berlines Mercedes Classe E / S et vans Classe V avec chauffeurs bilingues. Service d’accueil VIP à l’aéroport de Louxor (LXR) avec suivi de vol et 60 min d’attente gratuite dès 45 $.',
          action: { type: 'transport', itemId: 'airport-vip-chauffeur', label: 'Réserver Chauffeur Mercedes' },
        };
      } else if (language === 'zh-CN') {
        return {
          reply:
            '我们的贵宾车队配备奔驰S级轿车与V级豪华商务车，司机受过专业礼仪培训。提供卢克索国际机场（LXR）贵宾迎机服务，含航班实时雷达跟踪与60分钟免费等待，单程仅需45美元。',
          action: { type: 'transport', itemId: 'airport-vip-chauffeur', label: '预订奔驰机场接送' },
        };
      } else {
        return {
          reply:
            'Our VIP chauffeur fleet operates Mercedes-Benz sedans and executive V-Class vans with certified English-speaking drivers. We provide VIP airport curbside meet-and-assist at Luxor International Airport (LXR) with 60 min complimentary wait time from $45.',
          action: { type: 'transport', itemId: 'airport-vip-chauffeur', label: 'Book Mercedes Chauffeur' },
        };
      }
    }

    // Temples & Valley of the Kings Queries
    if (q.includes('temple') || q.includes('karnak') || q.includes('kings') || q.includes('nefertari') || q.includes('معبد') || q.includes('ملوك') || q.includes('نفرتاري') || q.includes('tomb') || q.includes('храм') || q.includes('神庙') || q.includes('帝王谷')) {
      if (language === 'ar') {
        return {
          reply:
            'مقبرة الملكة نفرتاري (QV66) في وادي الملكات هي أروع ما تركته البشرية؛ ألوانها الجدارية تبدو وكأنها رُسمت بالأمس! ننصح بجولة وادي الملوك الخاصة التي تشمل مقبرة توت عنخ آمون ومعبد حتشبسوت بصحبة كبير باحثي المصريات لدينا.',
          action: { type: 'tours', itemId: 'tombs-nefertari-kings', label: 'حجز جولة مقابر نفرتاري والملوك' },
        };
      } else if (language === 'fr') {
        return {
          reply:
            'La tombe de la reine Néfertari (QV66) dans la Vallée des Reines est le chef-d’œuvre absolu de l’art pharaonique : ses pigments sont restés intacts depuis plus de 3 200 ans ! Notre visite privée guidée par un égyptologue senior inclut également Toutânkhamon et Hatchepsout.',
          action: { type: 'tours', itemId: 'tombs-nefertari-kings', label: 'Réserver Visite Néfertari' },
        };
      } else if (language === 'zh-CN') {
        return {
          reply:
            '王后谷中的奈菲尔塔莉王后陵墓（QV66）堪称古代壁画艺术的巅峰，其艳丽色彩历经3200余年依然栩栩如生！我们为您提供由资深埃及学专家专属陪同的私享VIP通道，行程涵盖图坦卡蒙金字塔地宫与哈特谢普苏特神殿。',
          action: { type: 'tours', itemId: 'tombs-nefertari-kings', label: '预订奈菲尔塔莉陵墓私享票' },
        };
      } else {
        return {
          reply:
            'Queen Nefertari’s Tomb (QV66) in the Valley of the Queens is the crown jewel of ancient Egyptian art—its vivid lapis and gold pigments remain as fresh as when painted 3,200 years ago. Our private VIP masterclass tour includes Tutankhamun and Hatshepsut with a senior licensed Egyptologist.',
          action: { type: 'tours', itemId: 'tombs-nefertari-kings', label: 'Book Nefertari VIP Tour' },
        };
      }
    }

    // Default Itinerary & Assistance
    if (language === 'ar') {
      return {
        reply:
          'بصفتي نفرتاري، يسعدني تخطيط برنامج متكامل لك في الأقصر. تشمل خدماتنا: حجز رحلات المنطاد عند شروق الشمس، والفلل النيلية الفاخرة، والنقل بسيارات الليموزين، والرحلات الخاصة إلى دندرة وأبيدوس. ما الذي تود البدء به؟',
        action: { type: 'tours', label: 'استعراض كافة التجارب الملكية' },
      };
    } else if (language === 'fr') {
      return {
        reply:
          'En tant que Néfertari, je suis ravie d’orchestrer votre séjour à Louxor. Nous proposons vols en montgolfière à l’aube, villas d’exception avec piscine face au Nil, transferts en Mercedes et expéditions à Dendérah. Que souhaitez-vous découvrir en premier ?',
        action: { type: 'tours', label: 'Voir Toutes les Expériences' },
      };
    } else if (language === 'zh-CN') {
      return {
        reply:
          '作为您的卢克索专属管家奈菲尔塔莉，我能为您量身定制全套底比斯古城探索方案，包括日出热气球、独立泳池临河别墅、全天候奔驰专车接送以及丹达拉哈托尔神庙私享游。请问您今天想先了解哪一项？',
        action: { type: 'tours', label: '浏览全部尊享行程' },
      };
    } else {
      return {
        reply:
          'As Nefertari, I would be honored to craft your bespoke Luxor journey. Our concierge services encompass sunrise hot air balloons, private pool Nilefront villas, executive Mercedes chauffeurs, and private dahabiya charters. Where shall we begin?',
        action: { type: 'tours', label: 'Explore All Royal Experiences' },
      };
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    stopSpeaking();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    // Simulate conversational thinking and response
    setTimeout(() => {
      const { reply, action } = generateNefertariResponse(text);
      const nefertariMsg: Message = {
        id: `nef-${Date.now()}`,
        sender: 'nefertari',
        text: reply,
        timestamp: 'Just now',
        action,
      };

      setMessages((prev) => [...prev, nefertariMsg]);
      setIsProcessing(false);
      speakText(reply);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-0 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Concierge Panel */}
      <div className="w-full sm:w-[460px] h-[92vh] sm:h-[680px] bg-[#101D2B] border border-[#D6AD60]/40 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Header */}
        <div className="bg-[#181715]/95 border-b border-[#D6AD60]/30 p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D6AD60] to-[#E9D8B5] p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-[#101D2B] flex items-center justify-center text-[#D6AD60]">
                  <Sparkles className="w-5 h-5 text-[#D6AD60] animate-pulse" />
                </div>
              </div>
              <span className="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#101D2B]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-cinzel text-base font-bold text-white tracking-wide">
                  {t.nefertari.name}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-[#D6AD60] font-semibold bg-[#D6AD60]/10 px-2 py-0.5 rounded-full border border-[#D6AD60]/30">
                  {t.nefertari.badge}
                </span>
              </div>
              <p className="text-[11px] text-stone-300">{t.nefertari.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice Mute Toggle */}
            <button
              onClick={() => {
                stopSpeaking();
                setVoiceEnabled(!voiceEnabled);
              }}
              title={voiceEnabled ? 'Mute Nefertari’s voice' : 'Enable voice output'}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              {voiceEnabled ? (
                <Volume2 className="w-4 h-4 text-[#D6AD60]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Voice State Status Bar */}
        {(isListening || isProcessing || isSpeaking) && (
          <div className="bg-[#176C70]/40 border-b border-[#176C70] py-2 px-4 text-xs flex items-center justify-between text-cyan-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>
                {isListening && t.nefertari.voiceListening}
                {isProcessing && t.nefertari.voiceProcessing}
                {isSpeaking && t.nefertari.voiceSpeaking}
              </span>
            </div>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="text-[11px] underline hover:text-white font-medium"
              >
                {t.nefertari.voiceStop}
              </button>
            )}
          </div>
        )}

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isNef = msg.sender === 'nefertari';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isNef ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isNef
                      ? 'bg-[#181715]/90 border border-[#D6AD60]/30 text-stone-200 shadow-md rounded-tl-sm'
                      : 'bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] text-[#101D2B] font-medium shadow-md rounded-tr-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Contextual Action Button */}
                  {msg.action && (
                    <div className="mt-3 pt-3 border-t border-[#D6AD60]/30">
                      <button
                        onClick={() => {
                          stopSpeaking();
                          onClose();
                          onTriggerBooking(msg.action!.type, msg.action!.itemId);
                        }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D6AD60] text-[#101D2B] font-bold text-xs uppercase tracking-wider hover:bg-[#E9D8B5] transition-colors shadow"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-stone-300 mt-1 px-1">
                  {isNef ? t.nefertari.name : 'You'} · {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isProcessing && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#181715] border border-stone-800 w-20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD60] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD60] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD60] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 bg-[#181715]/70 border-t border-stone-800">
          <div className="text-[11px] text-stone-300 mb-1.5 flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#D6AD60]" />
            <span>{t.nefertari.quickPromptsTitle}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {t.nefertari.prompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 text-xs text-stone-300 hover:text-white bg-[#101D2B] border border-stone-700 hover:border-[#D6AD60]/50 rounded-lg whitespace-nowrap transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#181715] border-t border-[#D6AD60]/20 flex items-center gap-2">
          {/* Voice Microphone Button */}
          <button
            type="button"
            onClick={toggleMic}
            title={isListening ? 'Stop listening' : t.nefertari.voiceStart}
            className={`p-3 rounded-xl transition-all shadow-md ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-[#101D2B] border border-[#D6AD60]/40 text-[#D6AD60] hover:bg-[#D6AD60] hover:text-[#101D2B]'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={isListening ? t.nefertari.voiceListening : t.nefertari.inputPlaceholder}
            className="flex-1 bg-[#101D2B] border border-stone-800 focus:border-[#D6AD60] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-3 bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-90 disabled:opacity-40 text-[#101D2B] font-bold rounded-xl transition-all shadow"
          >
            <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
