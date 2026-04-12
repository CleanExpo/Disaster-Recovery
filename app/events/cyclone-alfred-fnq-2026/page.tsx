import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cyclone Alfred 2026 — Insurance Claim Advocacy | NRPG',
  description: 'Cyclone Alfred caused AU$1.877 billion in insured losses across Far North Queensland (PERILS, 2026). NRPG advocates for policyholders navigating insurance claims for wind, water, and mould damage.',
  keywords: [
    'cyclone alfred claim',
    'cyclone alfred insurance',
    'cyclone alfred queensland 2026',
    'NRPG cyclone claim',
    'tropical cyclone insurance advocacy',
    'FNQ cyclone damage claim',
  ],
  alternates: {
    canonical: '/events/cyclone-alfred-fnq-2026',
  },
  openGraph: {
    title: 'Cyclone Alfred 2026 — NRPG Claim Advocacy',
    description: 'AU$1.877 billion insured loss event. NRPG works for you, not your insurer.',
    url: 'https://disasterrecovery.com.au/events/cyclone-alfred-fnq-2026',
    type: 'article',
  },
};

// Structured data for the event
const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Tropical Cyclone Alfred — Far North Queensland 2026',
  description:
    'Tropical Cyclone Alfred caused AU$1.877 billion in insured losses across Far North Queensland. NRPG provides independent claim advocacy for affected policyholders.',
  location: {
    '@type': 'Place',
    name: 'Far North Queensland, Australia',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'QLD',
      addressCountry: 'AU',
    },
  },
};

const faqItems = [
  {
    question: 'My insurer says wind damage is not covered — is that right?',
    answer:
      'Not necessarily. Most home and contents policies cover wind damage from a named tropical cyclone, but the wording varies. NRPG reviews your policy documents, identifies what coverage applies, and disputes exclusions that are incorrectly applied. There is no charge unless we recover money for you.',
  },
  {
    question: 'My roof leaked and now there is mould — is that a separate claim?',
    answer:
      'Mould that results directly from storm ingress is generally covered as consequential damage. However, insurers sometimes classify it as a maintenance issue. NRPG engages IICRC S520:2025-accredited assessors to document the mould as storm-consequential, strengthening your claim.',
  },
  {
    question: 'The insurer offered a cash settlement — should I accept?',
    answer:
      'Do not accept without independent review. Cash settlements are final. NRPG reviews the scope of works and valuation before you commit. If the offer is below the actual rectification cost, we negotiate on your behalf.',
  },
  {
    question: 'How long do I have to lodge a cyclone insurance claim?',
    answer:
      'Most policies require notification within a reasonable time after the event. Some set a specific window (often 30 days, sometimes longer). Contact NRPG as early as possible — we can advise on your policy\'s specific timeframes and ensure nothing is missed.',
  },
  {
    question: 'The insurer appointed their own assessor. Do I have to accept their findings?',
    answer:
      'No. You have the right to appoint your own independent assessor. NRPG coordinates this on your behalf. An independent assessment carries equal weight in the claim process and is essential when an insurer\'s assessment appears to undervalue the damage.',
  },
  {
    question: 'My claim is for a commercial property — do you handle that?',
    answer:
      'Yes. PERILS data for Cyclone Alfred shows approximately 26% of the AU$1.877 billion loss total is commercial property. NRPG handles commercial claims including business interruption, stock loss, and building damage.',
  },
  {
    question: 'The insurer is taking too long — what can I do?',
    answer:
      'Under the Insurance Contracts Act 1984 (Cth) and the General Insurance Code of Practice, insurers must handle claims promptly and fairly. If your claim is unreasonably delayed, NRPG can escalate through the Australian Financial Complaints Authority (AFCA) on your behalf.',
  },
  {
    question: 'Does NRPG charge upfront?',
    answer:
      'No. NRPG operates on a success-fee model for claim advocacy services. We receive a percentage of the additional recovery above what the insurer initially offered. If there is no additional recovery, there is no fee.',
  },
];

export default function CycloneAlfredPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // SAFE: JSON.stringify of server-controlled schema object — no user input
          __html: JSON.stringify(eventSchema),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Emergency banner */}
        <div className="bg-[#B91C1C] text-white py-3 text-center text-sm font-semibold px-4">
          Cyclone Alfred — AU$1.877B insured loss event (PERILS, 2026). If your claim has been delayed,
          underpaid, or denied,{' '}
          <Link href="/claim/start" className="underline underline-offset-2 hover:text-yellow-200">
            contact NRPG now
          </Link>
          .
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-[#B91C1C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                ICA Declared Event
              </span>
              <span className="bg-slate-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Far North Queensland
              </span>
              <span className="bg-slate-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                PERILS AU$1.877B final estimate
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Cyclone Alfred — largest insured cyclone loss since Debbie (2017)
            </h1>
            <p className="text-xl text-slate-300 mb-4">
              Tropical Cyclone Alfred caused AU$1.877 billion in insured losses across Far North
              Queensland (PERILS fourth and final estimate, 2026). 132,000 claims were lodged with
              ICA-member insurers.
            </p>
            <p className="text-lg text-slate-400 mb-8">
              NRPG advocates for policyholders — not insurers. We review your policy, dispute incorrect
              exclusions, and negotiate the settlement you are entitled to.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim/start"
                className="inline-flex items-center justify-center bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                Start your claim review
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                Speak with an advocate
              </Link>
            </div>

            {/* APP 3 collection notice */}
            <p className="text-xs text-slate-500 mt-5 max-w-xl">
              By submitting a claim enquiry, you consent to NRPG collecting your personal information to
              assess and manage your claim. See our{' '}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>{' '}
              for how we handle, store, and disclose your information under the Privacy Act 1988 (Cth).
            </p>
          </div>
        </section>

        {/* Loss data section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Cyclone Alfred — PERILS insured loss progression
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { estimate: 'First', amount: 'AU$2.568B' },
                { estimate: 'Second', amount: 'AU$2.250B' },
                { estimate: 'Third', amount: 'AU$1.922B' },
                { estimate: 'Fourth (final)', amount: 'AU$1.877B' },
              ].map((row) => (
                <div
                  key={row.estimate}
                  className={`bg-white rounded-xl border p-5 text-center ${row.estimate === 'Fourth (final)' ? 'border-[#B91C1C] ring-1 ring-[#B91C1C]' : 'border-slate-200'}`}
                >
                  <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">
                    {row.estimate}
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{row.amount}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 mb-8">
              Source: PERILS AG loss estimates for Tropical Cyclone Alfred, Far North Queensland 2026.
            </p>

            {/* Loss split */}
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Loss split by portfolio (PERILS, final estimate)
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Personal lines', pct: '70%' },
                { label: 'Commercial lines', pct: '26%' },
                { label: 'Motor', pct: '4%' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-5 text-center">
                  <div className="text-3xl font-bold text-[#B91C1C] mb-1">{item.pct}</div>
                  <div className="text-sm text-slate-600">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Key figures */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">132,000+</div>
                <div className="text-slate-600 font-medium mb-2">ICA claims lodged</div>
                <div className="text-sm text-slate-500">
                  Source: Insurance Council of Australia declaration data.
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">ARPC &gt;AU$1B</div>
                <div className="text-slate-600 font-medium mb-2">Reinsurance pool activation</div>
                <div className="text-sm text-slate-500">
                  The Australian Reinsurance Pool Corporation (ARPC) cyclone reinsurance pool applied
                  to Cyclone Alfred given losses above the activation threshold.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loss drivers */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              How Cyclone Alfred damage is assessed under IICRC standards
            </h2>
            <p className="text-slate-600 mb-8">
              Cyclone Alfred was characterised by prolonged wind and precipitation — two distinct damage
              pathways that require separate technical assessment.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">Water damage — IICRC S500:2025</h3>
                <p className="text-slate-600 text-sm">
                  Water intrusion from sustained rainfall and storm surge is assessed under the IICRC
                  S500:2025 Standard for Professional Water Damage Restoration. Category and Class
                  classification determines remediation scope and directly affects the settlement value.
                  NRPG coordinates IICRC S500:2025-compliant assessors to document the damage correctly.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">Mould remediation — IICRC S520:2025</h3>
                <p className="text-slate-600 text-sm">
                  Mould growth following cyclone-related water intrusion is assessed under the IICRC
                  S520:2025 Standard for Professional Mould Remediation. Where mould arises as a direct
                  consequence of storm damage, it is covered under most policies as consequential loss.
                  Correct documentation under S520:2025 is essential to prevent insurers from
                  reclassifying it as a pre-existing or maintenance issue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What NRPG does */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              We work for you, not your insurer
            </h2>
            <p className="text-slate-600 mb-8">
              Insurers appoint their own loss adjusters and assessors. NRPG provides independent
              advocacy — reviewing your policy, challenging incorrect exclusions, and negotiating on
              your behalf.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  heading: 'Policy review',
                  body: 'We read your policy documents and identify every coverage that applies to your loss. Exclusions are only valid if correctly applied under the Insurance Contracts Act 1984 (Cth).',
                },
                {
                  heading: 'Independent assessment',
                  body: 'Where the insurer\'s scope of works underestimates the damage, we commission an independent IICRC-accredited assessment to support your claim.',
                },
                {
                  heading: 'Negotiation and AFCA',
                  body: 'We negotiate directly with the insurer. If the insurer does not respond fairly, we escalate to the Australian Financial Complaints Authority (AFCA) at no additional cost to you.',
                },
              ].map((card) => (
                <div key={card.heading} className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-3">{card.heading}</h3>
                  <p className="text-slate-600 text-sm">{card.body}</p>
                </div>
              ))}
            </div>

            {/* Bupa ACCC illustrative citation */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
              <p className="text-sm text-amber-900">
                <strong>Regulatory context:</strong> The ACCC has taken enforcement action against
                insurers for misleading claims handling conduct. In ACCC v Bupa, the Federal Court found
                that representations about coverage obligations must be accurate and not misleading under
                the Australian Consumer Law. NRPG references this precedent when challenging exclusion
                letters that misrepresent policy entitlements.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="border border-slate-200 rounded-xl open:border-slate-400"
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-slate-900 select-none list-none flex justify-between items-center">
                    {item.question}
                    <span className="text-slate-400 ml-2 flex-shrink-0">▾</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#B91C1C] text-white px-4 py-4 sm:hidden z-50 shadow-lg">
          <Link
            href="/claim/start"
            className="block text-center font-bold text-lg"
            aria-label="Start your cyclone alfred claim review"
          >
            Start your claim review →
          </Link>
          <p className="text-center text-xs text-red-200 mt-1">
            No upfront fees. We work for you.
          </p>
        </div>

        {/* Bottom CTA */}
        <section className="py-16 px-4 bg-slate-900 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Cyclone Alfred affected your property?
            </h2>
            <p className="text-slate-400 mb-8">
              NRPG provides independent advocacy for policyholders. We review your claim at no upfront
              cost and negotiate the settlement you are entitled to under your policy.
            </p>
            <Link
              href="/claim/start"
              className="inline-flex items-center justify-center bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold px-10 py-4 rounded-lg text-lg transition-colors mb-4"
            >
              Start your claim review
            </Link>
            <p className="text-xs text-slate-500">
              By submitting an enquiry you consent to NRPG collecting your personal information for
              claim assessment purposes under the Privacy Act 1988 (Cth) APP 3.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
