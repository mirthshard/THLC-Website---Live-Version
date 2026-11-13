import React, { useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { useNavigation } from '../../context/NavigationContext';
import { SERVICES_DATA, ETHOS_PRINCIPLES, LONDON_NEIGHBOURHOODS, TGLC_CONTACT } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import { ArrowUpRight, Lock, Compass, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const sectionStaggerVariants = {
  hidden: { opacity: 0.9 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const blockItemVariants = {
  hidden: { opacity: 0.88, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const imagePlateVariants = {
  hidden: { opacity: 0.86, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const HOME_SECTION_JUMPS = [
  { id: 'section-pillars', label: 'I–VI Pillars' },
  { id: 'section-sub-rosa', label: 'Sub-Rosa' },
  { id: 'section-commission', label: 'Commission Studio' },
  { id: 'section-showcase', label: 'Sovereign Standard' },
  { id: 'section-services', label: 'Seven Practices' },
  { id: 'section-cases', label: '24 Itineraries' },
  { id: 'section-difference', label: 'Difference' },
  { id: 'section-enclaves', label: 'London Enclaves' },
] as const;

const LIFESTYLE_PILLARS = [
  {
    id: 'chauffeur-fleet',
    label: 'Chauffeur & Fleet',
    kicker: 'The London Arrival',
    title: 'The Modern English Gentleman & Lady: Motion with Poise',
    image: '/assets/aistudio/rolls-cullian-featured_a41abfa9.webp',
    secondaryImage: '/assets/aistudio/best-luxury-cars-2024_ab87bb7b.webp',
    tagline: 'A Rolls-Royce waiting in the evening twilight, doors opened with quiet military precision.',
    narrative: [
      'In a capital of relentless pace, true luxury is unhurried serenity. Our chauffeurs hold advanced defensive driving credentials, arrive impeccably attired, and anticipate the rhythm of your evening without a single unnecessary word.',
      'From private galas in Mayfair to thirty-second tarmac handovers at Battersea Heliport, each vehicle operates as a private mobile sanctuary stocked precisely to your dossier.',
    ],
    features: [
      'Rolls-Royce Phantom & Cullinan, Bentley Flying Spur, Mercedes-Maybach',
      'Door-to-door umbrella protocol, discreet luggage staging, and route scouting',
      'Direct apron coordination at RAF Northolt, Farnborough, and Biggin Hill',
    ],
    ctaText: 'Explore Chauffeur & Fleet Practice',
    targetService: 'transport-security',
  },
  {
    id: 'savile-row-horology',
    label: 'Savile Row & Haute Horlogerie',
    kicker: 'Rare Commissions',
    title: 'Bespoke Sartorial Distinction & Master Timepieces',
    image: '/assets/aistudio/savile_row_bespoke.jpg',
    secondaryImage: '/assets/aistudio/About-Luxury-Watches_77cb4520.jpg',
    tagline: 'When off-the-shelf luxury is inadequate, we introduce you directly to the master.',
    narrative: [
      'An enduring British wardrobe is defined by quiet proportion rather than logos. We arrange private consultations with senior Savile Row cutters who attend your London residence for basted fittings across evening dinner jackets, cashmere coats, and field tailoring.',
      'For collectors of fine mechanics, our horology desk sources archival Patek Philippe, Rolex, and independent Geneva references directly from trusted private custodians.',
    ],
    features: [
      'In-residence fittings with head cutters along Savile Row and Sackville Street',
      'Provenance-verified sourcing of archival chronographs and tourbillons',
      'High jewellery design with untreated natural gemstones and Bond Street specialists',
    ],
    ctaText: 'Explore Sourcing & Watches',
    targetService: 'luxury-sourcing',
  },
  {
    id: 'sub-rosa-london',
    label: 'Sub-Rosa Access & Urban Vaults',
    kicker: 'The Unlisted Network',
    title: 'UFC Cageside, Hip-Hop Sound Vaults & Shoreditch Lofts',
    image: '/assets/aistudio/urban_hiphop_club_1794391691841.jpg',
    secondaryImage: '/assets/aistudio/shoreditch_dj_loft_1794391691810.jpg',
    tagline: 'Where public ticketing stops, the private security corridor and sound lock open.',
    narrative: [
      'Beyond St James’s drawing rooms lies London’s raw cultural pulse. Through direct relationships with championship fight promoters, acoustic arch custodians, and independent vinyl selectors, our principals sit ringside at The O2 or hold midnight buyouts inside sound-isolated Vauxhall railway vaults.',
      'After hours, satin-black Maybachs slip quietly down rear service lanes into Soho street-couture archives, Shoreditch DJ lofts, and 300-year-old Square Mile bullion vaults.',
    ],
    features: [
      'Vauxhall brick sound vaults & Shoreditch rooftop rotary-mixer hip-hop sessions',
      'UFC London Octagon cageside seats with accredited athlete warmup room access',
      'Locked-door Soho street-couture showrooms and Maybach alley departures',
    ],
    ctaText: 'Explore Sub-Rosa Access',
    targetPage: 'hidden-london',
  },
  {
    id: 'harrods-liberty',
    label: 'Bond Street & Heritage Salons',
    kicker: 'Private Salons',
    title: 'Closed-Door Shopping & Landmark London Suites',
    image: '/assets/aistudio/bond_street_jewellery.jpg',
    secondaryImage: '/assets/aistudio/liberty-department-store-640x360_44860915.jpg',
    tagline: 'Private lift access to the penthouse dressing suites of Mayfair and Knightsbridge.',
    narrative: [
      'Bypass retail crowds entirely. Through longstanding relationships with heritage houses along Old Bond Street, Mount Street, and Knightsbridge, we unlock private upstairs salons after closing hours.',
      'High jewellery parures and seasonal runway capsules from Paris and Milan are brought to your residence or hotel suite for unhurried inspection ahead of public release.',
    ],
    features: [
      'Private Knightsbridge penthouse styling suites arranged out of hours',
      'Closed vault viewings along Old Bond Street, Mount Street, and Burlington Arcade',
      'White-glove diplomatic export, insurance scheduling, and doorstep courier delivery',
    ],
    ctaText: 'Explore Culture & Private Salons',
    targetService: 'experiences-culture',
  },
  {
    id: 'aviation-estates',
    label: 'Aviation & Stately Manors',
    kicker: 'Sovereign Freedom',
    title: 'Intercontinental Wings & English Country Estates',
    image: '/assets/aistudio/698157105b08bd0b828e954b_file_k95qb05z_c7bc7f74.png',
    secondaryImage: '/assets/aistudio/highland_stone_estate_1794391698042.jpg',
    tagline: 'From private FBO tarmac to a lit Cotswolds hearth in under an hour.',
    narrative: [
      'True freedom is the elimination of travel friction. Our aviation practice matches Part 135 ultra-long-range Bombardier and Gulfstream hulls with direct apron car transfers so departure feels like stepping from one drawing room to another.',
      'Across Oxfordshire, Hampshire, and the Cotswolds, we provision unlisted historic estates before you land—woodfires lit, wine cellars opened, and country field sports briefed down to the cartridge.',
    ],
    features: [
      'Private terminal transfers at RAF Northolt, London Farnborough, and Biggin Hill',
      'Full manor house provisioning with live-in butlers, country chefs, and gamekeepers',
      'Twin-engine AgustaWestland helicopter transfers between Battersea and private lawns',
    ],
    ctaText: 'Explore Aviation & Estates',
    targetService: 'travel-aviation',
  },
];

const DIFFERENCE_IMAGERY = [
  '/assets/aistudio/tglc_st_james_salon.jpg',
  '/assets/aistudio/wembley_vip_hospitality.jpg',
  '/assets/aistudio/five_star_mayfair_suite.jpg',
  '/assets/aistudio/corporate_ea_boardroom.jpg',
  '/assets/aistudio/Main-5_c9bf5214.png',
];

export const HomePage: React.FC = () => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const [activeTab, setActiveTab] = useState(0);

  const currentPillar = LIFESTYLE_PILLARS[activeTab];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#08090C] text-[#F4F1EA] selection:bg-[#B98633]/30 selection:text-[#F4F1EA]">
      {/* 1. Full-Screen Cinematic Hero Carousel */}
      <HeroCarousel />

      <GoldDivider />

      {/* 2. Authoritative Introduction with Unified Crest Emblem on Seamless Pure Black */}
      <section id="section-pillars" className="relative overflow-hidden border-b border-[#1A1C24] bg-[#08090C] scroll-mt-20">
        <div className="bg-black pt-10 sm:pt-14 pb-6 px-6 sm:px-12 relative z-10">
          <motion.div
            variants={sectionStaggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-5"
          >
            <motion.div variants={imagePlateVariants} className="flex justify-center">
              <img
                src="/assets/aistudio/tglc_lockup_transparent.png"
                alt="The Global Luxury Consortium Crest & Wordmark"
                className="w-44 sm:w-52 h-auto object-contain block"
              />
            </motion.div>

            <motion.span
              variants={blockItemVariants}
              className="text-[11px] uppercase tracking-[0.28em] text-[#C4933F] font-medium block tabular-nums pt-1"
            >
              Mayfair Private Office · 3rd Floor, 45 Albemarle Street, London W1S 4JL
            </motion.span>

            <motion.h2
              variants={blockItemVariants}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-[#F4F1EA] max-w-5xl mx-auto text-balance"
            >
              Opening doors that don’t usually exist. Discretion by default, British poise by nature.
            </motion.h2>

            <motion.p
              variants={blockItemVariants}
              className="text-xs sm:text-sm text-[#B5AFA3] max-w-3xl mx-auto leading-relaxed font-light"
            >
              Luxury is not defined by how much somebody spends—it is defined by how exceptionally they are treated. From our Mayfair desk, The Global Luxury Consortium acts as a trusted intermediary connecting private and corporate clients with carefully sourced experiences, executive transport, and considered lifestyle solutions.
            </motion.p>

            <motion.div
              variants={blockItemVariants}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B98633] to-transparent mx-auto my-1"
            />
          </motion.div>
        </div>

        <div className="h-6 bg-gradient-to-b from-black to-[#08090C]" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-5 sm:px-12 pb-10 sm:pb-14 relative z-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t border-[#1D1F28] pt-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] font-medium block">
                Six Core Concierge Pillars
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F1EA] mt-1">
                Core Areas of Private Representation
              </h3>
            </div>
            <span className="text-xs text-[#9C968A] font-light">
              Tailored coordination across every mandate—from £100 engagements to sovereign itineraries.
            </span>
          </div>

          <motion.div
            variants={sectionStaggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                num: 'I.',
                kicker: 'Pillar One · Hospitality & Suites',
                title: 'VIP Ticketing & Sporting Boxes',
                desc: 'Premier League derby boxes, Champions League finals, world-title fight nights, and major cultural festivals. We connect principals directly with authorised suite holders—handling seating, fine dining, and quiet matchday coordination without stress.',
                route: 'service-detail' as const,
                params: { serviceId: 'experiences-culture' },
              },
              {
                num: 'II.',
                kicker: 'Pillar Two · Accommodation',
                title: 'Luxury Suites & Country Estates',
                desc: 'London five-star hotel suites, discreet mews townhouses, and staffed countryside estates arranged on tailored terms. Every stay—whether an overnight boardroom trip or an extended family summer—is verified before your luggage crosses the threshold.',
                route: 'service-detail' as const,
                params: { serviceId: 'residences-relocation' },
              },
              {
                num: 'III.',
                kicker: 'Pillar Three · Chauffeurs',
                title: 'Executive Ground Transportation',
                desc: 'Immaculate Rolls-Royce, Mercedes-Maybach, and Range Rover fleets driven by vetted defensive chauffeurs who know London’s mews lanes by heart. Seamless transfers between private aviation aprons, residences, and late evening tables.',
                route: 'service-detail' as const,
                params: { serviceId: 'transport-security' },
              },
              {
                num: 'IV.',
                kicker: 'Pillar Four · Aviation & Sea',
                title: 'Private Aviation & Coastal Charters',
                desc: 'Direct Part 135 charter sourcing across RAF Northolt, Farnborough, and continental hubs alongside vetted yacht tenders—moving you effortlessly from boardroom meetings straight onto alpine valleys or Mediterranean moorings.',
                route: 'service-detail' as const,
                params: { serviceId: 'travel-aviation' },
              },
              {
                num: 'V.',
                kicker: 'Pillar Five · Dining & Private Clubs',
                title: 'Private Dining & Social Access',
                desc: 'Hard-to-reach corner tables in Mayfair and St James’s, sommelier cellar rooms, and personal introductions to historic private members’ clubs—coordinated discreetly through long-standing maître d’ relationships.',
                route: 'service-detail' as const,
                params: { serviceId: 'dining-nightlife' },
              },
              {
                num: 'VI.',
                kicker: 'Pillar Six · Private Sourcing',
                title: 'Sartorial Craft & Objects of Desire',
                desc: 'In-residence Savile Row basted fittings, independent watchmaker introductions, rare cellar bottles, and closed-door Bond Street previews—sourced directly through primary craftspeople with clear pass-through terms.',
                route: 'service-detail' as const,
                params: { serviceId: 'luxury-sourcing' },
              },
            ].map((pillar) => (
              <motion.div
                key={pillar.num}
                variants={blockItemVariants}
                whileHover={{ y: -4 }}
                onClick={() => navigateTo(pillar.route, pillar.params)}
                className="group relative cursor-pointer space-y-3 p-6 bg-[#0C0D12] border border-[#1E202B] hover:border-[#CFA85E]/70 transition-colors flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl text-[#CFA85E] font-light tabular-nums">{pillar.num}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8B672B] group-hover:text-[#CFA85E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <span className="text-xs tracking-wide text-[#C4933F] font-medium block">{pillar.kicker}</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EA] group-hover:text-[#E2BA6B] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A5A096] leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-4">
                  <span className="block h-[1px] w-full bg-[#1C1E28] relative overflow-hidden">
                    <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-[#8B672B] via-[#E2BA6B] to-[#C4933F] transition-all duration-500" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Standalone House Covenant Architectural Ribbon */}
          <motion.div
            variants={blockItemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            onClick={() => navigateTo('ethos')}
            className="group relative cursor-pointer bg-[#0D1017] border border-[#2A2D3B] hover:border-[#CFA85E]/80 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors"
          >
            <span aria-hidden="true" className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#CFA85E]" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#CFA85E]" />
            <div className="space-y-2 max-w-4xl">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#CFA85E] font-medium block">
                House Covenant · Our Operating Standard
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors">
                Discretion by Default & Sound Poise
              </h3>
              <p className="text-xs sm:text-sm text-[#C4BFB5] leading-relaxed font-light">
                Whether a £100 dinner arrangement or a £100,000 sovereign itinerary, our standard never shifts: human conversations instead of call queues, zero member publicity, and relationship-led judgment from 45 Albemarle Street.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E2BA6B] group-hover:text-[#FAF7F0] transition-colors">
              <span>Read Ethos & Covenant</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            variants={blockItemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-2"
          >
            <button
              onClick={() => openIntroductionModal('Introductory Consultation')}
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 min-h-[44px]"
            >
              <span>Begin a Private Conversation</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
            </button>
            <button
              onClick={() => navigateTo('commission-studio')}
              className="btn-outline-gold px-7 py-3.5 text-xs flex items-center gap-2 min-h-[44px]"
            >
              <Sliders className="w-3.5 h-3.5 text-[#E2BA6B]" />
              <span>Private Commission Studio</span>
            </button>
            <button
              onClick={() => navigateTo('hidden-london')}
              className="px-6 py-3.5 text-xs text-[#D4D8E2] hover:text-[#E2BA6B] transition-colors flex items-center gap-2 min-h-[44px]"
            >
              <Lock className="w-3.5 h-3.5 text-[#8B672B]" />
              <span>Explore Sub-Rosa London</span>
            </button>
          </motion.div>

          {/* Architectural In-Page Quick-Jump Navigator */}
          <motion.nav
            aria-label="Home page sections"
            variants={blockItemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="pt-4 border-t border-[#171922] flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto pb-1"
          >
            {HOME_SECTION_JUMPS.map((jump, jIdx) => (
              <button
                key={jump.id}
                type="button"
                onClick={() => scrollToSection(jump.id)}
                className="min-h-[44px] px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-[#9C968A] hover:text-[#CFA85E] hover:bg-[#101219] border border-transparent hover:border-[#242632] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span className="text-[#8B672B] tabular-nums">{String(jIdx + 1).padStart(2, '0')}</span>
                <span>{jump.label}</span>
              </button>
            ))}
          </motion.nav>
        </div>
      </section>

      <GoldDivider />

      {/* 3. Sub-Rosa London Spotlight */}
      <section id="section-sub-rosa" className="py-10 sm:py-14 border-b border-[#1A1C24] bg-[#07080B] relative overflow-hidden scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto px-6 sm:px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              variants={imagePlateVariants}
              className="lg:col-span-7 relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1017] border border-[#242632] shadow-2xl group">
                <motion.img
                  src="/assets/aistudio/hidden_nocturne_stealth_boat_1794295325076.jpg"
                  alt="The Other Side of London: Stealth Nocturne and Subterranean Sanctums"
                  referrerPolicy="no-referrer"
                  animate={{ scale: [1.03, 1, 1.02] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full object-cover filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/92 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#07080B]/88 backdrop-blur-md p-4 border border-[#242632]">
                  <span className="tglc-kicker block mb-1">
                    Arena Combat, Hip-Hop Sound Vaults & River Stealth
                  </span>
                  <p className="font-serif italic text-sm text-[#FAF7F0]">
                    “Churchill’s sealed citadels, Vauxhall railway bass vaults, Shoreditch vinyl lofts, and midnight Thames sprints.”
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={sectionStaggerVariants}
              className="lg:col-span-5 space-y-5"
            >
              <motion.span variants={blockItemVariants} className="text-xs uppercase tracking-[0.22em] text-[#CFA85E] font-medium block">
                The Unlisted Network
              </motion.span>

              <motion.h2 variants={blockItemVariants} className="font-serif text-3xl sm:text-5xl text-[#F4F1EA] leading-tight">
                The other side of London.
              </motion.h2>

              <motion.p variants={blockItemVariants} className="font-serif italic text-base sm:text-lg text-[#CFA85E]">
                “Beyond Mayfair tea rooms lies the capital’s covert pulse.”
              </motion.p>

              <motion.div variants={blockItemVariants} className="space-y-3 text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                <p>
                  Through personal alliances with championship fight promoters, historic estate custodians, and underground gallerists, TGLC unlocks rooms invisible to the public calendar.
                </p>
                <p>
                  Step inside front-row Octagon cageside seats at UFC London with fighter tunnel credentials, command private 20-seat arena hospitality boxes, or gather in 300-year-old Square Mile bullion vaults after midnight.
                </p>
              </motion.div>

              <motion.div variants={blockItemVariants} className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('hidden-london')}
                  className="btn-gold px-7 py-3.5 text-xs flex items-center gap-2 min-h-[44px]"
                >
                  <span>Explore Sub-Rosa Access</span>
                  <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
                </button>
                <button
                  onClick={() => openIntroductionModal('Priority Arena & UFC Access Inquiry')}
                  className="px-4 py-3 text-xs text-[#D9D4CA] hover:text-[#CFA85E] transition-colors font-medium min-h-[44px]"
                >
                  Inquire Privately →
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 3.5 The Commission Studio Spotlight (Interactive Itinerary Configurator) */}
      <section id="section-commission" className="py-12 sm:py-16 px-6 sm:px-12 bg-[#0C0D13] border-b border-[#1A1C24] relative overflow-hidden scroll-mt-20">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(185,134,51,0.06)_0%,_transparent_70%)] pointer-events-none" />

        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-10 relative z-10"
        >
          <motion.div variants={blockItemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1E202B]">
            <div>
              <div className="flex items-center gap-2 tglc-kicker mb-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>The Commission Studio · 18 Bespoke Scenarios</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0]">
                Build Your Confidential London & Global Itinerary
              </h2>
            </div>
            <p className="tglc-prose text-xs sm:text-sm max-w-md">
              From our Albemarle Street salon, select prebuilt blueprints or combine 18 scenarios across urban sound vaults, aviation air corridors, and heritage salons.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Preview Grid */}
            <div className="lg:col-span-7 space-y-4">
              <motion.div variants={sectionStaggerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <motion.div
                  variants={blockItemVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => navigateTo('commission-studio')}
                  className="group cursor-pointer p-4 bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all flex flex-col justify-between"
                >
                  <div>
                    <motion.div variants={imagePlateVariants} className="aspect-[16/10] overflow-hidden mb-3 bg-[#131722]">
                      <img
                        src="/assets/aistudio/images__2__92f11072.jpg"
                        alt="Savile Row & Sartorial Craft"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105"
                      />
                    </motion.div>
                    <span className="text-[10px] font-mono uppercase text-[#E2BA6B] block">Sartorial & Horology</span>
                    <h3 className="font-serif text-base text-[#FAF7F0] group-hover:text-[#E2BA6B] mt-1 transition-colors">
                      Savile Row Cut & Vault
                    </h3>
                  </div>
                  <div className="space-y-2 mt-3">
                    <span className="text-[11px] text-[#8F98AA] block">Mayfair in-suite cutter</span>
                    <span className="block h-[1px] w-full bg-[#191C26] overflow-hidden">
                      <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-[#8B672B] via-[#E2BA6B] to-[#C4933F] transition-all duration-500" />
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  variants={blockItemVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => navigateTo('commission-studio')}
                  className="group cursor-pointer p-4 bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all flex flex-col justify-between"
                >
                  <div>
                    <motion.div variants={imagePlateVariants} className="aspect-[16/10] overflow-hidden mb-3 bg-[#131722]">
                      <img
                        src="/assets/aistudio/shoreditch_street_couture.jpg"
                        alt="Vauxhall Sound Vault & Nocturne"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105"
                      />
                    </motion.div>
                    <span className="text-[10px] font-mono uppercase text-[#E2BA6B] block">Urban Sound & Stealth</span>
                    <h3 className="font-serif text-base text-[#FAF7F0] group-hover:text-[#E2BA6B] mt-1 transition-colors">
                      Vauxhall Vault & Maybach
                    </h3>
                  </div>
                  <div className="space-y-2 mt-3">
                    <span className="text-[11px] text-[#8F98AA] block">Alley staging & rotary rig</span>
                    <span className="block h-[1px] w-full bg-[#191C26] overflow-hidden">
                      <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-[#8B672B] via-[#E2BA6B] to-[#C4933F] transition-all duration-500" />
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  variants={blockItemVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => navigateTo('commission-studio')}
                  className="group cursor-pointer p-4 bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all flex flex-col justify-between"
                >
                  <div>
                    <motion.div variants={imagePlateVariants} className="aspect-[16/10] overflow-hidden mb-3 bg-[#131722]">
                      <img
                        src="/assets/aistudio/images__3__7bd6ae28.jpg"
                        alt="Private Apron Aviation & Saloon"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105"
                      />
                    </motion.div>
                    <span className="text-[10px] font-mono uppercase text-[#E2BA6B] block">Aviation & Mobility</span>
                    <h3 className="font-serif text-base text-[#FAF7F0] group-hover:text-[#E2BA6B] mt-1 transition-colors">
                      RAF Northolt Charter
                    </h3>
                  </div>
                  <div className="space-y-2 mt-3">
                    <span className="text-[11px] text-[#8F98AA] block">30-sec tarmac handover</span>
                    <span className="block h-[1px] w-full bg-[#191C26] overflow-hidden">
                      <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-[#8B672B] via-[#E2BA6B] to-[#C4933F] transition-all duration-500" />
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="text-xs text-[#8F98AA]">
                  6 prebuilt blueprint packages or 18 bespoke modular destinations.
                </span>
                <button
                  onClick={() => navigateTo('commission-studio')}
                  className="btn-gold px-7 py-3 text-xs flex items-center gap-2 min-h-[44px]"
                >
                  <span>Launch Private Commission Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#07080B]" />
                </button>
              </div>
            </div>

            {/* Right Live Dossier Teaser Card */}
            <motion.div variants={blockItemVariants} className="lg:col-span-5 bg-[#07080B] border border-[#262835] p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E202B]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E2BA6B]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>TGLC-MSN-2026</span>
                </div>
                <span className="tglc-meta uppercase">
                  Mayfair Dispatch Desk
                </span>
              </div>

              <div className="py-4 space-y-3 text-xs">
                <div className="flex items-center justify-between text-[#8F98AA]">
                  <span>Operational Posture:</span>
                  <span className="text-[#E2BA6B] font-medium">Albemarle Street Ready</span>
                </div>
                <div className="flex items-center justify-between text-[#8F98AA]">
                  <span>Available Fleet:</span>
                  <span className="text-[#FAF7F0]">8 Sovereign & Stealth Vehicles</span>
                </div>
                <div className="flex items-center justify-between text-[#8F98AA]">
                  <span>Protection Protocols:</span>
                  <span className="text-[#FAF7F0]">Tier 1 Covert to Tier 3 Faraday</span>
                </div>
                <div className="flex items-center justify-between text-[#8F98AA]">
                  <span>Duty Dispatch:</span>
                  <span className="text-[#FAF7F0] tabular-nums">{TGLC_CONTACT.telephone}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('commission-studio')}
                className="btn-outline-gold w-full py-3 text-xs flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Sliders className="w-3.5 h-3.5 text-[#E2BA6B]" />
                <span>Configure Your Commission Now</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 4. Interactive Sovereign Lifestyle Showcase */}
      <section id="section-showcase" className="py-10 sm:py-14 px-6 sm:px-12 bg-[#08090C] border-b border-[#1A1C24] relative scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <motion.div variants={blockItemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-[#1D1F28]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] font-medium block mb-2">
                The Sovereign Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
                British Elegance & Mayfair Architecture
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9C968A] max-w-md leading-relaxed font-light">
              Inspect how our Mayfair directors orchestrate every movement—from twilight Rolls-Royce dispatches to Savile Row commissions and closed-door club sanctums.
            </p>
          </motion.div>

          <motion.div variants={blockItemVariants} className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[#181A22]">
            {LIFESTYLE_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(idx)}
                className={`relative min-h-[44px] px-5 py-3 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-300 flex items-center gap-2.5 cursor-pointer ${
                  activeTab === idx
                    ? 'text-[#CFA85E] bg-[#12141C]'
                    : 'text-[#8E8A83] hover:text-[#D9D4CA] hover:bg-[#0D0F15]'
                }`}
              >
                <span className="text-[11px] tabular-nums text-[#8B672B]">{`0${idx + 1}`}</span>
                <span>{pillar.label}</span>
                {activeTab === idx && (
                  <motion.span
                    layoutId="homeShowcaseTab"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B98633]"
                  />
                )}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0.85, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.85, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0C0D12] border border-[#20222E] p-6 sm:p-10 shadow-2xl"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden bg-black border border-[#242632] group">
                  <motion.img
                    src={currentPillar.image}
                    alt={currentPillar.title}
                    initial={{ scale: 1.04 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-105 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#DDB872] bg-[#08090C]/85 backdrop-blur-md px-4 py-2.5 border border-[#8B672B]/40">
                    <span className="uppercase tracking-widest text-[10px] font-medium shrink-0">{currentPillar.kicker}</span>
                    <span className="italic font-serif text-sm text-[#F4F1EA]">“{currentPillar.tagline}”</span>
                  </div>
                </div>

                {currentPillar.secondaryImage && (
                  <div className="flex items-center gap-4 pt-1">
                    <div className="w-28 h-16 overflow-hidden border border-[#8B672B]/50 shrink-0 bg-black">
                      <img
                        src={currentPillar.secondaryImage}
                        alt="Companion view"
                        className="w-full h-full object-cover filter brightness-105 hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-xs text-[#9C968A] italic font-serif">
                      Privately coordinated on direct authority through TGLC House, Mayfair.
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C4933F] font-medium block mb-2">
                  {currentPillar.kicker}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F1EA] leading-snug">
                  {currentPillar.title}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#D9D4CA] font-light leading-relaxed">
                {currentPillar.narrative.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#1D1F28]">
                {currentPillar.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#D9D4CA]">
                    <span className="w-1.5 h-1.5 bg-[#B98633] mt-1.5 shrink-0" />
                    <span className="font-light">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    if (currentPillar.targetPage === 'hidden-london') {
                      navigateTo('hidden-london');
                    } else {
                      navigateTo('service-detail', { serviceId: currentPillar.targetService });
                    }
                  }}
                  className="btn-gold px-6 py-3 text-xs flex items-center gap-2"
                >
                  <span>{currentPillar.ctaText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
                </button>
                <button
                  onClick={() => openIntroductionModal(currentPillar.title)}
                  className="px-4 py-3 text-xs text-[#D9D4CA] hover:text-[#CFA85E] transition-colors font-medium"
                >
                  Inquire Privately →
                </button>
              </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 5. Redesigned Services & Practices Gallery (Classy, Larger Imagery & Motion — NOT a blog list) */}
      <section id="section-services" className="py-12 sm:py-16 px-6 sm:px-12 bg-[#090A0E] border-b border-[#1A1C24] scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-10">
          <motion.div
            variants={blockItemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-[#1D1F28]"
          >
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#CFA85E] font-medium block mb-2">
                Services & Practices
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
                From the expected to the exceptional.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9C968A] max-w-md leading-relaxed font-light">
              Seven integrated private-office practices orchestrated by specialists who act under a single roof at 3rd Floor, 45 Albemarle Street, Mayfair.
            </p>
          </motion.div>

          <motion.div
            variants={sectionStaggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.02 }}
            className="space-y-8"
          >
            {SERVICES_DATA.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  key={service.id}
                  variants={blockItemVariants}
                  whileHover={{ y: -2 }}
                  onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                  className="group cursor-pointer bg-[#0E1016] border border-[#20222E] hover:border-[#B98633]/70 transition-all duration-300 shadow-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Large Cinematic Photography Panel */}
                    <motion.div
                      variants={imagePlateVariants}
                      className={`lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-[#131722] ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <img
                        src={service.heroImage}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/75 via-transparent to-transparent" />
                    </motion.div>

                    {/* Editorial Content Column */}
                    <div
                      className={`lg:col-span-6 p-6 sm:p-9 lg:p-11 flex flex-col justify-between space-y-5 ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="tglc-meta flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="text-[#E2BA6B] uppercase tracking-[0.18em]">{service.kicker}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">Practice 0{index + 1}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{service.subServices.length} Sub-Practices</span>
                        </div>
                        <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors flex items-center justify-between gap-4">
                          <span>{service.title}</span>
                          <ArrowUpRight className="w-5 h-5 shrink-0 text-[#E2BA6B] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </h3>
                        <p className="font-serif italic text-base sm:text-lg text-[#E2BA6B]">
                          “{service.tagline}”
                        </p>
                        <p className="tglc-prose text-xs sm:text-sm pt-1">
                          {service.shortDesc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#1D1F28] space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {service.subServices.slice(0, 4).map((sub) => (
                            <button
                              key={sub.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateTo('subservice-detail', { serviceId: service.id, subServiceId: sub.id });
                              }}
                              className="text-xs text-[#D4D8E2] hover:text-[#07080B] bg-[#131722] hover:bg-[#E2BA6B] border border-[#262835] hover:border-[#E2BA6B] px-3 py-1.5 transition-colors"
                            >
                              {sub.title}
                            </button>
                          ))}
                        </div>
                        <div className="text-xs text-[#E2BA6B] font-medium flex items-center justify-between pt-2">
                          <span>Inspect Full Practice & {service.subServices.length} Disciplines</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('services')}
              className="btn-outline-gold px-8 py-4 text-xs cursor-pointer"
            >
              View Complete Practice Directory & Disciplines →
            </button>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* 5.5 Case Studies & 24 Signature Itineraries Showcase */}
      <section id="section-cases" className="py-14 sm:py-20 px-6 sm:px-12 bg-gradient-to-b from-[#07080B] via-[#0D1017] to-[#07080B] border-b border-[#1A1C24] relative overflow-hidden scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-10 relative z-10"
        >
          <motion.div variants={blockItemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1E202B]">
            <div>
              <div className="flex items-center gap-2 tglc-kicker mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>The Case Studies Portfolio · 24 Executed Mandates</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0]">
                Real Journeys. Flawless Orchestration.
              </h2>
            </div>
            <p className="tglc-prose text-xs sm:text-sm max-w-md">
              Explore 24 comprehensive case studies spanning state visits, supersonic transfers, closed-door heritage vaults, and edgy sub-rosa nocturnal adventures under tactical protection.
            </p>
          </motion.div>

          {/* 4 Featured Itinerary Journey Cards */}
          <motion.div variants={sectionStaggerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Thames Stealth & Bullion Catacombs',
                tag: 'Sub-Rosa Nocturne',
                kicker: 'Square Mile & River',
                image: '/assets/aistudio/lombard_bullion_vault.jpg',
                desc: '02:00 AM 40-knot river sprint beneath Tower Bridge followed by private Armagnac banquet behind 20-ton bank doors.',
                meta: 'Evening · 5 Hours · Tier 2 Security',
              },
              {
                title: 'RAF Northolt to Florence Renaissance Villa',
                tag: 'Aviation & Palazzos',
                kicker: 'London to Tuscany',
                image: '/assets/aistudio/images_6534f5fb.jpg',
                desc: '30-second apron tarmac handover from Cullinan to Challenger 350; staffed Chianti palazzo with fires lit before arrival.',
                meta: '3 Days · 72 Hours · Diplomatic Gate',
              },
              {
                title: 'Vauxhall Concrete Bass Vault & Maybach Buyout',
                tag: 'Urban Sound & Vaults',
                kicker: 'SE1 Railway Arches',
                image: '/assets/aistudio/bermondsey_boxing_vault.jpg',
                desc: 'Ringside brick arches & sound-isolated vinyl bass chambers with satin-black Maybach rear lane arrivals and Faraday pouches.',
                meta: 'Full Evening · Tier 2 Tactical Escort',
              },
              {
                title: '3,000-Acre Cotswolds Manor & Michelin Hearth',
                tag: 'Estates & Field Sports',
                kicker: 'Oxfordshire Countryside',
                image: '/assets/aistudio/cotswolds_manor_estate.jpg',
                desc: 'Agusta 109 helicopter transfer from Battersea in 24 minutes; clays, bespoke Purdeys, and 8-course woodfire feast.',
                meta: 'Weekend · 48 Hours · Full Buyout',
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={blockItemVariants}
                whileHover={{ y: -4 }}
                onClick={() => navigateTo('case-studies')}
                className="bg-[#0D1017] border border-[#222430] hover:border-[#E2BA6B] transition-all cursor-pointer overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <motion.div variants={imagePlateVariants} className="aspect-[16/10] overflow-hidden bg-[#131722] relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                    />
                  </motion.div>
                  <div className="p-5 space-y-2">
                    <div className="tglc-meta text-[10px] flex flex-wrap items-center gap-1.5">
                      <span className="text-[#E2BA6B] uppercase tracking-wider">{card.tag}</span>
                      <span aria-hidden="true">·</span>
                      <span>{card.kicker}</span>
                    </div>
                    <h3 className="font-serif text-lg text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="tglc-prose text-xs line-clamp-3">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-2.5">
                  <div className="pt-3 border-t border-[#1E202B] flex items-center justify-between text-[11px] font-mono text-[#E2BA6B]">
                    <span className="tabular-nums">{card.meta}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <span className="block h-[1px] w-full bg-[#191C26] overflow-hidden">
                    <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-[#8B672B] via-[#E2BA6B] to-[#C4933F] transition-all duration-500" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={blockItemVariants} className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('case-studies')}
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All 24 Signature Itineraries & Case Studies</span>
              <ArrowUpRight className="w-4 h-4 text-[#07080B]" />
            </button>
            <button
              onClick={() => navigateTo('commission-studio')}
              className="btn-outline-gold px-6 py-3.5 text-xs cursor-pointer"
            >
              Build Your Own Commission →
            </button>
          </motion.div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 6. Reimagined "The TGLC Difference" — Pictorial Bento Editorial Grid */}
      <section id="section-difference" className="py-12 sm:py-16 px-6 sm:px-12 border-b border-[#1A1C24] bg-[#08090C] scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-10"
        >
          <motion.div variants={blockItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#1D1F28] pb-6">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] font-medium block">
                The Consortium Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
                The TGLC Difference
              </h2>
            </div>
            <p className="lg:col-span-5 text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
              We deliberately cap our active membership roster to preserve depth of counsel, human memory, and unhurried operational care across generations.
            </p>
          </motion.div>

          {/* Illustrated 5-Pillar Mosaic Grid */}
          <motion.div variants={sectionStaggerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ETHOS_PRINCIPLES.map((principle, idx) => (
              <motion.div
                key={principle.number}
                variants={blockItemVariants}
                whileHover={{ y: -3 }}
                onClick={() => navigateTo('ethos')}
                className={`group cursor-pointer bg-[#0E1016] border border-[#20222E] hover:border-[#B98633]/65 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <motion.div variants={imagePlateVariants} className={`w-full overflow-hidden bg-black relative ${idx === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
                  <img
                    src={DIFFERENCE_IMAGERY[idx % DIFFERENCE_IMAGERY.length]}
                    alt={principle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1016] via-[#0E1016]/25 to-transparent" />
                  <span className="absolute bottom-3 left-5 font-serif text-2xl sm:text-3xl text-[#CFA85E]">
                    {principle.number}
                  </span>
                </motion.div>

                <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-[#F4F1EA] group-hover:text-[#CFA85E] transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D9D4CA] leading-relaxed font-light">
                      {principle.summary}
                    </p>
                    <p className="text-xs text-[#9C968A] leading-relaxed font-light line-clamp-3">
                      {principle.body}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#1D1F28] space-y-2.5">
                    <div className="text-xs text-[#CFA85E] font-medium flex items-center justify-between">
                      <span>Read Founding Principles</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <span className="block h-[1px] w-full bg-[#191C26] overflow-hidden">
                      <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-[#8B672B] via-[#E2BA6B] to-[#C4933F] transition-all duration-500" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 7. London’s Sovereign Enclaves */}
      <section id="section-enclaves" className="py-10 sm:py-14 px-6 sm:px-12 border-b border-[#1A1C24] bg-[#0A0B0F] scroll-mt-20">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <motion.div variants={blockItemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-[#1D1F28]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#CFA85E] font-medium block mb-2">
                Capital Intelligence
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA]">
                London’s Sovereign Enclaves
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#9C968A] max-w-md leading-relaxed font-light">
              Our house stands at 3rd Floor, 45 Albemarle Street in Mayfair, with localized intelligence across St James’s, Knightsbridge, Belgravia, and Chelsea.
            </p>
          </motion.div>

          <motion.div variants={sectionStaggerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LONDON_NEIGHBOURHOODS.slice(0, 4).map((enclave) => (
              <motion.div
                key={enclave.name}
                variants={blockItemVariants}
                whileHover={{ y: -3 }}
                onClick={() => navigateTo('our-london')}
                className="group cursor-pointer relative aspect-[3/4] overflow-hidden bg-black border border-[#20222E] hover:border-[#B98633]/65 transition-all"
              >
                <motion.img
                  variants={imagePlateVariants}
                  src={enclave.image}
                  alt={enclave.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/35 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 space-y-1.5">
                  <span className="text-xs tracking-widest uppercase text-[#CFA85E] font-medium block">
                    {enclave.name}
                  </span>
                  <p className="text-xs text-[#D9D4CA] font-light line-clamp-2">{enclave.summary}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* 8. Confidential Introduction Finale */}
      <section className="py-12 sm:py-16 px-6 sm:px-12 bg-black text-center">
        <motion.div
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <motion.div variants={blockItemVariants} className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#B98633] to-transparent mx-auto" />

          <motion.span variants={blockItemVariants} className="text-[11px] uppercase tracking-[0.28em] text-[#C4933F] font-medium block">
            Admissions by Recommendation
          </motion.span>

          <motion.h2 variants={blockItemVariants} className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F4F1EA] leading-tight">
            Begin with an unhurried conversation.
          </motion.h2>

          <motion.p variants={blockItemVariants} className="text-xs sm:text-sm text-[#9C968A] font-light max-w-xl mx-auto leading-relaxed">
            Whether arranging family office support, bespoke chauffeur fleets, or private salon introductions across London, our directors at TGLC House respond personally and in confidence.
          </motion.p>

          <motion.div variants={blockItemVariants} className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={() => openIntroductionModal('Private Principal Inquiry')}
              className="btn-gold px-8 py-3.5 text-xs flex items-center gap-2 min-h-[44px]"
            >
              <span>Request Confidential Introduction</span>
              <ArrowUpRight className="w-4 h-4 text-[#08090C]" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="btn-outline-gold px-7 py-3.5 text-xs min-h-[44px]"
            >
              Contact TGLC House
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
