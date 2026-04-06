'use client';

/**
 * DR-358: Privacy Collection Notice (APP 5) with Gemma multilingual translation.
 *
 * Translates the body paragraphs when the user selects a non-English language.
 * Links (contact form, Privacy Policy) are hardcoded in rendered JSX;
 * their anchor labels are translated separately.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/lib/language-context';

const EN = {
  heading: 'Privacy — Collection Notice (APP 5)',
  p1: 'National Restoration Professionals Group Pty Ltd (ABN 85 151 794 142), trading as Disaster Recovery Australia, is collecting your personal information on this form to match your claim with a certified IICRC restoration contractor in our network.',
  p2: 'The information you provide — including your name, contact details, property address, damage description, and insurance details — will be disclosed to the assigned contractor so they can contact you, inspect your property, perform restoration work, and liaise with your insurer on your behalf.',
  p3: 'Your payment card details are processed by Stripe and are not stored or shared by us. Your information may also be disclosed to our cloud infrastructure providers who process data on our behalf, and to regulatory bodies where required by law.',
  p4a: 'You have the right to access and correct the personal information we hold about you. To exercise this right or to make a privacy complaint, contact us via our',
  p4b: 'contact form',
  p4c: '. Our full',
  p4d: 'Privacy Policy',
  p4e: 'is available at disasterrecovery.com.au/privacy.',
  p5: 'If you are not satisfied with our response to a complaint, you may contact the Office of the Australian Information Commissioner (OAIC) at',
  checkboxLabel: 'I have read and understood the collection notice above. I consent to my personal information being collected, used, and disclosed as described to match my claim and perform restoration services.',
};

type TextKeys = typeof EN;

export function PrivacyCollectionNotice() {
  const { language, isEnglish, translate } = useLanguage();
  const [texts, setTexts] = useState<TextKeys>(EN);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEnglish) {
      setTexts(EN);
      return;
    }
    setLoading(true);
    const keys = Object.keys(EN) as (keyof TextKeys)[];
    const values = Object.values(EN);
    translate(values).then((translated) => {
      const updated = {} as TextKeys;
      keys.forEach((k, i) => { updated[k] = translated[i]; });
      setTexts(updated);
      setLoading(false);
    }).catch(() => {
      setTexts(EN);
      setLoading(false);
    });
  }, [language, isEnglish, translate]);

  return (
    <div
      className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 space-y-2 leading-relaxed"
      aria-busy={loading}
      lang={language}
    >
      {loading && (
        <p className="text-xs text-blue-500 italic">Translating…</p>
      )}
      <p>
        <strong>National Restoration Professionals Group Pty Ltd</strong> (ABN 85 151 794 142), trading as <strong>Disaster Recovery Australia</strong>
        {isEnglish ? (
          <>, is collecting your personal information on this form to match your claim with a certified IICRC restoration contractor in our network.</>
        ) : (
          <>. {texts.p1.replace(/^National Restoration Professionals Group Pty Ltd \(ABN 85 151 794 142\), trading as Disaster Recovery Australia[,.]?\s*/i, '')}</>
        )}
      </p>
      <p>{texts.p2}</p>
      <p>{texts.p3}</p>
      <p>
        {texts.p4a}{' '}
        <Link href="/contact" className="underline font-medium">{texts.p4b}</Link>
        {texts.p4c}{' '}
        <Link href="/privacy" className="underline font-medium">{texts.p4d}</Link>
        {' '}{texts.p4e}
      </p>
      <p>
        {texts.p5}{' '}
        <strong>oaic.gov.au</strong> or on <strong>1300 363 992</strong>.
      </p>
    </div>
  );
}

/**
 * Translated checkbox label for the privacy consent.
 */
export function usePrivacyCheckboxLabel(): string {
  const { language, isEnglish, translate } = useLanguage();
  const [label, setLabel] = useState(EN.checkboxLabel);

  useEffect(() => {
    if (isEnglish) { setLabel(EN.checkboxLabel); return; }
    translate([EN.checkboxLabel]).then(([t]) => setLabel(t ?? EN.checkboxLabel));
  }, [language, isEnglish, translate]);

  return label;
}

const CHECKBOX_CLASS =
  'h-5 w-5 rounded border-2 border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white shrink-0';

/**
 * Full section: heading + translated notice panel + consent checkbox.
 * Drop-in replacement for the static block in ClaimFormClient Step 3.
 */
export function PrivacyCollectionNoticeSection({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const { language, isEnglish, translate } = useLanguage();
  const [heading, setHeading] = useState(EN.heading);
  const checkboxLabel = usePrivacyCheckboxLabel();

  useEffect(() => {
    if (isEnglish) { setHeading(EN.heading); return; }
    translate([EN.heading]).then(([t]) => setHeading(t ?? EN.heading));
  }, [language, isEnglish, translate]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{heading}</h3>
      <PrivacyCollectionNotice />
      <div className="flex items-start gap-3 py-1">
        <Checkbox
          id="privacyCollectionNotice"
          className={CHECKBOX_CLASS}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v as boolean)}
          required
        />
        <Label htmlFor="privacyCollectionNotice" className="font-normal cursor-pointer leading-snug">
          {checkboxLabel}
        </Label>
      </div>
    </div>
  );
}
