import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Mock ResizeObserver for Recharts ResponsiveContainer in jsdom
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
