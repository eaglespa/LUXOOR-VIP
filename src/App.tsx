import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, Compass, Globe2, Heart, MapPin, Menu, Moon, Search, ShieldCheck, Sparkles, Star, Sun, Users, X } from 'lucide-react';
import { BookingModal } from './components/BookingModal';
import { FAQS, FLATS_DATA, formatPrice, TOURS_DATA, TRANSPORT_DATA } from './data/luxorData';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { SUPPORTED_LANGUAGES } from './i18n/translations';
import type { Currency, FlatItem, ServiceCategory, TourItem, TransportItem } from './types';

type Bookable = TourItem | FlatItem | TransportItem;

function VoyagoExperience() {
  const { language, setLanguage, t } = useI18n();
  const [currency, setCurrency] = useState<Currency>('USD');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeFilter, setActiveFilter] = useState('all');
  const [destination, setDestination] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingCategory, setBookingCategory] = useState<ServiceCategory>('tours');
  const [selectedItem, setSelectedItem] = useState<Bookable | null>(null);

  const visibleTours = useMemo(() => {
    const matchesType = activeFilter === 'all' || TOURS_DATA.some((tour) => tour.category === activeFilter && tour.id === tour.id);
    const filtered = TOURS_DATA.filter((tour) => (activeFilter === 'all' || tour.category === activeFilter) && (!destination || `${tour.title} ${tour.location} ${tour.category}`.toLowerCase().includes(destination.toLowerCase())));
    return filtered.length ? filtered.slice(0, 3) : (matchesType ? [] : TOURS_DATA.slice(0, 3));
  }, [activeFilter, destination]);

  const openBooking = (category: ServiceCategory, item: Bookable | null = null) => {
    setBookingCategory(category);
    setSelectedItem(item);
    setIsBookingOpen(true);
    setMenuOpen(false);
  };

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', label: 'All experiences' },
    { id: 'balloon', label: 'Hot air balloon' },
    { id: 'temples', label: 'Ancient temples' },
    { id: 'nile', label: 'On the Nile' },
  ];

  return (
    <div className={`voyago ${theme === 'dark' ? 'voyago-dark' : ''}`}>
      <div className="announcement"><span className="announcement-dot" /> A little more wonder, in every detail <span className="announcement-sep">·</span> Locally rooted in Luxor, Egypt <ArrowUpRight size={13} /></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="GO VOYAGO home"><span className="brand-mark"><Compass size={23} strokeWidth={1.6} /></span><span className="brand-name">GO <b>VOYAGO</b><small>EGYPT, BEAUTIFULLY DISCOVERED</small></span></a>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <a href="#experiences" onClick={() => setMenuOpen(false)}>Experiences</a><a href="#stays" onClick={() => setMenuOpen(false)}>Places to stay</a><a href="#transport" onClick={() => setMenuOpen(false)}>Private rides</a><a href="#story" onClick={() => setMenuOpen(false)}>Our Egypt</a>
          <button className="mobile-book" onClick={() => openBooking('tours')}>Plan your trip <ArrowUpRight size={15} /></button>
        </nav>
        <div className="header-actions">
          <label className="language-select" aria-label="Choose language"><Globe2 size={15} /><select value={language} onChange={(e) => setLanguage(e.target.value as typeof language)}>{SUPPORTED_LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.nativeName}</option>)}</select><ChevronDown size={12} /></label>
          <label className="currency-select"><select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} aria-label="Choose currency"><option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="EGP">EGP</option></select></label>
          <button className="theme-toggle" aria-label="Toggle color theme" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}</button>
          <button className="header-cta" onClick={() => openBooking('tours')}>Plan your trip <ArrowUpRight size={15} /></button>
          <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-visual" role="img" aria-label="Hot air balloons rising above the ancient landscape of Luxor at sunrise"><div className="hero-photo" /><div className="hero-grain" /><div className="hero-caption"><span>25°41′ N · 32°38′ E</span><span>THE WEST BANK, LUXOR</span></div><div className="hero-stamp"><span>MADE FOR</span><strong>the curious</strong><span>EST. IN LUXOR · EGYPT</span></div></div>
          <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> THE ART OF GOING FURTHER</div><h1 id="hero-title">{t.hero.title.split('.').slice(0, 1).join('.')}<br /><em>Beyond the ordinary.</em></h1><p className="hero-description">{t.hero.subtitle} From first light over the temples to the last golden hour on the Nile, discover Egypt your way.</p><div className="hero-buttons"><a className="button button-dark" href="#experiences">Find your experience <ArrowUpRight size={17} /></a><a className="text-link" href="#story"><span className="play-circle"><ArrowDown size={14} /></span> A different kind of journey</a></div>
            <div className="hero-proof"><div className="avatar-stack"><span>م</span><span>A</span><span>L</span><span>+</span></div><div><div className="proof-stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><b>4.9/5</b></div><small>Made memorable by travelers like you</small></div></div>
            <span className="hero-number">01 <i /> 04</span>
          </div>
        </section>

        <section className="search-wrap" aria-label="Find your Egypt experience"><form className="search-panel" onSubmit={submitSearch}><div className="search-intro"><span className="search-icon"><Search size={19} /></span><div><strong>Where will Egypt take you?</strong><small>Start with a place or a feeling</small></div></div><label className="search-field"><MapPin size={17} /><span><small>DESTINATION</small><input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Luxor, Aswan, Cairo…" /></span></label><label className="search-field"><CalendarDays size={17} /><span><small>WHEN</small><input type="text" onFocus={(e) => { e.currentTarget.type = 'date'; }} placeholder="Choose your dates" /></span></label><label className="search-field guests-field"><Users size={17} /><span><small>TRAVELERS</small><select defaultValue="2 guests"><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4+ guests</option></select></span><ChevronDown size={14} /></label><button className="search-button" type="submit">Explore Egypt <ArrowRight size={17} /></button></form></section>

        <section className="trust-strip"><div><ShieldCheck size={18} /><span>Thoughtfully vetted local partners</span></div><i /><div><Heart size={17} /><span>Personal, human support</span></div><i /><div><Sparkles size={17} /><span>Made around you, never off the shelf</span></div></section>

        <section className="section experiences-section" id="experiences"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> A GOOD PLACE TO BEGIN</div><h2>Moments that stay<br /><em>with you.</em></h2></div><p>Ancient wonders, intimate encounters, and the kind of local know-how you can feel. Find the Egypt that feels like yours.</p></div>
          <div className="filter-row">{categories.map((category) => <button key={category.id} className={`filter-chip ${activeFilter === category.id ? 'active' : ''}`} onClick={() => setActiveFilter(category.id)}>{category.label}{activeFilter === category.id && <span className="filter-dot" />}</button>)}<a className="view-all" href="#experiences" onClick={() => setActiveFilter('all')}>See all experiences <ArrowUpRight size={15} /></a></div>
          <div className="experience-grid">{visibleTours.map((tour, index) => <article className={`experience-card experience-card-${index + 1}`} key={tour.id}><button className="save-button" aria-label={`Save ${tour.title}`} onClick={(e) => e.currentTarget.classList.toggle('saved')}><Heart size={17} /></button><button className="experience-image" onClick={() => openBooking('tours', tour)} aria-label={`Discover ${tour.title}`}><img src={tour.imageUrl} alt={tour.photoAlt || tour.title} loading={index === 0 ? 'eager' : 'lazy'} /><span className="image-overlay" /><span className="image-tag">{tour.badge || tour.category}</span><span className="image-cta">Discover <ArrowUpRight size={16} /></span></button><div className="card-meta"><span><Clock3 size={13} /> {tour.duration}</span><span className="rating"><Star size={13} fill="currentColor" /> {tour.rating}</span></div><h3>{tour.title}</h3><div className="card-bottom"><span>From <strong>{formatPrice(tour.priceUSD, currency)}</strong> <small>/ person</small></span><button aria-label={`Book ${tour.title}`} onClick={() => openBooking('tours', tour)}><ArrowUpRight size={17} /></button></div></article>)}</div>
        </section>

        <section className="story-section" id="story"><div className="story-image"><img src={TOURS_DATA.find((item) => item.category === 'nile')?.imageUrl} alt="A quiet Nile sailing experience at golden hour" loading="lazy" /><div className="story-image-note"><span>THE NILE, AT YOUR OWN PACE</span><strong>Let the river<br />set the rhythm.</strong></div></div><div className="story-copy"><div className="eyebrow"><span className="eyebrow-line" /> LOCAL SOUL. OPEN HORIZONS.</div><h2>Egypt isn't a checklist.<br /><em>It's a feeling.</em></h2><p>We’re a Luxor-born team who believe the best journeys happen when you slow down, look closer, and meet the people who make a place what it is.</p><p>So we bring together the thoughtful details—trusted guides, beautiful stays, seamless rides—with the freedom to discover at your own pace.</p><a className="text-link story-link" href="#stays">Get to know GO VOYAGO <ArrowUpRight size={16} /></a><div className="story-signature"><span className="signature-mark">V.</span><span>Made with care in Luxor<small>FOR THE LOVE OF A GOOD JOURNEY</small></span></div></div></section>

        <section className="section stays-section" id="stays"><div className="section-heading compact-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR PLACE IN EGYPT</div><h2>Stay a little<br /><em>closer to the magic.</em></h2></div><a className="view-all" href="#stays">Explore all stays <ArrowUpRight size={15} /></a></div><div className="stay-grid">{FLATS_DATA.slice(0, 2).map((flat) => <article className="stay-card" key={flat.id}><button className="stay-photo" onClick={() => openBooking('flats', flat)}><img src={flat.imageUrl} alt={flat.photoAlt || flat.name} loading="lazy" /><span className="stay-label"><MapPin size={12} /> {flat.bank.split('(')[0]}</span></button><div className="stay-info"><div><span className="stay-kicker">A GOOD NIGHT'S SLEEP</span><h3>{flat.name}</h3><p>{flat.tagline}</p></div><div className="stay-price"><strong>{formatPrice(flat.pricePerNightUSD, currency)}</strong><small>per night</small></div></div><div className="stay-details"><span>{flat.bedrooms} bedrooms</span><span>{flat.maxGuests} guests</span><span><Star size={12} fill="currentColor" /> {flat.rating}</span><button onClick={() => openBooking('flats', flat)} aria-label={`Ask about ${flat.name}`}><ArrowUpRight size={16} /></button></div></article>)}</div></section>

        <section className="transport-band" id="transport"><div className="transport-art"><img src={TRANSPORT_DATA[0]?.imageUrl} alt="Private chauffeur service in Luxor" loading="lazy" /><span>THE JOURNEY<br />IS PART OF IT.</span></div><div className="transport-copy"><div className="eyebrow"><span className="eyebrow-line" /> EASY DOES IT</div><h2>Get there<br /><em>the lovely way.</em></h2><p>Airport pickups, private drivers, and Nile crossings—reliable, comfortable, and arranged around you. No guesswork. No haggling. Just a warm welcome.</p><div className="transport-points"><span><Check size={14} /> A real person to meet you</span><span><Check size={14} /> Comfortable, private rides</span></div><button className="button button-dark" onClick={() => openBooking('transport')}>Arrange a ride <ArrowUpRight size={16} /></button></div></section>

        <section className="closing-section"><div className="closing-orbit orbit-one" /><div className="closing-orbit orbit-two" /><div className="eyebrow"><span className="eyebrow-line" /> YOUR EGYPT, YOUR WAY</div><h2>Some journeys<br />find <em>their own way.</em></h2><p>Tell us what you’re dreaming of. We’ll take it from there—with thoughtful advice, local insight, and a little bit of magic.</p><button className="button button-light" onClick={() => openBooking('tours')}>Let’s plan something wonderful <ArrowUpRight size={16} /></button><div className="closing-footnote"><span>NO PRESSURE. JUST A CONVERSATION.</span><span>GO VOYAGO · LUXOR, EGYPT</span></div></section>

        <section className="faq-section section"><div className="faq-intro"><div className="eyebrow"><span className="eyebrow-line" /> A FEW GOOD ANSWERS</div><h2>Good to<br /><em>know.</em></h2><p>Travel feels better when you know what to expect. Here's a little help before you go.</p><a className="text-link" href="https://wa.me/201002345678" target="_blank" rel="noreferrer">Ask us anything <ArrowUpRight size={15} /></a></div><div className="faq-list">{FAQS.slice(0, 4).map((faq, index) => <details key={faq.q} open={index === 0}><summary><span className="faq-index">0{index + 1}</span>{faq.q}<ChevronDown size={17} /></summary><p>{faq.a}</p></details>)}</div></section>
      </main>

      <footer className="site-footer"><div className="footer-main"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Compass size={23} strokeWidth={1.6} /></span><span className="brand-name">GO <b>VOYAGO</b><small>EGYPT, BEAUTIFULLY DISCOVERED</small></span></a><p>Go beyond the expected.<br />Come back with a story.</p><a href="https://wa.me/201002345678" target="_blank" rel="noreferrer" className="footer-contact">Say hello on WhatsApp <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} GO VOYAGO. MADE WITH CARE IN LUXOR.</span><div><a href="#experiences">Experiences</a><a href="#stays">Stays</a><a href="#transport">Transport</a><a href="mailto:hello@govoyago.com">Email us</a></div><a href="#home" className="back-top">BACK TO THE SUN <ArrowUpRight size={13} /></a></div></footer>
      <a className="whatsapp-float" href="https://wa.me/201002345678" target="_blank" rel="noreferrer" aria-label="Chat with our travel team on WhatsApp"><span className="whatsapp-pulse" />Chat with a local <ArrowUpRight size={15} /></a>
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} currentCurrency={currency} initialCategory={bookingCategory} initialItem={selectedItem} />
    </div>
  );
}

export default function App() {
  return <I18nProvider><VoyagoExperience /></I18nProvider>;
}
