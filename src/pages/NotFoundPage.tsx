import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BRAND } from '../config/brand';
import { Compass, Home, BookOpen, Activity, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
      {/* 404 Graphic */}
      <div className="w-20 h-20 rounded-3xl bg-[#FBF1ED] border border-[#EED9D5] text-[#9E4F66] flex items-center justify-center mx-auto">
        <Compass className="w-10 h-10 animate-pulse-subtle" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
          Page Not Found • Error 404
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#593744]">
          A Moment of Pause
        </h1>
        <p className="text-base sm:text-lg text-[#74505F] max-w-xl mx-auto leading-relaxed">
          The path you took seems to lead beyond our current map. Like an unexpected cycle shift, sometimes we simply need to return to center.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Button to="/" variant="primary" icon={<Home className="w-4 h-4 text-white" />}>
          Return to Homepage
        </Button>
        <Button
          to="/dashboard-preview"
          variant="outline"
          icon={<Activity className="w-4 h-4 text-[#593744]" />}
        >
          View Dashboard Preview
        </Button>
      </div>

      {/* Suggested Landmarks */}
      <Card variant="flat" padding="lg" className="text-left mt-8 max-w-xl mx-auto space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#593744]">
          Explore Key Platform Sections:
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-[#74505F]">
          <li>
            <Link
              to="/encyclopedia"
              className="hover:text-[#9E4F66] hover:underline flex items-center justify-between"
            >
              <span>Health & Cycle Encyclopedia</span>
              <BookOpen className="w-3.5 h-3.5 text-[#9E4F66]" />
            </Link>
          </li>
          <li>
            <Link
              to="/science"
              className="hover:text-[#9E4F66] hover:underline flex items-center justify-between"
            >
              <span>Science & Evidence Framework</span>
              <Compass className="w-3.5 h-3.5 text-[#4A7853]" />
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-[#9E4F66] hover:underline flex items-center justify-between"
            >
              <span>About {BRAND.codename} & Our Mission</span>
              <ArrowLeft className="w-3.5 h-3.5 text-[#B85C27]" />
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  );
};
