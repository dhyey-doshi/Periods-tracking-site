import React from 'react';
import type { CyclePhase } from '../../types';
import { CYCLE_PHASES } from '../../data/cyclePhases';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Sparkles, HeartHandshake, Compass } from 'lucide-react';

export interface PhaseCardProps {
  phase: CyclePhase;
  className?: string;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({ phase, className = '' }) => {
  const details = CYCLE_PHASES[phase];

  const getBadgeVariant = (p: CyclePhase) => {
    switch (p) {
      case 'menstrual':
        return 'berry';
      case 'follicular':
        return 'sage';
      case 'ovulatory':
        return 'amber';
      case 'luteal':
        return 'lavender';
    }
  };

  return (
    <Card variant="elevated" padding="lg" className={`space-y-6 ${className}`}>
      {/* Phase Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#EED9D5] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={getBadgeVariant(phase)} size="sm">
              {details.dayRange}
            </Badge>
            <span className="text-xs text-[#8C6775]">{details.durationLabel}</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#593744]">
            {details.name}
          </h3>
        </div>
        <div
          className="w-4 h-4 rounded-full mt-1 shadow-xs"
          style={{ backgroundColor: details.themeColor.accent }}
          aria-hidden="true"
        />
      </div>

      {/* Summary Narrative */}
      <p className="text-base text-[#593744] leading-relaxed">
        {details.summary}
      </p>

      {/* Biological Context */}
      <div className="bg-[#FBF1ED] rounded-2xl p-4 border border-[#EED9D5]">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#74505F] mb-2">
          <Compass className="w-3.5 h-3.5 text-[#9E4F66]" />
          <span>Biological Mechanics</span>
        </div>
        <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
          {details.biologicalContext}
        </p>
      </div>

      {/* Hormones at a glance */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6775] mb-3">
          Key Endocrine Drivers
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {details.keyHormones.map((h, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 border border-[#EED9D5] text-xs space-y-1"
            >
              <div className="flex items-center justify-between font-semibold text-[#593744]">
                <span>{h.name}</span>
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#F2DCD9] text-[#593744] font-medium">
                  {h.trend}
                </span>
              </div>
              <p className="text-[#74505F] leading-normal">{h.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Signals & Self-Care Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Common Signals */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#593744]">
            <Sparkles className="w-3.5 h-3.5 text-[#9E4F66]" />
            <span>Common Bodily Signals</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#74505F]">
            {details.commonSignals.map((signal, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E4F66] mt-2 shrink-0" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Self Care Guidance */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#593744]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#4A7853]" />
            <span>Nurturing Guidance</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#74505F]">
            {details.selfCareFocus.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A7853] mt-2 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
