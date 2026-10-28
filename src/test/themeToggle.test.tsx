import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Navbar } from '../components/layout/Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('Theme System and Toggle', () => {
  let mediaQueryListeners: ((e: MediaQueryListEvent) => void)[] = [];
  let matchesDark = false;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = '';
    mediaQueryListeners = [];
    matchesDark = false;

    // Polyfill window.matchMedia for JSDOM
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: matchesDark,
      media: query,
      onchange: null,
      addListener: (listener: (e: MediaQueryListEvent) => void) => {
        mediaQueryListeners.push(listener);
      },
      removeListener: (listener: (e: MediaQueryListEvent) => void) => {
        mediaQueryListeners = mediaQueryListeners.filter((l) => l !== listener);
      },
      addEventListener: (_event: string, listener: (e: MediaQueryListEvent) => void) => {
        mediaQueryListeners.push(listener);
      },
      removeEventListener: (_event: string, listener: (e: MediaQueryListEvent) => void) => {
        mediaQueryListeners = mediaQueryListeners.filter((l) => l !== listener);
      },
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with light mode by default when system prefers light and no storage exists', () => {
    matchesDark = false;
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggle).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.style.colorScheme).toBe('light');
  });

  it('initializes in dark mode when system prefers dark and no storage exists', () => {
    matchesDark = true;
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('button', { name: /switch to light mode/i });
    expect(toggle).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('toggles from light to dark when clicked, persisting to localStorage', () => {
    matchesDark = false;
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(toggle);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(localStorage.getItem('nasa_theme_preference')).toBe('dark');
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();

    // Toggle back to light
    fireEvent.click(screen.getByRole('button', { name: /switch to light mode/i }));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.style.colorScheme).toBe('light');
    expect(localStorage.getItem('nasa_theme_preference')).toBe('light');
  });

  it('restores stored user preference from localStorage', () => {
    localStorage.setItem('nasa_theme_preference', 'dark');
    matchesDark = false; // System prefers light, but user preference is dark

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
  });

  it('responds to system theme changes when preference is system', () => {
    matchesDark = false;

    const TestComponent = () => {
      const { preference, setPreference } = useTheme();
      return (
        <div>
          <span data-testid="pref">{preference}</span>
          <button onClick={() => setPreference('system')}>Set System</button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('pref').textContent).toBe('system');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Simulate system theme change to dark
    act(() => {
      mediaQueryListeners.forEach((listener) => {
        listener({ matches: true } as MediaQueryListEvent);
      });
    });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Simulate system theme change back to light
    act(() => {
      mediaQueryListeners.forEach((listener) => {
        listener({ matches: false } as MediaQueryListEvent);
      });
    });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('renders ThemeToggle in Navbar for both desktop and mobile', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Should find theme toggles in navbar
    const toggles = screen.getAllByRole('button', { name: /switch to (dark|light) mode/i });
    expect(toggles.length).toBeGreaterThanOrEqual(1);
  });

  it('gracefully handles localStorage throwing an error', () => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = vi.fn().mockImplementation(() => {
      throw new Error('QuotaExceeded / Private browsing restriction');
    });

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(() => fireEvent.click(toggle)).not.toThrow();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    localStorage.setItem = originalSetItem;
  });
});
