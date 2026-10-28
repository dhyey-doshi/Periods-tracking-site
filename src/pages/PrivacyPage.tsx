import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Callout } from '../components/ui/Callout';
import { BRAND } from '../config/brand';
import {
  ShieldCheck,
  EyeOff,
  HardDrive,
  Share2,
  Trash2,
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-12">
      <PageHeader
        kicker="Transparency & Ethics"
        title="Draft Privacy Principles & Planned Architecture"
        description="A transparent overview of how we intend to protect personal health information, our ethical commitments, and the precise technical reality of this early preview."
        breadcrumbs={[
          { label: 'Privacy' },
        ]}
      />

      {/* Prominent Legal Disclaimer Banner */}
      <Callout
        type="clinical-note"
        title="Draft Document & Non-Legal Review Notice"
        text="This page represents an architectural design statement and draft ethical declaration. It is not a legally binding Privacy Policy and has not yet undergone formal attorney review. We do not make false claims that unimplemented cryptographic infrastructures or regulatory certifications are currently active in this Milestone 1 preview."
      />

      {/* Current Milestone 1 Technical Reality */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A7853]">
          <ShieldCheck className="w-4 h-4" />
          <span>Current Technical Reality (Milestone 1)</span>
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744]">
          What Happens to Data Right Now
        </h2>

        <div className="bg-[#F2F7F3] p-6 sm:p-8 rounded-3xl border border-[#D5E5D8] text-xs sm:text-sm text-[#2F5938] space-y-3">
          <p className="leading-relaxed">
            In this initial milestone release of <strong>{BRAND.codename}</strong>:
          </p>
          <ul className="space-y-2 list-disc list-inside leading-relaxed text-[#593744]">
            <li>
              <strong>Zero real health data is stored or transmitted:</strong> All daily check-in simulations, cycle charts, and phase dials operate exclusively in-memory inside your local web browser session.
            </li>
            <li>
              <strong>No third-party tracking pixels or ad networks:</strong> There are no advertising trackers, Facebook Pixels, or commercial data brokers embedded in this codebase.
            </li>
            <li>
              <strong>No accounts or remote databases:</strong> We have deliberately omitted cloud authentication and backend user storage to keep Milestone 1 purely focused on editorial foundation and UI validation.
            </li>
          </ul>
        </div>
      </section>

      {/* Planned Future Safeguards */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
            Planned Safeguards
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744]">
            Intended Architectural Principles for Future Milestones
          </h2>
          <p className="text-sm text-[#74505F] max-w-2xl leading-relaxed">
            As we evolve {BRAND.codename} into a functional personal tracking platform, we are architecting around four uncompromising principles:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="elevated" padding="lg" className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F2DCD9] text-[#9E4F66] flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#593744]">
              1. Never Monetizing Bodily Telemetry
            </h3>
            <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
              We reject the surveillance capitalism business model. We will never sell, rent, monetize, or package your cycle lengths, cervical fluid notes, sexual activity, or mood patterns to advertisers, insurance underwriters, or data brokers.
            </p>
          </Card>

          <Card variant="elevated" padding="lg" className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7A486E]/10 text-[#7A486E] flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#593744]">
              2. Local-First Cryptographic Storage
            </h3>
            <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
              Our planned storage architecture places your data on your personal device first (utilizing encrypted IndexedDB / OPFS). When optional multi-device sync is introduced, data will be protected by client-side zero-knowledge encryption where only you hold the keys.
            </p>
          </Card>

          <Card variant="elevated" padding="lg" className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A7853]/10 text-[#4A7853] flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#593744]">
              3. Explicit, Revocable Consent for Sharing
            </h3>
            <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
              When partner or healthcare provider sharing is implemented, it will be strictly opt-in, granular (e.g. sharing phase status without intimate daily journal text), and revocable with a single tap at any second.
            </p>
          </Card>

          <Card variant="elevated" padding="lg" className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#B85C27]/10 text-[#B85C27] flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#593744]">
              4. Complete Export & Instant Deletion
            </h3>
            <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
              You will always have the right to download your complete cycle logs in human-readable JSON and CSV formats. Choosing to delete your account will perform a permanent, unrecoverable purge across all local and cloud state.
            </p>
          </Card>
        </div>
      </section>

      {/* Legal & Regulatory Timeline */}
      <section className="bg-[#FBF1ED] p-8 sm:p-10 rounded-3xl border border-[#EED9D5] space-y-4">
        <h3 className="font-editorial text-2xl font-bold text-[#593744]">
          Roadmap to Formal Legal & Compliance Review
        </h3>
        <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed max-w-3xl">
          Prior to launching production user accounts or accepting real reproductive health records, we will:
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm text-[#74505F] list-disc list-inside">
          <li>Retain specialized digital health legal counsel to draft formal, jurisdiction-specific Terms of Service and Privacy Policies (addressing GDPR, California Consumer Privacy Act, and state-level reproductive privacy statutes).</li>
          <li>Conduct third-party cryptographic code audits on all local encryption implementations.</li>
          <li>Establish a transparent security vulnerability disclosure policy.</li>
        </ul>
      </section>
    </div>
  );
};
