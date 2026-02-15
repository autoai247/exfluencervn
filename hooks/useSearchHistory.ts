'use client';

import { useState, useEffect, useCallback } from 'react';

const MAX_HISTORY_ITEMS = 10;

export function useSearchHistory(storageKey: string = 'search_history') {
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setHistory(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to load search history:', error);
        }
      }
    }
  }, [storageKey]);

  // Save history to localStorage
  const saveHistory = useCallback((newHistory: string[]) => {
    setHistory(newHistory);
    localStorage.setItem(storageKey, JSON.stringify(newHistory));
  }, [storageKey]);

  // Add search query to history
  const addToHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    setHistory(prev => {
      // Remove duplicates and add to front
      const filtered = prev.filter(item => item !== query);
      const newHistory = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(storageKey, JSON.stringify(newHistory));
      return newHistory;
    });
  }, [storageKey]);

  // Remove item from history
  const removeFromHistory = useCallback((query: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item !== query);
      localStorage.setItem(storageKey, JSON.stringify(newHistory));
      return newHistory;
    });
  }, [storageKey]);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
