/**
 * DR-399 / DR-552 (Lane B): Queensland Floods 2026 Landing Page
 *
 * Flood events: Ex-TC Alfred, Tropical Low 29U (March 2026), and related rainfall events.
 * Primary impact areas: Bundaberg, Burnett River catchment, North Burnett.
 *
 * CRITICAL: General ESHA closed 7 April 2026 — DO NOT render general ESHA.
 * Only Extended ESHA (Exceptional Circumstances) is shown.
 *
 * Extended ESHA deadline: 27 April 2026
 * Personal Hardship Assistance deadline: 27 April 2026
 * Structural Assistance Grants deadline: 27 April 2026
 *
 * ICA trust signal: 2,000+ flood-specific claims (March 2026 events).
 * ACL s29(1)(g)/(m) compliant — no unverified superlatives.
 * Framing: NRPG is restoration + claim lodgement network, NOT claim advocate.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { App3CollectionNotice } from '@/components/privacy/App3CollectionNotice'
import { DeadlineBand } from '@/components/DeadlineBand'

export const metadata: Metadata = {
  title: 'Queensland Floods 2026 — Bundaberg, Burnett River & Tropical Low 29U Recovery | Disaster Recovery Australia',
  description:
    'Government assistance programs available. Check page for current deadlines. Queensland Floods 2026 — Tropical Low 29U, Bundaberg, Burnett River catchment. 2,000+ ICA claims. IICRC-certified restoration contractors. Lodge your claim now.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/queensland-floods-2026',
  },
  openGraph: {
    title: 'QLD Floods 2026 — Bundaberg & Burnett River Recovery | Disaster Recovery Australia',
    description:
      'Queensland Floods 2026 (Tropical Low 29U). Bundaberg and Burnett River catchment most affected. Government assistance programs available — check page for current deadlines. NRPG IICRC-certified contractors ready now.',
    url: 'https://disasterrecovery.com.au/events/queensland-floods-2026',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it too late to claim after the flood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no time limit on lodging an insurance claim. Government relief programs have a closing date — check current deadline status on the page and lodge promptly. Your insurance claim can be lodged at any time.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my insurer is slow to respond?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG coordinates IICRC-certified restoration contractors and provides independent damage documentation to support your claim. If your insurer is slow, AFCA (Australian Financial Complaints Authority) can investigate delays at no cost to you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to wait for an insurance assessor before government relief?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Lodge both in parallel. Government relief applications (Extended ESHA, Personal Hardship, Structural Grants) are independent of your insurance claim. You do not need to wait for your insurer before applying.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the difference between government relief and insurance claim?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Government relief provides immediate grants for hardship and structural damage. Insurance claims cover the full cost of damage to your property and contents. They are separate processes and can be lodged simultaneously. NRPG provides independent damage documentation to support both processes.',
      },
    },
    {
      '@type': 'Question',
      name: "Can NRPG help if I've already lodged a claim?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Even after you've lodged a claim yourself, NRPG can take over management of the claim — tracking assessments, negotiating offers, and coordinating restoration. Contact us with your existing claim reference.",
      },
    },
  ],
}

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Queensland Floods 2026 (Tropical Low 29U) — Disaster Recovery',
  description:
    'Queensland Floods 2026 — Tropical Low 29U and related March 2026 events. Bundaberg and Burnett River catchment. Extended ESHA, Personal Hardship Assistance, and Structural Grants available — check page for current deadline status. NRPG IICRC-certified restoration and claims support.',
  startDate: '2026-03-01',
  location: {
    '@type': 'State',
    name: 'Queensland',
    addressCountry: 'AU',
  },
  organizer: {
    '@type': 'Organization',
    name: 'Disaster Recovery Australia',
    url: 'https://disasterrecovery.com.au',
  },
}

export default function QueenslandFloods2026Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">

        {/* ── 000 Emergency Warning ── */}
        <div className="bg-red-700 text-white py-3 px-4 text-center" role="alert">
          <p className="text-sm font-bold">
            If you are in immediate danger, call{' '}
            <a href="tel:000" className="underline font-black">
              000
            </a>
            .
          </p>
        </div>

        {/* ── Deadline Urgency Banner ── */}
        <div className="bg-amber-50 border-b border-amber-400">
          <div className="container mx-auto px-6 max-w-5xl py-4">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0" role="img" aria-label="Warning">⏰</span>
              <p className="text-amber-900 font-semibold text-sm md:text-base">
                Government assistance programs — Extended ESHA, Personal Hardship,
                and Structural Grants. Check current deadline status below.
              </p>
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="bg-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-blue-700">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                RECOVERY ACTIVE
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Queensland Floods 2026
              <br />
              <span className="text-blue-400">Work for you, not your insurer.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-2 leading-relaxed">
              Tropical Low 29U and related March 2026 flood events impacted Bundaberg, the Burnett River catchment, and surrounding LGAs across Queensland.
            </p>
            <p className="text-base text-slate-400 max-w-2xl mb-8">
              Government assistance programs available — check current status below. NRPG coordinates IICRC-certified restoration and supports your claim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Lodge Your Claim Now
              </Link>
            </div>
          </div>
        </section>

        {/* ── Deadline Alert Cards (prominent) ── */}
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <DeadlineBand programKey="qld-floods-2026-extended-esha" />
            <DeadlineBand programKey="qld-floods-2026-personal-hardship" />
            <DeadlineBand programKey="qld-floods-2026-structural-assistance" />
          </div>
        </section>

        {/* ── Government Relief Cards ── */}
        <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              Government Relief Programs
            </h2>
            <p className="text-slate-600 mb-3">
              Three programs may be available. Apply for each you are eligible for.
            </p>
            <p className="text-slate-600 text-sm mb-6">
              58 Local Government Areas are declared under the Disaster Recovery Funding Arrangements (DRFA). For
              the full list of eligible LGAs, visit{' '}
              <a
                href="https://www.qra.qld.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-700 hover:text-blue-900 font-medium"
              >
                qra.qld.gov.au
              </a>{' '}
              or call the Queensland Reconstruction Authority on{' '}
              <a href="tel:1800173349" className="underline text-blue-700 hover:text-blue-900 font-medium">
                1800 173 349
              </a>
              .
            </p>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Card A: Extended ESHA */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-1 rounded">
                    Exceptional Circumstances
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">
                  Extended ESHA
                </h3>
                <p className="text-green-700 font-bold text-xl mb-3">Up to $5,000</p>
                <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                  Extended Household and Structural Assistance under Exceptional Circumstances — covers temporary
                  accommodation, essential household items, meals, transport, medical prescriptions, and childcare
                  for eligible residents in the 10 declared LGAs.
                </p>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Eligible LGAs (10)
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Banana',
                      'Barcaldine',
                      'Bundaberg',
                      'Carpentaria',
                      'Doomadgee',
                      'Douglas',
                      'Flinders',
                      'Gladstone',
                      'North Burnett',
                      'Western Downs',
                    ].map((lga) => (
                      <span key={lga} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {lga}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto">
                  <a
                    href="https://www.disaster.qld.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Check LGA Eligibility &amp; Apply
                  </a>
                </div>
              </div>

              {/* Card B: Personal Hardship */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-1 rounded">
                    No Asset Testing
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">
                  Personal Hardship Assistance
                </h3>
                <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                  Financial assistance for individuals and families experiencing personal hardship as a direct
                  result of the Queensland Floods. No asset testing applies. Can be combined with other relief
                  programs. Apply via{' '}
                  <a
                    href="https://www.disaster.qld.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-purple-700 hover:text-purple-900"
                  >
                    disaster.qld.gov.au
                  </a>{' '}
                  or call the QRA on{' '}
                  <a href="tel:1800173349" className="underline text-purple-700 hover:text-purple-900">
                    1800 173 349
                  </a>
                  . [Source: disaster.qld.gov.au]
                </p>
                <div className="mt-auto">
                  <a
                    href="https://www.disaster.qld.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Apply for Hardship Assistance
                  </a>
                </div>
              </div>

              {/* Card C: Structural Assistance Grants */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded">
                    Primary Residence Only
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">
                  Structural Assistance Grants
                </h3>
                <p className="text-green-700 font-bold text-xl mb-3">Up to $80,000</p>
                <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                  Covers structural damage, electrical and plumbing repairs, drying and mould remediation, and
                  professional assessment reports. Eligible works must exceed $5,000. Primary residence only.
                  [Source:{' '}
                  <a
                    href="https://www.disaster.qld.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-green-800 hover:text-green-950"
                  >
                    disaster.qld.gov.au
                  </a>
                  ]
                </p>
                <div className="mt-auto">
                  <a
                    href="https://www.disaster.qld.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Apply for Structural Grants
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── What NRPG Does ── */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              What NRPG Does for You
            </h2>
            <p className="text-slate-600 mb-10">
              From claim lodgement to final repairs — one contact, one timeline.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  number: '01',
                  title: 'Lodge in 90 Seconds',
                  body: 'Lodge your claim in under 90 seconds on mobile. We capture evidence and submit to your insurer immediately.',
                },
                {
                  number: '02',
                  title: 'Independent Documentation',
                  body: 'NRPG provides certified independent damage assessments and restoration documentation that supports your claim position with your insurer or AFCA.',
                },
                {
                  number: '03',
                  title: 'Full Restoration',
                  body: 'From drying and mould remediation (IICRC S500:2025/S520:2025 standards) to final rebuild — one contact, one timeline.',
                },
              ].map(({ number, title, body }) => (
                <div key={number} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="text-4xl font-black text-blue-100 mb-3 font-display">{number}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What&apos;s Covered ── */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">
              What&apos;s Covered
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Water Damage & Drying',
                'Mould Remediation (IICRC S520:2025)',
                'Structural Repair',
                'Contents & Personal Items',
                'Professional Assessment & Reports',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg px-5 py-4">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust Signals ── */}
        <section className="py-12 bg-blue-900 text-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-display text-2xl font-bold text-white mb-8">
              Why NRPG
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Tropical Low 29U and related March 2026 flood events generated 2,000+ ICA claims across Queensland, with Bundaberg and the Burnett River catchment among the most impacted areas [Insurance Council of Australia].',
                'NRPG restoration partners are IICRC-certified and comply with S500:2025 (Water Damage Restoration) and S520:2025 (Mould Remediation) standards.',
              ].map((signal, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-blue-100 text-sm leading-relaxed">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-5">
              {[
                {
                  q: 'Is it too late to claim after the flood?',
                  a: 'There is no time limit on lodging an insurance claim. Government relief programs have a closing date — check current deadline status on this page and lodge your government assistance applications promptly. Your insurance claim can be lodged at any time.',
                },
                {
                  q: 'What if my insurer is slow to respond?',
                  a: 'NRPG coordinates IICRC-certified restoration contractors and provides independent damage documentation to support your claim. If your insurer is slow, AFCA (Australian Financial Complaints Authority) can investigate delays at no cost to you.',
                },
                {
                  q: 'Do I need to wait for an insurance assessor before government relief?',
                  a: 'No. Lodge both in parallel. Government relief applications (Extended ESHA, Personal Hardship, Structural Grants) are independent of your insurance claim. You do not need to wait for your insurer before applying.',
                },
                {
                  q: "What's the difference between government relief and insurance claim?",
                  a: 'Government relief provides immediate grants for hardship and structural damage. Insurance claims cover the full cost of damage to your property and contents. They are separate processes and can be lodged simultaneously. NRPG provides independent damage documentation to support both processes.',
                },
                {
                  q: "Can NRPG help if I've already lodged a claim?",
                  a: "Yes. Even after you've lodged a claim yourself, NRPG can take over management of the claim — tracking assessments, negotiating offers, and coordinating restoration. Contact us with your existing claim reference.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="bg-white border border-slate-200 rounded-xl p-6">
                  <dt className="font-bold text-slate-900 mb-2">{q}</dt>
                  <dd className="text-slate-600 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-3">
              Act Now on Government Relief
            </h2>
            <p className="text-slate-300 mb-2 leading-relaxed">
              Government relief programs have deadlines. Lodge your claim now — it takes 90 seconds on mobile.
            </p>
            <div className="mb-8 text-left">
              <App3CollectionNotice />
            </div>
            <Link
              href="/claim"
              className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-lg"
            >
              Lodge Your Claim Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}
