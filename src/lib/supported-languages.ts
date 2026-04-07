/**
 * DR-358: Supported languages for the Gemma 4 multilingual translation system.
 * Shared between the /api/translate route, the language context, and the selector UI.
 *
 * Language selection based on ABS 2021 Census and Stats NZ 2018 Census —
 * top languages spoken at home in Australia and New Zealand.
 *
 * Current coverage: 24 languages (23 non-English + English default)
 *
 * DR-423: RTL language support — Arabic and other RTL languages.
 */

/** Language codes that use right-to-left text direction. */
export const RTL_LANGUAGES = new Set(['ar', 'ur', 'he', 'fa', 'ps']);

/**
 * Returns true if the given BCP 47 language code uses right-to-left direction.
 */
export function isRTL(langCode: string): boolean {
  return RTL_LANGUAGES.has(langCode);
}

export const SUPPORTED_LANGUAGES: Record<string, string> = {
  // ── Default ──────────────────────────────────────────────────────────────
  en:  'English',

  // ── Top AU/NZ languages by speaker count (ABS 2021 + Stats NZ 2018) ─────
  zh:  '中文 (Simplified)',        // Mandarin — AU #1 non-English (~685k)
  yue: '粵語 (Cantonese)',         // Cantonese — AU #4 non-English (~265k)
  ar:  'العربية',                  // Arabic — AU #2 (~340k)
  vi:  'Tiếng Việt',               // Vietnamese — AU #3 (~295k)
  pa:  'ਪੰਜਾਬੀ',                  // Punjabi — AU #5 (~195k)
  hi:  'हिन्दी',                   // Hindi — AU #6 (~163k) + NZ #3
  tl:  'Filipino',                 // Tagalog/Filipino — AU #7 (~159k)
  es:  'Español',                  // Spanish — AU #8 (~154k) + NZ #8
  it:  'Italiano',                 // Italian — AU #9 (~150k)
  el:  'Ελληνικά',                 // Greek — AU #10 (~125k)
  sm:  'Gagana Samoa',             // Samoan — NZ #1 Pacific (~86k NZ)
  ne:  'नेपाली',                   // Nepali — AU #11 & growing (~98k)
  ta:  'தமிழ்',                    // Tamil — AU #13 + NZ #10 (~117k combined)
  id:  'Bahasa Indonesia',         // Indonesian — AU #14 (~85k)
  pt:  'Português',                // Portuguese — AU #15 (~74k, Brazilian community)
  si:  'සිංහල',                   // Sinhala — AU #16 (~71k)
  ko:  '한국어',                    // Korean — AU #12 (~93k)
  tr:  'Türkçe',                   // Turkish — AU #18 (~52k)
  mi:  'Te Reo Māori',             // Māori — NZ official language (~50k at home)
  th:  'ภาษาไทย',                 // Thai — AU #19 (~38k)
  to:  'Lea faka-Tonga',           // Tongan — NZ Pacific (~33k NZ)
  fr:  'Français',                 // French — NZ #6 (~35k NZ)
  ja:  '日本語',                   // Japanese — AU #17 (~55k)
};
