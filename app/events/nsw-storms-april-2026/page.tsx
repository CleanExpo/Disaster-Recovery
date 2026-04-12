/**
 * DR-533 / DR-551 / GAP-089: NSW/QLD Storms April 2026 — ICA Significant Event
 *
 * ICA declared Significant Event: 10 April 2026
 * Event period: NSW/QLD storms 3–8 April 2026
 * Primary impact: Hawkesbury-Nepean and Illawarra (NSW)
 *
 * ICA figures (per ICA Current Catastrophes, 10 April 2026 declaration):
 *   - $176M insured losses
 *   - 14,781 claims lodged
 *
 * ACL s29(1)(g)/(m) compliant — zero superlatives not verbatim-sourced.
 * No platform guarantee language pending GAP-061.
 * APP 3 collection notice on all intake CTAs.
 * Framing: NRPG coordinates restoration and claim documentation — not a claim advocate.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'NSW/QLD Storms April 2026 — ICA Significant Event | Claim Support | NRPG',
  description:
    'ICA Significant Event declared 10 April 2026. NSW/QLD storms 3–8 April. Hawkesbury-Nepean and Illawarra impact zones. $176M insured losses. 14,781 claims. Lodge your storm damage claim now.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/nsw-storms-april-2026',
  },
  openGraph: {
    title: 'NSW/QLD Storms April 2026 — ICA Significant Event | Claim Support',
    description:
      'ICA declared Significant Event 10 April 2026. NSW/QLD storms 3–8 April. $176M insured losses, 14,781 claims. Lodge your storm damage claim with NRPG now.',
    url: 'https://disasterrecovery.com.au/events/nsw-storms-april-2026',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does the ICA Significant Event declaration mean for my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An ICA Significant Event declaration activates industry-wide coordinated catastrophe response. It does not create a separate claims process — your claim is still lodged directly with your insurer. However, it means your insurer is required to prioritise catastrophe claims under the General Insurance Code of Practice. AFCA (Australian Financial Complaints Authority) can investigate delays at no cost to you if your insurer is slow to respond.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do in the first 7 days after storm damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the first 7 days: (1) Photograph all damage before any cleanup — date-stamped photos are your primary evidence. (2) Make safe emergency repairs only (tarpaulins, boarding windows) — keep all receipts. (3) Do not commence permanent repairs until your insurer has assessed or authorised works. (4) Lodge your insurance claim as soon as possible — catastrophe claim volumes are high and earlier lodgement secures earlier assessment. (5) Contact NRPG for an independent damage assessment to support your claim position.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the Hawkesbury-Nepean and Illawarra areas covered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Hawkesbury-Nepean and Illawarra regions are the primary impact zones declared under the ICA Significant Event for NSW/QLD storms 3–8 April 2026. NRPG\'s contractor network operates across these regions. Lodge your claim and an IICRC-certified restoration contractor will be matched to your property.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my insurer delays or disputes my storm claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the General Insurance Code of Practice, your insurer must acknowledge your claim within 10 business days and complete assessment within 12 months. If your insurer delays unreasonably, you can escalate to AFCA (afca.org.au) at no cost. NRPG provides independent damage documentation — IICRC-certified assessment reports — that supports your claim position with your insurer or at AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG help if I have already lodged a claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Even if you have already lodged your claim, NRPG can coordinate the restoration work independently — IICRC-certified drying, mould remediation, and structural repairs. NRPG also provides independent damage assessments that can be submitted to your insurer as supplementary documentation. Contact NRPG with your existing claim reference.',
      },
    },
  ],
}

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'NSW/QLD Storms April 2026 — ICA Significant Event',
  description:
    'ICA Significant Event declared 10 April 2026 for NSW/QLD storms 3–8 April 2026. Primary impact: Hawkesbury-Nepean and Illawarra (NSW). $176M insured losses, 14,781 claims lodged (ICA).',
  startDate: '2026-04-03',
  endDate: '2026-04-08',
  location: [
    {
      '@type': 'State',
      name: 'New South Wales',
      addressCountry: 'AU',
    },
    {
      '@type': 'State',
      name: 'Queensland',
      addressCountry: 'AU',
    },
  ],
  organizer: {
    '@type': 'Organization',
    name: 'Disaster Recovery Australia',
    url: 'https://disasterrecovery.com.au',
  },
}

export default function NSWStormsApril2026Page() {
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

        {/* ── ICA Declaration Banner ── */}
        <div className="bg-blue-900 text-white">
          <div className="container mx-auto px-6 max-w-5xl py-3">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-blue-600 border border-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                ICA SIGNIFICANT EVENT
              </span>
              <p className="text-blue-100 text-sm">
                NSW/QLD storms 3–8 April 2026. Declared by Insurance Council of Australia: 10 April 2026.
              </p>
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="bg-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-red-700">
                RESPONSE ACTIVE — HAWKESBURY-NEPEAN &amp; ILLAWARRA
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              ICA Significant Event declared 10 April —{' '}
              <span className="text-blue-400">NRPG advocates for your claim.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-2 leading-relaxed">
              NSW/QLD storms 3–8 April 2026. Primary impact: Hawkesbury-Nepean and Illawarra.
              $176 million in insured losses. 14,781 claims lodged.
            </p>
            <p className="text-slate-400 text-sm mb-8">
              Source: Insurance Council of Australia, Significant Events register, 10 April 2026.
            </p>

            {/* Three-step CTA — Who First */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 max-w-2xl">
              <p className="text-blue-300 font-bold text-sm uppercase tracking-wider mb-4">
                Three steps — lodge your claim today
              </p>
              <ol className="space-y-3">
                {[
                  { step: '1', label: 'Document your damage', detail: 'Photograph all damage before cleanup. Date-stamped photos are your primary evidence.' },
                  { step: '2', label: 'Lodge your claim', detail: 'Submit in under 90 seconds on mobile. NRPG captures your evidence and submits to your insurer.' },
                  { step: '3', label: 'NRPG coordinates your restoration', detail: 'IICRC-certified contractors attend, assess, and begin restoration. One contact, one timeline.' },
                ].map(({ step, label, detail }) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-black flex items-center justify-center mt-0.5">
                      {step}
                    </span>
                    <div>
                      <span className="text-white font-semibold">{label}</span>
                      <span className="text-slate-400 text-sm"> — {detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Lodge Your Storm Claim Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors text-lg"
              >
                Speak to a Specialist
              </Link>
            </div>
            <p className="text-slate-500 text-xs mt-4 max-w-2xl">
              <strong className="text-slate-400">Privacy Notice (APP 3):</strong> Personal information collected
              through this service is used solely to connect you with an IICRC-certified restoration contractor
              and is handled in accordance with the Privacy Act 1988 (Cth). NRPG does not sell personal
              information to third parties.
            </p>
          </div>
        </section>

        {/* ── ICA Data Card ── */}
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                ICA Significant Event Data — NSW/QLD storms 3–8 April 2026
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '$176M', label: 'Insured losses' },
                  { value: '14,781', label: 'Claims lodged' },
                  { value: '2', label: 'States affected (NSW/QLD)' },
                  { value: '10 Apr', label: 'Declaration date' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="text-2xl font-black text-slate-900 mb-1">{value}</div>
                    <div className="text-xs text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-3">
                Source: Insurance Council of Australia — Current Catastrophes, Significant Events register.
                insurancecouncil.com.au
              </p>
            </div>
          </div>
        </section>

        {/* ── First 7 Days Checklist ── */}
        <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              First 7 Days After Storm Damage
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl">
              Steps to protect your claim and your property in the critical first week.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  day: 'Immediately',
                  title: 'Document before cleanup',
                  body: 'Photograph all visible damage — roof, walls, ceilings, contents, structural elements — before any removal or cleanup. Date-stamped photos and video are your primary claim evidence.',
                  urgent: true,
                },
                {
                  day: 'Day 1–2',
                  title: 'Emergency safe repairs only',
                  body: 'Tarpaulins, boarding, pumping — make safe repairs to prevent further damage. Keep all receipts. Do NOT commence permanent repairs until your insurer has assessed or authorised works in writing.',
                  urgent: false,
                },
                {
                  day: 'Day 1–3',
                  title: 'Lodge your insurance claim',
                  body: 'Lodge with your insurer as soon as possible. Catastrophe claim volumes are high — earlier lodgement secures earlier assessment. NRPG can lodge on your behalf and track assessor attendance.',
                  urgent: false,
                },
                {
                  day: 'Day 2–5',
                  title: 'Independent damage assessment',
                  body: 'NRPG\'s IICRC-certified contractors attend, assess, and produce an independent assessment report. This documentation supports your claim position with your insurer and, if needed, at AFCA.',
                  urgent: false,
                },
                {
                  day: 'Day 3–7',
                  title: 'Begin approved drying and remediation',
                  body: 'Once insurers authorise works, NRPG commences IICRC S500:2025-compliant drying and mould prevention immediately. Delays in drying increase mould risk and claim complexity.',
                  urgent: false,
                },
                {
                  day: 'If delayed',
                  title: 'AFCA escalation pathway',
                  body: 'Under the General Insurance Code of Practice, insurers must acknowledge claims within 10 business days. If your insurer is slow, escalate to AFCA (afca.org.au) at no cost. NRPG\'s independent documentation supports your AFCA submission.',
                  urgent: false,
                },
              ].map(({ day, title, body, urgent }) => (
                <div
                  key={title}
                  className={`bg-white border rounded-xl p-5 shadow-sm ${urgent ? 'border-red-300 ring-1 ring-red-200' : 'border-slate-200'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${urgent ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                      {day}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AFCA Escalation ── */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-black text-lg">
                  ?
                </div>
                <div>
                  <h2 className="font-bold text-amber-900 text-lg mb-2">
                    If your insurer is slow or disputes your claim
                  </h2>
                  <p className="text-amber-800 text-sm leading-relaxed mb-3">
                    The Australian Financial Complaints Authority (AFCA) investigates insurance disputes at no
                    cost to you. Under the General Insurance Code of Practice, your insurer must acknowledge
                    your claim within 10 business days and must keep you informed of progress. If they fail to
                    do so, AFCA can intervene.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.afca.org.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Lodge an AFCA Complaint
                    </a>
                    <a
                      href="https://www.codeofpractice.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-white border border-amber-400 hover:bg-amber-50 text-amber-900 text-sm font-semibold rounded-lg transition-colors"
                    >
                      General Insurance Code of Practice
                    </a>
                  </div>
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
              From claim lodgement to completed repairs — one contact, one timeline.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  number: '01',
                  title: 'Lodge in 90 Seconds',
                  body: 'Lodge your claim in under 90 seconds on mobile. NRPG captures your evidence and submits to your insurer immediately.',
                },
                {
                  number: '02',
                  title: 'Independent Documentation',
                  body: 'NRPG provides IICRC-certified independent damage assessments that support your claim position with your insurer or at AFCA.',
                },
                {
                  number: '03',
                  title: 'Full Restoration',
                  body: 'Storm damage, water ingress, mould remediation (IICRC S500:2025/S520:2025) to structural repairs and rebuild — one contact, one timeline.',
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

        {/* ── FAQ ── */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-5">
              {[
                {
                  q: 'What does the ICA Significant Event declaration mean for my claim?',
                  a: 'An ICA Significant Event declaration activates industry-wide coordinated catastrophe response. Your claim is still lodged directly with your insurer. However, it means your insurer is required to prioritise catastrophe claims under the General Insurance Code of Practice. AFCA (Australian Financial Complaints Authority) can investigate delays at no cost to you if your insurer is slow to respond.',
                },
                {
                  q: 'What should I do in the first 7 days after storm damage?',
                  a: 'In the first 7 days: (1) Photograph all damage before any cleanup — date-stamped photos are your primary evidence. (2) Make safe emergency repairs only (tarpaulins, boarding windows) — keep all receipts. (3) Do not commence permanent repairs until your insurer has assessed or authorised works. (4) Lodge your insurance claim as soon as possible. (5) Contact NRPG for an independent damage assessment to support your claim position.',
                },
                {
                  q: 'Are the Hawkesbury-Nepean and Illawarra areas covered?',
                  a: 'Yes. The Hawkesbury-Nepean and Illawarra regions are the primary impact zones declared under the ICA Significant Event for NSW/QLD storms 3–8 April 2026. NRPG\'s contractor network operates across these regions.',
                },
                {
                  q: 'What if my insurer delays or disputes my storm claim?',
                  a: 'Under the General Insurance Code of Practice, your insurer must acknowledge your claim within 10 business days. If your insurer delays unreasonably, you can escalate to AFCA (afca.org.au) at no cost. NRPG provides independent IICRC-certified documentation that supports your claim position with your insurer or at AFCA.',
                },
                {
                  q: 'Can NRPG help if I have already lodged a claim?',
                  a: 'Yes. Even after you have lodged your claim, NRPG can coordinate the restoration work and provide independent damage assessments as supplementary documentation. Contact NRPG with your existing claim reference.',
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

        {/* ── Final CTA ── */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-3">
              Lodge Your Storm Damage Claim
            </h2>
            <p className="text-slate-300 mb-2 leading-relaxed">
              Hawkesbury-Nepean and Illawarra policyholders — lodge in 90 seconds on mobile. NRPG
              coordinates your claim and restoration from the first contact.
            </p>
            <p className="text-slate-400 text-xs mb-8">
              <strong>Privacy Notice (APP 3):</strong> Personal information collected through this service
              is used solely to connect you with an IICRC-certified restoration contractor and is handled
              in accordance with the Privacy Act 1988 (Cth). NRPG does not sell personal information to
              third parties.
            </p>
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
