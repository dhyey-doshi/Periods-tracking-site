import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../config/brand';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { CycleWheel } from '../components/cycle/CycleWheel';
import { PhaseCard } from '../components/cycle/PhaseCard';
import { ARTICLES } from '../data/encyclopediaArticles';
import type { CyclePhase } from '../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  BookOpen,
  Activity,
  Layers,
  Compass,
  Check,
  Send,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<CyclePhase>('ovulatory');
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const featuredArticle = ARTICLES[0]; // The 4 Phases guide

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribedSuccess(true);
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-[#EED9D5]">
        {/* Subtle background ambient gradients */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#F2DCD9]/60 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-60 -left-40 w-96 h-96 rounded-full bg-[#F7EBF0]/60 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EED9D5] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#9E4F66]" />
              <span className="text-xs font-semibold text-[#593744]">
                {BRAND.codename} • Milestone 1 Foundation
              </span>
              <span className="text-xs text-[#8C6775]">| Calm Menstrual Wellness</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#593744] leading-[1.1]">
              Your body has seasons. <br />
              <span className="italic font-normal text-[#9E4F66]">Learn to read them</span> with calm clarity.
            </h1>

            <p className="text-lg sm:text-xl text-[#74505F] leading-relaxed max-w-2xl font-light">
              An evidence-grounded menstrual health and body literacy sanctuary. Built without corporate tracking, clinical coldness, or the myth that every body fits a 28-day box.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <Button
                to="/dashboard-preview"
                variant="primary"
                size="lg"
                icon={<Activity className="w-4 h-4 text-white" />}
              >
                Explore Dashboard Preview
              </Button>
              <Button
                to="/encyclopedia"
                variant="outline"
                size="lg"
                icon={<BookOpen className="w-4 h-4 text-[#593744]" />}
              >
                Browse Encyclopedia
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-[#8C6775]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4A7853]" />
                <span>Zero intimate health data sold</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A85F76]" />
                <span>Clinical & endocrine consensus</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#9E4F66]" />
                <span>Non-judgmental language</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Rhythm Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
            Interactive Rhythm Explorer
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#593744]">
            Four Hormonal Seasons, One Continuous Rhythmical Dialogue
          </h2>
          <p className="text-sm sm:text-base text-[#74505F] leading-relaxed">
            Select any phase on the dial below to explore how estrogen, progesterone, physical stamina, and self-care focus naturally adapt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Wheel dial */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#EED9D5] shadow-xs flex justify-center">
            <CycleWheel
              currentDay={14}
              totalDays={29}
              selectedPhase={selectedPhase}
              onSelectPhase={setSelectedPhase}
            />
          </div>

          {/* Phase inspection card */}
          <div className="lg:col-span-7">
            <PhaseCard phase={selectedPhase} />
          </div>
        </div>
      </section>

      {/* Core Architectural & Ethical Principles */}
      <section className="bg-[#FBF1ED] py-20 border-y border-[#EED9D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A7853]">
              Our Foundation
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#593744]">
              Designed as a Personal Sanctuary, Not a Corporate Surveillance Tool
            </h2>
            <p className="text-sm sm:text-base text-[#74505F]">
              Why we are building {BRAND.codename} differently from traditional period-tracking applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="elevated" padding="lg" className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F7EBF0] text-[#9E4F66] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#593744]">
                Body Literacy Over Control
              </h3>
              <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
                Rather than treating cycles as a problem to solve or optimize, we provide tools that help you listen to bodily intuition with compassion and scientific clarity.
              </p>
            </Card>

            <Card variant="elevated" padding="lg" className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FBF1ED] text-[#A85F76] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#593744]">
                Honest Communicated Uncertainty
              </h3>
              <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
                We reject false algorithmic precision. Biology operates in probabilistic windows, not exact timestamps. We reflect uncertainty openly so you never feel gaslit.
              </p>
            </Card>

            <Card variant="elevated" padding="lg" className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EFF6F1] text-[#4A7853] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#593744]">
                Local-First Sovereignty
              </h3>
              <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
                Your reproductive biomarkers are sacred. Our roadmap prioritizes local-device storage and zero-knowledge encryption, with no advertising trackers.
              </p>
            </Card>

            <Card variant="elevated" padding="lg" className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FEF5EE] text-[#B85C27] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#593744]">
                Strict Evidence Tiering
              </h3>
              <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
                We clearly separate gold-standard clinical consensus from exploratory wellness studies, so you always know the scientific grounding of every insight.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Educational Starter Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
              Featured Starter Guide
            </span>
            <h2 className="font-editorial text-3xl font-semibold text-[#593744] mt-1">
              Deepen Your Understanding
            </h2>
          </div>
          <Link
            to="/encyclopedia"
            className="text-sm font-semibold text-[#9E4F66] hover:text-[#893F55] hover:underline flex items-center gap-1 transition-colors"
          >
            <span>View All Encyclopedia Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-[#EED9D5] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="berry" size="sm">
                  {featuredArticle.categoryLabel}
                </Badge>
                <span className="text-xs text-[#8C6775]">
                  {featuredArticle.readingTimeMinutes} min read • Reviewed {featuredArticle.lastReviewed}
                </span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744]">
                <Link
                  to={`/encyclopedia/${featuredArticle.slug}`}
                  className="hover:text-[#9E4F66] transition-colors"
                >
                  {featuredArticle.title}
                </Link>
              </h3>
              <p className="text-sm sm:text-base text-[#74505F] leading-relaxed">
                {featuredArticle.summary}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredArticle.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                  <div
                    key={idx}
                    className="text-xs bg-[#FBF1ED] text-[#593744] px-3 py-1.5 rounded-xl border border-[#EED9D5] flex items-center gap-1.5 font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-[#4A7853]" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Button
                  to={`/encyclopedia/${featuredArticle.slug}`}
                  variant="primary"
                  icon={<BookOpen className="w-4 h-4 text-white" />}
                >
                  Read Complete Guide
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#FBF1ED] p-6 rounded-2xl border border-[#EED9D5] space-y-3 text-xs text-[#74505F]">
              <span className="font-bold text-[#593744] uppercase tracking-wider block">
                Evidence Transparency
              </span>
              <p className="leading-relaxed">
                This starter guide compiles clinical consensus definitions from the American College of Obstetricians and Gynecologists (ACOG) and peer-reviewed endocrine physiology.
              </p>
              <div className="pt-2 border-t border-[#EED9D5] text-[11px] text-[#8C6775]">
                Review status: {featuredArticle.reviewStatus}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone Roadmap & Community CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F2DCD9] rounded-3xl p-8 sm:p-12 border border-[#EED9D5] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9E4F66]">
              Project Roadmap
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#593744]">
              Follow the Journey of {BRAND.codename}
            </h2>
            <p className="text-sm text-[#74505F] leading-relaxed">
              We are building this platform openly and thoughtfully. Learn about upcoming milestones, including our illustrated companion concept and encrypted local-first tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              variant="outline"
              to="/about"
            >
              Read About Mission
            </Button>
            <Button
              variant="primary"
              onClick={() => setNewsletterModalOpen(true)}
              icon={<Send className="w-3.5 h-3.5 text-white" />}
            >
              Stay Updated
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter / Project Updates Modal */}
      <Modal
        isOpen={newsletterModalOpen}
        onClose={() => {
          setNewsletterModalOpen(false);
          setSubscribedSuccess(false);
        }}
        title="Stay Informed on Future Milestones"
        description="Receive thoughtful, occasional updates on our design releases and open development."
      >
        {subscribedSuccess ? (
          <div className="space-y-4 py-3">
            <div className="bg-[#EFF6F1] p-4 rounded-2xl border border-[#C5DECA] text-xs text-[#2F5938] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2F5938]" />
              <span>Thank you! Your interest has been recorded in this preview demonstration.</span>
            </div>
            <p className="text-xs text-[#74505F]">
              In this Milestone 1 preview, no email addresses are stored or shared. We honor your privacy unconditionally.
            </p>
            <div className="flex justify-end">
              <Button
                variant="subtle"
                size="sm"
                onClick={() => setNewsletterModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-4 py-2">
            <div>
              <label htmlFor="email-preview" className="text-xs font-semibold text-[#593744] block mb-1">
                Email Address (Preview Demonstration)
              </label>
              <input
                id="email-preview"
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="you@domain.com"
                className="w-full text-sm p-3 rounded-2xl border border-[#EED9D5] bg-[#FFF7F4] focus:bg-white focus:outline-none focus:border-[#9E4F66] text-[#593744]"
              />
            </div>
            <p className="text-[11px] text-[#8C6775]">
              Demonstration only. We never sell your data or send spam.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setNewsletterModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Submit Interest
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
