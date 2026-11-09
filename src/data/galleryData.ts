export interface ImageHotspot {
  id: string;
  x: number; // percentage from left: 0 to 100
  y: number; // percentage from top: 0 to 100
  title: string;
  category: 'history' | 'fact' | 'architecture' | 'symbolism';
  description: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  tag: string;
  location?: string;
  hotspots?: ImageHotspot[];
}

export interface ItemGallery {
  itemId: string;
  itemTitle: string;
  category: 'tours' | 'flats' | 'transport';
  subtitle: string;
  images: GalleryImage[];
}

export const SERVICE_GALLERIES: Record<string, ItemGallery> = {
  // 1. Royal Sunrise Hot Air Balloon
  'balloon-royal-sunrise': {
    itemId: 'balloon-royal-sunrise',
    itemTitle: 'Royal Sunrise Hot Air Balloon Odyssey',
    category: 'tours',
    subtitle: 'Ascend 2,500 ft above the Theban Necropolis and Valley of the Kings at dawn',
    images: [
      {
        id: 'balloon-1',
        url: '/assets/aistudio/luxballon__1__01415fc3.webp',
        caption: 'Aerial perspective of royal hot air balloons inflating on the desert launch site at dawn',
        tag: 'Dawn Launch',
        location: 'West Bank Launch Grounds, Luxor',
      },
      {
        id: 'balloon-2',
        url: '/assets/aistudio/luxballon__1__6ee8334e.jpg',
        caption: 'Hot air balloon soaring over the 3,400-year-old Colossi of Memnon statues and Theban mountains',
        tag: 'Ancient Monuments',
        location: 'Colossi of Memnon, West Bank',
      },
      {
        id: 'balloon-3',
        url: '/assets/aistudio/luxballon__2__03fbfbac.jpg',
        caption: 'Golden hour moments with vibrant passenger balloons preparing for takeoff across the morning desert',
        tag: 'Golden Hour',
        location: 'West Bank Takeoff Zone',
      },
      {
        id: 'balloon-4',
        url: '/assets/aistudio/luxballon__2__1c90d5aa.webp',
        caption: 'Inside the woven wicker basket as the pilot ignites the master twin burners against a golden sunrise sky',
        tag: 'Burner Ascent',
        location: 'Flight Basket Over West Bank',
      },
      {
        id: 'balloon-5',
        url: '/assets/aistudio/luxballon__3__0c8c376a.jpg',
        caption: 'Passengers marveling at the first morning light cresting over the River Nile and Luxor city skyline',
        tag: 'Sunrise Horizon',
        location: '2,000 ft Above Thebes',
      },
      {
        id: 'balloon-6',
        url: '/assets/aistudio/luxballon__4__3a969233.jpg',
        caption: 'Sweeping aerial panorama of multiple hot air balloons floating above the desert dunes, temples, and palm oases',
        tag: 'Theban Panorama',
        location: 'Valley of the Kings Air Corridor',
      },
      {
        id: 'balloon-7',
        url: '/assets/aistudio/luxballon__5__08cb719c.jpg',
        caption: 'Pre-dawn illumination with glowing hot air balloon envelopes on the launch apron',
        tag: 'Pre-Dawn Glow',
        location: 'Civil Aviation Launch Base',
      },
      {
        id: 'balloon-8',
        url: '/assets/aistudio/luxballon__6__1a7c4348.jpg',
        caption: 'Authentic royal rooftop breakfast platter with fresh fruits, pastries and Egyptian coffee as balloons drift aloft',
        tag: 'Royal Breakfast',
        location: 'Nile Panorama Terrace',
      },
      {
        id: 'balloon-9',
        url: '/assets/aistudio/luxballon__7__22582799.jpg',
        caption: 'Night-to-day transition as powerful burners illuminate the launch field under certified aviation supervision',
        tag: 'Aviation Safety',
        location: 'Certified Takeoff Field',
      },
      {
        id: 'balloon-10',
        url: '/assets/aistudio/luxballon__8__55f3e3fc.jpg',
        caption: 'Breathtaking high-altitude vista of colorful balloon armada sailing above historic canyons and limestone valleys',
        tag: 'Armada Flight',
        location: 'Upper Theban Airspace',
      },
      {
        id: 'balloon-11',
        url: '/assets/aistudio/luxballon__9__083253c5.jpg',
        caption: 'Captivating sunrise moments admiring giant balloons rising toward the morning clouds',
        tag: 'Morning Glory',
        location: 'Luxor West Bank Sands',
      },
      {
        id: 'balloon-12',
        url: '/assets/aistudio/luxballon__10__ddc4724f.jpg',
        caption: 'Looking down from the flight basket over green fertile Nile agricultural carpets and the winding river',
        tag: 'Nile Carpet View',
        location: 'River Nile Airborne Corridor',
      },
    ],
  },

  // 2. Valley of the Kings & Nefertari Tomb
  'tombs-nefertari-kings': {
    itemId: 'tombs-nefertari-kings',
    itemTitle: 'Valley of the Kings & Nefertari Tomb VIP Sanctuary',
    category: 'tours',
    subtitle: 'Exclusive restricted chamber access with Senior Egyptologist masterclass',
    images: [
      {
        id: 'nefertari-1',
        url: '/assets/aistudio/VALLY_KINGS__5__1638f2a3.jpg',
        caption: 'Inner sanctuary portal of Queen Nefertari with golden walkway, divine frescoes, and starry night sky ceiling',
        tag: 'Nefertari Sanctuary',
        location: 'Tomb of Queen Nefertari (QV66)',
      },
      {
        id: 'nefertari-2',
        url: '/assets/aistudio/VALLY_KINGS__4__c201ee15.jpg',
        caption: 'Vivid polychrome frescoes of seated solar deities Re-Horakhty and Hathor with winged Ma\'at lintel',
        tag: 'Divine Guardians',
        location: 'Antechamber, QV66',
      },
      {
        id: 'nefertari-3',
        url: '/assets/aistudio/VALLY_KINGS__2__9fb7e9e2.jpg',
        caption: 'Central square pillar painted with Djed pillars and Osiris symbols untouched by time for 3,200 years',
        tag: 'Sacred Pillar',
        location: 'Burial Chamber, QV66',
      },
      {
        id: 'nefertari-4',
        url: '/assets/aistudio/VALLY_KINGS__1__200c9462.jpg',
        caption: 'Descending timber staircase into the burial vault beneath the protective wings of goddess Ma\'at',
        tag: 'Descent into Eternity',
        location: 'Access Corridor, QV66',
      },
      {
        id: 'nefertari-5',
        url: '/assets/aistudio/VALLY_KINGS__7__5ecee33b.jpg',
        caption: 'Astounding astronomical dark blue ceiling painted with yellow stars and protective cobra friezes',
        tag: 'Starry Sky Ceiling',
        location: 'Vaulted Ceiling, QV66',
      },
      {
        id: 'nefertari-6',
        url: '/assets/aistudio/VALLY_KINGS__3__28ec4d65.jpg',
        caption: 'Detailed scene of Anubis and Hathor with pristine hieroglyphic formulas from the Book of the Dead',
        tag: 'Book of the Dead',
        location: 'Tomb Wall Reliefs',
      },
      {
        id: 'nefertari-7',
        url: '/assets/aistudio/VALLY_KINGS__13__50b5c1f9.jpg',
        caption: 'Axial perspective down the monumental rock-cut corridor leading deep into the Theban mountain',
        tag: 'Royal Corridor',
        location: 'Valley of the Kings',
      },
      {
        id: 'nefertari-8',
        url: '/assets/aistudio/VALLY_KINGS__8__22b75384.jpg',
        caption: 'Lapis lazuli and gold astronomical ceiling illuminating ancient royal texts and pharaonic cartouches',
        tag: 'Astronomical Vault',
        location: 'KV Tomb Chamber',
      },
      {
        id: 'nefertari-9',
        url: '/assets/aistudio/VALLY_KINGS__11__64bad11c.jpg',
        caption: 'Monumental carved red quartzite and granite sarcophagus inside the pharaoh\'s burial chamber',
        tag: 'Royal Sarcophagus',
        location: 'Pharaonic Crypt',
      },
      {
        id: 'nefertari-10',
        url: '/assets/aistudio/VALLY_KINGS__12__c49ef8dd.jpg',
        caption: 'Subterranean four-pillar hall decorated with underworld gatekeepers and celestial maps',
        tag: 'Four-Pillar Hall',
        location: 'Tomb Chamber Gallery',
      },
      {
        id: 'nefertari-11',
        url: '/assets/aistudio/VALLY_KINGS__6__a77081b0.jpg',
        caption: 'Official restricted entrance to Queen Nefertari\'s tomb with strict preservation airlock systems',
        tag: 'Restricted Portal',
        location: 'Valley of the Queens',
      },
      {
        id: 'nefertari-12',
        url: '/assets/aistudio/VALLY_KINGS__9__7cf9a42d.jpg',
        caption: 'Valley of the Queens official visitor entrance and antiquities reception pavilion',
        tag: 'Visitor Gateway',
        location: 'Wadi al-Malikat Base',
      },
      {
        id: 'nefertari-13',
        url: '/assets/aistudio/VALLY_KINGS__10__989b5b61.jpg',
        caption: 'Ancient cliff-cut tomb entrances dotting the arid limestone cliffs of the Theban Necropolis',
        tag: 'Cliff Tombs',
        location: 'Theban Mountain Ridge',
      },
      {
        id: 'nefertari-14',
        url: '/assets/aistudio/VALLY_KINGS__14__1468064e.jpg',
        caption: 'Dramatic limestone canyon and rugged sun-bleached desert valleys where 64 pharaohs were entombed',
        tag: 'Valley Landscape',
        location: 'Valley of the Kings Floor',
      },
    ],
  },

  // 3. Karnak Hypostyle & Luxor Temple
  'karnak-luxor-night-illumination': {
    itemId: 'karnak-luxor-night-illumination',
    itemTitle: 'Karnak Hypostyle & Luxor Temple Twilight Grandeur',
    category: 'tours',
    subtitle: 'The Great Hypostyle Hall and illuminated Avenue of Sphinxes at golden hour',
    images: [
      {
        id: 'karnak-1',
        url: '/assets/aistudio/karnak__1__4e230a56.jpg',
        caption: 'Colonnade and Avenue of Ram-Headed Criosphinxes under twilight skies in the First Court of Karnak',
        tag: 'Criosphinx Avenue',
        location: 'Karnak Temple Forecourt',
      },
      {
        id: 'karnak-2',
        url: '/assets/aistudio/karnak__2__4abd38d1.jpg',
        caption: 'Towering papyrus columns and monumental seated colossi of Pharaoh Ramses II at Luxor Temple',
        tag: 'Colossal Ramses II',
        location: 'Luxor Temple Colonnade',
      },
      {
        id: 'karnak-3',
        url: '/assets/aistudio/karnak__3__8aeacd67.jpg',
        caption: 'Aerial bird’s-eye perspective of Karnak Temple complex alongside column aisle exploration',
        tag: 'Aerial Complex',
        location: 'Karnak Precinct of Amun-Ra',
      },
      {
        id: 'karnak-4',
        url: '/assets/aistudio/karnak__4__3800028d.jpg',
        caption: 'Low-angle perspective looking upward through monumental lotus capitals toward the sapphire sky',
        tag: 'Hypostyle Perspective',
        location: 'Great Hypostyle Hall',
      },
      {
        id: 'karnak-5',
        url: '/assets/aistudio/karnak__5__bd6007fb.jpg',
        caption: 'Walking through the stone forest of 134 colossal sandstone columns inscribed with royal cartouches',
        tag: 'Column Forest',
        location: 'Karnak Central Aisle',
      },
      {
        id: 'karnak-6',
        url: '/assets/aistudio/karnak__6__169e5bbf.jpg',
        caption: 'Monumental sandstone entrance pylons flanked by colossal standing statues of ancient Egyptian kings',
        tag: 'Grand Pylon',
        location: 'Karnak Entrance Gateway',
      },
      {
        id: 'karnak-7',
        url: '/assets/aistudio/karnak__7__3b893fb3.jpg',
        caption: 'Detailed view of ancient architraves and open papyrus capitals with deep hieroglyphic inscriptions',
        tag: 'Ancient Inscriptions',
        location: 'Upper Hypostyle Architraves',
      },
      {
        id: 'karnak-8',
        url: '/assets/aistudio/karnak__8__9f5a480e.jpg',
        caption: 'Ancient temple facade with colossal seated pharaohs and sacred megalithic stone blocks',
        tag: 'Seated Colossi',
        location: 'Temple of Amun-Ra Sanctuary',
      },
      {
        id: 'karnak-9',
        url: '/assets/aistudio/karnak__9__25e0a2ba.jpg',
        caption: 'Golden morning light filtering through soaring sandstone columns onto ancient limestone flagstones',
        tag: 'Golden Morning',
        location: 'Great Hypostyle Hallway',
      },
      {
        id: 'karnak-10',
        url: '/assets/aistudio/karnak__10__84bcd234.jpg',
        caption: 'Dramatic storm clouds gathering above the timeless colonnade of Amenhotep III at Luxor Temple',
        tag: 'Twilight Sky',
        location: 'Luxor Temple Sanctuary',
      },
      {
        id: 'karnak-11',
        url: '/assets/aistudio/karnak__11__68aee9a6.jpg',
        caption: 'Sunlit temple courtyard with row of sacred ram-headed sphinxes and monumental drum columns',
        tag: 'Sacred Sphinxes',
        location: 'Karnak First Pylon Courtyard',
      },
      {
        id: 'karnak-12',
        url: '/assets/aistudio/karnak__12__e3e1c6aa.jpg',
        caption: 'Golden sunburst blazing between the architrave beams and capitals of the Great Hypostyle Hall',
        tag: 'Sunburst Radiance',
        location: 'Hypostyle Hall Center',
      },
      {
        id: 'karnak-13',
        url: '/assets/aistudio/karnak__13__d065f919.jpg',
        caption: 'Intricately preserved Hathor and papyrus stone capitals crowned under open Egyptian skies',
        tag: 'Hathor Sanctuary',
        location: 'Temple Upper Entablature',
      },
      {
        id: 'karnak-14',
        url: '/assets/aistudio/karnak__14__a0b9b402.jpg',
        caption: 'Standing royal colossi carved from single blocks of limestone guarding the temple peristyle court',
        tag: 'Royal Guardians',
        location: 'Peristyle Court',
      },
      {
        id: 'karnak-15',
        url: '/assets/aistudio/karnak__15__30764da0.jpg',
        caption: 'Ceremonial Avenue of Sphinxes leading directly to the monumental stone pylons of Karnak',
        tag: 'Avenue of Sphinxes',
        location: 'Dromos of Karnak',
      },
    ],
  },

  // 4. Private Nile Sunset Dahabiya & Gourmet Dinner
  'nile-dahabiya-sunset': {
    itemId: 'nile-dahabiya-sunset',
    itemTitle: 'Private Nile Sunset Dahabiya & Gourmet Dinner',
    category: 'tours',
    subtitle: 'Handcrafted Egyptian riverboat charter with gourmet multi-course feast and sunset reflections',
    images: [
      {
        id: 'nile-dahabiya-1',
        url: '/assets/aistudio/nile__6__8a1819ce.jpg',
        caption: 'Classic two-masted Egyptian Dahabiya with striped lateen sails gliding across the Nile at rose-gold dusk',
        tag: 'Sunset Sailing',
        location: 'River Nile, Luxor',
      },
      {
        id: 'nile-dahabiya-2',
        url: '/assets/aistudio/nile__5__9ed24704.jpg',
        caption: 'Guests admiring the breathtaking golden sunset and West Bank cliffs from the open teakwood observation deck',
        tag: 'Sundeck Panorama',
        location: 'West Bank Shoreline',
      },
      {
        id: 'nile-dahabiya-3',
        url: '/assets/aistudio/nile__8__882ebc25.jpg',
        caption: 'Grand Dahabiya sailing vessel under full lateen canvas against deep azure river currents and warm desert bluffs',
        tag: 'Royal Dahabiya',
        location: 'Luxor Reach',
      },
      {
        id: 'nile-dahabiya-4',
        url: '/assets/aistudio/nile__14__2a7b9769.jpg',
        caption: 'Twilight aerial perspective of the illuminated Dahabiya reflecting amber glow along the tranquil Nile',
        tag: 'Twilight Aerial',
        location: 'Nile River Waterfront',
      },
      {
        id: 'nile-dahabiya-5',
        url: '/assets/aistudio/nile__2__000171cb.jpg',
        caption: 'Upper dining deck with panoramic banquet tables, ambient lanterns, and plush curved lounge seating',
        tag: 'Upper Deck Lounge',
        location: 'Private Dahabiya Deck',
      },
      {
        id: 'nile-dahabiya-6',
        url: '/assets/aistudio/nile__7__e2d9622a.jpg',
        caption: 'Royal Egyptian multi-course dinner spread with chef hospitality, grilled Nile specialties, and oriental mezze',
        tag: 'Gourmet Feast',
        location: 'Dining Salon Deck',
      },
      {
        id: 'nile-dahabiya-7',
        url: '/assets/aistudio/nile__9__ac7cc2ea.jpg',
        caption: 'Open-air riverside dining tables set with glowing candlelight as twilight settles over the palms and water',
        tag: 'Candlelight Dinner',
        location: 'Nile Promenade',
      },
      {
        id: 'nile-dahabiya-8',
        url: '/assets/aistudio/nile__10__265c07a0.jpg',
        caption: 'Sunset dinner table setting featuring fresh grilled seafood, Egyptian rice, mezze bowls, and fresh citrus',
        tag: 'Chef Tasting',
        location: 'Riverfront Dining',
      },
      {
        id: 'nile-dahabiya-9',
        url: '/assets/aistudio/nile__11__123dd5c4.jpg',
        caption: 'Artisan wooden dining pavilion adorned with oriental lattice cutouts, soft ambient lighting, and panoramic Nile views',
        tag: 'Lattice Dining Hall',
        location: 'Dahabiya Main Deck',
      },
      {
        id: 'nile-dahabiya-10',
        url: '/assets/aistudio/nile__12__3b966fee.jpg',
        caption: 'Golden hour romance on deck with champagne flutes, scenic temple silhouettes, and drifting river feluccas',
        tag: 'Golden Hour Toast',
        location: 'West Bank Vista',
      },
      {
        id: 'nile-dahabiya-11',
        url: '/assets/aistudio/nile__13__721ff032.jpg',
        caption: 'Sumptuous waterfront buffet spread loaded with fresh Egyptian salads, dips, warm breads, and seasoned dishes',
        tag: 'Egyptian Buffet',
        location: 'Open-Air Buffet Station',
      },
      {
        id: 'nile-dahabiya-12',
        url: '/assets/aistudio/nile__4__d6dfe3c3.jpg',
        caption: 'Spacious aft lounge with curved indigo sofas, modern arched floor lamps, and refreshing river breezes',
        tag: 'Panoramic Lounge',
        location: 'Aft Observation Deck',
      },
      {
        id: 'nile-dahabiya-13',
        url: '/assets/aistudio/nile__3__95d55787.jpg',
        caption: 'Traditional handcrafted wooden riverboat with glowing lanterns mirrored on the mirror-flat river surface',
        tag: 'Nocturnal River',
        location: 'Nile Mooring',
      },
      {
        id: 'nile-dahabiya-14',
        url: '/assets/aistudio/nile__1__c0b09529.webp',
        caption: 'Private cabana daybed on the teak deck with artisan cheese platter, fresh grapes, and afternoon Nile views',
        tag: 'Private Daybed',
        location: 'Bow Relaxation Deck',
      },
      {
        id: 'nile-dahabiya-15',
        url: '/assets/aistudio/nile__211__13af786e.jpg',
        caption: 'Traditional live acoustic musicians performing oriental melodies and rhythms under the illuminated evening canopy',
        tag: 'Live Acoustic Oud',
        location: 'Performance Stage',
      },
      {
        id: 'nile-dahabiya-16',
        url: '/assets/aistudio/nile__1111__c9a54f73.jpg',
        caption: 'Gourmet dinner presentation with grilled kofta kebabs, Egyptian spiced rice, tahini, and freshly baked baladi bread',
        tag: 'Pharaonic Grill',
        location: 'Dinner Service',
      },
      {
        id: 'nile-dahabiya-17',
        url: '/assets/aistudio/nile__1__e65de1c5.jpg',
        caption: 'Sleek luxury Dahabiya charter boat cruising gracefully past the East Bank palms on sunny waters',
        tag: 'Modern Luxury Dahabiya',
        location: 'Luxor Waterfront Pier',
      },
      {
        id: 'nile-dahabiya-18',
        url: '/assets/aistudio/nile__113__84bab165.jpg',
        caption: 'Daylight cruise perspective overlooking the open-air social lounge, white seating booths, and passing Nile shores',
        tag: 'Daylight River Vista',
        location: 'Midship Deck',
      },
      {
        id: 'nile-dahabiya-19',
        url: '/assets/aistudio/nile__115__8b892b88.jpg',
        caption: 'Nocturnal cruise spectacle with multi-colored festival lighting reflecting vividly across the dark Nile waves',
        tag: 'Nocturnal Illumination',
        location: 'Luxor Harbor',
      },
      {
        id: 'nile-dahabiya-20',
        url: '/assets/aistudio/nile__11113__84bab165.jpg',
        caption: 'Relaxed conversation and evening refreshments while taking in panoramic vistas of the historic Luxor waterfront',
        tag: 'Evening Social Lounge',
        location: 'Promenade Deck',
      },
    ],
  },

  // 4b. Nile Sunset Felucca
  'nile-sunset-felucca-tea': {
    itemId: 'nile-sunset-felucca-tea',
    itemTitle: 'Sacred Nile Sunset Felucca Cruise & High Tea',
    category: 'tours',
    subtitle: 'Traditional handcrafted sailboat with Nubian hibiscus tea and golden river reflections',
    images: [
      {
        id: 'felucca-1',
        url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=85',
        caption: 'White triangular lateen sail billowing against the blazing Egyptian sunset over Banana Island',
        tag: 'Lateen Sail',
        location: 'River Nile, Luxor',
      },
      {
        id: 'felucca-2',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
        caption: 'Silhouettes of date palms and West Bank minarets reflected on the tranquil waters of the Nile',
        tag: 'Golden Hour Reflections',
        location: 'West Bank Shoreline',
      },
      {
        id: 'felucca-3',
        url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
        caption: 'Plush hand-embroidered Nubian floor cushions, chilled karkadeh hibiscus, and brass lanterns',
        tag: 'Nubian Lounge',
        location: 'Private Deck',
      },
    ],
  },

  // 5. Dendera & Abydos Expedition
  'dendera-abydos-day-expedition': {
    itemId: 'dendera-abydos-day-expedition',
    itemTitle: 'Sacred Hathor at Dendera & Abydos Osiris Sanctuary',
    category: 'tours',
    subtitle: 'Egypt’s most miraculous intact turquoise ceiling and the mysterious subterranean Osireion',
    images: [
      {
        id: 'dendera-1',
        url: '/assets/aistudio/DEN__10__8691e97f.jpg',
        caption: 'Monumental facade of the Temple of Hathor with towering four-sided sistrum columns bearing the divine face of Hathor',
        tag: 'Hathor Sistrum Capitals',
        location: 'Dendera Temple Facade',
      },
      {
        id: 'dendera-2',
        url: '/assets/aistudio/DEN__4__e80b2aa0.jpg',
        caption: 'Miraculously preserved astronomical ceiling depicting Sky Goddess Nut arching across the cosmos with intact cobalt pigments',
        tag: 'Goddess Nut Ceiling',
        location: 'Hypostyle Hall Ceiling',
      },
      {
        id: 'dendera-3',
        url: '/assets/aistudio/DEN__2__a703c6e7.jpg',
        caption: 'Intact astronomical zodiac relief with the sacred Eye of Horus, lunar disk, and celestial deities in vibrant Egyptian blue',
        tag: 'Eye of Horus Celestial Relief',
        location: 'Outer Hypostyle Ceiling',
      },
      {
        id: 'dendera-4',
        url: '/assets/aistudio/DEN__1__e6252ff1.jpg',
        caption: 'Exquisite polychrome wall relief depicting the ceremonial raising of the sacred Djed pillar before Isis and Osiris',
        tag: 'Raising the Djed Pillar',
        location: 'Abydos Temple of Seti I',
      },
      {
        id: 'dendera-5',
        url: '/assets/aistudio/DEN__12__f73c97ec.jpg',
        caption: 'Grand hypostyle hall of Pharaoh Seti I with towering sandstone columns adorned with master royal cartouches',
        tag: 'Seti I Hypostyle Hall',
        location: 'Abydos Great Hall',
      },
      {
        id: 'dendera-6',
        url: '/assets/aistudio/DEN__1__77ac97f3.jpeg',
        caption: 'The enigmatic subterranean Osireion water sanctuary with colossal monolithic granite pillars and sacred central channel',
        tag: 'Subterranean Osireion',
        location: 'Osireion Water Sanctuary',
      },
      {
        id: 'dendera-7',
        url: '/assets/aistudio/DEN__6__8cdc0517.jpg',
        caption: 'Elevated perspective of the megalithic Osireion sanctuary constructed from enormous cyclopean stone masonry',
        tag: 'Megalithic Architecture',
        location: 'Abydos Archaeological Site',
      },
      {
        id: 'dendera-8',
        url: '/assets/aistudio/DEN__11__060252a0.jpg',
        caption: 'Panoramic approach to the monumental pillared entrance facade of the Temple of Seti I at Abydos',
        tag: 'Seti I Temple Facade',
        location: 'Abydos Sacred Precinct',
      },
      {
        id: 'dendera-9',
        url: '/assets/aistudio/DEN__9__7e69f674.jpg',
        caption: 'Monumental outer sandstone pylon reliefs depicting the Goddess Hathor and pharaoh in ceremonial offering rites',
        tag: 'Sacred Hathor Pylon Relief',
        location: 'Dendera Enclosure Wall',
      },
      {
        id: 'dendera-10',
        url: '/assets/aistudio/DEN__5__81e2bbef.jpg',
        caption: 'Rooftop sun kiosk and Hathor solar union chapel where ancient priests conducted the sacred New Year dawn rituals',
        tag: 'Rooftop Hathor Kiosk',
        location: 'Dendera Temple Roof',
      },
      {
        id: 'dendera-11',
        url: '/assets/aistudio/DEN__8__26e8c817.jpg',
        caption: 'Aerial high-angle panorama of the ancient Hathor temple enclosure, mudbrick ruins, and lush surrounding Qena palm groves',
        tag: 'Archaeological Complex Aerial',
        location: 'Dendera Sacred Enclosure',
      },
      {
        id: 'dendera-12',
        url: '/assets/aistudio/DEN__3__d7188ab3.jpg',
        caption: 'Sunlit view of the grand sandstone portico and ceremonial stairway of the Abydos Temple',
        tag: 'Ceremonial Portico',
        location: 'Abydos Seti I Temple',
      },
      {
        id: 'dendera-13',
        url: '/assets/aistudio/DEN__7__dd264c24.jpg',
        caption: 'Colossal standing and seated royal pharaonic statues flanking the sacred colonnade entrance portal',
        tag: 'Pharaonic Sentinel Statues',
        location: 'Colonnade Forecourt',
      },
    ],
  },

  // 6. The Theban Royal Nilefront Villa
  'villa-theban-nilefront': {
    itemId: 'villa-theban-nilefront',
    itemTitle: 'The Theban Royal Nilefront Villa',
    category: 'flats',
    subtitle: 'Private heated infinity pool facing the River Nile and Luxor Temple skyline',
    images: [
      {
        id: 'theban-1',
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
        caption: 'Heated turquoise infinity pool edge directly overlooking traditional feluccas on the Nile',
        tag: 'Infinity Pool & Nile View',
        location: 'West Bank Riverfront',
      },
      {
        id: 'theban-2',
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
        caption: 'Master king suite with vaulted brick ceiling, Egyptian cotton linens, and private balcony',
        tag: 'Royal Master Suite',
        location: 'Upper Villa Wing',
      },
      {
        id: 'theban-3',
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
        caption: 'Shaded sandstone archway terrace with breakfast table and panoramic river views',
        tag: 'Sunset Terrace',
        location: 'Garden Veranda',
      },
      {
        id: 'theban-4',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
        caption: 'Egyptian alabaster en-suite bathroom with deep freestanding soaking tub and rainfall shower',
        tag: 'Alabaster Bath',
        location: 'Master En-Suite',
      },
      {
        id: 'theban-5',
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
        caption: 'Spacious salon with handcrafted cedar wood furniture and curated Upper Egyptian fine art',
        tag: 'Living Salon',
        location: 'Ground Floor Lounge',
      },
    ],
  },

  // 7. Karnak Horizon Luxury Penthouse
  'karnak-vista-penthouse': {
    itemId: 'karnak-vista-penthouse',
    itemTitle: 'Karnak Horizon Luxury Penthouse',
    category: 'flats',
    subtitle: 'Expansive private rooftop terrace with jacuzzi overlooking Corniche El Nile',
    images: [
      {
        id: 'karnak-pent-1',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
        caption: 'Private rooftop terrace and heated hydrotherapy jacuzzi overlooking the Nile at dusk',
        tag: 'Rooftop Sky Lounge',
        location: 'Corniche Promenade, East Bank',
      },
      {
        id: 'karnak-pent-2',
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
        caption: 'Floor-to-ceiling soundproof glass walls framing 180-degree panoramas of Luxor Temple',
        tag: 'Panoramic Salon',
        location: 'Penthouse Main Level',
      },
      {
        id: 'karnak-pent-3',
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
        caption: 'Italian marble kitchen island, gourmet wine cooler, and professional espresso machine',
        tag: 'Designer Kitchen',
        location: 'Culinary Bar',
      },
      {
        id: 'karnak-pent-4',
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
        caption: 'Private sunset bedroom suite with direct access to rooftop terrace garden',
        tag: 'Panoramic Bedroom',
        location: 'Penthouse Upper Level',
      },
    ],
  },

  // 8. Al-Qurna Heritage Dome Villa
  'medinet-habu-riad': {
    itemId: 'medinet-habu-riad',
    itemTitle: 'Al-Qurna Heritage Dome Villa',
    category: 'flats',
    subtitle: 'Hassan Fathy vernacular architecture with tranquil citrus courtyard and domes',
    images: [
      {
        id: 'qurna-1',
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
        caption: 'Central courtyard fountain surrounded by jasmine trees, date palms, and cool natural breeze',
        tag: 'Citrus Courtyard',
        location: 'Al-Qurna West Bank',
      },
      {
        id: 'qurna-2',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
        caption: 'Natural thermal clay domes creating quiet, air-conditioned sanctuary from the desert sun',
        tag: 'Vernacular Domes',
        location: 'Main Pavilion',
      },
      {
        id: 'qurna-3',
        url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=85',
        caption: 'Starlit rooftop observation bed facing the illuminated towers of Medinet Habu',
        tag: 'Starlight Observatory',
        location: 'Roof Terrace',
      },
    ],
  },

  // 9. Sunset Oasis Waterfront Apartment
  'sunset-oasis-waterfront': {
    itemId: 'sunset-oasis-waterfront',
    itemTitle: 'Sunset Oasis Waterfront Apartment',
    category: 'flats',
    subtitle: 'Uninterrupted Nile river views, private sunset balcony, and tranquil garden setting',
    images: [
      {
        id: 'oasis-1',
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
        caption: 'Balcony view of traditional feluccas drifting against the pink and amber sunset clouds',
        tag: 'Sunset Balcony',
        location: 'Waterfront Promenade',
      },
      {
        id: 'oasis-2',
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85',
        caption: 'Bright and airy living room with Egyptian artwork, limestone floors, and river breeze',
        tag: 'Nile Salon',
        location: 'Main Living Room',
      },
      {
        id: 'oasis-3',
        url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85',
        caption: 'Quiet master king bedroom with soundproof floor-to-ceiling glass doors',
        tag: 'Master Suite',
        location: 'River Wing',
      },
    ],
  },

  // 10. Airport VIP Chauffeur Transfer
  'airport-vip-chauffeur': {
    itemId: 'airport-vip-chauffeur',
    itemTitle: 'Airport VIP Fast-Track & Chauffeur Transfer',
    category: 'transport',
    subtitle: 'Chauffeured Mercedes-Benz S-Class or E-Class luxury sedan with curbside assist',
    images: [
      {
        id: 'chauffeur-1',
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        caption: 'Executive Mercedes-Benz flagship sedan waiting curbside at Luxor International Airport (LXR)',
        tag: 'Mercedes S-Class',
        location: 'Luxor Airport Terminal',
      },
      {
        id: 'chauffeur-2',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
        caption: 'Spacious rear executive lounge with massaging leather seats, Wi-Fi, and climate control',
        tag: 'Executive Cabin',
        location: 'Onboard Luxury',
      },
      {
        id: 'chauffeur-3',
        url: 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c?auto=format&fit=crop&w=1600&q=85',
        caption: 'Uniformed professional English-speaking chauffeur providing luggage porterage and chilled towels',
        tag: 'White-Glove Service',
        location: 'Hotel Arrival',
      },
    ],
  },

  // 11. Full-Day Private Executive Van
  'executive-vclass-daily': {
    itemId: 'executive-vclass-daily',
    itemTitle: 'Full-Day Private Chauffeur & Executive Van',
    category: 'transport',
    subtitle: 'Mercedes-Benz V-Class luxury VIP van for families and delegations (7 passengers)',
    images: [
      {
        id: 'vclass-1',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
        caption: 'Executive conference seating in Mercedes V-Class with fold-out work table and privacy tint',
        tag: 'VIP Van Interior',
        location: 'Luxor Monument Tour',
      },
      {
        id: 'vclass-2',
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
        caption: 'Private on-demand vehicle waiting at the entrance of Karnak Temple with ice-cold beverages',
        tag: 'Monument Standby',
        location: 'Karnak Pylon Gate',
      },
    ],
  },

  // 12. Private Nile Speedboat
  'nile-private-speedboat': {
    itemId: 'nile-private-speedboat',
    itemTitle: 'Private Nile Speedboat & Water Taxi Charter',
    category: 'transport',
    subtitle: '7-minute direct river crossing between East Bank hotels and West Bank monuments',
    images: [
      {
        id: 'boat-1',
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85',
        caption: 'Handcrafted mahogany wooden speedboat cutting through the Nile water with sun canopy',
        tag: 'Mahogany Speedboat',
        location: 'Luxor Nile Crossing',
      },
      {
        id: 'boat-2',
        url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=85',
        caption: 'Private boat dock on the West Bank with panoramic views of Luxor Temple',
        tag: 'Private Dock',
        location: 'West Bank Pier',
      },
    ],
  },
};

// Helper to get gallery for an item or generate a fallback
export const getGalleryForItem = (
  itemId: string,
  fallbackTitle: string,
  category: 'tours' | 'flats' | 'transport'
): ItemGallery => {
  const existing = SERVICE_GALLERIES[itemId];
  if (existing) return existing;

  // Fallback to high-res thematic images
  const fallbackUrls = [
    'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=85',
  ];

  return {
    itemId,
    itemTitle: fallbackTitle,
    category,
    subtitle: 'Exclusive luxury service in Luxor, Egypt',
    images: fallbackUrls.map((url, i) => ({
      id: `${itemId}-${i}`,
      url,
      caption: `${fallbackTitle} — View ${i + 1}`,
      tag: 'Luxor Experience',
      location: 'Luxor, Egypt',
    })),
  };
};

// Curated interactive hot-spots providing historical context, fun facts, and architectural secrets
export const getHotspotsForImage = (
  image: GalleryImage | undefined,
  itemTitle?: string
): ImageHotspot[] => {
  if (!image) return [];

  // Return specific hotspots if defined on image
  if (image.hotspots && image.hotspots.length > 0) {
    return image.hotspots;
  }

  const id = image.id.toLowerCase();
  const caption = (image.caption || '').toLowerCase();
  const tag = (image.tag || '').toLowerCase();
  const title = (itemTitle || '').toLowerCase();

  // 1. Dendera Hathor Temple Facade & Capitals
  if (id.includes('dendera-1') || tag.includes('hathor sistrum') || caption.includes('sistrum columns')) {
    return [
      {
        id: 'den1-capitals',
        x: 48,
        y: 32,
        title: 'Four-Faced Hathor Sistrum Capitals',
        category: 'architecture',
        description: 'Each capital portrays Hathor with bovine ears—symbolizing maternal gentleness and cosmic music. These functioned as giant sistrum rattles to banish discord and summon divine harmony.',
      },
      {
        id: 'den1-frieze',
        x: 52,
        y: 12,
        title: 'Uraeus Winged Solar Cornice',
        category: 'symbolism',
        description: 'The monumental cavetto cornice bears alternating royal cobras (uraei) crowned with solar disks, invoking protection over the gateway between mortal sand and the holy sanctuary.',
      },
      {
        id: 'den1-screen',
        x: 72,
        y: 78,
        title: 'Intercolumnar Screen Walls',
        category: 'history',
        description: 'Unlike closed temples, Greco-Roman era builders built half-height screen walls so morning sunlight could illuminate incense clouds inside the hypostyle hall.',
      },
    ];
  }

  // 2. Dendera Goddess Nut Astronomical Ceiling
  if (id.includes('dendera-2') || tag.includes('nut') || caption.includes('goddess nut')) {
    return [
      {
        id: 'den2-nut-body',
        x: 46,
        y: 35,
        title: 'The Sky Goddess Nut Arching the Cosmos',
        category: 'symbolism',
        description: 'Goddess Nut arches her body across the vault. Her hands touch the western horizon to swallow the evening sun, which journeys through her celestial body to be reborn at dawn.',
      },
      {
        id: 'den2-pigments',
        x: 75,
        y: 50,
        title: 'Egyptian Blue (Cuprorivaite)',
        category: 'fact',
        description: 'Synthetic calcium copper silicate created in 2500 BCE. Protected under centuries of soot until modern laser restoration unveiled this astonishingly vivid turquoise pigment.',
      },
      {
        id: 'den2-barks',
        x: 25,
        y: 65,
        title: 'Celestial Solar Barks & Constellations',
        category: 'history',
        description: 'The stars on Nut’s body represent the 36 decans—stars whose heliacal rising calibrated the ancient 365-day Egyptian agricultural calendar.',
      },
    ];
  }

  // 3. Dendera Eye of Horus & Celestial Zodiac
  if (id.includes('dendera-3') || tag.includes('eye of horus') || caption.includes('zodiac relief')) {
    return [
      {
        id: 'den3-eye',
        x: 52,
        y: 42,
        title: 'Wedjat: The Sacred Eye of Horus',
        category: 'symbolism',
        description: 'The Wedjat represents whole-making, lunar phases, and mathematical fractions (1/2, 1/4, 1/8, 1/16, 1/32, 1/64) used by Egyptian scribes to calculate grain rations and temple medicines.',
      },
      {
        id: 'den3-lunar',
        x: 32,
        y: 30,
        title: '14 Days of the Waxing Moon',
        category: 'history',
        description: 'Carved deities ascend 14 steps, each representing one day of the lunar cycle culminating in the full moon when Osiris is symbolically resurrected.',
      },
      {
        id: 'den3-cleopatra',
        x: 70,
        y: 62,
        title: 'Cleopatra VII & Caesarion Patronage',
        category: 'fact',
        description: 'The rear wall of this temple features the only surviving monumental relief depicting Cleopatra VII dressed as Pharaoh alongside Caesarion, her son with Julius Caesar.',
      },
    ];
  }

  // 4. Abydos Raising of Djed Pillar
  if (id.includes('dendera-4') || tag.includes('djed') || caption.includes('djed pillar')) {
    return [
      {
        id: 'den4-djed',
        x: 50,
        y: 45,
        title: 'The Sacred Djed Pillar of Osiris',
        category: 'symbolism',
        description: 'Representing the spine of Osiris and cosmic stability. The pharaoh physically raised the pillar during coronation jubilees to ensure perpetual equilibrium (Ma\'at) throughout Upper and Lower Egypt.',
      },
      {
        id: 'den4-isis',
        x: 28,
        y: 48,
        title: 'Goddess Isis Blessing the Pharaoh',
        category: 'history',
        description: 'Isis extends the Ankh (breath of life) toward King Seti I. Notice the raised relief carving—regarded by archaeologists as the apex of New Kingdom sculptural finesse.',
      },
      {
        id: 'den4-glyphs',
        x: 74,
        y: 30,
        title: 'Golden Royal Cartouches',
        category: 'fact',
        description: 'Seti I’s throne name "Menmaatre" ("Eternal is the Truth of Ra") carved in deep intaglio and colored with natural yellow ochre and crushed malachite.',
      },
    ];
  }

  // 5. Abydos Seti I Hypostyle Hall
  if (id.includes('dendera-5') || tag.includes('seti i hypostyle') || caption.includes('hypostyle hall of pharaoh seti')) {
    return [
      {
        id: 'den5-columns',
        x: 22,
        y: 52,
        title: 'Closed Bud Papyrus Columns',
        category: 'architecture',
        description: 'These stone columns represent the primordial marsh of creation (the Nun) from which the Primeval Mound emerged at the dawn of time.',
      },
      {
        id: 'den5-architrave',
        x: 55,
        y: 18,
        title: 'Monolithic Sandstone Architraves',
        category: 'fact',
        description: 'Enormous stone lintels weighing over 25 tons were hoisted into place using inclined mudbrick construction ramps that were removed after building was complete.',
      },
      {
        id: 'den5-sanctuaries',
        x: 62,
        y: 68,
        title: 'Portal to the Seven Sanctuaries',
        category: 'history',
        description: 'Abydos is unique in Egypt for having seven axial chapels dedicated to Horus, Isis, Osiris, Amun-Ra, Ra-Horakhty, Ptah, and the deified King Seti I.',
      },
    ];
  }

  // 6. Subterranean Osireion Water Sanctuary
  if (id.includes('dendera-6') || id.includes('dendera-7') || tag.includes('osireion') || caption.includes('osireion')) {
    return [
      {
        id: 'den6-monolith',
        x: 48,
        y: 45,
        title: 'Colossal Red Granite Megaliths',
        category: 'architecture',
        description: 'Constructed from pink Aswan granite pillars weighing up to 100 tons each, carved and fitted with mortise-and-tenon joints without mortar, resembling Old Kingdom Giza architecture.',
      },
      {
        id: 'den6-water',
        x: 52,
        y: 80,
        title: 'The Sacred Primordial Water Channel',
        category: 'symbolism',
        description: 'Surrounded by an island with 17 niches, this underground sanctuary flooded naturally with rising Nile groundwaters to mirror the mythical Primeval Waters of Creation.',
      },
      {
        id: 'den6-flower',
        x: 78,
        y: 35,
        title: 'The Flower of Life Inscriptions',
        category: 'fact',
        description: 'Faint ochre geometric designs resembling the "Flower of Life" are inscribed on the granite pillars, drawn during the Greco-Roman period by visiting Pythagorean pilgrims.',
      },
    ];
  }

  // 7. Dendera Rooftop Kiosk & New Year Chapel
  if (id.includes('dendera-10') || tag.includes('rooftop hathor') || caption.includes('rooftop')) {
    return [
      {
        id: 'den10-kiosk',
        x: 50,
        y: 50,
        title: 'The Sun Union Chapel (Wep Ronpet)',
        category: 'history',
        description: 'Every Egyptian New Year dawn, high priests carried the golden statue of Hathor up the spiral stairway to this open-air kiosk so the rising sun could spiritually recharge the goddess.',
      },
      {
        id: 'den10-stairs',
        x: 25,
        y: 75,
        title: 'Spiral Processional Stairway',
        category: 'architecture',
        description: 'The temple roof is reached by two stairs: one spiral (symbolizing the ascending flight of the falcon) and one straight (symbolizing the descending procession).',
      },
    ];
  }

  // 8. Dahabiya Sunset & Deck Dining (Photos 1, 2, 5, 6, 8, etc.)
  if (title.includes('dahabiya') || id.includes('nile-dahabiya') || tag.includes('dahabiya') || caption.includes('dahabiya')) {
    return [
      {
        id: 'dahab-sails',
        x: 42,
        y: 28,
        title: 'Traditional Lateen Sail Rigging',
        category: 'architecture',
        description: 'Dahabiyas rely on triangular lateen sails that harness both gentle downstream northerly winds and upstream currents—gliding silently without disruptive engine vibration.',
      },
      {
        id: 'dahab-deck',
        x: 58,
        y: 65,
        title: 'Solid Teak Observation Deck',
        category: 'history',
        description: 'Dahabiya (meaning "the golden one" in Arabic) originated in the 19th century when aristocrats and Egyptologists spent weeks sailing between Cairo and Nubia in bespoke comfort.',
      },
      {
        id: 'dahab-cuisine',
        x: 78,
        y: 78,
        title: 'Private Executive Chef Experience',
        category: 'fact',
        description: 'Our onboard private culinary team sources organic produce daily from West Bank farmers, preparing authentic wood-fired pigeon, grilled sea bass, and warm baladi bread.',
      },
    ];
  }

  // 9. Hot Air Balloon (Royal Sunrise)
  if (title.includes('balloon') || id.includes('balloon') || tag.includes('balloon')) {
    return [
      {
        id: 'ball-altitude',
        x: 52,
        y: 35,
        title: '2,500 ft Theban Flight Corridor',
        category: 'fact',
        description: 'Luxor is the balloon capital of the ancient world. Rising at sunrise lets you gaze upon 4,000 years of pharaonic monuments between desert limestone cliffs and the lush green Nile ribbon.',
      },
      {
        id: 'ball-burner',
        x: 48,
        y: 70,
        title: 'Twin Liquid Propane Burners',
        category: 'architecture',
        description: 'Generating over 30 million BTUs of thermal energy to heat the nylon envelope, allowing master pilots licensed by the Egyptian Ministry of Civil Aviation to catch gentle desert winds.',
      },
      {
        id: 'ball-memnon',
        x: 25,
        y: 82,
        title: 'Colossi of Memnon Flyover',
        category: 'history',
        description: 'From above, you can see the twin 60-foot statues of Amenhotep III that guarded the entrance to his vanished mortuary temple—once the largest temple complex in Egypt.',
      },
    ];
  }

  // 10. Valley of the Kings & Nefertari Tomb
  if (title.includes('nefertari') || title.includes('kings') || id.includes('nefertari')) {
    return [
      {
        id: 'nef-fresco',
        x: 50,
        y: 40,
        title: 'Queen Nefertari "For Whom the Sun Shines"',
        category: 'history',
        description: 'Tomb QV66 is renowned as the Sistine Chapel of Ancient Egypt. Pharaoh Ramses II inscribed: "My love is unique — no one can rival her, for she is the most beautiful woman living."',
      },
      {
        id: 'nef-lapis',
        x: 72,
        y: 25,
        title: 'Lapis Lazuli & Gold Leaf Murals',
        category: 'fact',
        description: 'The luminous ultramarine blue was crafted with ground Afghan lapis lazuli imported over 3,000 miles along ancient Bronze Age trade networks.',
      },
      {
        id: 'nef-star',
        x: 30,
        y: 18,
        title: 'Astronomical Night Sky Vault',
        category: 'symbolism',
        description: 'The ceiling is painted with hundreds of five-pointed golden stars on deep midnight indigo, transforming the burial crypt into an everlasting celestial sanctuary.',
      },
    ];
  }

  // 11. Karnak Hypostyle & Luxor Temple
  if (title.includes('karnak') || title.includes('luxor temple') || id.includes('karnak')) {
    return [
      {
        id: 'kar-columns',
        x: 38,
        y: 48,
        title: 'The Great Hypostyle Hall: 134 Giants',
        category: 'architecture',
        description: 'Covering 54,000 sq ft, the 134 sandstone columns rise up to 70 ft with capitals broad enough for 100 people to stand on atop the central aisle.',
      },
      {
        id: 'kar-sphinx',
        x: 68,
        y: 72,
        title: 'Avenue of Sphinxes (Dromos)',
        category: 'history',
        description: 'A 2.7 km processional road lined with over 1,050 sphinxes, reuniting Karnak and Luxor temples during the sacred annual Opet Festival.',
      },
      {
        id: 'kar-cartouche',
        x: 50,
        y: 20,
        title: 'Deep Intaglio Inscriptions',
        category: 'symbolism',
        description: 'Ramses II ordered his cartouches to be carved exceptionally deep into the stone columns so subsequent pharaohs could never chisel his royal name away.',
      },
    ];
  }

  // Generic fallback with engaging Egyptian insights
  return [
    {
      id: `spot-insight-${image.id}-1`,
      x: 35,
      y: 40,
      title: `${image.tag || 'Monument Insight'}`,
      category: 'history',
      description: image.caption || 'Authentic Upper Egyptian heritage site preserved for millennia along the Nile Valley.',
    },
    {
      id: `spot-insight-${image.id}-2`,
      x: 65,
      y: 60,
      title: 'Architectural Significance',
      category: 'architecture',
      description: 'Master sandstone masonry and precision orientation aligned with solar solstices and celestial star constellations.',
    },
  ];
};

