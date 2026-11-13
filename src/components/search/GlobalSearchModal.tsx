import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { searchTGLC } from '../../utils/searchEngine';
import { SearchCategoryType, GlobalSearchResult } from '../../types';
import { TGLC_CONTACT } from '../../data/tglcData';
import {
  Search,
  X,
  ArrowUpRight,
  Compass,
  Calendar,
  BookOpen,
  Building2,
  CornerDownLeft,
  Send,
  Ticket,
  Car,
  Bed,
  Plane,
  Phone,
  Shield,
  Key,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const HighlightMatch: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  const tokens = useMemo(
    () =>
      query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter((t) => t.length >= 2),
    [query]
  );

  if (tokens.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, idx) =>
        tokens.some((t) => part.toLowerCase() === t) ? (
          <mark
            key={idx}
            className="bg-[#E2BA6B]/25 text-[#FAF7F0] underline decoration-[#CFA85E]/80 underline-offset-2 px-0.5 rounded-none"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, navigateTo, openIntroductionModal } = useNavigation();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategoryType>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setCategory('all');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const allCategoryResults = useMemo(() => searchTGLC(query, 'all'), [query]);

  const categoryCounts = useMemo(() => {
    const counts: Record<SearchCategoryType, number> = {
      all: allCategoryResults.length,
      services: 0,
      journal: 0,
      calendar: 0,
      consortium: 0,
    };
    for (const item of allCategoryResults) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, [allCategoryResults]);

  const results = useMemo(() => {
    if (category === 'all') return allCategoryResults;
    return searchTGLC(query, category);
  }, [query, category, allCategoryResults]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results, category]);

  const activeResult = results[selectedIndex] ?? null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
      return;
    }

    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        navigateTo(selected.targetRoute, selected.routeParams);
      }
    }
  };

  useEffect(() => {
    if (!resultsContainerRef.current) return;
    const activeEl = resultsContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleSelectResult = (result: GlobalSearchResult) => {
    navigateTo(result.targetRoute, result.routeParams);
  };

  const getCategoryIcon = (cat: GlobalSearchResult['category']) => {
    switch (cat) {
      case 'services':
        return <Compass className="w-4 h-4 text-[#E2BA6B]" />;
      case 'journal':
        return <BookOpen className="w-4 h-4 text-[#E2BA6B]" />;
      case 'calendar':
        return <Calendar className="w-4 h-4 text-[#E2BA6B]" />;
      case 'consortium':
      default:
        return <Building2 className="w-4 h-4 text-[#E2BA6B]" />;
    }
  };

  const getFolioVisual = (result: GlobalSearchResult | null): string => {
    if (!result) return '/assets/aistudio/consortium_overview_head.jpg';
    if (result.category === 'calendar') return '/assets/aistudio/wembley_vip_hospitality.jpg';
    if (result.category === 'journal') return '/assets/aistudio/journal_editorial_brief.jpg';
    if (result.category === 'consortium') return '/assets/aistudio/tglc_st_james_salon.jpg';
    const lower = result.title.toLowerCase();
    if (lower.includes('aviation') || lower.includes('jet')) {
      return '/assets/aistudio/private_jet_interior_suite.jpg';
    }
    if (lower.includes('chauffeur') || lower.includes('transport')) {
      return '/assets/aistudio/images_6534f5fb.jpg';
    }
    if (lower.includes('residence') || lower.includes('suite') || lower.includes('hotel')) {
      return '/assets/aistudio/five_star_mayfair_suite.jpg';
    }
    if (lower.includes('dining') || lower.includes('club')) {
      return '/assets/aistudio/mayfair_fine_dining.jpg';
    }
    return '/assets/aistudio/consortium_overview_head.jpg';
  };

  const HOUSE_MANDATES = [
    { label: 'VIP Ticketing & Boxes', icon: <Ticket className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'VIP ticketing' },
    { label: 'Luxury Suites & Estates', icon: <Bed className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'hotel suite' },
    { label: 'Executive Chauffeurs', icon: <Car className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'chauffeur' },
    { label: 'Private Aviation', icon: <Plane className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'private aviation' },
    { label: 'Sub-Rosa London', icon: <Key className="w-3.5 h-3.5 text-[#E2BA6B]" />, query: 'sub-rosa' },
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mayfair House Directory & Search"
          className="fixed inset-0 z-50 bg-[#050609]/92 backdrop-blur-md flex items-start justify-center pt-4 sm:pt-10 px-3 sm:px-6 overflow-y-auto pb-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSearch();
          }}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl bg-[#0B0E15] border border-[#C4933F]/55 shadow-[0_24px_80px_rgba(0,0,0,0.85)] text-[#FAF7F0] flex flex-col max-h-[90vh] relative overflow-hidden"
          >
            {/* Clear House Directory Top Bar */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#121622] border-b border-[#2A3142] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt="TGLC Crest"
                  className="w-5 h-7 object-contain brightness-110 shrink-0"
                />
                <div className="min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E2BA6B] block font-semibold truncate">
                    TGLC Mayfair Index · Search Services, Dispatches & Fixtures
                  </span>
                  <span className="text-xs sm:text-sm text-[#D0D7E5] font-serif italic block truncate">
                    Opening doors that don’t usually exist · 45 Albemarle Street, W1S 4JL
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeSearch}
                className="min-h-[44px] px-3 flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D0D7E5] hover:text-[#FAF7F0] bg-[#181D2B] border border-[#2F374A] hover:border-[#E2BA6B] transition-colors shrink-0"
                aria-label="Close search directory"
              >
                <span className="hidden sm:inline">Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* High-Contrast Search Input Bar */}
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-[#262D3E] bg-[#0E121C]">
              <Search className="w-5 h-5 text-[#E2BA6B] shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type what you are looking for (e.g. Wembley box, Savile Row, chauffeur, aviation)..."
                aria-label="Search TGLC services, journal essays, and calendar"
                className="w-full bg-transparent font-serif text-lg sm:text-2xl text-[#FAF7F0] placeholder-[#94A3B8] focus:outline-none min-h-[40px]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="min-h-[44px] px-3 flex items-center justify-center gap-1 text-xs font-mono uppercase tracking-wider text-[#D0D7E5] hover:text-[#FAF7F0] bg-[#181D2B] border border-[#2C3344] hover:border-[#E2BA6B] transition-colors shrink-0"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Quick Suggested Searches */}
            <div className="px-4 sm:px-6 py-2.5 bg-[#090C13] border-b border-[#202636] flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#CBD5E1] mr-1 shrink-0">
                Quick Topics:
              </span>
              {HOUSE_MANDATES.map((qm) => {
                const isActive = query.trim().toLowerCase() === qm.query.toLowerCase();
                return (
                  <button
                    key={qm.label}
                    type="button"
                    onClick={() => {
                      setQuery(qm.query);
                      setCategory('all');
                    }}
                    className={`min-h-[40px] px-3.5 py-1.5 border text-xs transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#1D2333] border-[#E2BA6B] text-[#FAF7F0] font-medium'
                        : 'bg-[#131824] hover:bg-[#1A2030] border-[#2C3448] hover:border-[#E2BA6B] text-[#E2E8F0]'
                    }`}
                  >
                    {qm.icon}
                    <span>{qm.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Category Filter Rail with Live Match Counters */}
            <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 border-b border-[#202636] bg-[#10141F] overflow-x-auto text-xs font-mono">
              {[
                { id: 'all', label: 'All Results' },
                { id: 'services', label: 'Practices' },
                { id: 'journal', label: 'Journal' },
                { id: 'calendar', label: 'Calendar' },
                { id: 'consortium', label: 'Consortium' },
              ].map((tab) => {
                const tabId = tab.id as SearchCategoryType;
                const count = categoryCounts[tabId] || 0;
                const active = category === tabId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategory(tabId)}
                    className={`min-h-[40px] px-3.5 py-1.5 whitespace-nowrap shrink-0 transition-colors border-b-2 text-[11px] uppercase tracking-wider flex items-center gap-2 ${
                      active
                        ? 'text-[#E2BA6B] border-[#E2BA6B] font-semibold bg-[#161B2A]'
                        : 'text-[#B5C0D2] border-transparent hover:text-[#FAF7F0] hover:bg-[#141825]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="tabular-nums text-[10px] opacity-85">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Main Readable Split View: Generous List Left + Crisp Inspector Right */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0">
              {/* Left Index */}
              <div
                ref={resultsContainerRef}
                className="lg:col-span-7 overflow-y-auto divide-y divide-[#202636] max-h-[54vh] lg:max-h-[56vh]"
              >
                {results.length > 0 ? (
                  <div>
                    <div className="px-4 sm:px-6 py-2.5 bg-[#121723] text-[11px] font-mono tracking-wider uppercase text-[#E2BA6B] font-medium flex items-center justify-between border-b border-[#22293A] tabular-nums">
                      <span>
                        {query.trim()
                          ? `${results.length} matching entries for “${query.trim()}”`
                          : `Featured TGLC Directory · ${results.length} Entries`}
                      </span>
                      <span className="text-[#B5C0D2] normal-case tracking-normal text-xs font-sans hidden sm:inline">
                        Click any entry to open
                      </span>
                    </div>

                    {results.map((result, idx) => {
                      const isSelected = idx === selectedIndex;
                      return (
                        <button
                          type="button"
                          key={result.id}
                          data-index={idx}
                          onClick={() => handleSelectResult(result)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full text-left group px-4 sm:px-6 py-4 cursor-pointer transition-colors duration-150 flex items-start justify-between gap-4 border-l-2 ${
                            isSelected
                              ? 'bg-[#171D2B] text-white border-[#E2BA6B]'
                              : 'bg-[#0B0E15] hover:bg-[#131824] border-transparent'
                          }`}
                        >
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-wider">
                              <span className="inline-flex items-center gap-1.5 text-[#E2BA6B] font-medium uppercase">
                                {getCategoryIcon(result.category)}
                                <span>{result.categoryLabel}</span>
                              </span>
                              <span aria-hidden="true" className="text-[#4B556B]">·</span>
                              <span className="text-[#A9B4C7]">{result.meta}</span>
                            </div>

                            <h4 className="font-serif text-lg sm:text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                              <HighlightMatch text={result.title} query={query} />
                            </h4>

                            <p className="text-xs sm:text-sm text-[#CFD6E3] line-clamp-2 leading-relaxed font-normal">
                              <HighlightMatch text={result.snippet} query={query} />
                            </p>
                          </div>

                          <div className="flex flex-col items-end justify-center gap-1 shrink-0 pt-2 text-[#E2BA6B]">
                            <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider px-2.5 py-1.5 border border-[#2D3548] group-hover:border-[#E2BA6B] bg-[#111520] transition-colors">
                              <span className="hidden sm:inline">Open</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                            {isSelected && (
                              <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-mono text-[#A9B4C7] pt-0.5">
                                <CornerDownLeft className="w-3 h-3" />
                                <span>Enter</span>
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center space-y-4">
                    <div className="w-12 h-12 border border-[#E2BA6B]/55 bg-[#141924] flex items-center justify-center mx-auto text-[#E2BA6B]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-2xl text-[#FAF7F0]">
                      Not Listed Publicly — Ask Our Stewards Directly
                    </h4>
                    <p className="text-sm text-[#CFD6E3] max-w-md mx-auto leading-relaxed font-light">
                      “{query}” sits outside public archive listings. Because we work relationship-by-relationship from Mayfair, send the requirement straight to our directors—whether £100 or £100,000 in scale.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          closeSearch();
                          openIntroductionModal(`Direct Mandate Inquiry: "${query}"`);
                        }}
                        className="btn-gold min-h-[44px] px-6 py-3 text-xs flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5 text-[#07080B]" />
                        <span>Send Request to Albemarle Desk</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="btn-outline-gold min-h-[44px] px-5 py-3 text-xs"
                      >
                        Reset Search
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Preview Pane (Desktop) */}
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-between bg-[#0F131D] border-l border-[#22293A] p-6">
                {activeResult ? (
                  <motion.div
                    key={activeResult.id}
                    initial={{ opacity: 0.85, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden border border-[#2C3448] bg-[#141925] relative">
                      <img
                        src={getFolioVisual(activeResult)}
                        alt={activeResult.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-105 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F131D] via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#E2BA6B] bg-[#0B0E15]/85 px-2.5 py-1 border border-[#2B3347]">
                        {activeResult.categoryLabel}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="text-xs font-mono text-[#E2BA6B]">{activeResult.meta}</div>
                      <h3 className="font-serif text-2xl text-[#FAF7F0] leading-snug">
                        {activeResult.title}
                      </h3>
                      {activeResult.subtitle && (
                        <p className="font-serif italic text-sm text-[#D6DCE6]">
                          {activeResult.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-[#CFD6E3] font-normal leading-relaxed">
                        {activeResult.snippet}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#202636] space-y-2.5">
                      <button
                        type="button"
                        onClick={() => handleSelectResult(activeResult)}
                        className="btn-gold w-full min-h-[44px] text-xs flex items-center justify-center gap-2"
                      >
                        <span>Open Full Page</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#08090C]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          closeSearch();
                          openIntroductionModal(`Arrangement Inquiry: ${activeResult.title}`);
                        }}
                        className="btn-outline-gold w-full min-h-[44px] text-xs flex items-center justify-center gap-2"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>Speak With Our Mayfair Desk</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="m-auto text-center space-y-3 p-4">
                    <Shield className="w-6 h-6 text-[#E2BA6B] mx-auto" />
                    <p className="font-serif text-lg text-[#FAF7F0]">
                      Bespoke Relationship Sourcing
                    </p>
                    <p className="text-sm text-[#CBD5E1] font-light leading-relaxed">
                      If a request sits outside public pages, our stewards coordinate directly on your behalf from 45 Albemarle Street.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-[#202636] text-xs text-[#A9B4C7] leading-relaxed">
                  Human representation without agency markups · Response in confidence
                </div>
              </div>
            </div>

            {/* Direct Bespoke Callout */}
            {query.trim() && results.length > 0 && (
              <div className="px-4 sm:px-6 py-3 bg-[#141925] border-t border-[#283044] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs sm:text-sm text-[#E2E8F0] font-normal">
                  Prefer a human steward to verify availability on “{query.trim()}” directly?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeSearch();
                    openIntroductionModal(`Inquiry from Directory Search: "${query}"`);
                  }}
                  className="min-h-[44px] px-5 py-2 bg-[#E2BA6B] hover:bg-[#F0C97B] text-[#090C12] text-xs font-serif font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Ask Our Mayfair Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Footer Controls & Direct Line */}
            <div className="px-4 sm:px-6 py-3 border-t border-[#202636] bg-[#090C13] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#B5C0D2]">
              <div className="flex items-center gap-4">
                <span className="hidden sm:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#141925] border border-[#2D3548] text-[10px] text-[#FAF7F0]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-[#141925] border border-[#2D3548] text-[10px] text-[#FAF7F0]">↓</kbd>
                  <span className="ml-1">Move</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#141925] border border-[#2D3548] text-[10px] text-[#FAF7F0]">↵</kbd>
                  <span className="ml-1">Open Entry</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#141925] border border-[#2D3548] text-[10px] text-[#FAF7F0]">ESC</kbd>
                  <span className="ml-1">Close</span>
                </span>
              </div>

              <div className="text-left sm:text-right tabular-nums flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E2BA6B]" />
                <span>Direct Line: <strong className="text-[#FAF7F0]">{TGLC_CONTACT.telephone}</strong></span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
