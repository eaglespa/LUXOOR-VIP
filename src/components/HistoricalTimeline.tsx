import React, { useState } from 'react';
import {
  Clock,
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Crown,
  ChevronRight,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';
import { Language } from '../i18n/translations';

export interface TimelineMilestone {
  id: string;
  yearBCE: string;
  eraCode: 'middle' | '18th' | '19th' | 'modern';
  eraLabel: string;
  landmark: string;
  ruler: string;
  bank: 'East Bank' | 'West Bank';
  badgeTitle: string;
  shortDesc: string;
  architecturalFeat: string;
  significance: string;
  bestVisitingTime: string;
  cartoucheSymbol: string;
  colorGradient: string;
  tags: string[];
}

const TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 'karnak-rise',
    yearBCE: 'c. 2050 BCE',
    eraCode: 'middle',
    eraLabel: 'Middle Kingdom (11th & 12th Dynasty)',
    landmark: 'The White Chapel & First Sanctuary of Amun',
    ruler: 'Mentuhotep II & Senusret I',
    bank: 'East Bank',
    badgeTitle: 'Birth of Ancient Thebes (Waset)',
    shortDesc:
      'The transformation of Thebes from a regional desert settlement into the supreme spiritual capital of Egypt, dedicated to the supreme deity Amun-Ra.',
    architecturalFeat:
      'Fine Tura limestone pavilion with 16 pillars, covered in peerless bas-relief carvings documenting the nomes and geographical provinces of ancient Egypt.',
    significance:
      'Established Karnak as the religious center of the pharaonic universe, laying the sacred foundation upon which all subsequent pharaohs would build for 2,000 years.',
    bestVisitingTime: 'Early morning (06:30 AM) when gentle sunrise illuminates the white limestone reliefs.',
    cartoucheSymbol: '𓇳 𓏠 𓈖 𓊹',
    colorGradient: 'from-amber-700/40 via-[#181715] to-[#101D2B]',
    tags: ['Amun-Ra Sanctuary', 'Tura Limestone', 'Middle Kingdom'],
  },
  {
    id: 'hatshepsut-temple',
    yearBCE: 'c. 1479 BCE',
    eraCode: '18th',
    eraLabel: '18th Dynasty — The Golden Age',
    landmark: 'Mortuary Temple of Hatshepsut (Djeser-Djeseru)',
    ruler: 'Queen-Pharaoh Hatshepsut',
    bank: 'West Bank',
    badgeTitle: 'The Terraced Wonder of Deir el-Bahari',
    shortDesc:
      'A triumph of classical architecture, three grand colonnaded terraces sculpted directly into the majestic cliffs of the Theban mountain range.',
    architecturalFeat:
      'Harmonious colonnades echoing the vertical strata of the natural rock, featuring the famous Punt relief expedition and the divine birth cycle.',
    significance:
      'Cements the legacy of Egypt’s greatest female ruler; aligned symmetrically with the axis of Karnak Temple across the River Nile.',
    bestVisitingTime: 'Sunrise & Early Morning (06:00 - 08:30 AM) as the desert cliffs glow fiery amber and pink.',
    cartoucheSymbol: '𓇳 𓁹 𓈖 𓆣',
    colorGradient: 'from-[#D6AD60]/30 via-[#181715] to-[#101D2B]',
    tags: ['Queen Hatshepsut', 'Deir el-Bahari', 'Colonnaded Terraces'],
  },
  {
    id: 'luxor-amenhotep',
    yearBCE: 'c. 1390 BCE',
    eraCode: '18th',
    eraLabel: '18th Dynasty — The Imperial Zenith',
    landmark: 'Luxor Temple & The Colossi of Memnon',
    ruler: 'Amenhotep III ("The Magnificent")',
    bank: 'East Bank',
    badgeTitle: 'The Sanctuary of Royal Rejuvenation',
    shortDesc:
      'Built as the grand southern palace (Ipet Resyt) celebrating the divine coronation and annual Opet Festival where Amun recharged royal authority.',
    architecturalFeat:
      'The Grand Sun Court and 14 monumental papyrus columns standing 16 meters tall, complemented by the twin 18-meter quartzite Colossi of Memnon on the West Bank.',
    significance:
      'Connected to Karnak by the monumental 3-kilometer Sphinx Avenue, creating the grandest ceremonial processional path on earth.',
    bestVisitingTime: 'Dusk & Evening (17:30 - 21:00 PM) when warm floodlights bring the sandstone columns alive under starry skies.',
    cartoucheSymbol: '𓇳 𓌻 𓈖 𓃀',
    colorGradient: 'from-[#176C70]/30 via-[#181715] to-[#101D2B]',
    tags: ['Opet Festival', 'Avenue of Sphinxes', 'Colossi of Memnon'],
  },
  {
    id: 'tut-kings-valley',
    yearBCE: 'c. 1332 BCE',
    eraCode: '18th',
    eraLabel: '18th Dynasty — The Royal Necropolis',
    landmark: 'Valley of the Kings (KV62 & Royal Hypogea)',
    ruler: 'Tutankhamun & 18th Dynasty Pharaohs',
    bank: 'West Bank',
    badgeTitle: 'The Gates of the Underworld',
    shortDesc:
      'A secluded limestone canyon dominated by the pyramid-shaped peak of al-Qurn, concealing 65 subterranean royal tombs guarded from looters for millennia.',
    architecturalFeat:
      'Deep descending corridors carved through solid limestone, with walls painted in luminous natural pigments illustrating the Book of the Gates and Amduat.',
    significance:
      'Replaced visible pyramids with hidden eternal sanctuaries, housing the divine ka of Egypt’s rulers alongside untold golden artifacts.',
    bestVisitingTime: 'Morning (07:00 - 10:30 AM) when temperature is moderate within the desert gorge.',
    cartoucheSymbol: '𓇳 𓎛 𓈎 𓊪',
    colorGradient: 'from-amber-500/25 via-[#181715] to-[#101D2B]',
    tags: ['Biban el-Moluk', 'King Tutankhamun', 'Underworld Texts'],
  },
  {
    id: 'karnak-hypostyle',
    yearBCE: 'c. 1279 BCE',
    eraCode: '19th',
    eraLabel: '19th Dynasty — The Age of Ramesses the Great',
    landmark: 'Great Hypostyle Hall & The Ramesseum',
    ruler: 'Ramesses II (The Great) & Seti I',
    bank: 'East Bank',
    badgeTitle: 'The Stone Forest of Giants',
    shortDesc:
      '134 colossal sandstone columns soaring 24 meters into the sky, crowned by capitals so enormous that 50 people can stand atop a single papyrus flower.',
    architecturalFeat:
      'The largest religious chamber ever erected in the ancient world, featuring clerestory window stone grilles that cast cinematic divine sunbeams.',
    significance:
      'The ultimate pharaonic statement of imperial power, military triumph, and eternal devotion to the gods of Egypt.',
    bestVisitingTime: 'Midday to 15:00 PM when dramatic sun shafts slice through the high stone window grilles.',
    cartoucheSymbol: '𓇳 𓄊 𓌻 𓈖',
    colorGradient: 'from-[#D6AD60]/35 via-[#181715] to-[#101D2B]',
    tags: ['134 Papyrus Columns', 'Ramesses II', 'Clerestory Sunbeams'],
  },
  {
    id: 'nefertari-tomb',
    yearBCE: 'c. 1250 BCE',
    eraCode: '19th',
    eraLabel: '19th Dynasty — Queen of Beauty',
    landmark: 'Tomb of Queen Nefertari (QV66)',
    ruler: 'Queen Nefertari Meritmut & Ramesses II',
    bank: 'West Bank',
    badgeTitle: 'The Sistine Chapel of Ancient Egypt',
    shortDesc:
      'The resting place of Ramesses II’s beloved royal consort, preserved with the most vibrant, radiant polychrome murals surviving from antiquity.',
    architecturalFeat:
      'Plastered limestone walls adorned with lapis lazuli blues, malachite greens, and pure gold hues depicting Nefertari playing senet and offering lotus flowers.',
    significance:
      'The pinnacled masterpiece of pharaonic art and love, universally protected with strict humidity controls and limited VIP admissions.',
    bestVisitingTime: 'Private VIP Morning Slot by special reservation with our luxury concierge.',
    cartoucheSymbol: '𓄤 𓆑 𓂋 𓏏 𓇋',
    colorGradient: 'from-rose-500/25 via-[#181715] to-[#101D2B]',
    tags: ['QV66', 'Sistine Chapel of Egypt', 'Lapis Lazuli Murals'],
  },
  {
    id: 'medinet-habu',
    yearBCE: 'c. 1184 BCE',
    eraCode: '19th',
    eraLabel: '20th Dynasty — The Fortified Sanctuary',
    landmark: 'Medinet Habu (Temple of Ramesses III)',
    ruler: 'Ramesses III',
    bank: 'West Bank',
    badgeTitle: 'The Fortress Temple of Deep Reliefs',
    shortDesc:
      'A colossal fortified temple complex surrounded by massive crenellated mudbrick walls, celebrating the pharaoh’s victory against the mysterious Sea Peoples.',
    architecturalFeat:
      'Exceptionally deep wall inscriptions designed so no subsequent ruler could erase them, retaining astonishingly bright original ceiling pigments.',
    significance:
      'The last monumental temple constructed during the New Kingdom, offering a captivating window into the end of Egypt’s golden imperial epoch.',
    bestVisitingTime: 'Late afternoon (15:30 - 17:00 PM) when the low desert sun creates sharp contrast in the deep carvings.',
    cartoucheSymbol: '𓇳 𓂓 𓏠 𓊹',
    colorGradient: 'from-amber-600/30 via-[#181715] to-[#101D2B]',
    tags: ['Sea Peoples Victory', 'Intact Ceiling Colors', 'Fortress Pylons'],
  },
  {
    id: 'carter-discovery',
    yearBCE: '1922 CE',
    eraCode: 'modern',
    eraLabel: 'Modern Era — The Global Rediscovery',
    landmark: 'Carter’s KV62 Discovery & Luxor VIP Heritage',
    ruler: 'Howard Carter & Lord Carnarvon',
    bank: 'West Bank',
    badgeTitle: 'The Century of Modern Wonder',
    shortDesc:
      'On November 4, 1922, Howard Carter’s team broke through the sealed doorway of KV62 to reveal "wonderful things" — unearthing 5,000 intact royal treasures.',
    architecturalFeat:
      'Sparked modern scientific Egyptology and luxury travel in Luxor, including the historic Winter Palace gatherings, Nile steamboats, and sunrise hot air balloon flights.',
    significance:
      'Transformed Luxor into the world’s greatest open-air museum and premier cultural destination, welcoming international travelers with royal hospitality.',
    bestVisitingTime: 'Sunrise balloon flight at 05:15 AM gliding above the entire Valley and archaeological landscape.',
    cartoucheSymbol: '𓋹 𓍹 𓏏 𓅱 𓏏 𓍺',
    colorGradient: 'from-emerald-500/25 via-[#181715] to-[#101D2B]',
    tags: ['Howard Carter', 'Golden Mask', 'Sunrise Hot Air Balloons'],
  },
];

// Localized interface strings
const TIMELINE_I18N: Record<
  Language,
  {
    kicker: string;
    heading: string;
    subtitle: string;
    filterAll: string;
    filterMiddle: string;
    filter18th: string;
    filter19th: string;
    filterModern: string;
    rulerLabel: string;
    significanceLabel: string;
    featLabel: string;
    bestHourLabel: string;
    dossierModalTitle: string;
    closeDossier: string;
    bookTourPrompt: string;
    bookTourBtn: string;
    eastBank: string;
    westBank: string;
  }
> = {
  en: {
    kicker: '04.5. Archaeological Chronology',
    heading: 'CHRONICLES OF ANCIENT THEBES',
    subtitle:
      'Journey through 4,000 years of royal grandeur. Discover the reigns, monumental feats, and sacred milestones that forged Luxor into the world’s greatest open-air museum.',
    filterAll: 'All Epochs',
    filterMiddle: 'Middle Kingdom (~2050 BCE)',
    filter18th: '18th Dynasty (~1550–1292 BCE)',
    filter19th: '19th & 20th Dynasty (~1292–1077 BCE)',
    filterModern: 'Modern Rediscovery (1922 CE)',
    rulerLabel: 'Reign & Pharaoh',
    significanceLabel: 'Historical Significance',
    featLabel: 'Architectural Feat',
    bestHourLabel: 'Optimal Visiting Window',
    dossierModalTitle: 'Archaeological Royal Dossier',
    closeDossier: 'Close Dossier',
    bookTourPrompt: 'Experience this monumental landmark with an accredited Egyptologist guide.',
    bookTourBtn: 'Book Tour Visiting This Landmark',
    eastBank: 'East Bank',
    westBank: 'West Bank',
  },
  ar: {
    kicker: '04.5. السجل التاريخي والكرونولوجيا الملكية',
    heading: 'سِجِلّ طَيْبَة الْخَالِدَة عبْر الْعُصُور',
    subtitle:
      'سافر عبر 4,000 عام من المجد والخلود. تعرّف على أهم المعالم والفراعنة والإنجازات المعمارية التي جعلت الأقصر أعظم متحف مفتوح في العالم.',
    filterAll: 'جميع العصور',
    filterMiddle: 'الدولة الوسطى (~2050 ق.م)',
    filter18th: 'الأسرة 18 — العصر الذهبي (~1550 ق.م)',
    filter19th: 'الأسرتان 19 و 20 (~1292 ق.م)',
    filterModern: 'العصر الحديث والاكتشاف (1922 م)',
    rulerLabel: 'الحاكم وعصر الأسرة',
    significanceLabel: 'الأهمية التاريخية',
    featLabel: 'الإعجاز المعماري',
    bestHourLabel: 'أفضل توقيت للزيارة',
    dossierModalTitle: 'الملف الأثري الملكي المفصل',
    closeDossier: 'إغلاق الملف',
    bookTourPrompt: 'عِش تجربة زيارة هذا الأثر الخالد بصحبة باحث مصريات معتمد.',
    bookTourBtn: 'حجز جولة تشمل هذا المعلم الأثري',
    eastBank: 'البر الشرقي',
    westBank: 'البر الغربي',
  },
  de: {
    kicker: '04.5. Archäologische Chronologie',
    heading: 'CHRONIKEN DES ANTIKEN THEBEN',
    subtitle:
      'Reisen Sie durch 4.000 Jahre königlicher Erhabenheit. Entdecken Sie die Herrscher und Meilensteine, die Luxor zum größten Freilichtmuseum machten.',
    filterAll: 'Alle Epochen',
    filterMiddle: 'Mittleres Reich (~2050 v. Chr.)',
    filter18th: '18. Dynastie (~1550 v. Chr.)',
    filter19th: '19. & 20. Dynastie (~1292 v. Chr.)',
    filterModern: 'Moderne Wiederentdeckung (1922)',
    rulerLabel: 'Herrscher & Dynastie',
    significanceLabel: 'Historische Bedeutung',
    featLabel: 'Architektonische Meisterleistung',
    bestHourLabel: 'Beste Besuchszeit',
    dossierModalTitle: 'Königliches Archäologiedossier',
    closeDossier: 'Dossier Schließen',
    bookTourPrompt: 'Erleben Sie dieses Baudenkmal mit einem zertifizierten Ägyptologen.',
    bookTourBtn: 'Tour zu diesem Monument buchen',
    eastBank: 'Ostufer',
    westBank: 'Westufer',
  },
  fr: {
    kicker: '04.5. Chronologie Archéologique',
    heading: 'CHRONIQUES DE THÈBES ANTIQUE',
    subtitle:
      'Voyagez à travers 4 000 ans de splendeur pharaonique. Découvrez les règnes et les prouesses qui ont façonné le plus grand musée à ciel ouvert au monde.',
    filterAll: 'Toutes les Époques',
    filterMiddle: 'Moyen Empire (~2050 av. J.-C.)',
    filter18th: '18e Dynastie (~1550 av. J.-C.)',
    filter19th: '19e & 20e Dynasties (~1292 av. J.-C.)',
    filterModern: 'Redécouverte Moderne (1922)',
    rulerLabel: 'Règne & Pharaon',
    significanceLabel: 'Portée Historique',
    featLabel: 'Prouesse Architecturale',
    bestHourLabel: 'Heure de Visite Idéale',
    dossierModalTitle: 'Dossier Archéologique Royal',
    closeDossier: 'Fermer le Dossier',
    bookTourPrompt: 'Visitez ce joyau antique accompagné d’un égyptologue privé certifié.',
    bookTourBtn: 'Réserver la Visite de ce Monument',
    eastBank: 'Rive Est',
    westBank: 'Rive Ouest',
  },
  es: {
    kicker: '04.5. Cronología Arqueológica',
    heading: 'CRÓNICAS DE TEBAS ANTIGUA',
    subtitle:
      'Viaje por 4.000 años de grandeza faraónica. Descubra los faraones, templos y hazañas arquitectónicas que convirtieron a Luxor en el mayor museo al aire libre.',
    filterAll: 'Todas las Épocas',
    filterMiddle: 'Reino Medio (~2050 a. C.)',
    filter18th: 'Dinastía XVIII (~1550 a. C.)',
    filter19th: 'Dinastías XIX y XX (~1292 a. C.)',
    filterModern: 'Redescubrimiento Moderno (1922)',
    rulerLabel: 'Reinado y Faraón',
    significanceLabel: 'Importancia Histórica',
    featLabel: 'Hazaña Arquitectónica',
    bestHourLabel: 'Mejor Horario de Visita',
    dossierModalTitle: 'Expediente Real Arqueológico',
    closeDossier: 'Cerrar Expediente',
    bookTourPrompt: 'Descubra este monumento eterno junto a un egiptólogo acreditado.',
    bookTourBtn: 'Reservar Tour a este Monumento',
    eastBank: 'Orilla Este',
    westBank: 'Orilla Oeste',
  },
  it: {
    kicker: '04.5. Cronologia Archeologica',
    heading: 'CRONACHE DELL’ANTICA TEBE',
    subtitle:
      'Un viaggio attraverso 4.000 anni di maestosità reale. Scopri i sovrani e le pietre miliari che hanno reso Luxor il più grande museo a cielo aperto.',
    filterAll: 'Tutte le Epoche',
    filterMiddle: 'Regno Medio (~2050 a.C.)',
    filter18th: 'XVIII Dinastia (~1550 a.C.)',
    filter19th: 'XIX & XX Dinastia (~1292 a.C.)',
    filterModern: 'Riscoperta Moderna (1922)',
    rulerLabel: 'Regno e Faraone',
    significanceLabel: 'Importanza Storica',
    featLabel: 'Capolavoro Architettonico',
    bestHourLabel: 'Orario di Visita Ideale',
    dossierModalTitle: 'Dossier Archeologico Reale',
    closeDossier: 'Chiudi Dossier',
    bookTourPrompt: 'Visita questo monumento con una guida egittologa privata certificata.',
    bookTourBtn: 'Prenota Tour per questo Monumento',
    eastBank: 'Riva Est',
    westBank: 'Riva Ovest',
  },
  ru: {
    kicker: '04.5. Археологическая Хронология',
    heading: 'ЛЕТОПИСЬ ДРЕВНИХ ФИВ',
    subtitle:
      'Путешествие сквозь 4000 лет царского величия. Узнайте о фараонах и памятниках, превративших Луксор в величайший музей под открытым небом.',
    filterAll: 'Все Эпохи',
    filterMiddle: 'Среднее Царство (~2050 до н.э.)',
    filter18th: 'XVIII Династия (~1550 до н.э.)',
    filter19th: 'XIX и XX Династии (~1292 до н.э.)',
    filterModern: 'Великие Открытия (1922 г.)',
    rulerLabel: 'Правитель и Династия',
    significanceLabel: 'Историческое Значение',
    featLabel: 'Архитектурный Подвиг',
    bestHourLabel: 'Лучшее Время для Визита',
    dossierModalTitle: 'Королевское Археологическое Досье',
    closeDossier: 'Закрыть Досье',
    bookTourPrompt: 'Посетите этот шедевр с сертифицированным гидом-египтологом.',
    bookTourBtn: 'Забронировать Тур к Этому Памятнику',
    eastBank: 'Восточный Берег',
    westBank: 'Западный Берег',
  },
  'zh-CN': {
    kicker: '04.5. 考古编年史',
    heading: '古底比斯千年编年史',
    subtitle:
      '穿越四千年法老文明史诗。探索古埃及法老王、神庙奇迹与建筑丰碑，领略卢克索作为世界最大露天博物馆的永恒魅力。',
    filterAll: '全部历史时期',
    filterMiddle: '中王国时期 (约公元前 2050 年)',
    filter18th: '第十八王朝 · 黄金时代 (约公元前 1550 年)',
    filter19th: '第十九与二十王朝 (约公元前 1292 年)',
    filterModern: '现代考古重见天日 (1922 年)',
    rulerLabel: '在位法老与王朝',
    significanceLabel: '历史里程碑意义',
    featLabel: '殿堂级建筑壮举',
    bestHourLabel: '最佳参观时段',
    dossierModalTitle: '皇家考古专属档案',
    closeDossier: '关闭档案',
    bookTourPrompt: '由资深认证埃及学家带队，私享探访此历史古迹。',
    bookTourBtn: '预订探访此古迹之行程',
    eastBank: '尼罗河东岸',
    westBank: '尼罗河西岸',
  },
};

interface HistoricalTimelineProps {
  onSelectLandmarkForBooking?: (landmarkName: string) => void;
}

export const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({
  onSelectLandmarkForBooking,
}) => {
  const { language, isRTL } = useI18n();
  const [activeEra, setActiveEra] = useState<'all' | 'middle' | '18th' | '19th' | 'modern'>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);

  const loc = TIMELINE_I18N[language] || TIMELINE_I18N.en;

  const filteredData =
    activeEra === 'all'
      ? TIMELINE_DATA
      : TIMELINE_DATA.filter((m) => m.eraCode === activeEra);

  return (
    <section
      id="timeline"
      className="relative py-24 bg-gradient-to-b from-[#101D2B] via-[#0E1722] to-[#101D2B] text-white overflow-hidden border-t border-stone-800/80"
    >
      {/* Background Pharaonic Geometry Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#D6AD60_1px,transparent_1px)] [background-size:32px_32px]" />
      
      {/* Ambient Pharaoh Gold Atmospheric Glows */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#D6AD60]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#176C70]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715]/90 border border-[#D6AD60]/40 text-xs uppercase tracking-widest text-[#E9D8B5] mb-4 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-[#D6AD60]" />
            <span>{loc.kicker}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            {loc.heading}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            {loc.subtitle}
          </p>
        </div>

        {/* Interactive Era Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-14 scrollbar-none">
          {[
            { id: 'all', label: loc.filterAll },
            { id: 'middle', label: loc.filterMiddle },
            { id: '18th', label: loc.filter18th },
            { id: '19th', label: loc.filter19th },
            { id: 'modern', label: loc.filterModern },
          ].map((era) => (
            <button
              key={era.id}
              onClick={() => setActiveEra(era.id as typeof activeEra)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 border ${
                activeEra === era.id
                  ? 'bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] text-[#101D2B] border-transparent font-bold shadow-lg shadow-[#D6AD60]/20 scale-105'
                  : 'bg-[#181715]/80 text-stone-300 border-stone-800 hover:text-white hover:border-[#D6AD60]/40'
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>

        {/* Interactive Vertical Timeline Spine */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-[#D6AD60] to-transparent opacity-60" />

          {/* Timeline Nodes Container */}
          <div className="space-y-12 sm:space-y-16">
            {filteredData.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Central Timeline Milestone Marker (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-20 flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#181715] border-2 border-[#D6AD60] flex items-center justify-center shadow-lg shadow-[#D6AD60]/30 transition-transform duration-300 hover:scale-125">
                      <span className="text-xs font-mono text-[#D6AD60] font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Date Pillar (Opposite Side) */}
                  <div
                    className={`w-full md:w-1/2 text-center ${
                      isEven
                        ? isRTL ? 'md:text-left' : 'md:text-right'
                        : isRTL ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div className="inline-block bg-[#181715]/90 border border-[#D6AD60]/30 rounded-2xl px-5 py-3 shadow-lg">
                      <div className="text-2xl sm:text-3xl font-cinzel font-bold text-[#D6AD60] tracking-wider">
                        {milestone.yearBCE}
                      </div>
                      <div className="text-xs text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                        {milestone.eraLabel}
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2">
                    <div
                      onClick={() => setSelectedMilestone(milestone)}
                      className="group cursor-pointer bg-[#142334]/70 hover:bg-[#16273b] border border-stone-800 hover:border-[#D6AD60]/60 rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden text-start"
                    >
                      {/* Top Accent Gradient */}
                      <div
                        className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${
                          isEven
                            ? 'from-transparent via-[#D6AD60] to-transparent'
                            : 'from-transparent via-[#176C70] to-transparent'
                        }`}
                      />

                      {/* Pharaonic Cartouche Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181715] border border-stone-800 text-[11px] font-semibold text-stone-300">
                          <MapPin className="w-3 h-3 text-[#D6AD60]" />
                          <span>{milestone.bank === 'East Bank' ? loc.eastBank : loc.westBank}</span>
                        </span>

                        <span
                          className="font-serif text-sm px-2.5 py-0.5 rounded bg-[#101D2B] border border-[#D6AD60]/40 text-[#D6AD60] tracking-widest"
                          title="Hieroglyphic Cartouche"
                        >
                          {milestone.cartoucheSymbol}
                        </span>
                      </div>

                      {/* Landmark Title */}
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white group-hover:text-[#E9D8B5] transition-colors leading-snug mb-1">
                        {milestone.landmark}
                      </h3>

                      {/* Ruler / Pharaoh */}
                      <div className="flex items-center gap-1.5 text-xs text-[#D6AD60] font-medium mb-3">
                        <Crown className="w-3.5 h-3.5 shrink-0" />
                        <span>{milestone.ruler}</span>
                      </div>

                      {/* Short Description */}
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                        {milestone.shortDesc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {milestone.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md bg-[#101D2B]/90 text-[10px] text-stone-400 border border-stone-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Card Footer with View Dossier Trigger */}
                      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-semibold text-[#E9D8B5] group-hover:text-white transition-colors">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#D6AD60]" />
                          <span>{loc.dossierModalTitle}</span>
                        </span>
                        <ChevronRight className={`w-4 h-4 text-[#D6AD60] transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Royal Archaeological Dossier Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#101D2B] border border-[#D6AD60]/40 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-start"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-stone-800 pb-4 mb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181715] border border-[#D6AD60]/30 text-xs text-[#D6AD60] font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{selectedMilestone.yearBCE} · {selectedMilestone.eraLabel}</span>
                  </div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                    {selectedMilestone.landmark}
                  </h3>
                  <div className="text-xs text-stone-400 mt-1 flex items-center gap-2">
                    <span className="text-[#D6AD60] font-medium">{selectedMilestone.ruler}</span>
                    <span>·</span>
                    <span>{selectedMilestone.bank === 'East Bank' ? loc.eastBank : loc.westBank}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Dossier Body */}
              <div className="space-y-4 text-sm leading-relaxed text-stone-300">
                {/* Architectural Feat */}
                <div className="bg-[#181715]/90 border border-stone-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6AD60] mb-1.5">
                    <Layers className="w-4 h-4 text-[#D6AD60]" />
                    <span>{loc.featLabel}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200">
                    {selectedMilestone.architecturalFeat}
                  </p>
                </div>

                {/* Historical Significance */}
                <div className="bg-[#181715]/90 border border-stone-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6AD60] mb-1.5">
                    <Crown className="w-4 h-4 text-[#D6AD60]" />
                    <span>{loc.significanceLabel}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200">
                    {selectedMilestone.significance}
                  </p>
                </div>

                {/* Optimal Visiting Window */}
                <div className="bg-[#181715]/90 border border-stone-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6AD60] mb-1.5">
                    <Sun className="w-4 h-4 text-[#D6AD60]" />
                    <span>{loc.bestHourLabel}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200 font-medium">
                    {selectedMilestone.bestVisitingTime}
                  </p>
                </div>

                {/* Direct Booking Call-To-Action */}
                <div className="pt-4 mt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-stone-400 text-center sm:text-start">
                    {loc.bookTourPrompt}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const landmark = selectedMilestone.landmark;
                      setSelectedMilestone(null);
                      if (onSelectLandmarkForBooking) {
                        onSelectLandmarkForBooking(landmark);
                      } else {
                        // Smooth scroll to tours
                        const toursEl = document.getElementById('tours');
                        if (toursEl) toursEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6AD60] to-[#E9D8B5] hover:opacity-95 text-[#101D2B] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D6AD60]/20 transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>{loc.bookTourBtn}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
