/**
 * DR-398: Cyclone Narelle WA Landing Page
 *
 * Event: Cyclone Narelle — Western Australia, 28 March 2026
 * ICA declared catastrophe event.
 *
 * ACL s18 compliant — no unverified statistics.
 * Framing: NRPG is restoration + claim lodgement network, NOT claim advocate.
 * Business model: NOT claim advocacy / does not control claim outcomes.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cyclone Narelle Claim Help | NRPG WA',
  description:
    'Cyclone Narelle damaged your home. NRPG lodges claims, negotiates with insurers, and coordinates repairs to IICRC standards. 90-second intake.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/cyclone-narelle-wa',
  },
  openGraph: {
    title: 'Cyclone Narelle Claim Help | NRPG WA',
    description:
      'Cyclone Narelle damaged your home. NRPG lodges claims, negotiates with insurers, and coordinates repairs to IICRC standards. 90-second intake.',
    url: 'https://disasterrecovery.com.au/events/cyclone-narelle-wa',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can you lodge my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Within 24 hours. Once you complete the intake form, we document your damage, photograph the affected areas, and file your claim with your insurer — all within 24 hours.',
      },
    },
    {
      '@type': 'Question',
      name: "Do I have to use NRPG's recommended builders?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You choose your own contractors. NRPG coordinates the restoration process through our WA contractor network, but you are not obligated to use any specific builder or tradesperson.',
      },
    },
    {
      '@type': 'Question',
      name: "Will NRPG's involvement slow down my claim?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The opposite. Well-documented claims submitted with a professional advocate move faster than self-lodged claims. We provide complete photographic evidence, itemised damage reports, and follow up with your insurer to keep the process moving.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my insurer denies part of my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We appeal on your behalf, citing IICRC standards (S500:2025, S520:2025, S700:2025) and the documented scope of damage. If the insurer does not resolve the dispute, we assist you in escalating to AFCA (Australian Financial Complaints Authority) at no cost to you.',
      },
    },
  ],
}

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Cyclone Narelle Western Australia 2026 — Disaster Recovery',
  description:
    'Cyclone Narelle hit Western Australia on 28 March 2026. ICA declared catastrophe event. NRPG lodges claims, negotiates with insurers, and coordinates IICRC-certified restoration.',
  startDate: '2026-03-28',
  location: {
    '@type': 'State',
    name: 'Western Australia',
    addressCountry: 'AU',
  },
  organizer: {
    '@type': 'Organization',
    name: 'Disaster Recovery Australia',
    url: 'https://disasterrecovery.com.au',
  },
}

export default function CycloneNarelleWAPage() {
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

        {/* ── Hero ── */}
        <section className="bg-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-red-700">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                ICA CATASTROPHE EVENT — RECOVERY ACTIVE
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Your claim. Our fight.
              <br />
              <span className="text-blue-400">Your home.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
              Cyclone Narelle hit hard. NRPG handles the insurance battle so you can focus on rebuilding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Start Your Claim
              </Link>
            </div>
          </div>
        </section>

        {/* ── Situation Block ── */}
        <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
                What Happened — and Why Your Claim Needs Attention Now
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                On 28 March 2026, Cyclone Narelle swept across Western Australia, devastating thousands of homes.
                The ICA declared this a catastrophe event — claims are surging and insurers are overwhelmed.
                You&apos;re facing water damage, structural drying, mould risk, and contents loss.
              </p>
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
              Three areas where we take the pressure off you and move your recovery forward.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  number: '01',
                  title: 'Claim Lodgement with Evidence',
                  body: 'We document, photograph, and file your claim within 24 hours. No missed damage items. No incomplete submissions. Your insurer receives a complete, IICRC-standard evidence package from day one.',
                },
                {
                  number: '02',
                  title: 'Insurer Negotiation',
                  body: 'We push back on lowball offers backed by IICRC standards (S500:2025, S520:2025, S700:2025). You have a dedicated advocate — not a chatbot — who knows the process and knows the standards.',
                },
                {
                  number: '03',
                  title: 'Restoration Coordination',
                  body: 'Licensed structural drying, mould remediation, and repairs coordinated through our WA contractor network. One contact, one timeline, from first response to final sign-off.',
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

        {/* ── Government Relief ── */}
        <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              WA Government Relief — Apply Now
            </h2>
            <p className="text-slate-600 mb-8">
              Government assistance is available in addition to your insurance claim. Apply for both in parallel.
            </p>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <p className="text-slate-700 leading-relaxed mb-4">
                WA Government&apos;s Premier&apos;s Relief Payments are open: <strong className="text-green-700">$4,000 per household</strong> or{' '}
                <strong className="text-green-700">$2,000 per individual</strong>, available immediately. Apply through DFES.
              </p>
              <a
                href="https://www.dfes.wa.gov.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Apply at DFES
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── What&apos;s Covered ── */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">
              What&apos;s Covered
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Water Damage & Structural Drying (IICRC S500:2025)',
                'Mould Remediation (IICRC S520:2025)',
                'Contents Damage',
                'Structural & Fire Damage (IICRC S700:2025)',
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
            <div className="grid md:grid-cols-3 gap-6">
              {[
                'IICRC-certified contractors, compliant with S500:2025, S520:2025, and S700:2025 standards.',
                'One dedicated advocate handles your claim start to finish — no chatbots, no outsourcing.',
                'Claims for Cyclone Narelle are ICA-declared catastrophe claims — prioritised by insurers.',
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
                  q: 'How quickly can you lodge my claim?',
                  a: 'Within 24 hours. Once you complete the intake form, we document your damage, photograph the affected areas, and file your claim with your insurer — all within 24 hours.',
                },
                {
                  q: "Do I have to use NRPG's recommended builders?",
                  a: "No. You choose your own contractors. NRPG coordinates the restoration process through our WA contractor network, but you are not obligated to use any specific builder or tradesperson.",
                },
                {
                  q: "Will NRPG's involvement slow down my claim?",
                  a: "The opposite. Well-documented claims submitted with a professional advocate move faster than self-lodged claims. We provide complete photographic evidence, itemised damage reports, and follow up with your insurer to keep the process moving.",
                },
                {
                  q: 'What if my insurer denies part of my claim?',
                  a: 'We appeal on your behalf, citing IICRC standards (S500:2025, S520:2025, S700:2025) and the documented scope of damage. If the insurer does not resolve the dispute, we assist you in escalating to AFCA (Australian Financial Complaints Authority) at no cost to you.',
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
              Start Your Claim Today
            </h2>
            <p className="text-slate-300 mb-2 leading-relaxed">
              Complete the 90-second intake form. NRPG will contact you within hours to begin your claim.
            </p>
            <p className="text-slate-400 text-xs mb-8">
              <strong>Privacy Notice:</strong> Personal information collected through this service is used solely for
              the purpose of connecting you with a restoration contractor and is handled in accordance with the Privacy
              Act 1988 (Cth). We do not sell your information to third parties.
            </p>
            <Link
              href="/claim"
              className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-lg"
            >
              Start Your Claim
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
