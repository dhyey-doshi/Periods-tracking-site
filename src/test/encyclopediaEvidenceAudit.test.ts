import { describe, it, expect } from 'vitest';
import { ARTICLES, ENCYCLOPEDIA_CATEGORIES } from '../data/encyclopediaArticles';
import { calculateReadingTime } from '../utils/readingTime';

describe('Encyclopedia Evidence & Content Quality Audit', () => {
  it('ensures all article IDs and slugs are unique', () => {
    const ids = ARTICLES.map((a) => a.id);
    const slugs = ARTICLES.map((a) => a.slug);

    expect(new Set(ids).size).toBe(ARTICLES.length);
    expect(new Set(slugs).size).toBe(ARTICLES.length);
  });

  it('verifies that all related article references resolve to existing articles', () => {
    const validSlugs = new Set(ARTICLES.map((a) => a.slug));

    for (const article of ARTICLES) {
      expect(article.relatedArticleSlugs.length).toBeGreaterThan(0);
      for (const relSlug of article.relatedArticleSlugs) {
        expect(validSlugs.has(relSlug)).toBe(true);
        expect(relSlug).not.toBe(article.slug); // Cannot relate to itself
      }
    }
  });

  it('verifies category counts match actual articles in ENCYCLOPEDIA_CATEGORIES', () => {
    const allCategory = ENCYCLOPEDIA_CATEGORIES.find((c) => c.id === 'all');
    expect(allCategory?.articleCount).toBe(ARTICLES.length);

    for (const cat of ENCYCLOPEDIA_CATEGORIES) {
      if (cat.id === 'all') continue;
      const actualCount = ARTICLES.filter((a) => a.category === cat.id).length;
      expect(cat.articleCount).toBe(actualCount);
    }
  });

  it('validates evidence tiers and non-empty explanations for all articles', () => {
    const validTiers = ['established', 'emerging', 'limited'];

    for (const article of ARTICLES) {
      expect(validTiers).toContain(article.evidenceTier);
      expect(article.evidenceExplanation).toBeTruthy();
      expect(article.evidenceExplanation.length).toBeGreaterThan(20);
    }
  });

  it('verifies all scientific references have complete metadata, valid years, and resolving URLs', () => {
    for (const article of ARTICLES) {
      expect(article.references.length).toBeGreaterThan(0);

      for (const ref of article.references) {
        expect(ref.id).toBeTruthy();
        expect(ref.title).toBeTruthy();
        expect(ref.authors).toBeTruthy();
        expect(ref.source).toBeTruthy();
        expect(ref.year).toBeGreaterThanOrEqual(1990);
        expect(ref.year).toBeLessThanOrEqual(2026);
        expect(ref.doiOrUrl).toBeDefined();
        expect(ref.doiOrUrl).toMatch(/^https?:\/\//i);
      }
    }
  });

  it('enforces editorial integrity without fabricated reviewers or misleading credentials', () => {
    for (const article of ARTICLES) {
      // Must not fabricate a clinical board or individual medical reviewer
      expect(article.editorial?.reviewerName).toBeUndefined();
      expect(article.editorial?.reviewerRole).toBeUndefined();

      // Attribution must be the editorial collective with non-clinical role
      expect(article.editorial?.authorName).toBe('NASA Health Editorial Collective');
      expect(article.editorial?.authorRole).toBe('Medical Writing & Health Literacy');

      // Transparent draft status must explicitly clarify absence of independent medical board review
      expect(article.reviewStatus).toContain('Has not undergone independent external medical board review');
      expect(article.editorial?.reviewStatus).toContain('Has not undergone independent external medical board review');
    }
  });

  it('verifies reading time is synchronized with content word count across all articles', () => {
    for (const article of ARTICLES) {
      const computedReadingTime = calculateReadingTime(article.sections, article.summary);
      expect(article.readingTimeMinutes).toBe(computedReadingTime);
      expect(article.readingTimeMinutes).toBeGreaterThanOrEqual(1);
    }
  });

  it('enforces medical boundary disclaimers and safety guidance on every article', () => {
    for (const article of ARTICLES) {
      expect(article.disclaimer).toBeTruthy();
      expect(article.disclaimer).toMatch(/does not replace clinical|educational|consult/i);
    }
  });

  it('validates SEO title and description are non-empty and well-formed', () => {
    for (const article of ARTICLES) {
      expect(article.seo.title).toBeTruthy();
      expect(article.seo.description).toBeTruthy();
      expect(article.seo.description.length).toBeGreaterThan(30);
      expect(article.seo.canonicalUrl).toMatch(/^https:\/\/nasa-health\.org\/encyclopedia\//);
    }
  });
});
