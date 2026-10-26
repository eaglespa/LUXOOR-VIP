export type LoyaltyTier = 'Scarab' | 'Anubis' | 'Horus' | 'Pharaoh';

export interface LoyaltyTransaction {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earn' | 'redeem' | 'welcome';
  bookingRef?: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  category: 'discount' | 'upgrade';
  pointsCost: number;
  valueDescription: string;
  badge?: string;
  iconName?: string;
  discountUSD?: number;
}

export interface LoyaltyData {
  points: number;
  lifetimePoints: number;
  tier: LoyaltyTier;
  memberId: string;
  memberName: string;
  memberSince: string;
  transactions: LoyaltyTransaction[];
  unlockedUpgrades: {
    id: string;
    rewardId: string;
    title: string;
    redeemedAt: string;
    code: string;
    status: 'active' | 'used';
  }[];
}

const STORAGE_KEY = 'luxor_vip_loyalty_data';

export const REWARD_CATALOG: LoyaltyReward[] = [
  // Instant Discounts
  {
    id: 'disc-25',
    title: '$25 Booking Discount',
    category: 'discount',
    pointsCost: 250,
    valueDescription: 'Instant $25 deduction on any tour, flat, or private Nile transport booking.',
    badge: 'Popular',
    discountUSD: 25,
  },
  {
    id: 'disc-60',
    title: '$60 Royal Credit',
    category: 'discount',
    pointsCost: 500,
    valueDescription: 'Save $60 across multi-day packages, luxury suites, or private balloon flights.',
    badge: 'Best Value',
    discountUSD: 60,
  },
  {
    id: 'disc-150',
    title: '$150 Pharaoh Voucher',
    category: 'discount',
    pointsCost: 1000,
    valueDescription: 'Instant $150 credit towards presidential suites or bespoke archaeological expeditions.',
    badge: 'Ultra VIP',
    discountUSD: 150,
  },
  // Private Upgrades
  {
    id: 'upg-airport',
    title: 'VIP Airport Curbside Fast-Track',
    category: 'upgrade',
    pointsCost: 150,
    valueDescription: 'Chauffeured baggage escort & fast-track customs assistance at Luxor International (LXR).',
    badge: 'Seamless Arrival',
  },
  {
    id: 'upg-balloon-rim',
    title: 'Hot Air Balloon Front-Rim Guarantee',
    category: 'upgrade',
    pointsCost: 200,
    valueDescription: 'Guaranteed front-corner unobstructed aerial basket placement for 360° sunrise photography.',
    badge: 'Exclusive View',
  },
  {
    id: 'upg-late-checkout',
    title: 'Guaranteed Late Villa Checkout (4 PM)',
    category: 'upgrade',
    pointsCost: 300,
    valueDescription: 'Relax pool-side on the Nile until 4:00 PM without additional half-day charges.',
    badge: 'Leisure Choice',
  },
  {
    id: 'upg-felucca-sunset',
    title: 'Sunset Felucca Hibiscus & Sweets Tasting',
    category: 'upgrade',
    pointsCost: 350,
    valueDescription: 'Private wooden felucca sail at golden hour with fresh organic Karkadeh and Egyptian date pastries.',
    badge: 'Chef Curated',
  },
  {
    id: 'upg-vault-tour',
    title: 'Private Egyptologist Tombs Vault Access',
    category: 'upgrade',
    pointsCost: 600,
    valueDescription: 'Dedicated 1-on-1 scholarly commentary inside KV9 and Nefertari with high-resolution lantern illumination.',
    badge: 'Treasury VIP',
  },
];

export const TIER_BENEFITS: Record<
  LoyaltyTier,
  { minPoints: number; multiplier: number; label: string; icon: string; perks: string[] }
> = {
  Scarab: {
    minPoints: 0,
    multiplier: 10, // 10 pts per $1
    label: 'Scarab Initiate',
    icon: '🪲',
    perks: ['10 Luxor Points per $1 spent', 'Instant points redemption', 'Digital royal membership card'],
  },
  Anubis: {
    minPoints: 500,
    multiplier: 12, // 12 pts per $1
    label: 'Anubis Guardian',
    icon: '🐺',
    perks: [
      '12 Luxor Points per $1 spent (+20% bonus)',
      'Complimentary chilled hibiscus welcoming drinks',
      'Flexible 24h booking reschedule without fee',
    ],
  },
  Horus: {
    minPoints: 1500,
    multiplier: 15, // 15 pts per $1
    label: 'Horus Ascendant',
    icon: '🦅',
    perks: [
      '15 Luxor Points per $1 spent (+50% bonus)',
      'Priority sunrise balloon launch queue',
      'Complimentary curbside airport meet & greet',
      'Dedicated WhatsApp VIP concierge line',
    ],
  },
  Pharaoh: {
    minPoints: 3500,
    multiplier: 20, // 20 pts per $1
    label: 'Pharaoh Sovereign',
    icon: '👑',
    perks: [
      '20 Luxor Points per $1 spent (2x multiplier)',
      'Private motorboat transfers between East & West banks',
      'Complimentary private Egyptologist on custom itineraries',
      'Unrestricted villa early check-in & late checkout',
    ],
  },
};

export const calculateTier = (lifetimePoints: number): LoyaltyTier => {
  if (lifetimePoints >= 3500) return 'Pharaoh';
  if (lifetimePoints >= 1500) return 'Horus';
  if (lifetimePoints >= 500) return 'Anubis';
  return 'Scarab';
};

export const getInitialLoyaltyData = (): LoyaltyData => {
  const defaultData: LoyaltyData = {
    points: 350, // Welcome points to allow instant testing and redemption!
    lifetimePoints: 350,
    tier: 'Scarab',
    memberId: 'LXR-VIP-GOLD-774',
    memberName: 'Distinguished Traveler',
    memberSince: 'March 2026',
    transactions: [
      {
        id: 'tx-welcome-01',
        date: new Date().toISOString().split('T')[0],
        description: 'Royal Welcome Bonus — Luxor VIP Club Initiation',
        points: 350,
        type: 'welcome',
      },
    ],
    unlockedUpgrades: [],
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return defaultData;
    }
    const parsed = JSON.parse(raw) as LoyaltyData;
    // ensure tier stays synced with lifetimePoints
    parsed.tier = calculateTier(parsed.lifetimePoints || parsed.points);
    return parsed;
  } catch (e) {
    console.error('Failed to load loyalty data:', e);
    return defaultData;
  }
};

export const saveLoyaltyData = (data: LoyaltyData): void => {
  try {
    data.tier = calculateTier(data.lifetimePoints);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('luxor-points-updated', { detail: data }));
  } catch (e) {
    console.error('Failed to save loyalty data:', e);
  }
};

export const earnPoints = (
  spentUSD: number,
  description: string,
  bookingRef?: string
): { pointsEarned: number; newBalance: number } => {
  const current = getInitialLoyaltyData();
  const tierInfo = TIER_BENEFITS[current.tier];
  const pointsEarned = Math.max(10, Math.round(spentUSD * tierInfo.multiplier));

  current.points += pointsEarned;
  current.lifetimePoints += pointsEarned;
  current.tier = calculateTier(current.lifetimePoints);

  const newTx: LoyaltyTransaction = {
    id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString().split('T')[0],
    description,
    points: pointsEarned,
    type: 'earn',
    bookingRef,
  };

  current.transactions.unshift(newTx);
  saveLoyaltyData(current);

  return { pointsEarned, newBalance: current.points };
};

export const redeemReward = (
  rewardId: string
): { success: boolean; message: string; code?: string } => {
  const current = getInitialLoyaltyData();
  const reward = REWARD_CATALOG.find((r) => r.id === rewardId);

  if (!reward) {
    return { success: false, message: 'Reward not found in Royal Catalog.' };
  }

  if (current.points < reward.pointsCost) {
    return {
      success: false,
      message: `Insufficient Luxor Points. You have ${current.points} pts, but ${reward.pointsCost} pts are required.`,
    };
  }

  current.points -= reward.pointsCost;

  const code = `LXR-${reward.category.toUpperCase().slice(0, 3)}-${Math.floor(100000 + Math.random() * 900000)}`;

  const newTx: LoyaltyTransaction = {
    id: `tx-rdm-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    description: `Redeemed: ${reward.title}`,
    points: -reward.pointsCost,
    type: 'redeem',
  };

  current.transactions.unshift(newTx);

  if (reward.category === 'upgrade') {
    current.unlockedUpgrades.unshift({
      id: `upg-inst-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      redeemedAt: new Date().toISOString().split('T')[0],
      code,
      status: 'active',
    });
  }

  saveLoyaltyData(current);
  return {
    success: true,
    message: `Successfully redeemed "${reward.title}"!`,
    code,
  };
};

export const resetLoyaltyDemo = (): LoyaltyData => {
  localStorage.removeItem(STORAGE_KEY);
  const fresh = getInitialLoyaltyData();
  window.dispatchEvent(new CustomEvent('luxor-points-updated', { detail: fresh }));
  return fresh;
};
