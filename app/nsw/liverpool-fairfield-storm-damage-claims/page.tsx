import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Liverpool & Fairfield Storm Damage Claims — Insurance Recovery Guide 2026 | NRPG',
  description:
    'April 2026 NSW storms hit Liverpool and Fairfield LGAs. 14,781+ claims, AU$176M+. Insurance rights, storm vs flood dispute guide, strata claims, and Service NSW assistance.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/nsw/liverpool-fairfield-storm-damage-claims',
  },
  openGraph: {
    title: 'Liverpool & Fairfield Storm Claims 2026 — Insurance & Recovery Guide',
    description:
      'April 2026 NSW severe storms. 14,781+ ICA claims. Storm vs flood dispute guide, strata rights, and NRPG claim advocacy.',
    url: 'https://disasterrecovery.com.au/nsw/liverpool-fairfield-storm-damage-claims',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'My apartment in Liverpool had hail/storm damage — who makes the insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you own the apartment: you claim for damage to your contents and internal structures. The body corporate claims for common property (roof, exterior). If you rent: your landlord claims for building/structure; you claim for your personal contents. For common property damage affecting your apartment (e.g., roof leak into your unit), the body corporate should claim, and you can pursue a separate claim against their insurer.',
      },
    },
    {
      '@type': 'Question',
      name: 'My NSW insurer says it was \'flood\' not \'storm\' — is that right?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. Flood damage is water from overflowing waterways or drains. Storm damage is water that entered through storm-created openings (broken windows, hail-damaged roof). If hail damaged your roof and rain entered through it, that is storm damage, not flood. Request written proof showing where the water originated. If they cannot pinpoint stormwater overflow at your property, their denial is likely incorrect. Challenge it and escalate to AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'What NSW government assistance is available for storm damage in Liverpool/Fairfield?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Service NSW provides disaster relief grants, temporary accommodation assistance, and hardship support. Visit servicensw.gov.au or call 13 77 88. Liverpool City Council and Fairfield City Council also offer rate relief, temporary housing, and grants for essential repairs. Contact your council directly.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au/' },
    { '@type': 'ListItem', position: 2, name: 'New South Wales', item: 'https://disasterrecovery.com.au/nsw' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Liverpool & Fairfield Storm Damage Claims',
      item: 'https://disasterrecovery.com.au/nsw/liverpool-fairfield-storm-damage-claims',
    },
  ],
};

const disputes = [
  {
    scenario: '"The insurer says my damage was from \'flooding,\' not \'storm,\' so it\'s excluded. But I don\'t live in a flood zone."',
    response: 'Challenge this immediately. If your home was damaged by hail or wind, and water entered through those damaged areas, that is storm damage — not flood damage. Flood damage means water originating from overflowing waterways or stormwater systems. Request written evidence from your insurer showing exactly where the water originated at your specific property. If they cannot provide specific evidence, their denial is likely incorrect. Escalate to AFCA.',
  },
  {
    scenario: '"I live in an apartment. The strata hasn\'t claimed yet, and my apartment was damaged."',
    response: 'Lodge a separate claim immediately with your landlord\'s insurer (if renting) or directly with the body corporate\'s insurer. Even if the body corporate is slow or refuses to claim, you have the right to claim for damage to your apartment. Provide photos of water entry, damaged contents, and structural damage to your unit. Request that your insurer subrogate from the building\'s insurer if common property failure caused the damage.',
  },
  {
    scenario: '"The insurer\'s assessor said the damage is $10K, but I\'ve had three quotes for $35K+."',
    response: 'You have the right to an independent assessment. Hire an IICRC-certified restoration company or loss assessor to provide a detailed damage report. This becomes your counter-claim. Submit it to the insurer in writing. If they refuse to increase the payout, escalate to AFCA — it\'s free and binding on your insurer.',
  },
  {
    scenario: '"The storm damaged my roof 3 weeks ago. Now the insurer says water damage from a slow leak is excluded."',
    response: 'No. If your roof was damaged by the storm and water slowly seeped in over weeks, that water damage is caused by the storm and is covered. The exclusion for "gradual seepage" applies to pre-existing leaks — not water entering through storm-damaged areas. Provide photos and a timeline showing the damage originated from the April storm.',
  },
];

export default function LiverpoolFairfieldStormClaimsPage() {
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
                <li><Link href="/nsw" className="hover:text-white transition-colors">New South Wales</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">Liverpool & Fairfield Storm Claims</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Liverpool &amp; Fairfield Storm Damage Claims<br />
              <span className="text-blue-200">Insurance & Recovery Guide 2026</span>
            </h1>
            <p className="text-lg text-blue-100 mb-4 max-w-2xl">
              April 2026 NSW severe storms. Over 14,781 claims lodged, AU$176M+ insured losses.
              Your insurance rights, the storm-vs-flood dispute explained, and strata claim guide.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6 text-center text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-bold text-lg">14,781+</div>
                <div className="text-blue-200 text-xs">ICA claims lodged</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-bold text-lg">AU$176M+</div>
                <div className="text-blue-200 text-xs">Estimated insured losses</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-bold text-lg">80mm</div>
                <div className="text-blue-200 text-xs">Hail stones recorded</div>
              </div>
            </div>
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

          {/* Storm vs Flood — Critical Issue */}
          <section className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              ⚠️ The Storm vs Flood Dispute — #1 Issue in Liverpool/Fairfield
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              Many policyholders are being told: &ldquo;Your claim was from flooding, not storm. Flooding is excluded. We won&apos;t pay.&rdquo;
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border border-red-100">
                <h3 className="font-semibold text-red-700 mb-2">Flood damage (may be excluded)</h3>
                <p className="text-gray-700">Water that originates from overflowing waterways, drains, or stormwater systems — outside your home.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <h3 className="font-semibold text-green-700 mb-2">Storm damage (typically covered)</h3>
                <p className="text-gray-700">Water that entered through storm-created openings: hail-damaged roof, broken windows, wind-damaged fascia.</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-4 font-medium">
              If your roof has hail damage and water entered through it — that is storm damage. Challenge any &ldquo;flood not storm&rdquo; denial in writing.
            </p>
          </section>

          {/* Coverage Overview */}
          <section aria-labelledby="coverage-heading">
            <h2 id="coverage-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Storm Coverage: What Is and Isn&apos;t Covered
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-green-700">Typically Covered</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Hail damage: roof, broken tiles, damaged skylights, windows</li>
                  <li>Wind damage: guttering, fascia, fencing, doors</li>
                  <li>Water damage from the storm via broken or damaged areas</li>
                  <li>Contents damaged by hail or storm water</li>
                  <li>Temporary repairs: boarding, tarping</li>
                  <li>Additional living expenses (if in policy)</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-red-700">Common Exclusions</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Flood water (from overflowing drains, waterways) — often disputed</li>
                  <li>Pre-existing defects that worsen from the storm</li>
                  <li>Lack of maintenance (missing tiles, blocked gutters)</li>
                  <li>Gradual water ingress (vs. sudden storm entry)</li>
                  <li>Sub-floor or crawlspace water (some policies)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Strata / Apartment Claims */}
          <section aria-labelledby="strata-heading">
            <h2 id="strata-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Apartment &amp; Strata Claims — Special Rules
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Who makes which claim?</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li><strong>Building damage (roof, exterior, shared services):</strong> Body corporate insures and claims</li>
                  <li><strong>Your apartment interior:</strong> You (owner-occupier) or your landlord (if renting) claims for contents and internal damage</li>
                  <li><strong>Common property damage causing damage to your unit:</strong> Body corporate claims; you can pursue the body corporate&apos;s insurer separately</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Your rights</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>Attend strata meetings and see the building insurer&apos;s claim documents</li>
                  <li>Lodge a separate claim if common property damage affected your apartment</li>
                  <li>If body corporate refuses to claim or settles for too little: contact NSW Fair Trading (fairtrading.nsw.gov.au) or Office of the Strata Schemes Commissioner</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Action Plan */}
          <section aria-labelledby="action-heading">
            <h2 id="action-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Your 24–48 Hour Action Plan
            </h2>
            <div className="space-y-4">
              {[
                {
                  num: '1',
                  title: 'Safety First',
                  body: 'Do not enter areas with electrical hazards, loose structural elements, or visible safety risks. Turn off power at the switchboard if electrical systems are wet. Call NSW SES (1-800-110-325) for emergency assistance or property assessment.',
                },
                {
                  num: '2',
                  title: 'Document Everything',
                  body: 'Photo or video: damaged roof, broken windows, hail dents, water entry, damaged contents. Write down when the storm hit and when you discovered the damage. List all damaged items with approximate values. Save all timestamps. Do not discard damaged items until your insurer inspects.',
                },
                {
                  num: '3',
                  title: 'Make Temporary Repairs to Prevent Further Damage',
                  body: 'Board broken windows. Tarp damaged roofs. Remove debris from gutters. Keep all invoices — these are claimable costs.',
                },
                {
                  num: '4',
                  title: 'Report Your Claim Immediately',
                  body: 'Contact your insurer within 24 hours. Have your policy number ready. Provide the date, suburb (Liverpool or Fairfield), and date (14–15 April 2026). Ask for a claim reference number and the name of your claims assessor. If renting, also notify your landlord.',
                },
                {
                  num: '5',
                  title: 'Apply for NSW Government Assistance',
                  body: 'Service NSW Disaster Relief: servicensw.gov.au or 13 77 88. Liverpool City Council and Fairfield City Council also offer grants and rate relief — contact them directly.',
                },
              ].map(({ num, title, body }) => (
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
            <h2 id="resources-heading" className="text-2xl font-bold text-gray-900 mb-4">Local Resources</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Liverpool City Council:</strong> (02) 8802 8802 — disaster recovery, rate relief</li>
                <li><strong>Fairfield City Council:</strong> (02) 9711 9999 — disaster recovery, rate relief</li>
                <li><strong>NSW SES:</strong> ses.nsw.gov.au or 1-800-110-325</li>
                <li><strong>Service NSW Disaster Relief:</strong> servicensw.gov.au or 13 77 88</li>
                <li><strong>NSW Fair Trading (strata disputes):</strong> fairtrading.nsw.gov.au</li>
                <li><strong>AFCA:</strong> afca.org.au or 1800 931 678 — free insurance dispute resolution</li>
              </ul>
            </div>
          </section>

          {/* Common Disputes */}
          <section aria-labelledby="disputes-heading">
            <h2 id="disputes-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Common Liverpool/Fairfield Storm Claim Disputes
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
            <h2 className="text-2xl font-bold mb-3">Advocate for Your Storm Claim</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              NRPG connects Liverpool and Fairfield policyholders with IICRC-certified storm damage
              specialists and disputes claim underpayment on your behalf. No upfront fees.
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
            Last updated: 13 April 2026. Not legal advice. IICRC standards: S700:2025, S500:2025.
            Insurance Council of Australia claims data as of 13 April 2026.
          </p>
        </div>
      </main>
    </>
  );
}
