import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export type ThemePreference = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'nasa_theme_preference';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const getStoredPreference = (): ThemePreference => {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored as ThemePreference;
    }
  } catch {
    // Storage access may fail in private mode or restricted contexts
  }
  return 'system';
};

const savePreference = (pref: ThemePreference) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    // Gracefully handle storage failures
  }
};

const applyThemeToDocument = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => getStoredPreference());
  const [theme, setThemeState] = useState<Theme>(() => {
    const pref = getStoredPreference();
    if (pref === 'dark' || pref === 'light') return pref;
    return getSystemTheme();
  });

  // Apply theme immediately on mount
  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  // Handle system preference changes when in 'system' mode
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (preference === 'system') {
        const newTheme: Theme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        applyThemeToDocument(newTheme);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, [preference]);

  const setPreference = (newPref: ThemePreference) => {
    setPreferenceState(newPref);
    savePreference(newPref);

    const resolvedTheme: Theme = newPref === 'system' ? getSystemTheme() : newPref;
    setThemeState(resolvedTheme);
    applyThemeToDocument(resolvedTheme);
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setPreference(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const defaultThemeContext: ThemeContextType = {
  theme: 'light',
  preference: 'system',
  setPreference: () => {},
  toggleTheme: () => {},
};

// oxlint-disable-next-line react/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  return context ?? defaultThemeContext;
};
