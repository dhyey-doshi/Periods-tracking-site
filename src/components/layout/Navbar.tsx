import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sparkles, Activity } from 'lucide-react';
import { BRAND } from '../../config/brand';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard Preview', path: '/dashboard-preview' },
    { name: 'Encyclopedia', path: '/encyclopedia' },
    { name: 'Science & Evidence', path: '/science' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <aside
        aria-label="Platform preview notice"
        className="bg-[#FBF1ED] border-b border-[#EED9D5] text-xs text-[#74505F] py-2 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1 font-semibold text-[#8E2235] bg-[#F7EBF0] px-2 py-0.5 rounded-full border border-[#E8CCD5]">
              <Sparkles className="w-3 h-3 text-[#A85F76]" />
              {BRAND.codename} Alpha
            </span>
            <span className="hidden md:inline">
              Internal project codename. Milestone 1 working preview with fictional sample data.
            </span>
            <span className="md:hidden">Milestone 1 Working Preview</span>
          </div>
          <Link
            to="/privacy"
            className="text-[#9E4F66] hover:text-[#893F55] hover:underline font-medium text-[11px] sm:text-xs mx-auto sm:mx-0"
          >
            Review Draft Privacy Principles &rarr;
          </Link>
        </div>
      </aside>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FFF7F4]/90 backdrop-blur-md border-b border-[#EED9D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Identity */}
            <Link
              to="/"
              className="group flex items-center gap-3.5 focus-visible:outline-2 rounded-xl"
              aria-label={`${BRAND.codename} Home`}
            >
              <div className="w-10 h-10 rounded-2xl bg-[#9E4F66]/10 border border-[#9E4F66]/25 flex items-center justify-center text-[#9E4F66] group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-editorial text-2xl font-bold tracking-tight text-[#593744]">
                    {BRAND.codename}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#FBF1ED] border border-[#EED9D5] text-[#8C6775]">
                    Preview
                  </span>
                </div>
                <span className="text-xs text-[#8C6775] hidden sm:inline -mt-0.5">
                  Menstrual Health & Body Literacy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F2DCD9] text-[#593744] font-semibold'
                        : 'text-[#74505F] hover:text-[#593744] hover:bg-[#FBF1ED]'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action */}
            <div className="hidden sm:flex items-center gap-3">
              <Button
                to="/dashboard-preview"
                variant="primary"
                size="sm"
                icon={<Activity className="w-3.5 h-3.5" />}
              >
                Dashboard Preview
              </Button>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#74505F] hover:text-[#593744] hover:bg-[#FBF1ED] focus-visible:outline-2"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFF7F4] border-b border-[#EED9D5] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F2DCD9] text-[#593744] font-semibold'
                        : 'text-[#74505F] hover:bg-[#FBF1ED]'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-[#EED9D5] mt-2">
                <Button
                  to="/dashboard-preview"
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Launch Dashboard Preview
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
