import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, TGLC_CONTACT } from '../../data/tglcData';
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Lock,
  Search,
  ChevronRight,
  Phone,
  MapPin,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type MegaMenuType = 'none' | 'consortium' | 'services' | 'hidden-london';

const CONSORTIUM_PILLARS = [
  {
    page: 'consortium',
    kicker: 'Pillar 01 · Architecture',
    label: 'Consortium Overview',
    image: '/assets/aistudio/consortium_overview_head.jpg',
    focalTop: false,
    desc: 'The founding architecture, principles, and private house ethos.',
    actionLabel: 'Inspect Overview →',
  },
  {
    page: 'about',
    kicker: 'Pillar 02 · Leadership',
    label: 'About TGLC & Leadership',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-11_at_21.17.07_2194679c.jpeg',
    focalTop: true,
    desc: 'Meet founder Mickell Washington and stewards Leance Djedje & Melize Nastaasia.',
    actionLabel: 'Read Biographies →',
  },
  {
    page: 'ethos',
    kicker: 'Pillar 03 · Covenant',
    label: 'Our Ethos & Principles',
    image: '/assets/aistudio/consortium_ethos_sanctuary.jpg',
    focalTop: false,
    desc: 'Unbending discretion, non-disclosure rigour, and editorial independence.',
    actionLabel: 'Read House Covenant →',
  },
  {
    page: 'approach',
    kicker: 'Pillar 04 · Process',
    label: 'Our Approach & Journey',
    image: '/assets/aistudio/consortium_approach_board.jpg',
    focalTop: false,
    desc: 'From initial confidential consultation to bespoke lifestyle orchestration.',
    actionLabel: 'Explore Workflow →',
  },
  {
    page: 'network',
    kicker: 'Pillar 05 · International',
    label: 'The Global Network',
    image: '/assets/aistudio/consortium_network_global.jpg',
    focalTop: false,
    desc: 'Sovereign touchpoints in London, Geneva, Milan, Tokyo, and New York.',
    actionLabel: 'Inspect Global Desks →',
  },
  {
    page: 'our-london',
    kicker: 'Pillar 06 · Territory',
    label: 'Our London Enclaves',
    image: '/assets/aistudio/tglc_st_james_salon.jpg',
    focalTop: false,
    desc: 'Historic territory from St James’s and Mayfair to Belgravia and Chelsea.',
    actionLabel: 'Explore Mayfair & Map →',
  },
  {
    page: 'privacy-discretion',
    kicker: 'Pillar 07 · Shielding',
    label: 'Privacy & Discretion Protocol',
    image: '/assets/aistudio/consortium_privacy_vault.jpg',
    focalTop: false,
    desc: 'Biometric security, shielded invoicing, and encrypted communication lines.',
    actionLabel: 'Review Protocol →',
  },
] as const;

const SUB_ROSA_SECTORS = [
  {
    page: 'hidden-london-subterranean',
    sector: 'Sector 01',
    title: 'Subterranean Sanctums',
    mobileTitle: '1. Subterranean Sanctums & Bunkers',
    image: '/assets/aistudio/hidden_subterranean_vault_1794295323175.jpg',
    desc: 'Churchill’s Paddock Citadel, Kingsway Cold War tunnels, and 300-year-old Lombard bullion vaults.',
    highlight: false,
  },
  {
    page: 'hidden-london-industrial',
    sector: 'Sector 02',
    title: 'Brutalist & Monoliths',
    mobileTitle: '2. Brutalist Enclaves & Monoliths',
    image: '/assets/aistudio/hidden_brutalist_penthouse_1794295322915.jpg',
    desc: 'Barbican concrete sky-sanctums, Bermondsey leather armouries, and Millennium Mills silos.',
    highlight: false,
  },
  {
    page: 'hidden-london-combat',
    sector: 'Sector 03',
    title: 'Underground Combat',
    mobileTitle: '3. Underground Combat & Rings',
    image: '/assets/aistudio/east_end_boxing_1794391694652.jpg',
    desc: 'Bethnal Green railway arch sparring, unsanctioned exhibition bouts, and UFC London cageside.',
    highlight: false,
  },
  {
    page: 'hidden-london-gaming',
    sector: 'Sector 04',
    title: 'Secret Gaming Salons',
    mobileTitle: '4. Secret High-Stakes Gaming',
    image: '/assets/aistudio/meard_poker_sanctum.jpg',
    desc: 'Unlisted £50k Soho poker vaults, Curzon St chemin-de-fer, and Seven Dials backgammon.',
    highlight: false,
  },
  {
    page: 'hidden-london-maritime',
    sector: 'Sector 05',
    title: 'Thames Nocturne Stealth',
    mobileTitle: '5. Thames Stealth Interceptors',
    image: '/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg',
    desc: '02:00 AM matte-black interceptor sprints, abandoned Isle of Dogs drydocks, and blackwater insertion.',
    highlight: false,
  },
  {
    page: 'hidden-london-gastronomy',
    sector: 'Sector 06',
    title: 'Subversive Gastronomy',
    mobileTitle: '6. Subversive Counter-Culture Gastronomy',
    image: '/assets/aistudio/hidden_secret_gastronomy_1794295323821.jpg',
    desc: 'Dalston 8-seat vinyl omakase, butcher freezer cocktail rooms, and Clerkenwell meat-hook hearth feasts.',
    highlight: false,
  },
  {
    page: 'hidden-london-exploration',
    sector: 'Sector 07',
    title: 'Restricted Heights & Rails',
    mobileTitle: '7. Forbidden Heights & Restricted Rails',
    image: '/assets/aistudio/down_street_station_1794391687146.jpg',
    desc: 'Abandoned Down Street station, 700ft midnight crane vistas, and Tower Bridge bascule chamber crypts.',
    highlight: false,
  },
  {
    page: 'hidden-london-after-hours',
    sector: 'Sector 08',
    title: 'Bohemian Jazz Salons',
    mobileTitle: '8. Clandestine Bohemian Jazz Salons',
    image: '/assets/aistudio/soho_jazz_cellar_1794391689109.jpg',
    desc: 'Meard St 02:00 AM unadvertised jazz crypts, pre-ban absinthe dens, and Spitalfields watch exchanges.',
    highlight: false,
  },
  {
    page: 'hidden-london-urban-clubs',
    sector: 'Sector 09',
    title: 'Urban DJ & Hip-Hop Sanctums',
    mobileTitle: '9. Urban Sound, DJ & Hip-Hop Clubs',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    desc: 'Concrete vinyl vaults, Shoreditch turntable lofts, luxury street-couture salons & Maybach mews entry.',
    highlight: false,
  },
  {
    page: 'hidden-london-itinerary',
    sector: 'Operational Plan',
    title: '007 Rogue 24-Hr Mission',
    mobileTitle: '10. 007 Rogue 24-Hour Mission Plan',
    image: '/assets/aistudio/mayfair_alley_arrival_1794391693142.jpg',
    desc: 'The definitive dusk-to-dawn undercover mission blueprint through London’s hidden quarters.',
    highlight: true,
  },
] as const;

export const Header: React.FC = () => {
  const { route, navigateTo, openIntroductionModal, openSearch } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuType>('none');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [mobileConsortiumExpanded, setMobileConsortiumExpanded] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [mobileHiddenLondonExpanded, setMobileHiddenLondonExpanded] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMega('none');
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMega('none');
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isCurrent = (p: string) => {
    if (p === 'consortium' && ['consortium', 'about', 'ethos', 'approach', 'network', 'our-london', 'privacy-discretion'].includes(route.page)) return true;
    if (p === 'services' && ['services', 'service-detail', 'subservice-detail'].includes(route.page)) return true;
    if (
      p === 'hidden-london' &&
      [
        'hidden-london',
        'hidden-london-subterranean',
        'hidden-london-industrial',
        'hidden-london-combat',
        'hidden-london-gaming',
        'hidden-london-maritime',
        'hidden-london-gastronomy',
        'hidden-london-exploration',
        'hidden-london-after-hours',
        'hidden-london-urban-clubs',
        'hidden-london-itinerary',
      ].includes(route.page)
    )
      return true;
    if (p === 'journal' && ['journal', 'journal-article'].includes(route.page)) return true;
    return route.page === p;
  };

  const closeAll = () => {
    setActiveMega('none');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -8, opacity: 0.92 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setActiveMega('none')}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || activeMega !== 'none'
            ? 'bg-[#08090C]/95 backdrop-blur-md border-b border-[#242632] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#08090C]/90 via-[#08090C]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Zone 1: TGLC Crest & Single-Line Wordmark */}
            <button
              onClick={() => {
                navigateTo('home');
                closeAll();
              }}
              className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B98633] group shrink-0"
              aria-label="The Global Luxury Consortium Home"
            >
              <div className="w-8 h-10 sm:w-9 sm:h-11 flex items-center justify-center shrink-0">
                <img
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt="TGLC Insignia"
                  className="w-full h-full object-contain filter brightness-105 contrast-105 drop-shadow-[0_2px_10px_rgba(185,134,51,0.35)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="hidden md:inline font-serif text-lg sm:text-xl font-normal tracking-[0.14em] uppercase text-[#F4F1EA] group-hover:text-[#CFA85E] transition-colors whitespace-nowrap">
                The Global Luxury Consortium
              </span>
              <span className="md:hidden font-serif text-base tracking-[0.18em] uppercase text-[#F4F1EA] group-hover:text-[#CFA85E] transition-colors whitespace-nowrap">
                TGLC
              </span>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[13px] font-medium text-[#D9D4CA]">
              <button
                onClick={() => {
                  if (activeMega === 'consortium') {
                    navigateTo('consortium');
                    closeAll();
                  } else {
                    setActiveMega('consortium');
                  }
                }}
                onMouseEnter={() => setActiveMega('consortium')}
                className={`relative flex items-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('consortium') || activeMega === 'consortium'
                    ? 'text-[#CFA85E]'
                    : 'text-[#D9D4CA]'
                }`}
              >
                <span>The Consortium</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === 'consortium' ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                {(isCurrent('consortium') || activeMega === 'consortium') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </button>

              <button
                onClick={() => {
                  if (activeMega === 'services') {
                    navigateTo('services');
                    closeAll();
                  } else {
                    setActiveMega('services');
                  }
                }}
                onMouseEnter={() => setActiveMega('services')}
                className={`relative flex items-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('services') || activeMega === 'services'
                    ? 'text-[#CFA85E]'
                    : 'text-[#D9D4CA]'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === 'services' ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                {(isCurrent('services') || activeMega === 'services') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </button>

              <button
                onClick={() => {
                  if (activeMega === 'hidden-london') {
                    navigateTo('hidden-london');
                    closeAll();
                  } else {
                    setActiveMega('hidden-london');
                  }
                }}
                onMouseEnter={() => setActiveMega('hidden-london')}
                className={`relative flex items-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('hidden-london') || activeMega === 'hidden-london'
                    ? 'text-[#CFA85E]'
                    : 'text-[#DDB872]'
                }`}
              >
                <span>The Other Side of London</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === 'hidden-london' ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                {(isCurrent('hidden-london') || activeMega === 'hidden-london') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </button>

              <button
                onClick={() => { navigateTo('commission-studio'); closeAll(); }}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-white ${
                  isCurrent('commission-studio') ? 'text-[#E2BA6B]' : 'text-[#D4D8E2]'
                }`}
              >
                <Compass className="w-3 h-3 text-[#C4933F]" />
                <span>Commission Studio</span>
                {isCurrent('commission-studio') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </button>

              <button
                onClick={() => { navigateTo('case-studies'); closeAll(); }}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('case-studies') ? 'text-[#CFA85E]' : 'text-[#D9D4CA]'
                }`}
              >
                Case Studies
                {isCurrent('case-studies') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </button>

              <button
                onClick={() => { navigateTo('membership'); closeAll(); }}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('membership') ? 'text-white' : 'text-[#D9D4CA]'
                }`}
              >
                Membership
                {isCurrent('membership') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </button>

              <button
                onClick={() => { navigateTo('calendar'); closeAll(); }}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('calendar') ? 'text-white' : 'text-[#D9D4CA]'
                }`}
              >
                Calendar
                {isCurrent('calendar') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </button>

              <button
                onClick={() => { navigateTo('journal'); closeAll(); }}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                  isCurrent('journal') ? 'text-white' : 'text-[#D9D4CA]'
                }`}
              >
                Journal
                {isCurrent('journal') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </button>

              <button
                onClick={() => { navigateTo('member-portal'); closeAll(); }}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-white ${
                  isCurrent('member-portal') ? 'text-[#CFA85E]' : 'text-[#9C968A]'
                }`}
              >
                <Lock className="w-3 h-3 text-[#C4933F]" />
                <span>Portal</span>
                {isCurrent('member-portal') && (
                  <motion.span
                    layoutId="headerActiveNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B98633]"
                  />
                )}
              </button>
            </nav>

            {/* Zone 3: Search, Console Lock & Primary CTA */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={openSearch}
                className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 text-xs text-[#D9D4CA] hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8B672B] border border-transparent hover:border-[#242632]"
                aria-label="Search services, articles, and calendar"
              >
                <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#C4933F]" />
                <span className="hidden xl:inline text-[11px] text-[#9C968A]">Search</span>
              </button>

              <button
                onClick={() => {
                  if (typeof (window as any).tglcLockConsole === 'function') {
                    (window as any).tglcLockConsole();
                  }
                }}
                className="hidden sm:inline-flex p-2 text-[#8E8A83] hover:text-[#CFA85E] transition-colors focus:outline-none"
                title="Lock Console"
                aria-label="Lock Console"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => openIntroductionModal('General Membership & Private Conversation')}
                className="btn-gold px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span className="hidden sm:inline">Request Introduction</span>
                <span className="sm:hidden">Inquire</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
              </motion.button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#F4F1EA] hover:text-[#CFA85E] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B98633] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-[#CFA85E]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            MEGA MENUS (AnimatePresence smooth reveal)
            ===================================================================== */}
        <AnimatePresence>
          {activeMega === 'consortium' && (
            <motion.div
              key="mega-consortium"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-[#0B0C10]/98 border-b border-[#242632] shadow-2xl py-8 px-6 sm:px-12 backdrop-blur-2xl"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#1E202B]">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#C4933F] font-medium">
                      Institutional Architecture
                    </span>
                    <h3 className="font-serif text-2xl text-[#F4F1EA] mt-0.5">
                      The Consortium · Seven Institutional Foundations
                    </h3>
                  </div>
                  <button
                    onClick={() => { navigateTo('consortium'); closeAll(); }}
                    className="text-xs text-[#CFA85E] hover:text-white flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <span>Explore Consortium Overview</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Top 4 Visual Consortium Cards (Matching Services Mega Menu) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {CONSORTIUM_PILLARS.slice(0, 4).map((pillar, idx) => (
                    <motion.div
                      key={pillar.page}
                      initial={{ opacity: 0.85, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => { navigateTo(pillar.page as any); closeAll(); }}
                      className="group cursor-pointer p-4 bg-[#12141C] hover:bg-[#171A24] border border-[#222430] hover:border-[#B98633]/60 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[16/9] w-full overflow-hidden mb-3 bg-[#181A22]">
                          <img
                            src={pillar.image}
                            alt={pillar.label}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover ${
                              pillar.focalTop ? 'object-top' : 'object-center'
                            } group-hover:scale-105 transition-transform duration-500 filter brightness-105 contrast-105`}
                          />
                        </div>
                        <span className="text-[10px] tracking-wider text-[#C4933F]">{pillar.kicker}</span>
                        <h4 className="font-serif text-base text-[#F4F1EA] group-hover:text-[#CFA85E] mt-1 mb-1 flex items-center justify-between gap-2 transition-colors">
                          <span>{pillar.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#CFA85E]" />
                        </h4>
                        <p className="text-xs text-[#9C968A] line-clamp-2 leading-relaxed font-light">{pillar.desc}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#C4933F] font-medium">
                        {pillar.actionLabel}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom 3 Visual Consortium Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {CONSORTIUM_PILLARS.slice(4).map((pillar, idx) => (
                    <motion.div
                      key={pillar.page}
                      initial={{ opacity: 0.85, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.14 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => { navigateTo(pillar.page as any); closeAll(); }}
                      className="group cursor-pointer p-4 bg-[#12141C] hover:bg-[#171A24] border border-[#222430] hover:border-[#B98633]/60 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[21/9] w-full overflow-hidden mb-2.5 bg-[#181A22]">
                          <img
                            src={pillar.image}
                            alt={pillar.label}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover ${
                              pillar.focalTop ? 'object-top' : 'object-center'
                            } group-hover:scale-105 transition-transform duration-500 filter brightness-105 contrast-105`}
                          />
                        </div>
                        <span className="text-[10px] tracking-wider text-[#C4933F]">{pillar.kicker}</span>
                        <h4 className="font-serif text-base text-[#F4F1EA] group-hover:text-[#CFA85E] mt-1 mb-1 flex items-center justify-between gap-2 transition-colors">
                          <span>{pillar.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#CFA85E]" />
                        </h4>
                        <p className="text-xs text-[#9C968A] line-clamp-2 leading-relaxed font-light">{pillar.desc}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#C4933F] font-medium">
                        {pillar.actionLabel}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Compact House Stewards & Mayfair Direct Strip */}
                <div className="mt-5 pt-4 border-t border-[#1E202B] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8A83]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[#CFA85E] font-medium">Stewards:</span>
                    <span className="text-[#D9D4CA]">Mickell Washington · Leance Djedje · Melize Nastaasia</span>
                    <span aria-hidden="true" className="text-[#4A4E5E]">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C4933F]" />
                      <span>TGLC House · 3rd Floor, 45 Albemarle Street, W1S 4JL</span>
                    </span>
                    <span aria-hidden="true" className="text-[#4A4E5E]">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums text-[#D9D4CA]">
                      <Phone className="w-3 h-3 text-[#C4933F]" />
                      <span>{TGLC_CONTACT.telephone}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => { openIntroductionModal('General Membership & Private Conversation'); closeAll(); }}
                    className="text-xs text-[#DDB872] hover:text-white flex items-center gap-1 font-medium transition-colors shrink-0"
                  >
                    <span>Request Introduction →</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeMega === 'services' && (
            <motion.div
              key="mega-services"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-[#0B0C10]/98 border-b border-[#242632] shadow-2xl py-8 px-6 sm:px-12 backdrop-blur-2xl"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#1E202B]">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#C4933F] font-medium">Services Directory</span>
                    <h3 className="font-serif text-2xl text-[#F4F1EA] mt-0.5">Seven Pillars of Private Lifestyle Management</h3>
                  </div>
                  <button
                    onClick={() => { navigateTo('services'); closeAll(); }}
                    className="text-xs text-[#CFA85E] hover:text-white flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <span>View Full Services Overview</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {SERVICES_DATA.slice(0, 4).map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => { navigateTo('service-detail', { serviceId: cat.id }); closeAll(); }}
                      className="group cursor-pointer p-4 bg-[#12141C] hover:bg-[#171A24] border border-[#222430] hover:border-[#B98633]/60 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[16/9] w-full overflow-hidden mb-3 bg-[#181A22]">
                          <img
                            src={cat.heroImage}
                            alt={cat.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105 contrast-105"
                          />
                        </div>
                        <span className="text-[10px] tracking-wider text-[#C4933F]">{cat.kicker}</span>
                        <h4 className="font-serif text-base text-[#F4F1EA] group-hover:text-[#CFA85E] mt-1 mb-1 flex items-center justify-between transition-colors">
                          <span>{cat.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#CFA85E]" />
                        </h4>
                        <p className="text-xs text-[#9C968A] line-clamp-2 leading-relaxed font-light">{cat.shortDesc}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#C4933F] font-medium">
                        {cat.subServices.length} Sub-Practices Available →
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {SERVICES_DATA.slice(4).map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => { navigateTo('service-detail', { serviceId: cat.id }); closeAll(); }}
                      className="group cursor-pointer p-4 bg-[#12141C] hover:bg-[#171A24] border border-[#222430] hover:border-[#B98633]/60 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[21/9] w-full overflow-hidden mb-2.5 bg-[#181A22]">
                          <img
                            src={cat.heroImage}
                            alt={cat.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105 contrast-105"
                          />
                        </div>
                        <span className="text-[10px] tracking-wider text-[#C4933F]">{cat.kicker}</span>
                        <h4 className="font-serif text-base text-[#F4F1EA] group-hover:text-[#CFA85E] mt-1 mb-1 flex items-center justify-between transition-colors">
                          <span>{cat.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#CFA85E]" />
                        </h4>
                        <p className="text-xs text-[#9C968A] line-clamp-2 leading-relaxed font-light">{cat.shortDesc}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#C4933F] font-medium">
                        {cat.subServices.length} Sub-Practices Available →
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeMega === 'hidden-london' && (
            <motion.div
              key="mega-hidden-london"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-[#0A0C10]/98 border-b border-[#242632] shadow-2xl py-8 px-6 sm:px-12 backdrop-blur-2xl"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#1E202B]">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#C4933F] font-medium block">
                      The Sub-Rosa Network · London Clandestine Desk
                    </span>
                    <h3 className="font-serif text-2xl text-[#F4F1EA] mt-0.5">
                      The Other Side of London: Unlisted Sectors & Sanctums
                    </h3>
                  </div>
                  <button
                    onClick={() => { navigateTo('hidden-london'); closeAll(); }}
                    className="text-xs text-[#CFA85E] hover:text-white flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <span>Explore Full Clandestine Hub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 max-h-[62vh] overflow-y-auto pr-1">
                  {SUB_ROSA_SECTORS.map((sec) => (
                    <div
                      key={sec.page}
                      onClick={() => { navigateTo(sec.page as any); closeAll(); }}
                      className={`group cursor-pointer p-4 border transition-all duration-200 flex flex-col justify-between ${
                        sec.highlight
                          ? 'bg-[#151218] hover:bg-[#1E1A22] border-[#8B672B] hover:border-[#CFA85E]'
                          : 'bg-[#11131B] hover:bg-[#171A24] border-[#222532] hover:border-[#B98633]/60'
                      }`}
                    >
                      <div>
                        <div className="aspect-[16/10] w-full overflow-hidden mb-3 bg-[#181A22]">
                          <img
                            src={sec.image}
                            alt={sec.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105 contrast-105"
                          />
                        </div>
                        <span className="text-[10px] tracking-wider text-[#CFA85E]">{sec.sector}</span>
                        <h4 className="font-serif text-base text-[#F4F1EA] group-hover:text-[#CFA85E] mt-1 mb-1.5 transition-colors">
                          {sec.title}
                        </h4>
                        <p className="text-[11px] text-[#9C968A] line-clamp-3 leading-relaxed font-light">{sec.desc}</p>
                      </div>
                      <div className="mt-4 pt-2.5 border-t border-[#1E202B] text-[11px] text-[#CFA85E] font-medium flex items-center justify-between">
                        <span>Open Dossier</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#1E202B] flex flex-wrap items-center justify-between text-xs text-[#8E8A83]">
                  <span>
                    Sub-Rosa Desk Direct:{' '}
                    <span className="text-[#CFA85E] font-medium tabular-nums">{TGLC_CONTACT.telephone}</span> · Sovereign Introduction Required
                  </span>
                  <button
                    onClick={() => { openIntroductionModal('Sub-Rosa & Clandestine London Inquiry'); closeAll(); }}
                    className="text-xs text-[#DDB872] hover:text-white flex items-center gap-1 font-medium transition-colors"
                  >
                    <span>Request Sub-Rosa Clearance →</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* =====================================================================
          MOBILE FULL-VIEWPORT NAVIGATION DRAWER
          ===================================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[100] bg-[#08090C] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#20222C] bg-[#0D0F15]">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt="TGLC"
                  className="w-8 h-10 object-contain filter brightness-105"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-base tracking-[0.16em] text-[#F4F1EA]">The Global Luxury Consortium</span>
                  <span className="text-[10px] text-[#C4933F]">Mayfair · London W1S 4JL</span>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#D9D4CA] hover:text-[#CFA85E] focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSearch();
                }}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-[#12141C] border border-[#242632] text-[#9C968A] hover:text-white transition-colors text-xs"
              >
                <span className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#CFA85E]" />
                  <span>Search practices, articles, calendar...</span>
                </span>
                <kbd className="text-[10px] text-[#8E8A83] border border-[#242632] px-1.5 py-0.5">⌘K</kbd>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { navigateTo('member-portal'); setIsMobileMenuOpen(false); }}
                  className="py-3 px-2 text-xs text-[#F4F1EA] border border-[#282B36] bg-[#12141C] flex items-center justify-center gap-2 font-medium"
                >
                  <Lock className="w-3.5 h-3.5 text-[#CFA85E]" />
                  <span>Member Portal</span>
                </button>
                <button
                  onClick={() => { openIntroductionModal(); setIsMobileMenuOpen(false); }}
                  className="btn-gold py-3 px-2 text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Introduction</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
                </button>
              </div>

              <div className="space-y-1 divide-y divide-[#1A1C24] pt-2">
                <button
                  onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </button>

                {/* Consortium Accordion (Title Case) */}
                <div className="py-1">
                  <button
                    onClick={() => setMobileConsortiumExpanded(!mobileConsortiumExpanded)}
                    className="w-full text-left py-2.5 min-h-[44px] text-sm font-medium text-[#F4F1EA] flex items-center justify-between"
                  >
                    <span>The Consortium</span>
                    <ChevronDown className={`w-4 h-4 text-[#888] transition-transform ${mobileConsortiumExpanded ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileConsortiumExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 py-1.5 space-y-0.5 mt-1 overflow-hidden"
                      >
                        {CONSORTIUM_PILLARS.map((item) => (
                          <button
                            key={item.page}
                            onClick={() => { navigateTo(item.page as any); setIsMobileMenuOpen(false); }}
                            className="flex items-center min-h-[44px] text-sm font-serif text-[#D9D4CA] hover:text-[#CFA85E] py-2 text-left w-full"
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Services Accordion (Title Case) */}
                <div className="py-1">
                  <button
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                    className="w-full text-left py-2.5 min-h-[44px] text-sm font-medium text-[#F4F1EA] flex items-center justify-between"
                  >
                    <span>Services & Seven Pillars</span>
                    <ChevronDown className={`w-4 h-4 text-[#888] transition-transform ${mobileServicesExpanded ? 'rotate-180 text-[#CFA85E]' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileServicesExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 py-1.5 space-y-0.5 mt-1 overflow-hidden"
                      >
                        <button
                          onClick={() => { navigateTo('services'); setIsMobileMenuOpen(false); }}
                          className="flex items-center min-h-[44px] text-sm font-serif text-[#CFA85E] py-2 font-medium text-left w-full"
                        >
                          All Services Overview
                        </button>
                        {SERVICES_DATA.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => { navigateTo('service-detail', { serviceId: s.id }); setIsMobileMenuOpen(false); }}
                            className="flex items-center min-h-[44px] text-sm font-serif text-[#D9D4CA] hover:text-white py-2 text-left w-full"
                          >
                            {s.title}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sub-Rosa Accordion (Title Case) */}
                <div className="py-1">
                  <button
                    onClick={() => setMobileHiddenLondonExpanded(!mobileHiddenLondonExpanded)}
                    className="w-full text-left py-2.5 min-h-[44px] text-sm font-medium text-[#DDB872] flex items-center justify-between"
                  >
                    <span>The Other Side of London</span>
                    <ChevronDown className={`w-4 h-4 text-[#CFA85E] transition-transform ${mobileHiddenLondonExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileHiddenLondonExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 py-1.5 space-y-0.5 mt-1 overflow-hidden bg-[#12141C]/60"
                      >
                        <button
                          onClick={() => { navigateTo('hidden-london'); setIsMobileMenuOpen(false); }}
                          className="flex items-center min-h-[44px] text-sm font-serif text-[#CFA85E] py-2 font-medium text-left w-full"
                        >
                          Overview Clandestine Hub
                        </button>
                        {SUB_ROSA_SECTORS.map((sec) => (
                          <button
                            key={sec.page}
                            onClick={() => { navigateTo(sec.page as any); setIsMobileMenuOpen(false); }}
                            className="flex items-center min-h-[44px] text-sm font-serif text-[#D9D4CA] hover:text-[#CFA85E] py-2 text-left w-full"
                          >
                            {sec.mobileTitle}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => { navigateTo('commission-studio'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-3 min-h-[44px] text-sm font-medium text-[#CFA85E] hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C4933F]" />
                    <span>Private Commission Studio</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#CFA85E]" />
                </button>

                <button
                  onClick={() => { navigateTo('case-studies'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>Case Studies (24 Itineraries)</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </button>

                <button
                  onClick={() => { navigateTo('membership'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>Membership</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </button>

                <button
                  onClick={() => { navigateTo('calendar'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>London Calendar</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </button>

                <button
                  onClick={() => { navigateTo('journal'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>Journal</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </button>

                <button
                  onClick={() => { navigateTo('faq'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>Frequently Asked Questions</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </button>

                <button
                  onClick={() => { navigateTo('contact'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-3 min-h-[44px] text-sm font-medium text-[#F4F1EA] hover:text-[#CFA85E] transition-colors flex items-center justify-between"
                >
                  <span>Contact & Mayfair Office</span>
                  <ChevronRight className="w-4 h-4 text-[#555]" />
                </button>
              </div>

              <div className="pt-4 border-t border-[#1E202B] text-xs text-[#8E8A83] space-y-1.5">
                <p className="font-serif text-[#F4F1EA] text-sm">TGLC House · Mayfair</p>
                <p>{TGLC_CONTACT.address.toString()}</p>
                <p className="text-[#CFA85E] pt-1 text-sm font-medium tabular-nums">
                  Company Line: {TGLC_CONTACT.telephone}
                </p>
                <p className="text-[#9C968A]">{TGLC_CONTACT.email}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
