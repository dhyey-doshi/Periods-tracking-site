import React from 'react';
import { SAMPLE_ACTIVE_CYCLE } from '../../data/sampleCycleData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Clock, ShieldAlert, Sparkles } from 'lucide-react';

export interface CycleOverviewCardProps {
  className?: string;
  onOpenCheckIn?: () => void;
}

export const CycleOverviewCard: React.FC<CycleOverviewCardProps> = ({
  className = '',
  onOpenCheckIn,
}) => {
  const data = SAMPLE_ACTIVE_CYCLE;

  return (
    <Card variant="elevated" padding="lg" className={`space-y-6 ${className}`}>
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EED9D5] pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="amber" size="sm">
            Current Phase
          </Badge>
          <span className="text-xs font-semibold text-[#593744] uppercase tracking-wider">
            Ovulatory Window
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#8C6775]">
          <Clock className="w-3.5 h-3.5" />
          <span>Day {data.currentDay} of {data.totalPredictedLength}</span>
        </div>
      </div>

      {/* Main Focus Stat */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FBF1ED] rounded-2xl p-4 border border-[#EED9D5]">
          <span className="text-xs uppercase font-bold tracking-wider text-[#8C6775] block">
            Next Period In
          </span>
          <div className="font-editorial text-3xl font-bold text-[#593744] mt-1">
            ~{data.daysUntilPeriod} Days
          </div>
          <span className="text-xs text-[#74505F] mt-0.5 block">
            Estimated around Nov 13, 2026
          </span>
        </div>

        <div className="bg-[#FBF1ED] rounded-2xl p-4 border border-[#EED9D5]">
          <span className="text-xs uppercase font-bold tracking-wider text-[#8C6775] block">
            Fertile Window
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B85C27] animate-pulse" />
            <div className="font-editorial text-2xl font-bold text-[#593744]">
              Active Now
            </div>
          </div>
          <span className="text-xs text-[#74505F] mt-0.5 block">
            Peak fluid signals present
          </span>
        </div>

        <div className="bg-[#FBF1ED] rounded-2xl p-4 border border-[#EED9D5]">
          <span className="text-xs uppercase font-bold tracking-wider text-[#8C6775] block">
            Phase Confidence
          </span>
          <div className="font-editorial text-xl font-bold text-[#9E4F66] mt-1">
            Moderate (±2 Days)
          </div>
          <span className="text-xs text-[#74505F] mt-0.5 block">
            Based on 6 historical cycles
          </span>
        </div>
      </div>

      {/* Grounded Transparency Note */}
      <div className="bg-[#F7EBF0] rounded-2xl p-4 border border-[#E8CCD5] flex items-start gap-3 text-xs text-[#74505F]">
        <ShieldAlert className="w-4 h-4 text-[#9E4F66] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#593744]">
            Fictional Sample Dashboard Notice
          </p>
          <p className="leading-relaxed">
            The data displayed in this preview is static sample data generated to demonstrate the user experience. No real health data is collected, stored, or processed by this milestone.
          </p>
        </div>
      </div>

      {/* Quick Action Button */}
      {onOpenCheckIn && (
        <button
          onClick={onOpenCheckIn}
          className="w-full py-3 px-4 rounded-full bg-[#593744] hover:bg-[#3E242E] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-[#9E4F66]"
        >
          <Sparkles className="w-4 h-4 text-[#F2DCD9]" />
          <span>Simulate Today's Daily Check-In</span>
        </button>
      )}
    </Card>
  );
};
