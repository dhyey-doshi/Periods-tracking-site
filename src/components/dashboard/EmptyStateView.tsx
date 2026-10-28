import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CalendarHeart, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface EmptyStateViewProps {
  onSwitchToSample: () => void;
  className?: string;
}

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  onSwitchToSample,
  className = '',
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Onboarding Welcome Card */}
      <Card variant="elevated" padding="xl" className="text-center max-w-3xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#FBF1ED] border border-[#EED9D5] flex items-center justify-center text-[#9E4F66] mx-auto">
          <CalendarHeart className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
            Empty State Demonstration
          </span>
          <h3 className="font-editorial text-3xl font-bold text-[#593744]">
            Welcome to Your Personal Rhythm
          </h3>
          <p className="text-base text-[#74505F] leading-relaxed">
            When you first open a real account in future milestones, your dashboard will start here: calm, quiet, and ready to learn your natural baseline without assuming you fit a 28-day box.
          </p>
        </div>

        {/* 3 Step Onboarding Cues */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
          <div className="bg-[#FBF1ED] p-5 rounded-2xl border border-[#EED9D5] space-y-2">
            <span className="text-xs font-bold text-[#9E4F66] uppercase tracking-wider block">
              Step 01
            </span>
            <h4 className="text-sm font-semibold text-[#593744]">Log Day 1 of Flow</h4>
            <p className="text-xs text-[#74505F] leading-relaxed">
              Mark the first day of full red menstrual flow to establish cycle timing.
            </p>
          </div>

          <div className="bg-[#FBF1ED] p-5 rounded-2xl border border-[#EED9D5] space-y-2">
            <span className="text-xs font-bold text-[#4A7853] uppercase tracking-wider block">
              Step 02
            </span>
            <h4 className="text-sm font-semibold text-[#593744]">Observe Daily Cues</h4>
            <p className="text-xs text-[#74505F] leading-relaxed">
              Record energy, mood, and cervical fluid in 15 seconds without pressure.
            </p>
          </div>

          <div className="bg-[#FBF1ED] p-5 rounded-2xl border border-[#EED9D5] space-y-2">
            <span className="text-xs font-bold text-[#B85C27] uppercase tracking-wider block">
              Step 03
            </span>
            <h4 className="text-sm font-semibold text-[#593744]">Discover Your Baseline</h4>
            <p className="text-xs text-[#74505F] leading-relaxed">
              After 3 cycles, personalized probabilistic windows replace population guesses.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="primary"
            onClick={onSwitchToSample}
            icon={<Compass className="w-4 h-4 text-white" />}
          >
            Switch Back to Active Sample Data
          </Button>
          <Button
            to="/encyclopedia/the-four-phases-of-the-menstrual-cycle"
            variant="outline"
            icon={<BookOpen className="w-4 h-4 text-[#593744]" />}
          >
            Read the 4 Phases Guide
          </Button>
        </div>

        {/* Privacy Assurance Pill */}
        <div className="pt-4 border-t border-[#EED9D5] flex items-center justify-center gap-2 text-xs text-[#8C6775]">
          <ShieldCheck className="w-4 h-4 text-[#4A7853]" />
          <span>
            Planned local-first architecture: Your data will remain stored on your device, not sold or mined.
          </span>
        </div>
      </Card>

      {/* Suggested Reading while waiting */}
      <div className="max-w-3xl mx-auto space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6775]">
          Recommended Starters for New Explorers
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/encyclopedia/cycle-variability-and-irregularity"
            className="p-4 bg-white rounded-2xl border border-[#EED9D5] hover:border-[#D99B9F] transition-colors block text-left"
          >
            <span className="text-xs text-[#9E4F66] font-semibold">Cycle Physiology</span>
            <h5 className="text-sm font-bold text-[#593744] mt-0.5">
              Why "Normal" Isn't Always 28 Days
            </h5>
            <p className="text-xs text-[#74505F] mt-1">
              FIGO and ACOG guidelines on natural cycle variation.
            </p>
          </Link>

          <Link
            to="/science"
            className="p-4 bg-white rounded-2xl border border-[#EED9D5] hover:border-[#D99B9F] transition-colors block text-left"
          >
            <span className="text-xs text-[#4A7853] font-semibold">Science & Evidence</span>
            <h5 className="text-sm font-bold text-[#593744] mt-0.5">
              How We Evaluate Health Evidence
            </h5>
            <p className="text-xs text-[#74505F] mt-1">
              Our 3-tier framework for clinical certainty and uncertainty.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
