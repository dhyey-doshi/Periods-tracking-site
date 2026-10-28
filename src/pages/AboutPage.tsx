import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Callout } from '../components/ui/Callout';
import { Button } from '../components/ui/Button';
import { BRAND } from '../config/brand';
import {
  Heart,
  ShieldCheck,
  Compass,
  Smile,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-12">
      <PageHeader
        kicker="Mission & Philosophy"
        title="Understanding Your Body Without Judgement"
        description={`${BRAND.codename} was created out of a simple conviction: you deserve to understand your menstrual cycle and biological rhythms in a space that feels calm, scientifically grounded, and profoundly respectful of your privacy.`}
        breadcrumbs={[
          { label: 'About' },
        ]}
      />

      {/* Internal Codename Banner */}
      <Callout
        type="insight"
        title="About the Codename"
        text={`"${BRAND.codename}" is an internal project codename. The final public brand name and visual identity will be revealed in a future milestone. All naming and branding elements are centrally configured so that the product can transition seamlessly without altering our core architectural foundation.`}
      />

      {/* The Core Mission */}
      <section className="space-y-6">
        <div className="max-w-3xl space-y-4 text-base sm:text-lg text-[#593744] leading-relaxed">
          <p>
            For too long, the digital health landscape has offered individuals with menstrual cycles a false dichotomy: either hyper-clinical hospital portals stripped of human warmth, or neon-pink apps filled with aggressive advertisements, patronizing language, and opaque data brokerage.
          </p>
          <p>
            We believe menstrual health is a vital sign, a personal rhythm, and an avenue for lifelong self-advocacy. Our goal is to build an editorial wellness sanctuary that provides clear physiological insights without anxiety or false precision.
          </p>
        </div>
      </section>

      {/* Four Guiding Principles */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
            Ethos & Design
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744]">
            Our Guiding Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="elevated" padding="lg" className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F2DCD9] text-[#9E4F66] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#593744]">
              Radical Non-Judgement
            </h3>
            <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
              We never reprimand you for missing a daily check-in, experiencing cycle irregularity, or having anovulatory months. Your body is an adaptive biological ecosystem, not an optimization metric.
            </p>
          </Card>

          <Card variant="elevated" padding="lg" className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7A486E]/10 text-[#7A486E] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#593744]">
              Calm Technology Over Engagement Traps
            </h3>
            <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
              We reject gamified notifications, artificial urgency, and dark patterns designed to keep you scrolling. The platform is designed to be visited mindfully for two minutes, leaving you grounded and informed.
            </p>
          </Card>

          <Card variant="elevated" padding="lg" className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A7853]/10 text-[#4A7853] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#593744]">
              Uncompromising Data Sovereignty
            </h3>
            <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
              Intimate bodily logs must never be commodified. We are architecting a local-first platform where health records are encrypted on your hardware and never shared without explicit, revokeable consent.
            </p>
          </Card>

          <Card variant="elevated" padding="lg" className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#B85C27]/10 text-[#B85C27] flex items-center justify-center">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#593744]">
              The Companion Philosophy
            </h3>
            <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
              In future milestones, we plan to introduce a warm, illustrated companion—not as a noisy cartoon or childish mascot, but as a gentle, quiet presence that walks alongside you through each seasonal shift.
            </p>
          </Card>
        </div>
      </section>

      {/* Milestone 1 Scope & Next Horizons */}
      <section className="bg-[#FBF1ED] p-8 sm:p-12 rounded-3xl border border-[#EED9D5] space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A7853]">
            Development Roadmap
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744]">
            What is Included in Milestone 1
          </h2>
          <p className="text-sm text-[#74505F] max-w-2xl leading-relaxed">
            This milestone establishes the architectural foundation and first working slice of the website:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#593744]">
          <div className="bg-white p-4 rounded-2xl border border-[#EED9D5] space-y-1">
            <strong className="text-[#593744] block">Included in Milestone 1:</strong>
            <ul className="space-y-1 text-[#74505F] list-disc list-inside">
              <li>Editorial design system with warm ivory, blush, rose, and berry tokens.</li>
              <li>Fully interactive cycle phase dial and adaptive hormone guide.</li>
              <li>Functional dashboard preview with fictional sample data and empty state toggle.</li>
              <li>Comprehensive Health Encyclopedia and starter article with peer-reviewed citations.</li>
              <li>Three-tier Science & Evidence classification framework.</li>
              <li>Draft Privacy Principles and architecture commitments.</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#EED9D5] space-y-1">
            <strong className="text-[#593744] block">Planned for Subsequent Milestones:</strong>
            <ul className="space-y-1 text-[#74505F] list-disc list-inside">
              <li>Local-first encrypted data storage (IndexedDB/OPFS).</li>
              <li>Personal onboarding and cycle calibration wizard.</li>
              <li>Gentle illustrated companion character integration.</li>
              <li>Exportable clinical summary reports for physician consultations.</li>
              <li>Granular partner and trusted-circle consent-based sharing.</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-3">
          <Button to="/dashboard-preview" variant="primary">
            Explore Dashboard Preview
          </Button>
          <Button to="/science" variant="outline">
            Review Evidence Methodology
          </Button>
        </div>
      </section>
    </div>
  );
};
