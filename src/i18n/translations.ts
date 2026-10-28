export type Language = 'en' | 'ar' | 'de' | 'fr' | 'es' | 'it' | 'ru' | 'zh-CN';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
  isRtl?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية', isRtl: true },
  { code: 'de', label: 'German', nativeName: 'Deutsch' },
  { code: 'fr', label: 'French', nativeName: 'Français' },
  { code: 'es', label: 'Spanish', nativeName: 'Español' },
  { code: 'it', label: 'Italian', nativeName: 'Italiano' },
  { code: 'ru', label: 'Russian', nativeName: 'Русский' },
  { code: 'zh-CN', label: 'Chinese', nativeName: '简体中文' },
];

export interface Translations {
  nav: {
    explore: string;
    experiences: string;
    stay: string;
    transportation: string;
    privateTours: string;
    about: string;
    bookNow: string;
    myBookings: string;
    adminDashboard: string;
    soundActive: string;
    soundMute: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    catTours: string;
    catFlats: string;
    catTransfers: string;
    catAirport: string;
    catDrivers: string;
    catPackages: string;
    date: string;
    travelers: string;
    guest: string;
    guests: string;
    checkAvailability: string;
    verifiedBadge: string;
    ratesFrom: string;
    perNight: string;
    night: string;
  };
  tours: {
    kicker: string;
    heading: string;
    desc: string;
    all: string;
    balloon: string;
    temples: string;
    nile: string;
    dayTrips: string;
    reserve: string;
    from: string;
    perPerson: string;
    inclusions: string;
    departureWaves: string;
    lessDetails: string;
    fullDetails: string;
    // Aliases
    tabAll: string;
    tabBalloon: string;
    tabTemples: string;
    tabNile: string;
    vipInclusions: string;
    fullInclusions: string;
    passFrom: string;
    reservePass: string;
  };
  flats: {
    kicker: string;
    heading: string;
    desc: string;
    all: string;
    westBank: string;
    eastBank: string;
    tabAll: string;
    tabWest: string;
    tabEast: string;
    bedrooms: string;
    bathrooms: string;
    baths: string;
    guests: string;
    upTo: string;
    view: string;
    vista: string;
    nileDistance: string;
    nileProximity: string;
    ratePerNight: string;
    nightlyRental: string;
    reserve: string;
    reserveResidence: string;
  };
  transport: {
    kicker: string;
    heading: string;
    desc: string;
    airportBadge: string;
    flightTracking: string;
    passengers: string;
    suitcases: string;
    fixedRate: string;
    fullDayRate: string;
    fullDay: string;
    reserve: string;
    reserveChauffeur: string;
  };
  nileBanks: {
    kicker: string;
    heading: string;
    desc: string;
    westBankTab: string;
    eastBankTab: string;
    selectMonument: string;
    westBankEssence: string;
    eastBankEssence: string;
    westBankSummary: string;
    eastBankSummary: string;
    dossier: string;
    era: string;
    highlights: string;
    tipTitle: string;
  };
  balloon: {
    kicker: string;
    heading: string;
    desc: string;
    corridor: string;
    altitude: string;
    wind: string;
    dawnMist: string;
    sunriseFlash: string;
    goldenSands: string;
    igniteBurner: string;
    ascend: string;
    descend: string;
    reserveFlight: string;
  };
  planner: {
    kicker: string;
    heading: string;
    desc: string;
    duration: string;
    days: string;
    partySize: string;
    accommodation: string;
    activities: string;
    summaryTitle: string;
    proposal: string;
    totalForGuests: string;
    inclusive: string;
    lockIn: string;
    included: string;
    licensedGuide: string;
    noLodging: string;
  };
  reviews: {
    flightsFlown: string;
    flightsSub: string;
    score: string;
    scoreSub: string;
    meetAssist: string;
    meetAssistSub: string;
    endorsementsKicker: string;
    endorsementsHeading: string;
    faqKicker: string;
    faqHeading: string;
  };
  nefertari: {
    name: string;
    role: string;
    badge: string;
    greeting: string;
    inputPlaceholder: string;
    voiceActive: string;
    voiceListening: string;
    voiceProcessing: string;
    voiceSpeaking: string;
    voiceStart: string;
    voiceStop: string;
    speechFallback: string;
    quickPromptsTitle: string;
    prompts: string[];
    bookNowAction: string;
  };
  admin: {
    title: string;
    subtitle: string;
    totalRevenue: string;
    activeBookings: string;
    fleetDeployed: string;
    occupancyRate: string;
    bookingsTab: string;
    toursTab: string;
    propertiesTab: string;
    fleetTab: string;
    statusConfirmed: string;
    statusPending: string;
    statusCancelled: string;
  };
  concierge: {
    desk: string;
    welcome: string;
    placeholder: string;
    connectWhatsApp: string;
    onlinePass: string;
    ctaButton: string;
  };
  modal: {
    passTitle: string;
    tabTours: string;
    tabFlats: string;
    tabTransport: string;
    customPlan: string;
    selectItem: string;
    date: string;
    flightWave: string;
    stayLength: string;
    pickupTime: string;
    travelers: string;
    pickupLocation: string;
    pickupPlaceholder: string;
    vipAddons: string;
    leadTraveler: string;
    fullName: string;
    email: string;
    phone: string;
    specialRequests: string;
    totalInvestment: string;
    zeroFees: string;
    confirmButton: string;
    confirmedRibbon: string;
    voucherTitle: string;
    refId: string;
    travelerLabel: string;
    dateLabel: string;
    partyLabel: string;
    totalPaid: string;
    verifiedPass: string;
    passInstructions: string;
    pickupPoint: string;
    savePrint: string;
    whatsappConcierge: string;
    done: string;
  };
  footer: {
    tagline: string;
    licensing: string;
    quickLinks: string;
    guides: string;
    contact: string;
    rights: string;
    privacy: string;
    terms: string;
    cancellation: string;
    accessibility: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      explore: 'Explore Luxor',
      experiences: 'Experiences',
      stay: 'Stay in Luxor',
      transportation: 'Transportation',
      privateTours: 'Private Tours',
      about: 'About Luxor',
      bookNow: 'Book Now',
      myBookings: 'My Bookings',
      adminDashboard: 'Admin Panel',
      soundActive: 'Mute ambient sound',
      soundMute: 'Play ambient desert sound',
    },
    hero: {
      kicker: 'The Premier Travel Concierge in Ancient Thebes',
      title: 'Discover Luxor. Experience Eternity.',
      subtitle:
        'Extraordinary journeys, unforgettable stays, and seamless travel through the heart of ancient Egypt.',
      primaryCta: 'Explore Experiences',
      secondaryCta: 'Plan Your Journey',
      catTours: 'Tours & Excursions',
      catFlats: 'Holiday Apartments',
      catTransfers: 'Private Transfers',
      catAirport: 'Airport Pickups',
      catDrivers: 'Private Drivers',
      catPackages: 'Multi-Day Packages',
      date: 'Date',
      travelers: 'Travelers',
      guest: 'Guest',
      guests: 'Guests',
      checkAvailability: 'Check Rates & Dates',
      verifiedBadge: 'Egyptian Ministry of Tourism Certified · Civil Aviation Approved',
      ratesFrom: 'Verified rates from',
      perNight: 'night',
      night: 'night',
    },
    tours: {
      kicker: '01. Curated Historical Expeditions',
      heading: 'FEATURED TOURS & EXPERIENCES',
      desc: 'Guided by certified Egyptologists with private climate-controlled vehicles and privileged admissions.',
      all: 'All Experiences',
      balloon: 'Hot Air Balloon',
      temples: 'Pharaonic Temples',
      nile: 'Nile Sailing',
      dayTrips: 'Day Excursions',
      reserve: 'Book Experience',
      from: 'From',
      perPerson: '/ person',
      inclusions: 'VIP Inclusions:',
      departureWaves: 'Departure Waves:',
      lessDetails: 'Less Details',
      fullDetails: 'Full Itinerary & Inclusions',
      tabAll: 'All Experiences',
      tabBalloon: 'Hot Air Balloon',
      tabTemples: 'Pharaonic Temples',
      tabNile: 'Nile Sailing',
      vipInclusions: 'VIP Inclusions:',
      fullInclusions: 'Full Itinerary & Inclusions',
      passFrom: 'Pass From',
      reservePass: 'Book Experience',
    },
    flats: {
      kicker: '02. Sanctuary & Residence',
      heading: 'STAY IN LUXOR — FLATS & VILLAS',
      desc: 'Boutique riverfront apartments, private pool estates, and historic residences across the East and West Banks.',
      all: 'All Accommodations',
      westBank: 'West Bank (Peaceful & Views)',
      eastBank: 'East Bank (City & Promenade)',
      tabAll: 'All Accommodations',
      tabWest: 'West Bank (Peaceful & Views)',
      tabEast: 'East Bank (City & Promenade)',
      bedrooms: 'Bedrooms',
      bathrooms: 'Baths',
      baths: 'Baths',
      guests: 'Max Guests',
      upTo: 'Up to',
      view: 'Panorama:',
      vista: 'Panorama:',
      nileDistance: 'Nile Proximity:',
      nileProximity: 'Nile Proximity:',
      ratePerNight: 'Nightly Rate',
      nightlyRental: 'Nightly Rate',
      reserve: 'Reserve Property',
      reserveResidence: 'Reserve Property',
    },
    transport: {
      kicker: '03. Travel in Comfort',
      heading: 'VIP TOURISM TRANSPORT & TRANSFERS',
      desc: 'Executive airport transfers, hourly private chauffeurs, Nile water taxis, and 4x4 desert expeditions.',
      airportBadge: 'Flight tracking & 60 min complimentary wait time at Luxor Airport (LXR)',
      flightTracking: 'Flight tracking & 60 min complimentary wait time at Luxor Airport (LXR)',
      passengers: 'Passengers',
      suitcases: 'Suitcases',
      fixedRate: 'Fixed Rate',
      fullDayRate: 'Full Day (10h)',
      fullDay: 'Full Day (10h)',
      reserve: 'Reserve Vehicle',
      reserveChauffeur: 'Reserve Vehicle',
    },
    nileBanks: {
      kicker: '04. Geographical & Mythological Harmony',
      heading: 'THE TWO REALMS OF ANCIENT THEBES',
      desc: 'The Nile divides Luxor into two sacred halves: The East Bank, realm of the rising sun and monumental living temples; and the West Bank, realm of sunset and eternal rebirth.',
      westBankTab: 'West Bank · Realm of Eternity',
      eastBankTab: 'East Bank · City of Sun & Life',
      selectMonument: 'Select Monument to Inspect:',
      westBankEssence: 'West Bank Essence:',
      eastBankEssence: 'East Bank Essence:',
      westBankSummary:
        'Home to hundreds of subterranean rock-cut tombs, secluded desert valleys, hot air balloon flight corridors, and serene rural village estates.',
      eastBankSummary:
        'Home to the bustling Corniche promenade, the monumental temples of Karnak and Luxor connected by the Sphinxes avenue, luxury bazaars, and riverfront restaurants.',
      dossier: 'Archaeological Dossier',
      era: 'Era & Reign',
      highlights: 'Architectural Highlights',
      tipTitle: 'VIP Concierge Tip:',
    },
    balloon: {
      kicker: '05. Interactive 360° Aerial Simulator',
      heading: 'SUNRISE BALLOON FLIGHT SIMULATOR',
      desc: 'Experience the sensory magic of floating above ancient Thebes before you fly. Adjust altitude, ignite the burner, and discover monuments visible from the flight corridor.',
      corridor: 'West Bank / Theban Valleys',
      altitude: 'Current Altitude',
      wind: 'Wind Velocity',
      dawnMist: '05:15 Dawn Mist',
      sunriseFlash: '05:45 Sunrise Flash',
      goldenSands: '06:15 Golden Sands',
      igniteBurner: 'Ignite Burner Pulse',
      ascend: 'Ascend',
      descend: 'Descend',
      reserveFlight: 'Reserve Sunrise Flight',
    },
    planner: {
      kicker: '06. Tailored Bespoke Itinerary',
      heading: 'DESIGN YOUR BESPOKE LUXOR ODYSSEY',
      desc: 'Craft your personalized royal journey through ancient Thebes. Select your preferred days, luxury flat or villa sanctuary, and signature monuments for an instant bespoke estimate.',
      duration: 'Duration in Luxor',
      days: 'Days',
      partySize: 'Party Size',
      accommodation: 'Preferred Luxury Flat / Villa Sanctuary',
      activities: 'Curated Activities & Additions',
      summaryTitle: 'Bespoke Odyssey Summary',
      proposal: 'Curated Package Proposal',
      totalForGuests: 'Estimated Total For All Guests',
      inclusive: 'Inclusive of all local permits, entrance taxes, and private transfers',
      lockIn: 'Lock In Bespoke Proposal',
      included: 'Included',
      licensedGuide: 'Licensed Senior Guide',
      noLodging: 'No lodging',
    },
    reviews: {
      flightsFlown: 'Sunrise Flights Successfully Flown',
      flightsSub: 'Audited daily under Egyptian Civil Aviation standards',
      score: 'Verified Luxury Traveler Score',
      scoreSub: 'Over 940+ authenticated global luxury reviews',
      meetAssist: 'Airport Meet & Assist Success Rate',
      meetAssistSub: 'Zero missed pickups with real-time flight radar tracking',
      endorsementsKicker: '07. Endorsements & Guest Accounts',
      endorsementsHeading: 'VOICES OF DISTINGUISHED TRAVELERS',
      faqKicker: 'Essential Guidance',
      faqHeading: 'FREQUENTLY ASKED QUESTIONS',
    },
    nefertari: {
      name: 'Nefertari',
      role: 'Your Luxor Travel Companion',
      badge: 'Multilingual AI Concierge',
      greeting:
        'Greetings! I am Nefertari, your personal Luxor travel companion. How may I assist your voyage through ancient Thebes today?',
      inputPlaceholder: 'Ask about temples, balloon flights, luxury flats, or private drivers...',
      voiceActive: 'Voice Mode Active',
      voiceListening: 'Listening to your voice...',
      voiceProcessing: 'Consulting Luxor chronicles...',
      voiceSpeaking: 'Nefertari is speaking...',
      voiceStart: 'Speak to Nefertari',
      voiceStop: 'Stop Voice Playback',
      speechFallback: 'Voice speech recognition is active. Type or speak anytime.',
      quickPromptsTitle: 'Curated Recommendations:',
      prompts: [
        'Recommend the best sunrise hot air balloon flight',
        'Which luxury flat has the best Nile sunset view?',
        'Arrange an executive Mercedes airport pickup',
        'What are the must-see tombs in Valley of the Kings?',
      ],
      bookNowAction: 'Reserve Selected Experience',
    },
    admin: {
      title: 'GO VOYAGE Operational Management',
      subtitle: 'Live bookings, fleet dispatch, availability calendars, and inventory control',
      totalRevenue: 'Gross Revenue (MTD)',
      activeBookings: 'Confirmed Bookings',
      fleetDeployed: 'Active Chauffeur Fleets',
      occupancyRate: 'Average Villa Occupancy',
      bookingsTab: 'Reservations',
      toursTab: 'Tours & Schedules',
      propertiesTab: 'Flats & Villas',
      fleetTab: 'Transport Fleet',
      statusConfirmed: 'Confirmed',
      statusPending: 'Pending Review',
      statusCancelled: 'Cancelled',
    },
    concierge: {
      desk: '24/7 VIP Concierge Desk',
      welcome: 'Welcome to Luxor. How may our private concierge team assist your journey today?',
      placeholder: 'e.g., Inquiring about private balloon charter or villa availability for next weekend...',
      connectWhatsApp: 'Connect on WhatsApp',
      onlinePass: 'Online Pass',
      ctaButton: 'VIP CONCIERGE',
    },
    modal: {
      passTitle: 'GO VOYAGE RESERVATION PASS',
      tabTours: 'Tours & Balloon',
      tabFlats: 'Flats & Villas',
      tabTransport: 'VIP Transport',
      customPlan: 'Bespoke Custom Plan:',
      selectItem: 'Select Specific Experience / Property',
      date: 'Date',
      flightWave: 'Flight / Start Wave',
      stayLength: 'Length of Stay',
      pickupTime: 'Pickup Time',
      travelers: 'Travelers',
      pickupLocation: 'Luxor Hotel, Nile Cruise Ship, or Villa Name',
      pickupPlaceholder: 'e.g. Winter Palace Luxor, Steigenberger Nile, or West Bank Villa',
      vipAddons: 'Enhance With VIP Concierge Add-Ons',
      leadTraveler: 'Lead Traveler Details',
      fullName: 'Full Name *',
      email: 'Email Address *',
      phone: 'WhatsApp / Phone *',
      specialRequests: 'Special requests, dietary preferences, celebrations...',
      totalInvestment: 'Total Investment',
      zeroFees: 'Zero booking fees · Flexible 24h cancellation',
      confirmButton: 'Confirm & Issue VIP Pass',
      confirmedRibbon: 'CONFIRMED',
      voucherTitle: 'Royal Luxor Travel Voucher',
      refId: 'Reference ID',
      travelerLabel: 'Traveler',
      dateLabel: 'Date',
      partyLabel: 'Party',
      totalPaid: 'Total Paid',
      verifiedPass: 'Verified VIP Digital Pass',
      passInstructions:
        'Present this voucher or QR code to your private chauffeur upon arrival. Our team has dispatched your itinerary to your WhatsApp & Email.',
      pickupPoint: 'Pickup point:',
      savePrint: 'Save / Print Voucher',
      whatsappConcierge: 'WhatsApp Concierge',
      done: 'Done',
    },
    footer: {
      tagline:
        'The definitive luxury travel and booking platform in Luxor, Egypt. Culturally authentic, verified, and uncompromising.',
      licensing: 'Licensed by Egyptian Ministry of Tourism & Civil Aviation Authority',
      quickLinks: 'Navigation',
      guides: 'Destination Guides',
      contact: 'VIP Concierge Desk',
      rights: 'GO VOYAGE Global Hospitality. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cancellation: 'Cancellation & Refunds',
      accessibility: 'Accessibility Commitment',
    },
  },

  ar: {
    nav: {
      explore: 'استكشف الأقصر',
      experiences: 'التجارب السياحية',
      stay: 'الإقامة في الأقصر',
      transportation: 'النقل والليموزين',
      privateTours: 'الجولات الخاصة',
      about: 'عن الأقصر',
      bookNow: 'احجز الآن',
      myBookings: 'حجوزاتي',
      adminDashboard: 'لوحة الإدارة',
      soundActive: 'كتم الصوت الصحراوي',
      soundMute: 'تشغيل المؤثرات الصوتية',
    },
    hero: {
      kicker: 'الكونسيرج السياحي الفاخر الأول في طيبة القديمة',
      title: 'اكتشف الأقصر. عِش الخلود.',
      subtitle:
        'رحلات استثنائية، وإقامات لا تُنسى، وتنقل سلس في قلب مصر القديمة.',
      primaryCta: 'استكشف التجارب',
      secondaryCta: 'خطط لرحلتك',
      catTours: 'الجولات والرحلات',
      catFlats: 'الشقق الفندقية والفلل',
      catTransfers: 'التوصيل الخاص',
      catAirport: 'استقبال المطار',
      catDrivers: 'سائق خاص بالساعة',
      catPackages: 'باقات متعددة الأيام',
      date: 'التاريخ',
      travelers: 'المسافرين',
      guest: 'مسافر',
      guests: 'مسافرين',
      checkAvailability: 'عرض الأسعار والتوفر',
      verifiedBadge: 'معتمد رسمياً من وزارة السياحة المصرية · مرخص من سلطة الطيران المدني',
      ratesFrom: 'أسعار معتمدة تبدأ من',
      perNight: 'ليلة',
      night: 'ليلة',
    },
    tours: {
      kicker: '01. الرحلات التاريخية الملكية',
      heading: 'التجارب والرحلات المختارة',
      desc: 'بإشراف باحثين معتمدين في علم المصريات وسيارات خاصة ومكيفة مع تذاكر دخول خاصة دون انتظار.',
      all: 'جميع التجارب',
      balloon: 'منطاد شروق الشمس',
      temples: 'المعابد الفرعونية',
      nile: 'الإبحار في النيل',
      dayTrips: 'رحلات اليوم الكامل',
      reserve: 'حجز التجربة',
      from: 'من',
      perPerson: '/ للفرد',
      inclusions: 'المميزات الملكية المشمولة:',
      departureWaves: 'مواعيد الانطلاق:',
      lessDetails: 'تفاصيل أقل',
      fullDetails: 'البرنامج والمميزات كاملة',
      tabAll: 'جميع التجارب',
      tabBalloon: 'منطاد شروق الشمس',
      tabTemples: 'المعابد الفرعونية',
      tabNile: 'الإبحار في النيل',
      vipInclusions: 'المميزات الملكية المشمولة:',
      fullInclusions: 'البرنامج والمميزات كاملة',
      passFrom: 'تبدأ التذكرة من',
      reservePass: 'حجز التجربة',
    },
    flats: {
      kicker: '02. الإقامة والاسترخاء',
      heading: 'شقق وفلل فندقية فاخرة على النيل',
      desc: 'شقق راقية بإطلالات نيلية ممتدة، وفلل بمسبح خاص، وعمارة نوبية ساحرة بالبرين الغربي والشرقي.',
      all: 'جميع الإقامات',
      westBank: 'البر الغربي (هدوء ومسابح خاصة)',
      eastBank: 'البر الشرقي (وسط المدينة والكورنيش)',
      tabAll: 'جميع الإقامات',
      tabWest: 'البر الغربي (هدوء ومسابح خاصة)',
      tabEast: 'البر الشرقي (وسط المدينة والكورنيش)',
      bedrooms: 'غرف نوم',
      bathrooms: 'حمامات',
      baths: 'حمامات',
      guests: 'العدد الأقصى',
      upTo: 'تتسع لـ',
      view: 'الإطلالة:',
      vista: 'الإطلالة:',
      nileDistance: 'القرب من النيل:',
      nileProximity: 'القرب من النيل:',
      ratePerNight: 'سعر الليلة',
      nightlyRental: 'سعر الليلة',
      reserve: 'حجز الإقامة',
      reserveResidence: 'حجز الإقامة',
    },
    transport: {
      kicker: '03. السفر براحة تامة',
      heading: 'خدمات النقل السياحي الفاخر وسيارات مع سائق',
      desc: 'خدمة استقبال فاخرة بمطار الأقصر، وسيارات مرسيدس-بنز مع سائق خاص، ولنشات نيلية سريعة، ورحلات سفاري صحراوية.',
      airportBadge: 'متابعة مباشرة لرحلات الطيران مع 60 دقيقة انتظار مجاني بمطار الأقصر (LXR)',
      flightTracking: 'متابعة مباشرة لرحلات الطيران مع 60 دقيقة انتظار مجاني بمطار الأقصر (LXR)',
      passengers: 'ركاب',
      suitcases: 'حقائب',
      fixedRate: 'سعر الرحلة',
      fullDayRate: 'يوم كامل (10 ساعات)',
      fullDay: 'يوم كامل (10 ساعات)',
      reserve: 'حجز السيارة والسائق',
      reserveChauffeur: 'حجز السيارة والسائق',
    },
    nileBanks: {
      kicker: '04. التناغم الجغرافي والأسطوري',
      heading: 'عالما طيبة القديمة: البر الشرقي والغربي',
      desc: 'يقسم النيل مدينة الأقصر إلى شطرين مقدسين: البر الشرقي، موطن شروق الشمس ومعابد الحياة العظيمة؛ والبر الغربي، موطن المغيب والخلود الأبدي.',
      westBankTab: 'البر الغربي · عالم الخلود والمقابر الملكية',
      eastBankTab: 'البر الشرقي · مدينة الشمس والحياة والمعابد',
      selectMonument: 'اختر المعلم الأثري للاستكشاف:',
      westBankEssence: 'جوهر البر الغربي:',
      eastBankEssence: 'جوهر البر الشرقي:',
      westBankSummary:
        'موطن مئات المقابر المنحوتة في صخور الجبال والوديان الصحراوية المهيبة، وممرات إقلاع مناطيد الهواء الساخن، والفلل الريفية الهادئة.',
      eastBankSummary:
        'موطن كورنيش النيل النابض بالحياة، ومعابد الكرنك والأقصر المتصلة بطريق الكباش التاريخي، والأسواق والمطاعم الفاخرة.',
      dossier: 'الملف الأثري الموثق',
      era: 'العصر والحكم',
      highlights: 'أبرز الملامح المعمارية',
      tipTitle: 'نصيحة الكونسيرج الخاصة:',
    },
    balloon: {
      kicker: '05. محاكي الطيران الجوي 360 درجة',
      heading: 'محاكي رحلة المنطاد عند شروق الشمس',
      desc: 'عش سحر التحليق الصامت فوق طيبة القديمة قبل أن تطير في الواقع. اضبط الارتفاع، وأشعل شعلة الغاز، واكتشف المعالم الأثرية الظاهرة في مسار الطيران.',
      corridor: 'البر الغربي / وادي الملوك والملكات',
      altitude: 'الارتفاع الحالي',
      wind: 'سرعة الرياح',
      dawnMist: '05:15 فجر مهيب',
      sunriseFlash: '05:45 وميض الشروق',
      goldenSands: '06:15 رمال ذهبية',
      igniteBurner: 'إشعال شعلة المنطاد',
      ascend: 'صعود',
      descend: 'هبوط',
      reserveFlight: 'حجز رحلة شروق الشمس الحقيقية',
    },
    planner: {
      kicker: '06. برنامج سفر مخصص بالكامل',
      heading: 'صمّم رحلتك الملكية المخصصة في الأقصر',
      desc: 'اختر مدة إقامتك، وفيلتك النيلية المفضلة، وجولاتك الخاصة لتحصل على تسعير فوري ومخصص لمجموعتك مع إشراف كونسيرج خاص على مدار الساعة.',
      duration: 'مدة الإقامة في الأقصر',
      days: 'أيام',
      partySize: 'عدد الضيوف',
      accommodation: 'الإقامة الفاخرة المفضلة',
      activities: 'الأنشطة والرحلات المختارة',
      summaryTitle: 'ملخص الرحلة المخصصة',
      proposal: 'مقترح برنامجك السياحي',
      totalForGuests: 'التكلفة الإجمالية التقديرية لجميع الضيوف',
      inclusive: 'شاملة جميع تصاريح الزيارة، والرسوم، والنقل الخاص المكيف',
      lockIn: 'تأكيد وحجز البرنامج المخصص',
      included: 'مشمول',
      licensedGuide: 'مرشد مصريات أول معتمد',
      noLodging: 'جولات وتنقلات فقط (بدون سكن)',
    },
    reviews: {
      flightsFlown: 'رحلة منطاد ناجحة وآمنة',
      flightsSub: 'مراقبة وفحص يومي وفق أعلى معايير الطيران المدني',
      score: 'تقييم المسافرين المميزين',
      scoreSub: 'أكثر من 940 تقييم موثق من عشاق السفر الفاخر',
      meetAssist: 'دقة استقبال وتوديع المطار',
      meetAssistSub: 'صفر تأخير بفضل نظام الرادار ومتابعة مسار الرحلات',
      endorsementsKicker: '07. آراء كبار الشخصيات والنزلاء',
      endorsementsHeading: 'شهادات وانطباعات ضيوفنا الكرام',
      faqKicker: 'معلومات وإرشادات هامة',
      faqHeading: 'الأسئلة الشائعة والأكثر تكراراً',
    },
    nefertari: {
      name: 'نفرتاري',
      role: 'مساعدتكِ السياحية في الأقصر',
      badge: 'كونسيرج الذكاء الاصطناعي متعدد اللغات',
      greeting:
        'مرحباً بك! أنا نفرتاري، رفيقتكِ الذكية لرحلتك في الأقصر. كيف يمكنني إرشادكِ واكتشاف كنوز طيبة اليوم؟',
      inputPlaceholder: 'اسأل عن المعابد، رحلات المنطاد، الشقق النيلية، أو سيارات الليموزين...',
      voiceActive: 'وضع التحدث الصوتي نشط',
      voiceListening: 'أستمع لصوتكِ الآن...',
      voiceProcessing: 'أبحث في سجلات الأقصر التاريخية...',
      voiceSpeaking: 'نفرتاري تتحدث إليك...',
      voiceStart: 'تحدث مع نفرتاري',
      voiceStop: 'إيقاف الصوت',
      speechFallback: 'التحدث الصوتي متاح. يمكنك الكتابة أو التحدث في أي وقت.',
      quickPromptsTitle: 'اقتراحات مميزة:',
      prompts: [
        'ما هي أفضل رحلة منطاد طائر عند شروق الشمس؟',
        'أي فيلا تمتلك أجمل إطلالة لغروب الشمس على النيل؟',
        'أريد حجز ليموزين مرسيدس لاستقبالي من مطار الأقصر',
        'ما هي أهم المقابر التي يجب زيارتها بوادي الملوك؟',
      ],
      bookNowAction: 'حجز التجربة المختارة فوراً',
    },
    admin: {
      title: 'إدارة عمليات GO VOYAGE',
      subtitle: 'الحجوزات المباشرة، إدارة الأسطول، جداول التوفر، والتحكم في الأسعار',
      totalRevenue: 'إجمالي الإيرادات (شهرياً)',
      activeBookings: 'الحجوزات المؤكدة',
      fleetDeployed: 'سيارات الأسطول النشطة',
      occupancyRate: 'متوسط إشغال الفلل',
      bookingsTab: 'الحجوزات',
      toursTab: 'الرحلات والمواعيد',
      propertiesTab: 'الشقق والفلل',
      fleetTab: 'أسطول النقل',
      statusConfirmed: 'مؤكد',
      statusPending: 'قيد المراجعة',
      statusCancelled: 'ملغي',
    },
    concierge: {
      desk: 'مكتب الكونسيرج الخاص 24/7',
      welcome: 'مرحباً بكم في الأقصر. كيف يمكن لفريقنا المساعد تلبية رغباتكم اليوم؟',
      placeholder: 'مثال: أود الاستفسار عن حجز رحلة منطاد خاصة أو توفر فيلا للأسبوع القادم...',
      connectWhatsApp: 'تواصل عبر واتساب فوراً',
      onlinePass: 'حجز إلكتروني سريع',
      ctaButton: 'الكونسيرج الخاص',
    },
    modal: {
      passTitle: 'تذكرة حجز GO VOYAGE الرسمية',
      tabTours: 'الرحلات والمنطاد',
      tabFlats: 'الشقق والفلل',
      tabTransport: 'النقل الفاخر',
      customPlan: 'البرنامج المخصص:',
      selectItem: 'حدد التجربة أو الإقامة المطلوبة',
      date: 'تاريخ الحجز',
      flightWave: 'موعد رحلة الطيران / الجولة',
      stayLength: 'عدد الليالي',
      pickupTime: 'موعد الاستقبال',
      travelers: 'عدد المسافرين',
      pickupLocation: 'فندق الإقامة بالأقصر أو اسم الباخرة أو الفيلا',
      pickupPlaceholder: 'مثال: فندق ونتر بالاس الأقصر، شتايجنبرجر النيل، أو فيلا البر الغربي',
      vipAddons: 'إضافات الكونسيرج الملكية',
      leadTraveler: 'بيانات المسافر الرئيسي',
      fullName: 'الاسم بالكامل *',
      email: 'البريد الإلكتروني *',
      phone: 'رقم الهاتف / واتساب *',
      specialRequests: 'أي طلبات خاصة، حمية غذائية، مناسبات خاصة...',
      totalInvestment: 'التكلفة الإجمالية',
      zeroFees: 'بدون أي رسوم خفية · إمكانية الإلغاء المرن خلال 24 ساعة',
      confirmButton: 'تأكيد الحجز وإصدار التذكرة الملكية',
      confirmedRibbon: 'تم التأكيد',
      voucherTitle: 'قسيمة سفر الأقصر الملكية المعتمدة',
      refId: 'رقم الحجز المرجعي',
      travelerLabel: 'اسم الضيف',
      dateLabel: 'التاريخ',
      partyLabel: 'العدد',
      totalPaid: 'المبلغ الإجمالي',
      verifiedPass: 'تصريح رقمي موثق لكبار الزوار',
      passInstructions:
        'يرجى إبراز هذه القسيمة أو رمز الـ QR للسائق الخاص عند وصولكم. تم إرسال نسخة من التفاصيل إلى رقم الواتساب والبريد الإلكتروني.',
      pickupPoint: 'نقطة التحرك والاستقبال:',
      savePrint: 'حفظ / طباعة التذكرة',
      whatsappConcierge: 'التواصل مع الكونسيرج عبر واتساب',
      done: 'إغلاق',
    },
    footer: {
      tagline:
        'المنصة الفاخرة المعتمدة للسياحة والإقامة والتنقل في الأقصر، مصر. أصالة تاريخية وخدمة ملكية موثوقة.',
      licensing: 'مرخص رسمياً من وزارة السياحة والآثار وسلطة الطيران المدني المصري',
      quickLinks: 'الروابط السريعة',
      guides: 'دليل الوجهات',
      contact: 'مكتب الكونسيرج الملكي',
      rights: 'مجموعة ضيافة GO VOYAGE الدولية. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      cancellation: 'سياسة الإلغاء والاسترداد',
      accessibility: 'إتاحة الوصول وسهولة الاستخدام',
    },
  },

  // German, French, Spanish, Italian, Russian, Chinese inherit full structure
  de: {} as any,
  fr: {} as any,
  es: {} as any,
  it: {} as any,
  ru: {} as any,
  'zh-CN': {} as any,
};

// Populate other languages cleanly from baseline with localized overrides
const baseEn = TRANSLATIONS.en;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

const makeLang = (overrides: DeepPartial<Translations>): Translations => ({
  ...baseEn,
  ...(overrides as any),
  nav: { ...baseEn.nav, ...(overrides.nav || {}) } as any,
  hero: {
    ...baseEn.hero,
    ...(overrides.hero || {}),
    night: (overrides.hero?.night || overrides.hero?.perNight || baseEn.hero.night) as string,
  } as any,
  tours: { ...baseEn.tours, ...(overrides.tours || {}) } as any,
  flats: { ...baseEn.flats, ...(overrides.flats || {}) } as any,
  transport: { ...baseEn.transport, ...(overrides.transport || {}) } as any,
  nileBanks: { ...baseEn.nileBanks, ...(overrides.nileBanks || {}) } as any,
  balloon: { ...baseEn.balloon, ...(overrides.balloon || {}) } as any,
  planner: { ...baseEn.planner, ...(overrides.planner || {}) } as any,
  reviews: { ...baseEn.reviews, ...(overrides.reviews || {}) } as any,
  nefertari: { ...baseEn.nefertari, ...(overrides.nefertari || {}) } as any,
  admin: { ...baseEn.admin, ...(overrides.admin || {}) } as any,
  concierge: { ...baseEn.concierge, ...(overrides.concierge || {}) } as any,
  modal: { ...baseEn.modal, ...(overrides.modal || {}) } as any,
  footer: { ...baseEn.footer, ...(overrides.footer || {}) } as any,
});

TRANSLATIONS.de = makeLang({
  nav: {
    explore: 'Luxor Entdecken',
    experiences: 'Erlebnisse',
    stay: 'Unterkünfte',
    transportation: 'Fahrdienst & Transfer',
    privateTours: 'Private Touren',
    about: 'Über Luxor',
    bookNow: 'Jetzt Buchen',
    myBookings: 'Meine Buchungen',
    adminDashboard: 'Admin-Bereich',
    soundActive: 'Atmosphäre stummschalten',
    soundMute: 'Wüsten-Soundtrack abspielen',
  },
  hero: {
    kicker: 'Ihr exklusiver Reise-Concierge im antiken Theben',
    title: 'Entdecken Sie Luxor. Erleben Sie Ewigkeit.',
    subtitle:
      'Außergewöhnliche Reisen, unvergessliche Aufenthalte und erstklassiger Transfer im Herzen des antiken Ägyptens.',
    primaryCta: 'Erlebnisse Erkunden',
    secondaryCta: 'Reise Planen',
    catTours: 'Touren & Ausflüge',
    catFlats: 'Luxus-Apartments',
    catTransfers: 'Private Transfers',
    catAirport: 'Flughafentransfer',
    catDrivers: 'Chauffeur auf Abruf',
    catPackages: 'Mehrtägige Reisepakete',
    date: 'Datum',
    travelers: 'Reisende',
    guest: 'Gast',
    guests: 'Gäste',
    checkAvailability: 'Preise & Verfügbarkeit',
    verifiedBadge: 'Zertifiziert vom ägyptischen Tourismusministerium & Zivilluftfahrt',
    ratesFrom: 'Geprüfte Tarife ab',
    perNight: 'Nacht',
  },
});

TRANSLATIONS.fr = makeLang({
  nav: {
    explore: 'Explorer Louxor',
    experiences: 'Expériences',
    stay: 'Séjourner à Louxor',
    transportation: 'Transport & Chauffeur',
    privateTours: 'Visites Privées',
    about: 'À Propos de Louxor',
    bookNow: 'Réserver',
    myBookings: 'Mes Réservations',
    adminDashboard: 'Panneau Admin',
    soundActive: 'Couper l’ambiance sonore',
    soundMute: 'Jouer l’ambiance désertique',
  },
  hero: {
    kicker: 'La Conciergerie de Voyage de Prestige à Thèbes Antique',
    title: 'Découvrez Louxor. Vivez l’Éternité.',
    subtitle:
      'Des voyages extraordinaires, des séjours inoubliables et des déplacements d’exception au cœur de l’Égypte antique.',
    primaryCta: 'Explorer les Expériences',
    secondaryCta: 'Planifier Votre Séjour',
    catTours: 'Excursions & Visites',
    catFlats: 'Appartements & Villas',
    catTransfers: 'Transferts Privés',
    catAirport: 'Accueil Aéroport VIP',
    catDrivers: 'Chauffeurs Privés',
    catPackages: 'Circuits de Plusieurs Jours',
    date: 'Date',
    travelers: 'Voyageurs',
    guest: 'Voyageur',
    guests: 'Voyageurs',
    checkAvailability: 'Vérifier Tarifs & Dates',
    verifiedBadge: 'Certifié par le Ministère Égyptien du Tourisme · Agréé Aviation Civile',
    ratesFrom: 'Tarifs vérifiés dès',
    perNight: 'nuit',
  },
});

TRANSLATIONS.es = makeLang({
  nav: {
    explore: 'Explorar Luxor',
    experiences: 'Experiencias',
    stay: 'Alojamiento',
    transportation: 'Transporte VIP',
    privateTours: 'Tours Privados',
    about: 'Sobre Luxor',
    bookNow: 'Reservar Ahora',
    myBookings: 'Mis Reservas',
    adminDashboard: 'Panel Admin',
    soundActive: 'Silenciar atmósfera',
    soundMute: 'Reproducir sonido del desierto',
  },
  hero: {
    kicker: 'El Conserje de Viajes de Lujo en Tebas Antigua',
    title: 'Descubre Luxor. Vive la Eternidad.',
    subtitle:
      'Viajes extraordinarios, estancias inolvidables y traslados impecables en el corazón del antiguo Egipto.',
    primaryCta: 'Explorar Experiencias',
    secondaryCta: 'Planificar Viaje',
    catTours: 'Tours y Excursiones',
    catFlats: 'Apartamentos Vacacionales',
    catTransfers: 'Traslados Privados',
    catAirport: 'Recogidas en Aeropuerto',
    catDrivers: 'Conductores Privados',
    catPackages: 'Paquetes de Varios Días',
    date: 'Fecha',
    travelers: 'Viajeros',
    guest: 'Viajero',
    guests: 'Viajeros',
    checkAvailability: 'Consultar Tarifas y Fechas',
    verifiedBadge: 'Certificado por el Ministerio de Turismo de Egipto y Aviación Civil',
    ratesFrom: 'Tarifas verificadas desde',
    perNight: 'noche',
  },
});

TRANSLATIONS.it = makeLang({
  nav: {
    explore: 'Esplora Luxor',
    experiences: 'Esperienze',
    stay: 'Soggiorna a Luxor',
    transportation: 'Trasporto VIP',
    privateTours: 'Tour Privati',
    about: 'Informazioni su Luxor',
    bookNow: 'Prenota Ora',
    myBookings: 'Le Mie Prenotazioni',
    adminDashboard: 'Pannello Admin',
    soundActive: 'Silenzia atmosfera',
    soundMute: 'Riproduci suoni del deserto',
  },
  hero: {
    kicker: 'Il Concierge di Viaggio Esclusivo nell’Antica Tebe',
    title: 'Scopri Luxor. Vivi l’Eternità.',
    subtitle:
      'Viaggi straordinari, soggiorni indimenticabili e trasporti impeccabili nel cuore dell’antico Egitto.',
    primaryCta: 'Esplora le Esperienze',
    secondaryCta: 'Pianifica il Tuo Viaggio',
    catTours: 'Tour ed Escursioni',
    catFlats: 'Appartamenti Vacanze',
    catTransfers: 'Transfer Privati',
    catAirport: 'Transfer Aeroporto',
    catDrivers: 'Autisti Privati',
    catPackages: 'Pacchetti Multigiorno',
    date: 'Data',
    travelers: 'Viaggiatori',
    guest: 'Viaggiatore',
    guests: 'Viaggiatori',
    checkAvailability: 'Verifica Tariffe e Date',
    verifiedBadge: 'Certificato dal Ministero del Turismo Egiziano e dall’Aviazione Civile',
    ratesFrom: 'Tariffe garantite da',
    perNight: 'notte',
  },
});

TRANSLATIONS.ru = makeLang({
  nav: {
    explore: 'Исследуйте Луксор',
    experiences: 'Впечатления',
    stay: 'Проживание',
    transportation: 'VIP-Транспорт',
    privateTours: 'Частные Туры',
    about: 'О Луксоре',
    bookNow: 'Забронировать',
    myBookings: 'Мои Бронирования',
    adminDashboard: 'Панель Управления',
    soundActive: 'Отключить атмосферный звук',
    soundMute: 'Включить атмосферу пустыни',
  },
  hero: {
    kicker: 'Премиальный консьерж-сервис в древних Фивах',
    title: 'Откройте Луксор. Прикоснитесь к Вечности.',
    subtitle:
      'Непревзойденные путешествия, незабываемый отдых и безупречные поездки в самом сердце древнего Египта.',
    primaryCta: 'Исследовать Туры',
    secondaryCta: 'Спланировать Поездку',
    catTours: 'Экскурсии и Полеты',
    catFlats: 'Апартаменты и Виллы',
    catTransfers: 'Индивидуальный Трансфер',
    catAirport: 'Встреча в Аэропорту',
    catDrivers: 'Личный Водитель',
    catPackages: 'Многодневные Туры',
    date: 'Дата',
    travelers: 'Гости',
    guest: 'Гость',
    guests: 'Гостей',
    checkAvailability: 'Узнать Цены и Наличие',
    verifiedBadge: 'Лицензия Министерства туризма Египта и Гражданской авиации',
    ratesFrom: 'Официальные тарифы от',
    perNight: 'ночь',
  },
});

TRANSLATIONS['zh-CN'] = makeLang({
  nav: {
    explore: '探索卢克索',
    experiences: '尊享体验',
    stay: '奢华居停',
    transportation: '贵宾专车',
    privateTours: '私享定制游',
    about: '关于卢克索',
    bookNow: '立即预订',
    myBookings: '我的预订',
    adminDashboard: '管理后台',
    soundActive: '静音环境音效',
    soundMute: '开启沙漠氛围音乐',
  },
  hero: {
    kicker: '古底比斯首席奢华旅行礼宾管家',
    title: '探索卢克索 · 见证永恒',
    subtitle: '在古埃及的心脏地带，开启非凡旅程，享受难忘居停与尊荣出行。',
    primaryCta: '探索特色行程',
    secondaryCta: '定制您的旅程',
    catTours: '景点门票与体验',
    catFlats: '临河度假公寓',
    catTransfers: '私人接送服务',
    catAirport: '机场贵宾接送',
    catDrivers: '私人专属司机',
    catPackages: '多日全包行程',
    date: '日期',
    travelers: '出行人数',
    guest: '位旅客',
    guests: '位旅客',
    checkAvailability: '查询价格与档期',
    verifiedBadge: '埃及旅游文物部与民用航空总局官方认证',
    ratesFrom: '官方核验特惠价起',
    perNight: '晚',
  },
});
