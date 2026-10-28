import { describe, it, expect } from 'vitest';
import { PALETTE, SEMANTIC_TOKENS } from '../theme/tokens';

/**
 * Calculates WCAG 2.1 relative luminance for a given hex color string.
 */
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const rLin = toLinear(r);
  const gLin = toLinear(g);
  const bLin = toLinear(b);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Calculates WCAG 2.1 contrast ratio between two hex colors.
 */
function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

describe('Rose & Berry Design Tokens', () => {
  describe('Anchor Palette Verification', () => {
    it('contains the exact anchor palette specified for Phase 1.1', () => {
      expect(PALETTE.warmIvory.toUpperCase()).toBe('#FFF7F4');
      expect(PALETTE.softBlush.toUpperCase()).toBe('#F2DCD9');
      expect(PALETTE.mutedRose.toUpperCase()).toBe('#D99B9F');
      expect(PALETTE.berry.toUpperCase()).toBe('#A85F76');
      expect(PALETTE.deepPlum.toUpperCase()).toBe('#593744');
    });

    it('defines accessible functional extensions', () => {
      expect(PALETTE.berryDark).toBeDefined();
      expect(PALETTE.berryHover).toBeDefined();
      expect(PALETTE.plumLight).toBeDefined();
      expect(PALETTE.plumMuted).toBeDefined();
      expect(PALETTE.borderSoft).toBeDefined();
    });
  });

  describe('Semantic Tokens Architecture', () => {
    it('maps semantic background tokens to appropriate palette anchors', () => {
      expect(SEMANTIC_TOKENS.bg.page).toBe(PALETTE.warmIvory);
      expect(SEMANTIC_TOKENS.bg.surface).toBe(PALETTE.ivorySurface);
      expect(SEMANTIC_TOKENS.bg.blush).toBe(PALETTE.softBlush);
    });

    it('maps text tokens with proper hierarchy', () => {
      expect(SEMANTIC_TOKENS.text.primary).toBe(PALETTE.deepPlum);
      expect(SEMANTIC_TOKENS.text.secondary).toBe(PALETTE.plumLight);
      expect(SEMANTIC_TOKENS.text.muted).toBe(PALETTE.plumMuted);
    });

    it('maps primary action buttons to high-contrast berry shade', () => {
      expect(SEMANTIC_TOKENS.action.primaryBg).toBe(PALETTE.berryDark);
      expect(SEMANTIC_TOKENS.action.primaryText).toBe('#FFFFFF');
    });

    it('maps all 4 cycle phases to distinct botanical tones', () => {
      expect(SEMANTIC_TOKENS.phases.menstrual.accent).toBe(PALETTE.berryDark);
      expect(SEMANTIC_TOKENS.phases.follicular.accent).toBe(PALETTE.sage.accent);
      expect(SEMANTIC_TOKENS.phases.ovulatory.accent).toBe(PALETTE.amber.accent);
      expect(SEMANTIC_TOKENS.phases.luteal.accent).toBe(PALETTE.amethyst.accent);
    });
  });

  describe('WCAG 2.1 AA & AAA Contrast Compliance', () => {
    it('ensures primary text (Deep Plum) meets WCAG AAA (> 7:1) on warm ivory and white', () => {
      const contrastOnIvory = getContrastRatio(PALETTE.deepPlum, PALETTE.warmIvory);
      const contrastOnWhite = getContrastRatio(PALETTE.deepPlum, '#FFFFFF');

      expect(contrastOnIvory).toBeGreaterThanOrEqual(7.0);
      expect(contrastOnWhite).toBeGreaterThanOrEqual(7.0);
    });

    it('ensures primary text (Deep Plum) meets WCAG AAA (> 7:1) on soft blush surface', () => {
      const contrastOnBlush = getContrastRatio(PALETTE.deepPlum, PALETTE.softBlush);
      expect(contrastOnBlush).toBeGreaterThanOrEqual(7.0);
    });

    it('ensures secondary text (Plum Light) meets WCAG AA (> 4.5:1) on warm ivory and white', () => {
      const contrastOnIvory = getContrastRatio(PALETTE.plumLight, PALETTE.warmIvory);
      const contrastOnWhite = getContrastRatio(PALETTE.plumLight, '#FFFFFF');

      expect(contrastOnIvory).toBeGreaterThanOrEqual(4.5);
      expect(contrastOnWhite).toBeGreaterThanOrEqual(4.5);
    });

    it('ensures primary action button text (#FFFFFF) meets WCAG AA (> 4.5:1) on Berry Dark', () => {
      const contrastOnBerryDark = getContrastRatio('#FFFFFF', PALETTE.berryDark);
      expect(contrastOnBerryDark).toBeGreaterThanOrEqual(4.5);
    });

    it('ensures status and alert card texts meet WCAG AA (> 4.5:1) on their badge backgrounds', () => {
      const sageContrast = getContrastRatio(PALETTE.sage.text, PALETTE.sage.bg);
      const amberContrast = getContrastRatio(PALETTE.amber.text, PALETTE.amber.bg);
      const amethystContrast = getContrastRatio(PALETTE.amethyst.text, PALETTE.amethyst.bg);
      const alertContrast = getContrastRatio(PALETTE.roseAlert.text, PALETTE.roseAlert.bg);

      expect(sageContrast).toBeGreaterThanOrEqual(4.5);
      expect(amberContrast).toBeGreaterThanOrEqual(4.5);
      expect(amethystContrast).toBeGreaterThanOrEqual(4.5);
      expect(alertContrast).toBeGreaterThanOrEqual(4.5);
    });

    it('ensures dark mode primary text meets WCAG AAA (> 7:1) on dark canvas and card surfaces', () => {
      const contrastOnCanvas = getContrastRatio('#F8F0F3', '#171319');
      const contrastOnCard = getContrastRatio('#F8F0F3', '#2B222C');

      expect(contrastOnCanvas).toBeGreaterThanOrEqual(7.0);
      expect(contrastOnCard).toBeGreaterThanOrEqual(7.0);
    });

    it('ensures dark mode secondary text meets WCAG AA (> 4.5:1) on dark canvas and card surfaces', () => {
      const contrastOnCanvas = getContrastRatio('#C7B8C2', '#171319');
      const contrastOnCard = getContrastRatio('#C7B8C2', '#2B222C');

      expect(contrastOnCanvas).toBeGreaterThanOrEqual(4.5);
      expect(contrastOnCard).toBeGreaterThanOrEqual(4.5);
    });

    it('ensures dark mode botanical badge texts meet WCAG AA (> 4.5:1) on their dark backgrounds', () => {
      const sageDarkContrast = getContrastRatio('#A8DEB3', '#1A261E');
      const amberDarkContrast = getContrastRatio('#F3BF90', '#2A1D13');
      const amethystDarkContrast = getContrastRatio('#DABCE6', '#241A29');
      const alertDarkContrast = getContrastRatio('#F5A3B2', '#2B151C');

      expect(sageDarkContrast).toBeGreaterThanOrEqual(4.5);
      expect(amberDarkContrast).toBeGreaterThanOrEqual(4.5);
      expect(amethystDarkContrast).toBeGreaterThanOrEqual(4.5);
      expect(alertDarkContrast).toBeGreaterThanOrEqual(4.5);
    });
  });
});
