import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ArticleCard } from '../components/encyclopedia/ArticleCard';
import { CategoryFilter } from '../components/encyclopedia/CategoryFilter';
import { ARTICLES, ENCYCLOPEDIA_CATEGORIES, ALL_TAGS } from '../data/encyclopediaArticles';
import { Search, X, BookOpen, Tag, RotateCcw } from 'lucide-react';
import { Callout } from '../components/ui/Callout';
import { useDocumentMetadata } from '../utils/seo';

export const EncyclopediaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // SEO metadata synchronization
  useDocumentMetadata({
    title: 'Health & Cycle Encyclopedia',
    description:
      'Explore evidence-grounded guides explaining endocrine physiology, cycle phases, and body literacy in calm, human language.',
    canonicalUrl: 'https://nasa-health.org/encyclopedia',
  });

  const filteredArticles = useMemo(() => {
    // Normalise search query: trim and collapse excess whitespace
    const cleanQuery = searchQuery.trim().toLowerCase();
    const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);

    return ARTICLES.filter((article) => {
      // 1. Category Filter
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;

      // 2. Tag Filter
      const matchesTag =
        !selectedTag || (article.tags && article.tags.includes(selectedTag));

      // 3. Search Query Filter (word-token matching)
      if (queryTokens.length === 0) {
        return matchesCategory && matchesTag;
      }

      // Search across title, subtitle, summary, categoryLabel, tags, and section content
      const searchableContent = [
        article.title,
        article.subtitle,
        article.summary,
        article.categoryLabel,
        ...(article.tags || []),
        ...article.sections.map((s) => s.heading + ' ' + s.content.join(' ')),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = queryTokens.every((token) =>
        searchableContent.includes(token)
      );

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedTag !== null || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedTag(null);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      <PageHeader
        kicker="Educational Resources"
        title="Health & Cycle Encyclopedia"
        description="Thoughtful, accessible guides explaining endocrine physiology, body signals, and cycle variations in clear, reassuring language."
        breadcrumbs={[{ label: 'Encyclopedia' }]}
      />

      {/* Review & Evidence Integrity Callout */}
      <Callout
        type="insight"
        title="Evidence Transparency Standard"
        text="All encyclopedia articles are drafted directly from clinical guidelines (ACOG, Endocrine Society), peer-reviewed reproductive endocrinology literature, and anatomical consensus. Articles are transparently labeled with their evidence tier (Established Finding vs Emerging Research) and drafting status."
      />

      {/* Filter and Search Bar Section */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Filter Tabs */}
          <CategoryFilter
            categories={ENCYCLOPEDIA_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={(id) => {
              setSelectedCategory(id);
            }}
          />

          {/* Search Box */}
          <div className="relative min-w-[280px] sm:min-w-[320px]">
            <Search
              className="w-4 h-4 text-[#8C6775] dark:text-[#A3919D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, hormones, cues..."
              className="w-full text-xs sm:text-sm pl-9 pr-9 py-2.5 rounded-full border border-[#EED9D5] dark:border-[#493744] bg-white dark:bg-[#211A22] text-[#593744] dark:text-[#F8F0F3] placeholder:text-[#8C6775] dark:placeholder:text-[#A3919D] focus:outline-none focus:border-[#9E4F66] dark:focus:border-[#E8A2B6] focus:ring-1 focus:ring-[#9E4F66] dark:focus:ring-[#E8A2B6] transition-all"
              aria-label="Search encyclopedia articles"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C6775] hover:text-[#593744] dark:hover:text-[#F8F0F3] rounded-full transition-colors cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Topic Tags Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#74505F] dark:text-[#C7B8C2]">
          <span className="inline-flex items-center gap-1 font-semibold text-[#8C6775] dark:text-[#A3919D] mr-1">
            <Tag className="w-3.5 h-3.5 text-[#9E4F66] dark:text-[#E8A2B6]" aria-hidden="true" />
            <span>Popular Topics:</span>
          </span>
          {ALL_TAGS.slice(0, 8).map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#593744] text-white border-[#593744] dark:bg-[#E8A2B6] dark:text-[#171319] dark:border-[#E8A2B6] font-semibold'
                    : 'bg-white dark:bg-[#2B222C] text-[#74505F] dark:text-[#C7B8C2] border-[#EED9D5] dark:border-[#493744] hover:border-[#D99B9F] dark:hover:border-[#E8A2B6]'
                }`}
                aria-pressed={isSelected}
              >
                #{tag}
              </button>
            );
          })}
          {selectedTag && (
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className="text-xs font-medium text-[#9E4F66] dark:text-[#E8A2B6] hover:underline flex items-center gap-1 ml-1 cursor-pointer"
            >
              <span>Clear tag</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Results Banner & Active Filter Tags */}
        <div
          role="status"
          aria-live="polite"
          className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#74505F] dark:text-[#C7B8C2] pt-2 border-t border-[#EED9D5] dark:border-[#493744]"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Showing <strong>{filteredArticles.length}</strong>{' '}
              {filteredArticles.length === 1 ? 'guide' : 'guides'}
            </span>

            {/* Visual Active Filter Pills */}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F2DCD9] dark:bg-[#3B2A35] text-[#593744] dark:text-[#F8F0F3] font-medium">
                Category:{' '}
                {ENCYCLOPEDIA_CATEGORIES.find((c) => c.id === selectedCategory)?.name ||
                  selectedCategory}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-[#9E4F66] ml-0.5"
                  aria-label="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedTag && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F2DCD9] dark:bg-[#3B2A35] text-[#593744] dark:text-[#F8F0F3] font-medium">
                Tag: #{selectedTag}
                <button
                  type="button"
                  onClick={() => setSelectedTag(null)}
                  className="hover:text-[#9E4F66] ml-0.5"
                  aria-label="Remove tag filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F2DCD9] dark:bg-[#3B2A35] text-[#593744] dark:text-[#F8F0F3] font-medium">
                Query: "{searchQuery}"
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-[#9E4F66] ml-0.5"
                  aria-label="Remove query filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#9E4F66] dark:text-[#E8A2B6] hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard
              key={article.slug}
              article={article}
              featured={index === 0 && selectedCategory === 'all' && !searchQuery && !selectedTag}
              onTagClick={(tag) => setSelectedTag(tag)}
            />
          ))}
        </div>
      ) : (
        /* Empty Discovery State */
        <div className="text-center py-16 px-4 bg-[#FBF1ED] dark:bg-[#211A22] rounded-3xl border border-[#EED9D5] dark:border-[#493744] space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#2B222C] border border-[#EED9D5] dark:border-[#493744] text-[#8C6775] dark:text-[#A3919D] flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#593744] dark:text-[#F8F0F3]">
            No matching articles found
          </h3>
          <p className="text-sm text-[#74505F] dark:text-[#C7B8C2] max-w-md mx-auto leading-relaxed">
            {searchQuery
              ? `We couldn't find any articles matching "${searchQuery}". Try searching for biological terms like "estrogen", "phases", "metabolism", or "fluid".`
              : 'No articles match the current filter selection.'}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-full bg-[#593744] dark:bg-[#E8A2B6] text-white dark:text-[#171319] text-xs font-semibold hover:bg-[#3E242E] dark:hover:bg-[#F2DCD9] transition-colors cursor-pointer"
            >
              Clear Search & Show All Articles
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
