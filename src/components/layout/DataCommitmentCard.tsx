import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export interface DataCommitmentCardProps {
  className?: string;
}

export const DataCommitmentCard: React.FC<DataCommitmentCardProps> = ({ className = '' }) => {
  return (
    <div
      role="region"
      aria-label="Data commitment"
      className={`p-3 sm:py-2.5 sm:px-4 rounded-2xl bg-[#FBF1ED] border border-[#EED9D5] text-[#593744] transition-colors ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4">
        {/* Trust Header with Shield Icon */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#F2DCD9] text-[#9E4F66] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
          </div>
          <span className="font-semibold text-xs text-[#593744] tracking-tight whitespace-nowrap">
            Data Commitment
          </span>
        </div>

        {/* Commitment Statement */}
        <p className="text-xs text-[#74505F] leading-relaxed flex-1">
          Zero monetization of health data. No advertising trackers. Local-first architecture designed for personal sovereignty.
        </p>

        {/* Link to Transparency & Privacy Details */}
        <Link
          to="/privacy"
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#9E4F66] hover:text-[#763246] hover:underline shrink-0 transition-colors"
        >
          <span>Privacy Principles</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};
