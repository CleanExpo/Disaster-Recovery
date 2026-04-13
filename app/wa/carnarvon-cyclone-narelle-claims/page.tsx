import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Carnarvon Cyclone Narelle Damage Claims — Insurance & Recovery Guide 2026 | NRPG',
  description:
    'Cyclone Narelle made landfall in Carnarvon WA on 10 April 2026. DRFA declared. AGDRP AU$1,000 per adult. WA Premier\'s Relief up to AU$5,000. Insurance claim guide and dispute support.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/wa/carnarvon-cyclone-narelle-claims',
  },
  openGraph: {
    title: 'Carnarvon Cyclone Narelle Claims 2026 — Insurance Recovery Guide',
    description:
      'Shire of Carnarvon declared DRFA area. Government relief available. Insurance claim rights, dispute support, and IICRC-certified restoration advocacy.',
    url: 'https://disasterrecovery.com.au/wa/carnarvon-cyclone-narelle-claims',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Am I eligible for AGDRP in Carnarvon after Cyclone Narelle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, if you meet all criteria: (1) you are an Australian citizen or permanent resident, (2) your primary residence in the Shire of Carnarvon was damaged or destroyed by Cyclone Narelle, (3) you have suffered loss or damage to your home or contents. AGDRP is paid at AU$1,000 per eligible adult (age 18+). Payment does not reduce your insurance payout. Apply at disasterassistance.gov.au or call 1-800-700-400.',
      },
    },
    {
      '@type': 'Question',
      name: 'My roof was damaged in Carnarvon — what do I do first?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '(1) Safety first — do not climb onto the roof or enter if unsafe. (2) Tarp the roof immediately to prevent further water damage. (3) Document damage with photos before and after any repairs. (4) Report your claim to your insurer within 24 hours. (5) Apply for AGDRP at disasterassistance.gov.au. (6) Request an inspection from your insurer within 48–72 hours. (7) Keep all receipts for temporary repairs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the ARPC cyclone pool affect my insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Australian Risk Pool Cyclone Reinsurance Pool (ARPC) is a government backstop ensuring homeowners in cyclone-prone areas like Carnarvon have access to cyclone insurance. If your home is covered by an ARPC-backed policy, your cyclone claim is just as valid as any standard claim. ARPC does not reduce your payout or add conditions — it guarantees that cover is available.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au/' },
    { '@type': 'ListItem', position: 2, name: 'Western Australia', item: 'https://disasterrecovery.com.au/wa' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Carnarvon Cyclone Narelle Claims',
      item: 'https://disasterrecovery.com.au/wa/carnarvon-cyclone-narelle-claims',
    },
  ],
};

const firstSteps = [
  {
    num: '1',
    title: 'Safety First',
    body: 'Do not enter your home if the structure is visibly damaged or power lines are down. Contact WA Police or SES if you need emergency assistance. Wait for the all-clear from emergency services before entering.',
  },
  {
    num: '2',
    title: 'Secure Your Property (If Safe)',
    body: 'Board broken windows and doors. Tarp damaged roofs to prevent further water ingress. Remove debris that could fall or cause further damage. Keep all receipts for emergency repairs — these are claimable costs.',
  },
  {
    num: '3',
    title: 'Document Everything',
    body: 'Photo or video all damage: roof, broken windows, damaged contents, debris. Write down the date and time damage occurred. List all damaged items with approximate values. Save your phone\'s timestamps. Do not discard damaged items yet — your insurer needs to inspect before removal.',
  },
  {
    num: '4',
    title: 'Report Your Claim Now',
    body: 'Contact your insurer within 24 hours of the cyclone passing. Provide: policy number, date (10 April 2026), cause (Cyclone Narelle). Ask for a claim reference number and the name of your claims assessor.',
  },
  {
    num: '5',
    title: 'Apply for Government Relief',
    body: 'AGDRP: disasterassistance.gov.au or 1-800-700-400. WA Premier\'s Relief: drd.wa.gov.au or contact Shire of Carnarvon on (08) 9941 9999. Both payments are in addition to your insurance payout.',
  },
];

const disputes = [
  {
    scenario: '"My insurer says the damage was caused by \'lack of maintenance,\' not the cyclone."',
    response: 'Cyclone-force winds (sustained 160+ km/h in Narelle\'s case) damage even well-maintained homes. Your insurer cannot use minor maintenance issues as an excuse unless they can prove in writing that the lack of maintenance directly caused the specific damage. If they cannot provide specific written evidence, dispute the denial and escalate to AFCA.',
  },
  {
    scenario: '"The insurer\'s assessor undervalued my roof damage by $40K and they\'re refusing to increase."',
    response: 'Hire an IICRC-certified restoration company or loss assessor to inspect and provide a detailed damage report. This becomes your counter-valuation. Submit it to your insurer in writing. If they refuse to increase the payout, escalate to AFCA — it\'s free and binding on your insurer.',
  },
  {
    scenario: '"My policy says cyclone damage is covered, but the insurer is now separating \'cyclone\' from \'wind\' and refusing to pay."',
    response: 'This is a denial tactic. Cyclone Narelle is a declared natural disaster. Wind damage from a declared cyclone is covered by standard home insurance in Australia. Request a written explanation and escalate to AFCA if the insurer refuses to pay.',
  },
];

export default function CarnarvonCycloneNarelleClaimsPage() {
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
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1e3a5f] to-[#1d4ed8] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-blue-200 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/wa" className="hover:text-white transition-colors">Western Australia</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">Carnarvon Cyclone Narelle</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Carnarvon Cyclone Narelle Claims<br />
              <span className="text-blue-200">Insurance & Recovery Guide 2026</span>
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              Cyclone Narelle made landfall 10 April 2026. Shire of Carnarvon declared DRFA area.
              AGDRP AU$1,000 per adult available. Insurance claim guide and dispute support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0052CC] font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Get Claim Advocacy
              </Link>
              <a
                href="https://disasterassistance.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Apply for AGDRP →
              </a>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

          {/* Government Relief */}
          <section aria-labelledby="relief-heading">
            <h2 id="relief-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Government Relief Available Now
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">AGDRP — AU$1,000 Per Adult</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Australian Government Disaster Recovery Payment. No means test. Does not reduce
                  your insurance payout. For citizens and permanent residents in the DRFA-declared area.
                </p>
                <a
                  href="https://disasterassistance.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0052CC] underline"
                >
                  Apply at disasterassistance.gov.au →
                </a>
                <p className="text-xs text-gray-500 mt-1">or call 1-800-700-400</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">WA Premier&apos;s Relief</h3>
                <ul className="text-sm text-gray-700 space-y-1 mb-3">
                  <li><strong>Primary applicant:</strong> AU$4,000</li>
                  <li><strong>Secondary applicant:</strong> AU$2,000</li>
                  <li><strong>Small business:</strong> AU$5,000</li>
                </ul>
                <a
                  href="https://drd.wa.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0052CC] underline"
                >
                  Apply at drd.wa.gov.au →
                </a>
                <p className="text-xs text-gray-500 mt-1">or Shire of Carnarvon: (08) 9941 9999</p>
              </div>
            </div>
          </section>

          {/* Coverage */}
          <section aria-labelledby="coverage-heading">
            <h2 id="coverage-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Your Insurance Coverage
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-green-700">Typically Covered</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>Roof damage: missing tiles, torn corrugated iron, structural failure</li>
                  <li>Wind damage: damaged walls, broken windows, door frames</li>
                  <li>Water damage from the cyclone via damaged areas</li>
                  <li>Contents: furniture, appliances, personal effects</li>
                  <li>Temporary repairs: emergency boarding, tarping, pumping</li>
                  <li>Additional living expenses while repairs occur</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-red-700">Common Exclusions</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>Damage from lack of maintenance (disputed if cyclone clearly caused it)</li>
                  <li>Pre-existing structural issues not caused by the cyclone</li>
                  <li>Unoccupancy periods &gt;30 days (some policies)</li>
                  <li>Storm surge water (in some policies — check yours)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* IICRC Note */}
          <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Assessment Standard: IICRC S700:2025</h2>
            <p className="text-sm text-gray-700 mb-3">
              Cyclone and wind damage restoration follows <strong>IICRC Standard S700:2025</strong>
              (Structural Damage — Professional Restoration). If your insurer&apos;s assessor spent less
              than 1 hour on-site or provided a vague repair scope, you have the right to an independent
              second opinion.
            </p>
            <p className="text-sm text-gray-700">
              Hire an independent loss assessor or IICRC-certified restoration company to audit the
              claim and provide a detailed scope. This assessment becomes your counter-valuation in any
              dispute.
            </p>
          </section>

          {/* First Steps */}
          <section aria-labelledby="steps-heading">
            <h2 id="steps-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Your 24–48 Hour Action Plan
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

          {/* Local Resources */}
          <section aria-labelledby="resources-heading">
            <h2 id="resources-heading" className="text-2xl font-bold text-gray-900 mb-4">Carnarvon Local Resources</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Shire of Carnarvon:</strong> (08) 9941 9999 — disaster recovery coordination, rate relief, local permits</li>
                <li><strong>Shire website:</strong> shire.carnarvon.wa.gov.au</li>
                <li><strong>WA SES:</strong> ses.wa.gov.au — emergency assistance and property assessment</li>
                <li><strong>WA Fire &amp; Emergency Services (DFES):</strong> dfes.wa.gov.au — official disaster recovery updates</li>
                <li><strong>AFCA:</strong> afca.org.au — free insurance dispute resolution</li>
                <li><strong>IICRC Directory:</strong> iicrc.org — verify contractor certifications</li>
              </ul>
            </div>
          </section>

          {/* Common Disputes */}
          <section aria-labelledby="disputes-heading">
            <h2 id="disputes-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Common Carnarvon Cyclone Claim Disputes
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
            <h2 className="text-2xl font-bold mb-3">Advocate for Your Carnarvon Claim</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              NRPG connects Carnarvon policyholders with IICRC-certified cyclone damage specialists
              and disputes claim underpayment on your behalf. No upfront fees.
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

          <nav aria-label="Related pages">
            <ul className="space-y-1 text-sm">
              {[
                { href: '/events/cyclone-narelle-western-australia-2026', label: 'Cyclone Narelle WA 2026 Event Page' },
                { href: '/guides/insurance-claim-rejected-what-to-do', label: 'Insurance Claim Rejected? What To Do' },
                { href: '/guides/how-to-make-an-insurance-claim-australia', label: 'How to Make an Insurance Claim in Australia' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#0052CC] hover:underline">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-gray-400 text-center">
            Last updated: 13 April 2026. Not legal advice. IICRC standards: S700:2025 (Structural Damage).
            AGDRP and WA Premier&apos;s Relief information current as of 13 April 2026.
          </p>
        </div>
      </main>
    </>
  );
}
