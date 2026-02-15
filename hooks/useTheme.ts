'use client';

import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'auto';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load theme from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved && ['light', 'dark', 'auto'].includes(saved)) {
        setTheme(saved);
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const effectiveTheme = theme === 'auto' ? systemTheme : theme;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(effectiveTheme);

    // Set data attribute for CSS
    root.setAttribute('data-theme', effectiveTheme);

    // Set color-scheme for browser UI
    root.style.colorScheme = effectiveTheme;

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, systemTheme, mounted]);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      if (prev === 'auto') return 'light';
      if (prev === 'light') return 'dark';
      return 'auto';
    });
  }, []);

  // Set specific theme
  const setThemeMode = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  // Get effective theme (resolves 'auto')
  const effectiveTheme = theme === 'auto' ? systemTheme : theme;

  return {
    theme,
    effectiveTheme,
    systemTheme,
    setTheme: setThemeMode,
    toggleTheme,
    mounted,
  };
}
