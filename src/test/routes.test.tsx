import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { SciencePage } from '../pages/SciencePage';
import { EncyclopediaPage } from '../pages/EncyclopediaPage';
import { ArticleDetailPage } from '../pages/ArticleDetailPage';
import { DashboardPreviewPage } from '../pages/DashboardPreviewPage';
import { AboutPage } from '../pages/AboutPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const renderWithRoute = (initialPath: string) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/encyclopedia" element={<EncyclopediaPage />} />
          <Route path="/encyclopedia/:slug" element={<ArticleDetailPage />} />
          <Route path="/dashboard-preview" element={<DashboardPreviewPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  );
};

describe('Route Navigation & Pages', () => {
  it('renders the Homepage with hero and entry points', () => {
    renderWithRoute('/');
    expect(screen.getByRole('heading', { level: 1, name: /Your body has seasons/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Milestone 1 Foundation/i).length).toBeGreaterThan(0);
  });

  it('renders the Science & Evidence page with principles and tiers', () => {
    renderWithRoute('/science');
    expect(screen.getByRole('heading', { level: 1, name: /Science, Evidence & Calibrated Uncertainty/i })).toBeInTheDocument();
    expect(screen.getByText(/Our Four Methodological Commitments/i)).toBeInTheDocument();
    expect(screen.getByText(/The Three-Tier Evidence Classification/i)).toBeInTheDocument();
  });

  it('renders the Health Encyclopedia landing page', () => {
    renderWithRoute('/encyclopedia');
    expect(screen.getByRole('heading', { level: 1, name: /Health & Cycle Encyclopedia/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search topics, hormones, cues/i)).toBeInTheDocument();
  });

  it('renders the Article Detail page for the starter guide', () => {
    renderWithRoute('/encyclopedia/the-four-phases-of-the-menstrual-cycle');
    expect(screen.getByRole('heading', { level: 1, name: /The Four Phases of the Menstrual Cycle/i })).toBeInTheDocument();
    expect(screen.getByText(/Committee Opinion No. 651/i)).toBeInTheDocument();
    expect(screen.getByText(/Educational Boundary Notice/i)).toBeInTheDocument();
  });

  it('renders the Dashboard Preview page with sample cycle status', () => {
    renderWithRoute('/dashboard-preview');
    expect(screen.getByRole('heading', { level: 1, name: /Cycle Dashboard & Daily Insights/i })).toBeInTheDocument();
    expect(screen.getByText(/Fictional Sample Data Mode/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ovulatory Window/i).length).toBeGreaterThan(0);
  });

  it('renders the About page with mission and principles', () => {
    renderWithRoute('/about');
    expect(screen.getByRole('heading', { level: 1, name: /Understanding Your Body Without Judgement/i })).toBeInTheDocument();
    expect(screen.getByText(/Radical Non-Judgement/i)).toBeInTheDocument();
  });

  it('renders the Privacy page with draft disclaimer and planned safeguards', () => {
    renderWithRoute('/privacy');
    expect(screen.getByRole('heading', { level: 1, name: /Draft Privacy Principles/i })).toBeInTheDocument();
    expect(screen.getByText(/Draft Document & Non-Legal Review Notice/i)).toBeInTheDocument();
  });

  it('renders the 404 Not Found page for invalid routes', () => {
    renderWithRoute('/non-existent-page-url');
    expect(screen.getByRole('heading', { level: 1, name: /A Moment of Pause/i })).toBeInTheDocument();
    expect(screen.getByText(/Return to Homepage/i)).toBeInTheDocument();
  });
});
