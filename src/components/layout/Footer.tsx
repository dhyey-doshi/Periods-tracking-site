import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Heart } from 'lucide-react';
import { BRAND } from '../../config/brand';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FBF1ED] border-t border-[#EED9D5] text-[#74505F] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Vision Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#593744]">
                {BRAND.codename}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white border border-[#EED9D5] text-[#8C6775]">
                Milestone 1 Preview
              </span>
            </div>
            <p className="text-sm text-[#74505F] leading-relaxed max-w-md">
              {BRAND.tagline}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#8C6775]">
              <Sparkles className="w-4 h-4 text-[#A85F76]" />
              <span>Internal codename: <strong className="text-[#593744]">{BRAND.codename}</strong>. Final public branding will be announced in future milestones.</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#593744]">
              Platform Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#9E4F66] hover:underline transition-colors">
                  Homepage
                </Link>
              </li>
              <li>
                <Link to="/dashboard-preview" className="hover:text-[#9E4F66] hover:underline transition-colors">
                  Dashboard Preview
                </Link>
              </li>
              <li>
                <Link to="/encyclopedia" className="hover:text-[#9E4F66] hover:underline transition-colors">
                  Health Encyclopedia
                </Link>
              </li>
              <li>
                <Link to="/science" className="hover:text-[#9E4F66] hover:underline transition-colors">
                  Science & Evidence
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#9E4F66] hover:underline transition-colors">
                  About the Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Ethics Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#593744]">
              Transparency & Ethics
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-[#9E4F66] hover:underline flex items-center gap-1.5 transition-colors">
                  <Shield className="w-3.5 h-3.5 text-[#4A7853]" />
                  <span>Draft Privacy Principles</span>
                </Link>
              </li>
              <li>
                <Link to="/science" className="hover:text-[#9E4F66] hover:underline transition-colors">
                  Evidence Tiering Framework
                </Link>
              </li>
              <li>
                <Link to="/encyclopedia/the-four-phases-of-the-menstrual-cycle" className="hover:text-[#9E4F66] hover:underline transition-colors">
                  Core Cycle Guide (Starter Article)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Section */}
        <div className="mt-12 pt-8 border-t border-[#EED9D5]">
          <div className="bg-white/70 rounded-2xl p-5 border border-[#EED9D5] text-xs text-[#74505F] leading-relaxed">
            <strong className="text-[#593744] block mb-1">General Health & Educational Notice:</strong>
            {BRAND.medicalDisclaimer}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C6775]">
            <p>
              &copy; 2026 {BRAND.codename} Project. Built with care for bodily wisdom.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#8C6775]">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-[#9E4F66] fill-current" />
              <span>for calm, thoughtful wellness</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
