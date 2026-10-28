import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ARTICLES } from '../data/encyclopediaArticles';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Callout } from '../components/ui/Callout';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { useDocumentMetadata } from '../utils/seo';
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
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showReviewStatus, setShowReviewStatus] = useState<boolean>(false);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

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

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  // Resolve related articles from relatedArticleSlugs, falling back to same-category
  const relatedArticles = (
    article.relatedArticleSlugs
      ? article.relatedArticleSlugs
          .map((relSlug) => ARTICLES.find((a) => a.slug === relSlug))
          .filter((a): a is typeof article => Boolean(a))
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
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Refined Compact Article Header */}
      <header className="pt-6 sm:pt-8 pb-6 border-b border-[#EED9D5] dark:border-[#493744]">
        {/* Breadcrumb Navigation */}
        <div className="mb-3">
          <Breadcrumbs
            items={[
              { label: 'Encyclopedia', path: '/encyclopedia' },
              { label: article.categoryLabel },
            ]}
          />
        </div>

        {/* Category Kicker */}
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#9E4F66] dark:text-[#E8A2B6] mb-1.5">
          {article.categoryLabel}
        </span>

        {/* Article Title: Prominent, Line-Length Constrained */}
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-[#593744] dark:text-[#F8F0F3] tracking-tight leading-[1.18] max-w-4xl text-balance">
          {article.title}
        </h1>

        {/* Subtitle / Lead Paragraph */}
        <p className="mt-3 text-base sm:text-lg text-[#74505F] dark:text-[#C7B8C2] leading-relaxed max-w-3xl">
          {article.subtitle}
        </p>

        {/* Compact Metadata Row */}
        <div className="mt-5 pt-3.5 border-t border-[#F5E4E0] dark:border-[#3B2A35] flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs text-[#74505F] dark:text-[#C7B8C2]">
          {/* Estimated Reading Time */}
          <div className="inline-flex items-center gap-1.5 font-medium text-[#593744] dark:text-[#F8F0F3]">
            <Clock className="w-3.5 h-3.5 text-[#9E4F66] dark:text-[#E8A2B6]" aria-hidden="true" />
            <span>{article.readingTimeMinutes} min read</span>
          </div>

          <span className="text-[#D99B9F] dark:text-[#634757] hidden sm:inline" aria-hidden="true">
            •
          </span>

          {/* Last Updated */}
          <span>Updated {article.lastReviewed}</span>

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

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
        {/* Sticky Sidebar Table of Contents (Desktop) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
          {/* Table of Contents Card */}
          <Card variant="flat" padding="md" className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#593744] dark:text-[#F8F0F3]">
              <BookOpen className="w-4 h-4 text-[#9E4F66] dark:text-[#E8A2B6]" aria-hidden="true" />
              <span>In This Guide</span>
            </div>
            <nav aria-label="Table of Contents">
              <ul className="space-y-2 text-xs text-[#74505F] dark:text-[#C7B8C2]">
                {article.sections.map((section, idx) => (
                  <li key={idx}>
                    <a
                      href={`#section-${idx}`}
                      className="hover:text-[#593744] dark:hover:text-[#F8F0F3] hover:underline block leading-normal transition-colors py-0.5"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#evidence-transparency"
                    className="hover:text-[#593744] dark:hover:text-[#F8F0F3] hover:underline block leading-normal transition-colors py-0.5 font-medium text-[#4A7853] dark:text-[#A8DEB3]"
                  >
                    Evidence Classification
                  </a>
                </li>
                <li>
                  <a
                    href="#references"
                    className="hover:text-[#593744] dark:hover:text-[#F8F0F3] hover:underline font-semibold block text-[#9E4F66] dark:text-[#E8A2B6] pt-1"
                  >
                    Clinical References ({article.references.length})
                  </a>
                </li>
              </ul>
            </nav>
          </Card>

          {/* Quick Return to Encyclopedia */}
          <Link
            to="/encyclopedia"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6775] dark:text-[#A3919D] hover:text-[#593744] dark:hover:text-[#F8F0F3] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Health Encyclopedia</span>
          </Link>
        </aside>

        {/* Main Article Body & Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Mobile Table of Contents Accordion */}
          {article.sections.length > 2 && (
            <div className="lg:hidden p-3.5 rounded-2xl bg-[#FBF1ED] dark:bg-[#211A22] border border-[#EED9D5] dark:border-[#493744]">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#593744] dark:text-[#F8F0F3] cursor-pointer"
                aria-expanded={mobileTocOpen}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#9E4F66] dark:text-[#E8A2B6]" />
                  <span>Table of Contents ({article.sections.length} sections)</span>
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileTocOpen && (
                <ul className="mt-3 pt-3 border-t border-[#EED9D5] dark:border-[#493744] space-y-2 text-xs text-[#74505F] dark:text-[#C7B8C2]">
                  {article.sections.map((section, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        onClick={() => setMobileTocOpen(false)}
                        className="hover:underline block py-0.5 text-[#593744] dark:text-[#F8F0F3]"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#evidence-transparency"
                      onClick={() => setMobileTocOpen(false)}
                      className="hover:underline block py-0.5 text-[#4A7853] dark:text-[#A8DEB3]"
                    >
                      Evidence Classification
                    </a>
                  </li>
                  <li>
                    <a
                      href="#references"
                      onClick={() => setMobileTocOpen(false)}
                      className="hover:underline block py-0.5 font-semibold text-[#9E4F66] dark:text-[#E8A2B6]"
                    >
                      Clinical References ({article.references.length})
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* Restrained & Readable Educational Boundary Notice */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FBF1ED]/80 dark:bg-[#211A22] border border-[#EED9D5] dark:border-[#493744] flex items-start gap-3 text-xs text-[#74505F] dark:text-[#C7B8C2] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-[#9E4F66] dark:text-[#E8A2B6] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong className="font-semibold text-[#593744] dark:text-[#F8F0F3]">Educational Boundary Notice:</strong>{' '}
              {article.disclaimer ||
                'This article provides general physiological education. It does not replace individualized clinical evaluation, diagnosis, or personalized medical care from a licensed healthcare provider.'}
            </p>
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-[#FBF1ED] dark:bg-[#211A22] p-5 sm:p-6 rounded-2xl border border-[#EED9D5] dark:border-[#493744] space-y-3.5">
            <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#593744] dark:text-[#F8F0F3] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A7853] dark:text-[#A8DEB3]" aria-hidden="true" />
              <span>Key Takeaways</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#593744] dark:text-[#F8F0F3]">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E4F66] dark:bg-[#E8A2B6] mt-2 shrink-0" aria-hidden="true" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections Loop */}
          {article.sections.map((section, idx) => (
            <section
              key={idx}
              id={`section-${idx}`}
              className="space-y-4 scroll-mt-24"
            >
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744] dark:text-[#F8F0F3] pt-6 border-t border-[#EED9D5] dark:border-[#493744]">
                {section.heading}
              </h2>

              <div className="space-y-4 text-base sm:text-[1.0625rem] text-[#593744] dark:text-[#F8F0F3] leading-[1.75] max-w-prose">
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
                      className="bg-white dark:bg-[#2B222C] p-4 rounded-xl border border-[#EED9D5] dark:border-[#493744] text-xs sm:text-sm space-y-1.5"
                    >
                      <h3 className="font-bold text-[#593744] dark:text-[#F8F0F3]">{sub.title}</h3>
                      <p className="text-[#74505F] dark:text-[#C7B8C2] leading-relaxed">{sub.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Callout if present */}
              {section.callout && (
                <div className="pt-2">
                  <Callout
                    type={section.callout.type}
                    title={section.callout.title}
                    text={section.callout.text}
                  />
                </div>
              )}
            </section>
          ))}

          {/* Evidence Transparency & Plain-Language Uncertainty */}
          <section id="evidence-transparency" className="pt-8 border-t-2 border-[#EED9D5] dark:border-[#493744] space-y-3.5 scroll-mt-24">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#4A7853] dark:text-[#A8DEB3]" aria-hidden="true" />
              <h2 className="font-editorial text-2xl font-bold text-[#593744] dark:text-[#F8F0F3]">
                Evidence Transparency & Scientific Basis
              </h2>
            </div>

            <div className="bg-[#FBF1ED] dark:bg-[#211A22] p-4 sm:p-5 rounded-2xl border border-[#EED9D5] dark:border-[#493744] space-y-2.5">
              <div className="flex items-center gap-2">
                <Badge variant={evidenceConfig.variant} size="sm">
                  {evidenceConfig.label}
                </Badge>
                <span className="text-xs font-semibold text-[#593744] dark:text-[#F8F0F3]">
                  {evidenceConfig.summary}
                </span>
              </div>
              <p className="text-xs text-[#74505F] dark:text-[#C7B8C2] leading-relaxed">
                {article.evidenceExplanation}
              </p>
              <p className="text-[11px] text-[#8C6775] dark:text-[#A3919D] pt-1 border-t border-[#EED9D5]/60 dark:border-[#493744]">
                In accordance with NASA’s Science & Evidence principles, we do not present correlations as causal, estimates as clinical measurements, or 28-day cycles as a universal norm.
              </p>
            </div>
          </section>

          {/* Credible References Section */}
          <section id="references" className="pt-6 border-t border-[#EED9D5] dark:border-[#493744] space-y-4 scroll-mt-24">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl font-bold text-[#593744] dark:text-[#F8F0F3]">
                Clinical & Scientific References
              </h2>
              <span className="text-xs text-[#8C6775] dark:text-[#A3919D]">
                {article.references.length} peer-reviewed sources
              </span>
            </div>

            <p className="text-xs text-[#74505F] dark:text-[#C7B8C2]">
              In accordance with our Science & Evidence principles, this article cites published clinical consensus statements, textbooks, and peer-reviewed journals without fabricated citations.
            </p>

            <div className="space-y-3 pt-2">
              {article.references.map((ref) => (
                <div
                  key={ref.id}
                  className="bg-[#FBF1ED] dark:bg-[#211A22] p-4 rounded-2xl border border-[#EED9D5] dark:border-[#493744] text-xs space-y-1"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-[#593744] dark:text-[#F8F0F3]">{ref.title}</span>
                    <span className="text-[#8C6775] dark:text-[#A3919D]">({ref.year})</span>
                  </div>
                  <p className="text-[#74505F] dark:text-[#C7B8C2]">
                    {ref.authors} — <em>{ref.source}</em>
                  </p>
                  {ref.note && (
                    <p className="text-[#8C6775] dark:text-[#A3919D] italic pt-0.5">
                      Note: {ref.note}
                    </p>
                  )}
                  {ref.doiOrUrl && (
                    <a
                      href={ref.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#9E4F66] dark:text-[#E8A2B6] hover:underline pt-1 font-medium"
                    >
                      <span>Access Publication Source</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Related Articles Navigation */}
          {relatedArticles.length > 0 && (
            <div className="pt-10 border-t border-[#EED9D5] dark:border-[#493744] space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C6775] dark:text-[#A3919D]">
                  Related Guides & Next Reading
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
                    className="p-5 bg-white dark:bg-[#2B222C] rounded-2xl border border-[#EED9D5] dark:border-[#493744] hover:border-[#9E4F66] dark:hover:border-[#E8A2B6] transition-colors block group text-left"
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
                    <p className="text-xs text-[#74505F] dark:text-[#C7B8C2] mt-1 line-clamp-2">
                      {rel.subtitle}
                    </p>
                    <div className="mt-3 text-xs text-[#9E4F66] dark:text-[#E8A2B6] font-medium flex items-center gap-1">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
