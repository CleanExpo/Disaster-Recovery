'use client';

/**
 * DR-358: Language context for Gemma 4 multilingual integration.
 *
 * Provides the selected language to all child components and persists
 * the selection to localStorage. Also exposes a translate() utility
 * that calls /api/translate and caches results in sessionStorage.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '@/lib/supported-languages';

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isEnglish: boolean;
  /**
   * Translate an array of strings into the current language.
   * Returns the originals immediately for English.
   * Caches per session to avoid repeated API calls.
   */
  translate: (texts: string[]) => Promise<string[]>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'dr_language';
const SESSION_CACHE_PREFIX = 'dr_tx_';

function getCacheKey(lang: string, texts: string[]): string {
  // Simple deterministic key: lang + hash of sorted text array
  const payload = lang + '::' + texts.join('|');
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    hash = ((hash << 5) - hash + payload.charCodeAt(i)) | 0;
  }
  return SESSION_CACHE_PREFIX + hash.toString(36);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  // Rehydrate from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (stored && stored in SUPPORTED_LANGUAGES) {
        setLanguageState(stored);
      }
    } catch {
      // localStorage unavailable (SSR or private browsing) — no-op
    }
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // no-op
    }
  }, []);

  const translate = useCallback(async (texts: string[]): Promise<string[]> => {
    if (language === 'en') return texts;

    const cacheKey = getCacheKey(language, texts);
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached) as string[];
    } catch {
      // sessionStorage unavailable — continue without cache
    }

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts, targetLanguage: language }),
      });
      if (!res.ok) return texts;
      const data = (await res.json()) as { translations: string[] };
      const translations = data.translations ?? texts;

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(translations));
      } catch {
        // no-op
      }
      return translations;
    } catch {
      return texts;
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, isEnglish: language === 'en', translate }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
