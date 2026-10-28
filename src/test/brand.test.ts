import { describe, it, expect } from 'vitest';
import { BRAND, getBrandTitle } from '../config/brand';

describe('Brand Configuration', () => {
  it('has NASA as the internal codename', () => {
    expect(BRAND.codename).toBe('NASA');
  });

  it('marks public brand as pending for future selection', () => {
    expect(BRAND.publicBrandPending).toBe(true);
  });

  it('includes an explicit non-medical disclaimer', () => {
    expect(BRAND.medicalDisclaimer).toContain('educational wellness project');
    expect(BRAND.medicalDisclaimer).toContain('do not constitute clinical diagnosis');
  });

  it('provides all mandatory milestone 1 navigation links', () => {
    const paths = BRAND.navigation.map((n) => n.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/dashboard-preview');
    expect(paths).toContain('/encyclopedia');
    expect(paths).toContain('/science');
    expect(paths).toContain('/about');
    expect(paths).toContain('/privacy');
  });

  it('formats brand titles consistently', () => {
    expect(getBrandTitle()).toContain('NASA');
    expect(getBrandTitle('Science & Evidence')).toBe('Science & Evidence | NASA');
  });
});
