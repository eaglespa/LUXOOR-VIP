export type Currency = 'USD' | 'EUR' | 'GBP' | 'EGP';

export interface CurrencyRate {
  symbol: string;
  rate: number; // relative to USD
}

export type ServiceCategory = 'tours' | 'flats' | 'transport';

export interface TourItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  location: string;
  priceUSD: number;
  featured?: boolean;
  category: 'balloon' | 'temples' | 'nile' | 'desert';
  highlights: string[];
  inclusions: string[];
  description: string;
  startTimes: string[];
  bank: 'East Bank' | 'West Bank' | 'River Nile' | 'Excursion';
  rating: number;
  reviewCount: number;
  badge?: string;
  imageUrl?: string;
  photoAlt?: string;
}

export interface FlatItem {
  id: string;
  name: string;
  tagline: string;
  bank: 'East Bank (City & Nile)' | 'West Bank (Peaceful & Views)';
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  pricePerNightUSD: number;
  featured?: boolean;
  amenities: string[];
  description: string;
  view: string;
  distanceToNile: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  photoAlt?: string;
}

export interface TransportItem {
  id: string;
  name: string;
  category: 'airport' | 'chauffeur' | 'nile-boat' | 'desert-safari';
  vehicleType: string;
  passengers: number;
  luggage: number;
  rateType: 'per-trip' | 'per-day' | 'hourly';
  priceUSD: number;
  features: string[];
  description: string;
  imageUrl?: string;
  photoAlt?: string;
}

export interface BookingDetails {
  serviceType: ServiceCategory;
  itemId: string;
  itemTitle: string;
  date: string;
  timeSlot?: string;
  nights?: number;
  guests: number;
  pickupLocation: string;
  selectedAddons: string[];
  currency: Currency;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  totalPriceUSD: number;
  bookingRef?: string;
}

export interface Landmark {
  id: string;
  name: string;
  bank: 'east' | 'west';
  century: string;
  brief: string;
  features: string[];
  tip: string;
}
