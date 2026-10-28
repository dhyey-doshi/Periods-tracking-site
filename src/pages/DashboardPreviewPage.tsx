import React, { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { CycleOverviewCard } from '../components/dashboard/CycleOverviewCard';
import { DailyLogCard } from '../components/dashboard/DailyLogCard';
import { TrendChart } from '../components/dashboard/TrendChart';
import { EmptyStateView } from '../components/dashboard/EmptyStateView';
import { CycleWheel } from '../components/cycle/CycleWheel';
import { PhaseCard } from '../components/cycle/PhaseCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SAMPLE_PATTERN_OBSERVATIONS } from '../../src/data/sampleCycleData';
import type { CyclePhase } from '../types';
import {
  ShieldAlert,
  Lightbulb,
  Compass,
} from 'lucide-react';

export const DashboardPreviewPage: React.FC = () => {
  const [viewState, setViewState] = useState<'sample' | 'empty'>('sample');
  const [selectedPhase, setSelectedPhase] = useState<CyclePhase>('ovulatory');

  const scrollToDailyLog = () => {
    const el = document.getElementById('daily-log-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <PageHeader
        kicker="Interactive Milestone 1 Preview"
        title="Cycle Dashboard & Daily Insights"
        description="Experience how personalized cycle tracking, daily symptom logging, and historical variability will appear in future milestones—grounded in calm aesthetics and honest uncertainty."
        breadcrumbs={[
          { label: 'Dashboard Preview' },
        ]}
      />

      {/* Prominent Fictional Data Alert */}
      <div className="bg-[#FBF1ED] p-5 rounded-3xl border border-[#EED9D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white border border-[#EED9D5] text-[#9E4F66]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#593744]">
                Fictional Sample Data Mode
              </span>
              <Badge variant="amber" size="sm">Preview Only</Badge>
            </div>
            <p className="text-xs text-[#74505F] mt-0.5">
              No personal health data is collected, transmitted, or saved. This is a functional frontend demonstration.
            </p>
          </div>
        </div>

        {/* State Toggle: Sample vs Empty */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#EED9D5] self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setViewState('sample')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewState === 'sample'
                ? 'bg-[#593744] text-white shadow-xs'
                : 'text-[#74505F] hover:text-[#593744]'
            }`}
          >
            Active Sample Cycle
          </button>
          <button
            onClick={() => setViewState('empty')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              viewState === 'empty'
                ? 'bg-[#593744] text-white shadow-xs'
                : 'text-[#74505F] hover:text-[#593744]'
            }`}
          >
            New Account (Empty State)
          </button>
        </div>
      </div>

      {viewState === 'empty' ? (
        <EmptyStateView onSwitchToSample={() => setViewState('sample')} />
      ) : (
        <div className="space-y-16">
          {/* Main Cycle Status & Rhythm Explorer */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
                Today's Rhythm Snapshot
              </span>
              <span className="text-xs text-[#8C6775]">
                Cycle Day 14 of 29 • Ovulatory Window
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cycle Overview Card */}
              <div className="lg:col-span-5 space-y-6">
                <CycleOverviewCard onOpenCheckIn={scrollToDailyLog} />

                {/* Interactive Cycle Wheel */}
                <div className="bg-white p-6 rounded-3xl border border-[#EED9D5] shadow-xs flex justify-center">
                  <CycleWheel
                    currentDay={14}
                    totalDays={29}
                    selectedPhase={selectedPhase}
                    onSelectPhase={setSelectedPhase}
                  />
                </div>
              </div>

              {/* Right Column: Adaptive Phase Details */}
              <div className="lg:col-span-7 space-y-6">
                <PhaseCard phase={selectedPhase} />

                {/* Pattern Observations */}
                <Card variant="elevated" padding="lg" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EED9D5] pb-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#B85C27]" />
                      <h4 className="font-editorial text-xl font-bold text-[#593744]">
                        Grounded Pattern Observations
                      </h4>
                    </div>
                    <Badge variant="amber" size="sm">Fictional Insights</Badge>
                  </div>

                  <p className="text-xs text-[#74505F]">
                    In future milestones, the platform will highlight subtle correlations across multiple tracked cycles without pathologizing normal physiological adaptations:
                  </p>

                  <div className="space-y-3 pt-1">
                    {SAMPLE_PATTERN_OBSERVATIONS.map((obs) => (
                      <div
                        key={obs.id}
                        className="bg-[#FBF1ED] p-4 rounded-2xl border border-[#EED9D5] space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between font-bold text-[#593744]">
                          <span>{obs.title}</span>
                          <span className="text-[10px] text-[#9E4F66] uppercase tracking-wider font-semibold">
                            {obs.confidence}
                          </span>
                        </div>
                        <p className="text-[#74505F] leading-relaxed">
                          {obs.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Interactive Check-In Simulator */}
          <section id="daily-log-section" className="space-y-6 scroll-mt-28">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
                Interactive Check-In Demo
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744]">
                Daily Check-In & Symptom Tracking
              </h2>
              <p className="text-sm text-[#74505F]">
                Experience how intuitive and non-judgmental daily logging will be. Tap options below and simulate recording today's entry.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <DailyLogCard />
              </div>

              {/* Explanatory Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <Card variant="flat" padding="md" className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#593744]">
                    <Compass className="w-4 h-4 text-[#9E4F66]" />
                    <span>How Daily Logging Works</span>
                  </div>
                  <p className="text-xs text-[#74505F] leading-relaxed">
                    Comprehensive, non-judgmental symptom logging supporting rich multi-select choices for real bodily rhythms.
                  </p>
                  <div className="pt-2 border-t border-[#EED9D5] text-xs text-[#593744] space-y-2">
                    <p>
                      <strong>Separate Flow & Spotting:</strong> Period blood flow and spotting are tracked as completely distinct signals.
                    </p>
                    <p>
                      <strong>Multi-Select Flexibility:</strong> Checkboxes let you pick every sensation, mood, or symptom that matches your day.
                    </p>
                    <p>
                      <strong>Zero Monetization:</strong> Your health cues remain private in your browser session. Never sent to remote servers or third parties.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Recharts Historical Trend Chart */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4A7853]">
                Longitudinal Patterns
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744]">
                Historical Cycle Duration & Rhythm Stability
              </h2>
              <p className="text-sm text-[#74505F]">
                Visualizing variability across multiple cycles using Recharts with accessible data table options.
              </p>
            </div>

            <TrendChart />
          </section>
        </div>
      )}
    </div>
  );
};
