import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insurance Claim Rejected: Your Rights & Next Steps | NRPG Australia',
  description:
    'Your insurance claim was rejected. Here is what to do in the next 48 hours. AFCA escalation guide, evidence checklist, and your rights under Australian Consumer Law. Free review from NRPG.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/insurance-claim-rejected-what-to-do',
  },
  openGraph: {
    title: 'Insurance Claim Rejected? Your Rights & 48-Hour Action Plan',
    description:
      'Most rejections are disputable. Get the rejection in writing, gather evidence, and escalate to AFCA — free and binding on your insurer.',
    url: 'https://disasterrecovery.com.au/guides/insurance-claim-rejected-what-to-do',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long do I have to appeal an insurance claim rejection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no formal appeal process within the insurance company. Once rejected, escalate to AFCA. Do not delay — escalate within weeks, not months, as evidence degrades over time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is AFCA really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. AFCA is funded by the insurance industry, not consumers. You pay no fee to lodge, investigate, or obtain a determination.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can my insurer penalise me for going to AFCA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. It is illegal for your insurer to penalise, discriminate against, or threaten you for lodging an AFCA complaint.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my insurer won\'t budge even after AFCA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your insurer refuses to comply with AFCA\'s determination, you can take legal action in court, report to ASIC, or report to the ACCC. Most insurers comply because non-compliance damages their reputation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a lawyer to dispute a rejected claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, not required. AFCA is designed for consumers without lawyers. NRPG is an alternative — NRPG advocates on your behalf without requiring a lawyer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does an independent assessment help?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An independent IICRC-certified assessment is your strongest evidence. It is objective, credible, and contradicts your insurer\'s assessment, creating leverage in dispute resolution.',
      },
    },
    {
      '@type': 'Question',
      name: 'What evidence do I need to win in AFCA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minimum: IICRC assessment, photos, BOM data (if weather-related), written correspondence, and original claim docs. Additional strength: neighbour testimony, building inspection, maintenance proof, and receipts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does NRPG charge for claim advocacy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG takes a percentage of the recovered amount (typically 15–25%), with no upfront fees. If the claim is denied, NRPG\'s fee is waived. You approve the fee before work begins.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://disasterrecovery.com.au/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://disasterrecovery.com.au/guides' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Insurance Claim Rejected: What to Do',
      item: 'https://disasterrecovery.com.au/guides/insurance-claim-rejected-what-to-do',
    },
  ],
};

const actions = [
  {
    step: '1',
    title: 'Get the Rejection in Writing',
    body: 'Insurers must provide written reasons under the ICA General Insurance Code of Practice. If rejected by phone, email immediately: "Following our conversation on [date], please send written confirmation of the rejection and grounds within 24 hours." The letter must contain your policy number, claim number, clear rejection statement, grounds for rejection, reference to the policy clause applied, your right to escalate to AFCA, and AFCA contact details.',
  },
  {
    step: '2',
    title: 'Identify the Rejection Type',
    body: 'There are three types. Type 1 — Legitimate Policy Exclusion: the policy genuinely doesn\'t cover the damage (rarely disputable, unless your insurer misled you). Type 2 — Factual Dispute: the insurer claims pre-existing damage, wear and tear, late notification, or failure to mitigate — all disputable with new evidence. Type 3 — Procedural Failure: the insurer missed deadlines, provided insufficient reasons, or gave misleading information — almost always disputable.',
  },
  {
    step: '3',
    title: 'Do NOT Start Repairs',
    body: 'Starting repairs before the claim is settled gives your insurer grounds to deny or reduce your claim. They may argue you used unapproved contractors, destroyed evidence, or inflated costs. Make emergency repairs only (e.g., tarp a roof) and document all temporary repairs with photos and receipts. Wait for AFCA resolution before major repairs.',
  },
  {
    step: '4',
    title: 'Document Additional Evidence',
    body: 'The single most important piece of evidence is an IICRC-certified independent assessment, requested within 48 hours. Also gather: new photos and video of damage, Bureau of Meteorology weather data (bom.gov.au), signed written statements from neighbours who experienced the same event, before-and-after comparison photos, receipts and bank statements for damaged contents, and all correspondence with your insurer.',
  },
  {
    step: '5',
    title: 'Contact NRPG for a Free Review',
    body: 'Do not handle a rejected claim alone. Your insurer rejected you once — they will not easily reverse without external pressure. NRPG will review your rejection letter within 48 hours and advise whether the rejection is disputable. If disputable, NRPG will recommend next steps, gather evidence, send a formal reconsideration letter to the insurer, and prepare your AFCA submission if needed. Fee is 15–25% of the recovered amount only, waived if denied.',
  },
];

const disputeTypes = [
  {
    title: 'Factual Dispute A: "Pre-Existing Damage"',
    how: 'Get an IICRC assessment specifically addressing whether damage is consistent with a sudden incident or pre-existing gradual deterioration. Provide before-and-after photos, BOM weather data, and neighbour testimony. In AFCA: your insurer bears the burden of proving pre-existence.',
  },
  {
    title: 'Factual Dispute B: "Wear and Tear / Lack of Maintenance"',
    how: 'Provide maintenance records. Get an IICRC assessment confirming the damage is consistent with a sudden event, not gradual failure. Distinguish: a fallen tree puncturing a roof is sudden (covered); a roof slowly leaking for 5 years is gradual (not covered).',
  },
  {
    title: 'Factual Dispute C: "Late Notification"',
    how: 'Provide timestamped evidence of your notification (email, portal, certified mail). If slightly late, argue the delay did not prejudice your insurer — they could still inspect fully. If they accepted the claim without immediately raising late notification, argue they waived the timeframe.',
  },
  {
    title: 'Factual Dispute D: "Failure to Mitigate"',
    how: 'Document all emergency measures you took (photos, receipts, contractor call logs, timeline). Your duty to mitigate is reasonable, not absolute. Your insurer must prove you acted unreasonably, not just that you didn\'t prevent all further damage.',
  },
  {
    title: 'Procedural Failure: Missed Deadline or Insufficient Reasons',
    how: 'Document the claim lodgement date, the 4-month ICA Code deadline, and when (or if) the insurer responded. Request detailed written reasons if not provided. AFCA can order compensation for Code breaches (typically $500–$2,000 for delays), separate from the claim amount.',
  },
];

export default function InsuranceClaimRejectedPage() {
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
        <section className="bg-gradient-to-br from-[#7f1d1d] to-[#b91c1c] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-red-200 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">Claim Rejected: What To Do</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Insurance Claim Rejected:<br />
              <span className="text-red-200">Your Rights and Next Steps</span>
            </h1>
            <p className="text-lg text-red-100 mb-6 max-w-2xl">
              Most rejections can be challenged successfully. Here is what to do in the next 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-red-700 font-bold rounded-lg hover:bg-red-50 transition-colors shadow-lg"
              >
                Get a Free Claim Review
              </Link>
              <a
                href="https://afca.org.au"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Lodge with AFCA →
              </a>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

          {/* Direct Answer */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Direct Answer</h2>
            <p className="text-gray-700 leading-relaxed">
              If your insurance claim has been rejected, you have rights — and most rejections can be
              challenged successfully. Get the rejection in writing, identify whether it is a legitimate
              policy exclusion (rarely disputable), a factual dispute (usually disputable with evidence),
              or a procedural failure (almost always disputable). Do not start repairs. Gather evidence:
              IICRC-certified independent assessment, BOM data, neighbour statements. Escalate to AFCA —
              free, independent, and binding on your insurer.
            </p>
          </section>

          {/* 48-Hour Action Plan */}
          <section aria-labelledby="action-heading">
            <h2 id="action-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Your 48-Hour Action Plan
            </h2>
            <div className="space-y-4">
              {actions.map(({ step, title, body }) => (
                <div key={step} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Action {step}: {title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dispute Types */}
          <section aria-labelledby="disputes-heading">
            <h2 id="disputes-heading" className="text-2xl font-bold text-gray-900 mb-4">
              How to Dispute Each Rejection Type
            </h2>
            <div className="space-y-4">
              {disputeTypes.map(({ title, how }) => (
                <details
                  key={title}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{title}</span>
                    <span className="text-red-600 text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">{how}</p>
                </details>
              ))}
            </div>
          </section>

          {/* AFCA Pathway */}
          <section aria-labelledby="afca-heading">
            <h2 id="afca-heading" className="text-2xl font-bold text-gray-900 mb-4">
              The AFCA Pathway: Your Free Escalation Route
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
              <p className="text-gray-700 text-sm">
                AFCA (Australian Financial Complaints Authority) is an independent, government-backed dispute
                resolution service. Free for consumers. Binding on your insurer. Not part of your
                insurance company.
              </p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">When to Escalate to AFCA</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Claim rejected, denied, or underpaid</li>
                  <li>Insurer delayed beyond 4 months without notification</li>
                  <li>Insurer breached the ICA Code of Practice</li>
                  <li>Insurer misled you about coverage or claim status</li>
                  <li>Insurer refused to reconsider despite new evidence</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How to Lodge</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Online:</strong>{' '}<a href="https://afca.org.au" target="_blank" rel="noopener noreferrer" className="text-[#0052CC] underline">afca.org.au</a> (recommended — creates automatic timestamp)</li>
                  <li><strong>By phone:</strong> 1800 931 678 (free call)</li>
                  <li><strong>By post:</strong> Australian Financial Complaints Authority, GPO Box 3, Melbourne VIC 3001</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What AFCA Can Order</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Full claim payment</li>
                  <li>Revised settlement amount</li>
                  <li>Independent re-assessment of damage</li>
                  <li>Compensation for non-financial loss: $500–$5,000 for distress and Code breaches</li>
                  <li>Interest on delayed payments</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ACL Rights */}
          <section aria-labelledby="acl-heading">
            <h2 id="acl-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights Under Australian Consumer Law
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  section: 'ACL s.29(1)(g)',
                  title: 'Misleading Conduct',
                  desc: 'Your insurer cannot make false statements about coverage, hide exclusions, or imply coverage that doesn\'t exist. If they misled you about what was covered when you bought the policy, you have a claim.',
                },
                {
                  section: 'ACL s.21',
                  title: 'Unconscionable Conduct',
                  desc: 'Your insurer cannot take advantage of your distress or vulnerability to pressure you into accepting a low settlement. If your home is destroyed and they pressure you while you\'re displaced, that is unconscionable conduct.',
                },
                {
                  section: 'ACL s.23',
                  title: 'Unfair Contract Terms',
                  desc: 'Terms in your insurance policy that create significant imbalance, are not reasonably expected, and cause you detriment are void. Your insurer cannot rely on a void term to deny your claim.',
                },
              ].map(({ section, title, desc }) => (
                <div key={section} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="text-xs bg-red-50 text-red-700 border border-red-100 px-2 py-1 rounded font-medium inline-block mb-3">
                    {section}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-700">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Immediate Checklist */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Immediate Next Steps Checklist</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Within 24 hours</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>□ Get rejection in writing</li>
                  <li>□ Identify rejection type</li>
                  <li>□ Take new photos of damage</li>
                  <li>□ Contact IICRC restorer, book assessment</li>
                  <li>□ Gather BOM weather data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Within 48 hours</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>□ Complete IICRC assessment</li>
                  <li>□ Gather neighbour statements</li>
                  <li>□ Collect receipts and maintenance records</li>
                  <li>□ Email insurer requesting detailed reasons</li>
                  <li>□ Contact NRPG for free review</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Within 1–2 weeks</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>□ Compile full evidence dossier</li>
                  <li>□ Send insurer reconsideration request</li>
                  <li>□ If insurer doesn&apos;t budge: lodge with AFCA</li>
                  <li>□ Await AFCA determination</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
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
            <h2 className="text-2xl font-bold mb-3">Free Rejection Review From NRPG</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Submit your rejection letter. NRPG will review within 48 hours and advise whether the
              rejection is disputable. No upfront fees. Fee is 15–25% of recovered amount only, waived
              if denial stands.
            </p>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#0052CC] font-bold text-lg rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Get Your Free Review →
            </Link>
            <p className="mt-6 text-blue-200 text-xs leading-relaxed max-w-2xl mx-auto">
              <strong>Privacy Collection Notice:</strong> Personal information is used solely to connect
              you with an IICRC-certified restoration contractor and to advocate for your insurance
              claim. Handled by NRPG in accordance with the Privacy Act 1988 (Cth) and Australian
              Privacy Principles. Data is stored in Australia.{' '}
              <Link href="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </section>

          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-bold text-gray-900 mb-4">Related Guides</h2>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/guides/how-to-make-an-insurance-claim-australia', label: 'How to Make an Insurance Claim in Australia', desc: 'Complete 8-step process' },
                { href: '/about/nrpg-expertise', label: 'NRPG Expertise: IICRC, ACL & Claims Advocacy', desc: 'How NRPG advocates for policyholders' },
                { href: '/guides/insurance/afca-complaint-guide', label: 'AFCA Complaint Guide', desc: 'Step-by-step AFCA process' },
              ].map(({ href, label, desc }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-2 text-[#0052CC] hover:underline">
                    <span className="font-medium">{label}</span>
                    <span className="text-gray-400 text-xs">— {desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
