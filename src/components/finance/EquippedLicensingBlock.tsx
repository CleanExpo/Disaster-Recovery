/**
 * Authoritative Equipped Commercial Finance licensing block.
 *
 * Sourced from:
 *   public/finance/credit-guide-equipped-v17-202307.pdf (V17 202307)
 *
 * Do NOT hand-edit the numbers below as a one-off. When Equipped issues a
 * new Credit Guide version:
 *   1. Replace the PDF at public/finance/credit-guide-equipped-v17-202307.pdf
 *      (or add the new version alongside and update the public link).
 *   2. Update the constants in this file in the SAME commit.
 *   3. Bump EQUIPPED_CONSENT_VERSION in EquippedConsentForm.tsx.
 *
 * Data classification: PUBLIC. Safe to publish on the consumer site.
 *
 * NOT LEGAL ADVICE.
 */

import type { JSX } from 'react';

export type EquippedLicensingVariant = 'commercial' | 'contractor';

export interface EquippedLicensingBlockProps {
  /**
   * Visual variant. Both variants render identical licensing facts; the
   * variant only affects the single introductory sentence above the facts.
   * Defaults to 'commercial'.
   */
  variant?: EquippedLicensingVariant;
}

const INTRO: Record<EquippedLicensingVariant, string> = {
  commercial:
    'Equipped Commercial Finance is the trading name of SME Consulting Group Pty Ltd, acting as a Credit Representative of Straw Financial Services Pty Ltd for commercial-purpose credit.',
  contractor:
    'Contractor equipment finance referrals flow to Equipped Commercial Finance (SME Consulting Group Pty Ltd), which acts as a Credit Representative of Straw Financial Services Pty Ltd.',
};

export default function EquippedLicensingBlock({
  variant = 'commercial',
}: EquippedLicensingBlockProps): JSX.Element {
  return (
    <div className="space-y-4 text-sm text-slate-700">
      <p>{INTRO[variant]}</p>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-2">
        <dt className="font-semibold text-slate-900">Licensee</dt>
        <dd>
          Straw Financial Services Pty Ltd, Australian Credit Licence{' '}
          <span className="font-mono">504512</span>
        </dd>

        <dt className="font-semibold text-slate-900">Credit Representative</dt>
        <dd>
          SME Consulting Group Pty Ltd T/as Equipped Commercial Finance
          (ABN 53 662 478 408), Credit Representative{' '}
          <span className="font-mono">544113</span>
        </dd>

        <dt className="font-semibold text-slate-900">AFCA membership</dt>
        <dd>
          <span className="font-mono">#94533</span>
        </dd>

        <dt className="font-semibold text-slate-900">Contact</dt>
        <dd>
          <a
            href="tel:1300293747"
            className="text-blue-700 underline hover:text-blue-900"
          >
            1300 293 747
          </a>{' '}
          ·{' '}
          <a
            href="mailto:admin@equippedcf.com.au"
            className="text-blue-700 underline hover:text-blue-900"
          >
            admin@equippedcf.com.au
          </a>
        </dd>
      </dl>
      <p className="text-xs text-slate-500">
        Full details are in the{' '}
        <a
          href="/finance/credit-guide-equipped-v17-202307.pdf"
          className="underline hover:text-slate-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Credit Guide (V17, July 2023)
        </a>
        .
      </p>
    </div>
  );
}
