import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, ArrowUpRight, Award, Check, ChevronDown, ChevronRight,
  Clock, Eye, Filter, Gem, HelpCircle, Mail, MapPin, Menu,
  MessageCircle, Phone, Play, RefreshCw,
  Search, Send, Shield, ShieldCheck, Sparkles, Star, Truck,
  Volume2, VolumeX, X
} from 'lucide-react';
import './styles.css';

// Reliable Asset URL Resolver (works on GitHub Pages, Vercel, Netlify & Localhost)
export const asset = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
  const clean = path.replace(/^\.?\/?assets\//, '');
  return `./assets/${clean}`;
};

// Universal Router supporting Hash navigation (#/shop) and Path navigation
const getRoute = () => {
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const cleanHash = hash.replace(/^#/, '');
    return cleanHash.startsWith('/') ? cleanHash : '/' + cleanHash;
  }
  let path = window.location.pathname + window.location.search;
  if (path.includes('/raisa-jewels')) {
    path = path.replace('/raisa-jewels', '') || '/';
  }
  return path || '/';
};

const go = (path) => {
  const target = path.startsWith('/') ? path : '/' + path;
  window.location.hash = target;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 100% PURE JEWELLERY CATALOGUE - RAISA JEWELS - ACCURATE VISUAL-TO-TITLE MAPPING
const products = [
  {
    slug: 'heirloom-polki-set',
    name: 'The Royal Polki Choker',
    category: 'Bridal',
    image: asset('pinterest-ref-01.jpg'),
    second: asset('bridal-portrait.jpg'),
    video: asset('model-jewelry-07.mp4'),
    tag: 'Haute Bridal Suite',
    metal: '22K Handcrafted Solid Gold',
    purity: '22K BIS 916 Hallmarked',
    occasion: 'Royal Wedding & Reception',
    weight: '48.5 g',
    sku: 'RJ-BR-101',
    rating: 5.0,
    reviews: 28,
    availability: 'Bespoke Atelier Order',
    description: 'An ode to generational Indian royalty. Hand-set syndicate uncut polki diamonds embraced by 22K solid gold granulation, ruby accents, and fine Basra pearls.'
  },
  {
    slug: 'celestial-diamond-solitaire',
    name: 'Diamond Solitaire Ring',
    category: 'Rings',
    image: asset('pinterest-diamond-ring.jpg'),
    second: asset('astra-signet-ring.jpg'),
    video: asset('jewelry-detail-04.mp4'),
    tag: 'Certified Diamond',
    metal: '18K White & Rose Gold',
    purity: '18K with IGI / GIA Cert',
    occasion: 'Engagement & Forever',
    weight: '4.2 g',
    sku: 'RJ-RG-118',
    rating: 5.0,
    reviews: 34,
    availability: 'Bespoke Stone Selection',
    description: 'A luminous round brilliant-cut certified diamond haloed in 18K rose gold with micro-pavé shoulder diamonds along a split architectural shank.'
  },
  {
    slug: 'emerald-heritage-collar',
    name: 'Emerald Choker Set',
    category: 'Bridal',
    image: asset('emerald-choker-model.jpg'),
    second: asset('pinterest-ref-02.jpg'),
    video: asset('model-jewelry-06.mp4'),
    tag: 'Masterpiece Edit',
    metal: '22K Yellow Gold & Syndicate Polki',
    purity: '22K BIS Hallmarked',
    occasion: 'Bridal & Grand Festivities',
    weight: '34.8 g',
    sku: 'RJ-NK-204',
    rating: 4.9,
    reviews: 21,
    availability: 'Atelier Creation',
    description: 'Luminous natural Zambian emeralds accented by fine 22K gold granulation, syndicate polki motifs, and matching teardrop drops. A royal trousseau masterpiece.'
  },
  {
    slug: 'maharani-bridal-suite',
    name: 'Maharani Bridal Suite',
    category: 'Bridal',
    image: asset('pinterest-ref-03.jpg'),
    second: asset('bridal-model.jpg'),
    video: asset('model-jewelry-07.mp4'),
    tag: 'Bridal Trousseau',
    metal: '22K Solid Gold with Meenakari',
    purity: '22K BIS 916 Hallmarked',
    occasion: 'Grand Wedding Day',
    weight: '82.0 g',
    sku: 'RJ-BR-501',
    rating: 5.0,
    reviews: 19,
    availability: 'Custom Trousseau Consultation',
    description: 'Complete royal bridal suite including multi-tier choker, jhumkas, and maang tikka. Individually hand-forged for the bride who demands absolute grandeur.'
  },
  {
    slug: 'sculpted-drop-earrings',
    name: 'Sapphire Teardrop Earrings',
    category: 'Earrings',
    image: asset('sculpted-drop-earrings.jpg'),
    second: asset('pinterest-earrings-luxury.jpg'),
    video: asset('jewelry-detail-02.mp4'),
    tag: 'Bestseller',
    metal: '18K White Gold Finish',
    purity: '18K Purity Certified',
    occasion: 'Cocktail & Evening Gala',
    weight: '6.4 g',
    sku: 'RJ-ER-014',
    rating: 4.8,
    reviews: 57,
    availability: 'Ready for Dispatch',
    description: 'Deep cerulean blue teardrop sapphires encircled by brilliant baguette and round-cut crystals in sculpted 18K white gold. Effortless gala glamour.'
  },
  {
    slug: 'sol-fluid-chain',
    name: 'Celestial Crescent Gold Chain',
    category: 'Necklaces',
    image: asset('sol-chain.jpg'),
    second: asset('orbit-pearl-hoops.jpg'),
    video: asset('jewelry-detail-01.mp4'),
    tag: 'Signature Classic',
    metal: '18K Solid Yellow Gold',
    purity: '18K BIS Hallmarked',
    occasion: 'Daily Elegance & Layering',
    weight: '8.4 g',
    sku: 'RJ-NK-001',
    rating: 4.9,
    reviews: 42,
    availability: 'Available in Studio',
    description: 'A light-catching tiered Italian chain highlighted by an octagonal cut teal gemstone and a micro-pavé crescent moon talisman in 18K solid yellow gold.'
  },
  {
    slug: 'brilliant-tennis-bracelet',
    name: 'Diamond Tennis Bracelet',
    category: 'Bracelets',
    image: asset('fine-ring-detail.jpg'),
    second: asset('pearl-hand.jpg'),
    video: asset('jewelry-detail-05.mp4'),
    tag: 'Certified Diamond',
    metal: '18K Solid White Gold',
    purity: '18K with IGI / GIA Cert',
    occasion: 'Red Carpet & Gala Stacks',
    weight: '14.2 g',
    sku: 'RJ-BR-109',
    rating: 5.0,
    reviews: 31,
    availability: 'Bespoke Sizing',
    description: 'Continuously set round brilliant-cut certified diamonds cradled in fluid four-prong 18K white gold links with double safety closure.'
  },
  {
    slug: 'luna-cuff',
    name: 'Chunky Gold Link Bracelet',
    category: 'Bracelets',
    image: asset('pearl-hand.jpg'),
    second: asset('fine-ring-detail.jpg'),
    video: asset('jewelry-detail-03.mp4'),
    tag: 'Atelier Edition',
    metal: '18K Solid Yellow Gold Vermeil',
    purity: '18K Purity Certified',
    occasion: 'Daily & Festive Stacks',
    weight: '16.5 g',
    sku: 'RJ-BR-005',
    rating: 4.8,
    reviews: 29,
    availability: 'Available in Studio',
    description: 'Bold, polished oval links hand-assembled for everyday modern glamour. Ergonomically weighted to rest flat and fluidly against the wrist.'
  },
  {
    slug: 'sculpted-gold-hoops',
    name: 'Sculpted Gold Huggie Hoops',
    category: 'Earrings',
    image: asset('dune-layered-chain.jpg'),
    second: asset('editorial-gold.jpg'),
    video: asset('jewelry-detail-02.mp4'),
    tag: 'Bestseller',
    metal: '18K Solid Yellow Gold',
    purity: '18K BIS Hallmarked',
    occasion: 'Daily & Day-to-Night',
    weight: '5.8 g',
    sku: 'RJ-ER-021',
    rating: 4.9,
    reviews: 46,
    availability: 'Ready for Dispatch',
    description: 'Organic twisted molten contours in 18K solid yellow gold. Feather-light for all-day comfort with a secure click-closure.'
  },
  {
    slug: 'orbit-medallion-chain',
    name: 'Tiered Medallion Gold Chain',
    category: 'Necklaces',
    image: asset('orbit-pearl-hoops.jpg'),
    second: asset('sol-chain.jpg'),
    video: asset('jewelry-detail-01.mp4'),
    tag: 'Trending Silhouette',
    metal: '18K Solid Gold Finish',
    purity: '18K Purity Certified',
    occasion: 'Contemporary Layering',
    weight: '11.4 g',
    sku: 'RJ-NK-012',
    rating: 4.9,
    reviews: 24,
    availability: 'Available in Studio',
    description: 'Three harmonized link profiles—paperclip link, satellite chain, and hammered artisanal coin medallion—anchored for the coveted layered look.'
  }
];

const categories = [
  { label: 'All Creations', id: '', image: asset('bridal-model.jpg'), desc: 'Complete Studio Repertoire' },
  { label: 'Haute Bridal Suite', id: 'Bridal', image: asset('pinterest-ref-01.jpg'), desc: 'Royal Polki & Chokers' },
  { label: 'Fine Necklaces', id: 'Necklaces', image: asset('orbit-pearl-hoops.jpg'), desc: 'Chains & Medallions' },
  { label: 'Sculptural Earrings', id: 'Earrings', image: asset('dune-layered-chain.jpg'), desc: 'Hoops, Drops & Huggies' },
  { label: 'Solitaire Rings', id: 'Rings', image: asset('pinterest-diamond-ring.jpg'), desc: 'Certified Diamonds & Bands' },
  { label: 'Artisan Bracelets', id: 'Bracelets', image: asset('pearl-hand.jpg'), desc: 'Link Bracelets & Tennis Stacks' }
];

const faceShapeAdvice = {
  round: {
    label: 'Round face',
    reason: 'Aapke face ki soft curves ko balance karne ke liye angular, elongated designs sabse flattering rahenge.',
    picks: ['sculpted-gold-hoops', 'sol-fluid-chain']
  },
  oval: {
    label: 'Oval face',
    reason: 'Oval face naturally balanced hota hai, isliye aap almost every silhouette carry kar sakte hain—statement pieces bhi bahut elegant lagenge.',
    picks: ['heirloom-polki-set', 'sculpted-drop-earrings']
  },
  square: {
    label: 'Square face',
    reason: 'Aapke defined jawline ko soften karne ke liye rounded hoops, drops aur curved necklaces bahut accha contrast banayenge.',
    picks: ['sculpted-drop-earrings', 'orbit-medallion-chain']
  },
  heart: {
    label: 'Heart-shaped face',
    reason: 'Chin area ko visually balance karne ke liye teardrop earrings aur softly rounded chokers beautiful rahenge.',
    picks: ['sculpted-drop-earrings', 'emerald-heritage-collar']
  },
  oblong: {
    label: 'Oblong face',
    reason: 'Width aur softness add karne ke liye medium hoops, layered necklaces aur wider statement pieces ideal hain.',
    picks: ['sculpted-gold-hoops', 'maharani-bridal-suite']
  }
};

const visualArchive = [
  '22KT Designer Antique Gold Necklace Set – Wedding Jewellery for Brides.jpeg',
  'astra-signet-ring.jpg', 'bridal-model.jpg', 'bridal-portrait.jpg', 'bridal-profile.jpg',
  'dune-layered-chain.jpg', 'editorial-gold.jpg', 'emerald-choker-model.jpg', 'fine-ring-detail.jpg',
  'Frida Kahlo, Gustav Klimt And Other Artists Inspire This Jewellery Editorial By Ryan Houssari.jpeg',
  'gemstone-necklace.jpg', 'jewelry-craftisan.jpg', 'journal-makers.jpg', 'journal-stack.jpg',
  'luna-cuff.jpg', 'orbit-pearl-hoops.jpg', 'pearl-hand.jpg', 'pinterest-artisan-bench.jpg',
  'pinterest-diamond-ring.jpg', 'pinterest-earrings-luxury.jpg', 'pinterest-emerald-necklace.jpg',
  'pinterest-polki-choker.jpg', 'pinterest-ref-01.jpg', 'pinterest-ref-02.jpg', 'pinterest-ref-03.jpg',
  'pinterest-royal-bride.jpg', 'sajdhajke2025.jpeg', 'sculpted-drop-earrings.jpg', 'sol-chain.jpg',
  'The season of sparkle is here 💫 Lights, laughter, and a little golden magic in the air 🪔.jpeg',
  'jewelry-hero.mp4', 'aurelia-hero.mp4', 'kling_20261031_VIDEO_A_sophisti_5766_0.mp4',
  'jewelry-detail-01.mp4', 'jewelry-detail-02.mp4', 'jewelry-detail-03.mp4', 'jewelry-detail-04.mp4',
  'jewelry-detail-05.mp4', 'model-jewelry-04.mp4', 'model-jewelry-05.mp4', 'model-jewelry-06.mp4',
  'model-jewelry-07.mp4', 'model-jewelry-08.mp4', 'model-jewelry-09.mp4'
];

function useRoute() {
  const [route, setRoute] = useState(getRoute());
  useEffect(() => {
    const handleUpdate = () => setRoute(getRoute());
    window.addEventListener('hashchange', handleUpdate);
    window.addEventListener('popstate', handleUpdate);
    return () => {
      window.removeEventListener('hashchange', handleUpdate);
      window.removeEventListener('popstate', handleUpdate);
    };
  }, []);
  return route;
}

// Brand Logo
function Logo({ light = false }) {
  return (
    <button className={`brand-logo ${light ? 'is-light' : ''}`} onClick={() => go('/')} aria-label="Raisa Jewels">
      <span className="logo-gem">
        <Sparkles size={16} />
      </span>
      <div className="logo-text">
        <span className="brand-name">RAISA JEWELS</span>
        <span className="brand-sub">HAUTE JOAILLERIE • NEW DELHI</span>
      </div>
    </button>
  );
}

// LUXURY NAVBAR WITH HOVER & CLICK CATEGORIES DROPDOWN - NO CART - NO LIKE
function LuxuryNavbar({ onOpenAI, onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener to safely close collections dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.metal.toLowerCase().includes(q)).slice(0, 4);
  }, [searchQuery]);

  const handleNavClick = (path) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    go(path);
  };

  return (
    <>
      {/* Top Luxury Announcement Ticker */}
      <div className="luxury-ticker">
        <div className="ticker-inner">
          <span>✦ 100% BIS Hallmarked Solid Gold (916 & 750)</span>
          <span className="sep">•</span>
          <span>✦ Certified IGI / GIA Conflict-Free Diamonds</span>
          <span className="sep">•</span>
          <span>✦ Direct WhatsApp Price Quotations: +91 88378 58438</span>
          <span className="sep">•</span>
          <span>✦ Private VIP Salon Appointments in Mehrauli, New Delhi</span>
          <span className="sep">•</span>
          <span>✦ White-Glove Insured Delivery Across India</span>
        </div>
      </div>

      {/* Dynamic Glassmorphic Navbar */}
      <header className={`creativ-navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Mobile Menu Trigger */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Left Brand Identity */}
          <Logo />

          {/* Center Navigation Links - Simple Headings + Hover & Click Dropdown */}
          <nav className="desktop-nav-links" aria-label="Main Navigation">
            {/* Collections with Category Dropdown on Hover & Click */}
            <div
              className="nav-dropdown-wrapper"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                className={`nav-item-link nav-dropdown-trigger ${dropdownOpen ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDropdownOpen((prev) => !prev);
                }}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span>Collections</span>
                <ChevronDown size={13} className={`chevron-arrow ${dropdownOpen ? 'rotated' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="luxury-menu-dropdown animate-fade-in-up">
                  <div className="dropdown-items-stack">
                    <button type="button" className="dropdown-row-item" onClick={() => handleNavClick('/shop')}>
                      <span className="row-num">01</span>
                      <span className="row-label">All Collections</span>
                      <ArrowUpRight size={14} className="row-arrow" />
                    </button>
                    <button type="button" className="dropdown-row-item" onClick={() => handleNavClick('/shop?category=Bridal')}>
                      <span className="row-num">02</span>
                      <span className="row-label">Haute Bridal Suite</span>
                      <ArrowUpRight size={14} className="row-arrow" />
                    </button>
                    <button type="button" className="dropdown-row-item" onClick={() => handleNavClick('/shop?category=Necklaces')}>
                      <span className="row-num">03</span>
                      <span className="row-label">Fine Gold Necklaces</span>
                      <ArrowUpRight size={14} className="row-arrow" />
                    </button>
                    <button type="button" className="dropdown-row-item" onClick={() => handleNavClick('/shop?category=Earrings')}>
                      <span className="row-num">04</span>
                      <span className="row-label">Sculptural Earrings</span>
                      <ArrowUpRight size={14} className="row-arrow" />
                    </button>
                    <button type="button" className="dropdown-row-item" onClick={() => handleNavClick('/shop?category=Rings')}>
                      <span className="row-num">05</span>
                      <span className="row-label">Certified Solitaire Rings</span>
                      <ArrowUpRight size={14} className="row-arrow" />
                    </button>
                    <button type="button" className="dropdown-row-item" onClick={() => handleNavClick('/shop?category=Bracelets')}>
                      <span className="row-num">06</span>
                      <span className="row-label">Artisan Bracelets</span>
                      <ArrowUpRight size={14} className="row-arrow" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="nav-item-link" onClick={() => handleNavClick('/shop?category=Bridal')}>
              Bridal
            </button>
            <button className="nav-item-link ai-highlight-link" onClick={onOpenAI}>
              <Sparkles size={14} className="sparkle-icon" /> AI Stylist
            </button>
            <button className="nav-item-link" onClick={() => handleNavClick('/about')}>
              About
            </button>
            <button className="nav-item-link" onClick={() => handleNavClick('/contact')}>
              Contact
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="nav-action-hub">
            {/* Search Trigger */}
            <button
              className="action-icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search Jewellery"
            >
              <Search size={18} />
            </button>

            {/* Direct WhatsApp Concierge Button */}
            <a
              href="https://wa.me/918837858438?text=Hello%20Raisa%20Jewels%2C%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection%20and%20request%20prices."
              target="_blank"
              rel="noreferrer"
              className="nav-whatsapp-pill"
              title="Direct WhatsApp Quotation Desk: +91 88378 58438"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Desk</span>
            </a>

            {/* Book Viewing Gold CTA */}
            <button className="nav-cta-btn" onClick={onOpenBooking}>
              <span>Book Salon Visit</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Search Modal Drawer */}
        {searchOpen && (
          <div className="search-slide-panel">
            <div className="search-box-row">
              <Search size={20} className="search-lead-icon" />
              <input
                type="text"
                autoFocus
                placeholder="Search by necklace, diamond solitaire, bridal polki, earrings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-close-btn" onClick={() => setSearchOpen(false)}>
                <X size={18} />
              </button>
            </div>
            {searchQuery && (
              <div className="search-results-list">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <div
                      key={item.slug}
                      className="search-result-card"
                      onClick={() => {
                        setSearchOpen(false);
                        go(`/product/${item.slug}`);
                      }}
                    >
                      <img src={item.image} alt={item.name} />
                      <div className="result-info">
                        <h4>{item.name}</h4>
                        <p>{item.category} • {item.metal}</p>
                        <span className="price-tag-quote">Price on Request</span>
                      </div>
                      <ArrowUpRight size={16} />
                    </div>
                  ))
                ) : (
                  <div className="no-search-results">
                    <p>No matching jewellery pieces found. Explore our complete repertoire.</p>
                    <button className="pill-btn" onClick={() => { setSearchOpen(false); go('/shop'); }}>View Full Catalog</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-active' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="drawer-top-row">
            <Logo />
            <button className="drawer-close" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="mobile-links-group">
            <span className="drawer-category-label">Collections & High Jewelry</span>
            <button className="m-link" onClick={() => handleNavClick('/shop')}>
              <span><span style={{ color: '#b38838', fontWeight: 700, marginRight: 8 }}>01</span> All Collections</span>
              <ChevronRight size={16} />
            </button>
            <button className="m-link" onClick={() => handleNavClick('/shop?category=Bridal')}>
              <span><span style={{ color: '#b38838', fontWeight: 700, marginRight: 8 }}>02</span> Haute Bridal Suite</span>
              <ChevronRight size={16} />
            </button>
            <button className="m-link" onClick={() => handleNavClick('/shop?category=Necklaces')}>
              <span><span style={{ color: '#b38838', fontWeight: 700, marginRight: 8 }}>03</span> Fine Gold Necklaces</span>
              <ChevronRight size={16} />
            </button>
            <button className="m-link" onClick={() => handleNavClick('/shop?category=Earrings')}>
              <span><span style={{ color: '#b38838', fontWeight: 700, marginRight: 8 }}>04</span> Sculptural Earrings</span>
              <ChevronRight size={16} />
            </button>
            <button className="m-link" onClick={() => handleNavClick('/shop?category=Rings')}>
              <span><span style={{ color: '#b38838', fontWeight: 700, marginRight: 8 }}>05</span> Solitaire Rings</span>
              <ChevronRight size={16} />
            </button>
            <button className="m-link" onClick={() => handleNavClick('/shop?category=Bracelets')}>
              <span><span style={{ color: '#b38838', fontWeight: 700, marginRight: 8 }}>06</span> Artisan Bracelets</span>
              <ChevronRight size={16} />
            </button>

            <span className="drawer-category-label" style={{ marginTop: 16 }}>Maison Services</span>
            <button className="m-link m-link-ai" onClick={() => { setMobileMenuOpen(false); onOpenAI(); }}>
              <span><Sparkles size={16} /> Google AI Sales Stylist</span>
              <span className="studio-tag">Studio AI</span>
            </button>
            <button className="m-link" onClick={() => handleNavClick('/about')}>
              <span>About Atelier</span>
              <ChevronRight size={16} />
            </button>
            <button className="m-link" onClick={() => handleNavClick('/contact')}>
              <span>Salon Appointment</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="drawer-quick-actions">
            <a
              href="https://wa.me/918837858438?text=Hello%20Raisa%20Jewels%2C%20I%20would%20like%20to%20inquire%20about%20your%20jewellery%20collection."
              target="_blank"
              rel="noreferrer"
              className="drawer-whatsapp-btn"
            >
              <MessageCircle size={17} /> WhatsApp (+91 88378 58438)
            </a>
            <button className="drawer-primary-btn" onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}>
              <Sparkles size={16} /> Book Private Salon Viewing
            </button>
          </div>

          <div className="drawer-footer-meta">
            <p>12, Mehrauli Heritage Corridor, New Delhi</p>
            <p>WhatsApp Desk: +91 88378 58438 | hello@raisajewels.in</p>
          </div>
        </div>
      </div>
    </>
  );
}

// LUXURY PRODUCT CARD - NO PRICE - NO ADD TO CART - NO LIKE/HEART (Strictly Inquire / WhatsApp)
function LuxuryProductCard({ product, onQuickView }) {
  const whatsAppUrl = `https://wa.me/918837858438?text=${encodeURIComponent(
    `Hello Raisa Atelier,\nI would like to inquire about the price and availability of "${product.name}" (${product.sku}).\nMetal: ${product.metal} (${product.purity})\nPlease send me the official price quotation and HD video.`
  )}`;

  return (
    <article className="lux-card hover-lift">
      <div className="lux-media">
        <span className="card-tag">{product.tag}</span>

        <div className="image-wrapper" onClick={() => go(`/product/${product.slug}`)}>
          <img className="primary-img" src={product.image} alt={product.name} loading="lazy" />
          <img className="hover-img" src={product.second} alt={product.name} loading="lazy" />
        </div>

        <button className="quick-inspect-btn" onClick={() => onQuickView(product)}>
          <Eye size={14} /> Quick View
        </button>
      </div>

      <div className="lux-details">
        <div className="meta-head">
          <span className="category-meta">{product.category} • {product.metal}</span>
          <span className="status-badge">{product.availability}</span>
        </div>

        <h3 className="card-title">
          <button onClick={() => go(`/product/${product.slug}`)}>{product.name}</button>
        </h3>

        <div className="card-pricing-bar">
          <div className="price-label-box">
            <span className="quote-status">Exclusive Collection</span>
            <span className="quote-text">Price on Request</span>
          </div>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="card-inquire-whatsapp-btn"
            title="Inquire directly on WhatsApp"
          >
            <MessageCircle size={14} />
            <span>Inquire</span>
          </a>
        </div>
      </div>
    </article>
  );
}

// QUICK VIEW MODAL - NO ADD TO CART - NO HEART (Direct WhatsApp Quotation)
function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  const whatsAppUrl = `https://wa.me/918837858438?text=${encodeURIComponent(
    `Hello Raisa Atelier,\nI am inquiring about the price and video viewing for "${product.name}" (${product.sku}).\nMetal: ${product.metal} (${product.purity})\nGross Weight: ${product.weight}\nPlease share the current price quotation.`
  )}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window quick-view-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-corner" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="quick-view-grid">
          <div className="modal-media-pane">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-info-pane">
            <span className="eyebrow-accent">{product.tag} • {product.sku}</span>
            <h2>{product.name}</h2>
            <div className="star-reviews">
              <Star size={14} fill="#c5a059" color="#c5a059" />
              <span>{product.rating}</span>
              <small>({product.reviews} Studio Evaluations)</small>
            </div>

            <div className="quote-highlight-box">
              <span className="quote-badge">Boutique Pricing</span>
              <p className="quote-main">Price Upon Private Request</p>
              <small>Each piece is made with hallmarked precious metals and certified stones. Inquire for customized quotation.</small>
            </div>

            <p className="modal-desc">{product.description}</p>

            <div className="spec-table">
              <div><span>Precious Metal</span><strong>{product.metal}</strong></div>
              <div><span>Gold Purity</span><strong>{product.purity}</strong></div>
              <div><span>Gross Weight</span><strong>{product.weight}</strong></div>
              <div><span>Occasion</span><strong>{product.occasion}</strong></div>
            </div>

            <div className="modal-action-row">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-direct-btn full-width"
              >
                <MessageCircle size={17} /> Inquire Price on WhatsApp
              </a>

              <button
                className="view-full-page-btn"
                onClick={() => {
                  onClose();
                  go(`/product/${product.slug}`);
                }}
              >
                View Full Piece Details & Cinematic Video <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// MEESHO-STYLE SALES AI CHATBOT (Direct In-Chat Lead & WhatsApp Quotation)
function SalesAIChatbot({ isOpen, onToggle }) {
  const [showTeaser, setShowTeaser] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryProduct, setInquiryProduct] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: 'Namaste! Main Raisa ka personal AI Sales & Styling Advisor hoon—20 saal ke jewellery-sales experience jaisi honest guidance ke saath.\n\nAap bridal polki, everyday gold, diamond ring, ya apne face shape ke hisaab se styling advice pooch sakte hain. Main aapki need samajhkar pyaar se best options bataunga.',
      chips: [
        { label: '👑 Royal Bridal Suite', query: 'bridal' },
        { label: '✨ Everyday 18K Gold', query: 'everyday' },
        { label: '💍 Diamond Solitaires', query: 'diamond' },
        { label: '📋 Request a Price Quote', query: 'quote' },
        { label: '💬 Direct WhatsApp Desk', query: 'whatsapp' }
      ]
    }
  ]);

  const quickPills = [
    { label: '👑 Bridal Suites', query: 'bridal' },
    { label: '✨ Daily Gold', query: 'everyday' },
    { label: '💍 Diamond Rings', query: 'diamond' },
    { label: '📋 Price Quotation', query: 'quote' },
    { label: '💬 WhatsApp', query: 'whatsapp' }
  ];

  const handleFaceShapeSelect = (shapeKey) => {
    const advice = faceShapeAdvice[shapeKey];
    if (!advice) return;
    const selected = advice.picks.map((slug) => products.find((item) => item.slug === slug)).filter(Boolean);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text: advice.label },
      {
        id: Date.now() + 1,
        role: 'bot',
        text: `Bahut accha—${advice.label} ke liye meri senior-stylist recommendation:\n\n${advice.reason}\n\nNeeche do pieces dekhiye. Pehle try ke liye main **${selected[0]?.name || 'our signature piece'}** suggest karunga.`,
        products: selected,
        chips: [
          { label: 'Selfie guidance', query: 'face shape' },
          { label: 'Price Quote', query: 'quote' }
        ]
      }
    ]);
  };

  const handleSend = (textToSend) => {
    const query = textToSend || prompt;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let botResponse = {};

      if (lower.includes('face') || lower.includes('shape') || lower.includes('chehra') || lower.includes('chashma')) {
        botResponse = {
          id: Date.now() + 1,
          role: 'bot',
          text: 'Bilkul—face shape ke hisaab se jewellery choose karna smart styling ka sabse easy shortcut hai. Clear front-facing selfie upload karke ya neeche closest shape choose karke shuru karein. Aapki privacy ke liye selfie yahin browser mein rahegi; upload server par nahi jayegi.',
          faceShapeOptions: true,
          chips: [
            { label: 'Bridal Styling', query: 'bridal' },
            { label: 'Ring Advice', query: 'diamond' }
          ]
        };
      } else if (lower.includes('whatsapp') || lower.includes('chat') || lower.includes('talk')) {
        botResponse = {
          id: Date.now() + 1,
          role: 'bot',
          text: 'Our senior gemologist and personal styling desk is live on WhatsApp (+91 88378 58438). You can chat directly to request video viewings, hallmarking certificates, or bespoke pricing:',
          whatsappAction: {
            label: 'Open Raisa WhatsApp Desk',
            url: 'https://wa.me/918837858438?text=Hello%20Raisa%20Jewels%2C%20I%20am%20chatting%20with%20your%20Sales%20AI%20Assistant%20and%20would%20like%20to%20request%20an%20official%20quotation.'
          }
        };
      } else if (lower.includes('bridal') || lower.includes('wedding') || lower.includes('polki') || lower.includes('lehenga') || lower.includes('choker')) {
        const bridalPieces = products.filter((p) => p.category === 'Bridal' || p.tag.includes('Bridal'));
        botResponse = {
          id: Date.now() + 1,
          role: 'bot',
          text: 'Here are our celebrated Haute Bridal creations, hand-forged in 22K hallmarked gold with uncut syndicate polki and natural Basra pearls.\n\nTap **"⚡ Inquire Price & Video"** on any piece to receive today\'s quotation immediately:',
          products: bridalPieces,
          chips: [
            { label: '📋 Request Quote for Polki Choker', query: 'quote polki' },
            { label: '💬 WhatsApp Bridal Stylist', query: 'whatsapp' }
          ]
        };
      } else if (lower.includes('ring') || lower.includes('diamond') || lower.includes('solitaire')) {
        const ringPieces = products.filter((p) => p.category === 'Rings');
        botResponse = {
          id: Date.now() + 1,
          role: 'bot',
          text: 'Here are our certified diamond solitaires and architectural signet rings, set in pure 18K gold with IGI/GIA certification.\n\nTap **"⚡ Inquire Price & Video"** to receive the diamond carat weight and price quote:',
          products: ringPieces,
          chips: [
            { label: '📋 Request Diamond Ring Quote', query: 'quote solitaire' },
            { label: '✨ View Everyday Gold', query: 'everyday' }
          ]
        };
      } else if (lower.includes('everyday') || lower.includes('daily') || lower.includes('chain') || lower.includes('earring')) {
        const dailyPieces = products.filter((p) => p.occasion.includes('Daily') || p.category === 'Necklaces' || p.category === 'Earrings').slice(0, 3);
        botResponse = {
          id: Date.now() + 1,
          role: 'bot',
          text: 'Our signature everyday gold essentials: fluid Italian chains, baroque pearl hoops, and sculpted drops engineered for effortless daily luxury:',
          products: dailyPieces,
          chips: [
            { label: '📋 Request Gold Chain Quote', query: 'quote chain' },
            { label: '💬 Chat on WhatsApp', query: 'whatsapp' }
          ]
        };
      } else if (lower.includes('quote') || lower.includes('price') || lower.includes('enquiry') || lower.includes('rate') || lower.includes('cost')) {
        botResponse = {
          id: Date.now() + 1,
          role: 'bot',
          text: 'Because gold and diamond rates fluctuate daily, our pieces are quoted in real-time according to today\'s bullion rate and BIS hallmark grade.\n\nSelect a piece below or enter your WhatsApp number to receive today\'s exclusive quotation catalog:',
          products: products.slice(0, 3),
          showLeadForm: true
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          role: 'bot',
          text: `Based on your request "${query}", our atelier stylists recommend these signature pieces. Tap **"⚡ Inquire Price & Video"** to receive instant details on WhatsApp:`,
          products: products.slice(0, 2),
          chips: [
            { label: '👑 Bridal Suite', query: 'bridal' },
            { label: '✨ Everyday Gold', query: 'everyday' },
            { label: '📋 Request Price Quote', query: 'quote' }
          ]
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
    }, 850);
  };

  const handleStartInquiry = (product) => {
    setInquiryProduct(product);
    const inqMsg = {
      id: Date.now(),
      role: 'bot',
      text: `Excellent choice! You selected **${product.name}** (${product.metal} • ${product.weight}).\n\nPlease enter your WhatsApp / Phone number below so our senior gemologist can send you the official price quote, hallmark certificate, and HD video:`,
      selectedProduct: product,
      showLeadForm: true
    };
    setMessages((prev) => [...prev, inqMsg]);
  };

  const handleLeadSubmit = (e, targetProduct) => {
    e.preventDefault();
    if (!inquiryPhone.trim()) return;

    const prod = targetProduct || inquiryProduct || products[0];
    const userConfirm = {
      id: Date.now(),
      role: 'user',
      text: `My WhatsApp Number is: ${inquiryPhone} (Inquiring about ${prod.name})`
    };

    const whatsAppUrl = `https://wa.me/918837858438?text=${encodeURIComponent(
      `Hello Raisa Atelier,\nI am inquiring via your AI Sales Assistant about ${prod.name} (${prod.sku}).\nMy Phone Number: ${inquiryPhone}\nPlease send me the official price quotation and HD video.`
    )}`;

    const botSuccess = {
      id: Date.now() + 1,
      role: 'bot',
      text: `✅ **Inquiry Logged Successfully!**\n\nThank you! Our senior styling desk has received your request for **${prod.name}** for number **${inquiryPhone}**.\n\nYou can also click below to open WhatsApp directly with your quotation request prefilled:`,
      whatsappAction: {
        label: `Open ${prod.name} Quote in WhatsApp`,
        url: whatsAppUrl
      }
    };

    setMessages((prev) => [...prev, userConfirm, botSuccess]);
    setInquiryPhone('');
    setInquiryProduct(null);
  };

  return (
    <>
      {/* Floating Sales AI Launcher Button (Bottom-Right, Meesho-Style) */}
      <div className="floating-sales-launcher-container">
        {showTeaser && !isOpen && (
          <div className="sales-teaser-bubble animate-bounce-subtle">
            <button className="teaser-close" onClick={() => setShowTeaser(false)} aria-label="Dismiss">
              <X size={12} />
            </button>
            <div className="teaser-content" onClick={onToggle}>
              <span className="teaser-sparkle"><Sparkles size={13} /></span>
              <p>Looking for price quotes or bridal advice? <strong>Chat with Sales AI ✦</strong></p>
            </div>
          </div>
        )}

        <button
          className={`floating-sales-btn ${isOpen ? 'active' : ''}`}
          onClick={() => {
            setShowTeaser(false);
            onToggle();
          }}
          aria-label="Open Sales AI Chatbot"
        >
          <div className="sales-avatar-wrap">
            <Sparkles size={20} className="sales-gem-icon rotate-slow" />
            <span className="online-indicator-dot" />
          </div>
          <span className="sales-btn-label">AI Sales Advisor</span>
        </button>
      </div>

      {/* Meesho-Style Sales Chatbot Floating Window */}
      {isOpen && (
        <div className="sales-chatbot-window animate-slide-up-modal">
          {/* Header */}
          <div className="sales-chat-header">
            <div className="header-agent-info">
              <div className="agent-avatar">
                <Sparkles size={16} />
                <span className="live-status-dot" />
              </div>
              <div className="agent-text">
                <h3>Raisa Sales Advisor</h3>
                <p>Google AI Studio • Instant Price Enquiry</p>
              </div>
            </div>

            <div className="header-controls">
              <a
                href="https://wa.me/918837858438?text=Hello%20Raisa%2C%20I%20am%20chatting%20with%20your%20Sales%20AI%20Assistant%20and%20would%20like%20to%20request%20an%20official%20quotation."
                target="_blank"
                rel="noreferrer"
                className="header-whatsapp-pill"
                title="Direct WhatsApp"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>
              <button className="chat-window-close" onClick={onToggle} aria-label="Close Chat">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="sales-chat-stream">
            {messages.map((m) => (
              <div key={m.id} className={`sales-msg-row ${m.role}`}>
                {m.role === 'bot' && (
                  <div className="bot-mini-avatar"><Sparkles size={14} /></div>
                )}
                <div className="sales-msg-bubble">
                  <div
                    className="msg-text-content"
                    dangerouslySetInnerHTML={{
                      __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />')
                    }}
                  />

                  {/* Inline Product Recommendations (Meesho-Style) */}
                  {m.products && m.products.length > 0 && (
                    <div className="in-chat-products-carousel">
                      {m.products.map((item) => (
                        <div key={item.slug} className="in-chat-product-card">
                          <img src={item.image} alt={item.name} />
                          <div className="in-chat-card-info">
                            <span className="in-chat-cat">{item.category} • {item.metal}</span>
                            <h5>{item.name}</h5>
                            <div className="in-chat-price-tag">
                              <span>Price on Request</span>
                            </div>
                            <div className="in-chat-action-buttons">
                              <button
                                className="chat-inquire-btn"
                                onClick={() => handleStartInquiry(item)}
                              >
                                ⚡ Inquire Price & Video
                              </button>
                              <button
                                className="chat-view-btn"
                                onClick={() => go(`/product/${item.slug}`)}
                              >
                                View
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline Lead Capture Form */}
                  {m.showLeadForm && (
                    <form
                      className="in-chat-lead-box"
                      onSubmit={(e) => handleLeadSubmit(e, m.selectedProduct)}
                    >
                      <span className="lead-box-title">
                        <Sparkles size={13} />
                        <span>Instant WhatsApp Quotation Request</span>
                      </span>
                      <div className="lead-input-row">
                        <input
                          type="tel"
                          required
                          placeholder="Enter your WhatsApp / Phone number"
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                        />
                        <button type="submit" className="lead-submit-btn">
                          Get Quote <Send size={13} />
                        </button>
                      </div>
                      <small>No spam. Our senior stylist sends official bullion rate & purity certificate directly.</small>
                    </form>
                  )}

                  {/* WhatsApp Direct Action Button */}
                  {m.whatsappAction && (
                    <a
                      href={m.whatsappAction.url}
                      target="_blank"
                      rel="noreferrer"
                      className="chat-whatsapp-action-btn"
                    >
                      <MessageCircle size={16} />
                      <span>{m.whatsappAction.label}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {/* Interactive Quick Reply Chips */}
                  {m.chips && (
                    <div className="in-chat-chips-row">
                      {m.chips.map((chip, idx) => (
                        <button key={idx} onClick={() => handleSend(chip.query)}>
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.faceShapeOptions && (
                    <div className="face-shape-helper">
                      <div className="face-shape-helper-title">Aapka face kis shape ke closest lagta hai?</div>
                      <div className="face-shape-options">
                        {Object.entries(faceShapeAdvice).map(([key, advice]) => (
                          <button key={key} type="button" onClick={() => handleFaceShapeSelect(key)}>
                            {advice.label}
                          </button>
                        ))}
                      </div>
                      <small>Tip: selfie seedhi, natural light mein aur bina heavy filter ke dekhein.</small>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="sales-msg-row bot">
                <div className="bot-mini-avatar"><Sparkles size={14} /></div>
                <div className="sales-msg-bubble thinking-bubble">
                  <span className="dot-pulse" /><span className="dot-pulse" /><span className="dot-pulse" />
                  <span className="thinking-text">Sales Stylist is checking atelier catalog...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Bottom Intent Bar */}
          <div className="sales-bottom-pills-bar">
            {quickPills.map((pill, idx) => (
              <button key={idx} onClick={() => handleSend(pill.query)}>
                {pill.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="sales-chat-input-bar">
            <input
              type="text"
              placeholder="Ask about bridal polki, rings, or request price quote..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="chat-send-btn"
              onClick={() => handleSend()}
              disabled={!prompt.trim()}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// PRIVATE SALON APPOINTMENT BOOKING MODAL
function PrivateBookingModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window booking-modal-window animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-corner" onClick={onClose} aria-label="Close modal"><X size={20} /></button>

        {submitted ? (
          <div className="booking-success-box">
            <Check size={36} className="booking-check" />
            <h3>Appointment Reserved</h3>
            <p>Our private concierge has received your request. A confirmation and studio access pass will be sent via WhatsApp.</p>
            <button className="lux-btn-primary" onClick={onClose}>Close Window</button>
          </div>
        ) : (
          <div className="booking-form-wrap">
            <span className="eyebrow-accent">Raisa Private Salon</span>
            <h2>Book an Atelier Viewing</h2>
            <p>Experience our complete collection in privacy with our senior master gemologist in New Delhi or via dedicated HD video appointment.</p>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="form-double-col">
                <label>
                  Full Name *
                  <input type="text" required placeholder="e.g. Maharani Ananya" />
                </label>
                <label>
                  Contact Number (WhatsApp) *
                  <input type="tel" required placeholder="+91 98765 43210" />
                </label>
              </div>

              <div className="form-double-col">
                <label>
                  Consultation Type *
                  <select required>
                    <option value="studio">Private In-Studio Viewing (Mehrauli, New Delhi)</option>
                    <option value="virtual">Virtual 1-on-1 HD Video Consultation</option>
                    <option value="bridal">Bespoke Bridal Trousseau Session</option>
                  </select>
                </label>
                <label>
                  Preferred Date
                  <input type="date" min={new Date().toISOString().split('T')[0]} />
                </label>
              </div>

              <label>
                Pieces or Category of Interest
                <textarea rows="3" placeholder="Mention the pieces you are interested in (e.g. Polki Choker, Solitaire Ring, Gold Chains)..." />
              </label>

              <button type="submit" className="lux-btn-primary full-width">
                Confirm Private Appointment <ArrowRight size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// HOME PAGE - PURE JEWELLERY - NO CART - NO LIKE - RICH CONTENT & ANIMATIONS
function HomePage({ onQuickView, onOpenAI, onOpenBooking }) {
  const [videoMuted, setVideoMuted] = useState(true);

  return (
    <div className="home-experience">
      {/* Cinematic Hero Section with High Fashion Video Background */}
      <section className="cinematic-hero">
        <video
          className="hero-video-player"
          autoPlay
          loop
          muted={videoMuted}
          playsInline
          poster={asset('editorial-gold.jpg')}
        >
          <source src={asset('jewelry-hero.mp4')} type="video/mp4" />
          <source src={asset('aurelia-hero.mp4')} type="video/mp4" />
        </video>

        <div className="hero-dark-overlay" />

        <div className="hero-content-frame animate-fade-in-up">
          <div className="hero-floating-emblem">
            <Sparkles size={14} className="sparkle-icon" />
            <span className="gold-shimmer-badge">RAISA JEWELS • HAUTE JOAILLERIE ATELIER</span>
          </div>

          <h1 className="hero-headline">
            Where Craft Meets<br />
            <em>Unspoken Grace.</em>
          </h1>

          <p className="hero-subtext">
            Handcrafted solid gold, certified diamonds, and bespoke bridal heirlooms designed for life’s most profound milestones.
          </p>

          <div className="hero-action-cluster">
            <button className="hero-primary-btn hover-glow" onClick={() => go('/shop')}>
              <span>Explore Collection</span>
              <ArrowUpRight size={16} />
            </button>

            <button className="hero-glass-btn hover-lift" onClick={onOpenAI}>
              <Sparkles size={16} />
              <span>Consult AI Stylist</span>
            </button>

            <a
              href="https://wa.me/918837858438?text=Hello%20Raisa%20Atelier%2C%20I%20would%20like%20to%20request%20an%20exclusive%20jewellery%20catalogue."
              target="_blank"
              rel="noreferrer"
              className="hero-whatsapp-direct-btn"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Catalogue</span>
            </a>
          </div>
        </div>

        {/* Hero Audio Toggle & Scroll Indicator */}
        <div className="hero-bottom-controls">
          <button
            className="sound-toggle-btn"
            onClick={() => setVideoMuted(!videoMuted)}
            aria-label={videoMuted ? 'Unmute video ambient sound' : 'Mute video'}
          >
            {videoMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{videoMuted ? 'Muted' : 'Sound On'}</span>
          </button>

          <div className="hero-scroll-invite">
            <span>Scroll To Experience</span>
            <ChevronDown size={14} className="bounce-anim" />
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <section className="luxury-flowing-marquee">
        <div className="marquee-track">
          <span>HAUTE JOAILLERIE</span> ✦ <span>BIS 916 HALLMARKED GOLD</span> ✦ <span>IGI & GIA CERTIFIED DIAMONDS</span> ✦ <span>HAND-FORGED BY MASTER KARIGARS</span> ✦ <span>DIRECT WHATSAPP QUOTES</span> ✦ <span>BESPOKE BRIDAL TROUSSEAU</span> ✦ <span>HAUTE JOAILLERIE</span> ✦ <span>BIS 916 HALLMARKED GOLD</span> ✦
        </div>
      </section>

      {/* Curated Category Mosaic Grid */}
      <section className="curated-categories-section">
        <div className="section-head-lux">
          <div className="head-left">
            <span className="eyebrow-accent">The Raisa Repertoire</span>
            <h2>Curated Collections</h2>
          </div>
          <p className="head-desc">
            Explore meticulously finished collections crafted in 18K & 22K hallmarked gold and certified conflict-free diamonds.
          </p>
        </div>

        <div className="category-mosaic-grid">
          {categories.slice(1).map((cat, i) => (
            <div
              key={cat.label}
              className={`mosaic-card mosaic-card-${i + 1} hover-tilt`}
              onClick={() => go(`/shop?category=${encodeURIComponent(cat.id)}`)}
            >
              <img src={cat.image} alt={cat.label} loading="lazy" />
              <div className="mosaic-gradient" />
              <div className="mosaic-content">
                <span className="cat-sub">{cat.desc}</span>
                <h3 className="cat-name">{cat.label}</h3>
                <span className="cat-link">Explore Collection <ArrowUpRight size={14} /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Masterpieces (No Price - Inquire Only) */}
      <section className="featured-masterpieces-section">
        <div className="section-head-lux">
          <div className="head-left">
            <span className="eyebrow-accent">New In Atelier</span>
            <h2>Signature Creations</h2>
          </div>
          <button className="gold-text-link" onClick={() => go('/shop')}>
            <span>View All ({products.length} Pieces)</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="lux-products-grid">
          {products.slice(0, 4).map((product) => (
            <LuxuryProductCard
              key={product.slug}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* 100% PURE JEWELLERY GENERATIONAL CRAFT SECTION (No watches - True Goldsmithing) */}
      <section className="atelier-craft-mastery-section">
        <div className="craft-grid-container">
          <div className="craft-media-side">
            <div className="craft-image-frame hover-lift">
              <img src={asset('pinterest-ref-01.jpg')} alt="Master karigar handcrafted 22K gold polki jewellery" />
              <div className="craft-badge-overlay">
                <Sparkles size={14} />
                <span>Atelier Goldsmithing Artistry • Mehrauli</span>
              </div>
            </div>
            <div className="craft-stat-float">
              <strong>240+</strong>
              <span>Hours of Master Karigari per Choker</span>
            </div>
          </div>

          <div className="craft-narrative-side">
            <span className="eyebrow-accent">GENERATIONAL KARIGARI</span>
            <h2>The Human Hand Cannot Be Replicated</h2>
            <p>
              Every Raisa piece is brought to life through the time-honored traditions of Indian jewellery making: hand granulation, uncut polki jadau setting, and molten 22K gold finishing.
            </p>
            <p>
              We blend these century-old techniques with modern architectural silhouettes, creating pieces that feel feather-light against the skin while holding unmistakable weight in character.
            </p>

            <div className="craft-badges-row">
              <div className="craft-pill"><Check size={14} /> <span>100% BIS Hallmarked 916 & 750</span></div>
              <div className="craft-pill"><Check size={14} /> <span>IGI & GIA Documented Diamonds</span></div>
              <div className="craft-pill"><Check size={14} /> <span>Natural Uncut Syndicate Polki</span></div>
            </div>

            <div className="craft-cta-cluster">
              <button className="lux-btn-primary" onClick={onOpenBooking}>
                Book Studio Craft Tour
              </button>
              <a
                href="https://wa.me/918837858438?text=Hello%20Raisa%20Jewels%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20bespoke%20jewellery%20crafting%20process."
                target="_blank"
                rel="noreferrer"
                className="lux-btn-whatsapp"
              >
                <MessageCircle size={16} /> Chat with Karigar Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Google AI Studio Feature Banner */}
      <section className="ai-atelier-feature-banner">
        <div className="ai-banner-card">
          <div className="ai-banner-left">
            <div className="ai-chip shimmer-effect">
              <Sparkles size={14} />
              <span>Google AI Studio Powered</span>
            </div>
            <h2>Meet Your Personal AI Jewelry Stylist</h2>
            <p>
              Not sure how to pair your evening jewels? Our intelligent styling assistant analyzes your outfit colors, event type, and personal preferences to construct the ideal jewelry harmony and provide instant quotation links.
            </p>
            <div className="ai-feature-points">
              <div><Check size={14} /> <span>Custom bridal attire & necklace coordination</span></div>
              <div><Check size={14} /> <span>Daily gold stack harmonizer</span></div>
              <div><Check size={14} /> <span>Instant WhatsApp quotation generator</span></div>
            </div>
            <button className="ai-cta-gold-btn hover-glow" onClick={onOpenAI}>
              <Sparkles size={16} />
              <span>Launch Virtual Stylist</span>
            </button>
          </div>

          <div className="ai-banner-right">
            <div className="interactive-ai-preview">
              <div className="preview-chat-header">
                <div className="dots-row"><span /><span /><span /></div>
                <span>Raisa AI Concierge</span>
              </div>
              <div className="preview-chat-body">
                <div className="preview-user-msg">
                  "Suggest jewelry for a deep emerald green sangeet lehenga"
                </div>
                <div className="preview-ai-msg">
                  <Sparkles size={14} />
                  <span>"Pair the <strong>The Royal Polki Choker</strong> with <strong>Sculpted Gold Huggie Hoops</strong>. The warm 22K gold granulation will radiate against deep emerald velvet."</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Haute Bridal Video Banner */}
      <section className="bridal-atelier-banner">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={asset('bridal-model.jpg')}
          className="bridal-video"
        >
          <source src={asset('model-jewelry-07.mp4')} type="video/mp4" />
        </video>
        <div className="bridal-dark-filter" />
        <div className="bridal-content-center animate-fade-in-up">
          <span className="eyebrow-gold">HAUTE BRIDAL EDIT</span>
          <h2>Created For The Day You’ll Remember Forever</h2>
          <p>
            From syndicate uncut polki to hand-matched emerald clusters, our bridal suites are crafted individually for each bride by third-generation karigars.
          </p>
          <div className="bridal-btn-row">
            <button className="lux-btn-primary hover-glow" onClick={() => go('/shop?category=Bridal')}>
              Explore Bridal Suite
            </button>
            <button className="lux-btn-white hover-lift" onClick={onOpenBooking}>
              Book Bridal Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Craftsmanship Pillars */}
      <section className="trust-pillars-section">
        <div className="pillar-item hover-lift">
          <ShieldCheck size={28} className="pillar-icon" />
          <h4>BIS Hallmarked Purity</h4>
          <p>Every piece bears the government-certified BIS Hallmark guaranteeing gold purity (916 & 750).</p>
        </div>
        <div className="pillar-item hover-lift">
          <Gem size={28} className="pillar-icon" />
          <h4>Certified Diamonds</h4>
          <p>IGI and GIA certified conflict-free diamonds with documented cut, clarity, and color excellence.</p>
        </div>
        <div className="pillar-item hover-lift">
          <RefreshCw size={28} className="pillar-icon" />
          <h4>Lifetime Exchange</h4>
          <p>Your jewelry grows with your story. Guaranteed buyback and lifetime upgrade privilege across India.</p>
        </div>
        <div className="pillar-item hover-lift">
          <Truck size={28} className="pillar-icon" />
          <h4>White-Glove Insured Shipping</h4>
          <p>Fully insured transit direct to your doorstep with tamper-proof luxury packaging and live tracking.</p>
        </div>
      </section>

      {/* Editorial Lookbook Grid - Pinterest Curated */}
      <section className="editorial-lookbook-section">
        <div className="section-head-lux">
          <div className="head-left">
            <span className="eyebrow-accent">Lookbook & Editorial</span>
            <h2>Moments in Gold</h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="gold-text-link">
            <span>Follow @raisajewels</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="lookbook-gallery">
          <div className="gallery-card hover-zoom"><img src={asset('pinterest-ref-01.jpg')} alt="22K Gold Polki Choker" /></div>
          <div className="gallery-card hover-zoom"><img src={asset('dune-layered-chain.jpg')} alt="Sculpted Gold Huggie Hoops" /></div>
          <div className="gallery-card hover-zoom"><img src={asset('pinterest-ref-03.jpg')} alt="Royal Indian Bridal Suite" /></div>
          <div className="gallery-card hover-zoom"><img src={asset('pinterest-diamond-ring.jpg')} alt="Certified Diamond Solitaire Ring" /></div>
          <div className="gallery-card hover-zoom"><img src={asset('emerald-choker-model.jpg')} alt="Zambian Emerald & Polki Suite" /></div>
        </div>
      </section>

      <VisualArchiveSection />

      {/* Client Testimonials */}
      <section className="testimonials-section">
        <div className="section-head-lux text-center">
          <span className="eyebrow-accent">Voices of Connoisseurs</span>
          <h2>Worn. Cherished. Passed On.</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card hover-lift">
            <div className="stars-row">★★★★★</div>
            <blockquote>
              “The Royal Polki Choker made my wedding reception unforgettable. The craftsmanship, weight, and fine finishing were on par with royal heritage jewelers.”
            </blockquote>
            <cite>— Gayatri Singhania, New Delhi</cite>
          </div>

          <div className="testimonial-card hover-lift">
            <div className="stars-row">★★★★★</div>
            <blockquote>
              “The Sol Chain and Luna Cuff have become my second skin. Effortless luxury that elevates even a plain white shirt or evening slip dress.”
            </blockquote>
            <cite>— Rhea Sen, Mumbai</cite>
          </div>

          <div className="testimonial-card hover-lift">
            <div className="stars-row">★★★★★</div>
            <blockquote>
              “The private salon appointment in Mehrauli was a masterclass in personalized luxury. No rush, absolute discretion, and transparent gemological guidance.”
            </blockquote>
            <cite>— Devika & Kabir, Bangalore</cite>
          </div>
        </div>
      </section>
    </div>
  );
}

function VisualArchiveSection() {
  return (
    <section className="visual-archive-section">
      <div className="section-head-lux">
        <div className="head-left">
          <span className="eyebrow-accent">Complete Atelier Archive</span>
          <h2>Every Detail, Every Motion</h2>
        </div>
        <p className="head-desc">A full visual edit of our jewellery, model portraits, craft details and cinematic videos—nothing hidden, including the final look.</p>
      </div>
      <div className="visual-archive-grid">
        {visualArchive.map((filename) => {
          const isVideo = filename.toLowerCase().endsWith('.mp4');
          return (
            <div className={`archive-media-card ${isVideo ? 'is-video' : ''}`} key={filename}>
              {isVideo ? (
                <video src={asset(filename)} muted loop autoPlay playsInline preload="metadata" />
              ) : (
                <img src={asset(filename)} alt={`Raisa Jewels ${filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}`} loading="lazy" />
              )}
              <span>{filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// SHOP / CATALOG PAGE (NO PRICES - NO CART - NO LIKE)
function ShopPage({ onQuickView }) {
  const getCategoryParam = () => {
    let search = window.location.search;
    if (!search && window.location.hash && window.location.hash.includes('?')) {
      search = '?' + window.location.hash.split('?')[1];
    }
    return new URLSearchParams(search).get('category') || '';
  };

  const [selectedCat, setSelectedCat] = useState(getCategoryParam);
  const [selectedMetal, setSelectedMetal] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCat(getCategoryParam());
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = !selectedCat || p.category.toLowerCase() === selectedCat.toLowerCase();
      const matchMetal = selectedMetal === 'All' || p.metal.toLowerCase().includes(selectedMetal.toLowerCase());
      const matchOccasion = selectedOccasion === 'All' || p.occasion.toLowerCase().includes(selectedOccasion.toLowerCase());
      return matchCat && matchMetal && matchOccasion;
    });
  }, [selectedCat, selectedMetal, selectedOccasion]);

  return (
    <div className="shop-view-wrapper">
      <div className="shop-video-hero">
        <video
          className="shop-hero-video-player"
          autoPlay
          loop
          muted
          playsInline
          poster={asset('editorial-gold.jpg')}
        >
          <source src={asset('aurelia-hero.mp4')} type="video/mp4" />
        </video>
        <div className="shop-video-overlay" />
        <div className="shop-hero-content animate-fade-in-up">
          <span className="hero-badge shimmer-effect">
            <Sparkles size={13} />
            <span>RAISA JEWELS • CURATED REPERTOIRE</span>
          </span>
          <h1>Curated Jewellery Catalog</h1>
          <p>
            Pure 22K & 18K BIS Hallmarked Solid Gold, Certified Diamonds, and Bespoke Heirlooms Crafted with Unspoken Grace.
          </p>
          <div className="shop-hero-stats">
            <div className="stat-pill">✦ 100% BIS 916 & 750 Hallmarked</div>
            <div className="stat-pill">✦ IGI & GIA Documented Stones</div>
            <div className="stat-pill">✦ Direct WhatsApp: +91 88378 58438</div>
          </div>
        </div>
      </div>

      <div className="shop-main-layout">
        {/* Desktop Filter Sidebar */}
        <aside className={`shop-sidebar ${mobileFilterOpen ? 'is-open' : ''}`}>
          <div className="sidebar-head">
            <h3>Refine Catalog</h3>
            <button className="close-filter-mobile" onClick={() => setMobileFilterOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="filter-options-stack">
              {categories.map((c) => (
                <button
                  key={c.label}
                  className={`filter-btn-pill ${selectedCat === c.id ? 'active' : ''}`}
                  onClick={() => { setSelectedCat(c.id); setMobileFilterOpen(false); }}
                >
                  <span>{c.label}</span>
                  <small>{c.id ? products.filter((p) => p.category === c.id).length : products.length}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Precious Metal</label>
            <select value={selectedMetal} onChange={(e) => setSelectedMetal(e.target.value)}>
              <option value="All">All Metals</option>
              <option value="18K">18K Solid Gold / Vermeil</option>
              <option value="22K">22K Traditional Yellow Gold</option>
              <option value="White">18K White Gold</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Occasion</label>
            <select value={selectedOccasion} onChange={(e) => setSelectedOccasion(e.target.value)}>
              <option value="All">All Occasions</option>
              <option value="Bridal">Bridal & Grand Wedding</option>
              <option value="Daily">Daily Elegance</option>
              <option value="Cocktail">Cocktail & Evening</option>
            </select>
          </div>

          <button
            className="clear-filters-btn"
            onClick={() => {
              setSelectedCat('');
              setSelectedMetal('All');
              setSelectedOccasion('All');
            }}
          >
            Reset All Filters
          </button>
        </aside>

        {/* Catalog Products Area */}
        <main className="shop-content-area">
          <div className="catalog-toolbar">
            <button className="mobile-filter-trigger" onClick={() => setMobileFilterOpen(true)}>
              <Filter size={15} /> <span>Filter Pieces</span>
            </button>
            <span className="count-label">Showing <strong>{filteredProducts.length}</strong> creations</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="lux-products-grid">
              {filteredProducts.map((product) => (
                <LuxuryProductCard
                  key={product.slug}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-message">
              <Sparkles size={36} />
              <h3>No pieces matched your selected filters</h3>
              <p>Adjust your filters or reset to view our full collection.</p>
              <button
                className="lux-btn-primary"
                onClick={() => { setSelectedCat(''); setSelectedMetal('All'); setSelectedOccasion('All'); }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// PRODUCT DETAIL PAGE - NO PRICES - NO ADD TO CART - NO HEART (Direct WhatsApp Quotation)
function ProductDetailPage({ slug, onQuickView }) {
  const product = products.find((p) => p.slug === slug) || products[0];
  const [activeMedia, setActiveMedia] = useState(product.image);
  const [selectedPurity, setSelectedPurity] = useState('18K');
  const [ringSize, setRingSize] = useState('14');
  const [pincode, setPincode] = useState('');
  const [deliveryChecked, setDeliveryChecked] = useState(false);

  const gallery = [product.image, product.second, product.video || asset('jewelry-detail-01.mp4')];

  const whatsAppMessage = `Hello Raisa Atelier,\nI am inquiring about the "${product.name}" (SKU: ${product.sku}).\nPurity: ${selectedPurity} Gold\nWeight: ${product.weight}\nPlease share the current price quotation, hallmarking certificate, and delivery timeline.`;

  return (
    <div className="product-page-container">
      <div className="breadcrumb-nav">
        <button onClick={() => go('/shop')}>Collection</button>
        <span>/</span>
        <button onClick={() => go(`/shop?category=${encodeURIComponent(product.category)}`)}>{product.category}</button>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      <div className="product-stage-grid">
        {/* Left Gallery */}
        <div className="product-stage-gallery">
          <div className="gallery-thumbs">
            {gallery.map((media, i) => (
              <button
                key={i}
                className={`thumb-btn ${activeMedia === media ? 'active' : ''}`}
                onClick={() => setActiveMedia(media)}
              >
                {media.endsWith('.mp4') ? (
                  <div className="video-thumb-preview"><Play size={16} /></div>
                ) : (
                  <img src={media} alt="" />
                )}
              </button>
            ))}
          </div>

          <div className="main-stage-display">
            {activeMedia.endsWith('.mp4') ? (
              <video autoPlay muted loop controls playsInline src={activeMedia} className="stage-video" />
            ) : (
              <img src={activeMedia} alt={product.name} className="stage-image animate-fade-in" />
            )}
          </div>
        </div>

        {/* Right Information & WhatsApp Quotation */}
        <div className="product-stage-info">
          <div className="product-badge-line">
            <span className="eyebrow-accent">{product.tag}</span>
            <span className="sku-num">SKU: {product.sku}</span>
          </div>

          <h1 className="product-title-lux">{product.name}</h1>

          <div className="reviews-rating-bar">
            <span className="gold-stars">★★★★★</span>
            <span className="rating-score">{product.rating}</span>
            <span className="review-count">({product.reviews} Verified Connoisseur Reviews)</span>
          </div>

          {/* Pricing on Request Container */}
          <div className="exclusive-pricing-panel">
            <div className="panel-badge-row">
              <span className="gold-pill">Haute Joaillerie</span>
              <span className="avail-badge">{product.availability}</span>
            </div>
            <p className="price-title">Price Upon Private Request</p>
            <p className="price-sub">
              Calculated dynamically in accordance with precious metal weights, diamond certifications, and live international bullion rates.
            </p>
          </div>

          <p className="product-narrative">{product.description}</p>

          {/* Metal Purity Selector */}
          <div className="stage-selector-block">
            <div className="selector-title">
              <span>Select Metal Purity</span>
              <strong>{selectedPurity} Gold</strong>
            </div>
            <div className="purity-buttons-row">
              {['14K', '18K', '22K'].map((pur) => (
                <button
                  key={pur}
                  className={`purity-btn ${selectedPurity === pur ? 'selected' : ''}`}
                  onClick={() => setSelectedPurity(pur)}
                >
                  {pur} Gold
                </button>
              ))}
            </div>
          </div>

          {/* Ring Size Selector if applicable */}
          {product.category === 'Rings' && (
            <div className="stage-selector-block">
              <div className="selector-title">
                <span>Ring Size (Indian Standard)</span>
                <span className="size-guide-link">Complimentary Sizer Available</span>
              </div>
              <div className="purity-buttons-row">
                {['10', '12', '14', '16', '18', '20'].map((sz) => (
                  <button
                    key={sz}
                    className={`purity-btn ${ringSize === sz ? 'selected' : ''}`}
                    onClick={() => setRingSize(sz)}
                  >
                    Size {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pincode Delivery Check */}
          <div className="stage-pincode-check">
            <label>Verify Insured White-Glove Delivery</label>
            <div className="pincode-input-row">
              <MapPin size={16} />
              <input
                type="text"
                placeholder="Enter 6-digit Pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button onClick={() => setDeliveryChecked(Boolean(pincode.length >= 6))}>Check</button>
            </div>
            {deliveryChecked && (
              <p className="pincode-ok-msg">
                <Check size={14} /> Complimentary insured courier service available for {pincode}.
              </p>
            )}
          </div>

          {/* Direct WhatsApp Action Hub */}
          <div className="product-primary-action-hub">
            <a
              href={`https://wa.me/918837858438?text=${encodeURIComponent(whatsAppMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="lux-btn-whatsapp full-width hover-glow"
            >
              <MessageCircle size={18} /> Inquire Price & Video on WhatsApp
            </a>

            <a
              href="tel:+918837858438"
              className="lux-btn-primary full-width"
            >
              <Phone size={16} /> Speak with Senior Gemologist (+91 88378 58438)
            </a>
          </div>

          {/* Authenticity Accordion */}
          <div className="product-details-accordion">
            <div className="accordion-item">
              <h4>Craftsmanship & Specifications</h4>
              <p>Hand-finished in our New Delhi atelier. Gross Weight: {product.weight}. Metal: {product.metal} ({product.purity}). Hallmarked under Indian BIS standards.</p>
            </div>
            <div className="accordion-item">
              <h4>Gemological Certification</h4>
              <p>Every diamond and precious gemstone piece includes an individual authenticity certificate detailing carat weight, color, clarity, and conflict-free origin.</p>
            </div>
            <div className="accordion-item">
              <h4>Private Atelier Delivery & Exchange</h4>
              <p>Complimentary insured shipping across India. Includes lifetime exchange and buyback assurance against precious metal valuation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Pieces */}
      <section className="related-pieces-section">
        <div className="section-head-lux">
          <div className="head-left">
            <span className="eyebrow-accent">Harmonizing Pieces</span>
            <h2>Complete The Ensemble</h2>
          </div>
        </div>
        <div className="lux-products-grid">
          {products.filter((p) => p.slug !== product.slug).slice(0, 4).map((item) => (
            <LuxuryProductCard
              key={item.slug}
              product={item}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

// ABOUT / ATELIER PAGE - 100% PURE JEWELLERY - WORLD CLASS MASTERPIECE
function AboutPage({ onOpenBooking }) {
  return (
    <div className="about-experience">
      <div className="about-video-hero">
        <video
          className="about-hero-video-player"
          autoPlay
          loop
          muted
          playsInline
          poster={asset('bridal-model.jpg')}
        >
          <source src={asset('model-jewelry-04.mp4')} type="video/mp4" />
        </video>
        <div className="about-video-overlay" />
        <div className="about-hero-content animate-fade-in-up">
          <div className="hero-floating-emblem">
            <Sparkles size={14} className="sparkle-icon" />
            <span className="gold-shimmer-badge">RAISA ATELIER • ESTABLISHED 1988</span>
          </div>
          <h1>Sculpted by Royal Heritage.<br />Worn with Contemporary Poise.</h1>
          <p>Raisa Jewels was founded to celebrate precious jewellery that belongs in everyday life and generational heirlooms, not dark bank vaults.</p>
        </div>
      </div>

      <div className="story-split-section">
        <div className="story-image-wrap hover-lift">
          <img src={asset('pinterest-ref-01.jpg')} alt="Master karigar handcrafted 22K gold polki jewellery" />
          <span className="image-footnote">Hand-forged 22K gold karigari in our Mehrauli Heritage studio</span>
        </div>
        <div className="story-narrative-wrap">
          <span className="eyebrow-accent">Maison Heritage</span>
          <h2>The Human Hand Cannot Be Replicated</h2>
          <p>
            Every Raisa piece is brought to life through the time-honored traditions of imperial Indian jewellery making: hand granulation, uncut syndicate polki jadau setting, and molten 22K gold finishing.
          </p>
          <p>
            We blend these century-old techniques with modern architectural silhouettes, creating pieces that feel feather-light against the skin while holding unmistakable weight in character and heritage.
          </p>
          <div className="about-actions-row">
            <button className="lux-btn-primary hover-glow" onClick={onOpenBooking}>
              Book a Studio Visit
            </button>
            <a
              href="https://wa.me/918837858438?text=Hello%20Raisa%20Atelier%2C%20I%20would%20like%20to%20know%20more%20about%20your%20custom%20jewellery%20crafting."
              target="_blank"
              rel="noreferrer"
              className="lux-btn-whatsapp"
            >
              <MessageCircle size={16} /> WhatsApp Atelier (+91 88378 58438)
            </a>
          </div>
        </div>
      </div>

      {/* 4 Pillars of RAISA JEWELS Mastery */}
      <div className="section-head-lux text-center" style={{ marginTop: 60 }}>
        <span className="eyebrow-accent">The Foundations of Perfection</span>
        <h2>Four Pillars of RAISA JEWELS Mastery</h2>
      </div>

      <div className="about-pillars-grid">
        <div className="pillar-3d-card hover-lift">
          <div className="pillar-num">01</div>
          <h3 className="pillar-title">100% BIS Hallmarked Purity</h3>
          <p className="pillar-desc">
            Every ounce of 22K (916) and 18K (750) gold is certified by the Bureau of Indian Standards with unique laser-engraved HUID identifiers. Zero compromises.
          </p>
        </div>

        <div className="pillar-3d-card hover-lift">
          <div className="pillar-num">02</div>
          <h3 className="pillar-title">Syndicate Polki & Certified Solitaires</h3>
          <p className="pillar-desc">
            Natural uncut syndicate polki diamonds and conflict-free solitaire stones accompanied by accredited GIA and IGI gemological certificates.
          </p>
        </div>

        <div className="pillar-3d-card hover-lift">
          <div className="pillar-num">03</div>
          <h3 className="pillar-title">Ancestral Karigar Lineage</h3>
          <p className="pillar-desc">
            Crafted exclusively by third and fourth-generation goldsmith families in New Delhi preserving champlevé enameling, jadau, and hand wire-drawing.
          </p>
        </div>

        <div className="pillar-3d-card hover-lift">
          <div className="pillar-num">04</div>
          <h3 className="pillar-title">Lifetime Care & Exchange Guarantee</h3>
          <p className="pillar-desc">
            Every creation carries lifetime complimentary ultrasonic spa cleaning, stone tightening, re-polishing, and guaranteed exchange valuation privileges.
          </p>
        </div>
      </div>

      {/* Heritage Journey Timeline */}
      <div className="about-timeline-section">
        <div className="section-head-lux text-center">
          <span className="eyebrow-accent">Chronicles of Craft</span>
          <h2>The Journey of RAISA JEWELS</h2>
        </div>

        <div className="timeline-track">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-year">1988</div>
            <div className="timeline-heading">The Founding Goldsmith Atelier</div>
            <p className="timeline-p">Established as a private family goldsmith salon in historic Mehrauli crafting bridal trousseaux for discerning families.</p>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-year">2002</div>
            <div className="timeline-heading">The Royal Polki Guild</div>
            <p className="timeline-p">Pioneered syndicate uncut polki chokers combined with untreated Zambian emeralds, reviving Mughal-era jadau artistry.</p>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-year">2016</div>
            <div className="timeline-heading">Architectural Fine Gold</div>
            <p className="timeline-p">Introduced modern, lightweight Italian link chains, huggies, and certified solitaire rings designed for daily elegance.</p>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-year">2026</div>
            <div className="timeline-heading">Flagship Salon & AI Concierge</div>
            <p className="timeline-p">Launched our digital haute atelier with AI styling concierge and nationwide white-glove insured delivery.</p>
          </div>
        </div>
      </div>

      {/* Master Goldsmith Gallery & Video Showcase */}
      <div className="section-head-lux text-center" style={{ marginTop: 60 }}>
        <span className="eyebrow-accent">Atelier in Motion</span>
        <h2>Inside the RAISA JEWELS Workshop</h2>
      </div>

      <div className="atelier-showcase-grid">
        <div className="atelier-video-box">
          <video autoPlay loop muted playsInline poster={asset('bridal-portrait.jpg')}>
            <source src={asset('model-jewelry-07.mp4')} type="video/mp4" />
          </video>
        </div>
        <div className="atelier-photos-subgrid">
          <div className="atelier-photo-tile hover-lift">
            <img src={asset('pinterest-ref-01.jpg')} alt="Handcrafted 22K gold polki" />
          </div>
          <div className="atelier-photo-tile hover-lift">
            <img src={asset('dune-layered-chain.jpg')} alt="Gold huggie hoop detail" />
          </div>
          <div className="atelier-photo-tile hover-lift">
            <img src={asset('pinterest-ref-03.jpg')} alt="Royal bridal suite" />
          </div>
          <div className="atelier-photo-tile hover-lift">
            <img src={asset('emerald-choker-model.jpg')} alt="Emerald choker masterwork" />
          </div>
        </div>
      </div>

      {/* Certifications Ribbon */}
      <div className="certifications-ribbon">
        <div className="cert-pill">
          <ShieldCheck size={20} />
          <span>BIS Hallmarked 916 & 750</span>
        </div>
        <div className="cert-pill">
          <Award size={20} />
          <span>GIA & IGI Certified Diamonds</span>
        </div>
        <div className="cert-pill">
          <Gem size={20} />
          <span>100% Natural Syndicate Polki</span>
        </div>
        <div className="cert-pill">
          <Truck size={20} />
          <span>100% Insured Express Transit</span>
        </div>
      </div>
    </div>
  );
}

// CONTACT & APPOINTMENT PAGE
function ContactPage({ onOpenBooking }) {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="contact-experience">
      <div className="contact-video-hero">
        <video
          className="contact-hero-video-player"
          autoPlay
          loop
          muted
          playsInline
          poster={asset('bridal-portrait.jpg')}
        >
          <source src={asset('model-jewelry-06.mp4')} type="video/mp4" />
        </video>
        <div className="contact-video-overlay" />
        <div className="contact-hero-content animate-fade-in-up">
          <span className="hero-badge shimmer-effect">
            <Sparkles size={13} />
            <span>PERSONAL CONCIERGE & SALON</span>
          </span>
          <h1>We Welcome Your Visit</h1>
          <p>Visit our private salon in Mehrauli, New Delhi, arrange a virtual viewing, or speak directly with our senior gemologist.</p>
        </div>
      </div>

      <div className="contact-content-grid">
        <div className="contact-salon-info">
          <div className="info-card-block hover-lift">
            <span className="eyebrow-accent">Private Atelier</span>
            <h3>New Delhi Salon</h3>
            <p>12, Mehrauli Heritage Corridor<br />New Delhi, 110030, India</p>
            <p>By Appointment Only • Monday to Saturday: 11:00 AM – 7:00 PM</p>
          </div>

          <div className="info-card-block hover-lift">
            <span className="eyebrow-accent">Direct Contact</span>
            <p>
              <strong>WhatsApp & Calls:</strong> <a href="tel:+918837858438">+91 88378 58438</a><br />
              <strong>Atelier Concierge:</strong> <a href="mailto:hello@raisajewels.in">hello@raisajewels.in</a>
            </p>
          </div>

          <div className="info-card-block hover-lift">
            <span className="eyebrow-accent">Instant Messaging</span>
            <a
              href="https://wa.me/918837858438?text=Hello%20Raisa%2C%20I%20would%20like%20to%20inquire%20about%20a%20piece%20or%20book%20an%20appointment."
              target="_blank"
              rel="noreferrer"
              className="lux-btn-whatsapp full-width hover-glow"
            >
              <MessageCircle size={18} /> Chat with Atelier Concierge (+91 88378 58438)
            </a>
          </div>
        </div>

        <div className="contact-form-panel">
          {formSent ? (
            <div className="form-sent-success animate-fade-in">
              <Check size={36} />
              <h3>Message Received</h3>
              <p>Our personal client manager will respond via WhatsApp or email within two business hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}>
              <h3>Request Quotation or Consultation</h3>
              <div className="form-group-lux">
                <label>Your Name *</label>
                <input type="text" required placeholder="Full Name" />
              </div>
              <div className="form-group-lux">
                <label>Phone / WhatsApp Number *</label>
                <input type="tel" required placeholder="+91 88378 58438" />
              </div>
              <div className="form-group-lux">
                <label>Email Address *</label>
                <input type="email" required placeholder="client@example.com" />
              </div>
              <div className="form-group-lux">
                <label>Your Inquiry or Request</label>
                <textarea rows="4" placeholder="Mention the pieces you are interested in (e.g. Polki Choker, Solitaire Ring) or desired appointment date..." />
              </div>
              <button type="submit" className="lux-btn-primary full-width hover-glow">
                Send Message <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// LUXURY FOOTER - NO CART - NO WISHLIST
function LuxuryFooter({ onOpenAI, onOpenBooking }) {
  return (
    <footer className="luxury-footer">
      <div className="footer-top-grid">
        <div className="footer-brand-col">
          <Logo light />
          <p className="footer-tagline">
            Haute Joaillerie for the chapters of your life. Handcrafted with intention in New Delhi, India.
          </p>
          <div className="footer-hallmark-badges">
            <span>✦ BIS 916 & 750 Hallmarked Gold</span>
            <span>✦ IGI & GIA Documented Diamonds</span>
          </div>
        </div>

        <div className="footer-nav-col">
          <span className="col-heading">Atelier Collections</span>
          <button onClick={() => go('/shop')}>All Collections</button>
          <button onClick={() => go('/shop?category=Bridal')}>Haute Bridal Suite</button>
          <button onClick={() => go('/shop?category=Necklaces')}>Fine Necklaces</button>
          <button onClick={() => go('/shop?category=Earrings')}>Drop Earrings & Hoops</button>
          <button onClick={() => go('/shop?category=Rings')}>Solitaires & Bands</button>
        </div>

        <div className="footer-nav-col">
          <span className="col-heading">Private Services</span>
          <button onClick={onOpenAI}>Google AI Stylist Studio</button>
          <button onClick={onOpenBooking}>Book Salon Appointment</button>
          <button onClick={() => go('/about')}>Heritage & Karigars</button>
          <button onClick={() => go('/contact')}>Contact Concierge</button>
          <a href="https://wa.me/918837858438" target="_blank" rel="noreferrer">Direct WhatsApp Desk (+91 88378 58438)</a>
        </div>

        <div className="footer-newsletter-col">
          <span className="col-heading">Atelier Private Journal</span>
          <p>Receive private invitations to preview new capsule collections and seasonal edits.</p>
          <form className="footer-journal-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you. You have been added to our private salon registry.'); }}>
            <input type="email" required placeholder="Enter your email address" />
            <button type="submit"><ArrowUpRight size={16} /></button>
          </form>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© 2026 Raisa Jewels Private Limited. All Rights Reserved.</span>
        <span>Crafted in India • Worldwide White-Glove Insured Shipping</span>
      </div>
    </footer>
  );
}

// ROOT APPLICATION
function App() {
  const currentPath = useRoute();
  const route = currentPath.split('?')[0];

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Render Page
  let pageContent;
  if (route === '/shop') {
    pageContent = (
      <ShopPage
        key={currentPath}
        onQuickView={setQuickViewProduct}
      />
    );
  } else if (route.startsWith('/product/')) {
    const slug = route.split('/')[2];
    pageContent = (
      <ProductDetailPage
        slug={slug}
        onQuickView={setQuickViewProduct}
      />
    );
  } else if (route === '/about') {
    pageContent = <AboutPage onOpenBooking={() => setBookingModalOpen(true)} />;
  } else if (route === '/contact') {
    pageContent = <ContactPage onOpenBooking={() => setBookingModalOpen(true)} />;
  } else {
    pageContent = (
      <HomePage
        onQuickView={setQuickViewProduct}
        onOpenAI={() => setAiModalOpen(true)}
        onOpenBooking={() => setBookingModalOpen(true)}
      />
    );
  }

  return (
    <div className="aurelia-app">
      {/* Luxury Navbar - No Cart - No Like */}
      <LuxuryNavbar
        onOpenAI={() => setAiModalOpen(true)}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-viewport">{pageContent}</main>

      {/* Luxury Footer */}
      <LuxuryFooter
        onOpenAI={() => setAiModalOpen(true)}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Meesho-Style Sales AI Chatbot (Persistent Floating Widget + In-Chat Enquiry Flow) */}
      <SalesAIChatbot
        isOpen={aiModalOpen}
        onToggle={() => setAiModalOpen(!aiModalOpen)}
      />

      {/* Private Salon Booking Modal */}
      <PrivateBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
