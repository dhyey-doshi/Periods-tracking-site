import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { SciencePage } from './pages/SciencePage';
import { EncyclopediaPage } from './pages/EncyclopediaPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { DashboardPreviewPage } from './pages/DashboardPreviewPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
