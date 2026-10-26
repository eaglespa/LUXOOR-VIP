/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency, ServiceCategory, TourItem, FlatItem, TransportItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ToursSection } from './components/ToursSection';
import { FlatsSection } from './components/FlatsSection';
import { TransportSection } from './components/TransportSection';
import { InteractiveNileBanks } from './components/InteractiveNileBanks';
import { HistoricalTimeline } from './components/HistoricalTimeline';
import { VirtualBalloonExperience } from './components/VirtualBalloonExperience';
import { CustomConciergePlanner } from './components/CustomConciergePlanner';
import { TestimonialsAndFaq } from './components/TestimonialsAndFaq';
import { Footer } from './components/Footer';
import { FloatingConciergeWidget } from './components/FloatingConciergeWidget';
import { BookingModal } from './components/BookingModal';
import { NefertariConcierge } from './components/NefertariConcierge';
import { AdminDashboard } from './components/AdminDashboard';
import { MyBookingsModal } from './components/MyBookingsModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { CookieBanner } from './components/CookieBanner';
import { JumpUpButton } from './components/JumpUpButton';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { LightboxGalleryModal } from './components/LightboxGalleryModal';
import { LuxorPointsModal } from './components/LuxorPointsModal';
import { TOURS_DATA, FLATS_DATA, TRANSPORT_DATA } from './data/luxorData';
import { I18nProvider } from './i18n/I18nContext';

function LuxorVipContent() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingCategory, setBookingCategory] = useState<ServiceCategory>('tours');
  const [selectedItem, setSelectedItem] = useState<TourItem | FlatItem | TransportItem | null>(null);
  const [customSummary, setCustomSummary] = useState<string | undefined>(undefined);
  const [customPriceUSD, setCustomPriceUSD] = useState<number | undefined>(undefined);

  // Modals state
  const [isNefertariOpen, setIsNefertariOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState<boolean>(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState<boolean>(false);
  const [flatsBankFilter, setFlatsBankFilter] = useState<'all' | 'west' | 'east'>('all');
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [activeGalleryItem, setActiveGalleryItem] = useState<{
    item: TourItem | FlatItem | TransportItem;
    category: ServiceCategory;
  } | null>(null);

  const handleOpenGallery = (item: TourItem | FlatItem | TransportItem, category: ServiceCategory) => {
    setActiveGalleryItem({ item, category });
  };

  const handleBookFromGallery = (item: TourItem | FlatItem | TransportItem, category: ServiceCategory) => {
    if (category === 'tours') {
      handleBookTour(item as TourItem);
    } else if (category === 'flats') {
      handleBookFlat(item as FlatItem);
    } else {
      handleBookTransport(item as TransportItem);
    }
  };

  const handleOpenGeneralBooking = () => {
    setBookingCategory('tours');
    setSelectedItem(null);
    setCustomSummary(undefined);
    setCustomPriceUSD(undefined);
    setIsBookingOpen(true);
  };

  const handleBookTour = (tour: TourItem) => {
    setBookingCategory('tours');
    setSelectedItem(tour);
    setCustomSummary(undefined);
    setCustomPriceUSD(undefined);
    setIsBookingOpen(true);
  };

  const handleBookFlat = (flat: FlatItem) => {
    setBookingCategory('flats');
    setSelectedItem(flat);
    setCustomSummary(undefined);
    setCustomPriceUSD(undefined);
    setIsBookingOpen(true);
  };

  const handleBookTransport = (transport: TransportItem) => {
    setBookingCategory('transport');
    setSelectedItem(transport);
    setCustomSummary(undefined);
    setCustomPriceUSD(undefined);
    setIsBookingOpen(true);
  };

  const handleQuickBook = (category: ServiceCategory) => {
    setBookingCategory(category);
    setSelectedItem(null);
    setCustomSummary(undefined);
    setCustomPriceUSD(undefined);
    setIsBookingOpen(true);
  };

  const handleBookBalloonDirect = () => {
    const balloonTour = TOURS_DATA.find((t) => t.category === 'balloon') || TOURS_DATA[0];
    handleBookTour(balloonTour);
  };

  const handleCustomPlanBooking = (summary: string, estimatedPriceUSD: number) => {
    setBookingCategory('tours');
    setSelectedItem(null);
    setCustomSummary(summary);
    setCustomPriceUSD(estimatedPriceUSD);
    setIsBookingOpen(true);
  };

  const handleNefertariTriggerBooking = (category: ServiceCategory, itemId?: string) => {
    setBookingCategory(category);
    if (itemId) {
      if (category === 'tours') {
        const item = TOURS_DATA.find((t) => t.id === itemId);
        if (item) setSelectedItem(item);
      } else if (category === 'flats') {
        const item = FLATS_DATA.find((f) => f.id === itemId);
        if (item) setSelectedItem(item);
      } else {
        const item = TRANSPORT_DATA.find((tr) => tr.id === itemId);
        if (item) setSelectedItem(item);
      }
    }
    setIsBookingOpen(true);
  };

  const handleSelectTimelineLandmark = (landmarkName: string) => {
    const matchingTour = TOURS_DATA.find(
      (t) =>
        t.title.toLowerCase().includes(landmarkName.toLowerCase()) ||
        t.highlights.some((h) => h.toLowerCase().includes(landmarkName.toLowerCase()))
    );
    if (matchingTour) {
      handleBookTour(matchingTour);
    } else {
      setBookingCategory('tours');
      setSelectedItem(null);
      setCustomSummary(`Private Egyptologist Expedition: ${landmarkName}`);
      setIsBookingOpen(true);
    }
  };

  const handleScrollToPlanner = () => {
    const el = document.getElementById('planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#101D2B] text-stone-100 selection:bg-[#D6AD60] selection:text-stone-950 font-sans antialiased">
      {/* Top Navigation with 8-language switcher, currency, audio, and booking links */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenBookingModal={handleOpenGeneralBooking}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenNefertari={() => setIsNefertariOpen(true)}
        onOpenVoiceSearch={() => setIsVoiceSearchOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Cinematic Hero Section with Quick Search Panel & Floating Balloon Motion */}
        <HeroSection
          currentCurrency={currency}
          onQuickBook={handleQuickBook}
          onPlanJourney={handleScrollToPlanner}
          onOpenVoiceSearch={() => setIsVoiceSearchOpen(true)}
        />

        {/* 01. Tours & Hot Air Balloon */}
        <ToursSection
          currentCurrency={currency}
          onBookTour={handleBookTour}
          onOpenGallery={handleOpenGallery}
        />

        {/* 02. Flats & Nilefront Villas */}
        <FlatsSection
          currentCurrency={currency}
          onBookFlat={handleBookFlat}
          bankFilter={flatsBankFilter}
          onBankFilterChange={setFlatsBankFilter}
          onOpenGallery={handleOpenGallery}
        />

        {/* 03. VIP Tourism Transport */}
        <TransportSection
          currentCurrency={currency}
          onBookTransport={handleBookTransport}
          onOpenGallery={handleOpenGallery}
        />

        {/* 04. Interactive Nile Banks Guide (East vs West) */}
        <InteractiveNileBanks />

        {/* 04.5. Interactive Historical Timeline Component */}
        <HistoricalTimeline
          onSelectLandmarkForBooking={handleSelectTimelineLandmark}
        />

        {/* 05. 360° Sunrise Balloon Flight Simulator */}
        <VirtualBalloonExperience
          onBookBalloon={handleBookBalloonDirect}
        />

        {/* 06. Custom Concierge Itinerary Planner */}
        <CustomConciergePlanner
          currentCurrency={currency}
          onOpenBookingModalWithCustom={handleCustomPlanBooking}
        />

        {/* 07. Social Proof, Verified Reviews & FAQs */}
        <TestimonialsAndFaq />
      </main>

      {/* Footer with Legal Policies and Operational Access */}
      <Footer
        onOpenPolicy={(type) => setActivePolicy(type)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating 24/7 VIP Concierge Drawer (WhatsApp & Fast Booking) */}
      <FloatingConciergeWidget
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Flagship Multilingual AI Concierge with Voice: "Nefertari" */}
      <NefertariConcierge
        isOpen={isNefertariOpen}
        onClose={() => setIsNefertariOpen(false)}
        onTriggerBooking={handleNefertariTriggerBooking}
      />

      {/* Administrative Operations Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Customer Booking Lookup: "My Bookings" */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />

      {/* Legal & Policy Modals */}
      <PolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* International Cookie Consent Banner */}
      <CookieBanner />

      {/* Floating Jump Up Arrow & Top Scroll Progress Indicator */}
      <JumpUpButton />

      {/* Voice-Activated Search Command Feature (SpeechRecognition API) */}
      <VoiceSearchModal
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
        onBookTour={handleBookTour}
        onBookFlat={handleBookFlat}
        onBookTransport={handleBookTransport}
        onSetFlatsBankFilter={(filter) => {
          setFlatsBankFilter(filter);
          const el = document.getElementById('flats');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenNefertari={() => setIsNefertariOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
      />

      {/* Luxor Points Royal Club Loyalty Modal */}
      <LuxorPointsModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Immersive Full-Screen Lightbox Image Gallery */}
      <LightboxGalleryModal
        isOpen={!!activeGalleryItem}
        item={activeGalleryItem?.item || null}
        category={activeGalleryItem?.category || 'tours'}
        onClose={() => setActiveGalleryItem(null)}
        onBookItem={handleBookFromGallery}
      />

      {/* Interactive Online Booking Modal & Pass Generator */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        currentCurrency={currency}
        initialCategory={bookingCategory}
        initialItem={selectedItem}
        customSummary={customSummary}
        customEstimatedPriceUSD={customPriceUSD}
      />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <LuxorVipContent />
    </I18nProvider>
  );
}
