import React from 'react';
import type { EvidenceItem } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle2, HelpCircle, Layers } from 'lucide-react';

export interface EvidenceTierCardProps {
  item: EvidenceItem;
}

export const EvidenceTierCard: React.FC<EvidenceTierCardProps> = ({ item }) => {
  const getTierDetails = (tier: string) => {
    switch (tier) {
      case 'established':
        return {
          label: 'Tier 1 • Established Consensus',
          variant: 'sage' as const,
          icon: <CheckCircle2 className="w-4 h-4 text-[#2F5938]" />,
        };
      case 'emerging':
        return {
          label: 'Tier 2 • Emerging Research',
          variant: 'amber' as const,
          icon: <HelpCircle className="w-4 h-4 text-[#874614]" />,
        };
      case 'future-methodology':
        return {
          label: 'Tier 3 • Future Platform Methodology',
          variant: 'berry' as const,
          icon: <Layers className="w-4 h-4 text-[#9E4F66]" />,
        };
      default:
        return {
          label: 'Clinical Framework',
          variant: 'warm' as const,
          icon: <CheckCircle2 className="w-4 h-4 text-[#593744]" />,
        };
    }
  };

  const tierInfo = getTierDetails(item.tier);

  return (
    <Card variant="elevated" padding="lg" className="space-y-4">
      {/* Top Meta */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EED9D5] pb-3">
        <div className="flex items-center gap-2">
          {tierInfo.icon}
          <Badge variant={tierInfo.variant} size="sm">
            {tierInfo.label}
          </Badge>
        </div>
        <span className="text-xs font-semibold text-[#8C6775]">
          Certainty: <strong className="text-[#593744]">{item.certaintyLevel}</strong>
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-editorial text-xl font-bold text-[#593744]">
          {item.topic}
        </h3>
        <p className="text-xs text-[#9E4F66] font-semibold mt-0.5">
          {item.statusHeadline}
        </p>
      </div>

      {/* Physiological basis */}
      <div className="text-sm text-[#593744] leading-relaxed">
        {item.physiologicalBasis}
      </div>

      {/* Consensus Sources */}
      <div className="bg-[#FBF1ED] p-4 rounded-2xl border border-[#EED9D5] space-y-1.5">
        <span className="text-[11px] uppercase font-bold tracking-wider text-[#8C6775] block">
          Primary Clinical & Methodological Sources:
        </span>
        <ul className="space-y-1 text-xs text-[#74505F]">
          {item.consensusSources.map((src, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="text-[#9E4F66] font-bold">&bull;</span>
              <span>{src}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Known Limitations */}
      <div className="text-xs text-[#8C6775] leading-relaxed pt-1">
        <strong className="text-[#74505F]">Scientific Caveat / Boundary: </strong>
        {item.limitations}
      </div>
    </Card>
  );
};
