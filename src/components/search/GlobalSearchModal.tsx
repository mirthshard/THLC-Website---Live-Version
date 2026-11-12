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
  Sparkles,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

  const results = useMemo(() => {
    return searchTGLC(query, category);
  }, [query, category]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results, category]);

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
        return <Compass className="w-3.5 h-3.5 text-[#E2BA6B]" />;
      case 'journal':
        return <BookOpen className="w-3.5 h-3.5 text-[#E2BA6B]" />;
      case 'calendar':
        return <Calendar className="w-3.5 h-3.5 text-[#E2BA6B]" />;
      case 'consortium':
      default:
        return <Building2 className="w-3.5 h-3.5 text-[#E2BA6B]" />;
    }
  };

  const QUICK_MANDATES = [
    { label: 'VIP Sporting & Boxing', icon: <Ticket className="w-3 h-3 text-[#E2BA6B]" />, query: 'VIP ticketing hospitality' },
    { label: 'Executive Chauffeurs', icon: <Car className="w-3 h-3 text-[#E2BA6B]" />, query: 'chauffeur Rolls-Royce' },
    { label: 'Luxury Accommodation', icon: <Bed className="w-3 h-3 text-[#E2BA6B]" />, query: 'luxury hotel residence' },
    { label: 'Private Aviation & FBO', icon: <Plane className="w-3 h-3 text-[#E2BA6B]" />, query: 'private jet aviation' },
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
          aria-label="The Albemarle Sourcing Desk"
          className="fixed inset-0 z-50 bg-[#07080B]/90 backdrop-blur-md flex items-start justify-center pt-8 sm:pt-14 px-4 sm:px-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSearch();
          }}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl bg-[#0D0F15] border border-[#2B303D] shadow-2xl text-[#FAF7F0] flex flex-col max-h-[88vh] relative overflow-hidden"
          >
            {/* Top Brand Banner: The Albemarle Concierge Desk */}
            <div className="px-6 py-3.5 bg-[#12151F] border-b border-[#232836] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/tglc_crest_transparent.png"
                  alt="TGLC Crest"
                  className="w-5 h-7 object-contain brightness-110 shrink-0"
                />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#E2BA6B] block font-semibold">
                    The Albemarle Sourcing Desk · 45 Albemarle Street W1
                  </span>
                  <span className="text-xs text-[#A6B0C2] font-light font-serif italic">
                    Opening doors that don’t usually exist · Discretion by default
                  </span>
                </div>
              </div>
              <button
                onClick={closeSearch}
                className="p-1.5 text-[#8E99AF] hover:text-[#FAF7F0] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#202533] bg-[#0E1119]">
              <Search className="w-5 h-5 text-[#E2BA6B] shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="State your requirement (e.g. VIP box at Wembley, Maybach to Farnborough, suite at Rosewood)..."
                aria-label="State requirement"
                className="w-full bg-transparent font-serif text-base sm:text-xl text-[#FAF7F0] placeholder-[#575E70] focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 text-[#8E99AF] hover:text-white transition-colors"
                  aria-label="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-[#8E99AF] border border-[#2B3242] px-2 py-0.5 bg-[#090B10]">
                ESC
              </kbd>
            </div>

            {/* Quick Mandate Shortcuts */}
            <div className="px-6 py-2.5 bg-[#0A0D13] border-b border-[#1C202B] flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#8E99AF] mr-1 hidden sm:inline">
                Core Desks:
              </span>
              {QUICK_MANDATES.map((qm) => (
                <button
                  key={qm.label}
                  type="button"
                  onClick={() => {
                    setQuery(qm.query);
                    setCategory('all');
                  }}
                  className="px-2.5 py-1 bg-[#131722] hover:bg-[#1A2131] border border-[#242C3D] hover:border-[#E2BA6B] text-[11px] text-[#D4D8E2] transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  {qm.icon}
                  <span>{qm.label}</span>
                </button>
              ))}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 px-6 py-2 border-b border-[#1C202B] bg-[#0E1119] overflow-x-auto text-xs font-mono scrollbar-none">
              {[
                { id: 'all', label: 'All Desks & Records' },
                { id: 'services', label: 'Services & Pillars' },
                { id: 'journal', label: 'Journal Intelligence' },
                { id: 'calendar', label: 'Seasonal Calendar' },
                { id: 'consortium', label: 'Consortium & Enclaves' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategory(tab.id as SearchCategoryType)}
                  className={`px-3 py-1.5 whitespace-nowrap shrink-0 transition-colors border-b-2 text-[11px] uppercase tracking-wider ${
                    category === tab.id
                      ? 'text-[#E2BA6B] border-[#E2BA6B] font-medium'
                      : 'text-[#848F9E] border-transparent hover:text-[#D4D8E2]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Results Body */}
            <div
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto divide-y divide-[#1A1E29] max-h-[52vh] scrollbar-thin"
            >
              {results.length > 0 ? (
                <div>
                  {!query.trim() && (
                    <div className="px-6 py-2.5 bg-[#121622]/80 text-[10px] font-mono tracking-widest uppercase text-[#E2BA6B] font-medium flex items-center justify-between border-b border-[#1E2330]">
                      <span>Curated Practice & Experience Ledger</span>
                      <span className="text-[#848F9E] normal-case tracking-normal text-xs font-sans">Use ↑↓ keys to navigate</span>
                    </div>
                  )}

                  {results.map((result, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={result.id}
                        data-index={idx}
                        onClick={() => handleSelectResult(result)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group px-6 py-3.5 cursor-pointer transition-colors duration-150 flex items-start justify-between gap-4 ${
                          isSelected ? 'bg-[#181E2C] text-white' : 'hover:bg-[#12151F]'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#E2BA6B] mb-1">
                            <span className="flex items-center gap-1.5">
                              {getCategoryIcon(result.category)}
                              <span>{result.categoryLabel}</span>
                            </span>
                            <span aria-hidden="true" className="text-[#3A4354]">·</span>
                            <span className="text-[#848F9E] truncate text-[10px]">{result.meta}</span>
                          </div>

                          <h4 className="font-serif text-base sm:text-lg text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors truncate">
                            {result.title}
                          </h4>

                          <p className="text-xs text-[#9CA7BA] line-clamp-1 mt-0.5 leading-relaxed font-light">
                            {result.snippet}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 pt-2 text-[#848F9E] group-hover:text-[#FAF7F0]">
                          {isSelected && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase text-[#E2BA6B]">
                              <span>Inspect</span>
                              <CornerDownLeft className="w-3 h-3" />
                            </span>
                          )}
                          <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-6 py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-[#E2BA6B]/40 bg-[#141924] flex items-center justify-center mx-auto text-[#E2BA6B]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#FAF7F0]">
                    Direct Bespoke Sourcing Available
                  </h4>
                  <p className="text-xs sm:text-sm text-[#9CA7BA] max-w-md mx-auto leading-relaxed font-light">
                    “{query}” is not currently catalogued in public records. The Global Luxury Consortium operates on relationship-led sourcing—our Mayfair desk can coordinate and verify availability directly.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        closeSearch();
                        openIntroductionModal(`Direct Mandate Inquiry: "${query}"`);
                      }}
                      className="btn-gold px-6 py-3 text-xs flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5 text-[#07080B]" />
                      <span>Transmit Mandate to Desk</span>
                    </button>
                    <button
                      onClick={() => setQuery('')}
                      className="btn-outline-gold px-5 py-3 text-xs"
                    >
                      Reset Search
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Mandate Callout when query is active */}
            {query.trim() && results.length > 0 && (
              <div className="px-6 py-3 bg-[#131722] border-t border-[#222A3A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-[#A6B2C6] font-light">
                  Need a bespoke arrangement not listed above?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeSearch();
                    openIntroductionModal(`Inquiry from Sourcing Desk: "${query}"`);
                  }}
                  className="px-3 py-1.5 bg-[#E2BA6B] hover:bg-[#F0C97B] text-[#090C12] text-xs font-serif font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Submit Mandate For "{query.slice(0, 22)}{query.length > 22 ? '...' : ''}"</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Footer Ribbon */}
            <div className="px-6 py-3 border-t border-[#1C202B] bg-[#0A0C12] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#848F9E]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#141822] border border-[#262D3D] text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-[#141822] border border-[#262D3D] text-[10px]">↓</kbd>
                  <span className="ml-1">Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#141822] border border-[#262D3D] text-[10px]">↵</kbd>
                  <span className="ml-1">Inspect</span>
                </span>
              </div>

              <div className="text-left sm:text-right tabular-nums flex items-center gap-2">
                <Phone className="w-3 h-3 text-[#E2BA6B]" />
                <span>Direct Line: <strong className="text-[#D4D8E2]">{TGLC_CONTACT.telephone}</strong></span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
