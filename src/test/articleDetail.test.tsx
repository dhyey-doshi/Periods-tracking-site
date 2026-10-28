import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { ArticleDetailPage } from '../pages/ArticleDetailPage';

const renderArticle = (slug: string = 'the-four-phases-of-the-menstrual-cycle') => {
  return render(
    <MemoryRouter initialEntries={[`/encyclopedia/${slug}`]}>
      <Routes>
        <Route path="/encyclopedia/:slug" element={<ArticleDetailPage />} />
        <Route path="/404" element={<div>Not Found Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Article Detail Page UX Refinement', () => {
  beforeEach(() => {
    document.title = '';
  });

  it('renders the article title and category kicker in the refined header', () => {
    renderArticle();

    expect(screen.getByRole('heading', { level: 1, name: /The Four Phases of the Menstrual Cycle/i })).toBeInTheDocument();
    expect(screen.getAllByText('Cycle Phases').length).toBeGreaterThan(0);
    expect(screen.getByText(/Moving beyond the 28-day myth/i)).toBeInTheDocument();
  });

  it('renders a consolidated, single-row metadata bar with reading time, evidence tier, and draft badge', () => {
    renderArticle();

    const minReadEls = screen.getAllByText(/\d+ min read/i);
    expect(minReadEls.length).toBeGreaterThan(0);
    expect(minReadEls[0].textContent).toMatch(/\d+ min read/);
    expect(screen.getByText(/Updated October 2026/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Established Finding/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Educational Starter Draft/i)).toBeInTheDocument();
  });

  it('provides an understated review status disclosure button that toggles review notes', () => {
    renderArticle();

    const reviewButton = screen.getByRole('button', { name: /review status/i });
    expect(reviewButton).toHaveAttribute('aria-expanded', 'false');

    // Initially, review details are collapsed to avoid pushing content down
    expect(screen.queryByText(/Content Review Status:/i)).not.toBeInTheDocument();

    // Toggle open
    fireEvent.click(reviewButton);
    expect(reviewButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Content Review Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Drafted from clinical guidelines & endocrine consensus/i)).toBeInTheDocument();

    // Toggle closed
    fireEvent.click(reviewButton);
    expect(reviewButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/Content Review Status:/i)).not.toBeInTheDocument();
  });

  it('displays the concise Educational Boundary Notice directly above article content', () => {
    renderArticle();

    expect(screen.getByText(/Educational Boundary Notice:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/does not replace clinical consultation, diagnosis, or personalized medical care/i)
    ).toBeInTheDocument();
  });

  it('displays Key Takeaways and Table of Contents right at the start of the reading flow', () => {
    renderArticle();

    expect(screen.getByRole('heading', { level: 2, name: /Key Takeaways/i })).toBeInTheDocument();
    expect(screen.getByText(/In This Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/Clinical References/i)).toBeInTheDocument();
  });

  it('displays Evidence Transparency section with plain-language explanation of findings and uncertainty', () => {
    renderArticle();

    expect(
      screen.getByRole('heading', { level: 2, name: /Evidence Transparency & Scientific Basis/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Established endocrine and anatomical consensus supported by ACOG clinical guidelines/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/we do not present correlations as causal/i)
    ).toBeInTheDocument();
  });

  it('renders traceable scientific references with authors, sources, and years', () => {
    renderArticle();

    expect(
      screen.getByRole('heading', { level: 2, name: /Clinical & Scientific References/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/American College of Obstetricians and Gynecologists/i)).toBeInTheDocument();
    expect(screen.getByText(/Reed BG, Carr BR/i)).toBeInTheDocument();
  });

  it('renders real related articles that link to existing content', () => {
    renderArticle();

    expect(screen.getByText(/Related Guides & Next Reading/i)).toBeInTheDocument();
    expect(screen.getByText(/Understanding Estrogen & Progesterone/i)).toBeInTheDocument();
    expect(screen.getByText(/Cycle Variability: Why "Normal" Isn't Always 28 Days/i)).toBeInTheDocument();
  });

  it('synchronizes SEO document title with article title', () => {
    renderArticle();

    expect(document.title).toContain('The Four Phases of the Menstrual Cycle');
    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta).toHaveAttribute('content');
    expect(descMeta?.getAttribute('content')).toContain('Explore the biological shifts');
  });

  it('redirects to 404 for an invalid article slug', () => {
    renderArticle('non-existent-article-slug');
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });
});
