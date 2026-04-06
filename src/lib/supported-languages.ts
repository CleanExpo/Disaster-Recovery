/**
 * DR-358: Supported languages for the Gemma 4 multilingual translation system.
 * Shared between the /api/translate route, the language context, and the selector UI.
 */

export const SUPPORTED_LANGUAGES: Record<string, string> = {
  en: 'English',
  zh: '中文 (Simplified)',
  vi: 'Tiếng Việt',
  ar: 'العربية',
  hi: 'हिन्दी',
  el: 'Ελληνικά',
  it: 'Italiano',
  ko: '한국어',
  es: 'Español',
  tl: 'Filipino',
  pa: 'ਪੰਜਾਬੀ',
  ja: '日本語',
};
