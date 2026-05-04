import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { NAP } from '@/lib/constants';
import { App3CollectionNotice } from '@/components/privacy/App3CollectionNotice';

/**
 * DR-774 — November 2025 East Coast Storms (closes GAP-116).
 *
 * Costliest single-event 2025 storm: A$1.78 billion insured losses,
 * ~93,000 claims (PERILS, Q1 2026 estimate). Overtakes Cyclone Alfred
 * in 2025 calendar-year insured-loss rankings.
 *
 * ACL safety: PERILS source citation inline + footnote (s18 substantiation
 * pattern from GAP-027/034/040). No "Australia's costliest ever" superlatives;
 * scope to "costliest single 2025 event" with PERILS attribution.
 *
 * COPY-REVIEW REQUIRED before merge to main:
 *   - Marketing: "Who First" voice
 *   - Legal: PERILS citation accuracy + ACL s18 substantiation
 */

export const metadata: Metadata = {
  title:
    'November 2025 East Coast Storms — A$1.78B Insured Loss | Claim Support',
  description:
    'November 2025 QLD/NSW storm cluster — A$1.78 billion insured losses, ~93,000 claims (PERILS Q1 2026). Costliest single 2025 storm event in Australia. IICRC-certified restoration support for late, disputed, and supplementary claims.',
  keywords:
    'November 2025 storms, east coast storms 2025, NSW storms November 2025, Queensland storms 2025, PERILS A$1.78 billion, supplementary claim 2025 storms',
  openGraph: {
    title: 'November 2025 East Coast Storms — A$1.78B Insured Loss',
    description:
      'November 2025 QLD/NSW storm cluster: A$1.78B insured losses, ~93,000 claims per PERILS. IICRC-certified contractors supporting late and disputed claims.',
    type: 'website',
    url: `${NAP.url}/events/november-2025-storms`,
  },
  alternates: {
    canonical: `${NAP.url}/events/november-2025-storms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'November 2025 East Coast Storms',
  description:
    'Severe storm cluster across Queensland and New South Wales in November 2025, producing A$1.78 billion insured losses (PERILS Q1 2026 estimate) and ~93,000 claims.',
  startDate: '2025-11-01',
  endDate: '2025-11-30',
  location: {
    '@type': 'State',
    name: 'Queensland and New South Wales, Australia',
    addressCountry: 'AU',
  },
  organizer: {
    '@type': 'Organization',
    name: NAP.name,
    url: NAP.url,
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/events/november-2025-storms/#professionalservice`,
  name: `${NAP.name} — November 2025 East Coast Storms Recovery`,
  url: `${NAP.url}/events/november-2025-storms`,
  description:
    'IICRC-certified storm damage restoration and insurance claim support for the November 2025 east-coast storm cluster across Queensland and New South Wales.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: [
    { '@type': 'State', name: 'Queensland', addressCountry: 'AU' },
    { '@type': 'State', name: 'New South Wales', addressCountry: 'AU' },
  ],
};

export default function November2025StormsPage() {
  return (
    <>
      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <Script
        id="professional-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="container mx-auto max-w-4xl px-6 py-16 lg:py-24">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
            November 2025 East Coast Storms
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-10">
            QLD and NSW storm cluster — costliest single 2025 storm event in Australia.
            PERILS Q1 2026 industry-loss estimate:{' '}
            <strong>A$1.78 billion insured loss</strong> across approximately 93,000 claims.
            <sup>
              <a href="#footnote-perils" className="ml-1 text-blue-600">[1]</a>
            </sup>
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="rounded-md border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500 mb-1">Insured loss</div>
              <div className="text-2xl font-bold text-slate-900">A$1.78B</div>
              <div className="text-xs text-slate-500 mt-1">PERILS Q1 2026</div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500 mb-1">Claims (approx.)</div>
              <div className="text-2xl font-bold text-slate-900">~93,000</div>
              <div className="text-xs text-slate-500 mt-1">ICA / PERILS aggregate</div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-4">
              <div className="text-sm text-slate-500 mb-1">States affected</div>
              <div className="text-2xl font-bold text-slate-900">QLD &middot; NSW</div>
              <div className="text-xs text-slate-500 mt-1">Costliest 2025 storm</div>
            </div>
          </div>

          <div className="prose max-w-none text-slate-700 mb-10">
            <h2>Late and disputed claim support</h2>
            <p>
              Many policyholders affected by the November 2025 storms are still working
              through delayed assessments, supplementary scope, and disputed line items.
              Our IICRC-certified contractor network produces site documentation that
              supports policyholders during disputed and supplementary claims, working under
              the General Insurance Code of Practice.
            </p>

            <h2>What we cover</h2>
            <ul>
              <li>Wind damage to roof, eaves, and structural elements (IICRC S700:2025)</li>
              <li>Water ingress and category 1-3 water damage (IICRC S500:2025)</li>
              <li>Mould remediation post-water (IICRC S520:2025)</li>
              <li>Contents restoration and pack-out (IICRC S540)</li>
              <li>Trauma cleaning where applicable</li>
            </ul>

            <h2>If your claim was settled but your home still has damage</h2>
            <p>
              You may have grounds for a supplementary claim. Lodge a free site assessment;
              we will document the current condition and provide an IICRC-certified scope
              you can present to your insurer or AFCA.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/claim"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
              aria-label="Lodge a claim — free assessment"
            >
              Lodge a free assessment
            </Link>
            <Link
              href="/why-human-advocacy"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-slate-900 font-semibold hover:bg-slate-50 transition"
              aria-label="Why human advocacy"
            >
              Why human advocacy
            </Link>
          </div>

          <div id="footnote-perils" className="mt-16 border-t border-slate-200 pt-6 text-sm text-slate-600">
            <p>
              <strong>[1]</strong> Source: PERILS AG, Q1 2026 industry-loss estimate for the
              November 2025 east-coast storm cluster (A$1.78 billion insured loss across
              approximately 93,000 claims). Estimate revised periodically; consult{' '}
              <a
                href="https://www.perils.org/news"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                perils.org/news
              </a>{' '}
              for the latest issued figure.
            </p>
          </div>

          <div className="mt-8">
            <App3CollectionNotice />
          </div>
        </section>
      </main>
    </>
  );
}
