'use client';

/**
 * Equipped Finance Referral - consent surface (Phase 1, no API wiring).
 *
 * Renders the short-form Reg 25 consent copy plus a checkbox and two
 * action buttons. Fires an onContinue callback with the consumer payload
 * and a SHA-256 hash of the exact consent text shown, so a downstream
 * handler can log the consent against compliance_events once DR-688
 * lands the real handoff API.
 *
 * Feature-flagged: renders null unless
 *   NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED === 'true'
 *
 * Research + consent copy: DR-Sandbox
 *   proposals/DR-equipped-referrer-consent/research.md
 *
 * NOT LEGAL ADVICE - interim scaffold pending counsel validation.
 */

import Link from 'next/link';
import { useMemo, useState } from 'react';

export const EQUIPPED_CONSENT_VERSION = 'v1.0-2026-04-23';

/**
 * Short-form consent copy shown to the consumer. Keep in lockstep with
 * proposals/DR-equipped-referrer-consent/research.md section 2. Any
 * change must bump EQUIPPED_CONSENT_VERSION and re-hash.
 */
export const EQUIPPED_CONSENT_COPY = `Finance option, how this works.

Disaster Recovery Australia does not lend money and does not give credit advice. If you would like to explore payment over time, we can refer you to Equipped Commercial Finance, operated by SME Consulting Group Pty Ltd (ABN 53 662 478 408). Equipped is the lender and holds the relevant Australian Credit Licence or acts as an authorised credit representative. Equipped, not Disaster Recovery, will assess your application, decide whether to offer credit, and manage your loan.

If you click "Continue to Equipped", we will share the contact details and claim summary you have given us (name, phone, email, postcode, loss type, estimated scope value) with Equipped so they can contact you. Equipped will handle your data under its own privacy policy.

Disaster Recovery receives a referral fee from Equipped if you take out a loan. This does not change your price with us and does not change Equipped's rates.

You do not have to use Equipped. You can pay directly, use your own bank, or claim through your insurer. Declining this referral will not affect your service.`;

export interface EquippedConsumerPayload {
  fullName: string;
  phone: string;
  email: string;
  postcode: string;
  lossType: 'water' | 'fire' | 'flood' | 'mould' | 'storm' | 'biohazard' | 'other';
  estimatedScopeValue?: number;
  claimReference?: string;
}

export interface EquippedConsentFormProps {
  consumer: EquippedConsumerPayload;
  /**
   * Called after the consumer ticks the checkbox and clicks
   * "Continue to Equipped". Receives the payload plus the consent copy
   * text and its SHA-256 hash (browser-side Web Crypto API).
   */
  onContinue: (args: {
    consumer: EquippedConsumerPayload;
    consentVersion: string;
    consentCopy: string;
    consentCopyHash: string;
  }) => void;
  onDecline?: () => void;
}

const FLAG_ENABLED = process.env.NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED === 'true';

async function sha256Hex(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const bytes = Array.from(new Uint8Array(digest));
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function EquippedConsentForm({ consumer, onContinue, onDecline }: EquippedConsentFormProps) {
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const displayCopy = useMemo(() => EQUIPPED_CONSENT_COPY.trim(), []);

  if (!FLAG_ENABLED) return null;

  const handleContinue = async () => {
    if (!accepted || submitting) return;
    setSubmitting(true);
    try {
      const consentCopyHash = await sha256Hex(displayCopy);
      onContinue({
        consumer,
        consentVersion: EQUIPPED_CONSENT_VERSION,
        consentCopy: displayCopy,
        consentCopyHash,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      role="region"
      aria-labelledby="equipped-consent-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900"
    >
      <h3
        id="equipped-consent-heading"
        className="text-base font-semibold text-slate-900 dark:text-white"
      >
        Finance option, how this works
      </h3>

      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Disaster Recovery Australia does not lend money and does not give credit advice. If you
          would like to explore payment over time, we can refer you to Equipped Commercial
          Finance, operated by SME Consulting Group Pty Ltd (ABN 53 662 478 408). Equipped is the
          lender and holds the relevant Australian Credit Licence or acts as an authorised credit
          representative. Equipped, not Disaster Recovery, will assess your application, decide
          whether to offer credit, and manage your loan.
        </p>
        <p>
          If you click &quot;Continue to Equipped&quot;, we will share the contact details and
          claim summary you have given us (name, phone, email, postcode, loss type, estimated
          scope value) with Equipped so they can contact you. Equipped will handle your data
          under its own privacy policy.
        </p>
        <p>
          Disaster Recovery receives a referral fee from Equipped if you take out a loan. This
          does not change your price with us and does not change Equipped&apos;s rates.
        </p>
        <p>
          You do not have to use Equipped. You can pay directly, use your own bank, or claim
          through your insurer. Declining this referral will not affect your service.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          <Link href="/finance/disclosure" className="text-blue-600 underline hover:text-blue-800">
            Read the full disclosure
          </Link>{' '}
          before continuing.
        </p>
      </div>

      <label className="mt-4 flex items-start gap-3">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-describedby="equipped-consent-heading"
        />
        <span className="text-sm text-slate-800 dark:text-slate-200">
          I have read the above and consent to Disaster Recovery sharing my details with Equipped
          Commercial Finance for the purpose of a finance enquiry.
        </span>
      </label>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!accepted || submitting}
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Preparing handoff\u2026' : 'Continue to Equipped'}
        </button>
        <button
          type="button"
          onClick={onDecline}
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          No thanks, I will arrange my own payment
        </button>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        Consent version {EQUIPPED_CONSENT_VERSION}. Consent and payload are hashed and recorded
        server-side once the handoff fires.
      </p>
    </section>
  );
}
