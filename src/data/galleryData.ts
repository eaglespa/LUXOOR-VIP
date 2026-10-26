export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  tag: string;
  location?: string;
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
        url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1600&q=85',
        caption: 'Breathtaking sunrise ascent over the rugged limestone peaks of the Theban Necropolis',
        tag: 'Sunrise Ascent',
        location: 'West Bank Launch Site, Luxor',
      },
      {
        id: 'balloon-2',
        url: 'https://images.unsplash.com/photo-1498855926480-d98e83099315?auto=format&fit=crop&w=1600&q=85',
        caption: 'Fleet of vibrant hot air balloons drifting above emerald sugar cane fields and the Nile',
        tag: 'Panoramic Fleet',
        location: 'Nile Valley Overlook',
      },
      {
        id: 'balloon-3',
        url: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=85',
        caption: 'Bird’s-eye perspective of Queen Hatshepsut’s terraced cliff temple and King Tut’s valley',
        tag: 'Aerial Monuments',
        location: 'Deir el-Bahari',
      },
      {
        id: 'balloon-4',
        url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1600&q=85',
        caption: 'Pre-dawn burner ignition creating an atmospheric amber glow across the launch field',
        tag: 'Dawn Preparation',
        location: 'Launch Pavilion',
      },
      {
        id: 'balloon-5',
        url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
        caption: 'Post-flight royal celebration with Egyptian hibiscus tea and master pilot flight certificate',
        tag: 'VIP Celebration',
        location: 'Landing Oasis',
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
        url: 'https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=1600&q=85',
        caption: 'Vivid lapis lazuli and gold mineral pigments preserved over 3,200 years in Queen Nefertari’s tomb (QV66)',
        tag: 'Queen Nefertari Chamber',
        location: 'Valley of the Queens',
      },
      {
        id: 'nefertari-2',
        url: 'https://images.unsplash.com/photo-1590059296655-2ff3253b2f56?auto=format&fit=crop&w=1600&q=85',
        caption: 'Colonnaded sandstone terraces of Mortuary Temple of Queen Hatshepsut cut into the jagged mountain cliff',
        tag: 'Hatshepsut Terraces',
        location: 'Deir el-Bahari',
      },
      {
        id: 'nefertari-3',
        url: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=85',
        caption: 'Colossi of Memnon statues greeting travelers on the West Bank Theban plain at dawn',
        tag: 'Theban Sentinels',
        location: 'West Bank Thebes',
      },
      {
        id: 'nefertari-4',
        url: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=85',
        caption: 'Deep underground burial corridor with carved astronomical sky ceilings and protective deities',
        tag: 'Royal Crypts',
        location: 'Valley of the Kings',
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
        url: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=85',
        caption: 'Forest of 134 colossal sandstone papyrus columns standing 21 meters tall in the Great Hypostyle Hall',
        tag: 'Hypostyle Hall',
        location: 'Karnak Complex',
      },
      {
        id: 'karnak-2',
        url: 'https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=1600&q=85',
        caption: 'Luxor Temple Pylon bathed in warm twilight floodlights reflecting off the Nile Corniche',
        tag: 'Twilight Illumination',
        location: 'Luxor Temple',
      },
      {
        id: 'karnak-3',
        url: 'https://images.unsplash.com/photo-1590059296655-2ff3253b2f56?auto=format&fit=crop&w=1600&q=85',
        caption: 'Avenue of the Sphinxes illuminated along the 3-kilometer ceremonial route connecting Karnak and Luxor',
        tag: 'Sphinx Avenue',
        location: 'Sacred Dromos',
      },
      {
        id: 'karnak-4',
        url: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=85',
        caption: 'Intricate deep-relief hieroglyphic cartouches of Pharaoh Ramses the Great under golden rays',
        tag: 'Royal Cartouches',
        location: 'Great Pylon',
      },
    ],
  },

  // 4. Nile Sunset Felucca
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
    subtitle: 'Egypt’s most miraculous intact turquoise ceiling and the mysterious Osireion',
    images: [
      {
        id: 'dendera-1',
        url: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=85',
        caption: 'Astrological zodiac ceiling with pristine celestial blue pigments at the Temple of Hathor',
        tag: 'Dendera Ceiling',
        location: 'Qena Province',
      },
      {
        id: 'dendera-2',
        url: 'https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=1600&q=85',
        caption: 'Massive Hathor-headed columns welcoming pilgrims into the outer hypostyle temple hall',
        tag: 'Hathor Capitals',
        location: 'Dendera Complex',
      },
      {
        id: 'dendera-3',
        url: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=85',
        caption: 'The enigmatic megalithic Osireion water sanctuary and Seven Chapels of Pharaoh Seti I',
        tag: 'Abydos Sanctuary',
        location: 'Abydos, Sohag',
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
