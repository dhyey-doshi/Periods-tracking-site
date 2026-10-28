import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { EvidenceTierCard } from '../components/science/EvidenceTierCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Callout } from '../components/ui/Callout';
import { EVIDENCE_ITEMS, METHODOLOGICAL_PRINCIPLES } from '../data/scienceEvidence';
import type { EvidenceTier } from '../types';
import { BRAND } from '../config/brand';
import { ShieldAlert } from 'lucide-react';

export const SciencePage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<EvidenceTier | 'all'>('all');

  const filteredItems = selectedTier === 'all'
    ? EVIDENCE_ITEMS
    : EVIDENCE_ITEMS.filter((item) => item.tier === selectedTier);

  const tierFilterOptions = [
    { id: 'all', label: 'All Evidence Tiers' },
    { id: 'established', label: 'Tier 1 • Established Consensus' },
    { id: 'emerging', label: 'Tier 2 • Emerging Research' },
    { id: 'future-methodology', label: 'Tier 3 • Future Platform Methodology' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <PageHeader
        kicker="Methodological Transparency"
        title="Science, Evidence & Calibrated Uncertainty"
        description="How we approach clinical research, endocrine physiology, and the boundaries between established biological consensus and future predictive modeling."
        breadcrumbs={[
          { label: 'Science & Evidence' },
        ]}
      />

      {/* Prominent Non-Clinical Disclaimer */}
      <Callout
        type="disclaimer"
        title="Scientific & Educational Integrity Notice"
        text={`${BRAND.codename} is an educational platform designed to foster body literacy. We do not invent clinical claims, fictitious endorsements, or fabricated research citations. We distinguish clearly between gold-standard physiological consensus, emerging lifestyle research, and future software algorithm design.`}
      />

      {/* Four Methodological Principles */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
            Core Tenets
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744]">
            Our Four Methodological Commitments
          </h2>
          <p className="text-sm sm:text-base text-[#74505F] max-w-2xl leading-relaxed">
            How our platform decisions differ from standard industry practices—grounded in real biology, honest uncertainty, and respect for your autonomy:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {METHODOLOGICAL_PRINCIPLES.map((principle) => (
            <Card
              key={principle.number}
              variant="elevated"
              padding="lg"
              className="flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9E4F66]">
                    Principle {principle.number}
                  </span>
                  {principle.badge && (
                    <Badge variant="blush" size="sm">
                      {principle.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="font-editorial text-2xl sm:text-[1.65rem] font-bold text-[#593744] tracking-tight leading-snug">
                  {principle.headline}
                </h3>
              </div>

              {/* Two-Part Contrast: What we challenge vs. How NASA does it differently */}
              <div className="space-y-4 pt-1">
                {/* What we challenge */}
                <div className="pl-4 border-l-2 border-[#D99B9F] space-y-1.5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#8C6775]">
                    What we challenge
                  </span>
                  <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
                    {principle.challenge}
                  </p>
                </div>

                {/* How NASA does it differently */}
                <div className="pl-4 border-l-2 border-[#9E4F66] bg-[#FBF1ED]/70 p-3.5 rounded-r-2xl space-y-1.5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#593744]">
                    How NASA does it differently
                  </span>
                  <p className="text-xs sm:text-sm text-[#593744] leading-relaxed font-normal">
                    {principle.nasaDifference}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* The Evidence Hierarchy */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A7853]">
              Evidence Inventory
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744]">
              The Three-Tier Evidence Classification
            </h2>
            <p className="text-sm text-[#74505F]">
              Filter topics below by clinical certainty and consensus level.
            </p>
          </div>

          {/* Tier Filters */}
          <div className="flex flex-wrap gap-2">
            {tierFilterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedTier(opt.id as any)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  selectedTier === opt.id
                    ? 'bg-[#593744] text-white shadow-xs'
                    : 'bg-white border border-[#EED9D5] text-[#74505F] hover:bg-[#F2DCD9]/40'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Evidence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <EvidenceTierCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Honest Boundary on Algorithm Limits */}
      <section className="bg-[#FBF1ED] p-8 sm:p-10 rounded-3xl border border-[#EED9D5] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E4F66]">
          <ShieldAlert className="w-4 h-4" />
          <span>Clinical Non-Interference Commitment</span>
        </div>
        <h3 className="font-editorial text-2xl font-bold text-[#593744]">
          Why Software Algorithms Must Not Make Medical Diagnoses
        </h3>
        <p className="text-sm text-[#74505F] leading-relaxed max-w-3xl">
          Menstrual cycles can be profoundly disrupted by endocrine conditions (such as Polycystic Ovary Syndrome, Hypothalamic Amenorrhea, or Thyroid Disease), reproductive disorders (such as Endometriosis or Adenomyosis), or chronic inflammatory stress.
        </p>
        <p className="text-sm text-[#74505F] leading-relaxed max-w-3xl">
          {BRAND.codename} is deliberately engineered to provide structured data collection and symptom tracking that you can share with your licensed gynecologist or primary care physician. We do not claim to replace clinical laboratory panels, pelvic ultrasounds, or differential medical diagnoses.
        </p>
      </section>
    </div>
  );
};
