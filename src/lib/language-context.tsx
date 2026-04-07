'use client';

/**
 * DR-358: Language context for Gemma 4 multilingual integration.
 * DR-386: Added isTranslating + translationError states.
 *         Cache key now includes model name so cache invalidates when model changes.
 *
 * Provides the selected language to all child components and persists
 * the selection to localStorage. Also exposes a translate() utility
 * that calls /api/translate and caches results in sessionStorage.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, RTL_LANGUAGES } from '@/lib/supported-languages';

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;

// DR-386: include model tag in cache key so changing the model invalidates all cached translations.
// Exposed via NEXT_PUBLIC_TRANSLATION_MODEL if set; falls back to 'default'.
const TRANSLATION_MODEL_TAG =
  typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_TRANSLATION_MODEL
    ? process.env.NEXT_PUBLIC_TRANSLATION_MODEL
    : 'default';

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isEnglish: boolean;
  /** True when the current language uses right-to-left text direction (DR-423). */
  isRTL: boolean;
  /**
   * Translate an array of strings into the current language.
   * Returns the originals immediately for English.
   * Caches per session to avoid repeated API calls.
   */
  translate: (texts: string[]) => Promise<string[]>;
  /** True while a translation request is in-flight. */
  isTranslating: boolean;
  /** Non-null if the last translation request failed. */
  translationError: string | null;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'dr_language';
const SESSION_CACHE_PREFIX = 'dr_tx_';

function getCacheKey(lang: string, model: string, texts: string[]): string {
  // Deterministic key: lang + model + hash of text array (DR-386: model included for cache invalidation)
  const payload = lang + '::' + model + '::' + texts.join('|');
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    hash = ((hash << 5) - hash + payload.charCodeAt(i)) | 0;
  }
  return SESSION_CACHE_PREFIX + hash.toString(36);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);

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
    setTranslationError(null);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // no-op
    }
  }, []);

  const translate = useCallback(async (texts: string[]): Promise<string[]> => {
    if (language === 'en') return texts;

    const cacheKey = getCacheKey(language, TRANSLATION_MODEL_TAG, texts);
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached) as string[];
    } catch {
      // sessionStorage unavailable — continue without cache
    }

    setIsTranslating(true);
    setTranslationError(null);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts, targetLanguage: language }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({})) as { error?: string };
        const msg = errBody?.error ?? `Translation request failed (${res.status})`;
        setTranslationError(msg);
        return texts;
      }

      const data = (await res.json()) as { translations: string[] };
      const translations = data.translations ?? texts;

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(translations));
      } catch {
        // no-op
      }
      return translations;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Translation unavailable';
      setTranslationError(msg);
      return texts;
    } finally {
      setIsTranslating(false);
    }
  }, [language]);

  const isRTLValue = RTL_LANGUAGES.has(language);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, isEnglish: language === 'en', isRTL: isRTLValue, translate, isTranslating, translationError }}
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
