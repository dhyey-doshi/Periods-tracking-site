import React from 'react';
import type { CyclePhase } from '../../types';
import { CYCLE_PHASES } from '../../data/cyclePhases';
import { SEMANTIC_TOKENS } from '../../theme/tokens';
import { useTheme } from '../../context/ThemeContext';

export interface CycleWheelProps {
  currentDay?: number;
  totalDays?: number;
  selectedPhase: CyclePhase;
  onSelectPhase: (phase: CyclePhase) => void;
  className?: string;
}

export const CycleWheel: React.FC<CycleWheelProps> = ({
  currentDay = 14,
  totalDays = 29,
  selectedPhase,
  onSelectPhase,
  className = '',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  // Phase arcs configuration mapped to Rose & Berry tokens
  const phases: {
    id: CyclePhase;
    startDay: number;
    endDay: number;
    color: string;
    hoverColor: string;
    label: string;
  }[] = [
    {
      id: 'menstrual',
      startDay: 1,
      endDay: 5,
      color: SEMANTIC_TOKENS.phases.menstrual.accent, // Berry #9E4F66
      hoverColor: '#893F55',
      label: 'Menstrual (1-5)',
    },
    {
      id: 'follicular',
      startDay: 6,
      endDay: 13,
      color: SEMANTIC_TOKENS.phases.follicular.accent, // Botanical Sage #4A7853
      hoverColor: '#3B6242',
      label: 'Follicular (6-13)',
    },
    {
      id: 'ovulatory',
      startDay: 14,
      endDay: 16,
      color: SEMANTIC_TOKENS.phases.ovulatory.accent, // Sunlit Amber #B85C27
      hoverColor: '#9B4A1C',
      label: 'Ovulatory (14-16)',
    },
    {
      id: 'luteal',
      startDay: 17,
      endDay: 29,
      color: SEMANTIC_TOKENS.phases.luteal.accent, // Mauve Plum #7A486E
      hoverColor: '#633659',
      label: 'Luteal (17-29)',
    },
  ];

  // SVG Geometry
  const size = 320;
  const center = size / 2;
  const radius = 120;
  const strokeWidth = 26;

  // Compute angles for each phase segment
  const getCoordinatesForPercent = (percent: number) => {
    // Start at top (-90 degrees)
    const angle = percent * 2 * Math.PI - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Marker angle for current day
  const currentDayFraction = (currentDay - 0.5) / totalDays;
  const currentDayCoord = getCoordinatesForPercent(currentDayFraction);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] select-none">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full transform transition-transform"
          aria-label={`Interactive Cycle Wheel. Current day is ${currentDay} of ${totalDays}.`}
          role="img"
        >
          {/* Subtle warm ivory/blush background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={isDark ? '#362938' : '#F6E6E1'}
            strokeWidth={strokeWidth}
          />

          {/* Phase Arcs */}
          {phases.map((p) => {
            const startPercent = (p.startDay - 1) / totalDays;
            const endPercent = p.endDay / totalDays;

            const start = getCoordinatesForPercent(startPercent);
            const end = getCoordinatesForPercent(endPercent);
            const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;

            const pathData = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
            const isSelected = selectedPhase === p.id;

            return (
              <path
                key={p.id}
                d={pathData}
                fill="none"
                stroke={p.color}
                strokeWidth={isSelected ? strokeWidth + 6 : strokeWidth}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-200 opacity-90 hover:opacity-100"
                style={{
                  filter: isSelected ? (isDark ? 'drop-shadow(0px 3px 6px rgba(0,0,0,0.6))' : 'drop-shadow(0px 3px 6px rgba(89,55,68,0.2))') : 'none',
                }}
                onClick={() => onSelectPhase(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectPhase(p.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select ${CYCLE_PHASES[p.id].name}, days ${p.startDay} to ${p.endDay}`}
              />
            );
          })}

          {/* Current Day Pointer Pin */}
          <g>
            <circle
              cx={currentDayCoord.x}
              cy={currentDayCoord.y}
              r={10}
              fill={isDark ? '#2B222C' : '#FFFFFF'}
              stroke={isDark ? '#F8F0F3' : '#593744'}
              strokeWidth={3}
              className="drop-shadow-md"
            />
            <circle
              cx={currentDayCoord.x}
              cy={currentDayCoord.y}
              r={4}
              fill={isDark ? '#E8A2B6' : '#9E4F66'}
            />
          </g>
        </svg>

        {/* Center Informational Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8C6775]">
            Cycle Day
          </span>
          <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#593744] my-0.5">
            {currentDay}
          </div>
          <span className="text-xs text-[#74505F] font-medium">
            of {totalDays} days total
          </span>
          <div className="mt-2 text-[11px] font-semibold text-[#8E2235] bg-[#F7EBF0] px-2.5 py-0.5 rounded-full border border-[#E8CCD5]">
            {CYCLE_PHASES[selectedPhase].name}
          </div>
        </div>
      </div>

      {/* Quick Phase Selection Chips */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-sm">
        {phases.map((p) => {
          const isSelected = selectedPhase === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPhase(p.id)}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#593744] dark:bg-[#E8A2B6] text-white dark:text-[#171319] shadow-xs'
                  : 'bg-white dark:bg-[#2B222C] border border-[#EED9D5] dark:border-[#493744] text-[#74505F] dark:text-[#C7B8C2] hover:bg-[#FBF1ED] dark:hover:bg-[#382C3A]'
              }`}
            >
              {CYCLE_PHASES[p.id].name.replace(' Phase', '')}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-[#8C6775] mt-2 text-center">
        Click any phase segment or button above to inspect hormone details
      </p>
    </div>
  );
};
