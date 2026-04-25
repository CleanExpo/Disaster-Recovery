/**
 * DR-774 / GAP-116: QLD/NSW Severe Storm & Hail November 2025 — ICA Catastrophe
 *
 * ICA 2025 final losses confirmed: A$1.78B insured losses, ~93,000 claims.
 * Confirmed costliest single 2025 event (overtakes Cyclone Alfred A$1.5B / 133k).
 * Event period: November 2025 (exact dates TBC from ICA catastrophe register).
 * Primary impact: QLD and NSW — severe storm and hail.
 *
 * Government assistance programs: CLOSED (April 2026 — programs ran Nov–Dec 2025).
 * Insurance claims: NO TIME LIMIT — lodge now regardless of event date.
 *
 * ACL s29(1)(g)/(m) compliant — all figures verbatim-sourced from ICA.
 * APP 3 collection notice on all intake CTAs.
 * Framing: NRPG coordinates restoration and claim documentation — not a claim advocate.
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'QLD/NSW Severe Storm & Hail November 2025 — ICA Catastrophe | NRPG Claim Support',
  description:
    'ICA Catastrophe: QLD/NSW severe storm & hail November 2025. A$1.78B insured losses. ~93,000 claims — costliest single event of 2025. Insurance claims have no time limit. Lodge your delayed claim with NRPG now.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/qld-nsw-storms-november-2025',
  },
  openGraph: {
    title: 'QLD/NSW Severe Storm & Hail Nov 2025 — A$1.78B ICA Catastrophe | NRPG',
    description:
      'ICA Catastrophe: QLD/NSW severe storm & hail November 2025. A$1.78B insured losses, ~93,000 claims. Costliest single event of 2025. No time limit on insurance claims. Lodge now.',
    url: 'https://disasterrecovery.com.au/events/qld-nsw-storms-november-2025',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it too late to lodge an insurance claim for the November 2025 storms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. There is no time limit on lodging an insurance claim. Your right to claim does not expire with the storm season or any government assistance program. Government relief programs have closed — but your insurance claim can be lodged at any time. Delayed claims are common after major catastrophes. Lodge now and NRPG will coordinate the assessment and restoration process.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my insurer has already rejected or underpaid my November 2025 storm claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You have the right to dispute any claim decision. If your insurer has rejected, reduced, or delayed your claim, you can escalate to the Australian Financial Complaints Authority (AFCA) at no cost. You have 2 years from the insurer\'s final decision to lodge an AFCA complaint. NRPG provides independent IICRC-certified damage assessments that support your position at AFCA or internal dispute resolution.',
      },
    },
    {
      '@type': 'Question',
      name: 'What government assistance was available for November 2025 QLD/NSW storms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Government disaster assistance programs (state and federal) that were activated for the November 2025 QLD/NSW storm event have now closed. These programs typically ran for 60–90 days post-event. If you missed the application window, contact your state government for any ongoing recovery support. Insurance claims remain open — lodge with your insurer directly, or through NRPG.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my insurer delays or disputes my storm damage claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the General Insurance Code of Practice, your insurer must acknowledge your claim within 10 business days and complete their assessment within 12 months. If your insurer delays unreasonably, you can escalate to AFCA (afca.org.au) at no cost. NRPG provides independent IICRC-certified documentation — formal damage assessment reports — that supports your position with your insurer or at AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG help months after the storm if damage is still unrepaired?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NRPG assists policyholders at any stage — including months after a storm event. Common situations where NRPG helps late-stage claimants include: underpaid or disputed claims needing independent documentation; properties with unresolved mould or water damage that progressed after the initial storm; and delayed insurer response requiring AFCA escalation support. Contact NRPG with your existing claim reference or to begin a new claim.',
      },
    },
  ],
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'QLD/NSW Severe Storm & Hail November 2025 — ICA Catastrophe',
  description:
    'ICA Catastrophe: QLD/NSW severe storm and hail event, November 2025. A$1.78B insured losses, approximately 93,000 claims — confirmed costliest single event of 2025 (ICA 2025 final losses report).',
  startDate: '2025-11-01',
  endDate: '2025-11-30',
  location: [
    {
      '@type': 'State',
      name: 'Queensland',
      addressCountry: 'AU',
    },
    {
      '@type': 'State',
      name: 'New South Wales',
      addressCountry: 'AU',
    },
  ],
  organizer: {
    '@type': 'Organization',
    name: 'Disaster Recovery',
    url: 'https://disasterrecovery.com.au',
  },
};

export default function QLDNSWStormsNovember2025Page() {
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

        {/* ── ICA Catastrophe Banner ── */}
        <div className="bg-blue-900 text-white">
          <div className="container mx-auto px-6 max-w-5xl py-3">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-blue-600 border border-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                ICA CATASTROPHE — 2025
              </span>
              <p className="text-blue-100 text-sm">
                QLD/NSW severe storm &amp; hail, November 2025. A$1.78B insured losses —
                costliest single event of 2025 (ICA).
              </p>
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="bg-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-amber-700">
                CLAIMS STILL OPEN — NO TIME LIMIT ON INSURANCE
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              November 2025 QLD/NSW Storms —{' '}
              <span className="text-blue-400">
                Is your claim lodged?
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-2 leading-relaxed">
              QLD/NSW severe storm &amp; hail, November 2025. A$1.78B in insured losses.
              Approximately 93,000 claims — the costliest single Australian weather event of 2025.
            </p>
            <p className="text-slate-400 text-sm mb-8">
              Source: Insurance Council of Australia, 2025 final losses report (revised 2026).
            </p>

            {/* Late-claim CTA — Who First */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 max-w-2xl">
              <p className="text-blue-300 font-bold text-sm uppercase tracking-wider mb-4">
                There is no time limit on your insurance claim
              </p>
              <ol className="space-y-3">
                {[
                  {
                    step: '1',
                    label: 'Lodge your claim now',
                    detail:
                      'Even months after the event — your insurer cannot refuse to accept a claim on grounds of delay alone.',
                  },
                  {
                    step: '2',
                    label: 'Get independent documentation',
                    detail:
                      'NRPG provides IICRC-certified damage assessments. Essential if your insurer disputes the cause or extent of damage.',
                  },
                  {
                    step: '3',
                    label: 'NRPG coordinates your restoration',
                    detail:
                      'IICRC-certified contractors assess, remediate, and rebuild. Late-stage mould or structural damage — we handle it.',
                  },
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
              <strong className="text-slate-400">Privacy Notice (APP 3):</strong> Personal
              information collected through this service is used solely to connect you with an
              IICRC-certified restoration contractor and is handled in accordance with the Privacy
              Act 1988 (Cth). NRPG does not sell personal information to third parties.
            </p>
          </div>
        </section>

        {/* ── ICA Data Card ── */}
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                ICA Catastrophe Data — QLD/NSW Severe Storm &amp; Hail November 2025
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'A$1.78B', label: 'Insured losses' },
                  { value: '~93,000', label: 'Claims lodged' },
                  { value: '2', label: 'States affected (QLD/NSW)' },
                  { value: '#1 of 2025', label: 'Costliest single event' },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="text-center p-4 bg-white border border-slate-200 rounded-lg"
                  >
                    <div className="text-2xl font-black text-slate-900 mb-1">{value}</div>
                    <div className="text-xs text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-3">
                Source: Insurance Council of Australia — 2025 final losses report (revised 2026).
                Total 2025 ICA losses: A$4.8B / 264,000 claims.
              </p>
            </div>
          </div>
        </section>

        {/* ── Government Assistance Closed Notice ── */}
        <section className="py-8 bg-slate-100 border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-white border border-slate-300 rounded-xl p-6 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-sm">
                ℹ
              </div>
              <div>
                <h2 className="font-bold text-slate-900 mb-1">
                  Government Assistance Programs — Closed
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  State and federal disaster assistance programs activated for the November 2025
                  QLD/NSW storm event have closed. <strong>Your insurance claim remains open —
                  there is no time limit.</strong> If you missed the government assistance window,
                  contact your state government for any ongoing recovery support programs. For
                  insurance claims, lodge now through NRPG or directly with your insurer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Late Claim Checklist ── */}
        <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              Late Claim? Here Is What to Do
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl">
              Months after a storm event, the claim process is different but your rights are the
              same.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  step: 'Step 1',
                  title: 'Document current damage state',
                  body: 'Even months later — photograph all damage thoroughly before any further repair work. If damage has progressed (mould growth, structural movement), document its current extent. This is still valid evidence.',
                  urgent: true,
                },
                {
                  step: 'Step 2',
                  title: 'Request an independent assessment',
                  body: "NRPG's IICRC-certified contractors provide formal damage assessment reports. For a late-stage claim, an independent assessment is particularly important — it establishes cause and extent of damage when the original event evidence is limited.",
                  urgent: false,
                },
                {
                  step: 'Step 3',
                  title: 'Lodge your insurance claim',
                  body: 'Lodge with your insurer directly or through NRPG. Your insurer cannot refuse a claim solely because time has passed. They may ask for evidence linking damage to the November 2025 event — this is where NRPG\'s independent assessment supports your position.',
                  urgent: false,
                },
                {
                  step: 'Step 4',
                  title: 'If previously rejected — dispute it',
                  body: 'If your insurer previously rejected or underpaid your claim, you have 2 years from their final decision to lodge a complaint with AFCA (afca.org.au) at no cost. NRPG\'s independent documentation supports your AFCA submission.',
                  urgent: false,
                },
                {
                  step: 'Step 5',
                  title: 'Address mould and secondary damage',
                  body: 'Storm damage left unresolved for months often results in mould growth (IICRC S520:2025), timber rot, and structural movement. NRPG provides IICRC-compliant mould remediation and structural repair — including documentation of the progression from the original storm event.',
                  urgent: false,
                },
                {
                  step: 'If stalled',
                  title: 'AFCA escalation pathway',
                  body: 'Under the General Insurance Code of Practice, your insurer must acknowledge your claim within 10 business days. If your insurer is unresponsive or has unreasonably rejected your claim, AFCA (afca.org.au) can investigate at no cost to you.',
                  urgent: false,
                },
              ].map(({ step, title, body, urgent }) => (
                <div
                  key={title}
                  className={`bg-white border rounded-xl p-5 shadow-sm ${urgent ? 'border-red-300 ring-1 ring-red-200' : 'border-slate-200'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${urgent ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'}`}
                    >
                      {step}
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
                    Rejected or underpaid? You have 2 years to dispute.
                  </h2>
                  <p className="text-amber-800 text-sm leading-relaxed mb-3">
                    The Australian Financial Complaints Authority (AFCA) investigates insurance
                    disputes at no cost to you. You have 2 years from your insurer&apos;s final
                    decision letter to lodge an AFCA complaint. NRPG&apos;s IICRC-certified
                    independent damage assessments directly support your AFCA submission.
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
                  title: 'Independent Damage Assessment',
                  body: 'IICRC-certified formal assessment reports — essential for disputed or late-stage claims. Establishes cause and extent of damage from the November 2025 storm event.',
                },
                {
                  number: '02',
                  title: 'Mould & Water Damage Remediation',
                  body: 'Storm water damage unresolved for months creates mould risk. NRPG provides IICRC S500:2025 and S520:2025-compliant remediation with full documentation of progression.',
                },
                {
                  number: '03',
                  title: 'Full Restoration & Structural Repair',
                  body: 'Roof, structural, and cosmetic repairs — IICRC-certified contractors, one contact, one timeline. AFCA-ready documentation at every stage.',
                },
              ].map(({ number, title, body }) => (
                <div
                  key={number}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
                >
                  <div className="text-4xl font-black text-blue-100 mb-3 font-display">
                    {number}
                  </div>
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
                  q: 'Is it too late to lodge an insurance claim for the November 2025 storms?',
                  a: 'No. There is no time limit on lodging an insurance claim. Your right to claim does not expire with the storm season or any government assistance program. Government relief programs have closed — but your insurance claim can be lodged at any time. Lodge now and NRPG will coordinate the assessment and restoration process.',
                },
                {
                  q: 'What if my insurer has already rejected or underpaid my November 2025 storm claim?',
                  a: "You have the right to dispute any claim decision. You have 2 years from the insurer's final decision to lodge an AFCA complaint at no cost. NRPG provides independent IICRC-certified damage assessments that support your position at AFCA or internal dispute resolution.",
                },
                {
                  q: 'What government assistance was available for November 2025 QLD/NSW storms?',
                  a: 'Government disaster assistance programs activated for the November 2025 QLD/NSW storm event have now closed. These programs typically ran for 60–90 days post-event. If you missed the application window, contact your state government for any ongoing recovery support. Insurance claims remain open — lodge with your insurer directly, or through NRPG.',
                },
                {
                  q: 'What if my insurer delays or disputes my storm damage claim?',
                  a: 'Under the General Insurance Code of Practice, your insurer must acknowledge your claim within 10 business days and complete their assessment within 12 months. If your insurer delays unreasonably, you can escalate to AFCA (afca.org.au) at no cost. NRPG provides independent IICRC-certified documentation that supports your claim position with your insurer or at AFCA.',
                },
                {
                  q: 'Can NRPG help months after the storm if damage is still unrepaired?',
                  a: 'Yes. NRPG assists policyholders at any stage — including months after a storm event. Common late-stage situations include: underpaid or disputed claims needing independent documentation; unresolved mould or water damage; and delayed insurer response requiring AFCA escalation support. Contact NRPG with your existing claim reference or to begin a new claim.',
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
              Your November 2025 Claim Is Still Valid
            </h2>
            <p className="text-slate-300 mb-2 leading-relaxed">
              A$1.78B in insured losses. ~93,000 claims. If yours is not lodged — or was rejected
              — NRPG can help. Lodge in 90 seconds on mobile.
            </p>
            <p className="text-slate-400 text-xs mb-8">
              <strong>Privacy Notice (APP 3):</strong> Personal information collected through this
              service is used solely to connect you with an IICRC-certified restoration contractor
              and is handled in accordance with the Privacy Act 1988 (Cth). NRPG does not sell
              personal information to third parties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/claim"
                className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Lodge Your Claim Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors text-lg"
              >
                Speak to a Specialist
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
