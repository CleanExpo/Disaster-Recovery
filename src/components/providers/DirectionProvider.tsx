'use client';

/**
 * DR-423: DirectionProvider
 *
 * Client component that reads the persisted language from localStorage on
 * hydration and applies the correct `dir` and `lang` attributes to
 * `document.documentElement`.  This allows the server to render
 * `<html dir="ltr" lang="en-AU">` (SSR-safe default) while the client
 * immediately corrects to `dir="rtl"` for Arabic and other RTL languages
 * before the first paint.
 *
 * The component also subscribes to language changes in the LanguageContext so
 * any in-session language switch is reflected instantly.
 */

import { useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';

/** Maps our internal language codes to valid BCP 47 lang tags for the html element. */
const LANG_TAG: Record<string, string> = {
  en:  'en-AU',
  zh:  'zh-Hans',
  yue: 'zh-Hant',
  ar:  'ar',
  vi:  'vi',
  pa:  'pa',
  hi:  'hi',
  tl:  'tl',
  es:  'es',
  it:  'it',
  el:  'el',
  sm:  'sm',
  ne:  'ne',
  ta:  'ta',
  id:  'id',
  pt:  'pt',
  si:  'si',
  ko:  'ko',
  tr:  'tr',
  mi:  'mi',
  th:  'th',
  to:  'to',
  fr:  'fr',
  ja:  'ja',
};

export function DirectionProvider() {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    const dir = isRTL ? 'rtl' : 'ltr';
    const lang = LANG_TAG[language] ?? language;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [language, isRTL]);

  // This component renders nothing — it is a side-effect-only provider.
  return null;
}
