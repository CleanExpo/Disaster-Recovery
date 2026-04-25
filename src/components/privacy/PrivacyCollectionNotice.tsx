'use client';

/**
 * DR-609: Shared Privacy Collection Notice (APP 5) component.
 *
 * Compact disclosure panel for use on event pages adjacent to intake CTAs.
 * Uses the same translation infrastructure as the claim form version.
 *
 * For the full notice + consent checkbox used within claim forms, see:
 * app/claim/PrivacyCollectionNotice.tsx → PrivacyCollectionNoticeSection
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

const EN = {
  body: 'National Restoration Professionals Group Pty Ltd (ABN 85 151 794 142), trading as Disaster Recovery, collects your name, contact details, and property information when you lodge a claim to match you with a certified IICRC restoration contractor. Your information is disclosed to the assigned contractor and processed under the Privacy Act 1988 (Cth). It is not sold or shared for marketing purposes.',
  policy: 'Privacy Policy',
  oaic: 'Complaints may be lodged with the OAIC at oaic.gov.au.',
};

type Keys = typeof EN;

/**
 * Compact APP 5 disclosure panel — drop-in for event pages near claim CTAs.
 * Translates when a non-English language is selected via LanguageContext.
 */
export function PrivacyCollectionNotice() {
  const { language, isEnglish, translate } = useLanguage();
  const [texts, setTexts] = useState<Keys>(EN);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEnglish) {
      setTexts(EN);
      return;
    }
    setLoading(true);
    const keys = Object.keys(EN) as (keyof Keys)[];
    translate(Object.values(EN))
      .then((translated) => {
        const updated = {} as Keys;
        keys.forEach((k, i) => {
          updated[k] = translated[i] ?? EN[k];
        });
        setTexts(updated);
      })
      .catch(() => setTexts(EN))
      .finally(() => setLoading(false));
  }, [language, isEnglish, translate]);

  return (
    <div
      className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-900 space-y-1 leading-relaxed mt-3"
      aria-busy={loading}
      lang={language}
    >
      {loading && <span className="italic text-blue-400">Translating…</span>}
      <p>
        <strong>Privacy notice:</strong> {texts.body}{' '}
        <Link href="/privacy" className="underline font-medium">
          {texts.policy}
        </Link>
        {'. '}
        {texts.oaic}
      </p>
    </div>
  );
}
