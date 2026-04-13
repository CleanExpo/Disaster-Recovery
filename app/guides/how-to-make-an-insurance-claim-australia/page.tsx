import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Make an Insurance Claim in Australia: Complete 8-Step Guide | NRPG',
  description:
    'Step-by-step guide to making a property insurance claim in Australia. Covers notification, IICRC assessment, documentation, AFCA escalation, and your rights under Australian Consumer Law.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/how-to-make-an-insurance-claim-australia',
  },
  openGraph: {
    title: 'How to Make an Insurance Claim in Australia — 8-Step Guide',
    description:
      'Complete guide to property insurance claims in Australia. IICRC standards, AFCA dispute process, and your ACL rights.',
    url: 'https://disasterrecovery.com.au/guides/how-to-make-an-insurance-claim-australia',
    type: 'article',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Make an Insurance Claim in Australia',
  description:
    'Complete step-by-step guide to making an insurance claim in Australia, including documentation, notification, assessment, and dispute resolution.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Ensure Safety First',
      text: 'Before documenting damage, ensure your property is safe to enter. Contact emergency services if at immediate risk.',
    },
    {
      '@type': 'HowToStep',
      name: 'Document Everything Immediately',
      text: 'Take photos and video of all damage, create a written inventory, and preserve evidence including receipts and weather data.',
    },
    {
      '@type': 'HowToStep',
      name: 'Notify Your Insurer Within Policy Timeframes',
      text: 'Notify in writing (email or certified post) within 24–48 hours, including policy number, date of incident, and damage description.',
    },
    {
      '@type': 'HowToStep',
      name: 'Get an Independent IICRC-Certified Damage Assessment',
      text: 'Obtain an assessment from an IICRC-certified professional to provide an objective, credible damage scope and cost estimate.',
    },
    {
      '@type': 'HowToStep',
      name: 'Complete Your Insurer\'s Claim Form and Submit Full Documentation',
      text: 'Complete the claim form and submit with all supporting documents: photos, assessment, inventory, receipts, and weather data.',
    },
    {
      '@type': 'HowToStep',
      name: 'Track All Communication in Writing',
      text: 'From this point, communicate with your insurer only in writing (email or certified post) to create a documented record.',
    },
    {
      '@type': 'HowToStep',
      name: 'Wait for Assessment and Formal Response',
      text: 'Your insurer must acknowledge within 10 business days and decide within 4 months under the ICA Code of Practice.',
    },
    {
      '@type': 'HowToStep',
      name: 'If Your Claim Is Disputed, Escalate to AFCA',
      text: 'If denied, underpaid, or delayed, escalate to AFCA (Australian Financial Complaints Authority) at no cost.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does an insurance claim take in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most claims are decided within 4 months under the ICA General Insurance Code of Practice. Simple claims may be resolved within 2–4 weeks. Your insurer must acknowledge within 10 business days and must notify you if the claim requires extended assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I choose my own repairer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you have the legal right to select your own repairer, even if your insurer has preferred contractors. Check your policy for any clauses requiring an insurer-nominated repairer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my insurer underpays my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can dispute underpayment in AFCA. Provide an independent IICRC-certified assessment showing the actual cost of repairs. AFCA will order revised payment if your assessment is more reasonable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is AFCA really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, AFCA is completely free. It is funded by the financial services industry, not by consumers. You pay no fee to lodge a complaint or have AFCA investigate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ICA Code of Practice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Insurance Council of Australia General Insurance Code of Practice is a voluntary industry code that sets minimum standards for claims handling: responding within 10 days, deciding within 4 months, treating consumers fairly, and providing written reasons for decisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is IICRC certification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC stands for the Institute of Inspection, Cleaning and Restoration Certification. IICRC-certified professionals are trained in industry standard methodologies for restoring property damage (water, fire, mold, smoke). IICRC certification is recognized by insurers and courts as objective and credible.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim for mold after a flood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, if the mold is caused by the flood. Under IICRC standards, proper drying is required to prevent mold. If your insurer failed to ensure proper drying and mold developed as a result, they are liable for remediation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if my home is uninhabitable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You are not obligated to stay in an uninhabitable home. Most policies cover temporary accommodation (hotel, rental) while repairs are done. Claim these costs as part of your insurance claim with supporting invoices.',
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
      name: 'How to Make an Insurance Claim in Australia',
      item: 'https://disasterrecovery.com.au/guides/how-to-make-an-insurance-claim-australia',
    },
  ],
};

const steps = [
  {
    num: '1',
    title: 'Ensure Safety First',
    body: 'Before documenting damage, ensure your property is safe to enter. If structural damage is severe, flooding is ongoing, or there is electrical hazard, do not enter the property. Contact emergency services (000) if anyone is at immediate risk. Wait for official all-clear from local authorities before proceeding.',
  },
  {
    num: '2',
    title: 'Document Everything Immediately',
    body: 'Take photos and video of all damage — exterior wide shots and close-ups, all affected interior rooms, contents damage, and evidence of the cause (fallen trees, water lines, burn patterns). Create a written inventory of all damaged items with estimated replacement costs, receipts, and model numbers. Keep damaged items and preserve all evidence.',
  },
  {
    num: '3',
    title: 'Notify Your Insurer Within Policy Timeframes',
    body: 'Most policies require written notification within 24–48 hours. Email or send certified mail — never rely on phone calls alone. Include your policy number, date and time of incident, type of damage, and brief description. Request written acknowledgment of your notification and keep copies of everything.',
  },
  {
    num: '4',
    title: 'Get an Independent IICRC-Certified Damage Assessment',
    body: 'Do not rely solely on your insurer\'s assessment. Search the IICRC directory at iicrc.org for certified restorers in your area. The assessment should include detailed damage scope, water categories or smoke classification, recommended repair methodology per IICRC standards (S500, S520, or S700), estimated replacement cost, and any secondary damage risks.',
  },
  {
    num: '5',
    title: 'Complete Your Insurer\'s Claim Form and Submit Documentation',
    body: 'Submit your claim form with all supporting documents: organised photos and video, IICRC damage assessment, written inventory, receipts and credit card statements, Bureau of Meteorology weather data (for weather events), proof of notification, and any repair quotes. Use your insurer\'s online portal if available. Do not start repairs before claim approval.',
  },
  {
    num: '6',
    title: 'Track All Communication in Writing',
    body: 'From this point forward, communicate with your insurer only in writing. After any phone call, send an email summarising what was discussed. Document all claims officer names, reference numbers, timelines promised, and any changes to your claim status. Keep all documents organised in a dated folder and back up to cloud storage.',
  },
  {
    num: '7',
    title: 'Wait for Assessment and Formal Response',
    body: 'Under the ICA General Insurance Code of Practice: your insurer must acknowledge within 10 business days, and must decide most claims within 4 months. They must notify you in writing if the claim requires extended assessment. You can request a copy of any assessment or report your insurer commissions. Request to be present at any insurer-arranged inspection.',
  },
  {
    num: '8',
    title: 'Escalate to AFCA if Denied, Underpaid, or Delayed',
    body: 'The Australian Financial Complaints Authority (AFCA) provides free, binding dispute resolution. Lodge online at afca.org.au or call 1800 931 678. Provide your policy number, claim number, explanation of dispute, and all supporting documentation. AFCA can order full payment, revised assessment, or compensation for non-financial loss (distress, breach of Code).',
  },
];

const denialReasons = [
  {
    title: '"Not Covered Under Your Policy Type"',
    response: 'Request your Product Disclosure Statement. If the exclusion is clear, the dispute won\'t succeed. If policy wording is ambiguous, argue the ambiguity should be interpreted in your favour (consumer-friendly interpretation). Consider whether a different policy class might cover the loss.',
  },
  {
    title: '"Pre-Existing Damage"',
    response: 'Provide before-and-after photos, an IICRC assessment distinguishing pre-existing from new damage, BOM weather data, and neighbour testimony. In AFCA, your insurer bears the burden of proving pre-existence — not you.',
  },
  {
    title: '"Wear and Tear / Lack of Maintenance"',
    response: 'Provide maintenance records, an IICRC assessment documenting sudden accidental damage, and expert testimony from a building inspector. In AFCA, argue that sudden, accidental damage is covered — not gradual deterioration — and your insurer must prove poor maintenance directly caused this specific damage.',
  },
  {
    title: '"Late Notification"',
    response: 'Provide evidence of your notification date and time. If outside the timeframe, argue the delay did not prejudice your insurer: they could still inspect, received full documentation, and the loss did not deteriorate further. In AFCA, argue waiver if your insurer accepted the claim without immediately raising late notification.',
  },
  {
    title: '"Underinsurance"',
    response: 'Obtain an independent valuation from a licensed valuer showing current replacement cost. Submit this to dispute the insurer\'s estimate. If the insurer actively misled you about the appropriate sum insured, consider an ACL claim for misleading conduct.',
  },
];

export default function HowToMakeInsuranceClaimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
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
        <section className="bg-gradient-to-br from-[#1e3a5f] to-[#0052CC] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-blue-200 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">How to Make an Insurance Claim</li>
              </ol>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              How to Make an Insurance Claim in Australia
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              Complete 8-step guide. Covers documentation, IICRC assessment, insurer obligations,
              and your free escalation path through AFCA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0052CC] font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Register Your Claim Now
              </Link>
              <Link
                href="/guides/insurance-claim-rejected-what-to-do"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Claim Rejected? →
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

          {/* Direct Answer */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Direct Answer</h2>
            <p className="text-gray-700 leading-relaxed">
              To make an insurance claim in Australia, notify your insurer in writing within 24–48 hours,
              document all damage with photos and video, obtain an independent IICRC-certified damage
              assessment, complete your insurer&apos;s claim form with supporting evidence, and track all
              communication in writing. If your claim is disputed or denied, escalate to the Australian
              Financial Complaints Authority (AFCA) at no cost. Under the ICA General Insurance Code of
              Practice, your insurer must acknowledge within 10 business days and decide within 4 months.
            </p>
          </section>

          {/* 8 Steps */}
          <section aria-labelledby="steps-heading">
            <h2 id="steps-heading" className="text-2xl font-bold text-gray-900 mb-6">
              The 8-Step Claim Process
            </h2>
            <div className="space-y-4">
              {steps.map(({ num, title, body }) => (
                <div key={num} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0052CC] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Step {num}: {title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* IICRC Standards */}
          <section aria-labelledby="iicrc-heading">
            <h2 id="iicrc-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Why IICRC Standards Matter to Your Claim
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  code: 'S500:2025',
                  label: 'Water Damage',
                  desc: 'Defines water categories (clean, grey, black), drying procedures, and what qualifies as secondary damage. If your insurer denies mold caused by water damage, S500 establishes that proper drying was required.',
                },
                {
                  code: 'S520:2025',
                  label: 'Mold Remediation',
                  desc: 'Distinguishes mold caused by water damage (covered) from mold caused by poor ventilation (may be excluded). Defines scope of containment, remediation, and verification required.',
                },
                {
                  code: 'S700:2025',
                  label: 'Fire & Smoke',
                  desc: 'Defines smoke damage categories and odour assessment. Specifies cleaning and restoration procedures. Prevents insurers claiming smoke odour is "cosmetic" or will "naturally dissipate."',
                },
              ].map(({ code, label, desc }) => (
                <div key={code} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="text-xs bg-blue-50 text-[#0052CC] border border-blue-100 px-2 py-1 rounded font-medium inline-block mb-3">
                    IICRC {code}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{label}</h3>
                  <p className="text-sm text-gray-700">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Common Denial Reasons */}
          <section aria-labelledby="denials-heading">
            <h2 id="denials-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Common Denial Reasons — And How to Respond
            </h2>
            <div className="space-y-4">
              {denialReasons.map(({ title, response }) => (
                <details
                  key={title}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{title}</span>
                    <span className="text-[#0052CC] text-xl font-light flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">{response}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Your Legal Rights */}
          <section aria-labelledby="rights-heading">
            <h2 id="rights-heading" className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights Under Australian Law
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">ICA General Insurance Code of Practice</h3>
                <p className="text-sm text-gray-700 mb-2">Your insurer must:</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Acknowledge your claim within 10 business days</li>
                  <li>Decide within 4 months (or notify you if the claim is complex)</li>
                  <li>Respond to all communications within 10 business days</li>
                  <li>Provide written reasons if your claim is denied or reduced</li>
                  <li>Allow you to provide additional evidence</li>
                  <li>Treat you fairly and not mislead you</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Australian Consumer Law (ACL)</h3>
                <p className="text-sm text-gray-700">
                  Insurers cannot make false or deceptive statements about coverage (s.29(1)(g)),
                  engage in unconscionable conduct (s.21), or include unfair contract terms (s.23).
                  Breaches can be taken to AFCA or the ACCC.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">AFCA — Free Dispute Resolution</h3>
                <p className="text-sm text-gray-700">
                  If your claim is denied, underpaid, or delayed, lodge a complaint at{' '}
                  <a href="https://afca.org.au" target="_blank" rel="noopener noreferrer" className="text-[#0052CC] underline">
                    afca.org.au
                  </a>{' '}
                  or call <strong>1800 931 678</strong>. AFCA is free for consumers and binding on insurers.
                  AFCA can order full payment, revised assessment, or compensation for non-financial loss.
                </p>
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
            <h2 className="text-2xl font-bold mb-3">Need Help With Your Claim?</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              NRPG advocates for policyholders from first contact through AFCA resolution. Independent
              IICRC assessment arranged within 48 hours. No upfront fees — paid only if you recover.
            </p>
            <Link
              href="/claim"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#0052CC] font-bold text-lg rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Your Claim →
            </Link>
            <p className="mt-6 text-blue-200 text-xs leading-relaxed max-w-2xl mx-auto">
              <strong>Privacy Collection Notice:</strong> Personal information is used solely to connect
              you with an IICRC-certified restoration contractor and to advocate for your insurance
              claim. Handled by NRPG in accordance with the Privacy Act 1988 (Cth) and Australian
              Privacy Principles. Data is stored in Australia.{' '}
              <Link href="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </section>

          {/* Related */}
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-bold text-gray-900 mb-4">Related Guides</h2>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/guides/insurance-claim-rejected-what-to-do', label: 'Insurance Claim Rejected? What To Do', desc: '48-hour action plan, AFCA escalation' },
                { href: '/about/nrpg-expertise', label: 'NRPG Expertise: IICRC, ACL & Claims Advocacy', desc: 'How NRPG advocates for policyholders' },
                { href: '/guides/insurance/afca-complaint-guide', label: 'AFCA Complaint Guide', desc: 'Step-by-step process for free dispute resolution' },
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
