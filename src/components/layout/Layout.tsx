import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DataCommitmentCard } from './DataCommitmentCard';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top upon navigating to a new route
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7F4] text-[#593744] selection:bg-[#F2DCD9] selection:text-[#593744]">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#593744] text-white rounded-lg shadow-lg focus-visible:outline-2 focus-visible:outline-[#9E4F66]"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* Globally Visible Data Commitment Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-1">
        <DataCommitmentCard />
      </div>

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </div>
  );
};
