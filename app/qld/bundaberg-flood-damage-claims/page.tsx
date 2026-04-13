import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bundaberg Flood Damage Claims — Insurance & Recovery Guide 2026 | NRPG',
  description:
    'Bundaberg Burnett River flooding March 2026. Insurance claim guide, mold prevention, government assistance (deadline 27 April), and IICRC-certified restoration advocacy. NRPG helps you dispute underpayment.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/qld/bundaberg-flood-damage-claims',
  },
  openGraph: {
    title: 'Bundaberg Flood Damage Claims 2026 — Insurance Recovery Guide',
    description:
      'Burnett River flooding affected thousands of properties. 48-hour action plan, mold prevention, QLD hardship assistance (27 April deadline), and claim dispute support.',
    url: 'https://disasterrecovery.com.au/qld/bundaberg-flood-damage-claims',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is my Bundaberg home covered for flood damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most standard home insurance policies cover sudden, accidental water damage from flooding (such as the March 2026 Burnett River inundation). Your specific policy may have exclusions for "gradual" water entry, lack of maintenance, or water in unfinished spaces. Read your policy\'s water damage section or contact your insurer to confirm. If the insurer denies your claim, you have the right to dispute via AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does mold take to grow after flooding in Bundaberg?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Bundaberg\'s warm, humid tropical climate, mold can begin colonising wet materials within 24–48 hours. Timber, drywall, carpets, and insulation are most at risk. Remove standing water immediately, dry all wet materials to below 20% moisture within 48 hours, and remove materials that cannot be dried in time. If your insurer was notified but failed to authorise emergency drying and mold subsequently grew, you may have a claim for the additional mold remediation costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the 27 April QLD hardship assistance deadline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Queensland Government\'s Personal Hardship Assistance program provides grants to eligible residents affected by the March 2026 floods. The deadline to apply is 27 April 2026. Grants can cover temporary housing, food, medication, and emergency repairs. Visit disasterassistance.qld.gov.au or call the disaster hotline (1-800-113-8000).',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au/' },
    { '@type': 'ListItem', position: 2, name: 'Queensland', item: 'https://disasterrecovery.com.au/qld' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Bundaberg Flood Damage Claims',
      item: 'https://disasterrecovery.com.au/qld/bundaberg-flood-damage-claims',
    },
  ],
};

const firstSteps = [
  {
    num: '1',
    title: 'Safety First',
    body: 'Before entering your home, check with Bundaberg Regional Council that it is safe. If electrical systems are wet, turn off power at the switchboard. Do not re-enter if structures are visibly damaged — call QLD SES for assessment.',
  },
  {
    num: '2',
    title: 'Document Everything Today',
    body: 'Take photos and video of all water damage before and during cleanup. Write down the date and time water entered and when it receded. List damaged items with rough values. Keep all receipts for emergency supplies. Save your phone\'s timestamps — they are evidence. Do not throw away damaged items yet; your insurer will want to inspect.',
  },
  {
    num: '3',
    title: 'Report the Claim Now',
    body: 'Contact your insurer within 24 hours of discovering damage. Report via phone or online using your policy\'s claims number. Provide the date, time, and cause (Burnett River flooding, stormwater inundation). Ask for a claim reference number and a named claims assessor.',
  },
  {
    num: '4',
    title: 'Arrange Emergency Water Removal',
    body: 'If standing water remains, contact an IICRC-certified water removal specialist. Many restorers in Bundaberg offer emergency 24/7 response. Keep all invoices — these are claimable costs.',
  },
];

const disputes = [
  {
    scenario: '"My insurer says it\'s not covered because it was \'gradual\' water damage, not \'sudden\'."',
    response: 'This is often wrong. River flooding is sudden and accidental, regardless of how fast the water rose. If the Burnett River inundated your property without warning, it is covered under most policies. Request the insurer\'s full written explanation of the exclusion clause being cited. Ambiguous wording is read against the insurer under ACL s.139A.',
  },
  {
    scenario: '"The insurer\'s assessor only inspected for 20 minutes and undervalued the damage by $50K+."',
    response: 'You have the right to an independent assessment. Hire a loss assessor or IICRC-certified restoration specialist to prepare a detailed damage report. Submit this as a counter-valuation. If the insurer\'s figure is unreasonable, escalate to AFCA.',
  },
  {
    scenario: '"My claim was denied for \'lack of maintenance.\' The gutters weren\'t perfect, but that\'s not why the Burnett flooded my home."',
    response: 'Insurer causation claims must be specific and evidenced. They cannot blame general maintenance. If flooding was caused by the river or stormwater system failure — not your gutter blockage — you have a strong case to overturn the denial. Request the insurer\'s written evidence and challenge it.',
  },
];

export default function BundabergFloodDamageClaimsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main id="main-content" className="min-h-screen bg-gray-50">
        {/* Urgency Banner */}
        <div className="bg-amber-500 text-white py-3 px-4 text-center">
          <p className="font-semibold text-sm md:text-base">
            ⏰ <strong>DEADLINE:</strong> QLD Personal Hardship Assistance closes <strong>27 April 2026</strong>.{' '}
            <a href="https://disasterassistance.qld.gov.au" target="_blank" rel="noopener noreferrer" className="underline font-bold">
              Apply now →
            </a>
          </p>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1e3a5f] to-[#1d4ed8] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-blue-200 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/qld" className="hover:text-white transition-colors">Queensland</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">Bundaberg Flood Claims</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Bundaberg Flood Damage Claims<br />
              <span className="text-blue-200">Insurance & Recovery Guide 2026</span>
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              Burnett River flooding March 2026. Your 48-hour action plan, insurance rights, mold
              prevention, and government assistance deadlines — in plain Australian English.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0052CC] font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Get Claim Advocacy
              </Link>
              <a
                href="https://afca.org.au"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Dispute via AFCA →
              </a>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

          {/* Event Context */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What Happened — March 2026</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Burnett River exceeded major flood levels during the March 2026 Queensland floods,
              affecting homes and businesses across Bundaberg Regional Council areas including Bundaberg
              proper, Childers, Monto, and surrounding suburbs. Damage ranged from subfloor water
              intrusion to total structural loss.
            </p>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-red-800">
              <strong>Time is critical.</strong> Water damage requires professional assessment within
              48 hours to prevent mold growth. In tropical Queensland climates, mold begins forming in
              as little as 24–48 hours. The longer water sits, the higher your repair costs and health
              risks.
            </div>
          </section>

          {/* Coverage */}
          <section aria-labelledby="coverage-heading">
            <h2 id="coverage-heading" className="text-2xl font-bold text-gray-900 mb-4">
              What Your Insurance Should Cover
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-green-700">Typically Covered</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>Building damage: structural damage from water intrusion, timber frames, electrical, plumbing</li>
                  <li>Contents: furniture, white goods, personal effects, flooring</li>
                  <li>Additional living expenses: temporary accommodation</li>
                  <li>Temporary repairs: emergency tarping, dehumidification, water extraction</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-red-700">Common Exclusions to Watch</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>Gradual seepage (vs. sudden inundation) — often disputed successfully</li>
                  <li>Lack of maintenance: gutters, downpipes, drainage</li>
                  <li>Sub-floor or crawlspace water (some policies limit this)</li>
                  <li>Mold remediation: may be a separate claim or sub-limit</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 48-Hour Steps */}
          <section aria-labelledby="steps-heading">
            <h2 id="steps-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Your 48-Hour Action Plan
            </h2>
            <div className="space-y-4">
              {firstSteps.map(({ num, title, body }) => (
                <div key={num} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0052CC] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{num}. {title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mold Risk */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Water Damage &amp; Mold: The Hidden Risk</h2>
            <p className="text-gray-700 text-sm mb-4">
              <strong>IICRC S500:2025</strong> establishes that wet materials must be dried to below
              20% moisture within 48 hours to prevent mold. In Bundaberg&apos;s tropical climate, this
              window is extremely tight.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside mb-4">
              <li>If drying cannot be achieved, materials must be removed and replaced</li>
              <li>Dehumidification and air circulation are essential in tropical climates</li>
              <li>If your insurer was notified but delayed authorising drying, you may have a secondary mold claim</li>
            </ul>
            <p className="text-sm text-gray-700 font-medium">Watch for: black or greenish staining, musty odours, coughing/wheezing in family members</p>
          </section>

          {/* Government Assistance */}
          <section aria-labelledby="govt-heading">
            <h2 id="govt-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Bundaberg Government Assistance
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase">Urgent Deadline</span>
                  <h3 className="font-semibold text-gray-900">QLD Personal Hardship Assistance</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Deadline: 27 April 2026.</strong> Grants for eligible residents — temporary housing,
                  groceries, medication, and emergency repairs.
                </p>
                <a
                  href="https://disasterassistance.qld.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0052CC] underline"
                >
                  disasterassistance.qld.gov.au →
                </a>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Australian Government Disaster Recovery Payment (AGDRP)</h3>
                <p className="text-sm text-gray-700 mb-2">
                  If Bundaberg Regional Council is declared a DRFA area, eligible adults may receive
                  AU$1,000 per person. Does not affect your insurance payout.
                </p>
                <a
                  href="https://disasterassistance.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0052CC] underline"
                >
                  disasterassistance.gov.au →
                </a>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Local Resources</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Bundaberg Regional Council:</strong> bundaberg.qld.gov.au/disaster</li>
                  <li><strong>QLD SES Bundaberg:</strong> ses.qld.gov.au — emergency assistance and property assessment</li>
                  <li><strong>QLD Emergency Hotline:</strong> 1-800-113-8000 (24/7)</li>
                  <li><strong>IICRC Directory:</strong> iicrc.org — verify contractor certification</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Disputes */}
          <section aria-labelledby="disputes-heading">
            <h2 id="disputes-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Common Bundaberg Flood Claim Disputes
            </h2>
            <div className="space-y-4">
              {disputes.map(({ scenario, response }) => (
                <details
                  key={scenario}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="text-sm">{scenario}</span>
                    <span className="text-[#0052CC] text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">{response}</p>
                </details>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((item) => (
                <details
                  key={item.name}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.name}</span>
                    <span className="text-[#0052CC] text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#1e3a5f] text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Advocate for Your Bundaberg Claim</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              NRPG connects Bundaberg policyholders with IICRC-certified restoration contractors
              and disputes claim denials on your behalf. No upfront fees.
            </p>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#0052CC] font-bold text-lg rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Claim Assessment →
            </Link>
            <p className="mt-6 text-blue-200 text-xs leading-relaxed max-w-2xl mx-auto">
              <strong>Privacy Collection Notice:</strong> Personal information is used solely to connect
              you with an IICRC-certified restoration contractor and to advocate for your insurance
              claim. Handled by NRPG in accordance with the Privacy Act 1988 (Cth) and Australian
              Privacy Principles. Data is stored in Australia.{' '}
              <Link href="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </section>

          <p className="text-xs text-gray-400 text-center">
            Last updated: 13 April 2026. Not legal advice. Read your insurance policy and seek
            professional guidance for claim disputes. IICRC standards: S500:2025 (Water Damage),
            S520:2025 (Mold Remediation). QLD government resources verified as of 13 April 2026.
          </p>
        </div>
      </main>
    </>
  );
}
