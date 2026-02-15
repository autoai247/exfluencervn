'use client';

import { useState, useEffect, useCallback } from 'react';

interface SmartDefaultsConfig<T> {
  storageKey: string;
  defaultValues: T;
  learnFromSubmissions?: boolean;
}

export function useSmartDefaults<T extends Record<string, any>>({
  storageKey,
  defaultValues,
  learnFromSubmissions = true,
}: SmartDefaultsConfig<T>) {
  const [smartDefaults, setSmartDefaults] = useState<Partial<T>>(defaultValues);
  const [usageCount, setUsageCount] = useState<Record<string, number>>({});

  // Load smart defaults from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`${storageKey}_smart_defaults`);
      const savedUsage = localStorage.getItem(`${storageKey}_usage_count`);

      if (saved) {
        try {
          setSmartDefaults(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to load smart defaults:', error);
        }
      }

      if (savedUsage) {
        try {
          setUsageCount(JSON.parse(savedUsage));
        } catch (error) {
          console.error('Failed to load usage count:', error);
        }
      }
    }
  }, [storageKey]);

  // Learn from user's submissions
  const learnFromSubmission = useCallback((data: Partial<T>) => {
    if (!learnFromSubmissions) return;

    setSmartDefaults(prev => {
      const updated = { ...prev };

      // Update frequently used values
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          // For arrays, track most used items
          if (Array.isArray(value) && value.length > 0) {
            updated[key as keyof T] = value as any;
          }
          // For primitive values, just store the last used
          else if (typeof value !== 'object') {
            updated[key as keyof T] = value as any;
          }
        }
      });

      localStorage.setItem(`${storageKey}_smart_defaults`, JSON.stringify(updated));
      return updated;
    });

    // Update usage count
    setUsageCount(prev => {
      const updated = { ...prev };
      Object.keys(data).forEach(key => {
        updated[key] = (updated[key] || 0) + 1;
      });
      localStorage.setItem(`${storageKey}_usage_count`, JSON.stringify(updated));
      return updated;
    });
  }, [learnFromSubmissions, storageKey]);

  // Get suggested value for a field
  const getSuggestion = useCallback((fieldName: keyof T): T[keyof T] | undefined => {
    return smartDefaults[fieldName];
  }, [smartDefaults]);

  // Get all smart defaults
  const getSmartDefaults = useCallback((): Partial<T> => {
    return smartDefaults;
  }, [smartDefaults]);

  // Reset smart defaults
  const resetDefaults = useCallback(() => {
    setSmartDefaults(defaultValues);
    setUsageCount({});
    localStorage.removeItem(`${storageKey}_smart_defaults`);
    localStorage.removeItem(`${storageKey}_usage_count`);
  }, [defaultValues, storageKey]);

  // Apply smart defaults to form data
  const applyDefaults = useCallback((currentData: Partial<T>): T => {
    const merged = { ...defaultValues };

    // Apply smart defaults first
    Object.entries(smartDefaults).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        merged[key as keyof T] = value as any;
      }
    });

    // Override with current data
    Object.entries(currentData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        merged[key as keyof T] = value as any;
      }
    });

    return merged;
  }, [defaultValues, smartDefaults]);

  return {
    smartDefaults,
    usageCount,
    learnFromSubmission,
    getSuggestion,
    getSmartDefaults,
    resetDefaults,
    applyDefaults,
  };
}
