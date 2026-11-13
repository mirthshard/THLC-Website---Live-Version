import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { JOURNAL_ARTICLES, TEAM_MEMBERS } from '../../data/tglcData';
import { GoldDivider } from '../common/GoldDivider';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';

interface ArticleDetailPageProps {
  articleSlug?: string;
}

const articleStaggerVariants = {
  hidden: { opacity: 0.9 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const articleItemVariants = {
  hidden: { opacity: 0.88, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const articlePlateVariants = {
  hidden: { opacity: 0.86, scale: 1.03 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articleSlug }) => {
  const { navigateTo, openIntroductionModal } = useNavigation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const article = JOURNAL_ARTICLES.find((a) => a.slug === articleSlug) || JOURNAL_ARTICLES[0];
  const relatedArticles = JOURNAL_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const matchingTeam = TEAM_MEMBERS.find((m) => article.author.includes(m.name));

  const editorialGallery = useMemo(
    () =>
      article.editorialImages && article.editorialImages.length >= 3
        ? article.editorialImages
        : [
            article.editorialImages?.[0] || '/assets/aistudio/tglc_st_james_salon.jpg',
            article.editorialImages?.[1] || '/assets/aistudio/savile_row_bespoke.jpg',
            '/assets/aistudio/bond_street_jewellery.jpg',
            '/assets/aistudio/mayfair_fine_dining.jpg',
          ],
    [article]
  );

  const captions = useMemo(
    () =>
      article.editorialCaptions || [
        `Inside one of the private salons documented for our ${article.category} archive.`,
        `Evening details photographed during preparation for visiting TGLC principals.`,
        `Behind the scenes with the custodians, hosts, and specialists leading the evening.`,
        `Final late-night departure staging arranged discreetly from private rear entrances.`,
      ],
    [article]
  );

  const lightboxSlides = useMemo(
    () => [
      {
        src: article.heroImage,
        alt: article.title,
        caption: article.subtitle,
      },
      ...editorialGallery.map((imgPath, idx) => ({
        src: imgPath,
        alt: captions[idx] || `${article.title} plate ${idx + 2}`,
        caption: captions[idx] || 'Field documentation by The Global Luxury Consortium.',
      })),
    ],
    [article, editorialGallery, captions]
  );

  useEffect(() => {
    setLightboxIndex(null);
  }, [article.slug]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % lightboxSlides.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + lightboxSlides.length) % lightboxSlides.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, lightboxSlides.length]);

  const widePlate = editorialGallery[0];
  const firstDiptych = editorialGallery.slice(1, 3);
  const secondaryPlates = editorialGallery.slice(3);

  return (
    <div className="bg-[#07080B] text-[#D4D8E2] pt-6 sm:pt-8 pb-16 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-9">
        {/* Return Bar */}
        <motion.div
          initial={{ opacity: 0.9, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-[#20232E] pb-4"
        >
          <button
            type="button"
            onClick={() => navigateTo('journal')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Journal</span>
          </button>

          <div className="tglc-meta flex flex-wrap items-center gap-2.5 text-[11px]">
            <span className="text-[#E2BA6B] uppercase tracking-wider">
              {article.articleType || 'Feature Essay'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums text-[#E2BA6B]">{editorialGallery.length + 1} Photographs</span>
          </div>
        </motion.div>

        {/* Staggered Article Header */}
        <motion.header
          variants={articleStaggerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4 max-w-4xl"
        >
          <motion.span variants={articleItemVariants} className="tglc-kicker block">
            {article.articleType || 'Feature Essay'} · {article.category}
          </motion.span>

          <motion.h1 variants={articleItemVariants} className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] text-[#FAF7F0] leading-[1.08] text-balance">
            {article.title}
          </motion.h1>

          <motion.p variants={articleItemVariants} className="font-serif italic text-lg sm:text-2xl text-[#E2BA6B] leading-relaxed">
            {article.subtitle}
          </motion.p>

          <motion.div variants={articleItemVariants} className="pt-1 tglc-meta flex flex-wrap items-center gap-2.5 text-xs">
            <span>
              By <strong className="text-[#FAF7F0] font-medium">{article.author}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E2BA6B]">{article.authorRole}</span>
          </motion.div>
        </motion.header>

        {/* Full-Width 16:9 Hero Plate with Lightbox Inspection */}
        <motion.div
          variants={articlePlateVariants}
          initial="hidden"
          animate="show"
          onClick={() => setLightboxIndex(0)}
          className="group relative aspect-[16/9] w-full overflow-hidden bg-[#0D1017] border border-[#242630] hover:border-[#E2BA6B]/70 transition-colors cursor-zoom-in"
        >
          <motion.img
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 9, ease: 'easeOut' }}
            src={article.heroImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-[1.02] transition-transform duration-700"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(0);
            }}
            aria-label="Inspect full resolution hero plate"
            className="absolute bottom-3 right-3 bg-[#07080B]/85 border border-[#2C3140] group-hover:border-[#E2BA6B] px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#FAF7F0] flex items-center gap-1.5 opacity-85 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="w-3 h-3 text-[#E2BA6B]" />
            <span>Inspect Plate</span>
          </button>
        </motion.div>

        {/* Optional Pull-Stats Key Metrics Bar */}
        {article.pullStats && article.pullStats.length > 0 && (
          <motion.div
            variants={articleStaggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0D1017] border border-[#242630] p-5"
          >
            {article.pullStats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={articleItemVariants}
                className="sm:border-l first:border-l-0 border-[#20232E] sm:pl-5 first:pl-0 flex flex-col justify-center"
              >
                <span className="font-serif text-2xl sm:text-3xl text-[#E2BA6B] tabular-nums">{stat.value}</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8F98AA] mt-0.5">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Asymmetric 12-Column Editorial Layout: 8-col Main Essay + 4-col Sticky Briefing Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-2">
          {/* Left / Main Reading Column */}
          <article className="lg:col-span-8 max-w-prose space-y-6 text-base sm:text-[17px] text-[#D4D8E2] leading-[1.78]">
            {/* Opening Paragraph with Gold Drop Cap */}
            {article.contentParagraphs[0] && (
              <motion.p
                initial={{ opacity: 0.9, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="text-[#FAF7F0] first-letter:text-5xl first-letter:font-serif first-letter:text-[#E2BA6B] first-letter:mr-3 first-letter:mt-1 first-letter:float-left first-letter:leading-none"
              >
                {article.contentParagraphs[0]}
              </motion.p>
            )}

            {/* 1st Embedded Full-Width Documentary Plate */}
            <motion.figure
              variants={articleItemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              onClick={() => setLightboxIndex(1)}
              className="my-7 space-y-2.5 group cursor-zoom-in"
            >
              <motion.div
                variants={articlePlateVariants}
                className="relative aspect-[16/9] w-full overflow-hidden border border-[#242630] group-hover:border-[#E2BA6B]/70 bg-[#0D1017] transition-colors"
              >
                <img
                  src={widePlate}
                  alt={captions[0] || article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-3 right-3 bg-[#07080B]/85 border border-[#2C3140] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#E2BA6B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" />
                  <span>Plate 02</span>
                </span>
              </motion.div>
              <figcaption className="text-xs font-serif italic text-[#B5AFA3] leading-relaxed">
                {captions[0]}
              </figcaption>
            </motion.figure>

            {/* Remaining Intro Paragraphs */}
            {article.contentParagraphs.slice(1).map((para, i) => (
              <motion.p
                key={i + 1}
                initial={{ opacity: 0.9, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.45 }}
              >
                {para}
              </motion.p>
            ))}

            {/* Centered Pull Quote */}
            {article.pullQuote && (
              <motion.blockquote
                variants={articleItemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                className="my-8 py-7 px-6 sm:px-10 border-y border-[#8B672B]/55 bg-[#0D1017] text-center space-y-3"
              >
                <p className="font-serif italic text-2xl sm:text-3xl text-[#FAF7F0] leading-relaxed">
                  “{article.pullQuote}”
                </p>
                <cite className="not-italic tglc-kicker block">TGLC Editorial Notes</cite>
              </motion.blockquote>
            )}

            {/* 2-Up Photography Diptych */}
            {firstDiptych.length > 0 && (
              <motion.div
                variants={articleStaggerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                className="my-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {firstDiptych.map((imgPath, gIdx) => (
                  <motion.figure
                    key={gIdx}
                    variants={articleItemVariants}
                    onClick={() => setLightboxIndex(gIdx + 2)}
                    className="space-y-2 group cursor-zoom-in"
                  >
                    <motion.div
                      variants={articlePlateVariants}
                      className="relative aspect-[4/3] overflow-hidden border border-[#242630] group-hover:border-[#E2BA6B]/70 bg-[#0D1017] transition-colors"
                    >
                      <img
                        src={imgPath}
                        alt={captions[gIdx + 1] || `${article.title} photograph ${gIdx + 2}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute bottom-2.5 right-2.5 bg-[#07080B]/85 border border-[#2C3140] px-2 py-1 text-[10px] font-mono text-[#E2BA6B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3" />
                        <span>Plate 0{gIdx + 3}</span>
                      </span>
                    </motion.div>
                    <figcaption className="text-xs font-serif italic text-[#B5AFA3] leading-relaxed">
                      {captions[gIdx + 1] || 'Scenes documented across the evenings covered in this briefing.'}
                    </figcaption>
                  </motion.figure>
                ))}
              </motion.div>
            )}

            {/* Long-Form Subheadings with Staggered Chapters & Interleaved Extra Gallery */}
            {article.subheadings &&
              article.subheadings.map((sub, idx) => (
                <React.Fragment key={idx}>
                  <motion.section
                    variants={articleStaggerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.05 }}
                    className="space-y-3.5 pt-5 border-t border-[#1A1D28]"
                  >
                    <motion.span variants={articleItemVariants} className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#E2BA6B] block">
                      Chapter {String(idx + 1).padStart(2, '0')}
                    </motion.span>
                    <motion.h2 variants={articleItemVariants} className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] leading-snug">
                      {sub.title}
                    </motion.h2>
                    {sub.paragraphs.map((p, pIdx) => (
                      <motion.p variants={articleItemVariants} key={pIdx} className="text-[#D4D8E2]">
                        {p}
                      </motion.p>
                    ))}
                  </motion.section>

                  {/* Insert additional photography spread mid-essay when article supplies 4-5 images */}
                  {idx === 1 && secondaryPlates.length > 0 && (
                    <motion.div
                      variants={articleStaggerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.05 }}
                      className={`my-7 grid gap-5 ${
                        secondaryPlates.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                      }`}
                    >
                      {secondaryPlates.map((extraImg, eIdx) => (
                        <motion.figure
                          key={eIdx}
                          variants={articleItemVariants}
                          onClick={() => setLightboxIndex(eIdx + 4)}
                          className="space-y-2 group cursor-zoom-in"
                        >
                          <motion.div
                            variants={articlePlateVariants}
                            className={`relative ${
                              secondaryPlates.length > 1 ? 'aspect-[4/3]' : 'aspect-[16/9]'
                            } overflow-hidden border border-[#242630] group-hover:border-[#E2BA6B]/70 bg-[#0D1017] transition-colors`}
                          >
                            <img
                              src={extraImg}
                              alt={captions[eIdx + 3] || `${article.title} additional view ${eIdx + 1}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                            />
                            <span className="absolute bottom-2.5 right-2.5 bg-[#07080B]/85 border border-[#2C3140] px-2 py-1 text-[10px] font-mono text-[#E2BA6B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="w-3 h-3" />
                              <span>Plate 0{eIdx + 5}</span>
                            </span>
                          </motion.div>
                          <figcaption className="text-xs font-serif italic text-[#B5AFA3] leading-relaxed">
                            {captions[eIdx + 3] || 'On-site field frame recorded by our Albemarle Street editorial desk.'}
                          </figcaption>
                        </motion.figure>
                      ))}
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
          </article>

          {/* Right Sticky Briefing Dossier Sidebar */}
          <motion.aside
            variants={articleStaggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="lg:col-span-4 lg:sticky lg:top-24 space-y-6"
          >
            <motion.div variants={articleItemVariants} className="bg-[#0D1017] border border-[#242630] p-6 space-y-5">
              <div>
                <span className="tglc-kicker block">Briefing Dossier</span>
                <h3 className="font-serif text-2xl text-[#FAF7F0] mt-1">
                  Operational Context
                </h3>
              </div>

              <dl className="divide-y divide-[#1E2230] text-xs">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#8F98AA] font-mono uppercase tracking-wider shrink-0">Format</dt>
                  <dd className="text-[#FAF7F0] text-right font-medium">{article.articleType || 'Feature Essay'}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#8F98AA] font-mono uppercase tracking-wider shrink-0">Discipline</dt>
                  <dd className="text-[#FAF7F0] text-right">{article.category}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-[#8F98AA] font-mono uppercase tracking-wider shrink-0">Published</dt>
                  <dd className="text-[#FAF7F0] text-right tabular-nums">{article.publishDate}</dd>
                </div>
                {article.eventDates && (
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#8F98AA] font-mono uppercase tracking-wider shrink-0">Window</dt>
                    <dd className="text-[#E2BA6B] text-right font-medium">{article.eventDates}</dd>
                  </div>
                )}
                {article.venueNote && (
                  <div className="py-2.5 space-y-1">
                    <dt className="text-[#8F98AA] font-mono uppercase tracking-wider">Locations</dt>
                    <dd className="text-[#D4D8E2] leading-relaxed">{article.venueNote}</dd>
                  </div>
                )}
              </dl>

              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <div className="pt-2 border-t border-[#1E2230] space-y-2.5">
                  <span className="tglc-kicker block">Key Intelligence</span>
                  <ul className="space-y-2">
                    {article.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="text-xs text-[#D4D8E2] leading-relaxed flex items-start gap-2">
                        <span className="text-[#E2BA6B] font-mono shrink-0">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={() => openIntroductionModal(`Journal Brief: ${article.title}`)}
                  className="btn-gold w-full min-h-[44px] py-3 px-4 text-xs flex items-center justify-center gap-2"
                >
                  <span>Inquire / Request Preview</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('calendar')}
                  className="btn-outline-gold w-full min-h-[44px] py-3 px-4 text-xs flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Browse Calendar Events</span>
                </button>
              </div>
            </motion.div>

            {/* Author Card inside Dossier Column */}
            <motion.div
              variants={articleItemVariants}
              whileHover={{ y: -2 }}
              onClick={() => navigateTo('about')}
              className="bg-[#0D1017] border border-[#242630] hover:border-[#8B672B] p-5 flex items-start gap-4 cursor-pointer transition-colors"
            >
              {matchingTeam && matchingTeam.image ? (
                <img
                  src={matchingTeam.image}
                  alt={article.author}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-cover object-top border border-[#8B672B] shrink-0"
                />
              ) : (
                <div className="w-14 h-14 bg-[#131722] border border-[#8B672B] flex items-center justify-center font-serif text-lg text-[#E2BA6B] shrink-0">
                  {matchingTeam?.initials || article.author.charAt(0)}
                </div>
              )}
              <div className="space-y-1 min-w-0">
                <span className="tglc-kicker text-[10px] block">House Contributor</span>
                <h4 className="font-serif text-lg text-[#FAF7F0] leading-tight">{article.author}</h4>
                <p className="text-[11px] text-[#E2BA6B] leading-snug">{article.authorRole}</p>
                <p className="text-xs text-[#8F98AA] leading-relaxed pt-1">
                  Dispatches originate from 45 Albemarle Street, Mayfair.
                </p>
              </div>
            </motion.div>
          </motion.aside>
        </div>

        <GoldDivider />

        {/* Staggered Related Dispatches & Briefings */}
        <motion.section
          variants={articleStaggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="pt-2 space-y-6"
        >
          <motion.div variants={articleItemVariants} className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="tglc-kicker block">Further Reading</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] mt-1">
                Continue Through The Journal
              </h3>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('journal')}
              className="text-xs font-mono uppercase tracking-wider text-[#E2BA6B] hover:text-[#FAF7F0] transition-colors flex items-center gap-1 min-h-[44px]"
            >
              <span>All Dispatches</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          <motion.div variants={articleStaggerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <motion.article
                key={rel.slug}
                variants={articleItemVariants}
                whileHover={{ y: -3 }}
                onClick={() => navigateTo('journal-article', { articleSlug: rel.slug })}
                className="group bg-[#0D1017] border border-[#242630] hover:border-[#E2BA6B]/70 cursor-pointer transition-colors overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <motion.div variants={articlePlateVariants} className="aspect-[16/10] w-full overflow-hidden bg-[#131722]">
                    <img
                      src={rel.heroImage}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                  <div className="p-5 space-y-2">
                    <div className="tglc-meta text-[11px] flex items-center gap-2">
                      <span className="text-[#E2BA6B] uppercase tracking-wider">
                        {rel.articleType || 'Essay'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{rel.category}</span>
                    </div>
                    <h4 className="font-serif text-xl text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#8F98AA] line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-4 space-y-2.5">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#E2BA6B] flex items-center gap-1">
                    <span>Open Brief</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="block h-[1px] w-full bg-[#191C26] overflow-hidden">
                    <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-[#8B672B] via-[#E2BA6B] to-[#C4933F] transition-all duration-500" />
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* Interactive Editorial Plate Lightbox (AnimatePresence) */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxSlides[lightboxIndex] && (
          <motion.div
            key="editorial-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[120] bg-[#050608]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 border-b border-[#1E202B] pb-3"
            >
              <div className="flex items-center gap-3 text-xs font-mono text-[#E2BA6B]">
                <span className="tabular-nums">
                  PLATE {String(lightboxIndex + 1).padStart(2, '0')} / {String(lightboxSlides.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true" className="text-[#4A4E5E]">·</span>
                <span className="text-[#9C968A] truncate max-w-[200px] sm:max-w-md">{article.title}</span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close plate lightbox"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center border border-[#2C3140] hover:border-[#E2BA6B] bg-[#0D1017] text-[#FAF7F0] hover:text-[#E2BA6B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active Plate */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full mx-auto flex-1 flex items-center justify-center py-4 min-h-0 relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxSlides[lightboxIndex].src}
                  initial={{ opacity: 0.4, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.4, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={lightboxSlides[lightboxIndex].src}
                    alt={lightboxSlides[lightboxIndex].alt}
                    referrerPolicy="no-referrer"
                    className="max-h-[68vh] w-auto max-w-full object-contain border border-[#262936] shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption & Prev/Next Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1E202B] pt-4"
            >
              <p className="font-serif italic text-sm sm:text-base text-[#D9D4CA] max-w-3xl">
                {lightboxSlides[lightboxIndex].caption}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null ? 0 : (prev - 1 + lightboxSlides.length) % lightboxSlides.length
                    )
                  }
                  aria-label="Previous plate"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center border border-[#2C3140] hover:border-[#E2BA6B] bg-[#0D1017] text-[#FAF7F0] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % lightboxSlides.length
                    )
                  }
                  aria-label="Next plate"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center border border-[#2C3140] hover:border-[#E2BA6B] bg-[#0D1017] text-[#FAF7F0] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
