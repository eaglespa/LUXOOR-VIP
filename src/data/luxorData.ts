import { TourItem, FlatItem, TransportItem, Landmark, Currency, CurrencyRate } from '../types';

export const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  EGP: { symbol: 'E£', rate: 49.5 },
};

export const formatPrice = (amountUSD: number, currency: Currency): string => {
  const info = CURRENCY_RATES[currency];
  const converted = amountUSD * info.rate;
  if (currency === 'EGP') {
    return `${info.symbol} ${Math.round(converted).toLocaleString()}`;
  }
  return `${info.symbol}${Math.round(converted).toLocaleString()}`;
};

export const TOURS_DATA: TourItem[] = [
  {
    id: 'balloon-royal-sunrise',
    title: 'Royal Sunrise Hot Air Balloon Odyssey',
    subtitle: 'Private & Shared Sunrise Flights Over Theban Valleys',
    duration: '3.5 Hours (Flight ~55 mins)',
    location: 'West Bank Launch Site, Luxor',
    priceUSD: 110,
    featured: true,
    category: 'balloon',
    badge: 'Signature Experience',
    highlights: [
      'Pre-dawn luxury boat crossing with hot Egyptian coffee & pastries',
      'Gentle ascent to 2,500 ft as the sun crests over the Nile',
      'Panoramic bird’s-eye views of Hatshepsut Temple & Valley of the Kings',
      'Personal flight certificate signed by master pilot & celebratory sparkler',
    ],
    inclusions: [
      'Private air-conditioned hotel / boat pickup & return',
      'Continental breakfast box & hot beverages',
      'Comprehensive Egyptian Civil Aviation safety briefing',
      'Commemorative Royal Flight Certificate',
    ],
    description:
      'Gaze upon 4,000 years of civilization from the silent serenity of the morning skies. Drift gracefully above colossal ancient pylons, fertile emerald sugar cane fields, and the rugged limestone peaks of the Theban Necropolis.',
    startTimes: ['04:45 AM (Dawn Ascent)', '05:30 AM (Sunrise Gold Wave)'],
    bank: 'West Bank',
    rating: 4.98,
    reviewCount: 342,
  },
  {
    id: 'tombs-nefertari-kings',
    title: 'Valley of the Kings & Nefertari Tomb VIP Sanctuary',
    subtitle: 'Private Egyptologist Masterclass & Restricted Chamber Access',
    duration: '5 Hours',
    location: 'West Bank Theban Necropolis',
    priceUSD: 185,
    featured: true,
    category: 'temples',
    badge: 'Exclusive Access',
    highlights: [
      'Access to Queen Nefertari’s Tomb (QV66)—vivid ancient colors untouched by time',
      'Entry into Tutankhamun’s burial chamber & Seti I grand gallery',
      'Mortuary Temple of Hatshepsut at Deir el-Bahari',
      'Privileged historical lecture by Senior Licensed Egyptologist',
    ],
    inclusions: [
      'VIP Fast-track entrance admissions',
      'Private Mercedes luxury air-conditioned van',
      'Dedicated private Master Egyptologist guide',
      'Cold bottled mineral water & hibiscus tea',
    ],
    description:
      'Delve deep into the underworld tombs of Egyptian Pharaohs. Step inside the jewel of ancient tomb art—Queen Nefertari’s burial chamber—where pigments applied over 3,200 years ago glow with supernatural brilliance.',
    startTimes: ['07:30 AM (Morning Solitude)', '02:00 PM (Afternoon Gold)'],
    bank: 'West Bank',
    rating: 4.99,
    reviewCount: 289,
  },
  {
    id: 'karnak-luxor-night-illumination',
    title: 'Karnak Hypostyle & Luxor Temple Twilight Grandeur',
    subtitle: 'The Avenues of Sphinxes Under the Stars',
    duration: '4 Hours',
    location: 'East Bank, Luxor City',
    priceUSD: 95,
    featured: false,
    category: 'temples',
    highlights: [
      'Walking through the 134 colossal columns of Karnak’s Hypostyle Hall',
      'Golden hour photography along the 2.7 km restored Avenue of Sphinxes',
      'Illuminated nocturnal exploration of Luxor Temple built by Amenhotep III & Ramesses II',
      'Exclusive stop at traditional historic spice & perfume artisans',
    ],
    inclusions: [
      'All VIP temple passes and camera permits',
      'Private air-conditioned transport',
      'Licensed Egyptologist guide fluent in your language',
      'Fresh fruit juices & traditional cold Karkadeh',
    ],
    description:
      'Experience the religious heart of Ancient Thebes. Witness the giant stone pylons glow in amber illumination after dusk, casting mystical shadows across towering statues and hieroglyphic reliefs.',
    startTimes: ['08:30 AM (Daylight Architecture)', '04:30 PM (Sunset to Night Lights)'],
    bank: 'East Bank',
    rating: 4.95,
    reviewCount: 215,
  },
  {
    id: 'nile-dahabiya-sunset',
    title: 'Private Nile Sunset Dahabiya & Gourmet Dinner',
    subtitle: 'Bespoke River Cruise with Nubian Melodies & Feast',
    duration: '3.5 Hours',
    location: 'Nile River Waterfront Pier',
    priceUSD: 140,
    featured: true,
    category: 'nile',
    badge: 'Luxury Charter',
    highlights: [
      'Private charter on a handcrafted teak-wood Egyptian Dahabiya',
      'Freshly prepared multi-course Egyptian gourmet dinner onboard',
      'Sunset toast as evening breezes sweep across the tranquil Nile',
      'Live traditional acoustic oud performance under canopy of stars',
    ],
    inclusions: [
      'Exclusive boat rental with private captain & crew',
      'Chef-prepared dinner (local mezes, grilled seabass or lamb, om ali)',
      'Sparkling beverages, fresh Egyptian juices & Turkish coffee',
      'Hotel dockside round-trip transfers',
    ],
    description:
      'Sail the timeless waters that nurtured the Pharaohs. Relax on plush Egyptian cotton divans while the sun slips behind the West Bank peaks, painting the sky in crimson, violet, and gold.',
    startTimes: ['04:00 PM (Golden Hour Sailing)', '06:30 PM (Starlit Nile Dinner)'],
    bank: 'River Nile',
    rating: 4.97,
    reviewCount: 178,
  },
  {
    id: 'dendera-abydos-day-expedition',
    title: 'Sacred Hathor at Dendera & Abydos Osiris Sanctuary',
    subtitle: 'Day Excursion to Egypt’s Most Intact Painted Ceiling',
    duration: '8 Hours',
    location: 'Qena & Sohag Region (North of Luxor)',
    priceUSD: 230,
    featured: false,
    category: 'temples',
    highlights: [
      'Temple of Hathor with miraculous astronomical zodiac ceiling and subterranean crypts',
      'Abydos Temple of Seti I and enigmatic Osireion water sanctuary',
      'Private scenic journey through Upper Egyptian river villages',
      'Gourmet countryside lunch included',
    ],
    inclusions: [
      'Luxury Mercedes executive SUV / Van with private driver',
      'All regional checkpoints & fast security escorts',
      'Private Egyptologist guide for the entire day',
      'Authentic country style lunch & refreshments',
    ],
    description:
      'Venture into the heartland of Upper Egypt. Dendera features the most vibrant turquoise and cobalt blue ceiling reliefs in antiquity, while Abydos holds the sacred mythological tomb of the god Osiris.',
    startTimes: ['07:00 AM (Early Departure)'],
    bank: 'Excursion',
    rating: 4.96,
    reviewCount: 142,
  },
];

export const FLATS_DATA: FlatItem[] = [
  {
    id: 'villa-theban-nilefront',
    name: 'The Theban Royal Nilefront Villa',
    tagline: 'Private Turquoise Infinity Pool Facing Luxor Temple',
    bank: 'West Bank (Peaceful & Views)',
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    pricePerNightUSD: 320,
    featured: true,
    amenities: [
      'Private heated infinity pool',
      'Panoramic Nile riverfront terrace',
      'Dedicated private chef & daily housekeeping',
      'High-speed Starlink Wi-Fi (150 Mbps)',
      'Traditional domed brick ceilings & Egyptian alabaster accents',
      'Air conditioning in all suites',
    ],
    description:
      'An architectural masterpiece situated on the tranquil West Bank. Watch traditional feluccas glide past your breakfast terrace, or gaze across the Nile at Luxor Temple illuminated in amber lights at night.',
    view: 'Direct Unobstructed Nile & East Bank Skyline',
    distanceToNile: 'Direct Riverfront (0 meters)',
    rating: 4.98,
    reviewCount: 88,
  },
  {
    id: 'karnak-vista-penthouse',
    name: 'Karnak Horizon Luxury Penthouse',
    tagline: 'Expansive Rooftop Terrace Overlooking Corniche El Nile',
    bank: 'East Bank (City & Nile)',
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    pricePerNightUSD: 210,
    featured: true,
    amenities: [
      'Private rooftop lounge with heated jacuzzi',
      'Walking distance to Luxor Temple & Museum',
      'Floor-to-ceiling soundproof panoramic glass',
      'European designer kitchen with espresso bar',
      '24/7 building security & private elevator',
      'Airport transfer included for stays > 3 nights',
    ],
    description:
      'Modern urban luxury in the heart of Luxor. Savor evening cocktails on your elevated private deck while taking in 180-degree vistas of the River Nile and the historic Corniche.',
    view: 'Panoramic Nile & Luxor City Skyline',
    distanceToNile: '50 meters to Corniche Promenade',
    rating: 4.96,
    reviewCount: 104,
  },
  {
    id: 'medinet-habu-riad',
    name: 'Al-Qurna Heritage Dome Villa',
    tagline: 'Hassan Fathy Vernacular Oasis with Citrus Courtyard',
    bank: 'West Bank (Peaceful & Views)',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricePerNightUSD: 165,
    featured: false,
    amenities: [
      'Private walled courtyard with pomegranate & orange trees',
      'Natural passive cooling & handcrafted earth vaults',
      'Roof terrace with front-row view of sunrise hot air balloons',
      'Modern fiber-optic Wi-Fi & workspace',
      'Organic Egyptian breakfast included daily',
      'Quiet village setting 5 mins from Valley of Kings',
    ],
    description:
      'Immerse yourself in authentic Nubian and Upper Egyptian architectural grace. Crafted from natural sun-dried mudbrick and stone, this serene retreat remains wonderfully cool under the desert sun.',
    view: 'Theban Mountain Ridge & Hot Air Balloon Flight Path',
    distanceToNile: '400 meters to ferry crossing',
    rating: 4.94,
    reviewCount: 72,
  },
  {
    id: 'nefertari-suite-residence',
    name: 'Nefertari Nileview Executive Apartment',
    tagline: 'Refined 2-Bedroom Haven for Discerning Travelers',
    bank: 'East Bank (City & Nile)',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricePerNightUSD: 140,
    featured: false,
    amenities: [
      'Private balcony with direct Nile sunset views',
      'Master king suite with marble soaking tub',
      'Fully equipped kitchen with washer/dryer',
      'Curated Egyptian fine art collection',
      'Concierge service on call 24/7',
      'Ultra-fast Wi-Fi & streaming TV',
    ],
    description:
      'Designed for couples and families seeking quiet sophistication in Luxor. Enjoy serene mornings watching fishermen on the Nile and effortless access to Luxor’s premier fine dining.',
    view: 'River Nile & West Bank Theban Mountain',
    distanceToNile: 'Direct waterfront promenade',
    rating: 4.92,
    reviewCount: 65,
  },
];

export const TRANSPORT_DATA: TransportItem[] = [
  {
    id: 'airport-vip-chauffeur',
    name: 'Airport VIP Fast-Track & Chauffeur Transfer',
    category: 'airport',
    vehicleType: 'Mercedes-Benz E-Class / S-Class Sedan',
    passengers: 3,
    luggage: 3,
    rateType: 'per-trip',
    priceUSD: 45,
    features: [
      'VIP Terminal meet-and-assist at Luxor Airport (LXR)',
      'Luggage porterage straight to vehicle',
      'Chilled bottled mineral water, wet towels & mints',
      'English-speaking certified executive chauffeur',
      'Direct private transfer to any hotel or villa in Luxor',
    ],
    description:
      'Effortless arrival into ancient Luxor. Skip long taxi queues and airport hassles with our prompt curbside luxury chauffeur service.',
  },
  {
    id: 'executive-vclass-daily',
    name: 'Full-Day Private Chauffeur & Executive Van',
    category: 'chauffeur',
    vehicleType: 'Mercedes-Benz V-Class / Toyota VIP Granvia',
    passengers: 7,
    luggage: 8,
    rateType: 'per-day',
    priceUSD: 140,
    features: [
      '10 hours of private on-demand luxury vehicle at your service',
      'Air conditioning with dual climate zones and leather reclining seats',
      'Complimentary Wi-Fi onboard & device charging ports',
      'Flexible routing between East Bank temples, West Bank monuments & dining',
      'All fuel, parking, and bridge/checkpoint tolls covered',
    ],
    description:
      'The ultimate in convenience and flexibility. Your private luxury minivan and chauffeur wait at every monument while you explore at your own pace.',
  },
  {
    id: 'nile-private-speedboat',
    name: 'Private Nile Speedboat & Water Taxi Charter',
    category: 'nile-boat',
    vehicleType: 'Handcrafted Wooden Speedboat with Canopy',
    passengers: 8,
    luggage: 6,
    rateType: 'per-trip',
    priceUSD: 35,
    features: [
      'Direct cross-river transit between East Bank & West Bank',
      'Private dock-to-dock service in under 7 minutes',
      'Avoid road traffic and public ferry lines',
      'Life jackets and certified maritime safety captain',
      'Sunset cruise extension available',
    ],
    description:
      'The most scenic and rapid way to navigate Luxor. Seamlessly travel between your hotel, West Bank villas, and riverfront monuments across the pristine Nile waters.',
  },
  {
    id: 'desert-quad-safari',
    name: 'VIP Private Theban Desert Quad & 4x4 Expedition',
    category: 'desert-safari',
    vehicleType: 'Yamaha 450cc ATVs & Land Cruiser 4WD',
    passengers: 4,
    luggage: 0,
    rateType: 'per-trip',
    priceUSD: 65,
    features: [
      'Sunset or sunrise quad biking across the Theban desert dunes',
      'Private safari guide and safety helmets provided',
      'Visit to traditional Bedouin tent for herbal tea and freshly baked flatbread',
      'Panoramic photographic stops overlooking the Valley of Queens',
    ],
    description:
      'Feel the desert breeze and rugged golden sands behind the ancient Theban mountains on an exclusive private quad expedition.',
  },
];

export const LANDMARKS: Landmark[] = [
  {
    id: 'karnak',
    name: 'Karnak Temple Complex',
    bank: 'east',
    century: '2055 BC – 100 AD (Over 30 Pharaohs)',
    brief: 'The largest religious complex ever constructed by human hands, dedicated to Amun-Ra.',
    features: ['Great Hypostyle Hall (134 massive pillars)', 'Sacred Lake with granite scarab beetle', 'Colossal Obelisks of Queen Hatshepsut'],
    tip: 'Best visited at 8:00 AM for soft morning light filtering through the columns, or after 5:30 PM for illumination.',
  },
  {
    id: 'luxor-temple',
    name: 'Luxor Temple & Avenue of Sphinxes',
    bank: 'east',
    century: '1400 BC (Amenhotep III & Ramesses II)',
    brief: 'The majestic site of the annual Opet festival, connected to Karnak by a 2.7 km paved avenue of sphinxes.',
    features: ['Gigantic seated statues of Ramesses II', 'Pink granite obelisk (sister to the Paris obelisk)', 'Nighttime floodlit walking promenade'],
    tip: 'Splendid at twilight when the sandstone turns warm gold and the night sky deepens into sapphire lapis.',
  },
  {
    id: 'valley-kings',
    name: 'Valley of the Kings',
    bank: 'west',
    century: '1539 – 1075 BC (18th to 20th Dynasties)',
    brief: 'The subterranean royal necropolis containing 63 carved pharaonic tombs including Tutankhamun and Seti I.',
    features: ['Vivid wall murals depicting the Egyptian Book of the Dead', 'Deep descending corridors into the living rock', 'Tomb of King Tut (KV62)'],
    tip: 'Arrive early at opening (06:00 AM) to experience the silence of the ancient desert before large tour groups arrive.',
  },
  {
    id: 'hatshepsut',
    name: 'Mortuary Temple of Hatshepsut',
    bank: 'west',
    century: '1479 – 1458 BC',
    brief: 'A daring masterwork of ancient terraced architecture cut into the towering cliff walls of Deir el-Bahari.',
    features: ['Colonnaded three-tiered terraces', 'Reliefs of the legendary voyage to the Land of Punt', 'Statues of Hatshepsut portrayed as Osiris'],
    tip: 'Visible from hot air balloons during sunrise ascent with breathtaking contrast against the red limestone mountain.',
  },
  {
    id: 'memnon',
    name: 'Colossi of Memnon',
    bank: 'west',
    century: '1350 BC',
    brief: 'Two 18-meter quartzite sandstone monoliths that once stood guard at Amenhotep III’s memorial temple.',
    features: ['Legendary singing statues of antiquity', 'Intricate side reliefs showing Hapi uniting Upper and Lower Egypt'],
    tip: 'An easy photostop situated right along the main road to the Valleys; accessible free of charge anytime.',
  },
];

export const VIP_ADDONS = [
  {
    id: 'addon-egyptologist',
    name: 'Private Egyptologist Master Guide',
    priceUSD: 60,
    desc: 'University lecturer & fluent English/French/German speaking expert',
  },
  {
    id: 'addon-champagne',
    name: 'Sunrise Champagne & Caviar Basket',
    priceUSD: 50,
    desc: 'Served dockside or post-balloon flight with artisan treats',
  },
  {
    id: 'addon-drone',
    name: 'Professional 4K Video & Photo Memory Reel',
    priceUSD: 85,
    desc: 'Dedicated photographer with high-res edited files in 24 hours',
  },
  {
    id: 'addon-fasttrack',
    name: 'VIP Airport Meet & Immigration Fast-Track',
    priceUSD: 40,
    desc: 'Skip all lines at Luxor LXR International Airport',
  },
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Lord Henry & Lady Kensington',
    origin: 'London, United Kingdom',
    experience: 'Sunrise Balloon & Theban Villa Stay',
    quote:
      'GO VOYAGE orchestrated the single most memorable trip of our lives. Watching the sunrise from 2,500 feet over the Valley of the Kings was breathtaking, and our villa on the West Bank was pure sanctuary.',
    date: 'February 2026',
    rating: 5,
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    origin: 'Geneva, Switzerland',
    experience: 'Private Dahabiya & Exclusive Nefertari Access',
    quote:
      'The attention to detail was impeccable. From the Mercedes airport pickup to having the Tomb of Nefertari entirely to ourselves with our private Egyptologist guide. Truly elite standard.',
    date: 'January 2026',
    rating: 5,
  },
  {
    id: 'rev-3',
    author: 'Marcus Vance & Sophia Chen',
    origin: 'San Francisco, USA',
    experience: 'Full Week Luxury Flat & Chauffeur Fleet',
    quote:
      'The Karnak Horizon penthouse had the finest Nile terrace in the city. Having an executive V-Class chauffeur on standby made exploring temples effortless in the desert heat. Will definitely return!',
    date: 'March 2026',
    rating: 5,
  },
];

export const FAQS = [
  {
    q: 'How safe are the Hot Air Balloon flights in Luxor?',
    a: 'GO VOYAGE partners exclusively with top-tier operators fully licensed and audited daily by the Egyptian Civil Aviation Authority. Flights are commanded by pilots with over 15+ years of flight hours, utilizing state-of-the-art Cameron balloons with radar wind clearance.',
  },
  {
    q: 'What is the advantage of staying on the West Bank vs. East Bank?',
    a: 'The East Bank is lively, featuring the modern Luxor city, vibrant bazaars, fine hotels, and Karnak and Luxor Temples. The West Bank is idyllic, peaceful, surrounded by lush date palms and sugar cane, situated minutes from the royal tombs and balloon launch sites.',
  },
  {
    q: 'Can you arrange custom tailor-made itineraries?',
    a: 'Absolutely. Our 24/7 VIP Concierge creates bespoke itineraries covering private jet charters, Nile dahabiyas, private tomb viewings outside public hours, private chef dining, and cross-Egypt extensions to Cairo and Aswan.',
  },
  {
    q: 'What currencies do you accept for booking?',
    a: 'We accept US Dollars (USD), Euros (EUR), British Pounds (GBP), and Egyptian Pounds (EGP) via all major credit cards, bank wire transfers, and instant digital payments with zero hidden surcharges.',
  },
];
