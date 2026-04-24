/**
 * Offline shell — iOS App Store Phase 2 PR #4 (RA-1633).
 *
 * Life-safety offline fallback. Precached by the service worker and returned
 * as the offline fallback for any navigation when the network fails.
 *
 * Design constraints:
 *  - Zero external fetches at runtime: no remote fonts, images, or JS.
 *  - Server Component by default (static HTML). The only interactivity is
 *    the `tel:` links, which work without JavaScript.
 *  - Copy follows the DR-542 life-safety pattern on `/claim` — same 000
 *    button + 1300 309 361 fallback.
 *  - Inlines a short APP 3 collection notice (we cannot fetch the full
 *    component at runtime when offline).
 *  - Australian English only.
 */

import type { Metadata } from 'next';
import OfflineDial000Button from '@/components/offline/OfflineDial000Button';

export const metadata: Metadata = {
  title: 'Offline | Disaster Recovery Australia',
  description:
    'Offline life-safety shell. Call 000 in an emergency, or 1300 309 361 to speak to Disaster Recovery Australia.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://disasterrecovery.com.au/offline' },
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-xl">
        {/* Brand mark — inline SVG so it works with zero network */}
        <div className="text-center mb-6">
          <div
            aria-hidden="true"
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-9 h-9"
            >
              <path d="M1 6l4 4 4-4 4 4 4-4 4 4" />
              <path d="M1 12l4 4 4-4 4 4 4-4 4 4" />
            </svg>
          </div>
          <p className="mt-3 text-lg font-bold text-blue-900">
            Disaster Recovery Australia
          </p>
        </div>

        {/* Connection status — AU English, plain copy. Static text; no client
            state. If you want live reconnection copy, pair this shell with the
            service-worker online/offline listener on the controlling page. */}
        <div
          role="status"
          className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-center"
        >
          <p className="text-sm font-semibold text-amber-900">
            You appear to be offline.
          </p>
          <p className="mt-1 text-xs text-amber-900 leading-relaxed">
            Your safety comes first — call the numbers below if you are in
            danger. This page works without a connection.
          </p>
        </div>

        {/* DR-542 — Life-safety carve-out. Copy mirrors the /claim page
            verbatim so offline users see the same guidance. */}
        <div
          role="alert"
          className="mb-6 rounded-lg border-2 border-red-600 bg-red-50 p-4"
        >
          <p className="text-sm font-bold text-red-900 mb-2">
            In immediate life-safety danger?
          </p>
          <OfflineDial000Button />
          <p className="mt-2 text-xs text-red-900 leading-relaxed">
            Fire, rising floodwater, structural collapse, gas leak, injury,
            or exposed live wiring — call 000 first. You can lodge the claim
            once you are safe.
          </p>
        </div>

        {/* DR-542 — Prefer-to-call fallback. Same canonical number as /claim. */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-900 mb-1">
            Prefer to talk to a person?
          </p>
          <p className="text-xs text-blue-900 mb-3">
            Our 24/7 intake line will take your claim over the phone.
          </p>
          <a
            href="tel:1300309361"
            className="inline-flex items-center justify-center min-h-[48px] w-full px-5 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Call Disaster Recovery on 1300 309 361"
          >
            Call 1300 309 361
          </a>
        </div>

        {/* APP 3 short-form notice — inlined because the full component
            cannot be fetched at runtime when offline. Keeps the statutory
            minimums and points to /privacy once connectivity returns. */}
        <section
          aria-label="Collection notice"
          className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 leading-relaxed"
        >
          <p className="font-semibold text-slate-900 mb-1">
            How we handle your information
          </p>
          <p>
            National Restoration Professionals Group Pty Ltd (ABN 85 151 794
            142), trading as Disaster Recovery Australia, collects personal
            information only to triage your claim, dispatch an
            IICRC-certified contractor, and meet our legal obligations.
          </p>
          <p className="mt-2">
            We collect under the Privacy Act 1988 (Cth) and the Australian
            Privacy Principles. You may access, correct, or complain about
            the handling of your information at any time — see our Privacy
            Policy once you are back online.
          </p>
          <p className="mt-2 text-slate-500">
            Not legal advice.
          </p>
        </section>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-slate-400">
          This page is stored on your device so it works without a connection.
        </p>
      </div>
    </main>
  );
}
