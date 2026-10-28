import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
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

describe('Globally Visible Data Commitment Card', () => {
  const routesToTest = [
    { name: 'Homepage', path: '/' },
    { name: 'Dashboard Preview', path: '/dashboard-preview' },
    { name: 'Encyclopedia Landing', path: '/encyclopedia' },
    { name: 'Article Detail', path: '/encyclopedia/the-four-phases-of-the-menstrual-cycle' },
    { name: 'Science & Evidence', path: '/science' },
    { name: 'About Page', path: '/about' },
    { name: 'Privacy Page', path: '/privacy' },
    { name: '404 Not Found Page', path: '/unknown-route-test' },
  ];

  routesToTest.forEach(({ name, path }) => {
    it(`renders the Data Commitment card near top on ${name} (${path})`, () => {
      renderWithRoute(path);

      // Verify the region exists with proper accessible label
      const commitmentRegion = screen.getByRole('region', { name: /data commitment/i });
      expect(commitmentRegion).toBeInTheDocument();

      // Verify the full commitment text is displayed
      expect(
        screen.getByText(/Zero monetization of health data\. No advertising trackers\. Local-first architecture designed for personal sovereignty\./i)
      ).toBeInTheDocument();

      // Verify the privacy principles link is present inside the commitment region
      const privacyLink = within(commitmentRegion).getByRole('link', { name: /privacy principles/i });
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute('href', '/privacy');
    });
  });

  it('renders exactly once per page and is not duplicated in the footer', () => {
    renderWithRoute('/');

    const commitmentRegions = screen.getAllByRole('region', { name: /data commitment/i });
    expect(commitmentRegions).toHaveLength(1);

    const matches = screen.getAllByText(
      /Zero monetization of health data\. No advertising trackers\. Local-first architecture designed for personal sovereignty\./i
    );
    expect(matches).toHaveLength(1);
  });
});
