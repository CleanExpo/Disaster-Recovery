'use client';

/**
 * DR-388: Language preference settings page
 * URL: /settings/language
 *
 * Displays all 24 supported languages in a keyboard-navigable grid.
 * Selecting a language persists the choice to localStorage via the
 * LanguageContext and updates the page immediately.
 */

import { useLanguage, type LanguageCode } from '@/lib/language-context';
import { SUPPORTED_LANGUAGES } from '@/lib/supported-languages';
import Link from 'next/link';
import { ArrowLeft, Globe } from 'lucide-react';

/** Flag emoji derived from ISO 639-1 → approximate country mapping */
const LANGUAGE_META: Record<string, { flag: string; english: string }> = {
  en:  { flag: '🇦🇺', english: 'English' },
  zh:  { flag: '🇨🇳', english: 'Chinese (Simplified)' },
  yue: { flag: '🇭🇰', english: 'Cantonese' },
  ar:  { flag: '🇸🇦', english: 'Arabic' },
  vi:  { flag: '🇻🇳', english: 'Vietnamese' },
  pa:  { flag: '🇮🇳', english: 'Punjabi' },
  hi:  { flag: '🇮🇳', english: 'Hindi' },
  tl:  { flag: '🇵🇭', english: 'Filipino' },
  es:  { flag: '🇪🇸', english: 'Spanish' },
  it:  { flag: '🇮🇹', english: 'Italian' },
  el:  { flag: '🇬🇷', english: 'Greek' },
  sm:  { flag: '🇼🇸', english: 'Samoan' },
  ne:  { flag: '🇳🇵', english: 'Nepali' },
  ta:  { flag: '🇱🇰', english: 'Tamil' },
  id:  { flag: '🇮🇩', english: 'Indonesian' },
  pt:  { flag: '🇧🇷', english: 'Portuguese' },
  si:  { flag: '🇱🇰', english: 'Sinhala' },
  ko:  { flag: '🇰🇷', english: 'Korean' },
  tr:  { flag: '🇹🇷', english: 'Turkish' },
  mi:  { flag: '🇳🇿', english: 'Māori' },
  th:  { flag: '🇹🇭', english: 'Thai' },
  to:  { flag: '🇹🇴', english: 'Tongan' },
  fr:  { flag: '🇫🇷', english: 'French' },
  ja:  { flag: '🇯🇵', english: 'Japanese' },
};

export default function LanguageSettingsPage() {
  const { language, setLanguage } = useLanguage();

  const languages = Object.entries(SUPPORTED_LANGUAGES) as [LanguageCode, string][];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Language preference</h1>
            <p className="text-gray-500 mt-1.5 text-sm leading-relaxed">
              Select your preferred language. Page content will be translated automatically
              using our multilingual service. Your choice is saved to this browser.
            </p>
          </div>
        </div>

        {/* Current selection badge */}
        {language !== 'en' && (
          <div className="mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            Currently displaying in{' '}
            <strong>{LANGUAGE_META[language]?.english ?? language}</strong>.{' '}
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className="underline hover:no-underline font-medium"
            >
              Switch to English
            </button>
          </div>
        )}

        {/* Language grid */}
        <div
          role="group"
          aria-label="Select language"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {languages.map(([code, nativeName]) => {
            const meta = LANGUAGE_META[code];
            const isSelected = language === code;

            return (
              <button
                key={code}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setLanguage(code)}
                className={`flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-xl border-2 text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                {/* Flag emoji */}
                <span className="text-3xl leading-none" aria-hidden="true">
                  {meta?.flag ?? '🌐'}
                </span>

                {/* Native name */}
                <span className={`text-sm font-semibold leading-tight ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                  {nativeName}
                </span>

                {/* English name */}
                <span className={`text-xs leading-tight ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                  {meta?.english ?? code.toUpperCase()}
                </span>

                {/* Selected indicator */}
                {isSelected && (
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-center text-gray-400">
          Translations are provided automatically and may not be perfect for all technical or
          legal content. Official documents are always in English.
        </p>
      </div>
    </main>
  );
}
