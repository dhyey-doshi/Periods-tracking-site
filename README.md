# NASA Project — Menstrual Health & Body Literacy Platform

> **Milestone 1: Foundation & First Working Website**  
> *NASA is a temporary internal project codename. Public branding is centrally configurable in `src/config/brand.ts`.*

---

## 1. Product Vision

**NASA** is a web-first menstrual health and wellness platform designed as a warm personal sanctuary rather than an intrusive surveillance tool or a sterile medical portal. It helps individuals understand their infradian biological rhythms with scientific clarity, emotional calm, and absolute privacy.

### Design Principles
- **Editorial Wellness Experience:** Warm off-white foundations (`#FAF8F5`, `#FAF6F2`), restrained rose (`#D86A64`), muted lavender (`#8E73AB`), subtle sage green (`#628C64`), and amber (`#C87528`) accents.
- **Calm Technology:** No artificial engagement loops, gamification streaks, or alarmist notifications.
- **Body Literacy Over Optimization:** Celebrating natural biological variation rather than imposing arbitrary 28-day stereotypes.
- **Strict Evidence Transparency:** Clear categorization between established physiological consensus, emerging research, and future platform algorithms.
- **Honest Uncertainty:** Probabilistic window forecasts instead of false algorithmic precision.
- **Data Sovereignty:** Zero monetization of intimate health telemetry; designed for a local-first, zero-knowledge encryption architecture.

---

## 2. Technical Stack

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling & Tokens:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom editorial tokens and typography
- **Routing:** React Router v7 (`react-router-dom`)
- **Icons:** Lucide React (`lucide-react`)
- **Data Visualization:** Recharts (`recharts`) for 6-cycle historical variability with accessible table alternatives
- **Linting & Quality:** Oxlint (`oxlint`)
- **Testing:** Vitest 5 + React Testing Library + `@testing-library/jest-dom` + `jsdom`

---

## 3. Implemented Routes & Features

| Route | Purpose | Key Implemented Features |
|---|---|---|
| `/` | **Homepage** | Editorial hero, interactive cycle rhythm teaser with 4-phase inspection, core architectural pillars, featured starter guide, milestone newsletter modal. |
| `/dashboard-preview` | **Dashboard Preview** | Interactive cycle status (Day 14 Ovulatory), CycleWheel dial, adaptive hormone cards, daily check-in simulator with in-memory feedback, Recharts historical variability chart (chart/table toggle), and empty state switcher. |
| `/encyclopedia` | **Health Encyclopedia** | Searchable library with category filters, real-time live query matching, count indicators, empty search state fallback, and review status tags. |
| `/encyclopedia/:slug` | **Article Detail** | Complete starter guide: *"The Four Phases of the Menstrual Cycle: A Grounded Guide to Your Rhythm"*, structured headings, sticky table of contents, callouts, peer-reviewed citations (ACOG, Endotext, npj Digital Medicine), review status, and medical disclaimer. |
| `/science` | **Science & Evidence** | Four methodological commitments, interactive three-tier evidence hierarchy (Established Consensus, Emerging Research, Future Modeling), and clinical non-interference notice. |
| `/about` | **About Platform** | Founding philosophy, explanation of internal codename, four guiding principles, and Milestone 1 scope boundaries. |
| `/privacy` | **Draft Privacy Principles** | Draft status disclaimer, technical reality of Milestone 1 (zero telemetry, zero trackers, in-memory only), and intended future local-first safeguards. |
| `*` | **Not Found (404)** | Calm, branded 404 page with navigation shortcuts back to key sections. |

---

## 4. Brand Configuration Architecture

Branding is isolated into a single configuration file:
- File: [`src/config/brand.ts`](file:///c:/Users/dhyey/Documents/nasa/src/config/brand.ts)
- To rename the project or transition from codename `NASA` to the final public brand name, update `BRAND.codename`, `BRAND.displayName`, `BRAND.tagline`, and `BRAND.medicalDisclaimer`.
- No route rewrites, component refactors, or hardcoded strings are required.

---

## 5. Getting Started & Verification

### Prerequisites
- Node.js `v22+`
- npm `v11+`

### Development
```bash
npm run dev
```

### Production Build & Type-Check
```bash
npm run build
```

### Fast Linting
```bash
npm run lint
```

### Automated Test Suite
```bash
npm run test
```

---

## 6. Verification Status

- **Type-Check (`tsc -b`):** Passed with 0 errors across all production modules.
- **Linting (`oxlint`):** Passed with 0 errors and 0 warnings across 41 files.
- **Test Suite (`vitest run`):** 4 test files, 20 tests passed (100% pass rate).
  - `brand.test.ts`: Centralized brand config, disclaimer presence, route integrity.
  - `routes.test.tsx`: All 8 routes render and respond properly.
  - `encyclopedia.test.tsx`: Search queries, category filtering, empty search handling.
  - `dashboard.test.tsx`: Empty state toggle, phase selection, check-in simulation.

---

## 7. Next Milestones & Roadmap

1. **Milestone 2:** Local-First Persistence & Encrypted On-Device Database (IndexedDB / SQLite OPFS).
2. **Milestone 3:** Personal Onboarding & Baseline Calibration Wizard.
3. **Milestone 4:** The Warm Illustrated Companion Integration.
4. **Milestone 5:** Exportable Clinical Consultation Summaries for Doctors.
5. **Milestone 6:** Granular, Consent-Based Trusted Partner Sharing.
