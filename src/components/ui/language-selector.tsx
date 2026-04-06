'use client';

/**
 * DR-358: Language selector dropdown.
 *
 * Displays supported languages and updates the LanguageContext on selection.
 * Compact by default; shows flag emoji + language name.
 */

import { Globe } from 'lucide-react';
import { useLanguage, type LanguageCode } from '@/lib/language-context';
import { SUPPORTED_LANGUAGES } from '@/lib/supported-languages';

/** Globe + language code button that opens a dropdown */
export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`relative inline-block${className ? ` ${className}` : ''}`}>
      <label htmlFor="language-select" className="sr-only">Select language</label>
      <div className="flex items-center gap-1 text-sm">
        <Globe className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value as LanguageCode)}
          className="appearance-none bg-transparent border-0 cursor-pointer pr-1 focus:outline-none focus:ring-0 text-inherit"
          aria-label="Select site language"
        >
          {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
