import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ARTICLES } from '../data/encyclopediaArticles';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Callout } from '../components/ui/Callout';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { useDocumentMetadata } from '../utils/seo';
import { calculateReadingTime } from '../utils/readingTime';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Info,
  Calendar,
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showReviewStatus, setShowReviewStatus] = useState<boolean>(false);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const article = ARTICLES.find((a) => a.slug === slug);

  // SEO metadata synchronization
  useDocumentMetadata({
    title: article ? article.seo?.title || article.title : 'Article Not Found',
    description: article
      ? article.seo?.description || article.summary
      : 'The requested encyclopedia article could not be found.',
    canonicalUrl: article ? article.seo?.canonicalUrl : undefined,
    ogType: 'article',
  });

  // Calculate actual reading time from content
  const readingTime = useMemo(() => {
    if (!article) return 1;
    return calculateReadingTime(article.sections, article.summary);
  }, [article]);

  // Active section tracking via IntersectionObserver for polished reading rhythm
  useEffect(() => {
    if (!article || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const sectionIds = [
      ...article.sections.map((_, idx) => `section-${idx}`),
      'evidence-transparency',
      'references',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSectionId(visible.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -55% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [article]);

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  // Resolve related articles strictly from relatedArticleSlugs, falling back to same-category
  const relatedArticles = (
    article.relatedArticleSlugs
      ? article.relatedArticleSlugs
          .map((relSlug) => ARTICLES.find((a) => a.slug === relSlug))
          .filter((a): a is typeof article => Boolean(a && a.slug !== article.slug))
      : ARTICLES.filter((a) => a.slug !== article.slug)
  ).slice(0, 2);

  // Evidence Tier Config
  const getEvidenceTierConfig = (tier: string) => {
    switch (tier) {
      case 'established':
        return {
          variant: 'sage' as const,
          label: 'Established Finding',
          icon: ShieldCheck,
          summary: 'Supported by robust clinical guidelines, textbook consensus, or large peer-reviewed cohorts.',
        };
      case 'emerging':
        return {
          variant: 'amber' as const,
          label: 'Emerging Research',
          icon: Sparkles,
          summary: 'Promising physiological evidence with ongoing research into individual variations or mechanisms.',
        };
      case 'limited':
      default:
        return {
          variant: 'blush' as const,
          label: 'Limited Evidence',
          icon: HelpCircle,
          summary: 'Preliminary evidence with high methodological uncertainty or limited clinical consensus.',
        };
    }
  };

  const evidenceConfig = getEvidenceTierConfig(article.evidenceTier);
  const EvidenceIcon = evidenceConfig.icon;

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Top Breadcrumb Navigation */}
      <div className="pt-6 sm:pt-8 pb-4">
        <Breadcrumbs
          items={[
            { label: 'Encyclopedia', path: '/encyclopedia' },
            { label: article.categoryLabel },
          ]}
        />
      </div>

      {/* Main Two-Column Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Sidebar: Supporting Information (Desktop: Col 1-4, Order 1; Mobile: Order 2) */}
        <aside
          aria-label="Supporting Information"
          className="order-2 lg:order-1 lg:col-span-4 space-y-6"
        >
          {/* 1. In This Guide: Desktop Table of Contents */}
          <div className="hidden lg:block">
            <Card variant="flat" padding="md" className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#593744] dark:text-[#F8F0F3]">
                <BookOpen className="w-4 h-4 text-[#9E4F66] dark:text-[#E8A2B6]" aria-hidden="true" />
                <span>In This Guide</span>
              </div>
              <nav aria-label="Table of Contents">
                <ul className="space-y-1.5 text-xs">
                  {article.sections.map((section, idx) => {
                    const sectionId = `section-${idx}`;
                    const isActive = activeSectionId === sectionId;
                    return (
                      <li key={idx}>
                        <a
                          href={`#${sectionId}`}
                          className={`block py-1 leading-normal transition-all rounded-r ${
                            isActive
                              ? 'font-semibold text-[#9E4F66] dark:text-[#E8A2B6] border-l-2 border-[#9E4F66] dark:border-[#E8A2B6] pl-2 -ml-2'
                              : 'text-[#74505F] dark:text-[#C7B8C2] hover:text-[#593744] dark:hover:text-[#F8F0F3] hover:underline pl-2'
                          }`}
                        >
                          {section.heading}
                        </a>
                      </li>
                    );
                  })}
                  <li className="pt-1.5 border-t border-[#EED9D5]/60 dark:border-[#493744]/60">
                    <a
                      href="#evidence-transparency"
                      className={`block py-1 leading-normal transition-all rounded-r ${
                        activeSectionId === 'evidence-transparency'
                          ? 'font-semibold text-[#4A7853] dark:text-[#A8DEB3] border-l-2 border-[#4A7853] dark:border-[#A8DEB3] pl-2 -ml-2'
                          : 'text-[#4A7853] dark:text-[#A8DEB3] hover:underline pl-2 font-medium'
                      }`}
                    >
                      Evidence Classification
                    </a>
                  </li>
                  <li>
                    <a
                      href="#references"
                      className={`block py-1 leading-normal transition-all rounded-r ${
                        activeSectionId === 'references'
                          ? 'font-semibold text-[#9E4F66] dark:text-[#E8A2B6] border-l-2 border-[#9E4F66] dark:border-[#E8A2B6] pl-2 -ml-2'
                          : 'text-[#9E4F66] dark:text-[#E8A2B6] hover:underline pl-2 font-medium'
                      }`}
                    >
                      Clinical References ({article.references.length})
                    </a>
                  </li>
                </ul>
              </nav>
            </Card>
          </div>

          {/* 2. Evidence Transparency: Compact Section */}
          <section
            id="evidence-transparency"
            aria-labelledby="evidence-transparency-heading"
            className="bg-[#FBF1ED] dark:bg-[#211A22] border border-[#EED9D5] dark:border-[#493744] rounded-2xl p-4 sm:p-5 space-y-3 scroll-mt-28"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#4A7853] dark:text-[#A8DEB3] shrink-0" aria-hidden="true" />
              <h2
                id="evidence-transparency-heading"
                className="font-editorial text-base sm:text-lg font-bold text-[#593744] dark:text-[#F8F0F3] leading-snug"
              >
                Evidence Transparency &amp; Scientific Basis
              </h2>
            </div>

            <div className="space-y-2.5 text-xs text-[#74505F] dark:text-[#C7B8C2]">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={evidenceConfig.variant} size="sm">
                  <span className="flex items-center gap-1">
                    <EvidenceIcon className="w-3 h-3" aria-hidden="true" />
                    <span>{evidenceConfig.label}</span>
                  </span>
                </Badge>
                <span className="text-[11px] font-medium text-[#593744] dark:text-[#F8F0F3]">
                  {evidenceConfig.summary}
                </span>
              </div>

              <p className="leading-relaxed">
                {article.evidenceExplanation}
              </p>

              <p className="text-[11px] text-[#8C6775] dark:text-[#A3919D] pt-2 border-t border-[#EED9D5]/60 dark:border-[#493744]/60 leading-relaxed">
                In accordance with NASA’s Science &amp; Evidence principles, we do not present correlations as causal, estimates as clinical measurements, or 28-day cycles as a universal norm.
              </p>
            </div>
          </section>

          {/* 3. Clinical & Scientific References: Compact Well-Spaced List */}
          <section
            id="references"
            aria-labelledby="references-heading"
            className="bg-[#FBF1ED] dark:bg-[#211A22] border border-[#EED9D5] dark:border-[#493744] rounded-2xl p-4 sm:p-5 space-y-3.5 scroll-mt-28"
          >
            <div className="flex items-center justify-between gap-2">
              <h2
                id="references-heading"
                className="font-editorial text-base sm:text-lg font-bold text-[#593744] dark:text-[#F8F0F3] leading-snug"
              >
                Clinical &amp; Scientific References
              </h2>
              <span className="text-[11px] text-[#8C6775] dark:text-[#A3919D] font-medium shrink-0">
                {article.references.length} sources
              </span>
            </div>

            <p className="text-[11px] text-[#74505F] dark:text-[#C7B8C2] leading-relaxed">
              In accordance with our Science &amp; Evidence principles, this article cites published clinical consensus statements, textbooks, and peer-reviewed journals without fabricated citations.
            </p>

            <ol className="space-y-3 pt-1 list-none m-0 p-0">
              {article.references.map((ref) => (
                <li
                  key={ref.id}
                  id={ref.id}
                  className="p-3.5 rounded-xl bg-white/80 dark:bg-[#2B222C]/80 border border-[#EED9D5]/70 dark:border-[#493744]/70 text-xs space-y-1.5 scroll-mt-28 transition-colors shadow-2xs"
                >
                  <div className="flex items-baseline justify-between gap-1.5">
                    <span className="font-semibold text-xs text-[#593744] dark:text-[#F8F0F3] leading-tight">
                      {ref.title}
                    </span>
                    <span className="text-[#8C6775] dark:text-[#A3919D] font-mono text-[10px] shrink-0">
                      ({ref.year})
                    </span>
                  </div>
                  <p className="text-[11px] text-[#74505F] dark:text-[#C7B8C2] leading-relaxed">
                    {ref.authors} — <em>{ref.source}</em>
                  </p>
                  {ref.note && (
                    <p className="text-[10px] text-[#8C6775] dark:text-[#A3919D] italic pt-0.5 leading-relaxed">
                      Note: {ref.note}
                    </p>
                  )}
                  {ref.doiOrUrl && (
                    <a
                      href={ref.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Access source publication: ${ref.title}`}
                      className="inline-flex items-center gap-1 text-[11px] text-[#9E4F66] dark:text-[#E8A2B6] hover:underline pt-0.5 font-semibold"
                    >
                      <span>Access Publication Source</span>
                      <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* 4. Back to Health Encyclopedia: Discreet Navigation Link */}
          <div className="pt-1">
            <Link
              to="/encyclopedia"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6775] dark:text-[#A3919D] hover:text-[#593744] dark:hover:text-[#F8F0F3] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to Health Encyclopedia</span>
            </Link>
          </div>
        </aside>

        {/* Main Column: Primary Reading Experience (Desktop: Col 5-12, Order 2; Mobile: Order 1) */}
        <div className="order-1 lg:order-2 lg:col-span-8 space-y-8">
          {/* 1. Article Title & Introductory Summary */}
          <header className="space-y-3 pb-6 border-b border-[#EED9D5] dark:border-[#493744]">
            {/* Category Kicker */}
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#9E4F66] dark:text-[#E8A2B6]">
              {article.categoryLabel}
            </span>

            {/* Article Title: Prominent, Editorial Serif, Line-Length Constrained */}
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-[#593744] dark:text-[#F8F0F3] tracking-tight leading-[1.18] max-w-4xl text-balance">
              {article.title}
            </h1>

            {/* Subtitle / Lead Paragraph */}
            <p className="text-base sm:text-lg text-[#74505F] dark:text-[#C7B8C2] leading-relaxed max-w-3xl font-light">
              {article.subtitle}
            </p>

            {/* 2. Compact Article Metadata */}
            <div className="pt-3.5 border-t border-[#F5E4E0] dark:border-[#3B2A35] flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs text-[#74505F] dark:text-[#C7B8C2]">
              {/* Estimated Reading Time */}
              <div className="inline-flex items-center gap-1.5 font-medium text-[#593744] dark:text-[#F8F0F3]">
                <Clock className="w-3.5 h-3.5 text-[#9E4F66] dark:text-[#E8A2B6]" aria-hidden="true" />
                <span>{readingTime} min read</span>
              </div>

              <span className="text-[#D99B9F] dark:text-[#634757] hidden sm:inline" aria-hidden="true">
                •
              </span>

              {/* Last Updated */}
              <div className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C6775] dark:text-[#A3919D]" aria-hidden="true" />
                <span>Updated {article.lastReviewed}</span>
              </div>

              <span className="text-[#D99B9F] dark:text-[#634757] hidden sm:inline" aria-hidden="true">
                •
              </span>

              {/* Evidence Classification Badge */}
              <Badge variant={evidenceConfig.variant} size="sm">
                <span className="flex items-center gap-1">
                  <EvidenceIcon className="w-3 h-3" aria-hidden="true" />
                  <span>{evidenceConfig.label}</span>
                </span>
              </Badge>

              <span className="text-[#D99B9F] dark:text-[#634757] hidden sm:inline" aria-hidden="true">
                •
              </span>

              {/* Draft/Review Status Badge */}
              <Badge variant="blush" size="sm">
                Educational Starter Draft
              </Badge>

              <span className="text-[#D99B9F] dark:text-[#634757] hidden sm:inline" aria-hidden="true">
                •
              </span>

              {/* Understated Review Status Trigger */}
              <button
                type="button"
                onClick={() => setShowReviewStatus(!showReviewStatus)}
                aria-expanded={showReviewStatus}
                aria-controls="article-review-status"
                className="inline-flex items-center gap-1 font-medium text-[#9E4F66] dark:text-[#E8A2B6] hover:text-[#763246] dark:hover:text-[#F2DCD9] hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E4F66] rounded px-1.5 py-0.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Review status</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    showReviewStatus ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Expandable Review Status Details */}
            {showReviewStatus && (
              <div
                id="article-review-status"
                className="mt-3 p-3.5 rounded-xl bg-[#FBF1ED] dark:bg-[#211A22] border border-[#EED9D5] dark:border-[#493744] text-xs text-[#74505F] dark:text-[#C7B8C2] flex items-start gap-2.5 animate-in fade-in duration-200"
              >
                <Sparkles className="w-4 h-4 text-[#9E4F66] dark:text-[#E8A2B6] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <strong className="text-[#593744] dark:text-[#F8F0F3] block font-semibold">
                    Content Review Status:
                  </strong>
                  <p className="leading-relaxed">{article.reviewStatus}</p>
                  {article.editorial?.authorName && (
                    <p className="text-[11px] text-[#8C6775] dark:text-[#A3919D] pt-0.5">
                      Editorial Attribution: {article.editorial.authorName} ({article.editorial.authorRole})
                    </p>
                  )}
                </div>
              </div>
            )}
          </header>

          {/* Mobile Table of Contents Accordion (Only visible on small screens) */}
          {article.sections.length > 1 && (
            <div className="lg:hidden p-3.5 rounded-2xl bg-[#FBF1ED] dark:bg-[#211A22] border border-[#EED9D5] dark:border-[#493744]">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#593744] dark:text-[#F8F0F3] cursor-pointer"
                aria-expanded={mobileTocOpen}
                aria-controls="mobile-table-of-contents"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#9E4F66] dark:text-[#E8A2B6]" aria-hidden="true" />
                  <span>Table of Contents ({article.sections.length} sections)</span>
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileTocOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileTocOpen && (
                <ul
                  id="mobile-table-of-contents"
                  className="mt-3 pt-3 border-t border-[#EED9D5] dark:border-[#493744] space-y-2 text-xs text-[#74505F] dark:text-[#C7B8C2]"
                >
                  {article.sections.map((section, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        onClick={() => setMobileTocOpen(false)}
                        className="hover:underline block py-1 text-[#593744] dark:text-[#F8F0F3]"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#evidence-transparency"
                      onClick={() => setMobileTocOpen(false)}
                      className="hover:underline block py-1 text-[#4A7853] dark:text-[#A8DEB3] font-medium"
                    >
                      Evidence Classification
                    </a>
                  </li>
                  <li>
                    <a
                      href="#references"
                      onClick={() => setMobileTocOpen(false)}
                      className="hover:underline block py-1 font-semibold text-[#9E4F66] dark:text-[#E8A2B6]"
                    >
                      Clinical References ({article.references.length})
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* 3. Understated Educational Boundary Notice */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FBF1ED]/80 dark:bg-[#211A22] border border-[#EED9D5] dark:border-[#493744] flex items-start gap-3 text-xs text-[#74505F] dark:text-[#C7B8C2] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-[#9E4F66] dark:text-[#E8A2B6] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong className="font-semibold text-[#593744] dark:text-[#F8F0F3]">Educational Boundary Notice:</strong>{' '}
              {article.disclaimer ||
                'This article provides general physiological education. It does not replace clinical consultation, diagnosis, or personalized medical care from a licensed healthcare provider.'}
            </p>
          </div>

          {/* 4. Main Article Content and Relevant In-Body Callouts */}
          {/* Key Takeaways Box */}
          <div className="bg-[#FBF1ED] dark:bg-[#211A22] p-5 sm:p-6 rounded-2xl border border-[#EED9D5] dark:border-[#493744] space-y-3.5">
            <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#593744] dark:text-[#F8F0F3] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A7853] dark:text-[#A8DEB3]" aria-hidden="true" />
              <span>Key Takeaways</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#593744] dark:text-[#F8F0F3]">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#9E4F66] dark:bg-[#E8A2B6] mt-2 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections Loop */}
          <div className="space-y-12">
            {article.sections.map((section, idx) => (
              <section
                key={idx}
                id={`section-${idx}`}
                className="space-y-5 scroll-mt-28"
              >
                <h2 className="font-editorial text-2xl sm:text-[1.85rem] font-semibold text-[#593744] dark:text-[#F8F0F3] pt-6 border-t border-[#EED9D5] dark:border-[#493744] leading-snug">
                  {section.heading}
                </h2>

                {/* Paragraphs with optimal line length (65-75ch) and generous reading leading */}
                <div className="space-y-4 text-base sm:text-[1.0625rem] text-[#593744] dark:text-[#F8F0F3] leading-[1.8] max-w-prose">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Subsections if present */}
                {section.subsections && section.subsections.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {section.subsections.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-white dark:bg-[#2B222C] p-4.5 rounded-2xl border border-[#EED9D5] dark:border-[#493744] text-xs sm:text-sm space-y-2 shadow-2xs"
                      >
                        <h3 className="font-bold text-sm text-[#593744] dark:text-[#F8F0F3] leading-snug">
                          {sub.title}
                        </h3>
                        <p className="text-[#74505F] dark:text-[#C7B8C2] leading-relaxed">
                          {sub.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Callout if present */}
                {section.callout && (
                  <div className="pt-2 max-w-prose">
                    <Callout
                      type={section.callout.type}
                      title={section.callout.title}
                      text={section.callout.text}
                    />
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* 5. Related Guides & Next Reading (Immediately at the end of article content) */}
          {relatedArticles.length > 0 && (
            <div className="pt-10 border-t border-[#EED9D5] dark:border-[#493744] space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C6775] dark:text-[#A3919D]">
                  Related Guides &amp; Next Reading
                </h3>
                <Link
                  to="/encyclopedia"
                  className="text-xs text-[#9E4F66] dark:text-[#E8A2B6] hover:underline font-semibold"
                >
                  View all guides
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/encyclopedia/${rel.slug}`}
                    className="p-5 bg-white dark:bg-[#2B222C] rounded-2xl border border-[#EED9D5] dark:border-[#493744] hover:border-[#9E4F66] dark:hover:border-[#E8A2B6] transition-colors block group text-left shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs text-[#9E4F66] dark:text-[#E8A2B6] font-semibold">
                        {rel.categoryLabel}
                      </span>
                      <span className="text-[11px] text-[#8C6775] dark:text-[#A3919D]">
                        {rel.readingTimeMinutes} min read
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#593744] dark:text-[#F8F0F3] group-hover:text-[#9E4F66] dark:group-hover:text-[#E8A2B6] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#74505F] dark:text-[#C7B8C2] mt-1 line-clamp-2 leading-relaxed">
                      {rel.subtitle}
                    </p>
                    <div className="mt-3 text-xs text-[#9E4F66] dark:text-[#E8A2B6] font-semibold flex items-center gap-1">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Discreet End-of-Page Navigation */}
          <div className="pt-2">
            <Link
              to="/encyclopedia"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6775] dark:text-[#A3919D] hover:text-[#593744] dark:hover:text-[#F8F0F3] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to Health Encyclopedia</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
