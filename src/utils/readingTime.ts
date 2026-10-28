import type { ArticleSection } from '../types';

/**
 * Calculates estimated reading time in minutes from article content.
 * Standard adult non-fiction reading speed: ~200 words per minute.
 */
export function calculateReadingTime(
  sections: ArticleSection[],
  summary: string = '',
  wordsPerMinute: number = 200
): number {
  let totalWords = 0;

  if (summary) {
    totalWords += summary.trim().split(/\s+/).filter(Boolean).length;
  }

  for (const section of sections) {
    if (section.heading) {
      totalWords += section.heading.trim().split(/\s+/).filter(Boolean).length;
    }
    for (const paragraph of section.content) {
      totalWords += paragraph.trim().split(/\s+/).filter(Boolean).length;
    }
    if (section.subsections) {
      for (const sub of section.subsections) {
        totalWords += (sub.title + ' ' + sub.body).trim().split(/\s+/).filter(Boolean).length;
      }
    }
    if (section.callout) {
      totalWords += (section.callout.title + ' ' + section.callout.text).trim().split(/\s+/).filter(Boolean).length;
    }
  }

  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}
