import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import OnlineClaimPage from './ClaimFormClient';
import { App3CollectionNotice } from '@/components/privacy/App3CollectionNotice';

export const metadata: Metadata = {
  title: 'Lodge a Claim | Disaster Recovery Australia',
  description:
    'Submit your property damage claim online 24/7. Matched with IICRC-certified restoration contractors across Australia. Make a claim in under 90 seconds.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/claim',
  },
  openGraph: {
    title: 'Lodge a Claim | Disaster Recovery Australia',
    description:
      'Submit your property damage claim online 24/7. Matched with IICRC-certified restoration contractors across Australia.',
    type: 'website',
  },
};

/**
 * Server-rendered fallback shown before the interactive claim form hydrates.
 * Ensures Google, crawlers, and non-JS users always see the headline, form fields,
 * and APP 3 collection notice. Progressive enhancement: the JS form overlays this
 * once the bundle loads.
 */
function ClaimPageSSRFallback() {
  return (
    <div className="min-h-screen bg-white">
      {/* Who First hero */}
      <section className="bg-slate-900 text-white py-14 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">
            Policyholder first, always
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Who First.{' '}
            <span className="text-blue-400">Make a claim in under 90 seconds.</span>
          </h1>
          <p className="text-slate-300 text-lg mb-6 leading-relaxed">
            Working for you, not your insurer. IICRC-certified contractors matched to your
            location — every step documented to insurance standard.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              Available 24/7
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              IICRC-certified contractors
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Insurance-standard documentation
            </span>
          </div>
        </div>
      </section>

      {/* Static form fallback — rendered server-side, replaced by dynamic form on hydration */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-2xl">

          {/* APP 3 Collection Notice — full statutory version, rendered on server */}
          <div className="mb-8">
            <App3CollectionNotice variant="full" />
          </div>

          {/* SSR form skeleton — functional without JS; enhanced by ClaimFormClient */}
          <noscript>
            <form
              action="/api/public/claims/submit-basic"
              method="post"
              className="space-y-5"
              aria-label="Property damage claim form"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Mobile number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-slate-700 mb-1">
                  Property postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  required
                  pattern="[0-9]{4}"
                  maxLength={4}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="damageType" className="block text-sm font-medium text-slate-700 mb-1">
                  Damage type
                </label>
                <select
                  id="damageType"
                  name="damageType"
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select damage type</option>
                  <option value="water">Water / Flood Damage</option>
                  <option value="fire">Fire / Smoke Damage</option>
                  <option value="mould">Mould Growth</option>
                  <option value="storm">Storm / Wind Damage</option>
                  <option value="sewage">Sewage Overflow</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                  Describe the damage
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors"
              >
                Submit Claim
              </button>
            </form>
          </noscript>

          {/* JS users see this loading skeleton while the dynamic form hydrates */}
          <div aria-hidden="true" className="space-y-4 animate-pulse">
            <div className="h-10 bg-slate-100 rounded-lg" />
            <div className="h-10 bg-slate-100 rounded-lg" />
            <div className="h-10 bg-slate-100 rounded-lg" />
            <div className="h-10 bg-slate-100 rounded-lg" />
            <div className="h-24 bg-slate-100 rounded-lg" />
            <div className="h-14 bg-red-100 rounded-lg" />
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Disaster Recovery Australia connects you with independent IICRC-certified contractors.{' '}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

export default function ClaimPage() {
  return (
    <Suspense fallback={<ClaimPageSSRFallback />}>
      <OnlineClaimPage />
    </Suspense>
  );
}
