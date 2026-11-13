import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { TGLC_CONTACT } from '../../data/tglcData';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Compass,
  Lock,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DISPATCH_TOPICS = [
  'Aviation & Escapes',
  'London Cultural Openings',
  'Horology & Sourcing',
  'Sub-Rosa Dispatches',
] as const;

const dispatchStaggerVariants = {
  hidden: { opacity: 0.9 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const dispatchChildVariants = {
  hidden: { opacity: 0.88, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const Footer: React.FC = () => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Aviation & Escapes',
    'London Cultural Openings',
  ]);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08090C] border-t border-[#1D1F28] text-[#9C968A] pt-14 pb-10 overflow-hidden">
      {/* Animated Brass Crown Hairline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#CFA85E] to-transparent origin-center pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Top Architectural Grid: Framed Official Logo Emblem & Animated Private Dispatch (Subscribe) Card */}
        <motion.div
          variants={dispatchStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#1D1F28] items-stretch"
        >
          {/* Left: Official Crested Emblem & House Overview */}
          <motion.div
            variants={dispatchChildVariants}
            className="lg:col-span-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-36 sm:w-40 shrink-0 bg-black border border-[#8B672B]/50 p-3 shadow-2xl relative"
                >
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E2BA6B]" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E2BA6B]" />
                  <img
                    src="/assets/aistudio/tglc_lockup_transparent.png"
                    alt="The Global Luxury Consortium Official Crest Lockup"
                    className="w-full h-auto object-contain block"
                  />
                </motion.div>
                <div className="space-y-2.5">
                  <span className="text-[11px] uppercase tracking-[0.26em] text-[#C4933F] font-medium block">
                    Mayfair, London · Global Private Office
                  </span>
                  <p className="font-serif text-xl sm:text-2xl italic text-[#F4F1EA] leading-relaxed">
                    “Opening doors that don’t usually exist. Discretion by default, British poise by nature.”
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#9C968A] max-w-xl leading-relaxed font-light">
                The Global Luxury Consortium is a UK-based, relationship-led concierge house connecting private individuals and corporate clients with exceptional experiences, luxury accommodation, and executive travel coordination. Luxury is not exclusively defined by how much somebody spends—it is defined by how exceptionally they are treated.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#D9D4CA]">
              <span className="text-[#CFA85E] font-medium">Mayfair, London</span>
              <span className="text-[#4A4E5E]" aria-hidden="true">·</span>
              <span>3rd Floor, 45 Albemarle Street</span>
              <span className="text-[#4A4E5E]" aria-hidden="true">·</span>
              <span className="text-[#DDB872] tabular-nums">W1S 4JL</span>
            </div>
          </motion.div>

          {/* Right: Animated Private Dispatch (Subscribe) Block */}
          <motion.div
            variants={dispatchChildVariants}
            className="lg:col-span-6 relative bg-[#0E1018] border border-[#262936] p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-2xl overflow-hidden"
          >
            {/* Corner Reticles & Subtle Top Hairline Sweep */}
            <span aria-hidden="true" className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#CFA85E]" />
            <span aria-hidden="true" className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CFA85E]" />
            <span aria-hidden="true" className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CFA85E]" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#CFA85E]" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
              className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#CFA85E]/80 to-transparent origin-left pointer-events-none"
            />

            <motion.div variants={dispatchChildVariants} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#CFA85E] font-medium inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E2BA6B]" />
                  <span>Private Dispatch · Bi-Monthly Edition</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8F98AA]">
                  Albemarle Desk
                </span>
              </div>
              <h4 className="font-serif text-2xl sm:text-[1.7rem] text-[#F4F1EA] leading-snug">
                Receive The TGLC Journal & Seasonal Invitations
              </h4>
              <p className="text-xs sm:text-sm text-[#9C968A] leading-relaxed font-light">
                A quiet, bi-monthly dispatch examining private aviation routes, London cultural openings, fine horology, and acquisitions. Zero mass marketing.
              </p>
            </motion.div>

            {/* Interactive Topic Preference Selectors */}
            <motion.div variants={dispatchChildVariants} className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8F98AA] block">
                Select Dispatch Briefings
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DISPATCH_TOPICS.map((topic) => {
                  const active = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      aria-pressed={active}
                      className={`min-h-[44px] px-3 py-2 text-left text-xs border transition-colors flex items-center justify-between gap-2 ${
                        active
                          ? 'bg-[#161923] border-[#CFA85E] text-[#FAF7F0]'
                          : 'bg-[#090B10] border-[#222532] text-[#8F98AA] hover:border-[#8B672B] hover:text-[#D4D8E2]'
                      }`}
                    >
                      <span>{topic}</span>
                      <span
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                          active ? 'border-[#CFA85E] bg-[#CFA85E] text-[#07080B]' : 'border-[#33384A]'
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Form / Confirmation State with AnimatePresence */}
            <AnimatePresence mode="wait">
              {newsletterSubscribed ? (
                <motion.div
                  key="dispatch-confirmed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="p-4 bg-[#141722] border border-[#B98633] text-xs text-[#F4F1EA] space-y-2.5"
                >
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#CFA85E] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium text-[#FAF7F0]">
                        Your address has been registered on our confidential dispatch roll.
                      </p>
                      <p className="text-[11px] text-[#9C968A]">
                        Selected briefings:{' '}
                        <span className="text-[#E2BA6B]">
                          {selectedTopics.length > 0 ? selectedTopics.join(' · ') : 'Full House Edition'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNewsletterSubscribed(false)}
                    className="text-[11px] font-mono uppercase tracking-wider text-[#CFA85E] hover:text-white transition-colors"
                  >
                    Update Dispatch Preferences →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="dispatch-form"
                  initial={{ opacity: 0.85, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter confidential email address..."
                    required
                    aria-label="Confidential email address for private dispatch"
                    className="flex-1 min-h-[44px] bg-[#08090D] border border-[#2C303E] focus:border-[#CFA85E] px-4 py-3 text-xs text-[#F4F1EA] placeholder-[#6E6A63] focus:outline-none transition-colors"
                  />
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    className="btn-gold min-h-[44px] px-6 py-3 text-xs whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="pt-3 border-t border-[#1D1F2A] flex flex-wrap items-center justify-between gap-4 text-xs text-[#9C968A]">
              <span>
                Instagram: <span className="text-[#D9D4CA]">{TGLC_CONTACT.instagram}</span>
              </span>
              <span>
                LinkedIn: <span className="text-[#D9D4CA]">{TGLC_CONTACT.linkedIn}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Architectural Salon Utility & Direct Action Strip */}
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-10 border-b border-[#1D1F28]"
        >
          <div className="p-5 bg-[#0C0E14] border border-[#20232E] hover:border-[#8B672B]/65 transition-colors flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CFA85E] flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span>Mayfair Private Salon</span>
              </span>
              <p className="font-serif text-lg text-[#F4F1EA]">45 Albemarle Street, W1S 4JL</p>
              <p className="text-xs text-[#8F98AA] font-light">
                Private consultations by appointment only across our 3rd Floor drawing rooms.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('our-london')}
              className="text-xs text-[#E2BA6B] hover:text-white transition-colors inline-flex items-center gap-1 font-medium text-left"
            >
              <span>View London Enclaves & Map</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 bg-[#0C0E14] border border-[#20232E] hover:border-[#8B672B]/65 transition-colors flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CFA85E] flex items-center gap-1.5">
                <Phone className="w-3 h-3" />
                <span>Direct Duty & Admissions Desk</span>
              </span>
              <p className="font-serif text-lg text-[#F4F1EA] tabular-nums">{TGLC_CONTACT.telephone}</p>
              <p className="text-xs text-[#8F98AA] font-light">
                Human directors on call for hospitality boxes, FBO tarmac coordination, and inquiries.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openIntroductionModal('Private Principal Introduction')}
              className="text-xs text-[#E2BA6B] hover:text-white transition-colors inline-flex items-center gap-1 font-medium text-left"
            >
              <span>Request Private Introduction</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 bg-[#0C0E14] border border-[#20232E] hover:border-[#8B672B]/65 transition-colors flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CFA85E] flex items-center gap-1.5">
                <Compass className="w-3 h-3" />
                <span>Private Platforms</span>
              </span>
              <p className="font-serif text-lg text-[#F4F1EA]">Commission Studio & Member Vault</p>
              <p className="text-xs text-[#8F98AA] font-light">
                Configure 18 bespoke scenarios or sign in to the encrypted TGLC principal portal.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => navigateTo('commission-studio')}
                  className="text-[#E2BA6B] hover:text-white transition-colors font-medium"
                >
                  Commission Studio →
                </button>
                <span aria-hidden="true" className="text-[#3C4152]">·</span>
                <button
                  type="button"
                  onClick={() => navigateTo('member-portal')}
                  className="text-[#D4D8E2] hover:text-[#CFA85E] transition-colors font-medium"
                >
                  Portal
                </button>
              </div>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#9C968A] hover:text-[#E2BA6B] transition-colors"
                aria-label="Return to top of page"
              >
                <span>Top</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Middle Section: Staggered 5-Column Directory Grid */}
        <motion.div
          variants={dispatchStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.01 }}
          className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,1.55fr)] gap-x-6 lg:gap-x-6 xl:gap-x-8 gap-y-10 py-2 border-b border-[#1D1F28] pb-10 text-xs"
        >
          {/* Column 1: The Consortium */}
          <motion.div variants={dispatchChildVariants} className="col-span-1 md:col-span-2 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">The Consortium</h5>
            <ul className="space-y-3">
              <li><button onClick={() => navigateTo('about')} className="hover:text-[#CFA85E] transition-colors text-left">About TGLC & Leadership</button></li>
              <li><button onClick={() => navigateTo('ethos')} className="hover:text-[#CFA85E] transition-colors text-left">Our Ethos & Principles</button></li>
              <li><button onClick={() => navigateTo('approach')} className="hover:text-[#CFA85E] transition-colors text-left">Our Approach</button></li>
              <li><button onClick={() => navigateTo('network')} className="hover:text-[#CFA85E] transition-colors text-left">The TGLC Network</button></li>
              <li><button onClick={() => navigateTo('our-london')} className="hover:text-[#CFA85E] transition-colors text-left">Our London & Map</button></li>
              <li><button onClick={() => navigateTo('privacy-discretion')} className="hover:text-[#CFA85E] transition-colors text-left">Privacy & Discretion</button></li>
            </ul>
          </motion.div>

          {/* Column 2: Key Services */}
          <motion.div variants={dispatchChildVariants} className="col-span-1 md:col-span-2 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">Core Practices</h5>
            <ul className="space-y-3">
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'travel-aviation' })} className="hover:text-[#CFA85E] transition-colors text-left">Travel & Aviation</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'dining-nightlife' })} className="hover:text-[#CFA85E] transition-colors text-left">Dining & Social Access</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'experiences-culture' })} className="hover:text-[#CFA85E] transition-colors text-left">Experiences & Culture</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'residences-relocation' })} className="hover:text-[#CFA85E] transition-colors text-left">Residences & Relocation</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'transport-security' })} className="hover:text-[#CFA85E] transition-colors text-left">Transport & Security</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'personal-private-office' })} className="hover:text-[#CFA85E] transition-colors text-left">Personal & Private Office</button></li>
              <li><button onClick={() => navigateTo('service-detail', { serviceId: 'luxury-sourcing' })} className="hover:text-[#CFA85E] transition-colors text-left">Luxury Sourcing</button></li>
              <li>
                <button onClick={() => navigateTo('hidden-london')} className="text-[#CFA85E] hover:text-white transition-colors font-medium text-left">
                  The Other Side of London
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Engagement */}
          <motion.div variants={dispatchChildVariants} className="col-span-2 md:col-span-2 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">Engagement</h5>
            <ul className="space-y-3">
              <li><button onClick={() => navigateTo('commission-studio')} className="text-[#CFA85E] hover:text-white transition-colors text-left font-medium">Commission Studio</button></li>
              <li><button onClick={() => navigateTo('case-studies')} className="text-[#CFA85E] hover:text-white transition-colors text-left font-medium">Case Studies & Itineraries</button></li>
              <li><button onClick={() => navigateTo('membership')} className="hover:text-[#CFA85E] transition-colors text-left">Membership Charters</button></li>
              <li><button onClick={() => navigateTo('calendar')} className="hover:text-[#CFA85E] transition-colors text-left">The London Calendar</button></li>
              <li><button onClick={() => navigateTo('journal')} className="hover:text-[#CFA85E] transition-colors text-left">The TGLC Journal</button></li>
              <li><button onClick={() => navigateTo('faq')} className="hover:text-[#CFA85E] transition-colors text-left">Frequently Asked Questions</button></li>
              <li>
                <button onClick={() => openIntroductionModal('Membership Inquiry')} className="text-[#CFA85E] hover:text-white transition-colors inline-flex items-center gap-1 font-medium text-left">
                  <span>Request Introduction</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Private Member Access */}
          <motion.div variants={dispatchChildVariants} className="col-span-2 md:col-span-3 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">Member Portal</h5>
            <ul className="space-y-3.5 min-w-0">
              <li>
                <button onClick={() => navigateTo('member-portal')} className="hover:text-[#CFA85E] transition-colors flex items-center gap-1.5 text-[#F4F1EA]">
                  <Lock className="w-3.5 h-3.5 text-[#C4933F] shrink-0" />
                  <span>Member Sign In</span>
                </button>
              </li>
              <li>
                <span className="text-[#7E7A72] block">Dedicated Member Line</span>
                <span className="block text-[#D9D4CA] font-medium pt-0.5 tabular-nums">{TGLC_CONTACT.privateMemberLine}</span>
              </li>
              <li className="min-w-0">
                <span className="text-[#7E7A72] block">Member Support Desk</span>
                <a
                  href={`mailto:${TGLC_CONTACT.memberSupport}`}
                  className="block max-w-full text-[#CFA85E] hover:text-[#DDB872] transition-colors pt-0.5 text-[11px] xl:text-xs break-words"
                >
                  {TGLC_CONTACT.memberSupport.split('@')[0]}@<wbr />{TGLC_CONTACT.memberSupport.split('@')[1]}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 5: Headquarters Address */}
          <motion.div variants={dispatchChildVariants} className="col-span-2 md:col-span-3 lg:col-span-1 min-w-0 space-y-4">
            <h5 className="font-serif text-base tracking-wide text-[#F4F1EA]">TGLC House</h5>
            <address className="not-italic space-y-2.5 leading-relaxed text-[#D9D4CA] min-w-0">
              <p className="text-xs font-light">{TGLC_CONTACT.address.toString()}</p>
              <div className="pt-1">
                <span className="text-[#7E7A72] block">Company Telephone</span>
                <p className="text-[#CFA85E] font-medium text-sm tabular-nums">{TGLC_CONTACT.telephone}</p>
              </div>
              <div className="min-w-0">
                <span className="text-[#7E7A72] block">Admissions & Desk</span>
                <a
                  href={`mailto:${TGLC_CONTACT.email}`}
                  className="block max-w-full text-[#D9D4CA] hover:text-[#CFA85E] transition-colors pt-0.5 text-[11px] xl:text-xs break-words"
                >
                  {TGLC_CONTACT.email.split('@')[0]}@<wbr />{TGLC_CONTACT.email.split('@')[1]}
                </a>
              </div>
              <div className="pt-1">
                <span className="text-[#7E7A72] block">Company Number</span>
                <p className="text-[#D9D4CA] tabular-nums">{TGLC_CONTACT.companyNumber}</p>
              </div>
            </address>
          </motion.div>
        </motion.div>

        {/* Bottom Wordmark & Legal Row */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-[#7E7A72]">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img
              src="/assets/aistudio/tglc_crest_transparent.png"
              alt="TGLC Seal"
              className="w-6 h-7 object-contain opacity-80 hidden sm:block"
            />
            <div className="space-y-1">
              <p className="text-[#9C968A]">© {new Date().getFullYear()} The Global Luxury Consortium Ltd. All rights reserved.</p>
              <p className="text-[#6E6A63] tabular-nums">
                Registered in England & Wales · Company Number {TGLC_CONTACT.companyNumber} · {TGLC_CONTACT.address.toString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[#8E8A83]">
            <button onClick={() => navigateTo('privacy-policy')} className="hover:text-[#CFA85E] transition-colors">Privacy Policy</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-[#CFA85E] transition-colors">Terms & Conditions</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('cookie-policy')} className="hover:text-[#CFA85E] transition-colors">Cookie Policy</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('accessibility')} className="hover:text-[#CFA85E] transition-colors">Accessibility</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('image-credits')} className="hover:text-[#CFA85E] transition-colors">Image Credits</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('sitemap')} className="hover:text-[#CFA85E] transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
