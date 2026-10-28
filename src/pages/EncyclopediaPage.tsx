import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ArticleCard } from '../components/encyclopedia/ArticleCard';
import { CategoryFilter } from '../components/encyclopedia/CategoryFilter';
import { ARTICLES, ENCYCLOPEDIA_CATEGORIES } from '../data/encyclopediaArticles';
import { Search, X, BookOpen } from 'lucide-react';
import { Callout } from '../components/ui/Callout';

export const EncyclopediaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;

      // Search query filter
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <PageHeader
        kicker="Educational Resources"
        title="Health & Cycle Encyclopedia"
        description="Thoughtful, accessible guides explaining endocrine physiology, body signals, and cycle variations in clear human language."
        breadcrumbs={[
          { label: 'Encyclopedia' },
        ]}
      />

      {/* Review & Integrity Callout */}
      <Callout
        type="insight"
        title="Educational Grounding"
        text="All encyclopedia articles are drafted based on clinical guidelines from the American College of Obstetricians and Gynecologists (ACOG), peer-reviewed reproductive endocrinology literature, and anatomical consensus. Articles are transparently labelled with their drafting and review status."
      />

      {/* Filter and Search Bar Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Pills */}
          <CategoryFilter
            categories={ENCYCLOPEDIA_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-[#8C6775] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, hormones, cues..."
              className="w-full text-xs sm:text-sm pl-9 pr-9 py-2.5 rounded-full border border-[#EED9D5] bg-white text-[#593744] placeholder:text-[#8C6775] focus:outline-none focus:border-[#9E4F66] focus:ring-1 focus:ring-[#9E4F66] transition-all"
              aria-label="Search encyclopedia articles"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C6775] hover:text-[#593744]"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-[#74505F] pt-2 border-t border-[#EED9D5]">
          <span>
            Showing <strong>{filteredArticles.length}</strong>{' '}
            {filteredArticles.length === 1 ? 'article' : 'articles'}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[#9E4F66] hover:underline font-semibold"
            >
              Reset all filters
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
              featured={index === 0 && selectedCategory === 'all' && !searchQuery}
            />
          ))}
        </div>
      ) : (
        /* Empty Search State */
        <div className="text-center py-16 bg-[#FBF1ED] rounded-3xl border border-[#EED9D5] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#EED9D5] text-[#8C6775] flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#593744]">
            No matching articles found
          </h3>
          <p className="text-sm text-[#74505F] max-w-md mx-auto">
            We couldn't find any guides matching "{searchQuery}". Try searching for terms like "progesterone", "phases", "ovulation", or "fluid".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-full bg-[#593744] text-white text-xs font-semibold hover:bg-[#432A34] transition-colors"
          >
            Clear Search & Show All Articles
          </button>
        </div>
      )}
    </div>
  );
};
