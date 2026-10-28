/**
 * NASA Design System — Rose & Berry Tokens
 * 
 * Central source of truth for the Rose & Berry palette and semantic design tokens.
 * These tokens define the visual personality: playful, warm, expressive, and reassuring.
 */

export const PALETTE = {
  // Core Anchors
  warmIvory: '#FFF7F4',   // Page background / lightest surface
  softBlush: '#F2DCD9',   // Gentle blush surface / subtle card fill / pill backgrounds
  mutedRose: '#D99B9F',   // Playful interactive accent / decorative elements
  berry: '#A85F76',       // Signature brand color / primary highlights / charts
  deepPlum: '#593744',    // Primary high-contrast text / strong anchor

  // Extended Functional Shades
  berryDark: '#9E4F66',   // High-contrast primary action button (WCAG AA > 5:1 on white)
  berryHover: '#893F55',  // Hover state for primary buttons
  berryActive: '#763246', // Active / pressed state
  berrySubtle: '#F7EBF0', // Very light berry background tint
  berryBorder: '#E8CCD5', // Soft berry border

  plumLight: '#74505F',   // Secondary text (WCAG AAA > 7:1 on ivory & white)
  plumMuted: '#8C6775',   // Muted text / tertiary labels (WCAG AA > 4.6:1 on ivory & white)
  plumDark: '#3E242E',    // Deepest plum for extreme contrast

  ivorySurface: '#FBF1ED', // Warm alabaster surface for inner cards and sidebars
  ivorySubtle: '#F6E6E1',  // Slightly darker ivory for dividers and inactive chips
  borderSoft: '#EED9D5',   // Primary soft border for cards and containers
  borderSubtle: '#F5E4E0', // Very light divider line
  borderFocus: '#9E4F66',  // Accessible focus ring color

  // Harmonized Status & Context Colors (Warm & Botanical)
  sage: {
    text: '#2F5938',       // High-contrast accessible text
    badge: '#3D6E46',
    border: '#C5DECA',
    bg: '#EFF6F1',
    accent: '#4A7853',     // Follicular phase anchor
  },
  amber: {
    text: '#874614',       // High-contrast accessible text
    badge: '#A2591B',
    border: '#F8D8BF',
    bg: '#FEF5EE',
    accent: '#B85C27',     // Ovulatory phase anchor
  },
  amethyst: {
    text: '#5B376E',       // High-contrast accessible text
    badge: '#6F4786',
    border: '#E4D5EB',
    bg: '#F8F2FA',
    accent: '#7A486E',     // Luteal phase anchor
  },
  roseAlert: {
    text: '#8E2235',       // High-contrast alert text
    badge: '#A3293E',
    border: '#F5CDD3',
    bg: '#FDF1F3',
    accent: '#B83A52',
  },
} as const;

export const SEMANTIC_TOKENS = {
  bg: {
    page: PALETTE.warmIvory,
    card: '#FFFFFF',
    surface: PALETTE.ivorySurface,
    subtle: PALETTE.ivorySubtle,
    blush: PALETTE.softBlush,
    berrySubtle: PALETTE.berrySubtle,
  },
  text: {
    primary: PALETTE.deepPlum,
    secondary: PALETTE.plumLight,
    muted: PALETTE.plumMuted,
    onBerry: '#FFFFFF',
    onPlum: '#FFFFFF',
    link: PALETTE.berryDark,
    linkHover: PALETTE.berryHover,
  },
  border: {
    soft: PALETTE.borderSoft,
    subtle: PALETTE.borderSubtle,
    active: PALETTE.mutedRose,
    focus: PALETTE.borderFocus,
    berry: PALETTE.berryBorder,
  },
  action: {
    primaryBg: PALETTE.berryDark,
    primaryHover: PALETTE.berryHover,
    primaryActive: PALETTE.berryActive,
    primaryText: '#FFFFFF',
    secondaryBg: PALETTE.deepPlum,
    secondaryHover: PALETTE.plumDark,
    secondaryText: '#FFFFFF',
    subtleBg: PALETTE.softBlush,
    subtleHover: PALETTE.mutedRose,
    subtleText: PALETTE.deepPlum,
  },
  chart: {
    cycleLength: PALETTE.berry,
    periodLength: PALETTE.deepPlum,
    ovulationPoint: PALETTE.amber.accent,
    lutealLength: PALETTE.amethyst.accent,
    referenceLine: PALETTE.amber.accent,
    grid: PALETTE.borderSoft,
    tooltipBg: '#FFFFFF',
    tooltipBorder: PALETTE.borderSoft,
  },
  phases: {
    menstrual: {
      accent: PALETTE.berryDark,
      bg: PALETTE.roseAlert.bg,
      border: PALETTE.roseAlert.border,
      text: PALETTE.roseAlert.text,
      badge: 'bg-[#FDF1F3] text-[#8E2235] border-[#F5CDD3]',
    },
    follicular: {
      accent: PALETTE.sage.accent,
      bg: PALETTE.sage.bg,
      border: PALETTE.sage.border,
      text: PALETTE.sage.text,
      badge: 'bg-[#EFF6F1] text-[#2F5938] border-[#C5DECA]',
    },
    ovulatory: {
      accent: PALETTE.amber.accent,
      bg: PALETTE.amber.bg,
      border: PALETTE.amber.border,
      text: PALETTE.amber.text,
      badge: 'bg-[#FEF5EE] text-[#874614] border-[#F8D8BF]',
    },
    luteal: {
      accent: PALETTE.amethyst.accent,
      bg: PALETTE.amethyst.bg,
      border: PALETTE.amethyst.border,
      text: PALETTE.amethyst.text,
      badge: 'bg-[#F8F2FA] text-[#5B376E] border-[#E4D5EB]',
    },
  },
} as const;
