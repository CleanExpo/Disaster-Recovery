/**
 * App3CollectionNotice — Canonical APP 3 / APP 5 collection notice.
 *
 * Server Component (no 'use client') — renders on the server, included in SSR payload.
 * Meets all Privacy Act 1988 (Cth) APP 3 and APP 5 statutory requirements:
 *   - Entity identity + contact
 *   - Purpose of collection (enumerated)
 *   - Third-party disclosure
 *   - Consequences of non-provision
 *   - Cross-border disclosure
 *   - Access and correction rights
 *   - Complaints procedure (internal + OAIC)
 *   - Privacy Policy link
 *
 * Variants:
 *   compact (default) — one-paragraph inline notice for use adjacent to CTAs
 *   full              — all statutory elements; use on /claim and key intake forms
 *
 * Usage:
 *   <App3CollectionNotice />           // compact
 *   <App3CollectionNotice variant="full" />  // full statutory notice
 *
 * Note: This is the DRAFT template generated under DR-641 (GAP-065).
 * Legal counsel review is required before operational reliance.
 * ABN 85 151 794 142 is the ABN for the consumer-facing DR platform entity
 * (National Restoration Professionals Group Pty Ltd, trading as Disaster Recovery).
 */

import Link from 'next/link';

interface App3CollectionNoticeProps {
  variant?: 'compact' | 'full';
  className?: string;
}

const ENTITY = 'National Restoration Professionals Group Pty Ltd (ABN 85 151 794 142)';
const TRADING_AS = 'Disaster Recovery';

export function App3CollectionNotice({
  variant = 'compact',
  className,
}: App3CollectionNoticeProps) {
  if (variant === 'compact') {
    return (
      <div
        className={
          className ??
          'rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-900 leading-relaxed'
        }
      >
        <p>
          <strong>Privacy notice:</strong> {ENTITY}, trading as <strong>{TRADING_AS}</strong>,
          collects your name, contact details, and property information when you lodge a claim to
          match you with a certified IICRC restoration contractor. Personal information is disclosed
          to the assigned contractor and processed under the <em>Privacy Act 1988</em> (Cth). It is
          not sold or shared for marketing purposes.{' '}
          <Link href="/privacy" className="underline font-medium">
            Privacy Policy
          </Link>
          . Complaints may be lodged with the OAIC at{' '}
          <a
            href="https://www.oaic.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            oaic.gov.au
          </a>
          .
        </p>
      </div>
    );
  }

  // Full statutory notice
  return (
    <div
      className={
        className ??
        'rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900 space-y-3 leading-relaxed'
      }
      role="region"
      aria-label="Privacy collection notice"
    >
      <h3 className="font-semibold text-base">Privacy — Collection Notice (APP 3 / APP 5)</h3>

      <p>
        <strong>{ENTITY}</strong>, trading as <strong>{TRADING_AS}</strong> (the{' '}
        <strong>APP entity</strong>), is collecting your personal information on this form.
      </p>

      <div>
        <p className="font-medium mb-1">Purpose of collection</p>
        <p>
          Personal information is collected to: (a) match your restoration claim with a certified
          IICRC contractor in the Disaster Recovery network; (b) allow that contractor to contact
          you, inspect your property, and perform restoration work; (c) enable the contractor to
          liaise with your insurer and produce insurance-standard documentation on your behalf; and
          (d) facilitate platform administration, invoicing, and dispute resolution.
        </p>
      </div>

      <div>
        <p className="font-medium mb-1">Information collected</p>
        <p>
          Name, contact details (phone and email), property address and postcode, damage type and
          description, insurance provider name and policy number (if provided), and payment card
          details (processed by Stripe — not stored by Disaster Recovery Australia).
        </p>
      </div>

      <div>
        <p className="font-medium mb-1">Disclosure to third parties</p>
        <p>
          Personal information may be disclosed to: (a) the IICRC-certified restoration contractor
          assigned to your claim; (b) your insurer, where you instruct or authorise that disclosure;
          (c) cloud infrastructure and platform service providers who process data on our behalf
          under confidentiality obligations; and (d) regulatory and law enforcement bodies where
          required by law.
        </p>
      </div>

      <div>
        <p className="font-medium mb-1">Cross-border disclosure</p>
        <p>
          Platform infrastructure services may be located outside Australia. Where personal
          information is disclosed to overseas recipients, Disaster Recovery Australia takes
          reasonable steps to ensure those recipients comply with the Australian Privacy Principles.
        </p>
      </div>

      <div>
        <p className="font-medium mb-1">Consequences of not providing information</p>
        <p>
          Providing the requested personal information is voluntary. Without it, Disaster Recovery
          Australia cannot match your claim with a contractor or facilitate restoration services.
        </p>
      </div>

      <div>
        <p className="font-medium mb-1">Access and correction</p>
        <p>
          You have the right to access and correct personal information held about you. Submit
          requests via our{' '}
          <Link href="/contact" className="underline font-medium">
            contact form
          </Link>
          . The full{' '}
          <Link href="/privacy" className="underline font-medium">
            Privacy Policy
          </Link>{' '}
          is available at disasterrecovery.com.au/privacy.
        </p>
      </div>

      <div>
        <p className="font-medium mb-1">Privacy complaints</p>
        <p>
          Privacy complaints should be directed to Disaster Recovery in the first instance via our{' '}
          <Link href="/contact" className="underline font-medium">
            contact form
          </Link>
          . If not resolved to your satisfaction, you may contact the Office of the Australian
          Information Commissioner (OAIC) at{' '}
          <a
            href="https://www.oaic.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            oaic.gov.au
          </a>{' '}
          or on <strong>1300 363 992</strong>.
        </p>
      </div>
    </div>
  );
}
