import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Yarra Ranges Bushfire Damage Claims — Insurance & Recovery Guide 2026 | NRPG',
  description:
    '2026 Victoria bushfires — Yarra Ranges and Dandenong Ranges. AU$786M+ insured losses. Smoke damage rights (IICRC S700:2025), total loss rebuilding, firefighting water damage, and VIC government assistance.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/vic/yarra-ranges-bushfire-damage-claims',
  },
  openGraph: {
    title: 'Yarra Ranges Bushfire Claims 2026 — Insurance & Recovery Guide',
    description:
      '2026 Victoria bushfires. Smoke damage rights under IICRC S700:2025. Challenge insurer denials. Victorian Parliament inquiry ongoing. NRPG advocacy.',
    url: 'https://disasterrecovery.com.au/vic/yarra-ranges-bushfire-damage-claims',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'My home in Yarra Ranges has smoke damage but didn\'t burn — am I covered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Smoke damage from a nearby bushfire is covered under your home and contents insurance fire damage section. IICRC S700:2025 establishes professional remediation standards for smoke damage, including VOC treatment, HVAC cleaning, and encapsulation. If the insurer claims smoke damage is "cosmetic" or "will naturally dissipate," they are incorrect — professional remediation is required and claimable.',
      },
    },
    {
      '@type': 'Question',
      name: 'The insurer says the smoke smell will \'dissipate\' — do I have to accept this?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Smoke odour is caused by volatile organic compounds (VOCs) absorbed into walls, flooring, furniture, and ductwork. These will not disappear on their own. IICRC S700:2025 requires professional remediation: source removal, encapsulation, HVAC ductwork cleaning, and air purification. If your insurer refuses to pay for these, they are misinterpreting your policy. Challenge this denial in writing, reference IICRC S700:2025, and escalate to AFCA if unresolved.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Victorian government assistance is available for bushfire damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Victoria provides disaster recovery grants, accommodation assistance, and hardship support through Disaster Assist (disasterassist.vic.gov.au or 1-800-560-760). Yarra Ranges Council also provides rate relief, temporary housing, and grants for essential repairs. The Victorian Parliament is investigating insurer conduct in bushfire claims; reference this inquiry if escalating to AFCA.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au/' },
    { '@type': 'ListItem', position: 2, name: 'Victoria', item: 'https://disasterrecovery.com.au/vic' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Yarra Ranges Bushfire Damage Claims',
      item: 'https://disasterrecovery.com.au/vic/yarra-ranges-bushfire-damage-claims',
    },
  ],
};

const disputes = [
  {
    scenario: '"My insurer says smoke damage is \'cosmetic\' and will only pay for repainting."',
    response: 'This violates IICRC S700:2025. Smoke odour is caused by VOCs absorbed into materials. Simply repainting will not remove VOCs — professional remediation is required, including encapsulation, HVAC cleaning, and material replacement. Submit an IICRC-certified restorer\'s quote citing S700:2025 and escalate to AFCA if refused.',
  },
  {
    scenario: '"The insurer\'s assessor undervalued the damage by $100K+."',
    response: 'Hire an independent loss assessor. A loss assessor provides an independent damage valuation on your behalf. This becomes your counter-claim. Submit it to the insurer in writing. If they refuse to increase the payout, escalate to AFCA. The insurer\'s initial assessment is not final.',
  },
  {
    scenario: '"The insurer says my HVAC system is not covered because smoke contamination isn\'t \'structural\'."',
    response: 'Challenge this immediately. Smoke contamination in HVAC ducts is direct fire damage. IICRC S700:2025 requires professional ductwork cleaning as part of the remediation scope. Submit a cleaning quote and reference the IICRC standard. Escalate to AFCA if unresolved.',
  },
  {
    scenario: '"I lost personal items in the fire, but the insurer is demanding original receipts I don\'t have."',
    response: 'Receipts are not always required. Provide evidence through: bank statements showing purchases, credit card records, photos of items in your home, family photos, insurance valuations, or testimony from family members. If you have general descriptions and approximate values, the insurer should accept them. Escalate to AFCA if they are being unreasonable.',
  },
];

export default function YarraRangesBushfireClaimsPage() {
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
        <section className="bg-gradient-to-br from-[#7c2d12] to-[#b45309] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-orange-200 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/vic" className="hover:text-white transition-colors">Victoria</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">Yarra Ranges Bushfire Claims</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Yarra Ranges Bushfire Damage Claims<br />
              <span className="text-orange-200">Insurance & Recovery Guide 2026</span>
            </h1>
            <p className="text-lg text-orange-100 mb-4 max-w-2xl">
              2026 Victoria bushfires severely affected the Yarra Ranges and Dandenong Ranges
              corridor. AU$786M+ initial PERILS estimate. Your insurance rights and smoke damage
              dispute guide.
            </p>
            <div className="bg-white/10 rounded-lg p-4 text-sm mb-6">
              <strong>Victorian Parliament is investigating insurer conduct</strong> in the 2026 bushfire
              response — unreasonable claim denials, underpayment, and smoke damage disputes are under
              scrutiny. This strengthens your position if disputing a claim.
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-700 font-bold rounded-lg hover:bg-orange-50 transition-colors shadow-lg"
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

          {/* Smoke Damage Critical Issue */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              ⚠️ Smoke Damage: The Critical Battleground in Yarra Ranges Claims
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              Many insurers are claiming smoke odour is &ldquo;cosmetic&rdquo; or will &ldquo;dissipate naturally.&rdquo; This
              is incorrect under <strong>IICRC S700:2025</strong> — the definitive international
              standard for fire damage restoration.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border border-amber-100">
                <h3 className="font-semibold text-gray-900 mb-2">What insurers wrongly claim</h3>
                <ul className="text-gray-700 space-y-1 list-disc list-inside">
                  <li>Smoke odour is cosmetic and not covered</li>
                  <li>The smell will dissipate on its own</li>
                  <li>Just repainting the walls is sufficient</li>
                  <li>HVAC ductwork contamination is not structural</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <h3 className="font-semibold text-gray-900 mb-2">What IICRC S700:2025 actually requires</h3>
                <ul className="text-gray-700 space-y-1 list-disc list-inside">
                  <li>Source removal of contaminated materials</li>
                  <li>Encapsulation of smoke-contaminated surfaces</li>
                  <li>HVAC ductwork professional cleaning</li>
                  <li>Ozone or chemical treatment for residual odour</li>
                  <li>HEPA air purification</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-4 font-medium">
              All these remediation costs are legitimate, claimable expenses under fire damage policies.
            </p>
          </section>

          {/* Coverage */}
          <section aria-labelledby="coverage-heading">
            <h2 id="coverage-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Bushfire Coverage: What Is and Isn&apos;t Covered
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-green-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-green-700">Typically Covered</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Structural fire damage: charred timber, damaged walls, roof</li>
                  <li>Total loss: replacement cost if home destroyed</li>
                  <li>Firefighting water damage (from hoses, aerial drops)</li>
                  <li>Contents destroyed or damaged by fire</li>
                  <li>Smoke damage (correctly assessed under S700:2025)</li>
                  <li>Additional living expenses</li>
                  <li>Temporary emergency repairs</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-red-700">Often Wrongly Denied</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Smoke odour remediation (incorrectly called "cosmetic")</li>
                  <li>Contents contaminated by smoke</li>
                  <li>HVAC contamination from smoke in ductwork</li>
                  <li>Mold from firefighting water (covered under S520:2025)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Action Plan */}
          <section aria-labelledby="action-heading">
            <h2 id="action-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Your 48–72 Hour Action Plan
            </h2>
            <div className="space-y-4">
              {[
                {
                  num: '1',
                  title: 'Safety First',
                  body: 'Do not re-enter if walls, roof, or floor are structurally compromised, electrical systems are damaged, or asbestos may be present (common in older Yarra Ranges homes). Contact the CFA (Country Fire Authority) or VicSES for a safety inspection before entry.',
                },
                {
                  num: '2',
                  title: 'Document Everything Before Cleanup',
                  body: 'Photo or video: exterior fire damage, roof charring, interior smoke damage, damaged contents. Write down the fire date and areas affected. List all destroyed or damaged contents with values. Document smoke odour in any room — this is evidence of contamination. Do not throw away damaged items, remove debris, or begin cleanup until your insurer inspects.',
                },
                {
                  num: '3',
                  title: 'Secure Your Property',
                  body: 'Board broken windows and doors. Tarp damaged or open roof areas. Ensure no water pooling. Keep all receipts for temporary repairs.',
                },
                {
                  num: '4',
                  title: 'Report Your Claim Immediately',
                  body: 'Contact your insurer within 24 hours. Provide: address, date of fire (2026), cause (Victoria bushfire). Ask for a claim reference number and named assessor. Request an inspection within 48–72 hours.',
                },
                {
                  num: '5',
                  title: 'Apply for Victorian Government Assistance',
                  body: 'Disaster Assist: disasterassist.vic.gov.au or 1-800-560-760. Yarra Ranges Council: yarraranges.vic.gov.au/disaster for rate relief and grants.',
                },
              ].map(({ num, title, body }) => (
                <div key={num} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
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

          {/* Firefighting Water */}
          <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Water Damage from Firefighting</h2>
            <p className="text-sm text-gray-700 mb-3">
              Firefighting water can cause as much damage as the fire itself and is <strong>covered</strong> under your fire policy. <strong>IICRC S500:2025</strong> requires:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Removal of standing water within hours</li>
              <li>Drying of all wet materials to below 20% moisture within 48 hours</li>
              <li>Mold prevention through dehumidification and ventilation</li>
              <li>Removal of materials that cannot be dried in time</li>
            </ul>
            <p className="text-sm text-gray-700 mt-3 font-medium">
              If firefighting water was not addressed quickly and mold subsequently grew, you may have
              a claim for consequential mold damage.
            </p>
          </section>

          {/* Local Resources */}
          <section aria-labelledby="resources-heading">
            <h2 id="resources-heading" className="text-2xl font-bold text-gray-900 mb-4">Yarra Ranges Local Resources</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Yarra Ranges Council:</strong> (03) 5963 3300 — disaster recovery, rate relief, permits</li>
                <li><strong>Council disaster info:</strong> yarraranges.vic.gov.au/disaster</li>
                <li><strong>CFA (Country Fire Authority):</strong> cfa.vic.gov.au — safety inspections</li>
                <li><strong>VicSES:</strong> vicses.vic.gov.au — recovery support, property assessment</li>
                <li><strong>VicEmergency Hotline:</strong> 1-800-226-226</li>
                <li><strong>Disaster Assist VIC:</strong> disasterassist.vic.gov.au or 1-800-560-760</li>
                <li><strong>Victorian Parliament Bushfire Inquiry:</strong> parliament.vic.gov.au</li>
                <li><strong>AFCA:</strong> afca.org.au or 1800 931 678 — free dispute resolution</li>
              </ul>
            </div>
          </section>

          {/* Common Disputes */}
          <section aria-labelledby="disputes-heading">
            <h2 id="disputes-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Common Yarra Ranges Bushfire Claim Disputes
            </h2>
            <div className="space-y-4">
              {disputes.map(({ scenario, response }) => (
                <details
                  key={scenario}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="text-sm">{scenario}</span>
                    <span className="text-orange-700 text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
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
            <h2 className="text-2xl font-bold mb-3">Advocate for Your Bushfire Claim</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              NRPG connects Yarra Ranges policyholders with IICRC S700:2025-certified fire damage
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

          <nav aria-label="Related pages">
            <ul className="space-y-1 text-sm">
              {[
                { href: '/guides/insurance-claim-rejected-what-to-do', label: 'Insurance Claim Rejected? What To Do' },
                { href: '/guides/how-to-make-an-insurance-claim-australia', label: 'How to Make an Insurance Claim in Australia' },
                { href: '/about/nrpg-expertise', label: 'NRPG Expertise: IICRC, ACL & Claims Advocacy' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#0052CC] hover:underline">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-gray-400 text-center">
            Last updated: 13 April 2026. Not legal advice. IICRC standards: S700:2025 (Fire &amp; Smoke Restoration — First Edition 2025),
            S500:2025 (Water Damage), S520:2025 (Mold Remediation). PERILS initial estimate AU$786M.
            Yarra Ranges Council resources verified 13 April 2026. Victorian Parliament bushfire inquiry ongoing.
          </p>
        </div>
      </main>
    </>
  );
}
