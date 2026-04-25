import { Metadata } from 'next';
import Script from 'next/script';
import { PipetteIcon } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { INSURANCE_GUIDE_AUTHOR } from '@/lib/guide-authors';

export const metadata: Metadata = {
  title: 'Burst Pipe Insurance Claim Australia — What Is Covered & What to Do',
  description:
    'Understand what Australian insurance policies cover for burst pipe water damage, how to document your claim, and how to maximise your settlement. Includes steps for sudden vs gradual leak disputes.',
  keywords: [
    'burst pipe insurance claim Australia',
    'burst pipe water damage insurance',
    'does insurance cover burst pipes',
    'burst pipe home insurance Australia',
    'leaking pipe insurance claim',
    'sudden water damage insurance',
    'gradual damage insurance denial',
    'burst pipe what to do Australia',
    'water damage insurance payout',
    'burst pipe restoration claim',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/insurance/burst-pipe-insurance-claim',
  },
  openGraph: {
    title: 'Burst Pipe Insurance Claim Australia — What Is Covered & What to Do',
    description:
      'Step-by-step guide to lodging a burst pipe insurance claim in Australia. What is covered, how to document damage, and how to dispute a denial.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Burst Pipe Insurance Claim Australia — What Is Covered & What to Do',
  description:
    'A complete guide to burst pipe water damage insurance claims in Australia — coverage, documentation, gradual leak disputes, and settlement maximisation.',
  author: {
    '@type': 'Person',
    name: INSURANCE_GUIDE_AUTHOR.name,
    jobTitle: INSURANCE_GUIDE_AUTHOR.jobTitle,
    hasCredential: INSURANCE_GUIDE_AUTHOR.credentials?.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c,
    })),
    memberOf: {
      '@type': 'Organization',
      name: 'Disaster Recovery',
      url: 'https://disasterrecovery.com.au',
    },
  },
  publisher: {
    '@type': 'Organization',
    name: 'Disaster Recovery',
    url: 'https://disasterrecovery.com.au',
    logo: {
      '@type': 'ImageObject',
      url: 'https://disasterrecovery.com.au/images/antigravity/dr-logo.webp',
    },
  },
  datePublished: '2025-08-01',
  dateModified: '2026-04-10',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://disasterrecovery.com.au/guides/insurance/burst-pipe-insurance-claim',
  },
  articleSection: 'Insurance',
  inLanguage: 'en-AU',
  isAccessibleForFree: true,
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does home insurance cover burst pipe water damage in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — most Australian home and contents policies cover sudden and accidental water damage from burst pipes, including damage to flooring, walls, ceilings, and contents. The key distinction is "sudden" versus "gradual" damage. A pipe that fails suddenly is covered; a slow leak that caused damage over weeks or months may be denied as gradual deterioration. Check your Product Disclosure Statement under "Defined Events" or "Water Damage" inclusions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between sudden and gradual water damage for insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sudden damage is an unexpected, single event — a pipe that bursts due to pressure, freezing, or a fitting failure. Gradual damage is water that has been seeping slowly over time, often showing signs of staining, mould, or rot that the homeowner should have noticed. Insurers commonly deny claims as "gradual" to avoid paying. If you believe the damage was sudden and the gradual leak characterisation is wrong, dispute it — request the specific evidence the insurer used to reach that conclusion.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do first when a pipe bursts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'First, shut off the main water supply valve immediately to stop ongoing water flow. Then photograph all damage thoroughly before moving anything or cleaning up. Next, contact an IICRC-certified water damage restoration contractor — emergency extraction must begin within hours to prevent mould. Notify your insurer as soon as practicable. Do not attempt major repairs before lodging a claim and having the damage inspected.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will insurance cover the cost of the plumber to fix the burst pipe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Australian policies cover the resulting water damage but not the cost of repairing the pipe itself — that is considered maintenance. Some policies include "Fusion" cover or "Accidental Damage" extensions that may cover the pipe repair. Check your PDS carefully. NRPG handles the water damage restoration; you will need a separate licensed plumber for the pipe repair.',
      },
    },
    {
      '@type': 'Question',
      name: 'My insurer says the pipe damage was gradual — how do I dispute this?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Request a full written explanation of the insurer's decision including the specific evidence (e.g., assessor report, photographs, moisture readings) used to classify the damage as gradual. If the damage was genuinely sudden, your licensed plumber's report and IICRC restoration contractor's documentation may contradict the insurer's assessment. Lodge an Internal Dispute Resolution (IDR) complaint in writing. If unresolved within 30 days, escalate to AFCA (Australian Financial Complaints Authority) — free, binding on insurers.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I maximise a burst pipe insurance payout?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Document all damage thoroughly before any cleanup. Obtain IICRC-certified assessment and restoration work — insurers take certified documentation seriously. Create a detailed contents inventory with photographs, purchase receipts, and replacement cost quotes. Do not accept a settlement before the full scope of structural damage is confirmed by drying logs and moisture readings — hidden damage inside walls often manifests weeks later. If offered a cash settlement, understand your right to choose managed repairs instead under your policy.',
      },
    },
  ],
};

export default function BurstPipeInsuranceClaimPage() {
  return (
    <>
      <Script
        id="burst-pipe-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="burst-pipe-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance"
        title="Burst Pipe Insurance Claim — What Is Covered & What to Do"
        subtitle="Understand what Australian home insurance covers for burst pipe water damage, how to document your claim, and how to dispute a gradual leak denial."
        gradient="linear-gradient(135deg, #1E3A5F 0%, #0EA5E9 100%)"
        icon={<PipetteIcon className="h-10 w-10" />}
        lastReviewed="2026-04-10"
        author={INSURANCE_GUIDE_AUTHOR}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance Claims', href: '/guides/insurance' },
          { label: 'Burst Pipe Insurance Claim' },
        ]}
        sections={[
          {
            heading: 'Is Burst Pipe Damage Covered by Australian Home Insurance?',
            body: (
              <div className="space-y-4 text-gray-300">
                <p>
                  Most Australian home and contents policies cover water damage caused by a burst
                  pipe as a "defined event" under the policy. This typically includes damage to
                  flooring, walls, ceilings, built-in cabinetry, and contents.
                </p>
                <p>
                  The critical distinction insurers draw is between{' '}
                  <strong className="text-white">sudden and accidental</strong> damage versus{' '}
                  <strong className="text-white">gradual deterioration</strong>. A pipe that fails
                  without warning is sudden. A pipe that has been slowly seeping behind a wall for
                  months — causing damage that built up gradually — may be denied as gradual damage
                  or poor maintenance.
                </p>
                <div
                  style={{
                    background: 'rgba(14,165,233,0.1)',
                    border: '1px solid rgba(14,165,233,0.25)',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                  }}
                >
                  <strong className="text-white block mb-2">
                    What burst pipe policies typically cover:
                  </strong>
                  <ul className="text-sm space-y-1 list-disc list-inside text-gray-300">
                    <li>Water damage to flooring (carpet, timber, tiles)</li>
                    <li>Water damage to walls and ceilings (plasterboard, plaster, paint)</li>
                    <li>Damaged or destroyed contents</li>
                    <li>Mould remediation resulting from the burst pipe event</li>
                    <li>Emergency make-safe including water extraction and drying</li>
                    <li>Temporary accommodation if the property is uninhabitable</li>
                  </ul>
                  <strong className="text-white block mt-3 mb-2">
                    What is typically NOT covered:
                  </strong>
                  <ul className="text-sm space-y-1 list-disc list-inside text-gray-300">
                    <li>The cost of repairing or replacing the burst pipe itself</li>
                    <li>Gradual or slow leaks that built up over time</li>
                    <li>Damage resulting from lack of maintenance</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            heading: 'What to Do When a Pipe Bursts',
            body: (
              <ol className="space-y-3">
                {[
                  {
                    n: '1',
                    title: 'Shut off the main water supply immediately',
                    body: 'Locate the main water shut-off valve (usually in the meter box, under the sink, or near the hot water system) and close it. This stops ongoing water flow and limits the spread of damage.',
                  },
                  {
                    n: '2',
                    title: 'Document all damage before touching anything',
                    body: 'Photograph every affected area — walls, floors, ceilings, contents — before you mop up, move furniture, or begin any cleanup. This photographic record is essential for your insurance claim and cannot be recreated.',
                  },
                  {
                    n: '3',
                    title: 'Lodge an emergency claim with a certified contractor',
                    body: 'Contact an IICRC-certified water damage restoration contractor immediately. Emergency extraction must begin within hours to prevent mould growth. Do not wait for insurance approval.',
                  },
                  {
                    n: '4',
                    title: 'Notify your insurer as soon as practicable',
                    body: "Call your insurer's claims line. Advise that you are commencing emergency make-safe to prevent escalating damage. Provide photographs of the undisturbed damage state.",
                  },
                  {
                    n: '5',
                    title: 'Get the plumber to inspect and document the failure point',
                    body: "Your licensed plumber's written report identifying the cause of the pipe failure (age of pipe, pressure failure, corrosion, physical damage) is valuable evidence if the insurer attempts to classify the damage as gradual.",
                  },
                ].map((step) => (
                  <li
                    key={step.n}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '0.5rem',
                      listStyle: 'none',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        background: '#0369A1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: '#fff',
                        fontSize: '0.85rem',
                      }}
                    >
                      {step.n}
                    </span>
                    <div>
                      <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>
                        {step.title}
                      </strong>
                      <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{step.body}</span>
                    </div>
                  </li>
                ))}
              </ol>
            ),
          },
          {
            heading: '"Gradual Damage" Denials — How to Fight Back',
            body: (
              <div className="space-y-4 text-gray-300">
                <p>
                  "Gradual damage" is one of the most common reasons insurers deny water damage
                  claims. If your insurer asserts the damage was gradual rather than sudden, you are
                  entitled to dispute this.
                </p>
                <p>
                  <strong className="text-white">Request the evidence in writing.</strong> Ask for
                  the specific assessor report, photographs, moisture readings, or engineering
                  opinion the insurer relied on to reach the gradual damage conclusion. This is your
                  right under the General Insurance Code of Practice.
                </p>
                <p>Counter-evidence that helps your case:</p>
                <ul className="text-sm space-y-2 list-disc list-inside text-gray-400">
                  <li>
                    Licensed plumber&apos;s report identifying a specific failure point (e.g.,
                    failed O-ring, corrosion fracture, joint failure).
                  </li>
                  <li>
                    IICRC restoration contractor&apos;s assessment showing acute moisture patterns
                    consistent with a sudden event rather than slow saturation.
                  </li>
                  <li>
                    Property inspection records, recent renovation photographs, or maintenance
                    records showing no prior evidence of a leak.
                  </li>
                  <li>
                    Water bill records — a gradual leak significant enough to cause building damage
                    would typically show elevated water consumption over time.
                  </li>
                </ul>
                <p>
                  If your IDR complaint is unsuccessful, escalate to AFCA. AFCA has resolved many
                  gradual-versus-sudden disputes in favour of policyholders where the insurer&apos;s
                  evidence was inadequate.
                </p>
              </div>
            ),
          },
          {
            heading: 'Maximising Your Burst Pipe Payout',
            body: (
              <div className="space-y-3 text-gray-300">
                <p>
                  The settlement offered by your insurer may not reflect the true cost of
                  restoration. To maximise your claim outcome:
                </p>
                <ul className="space-y-2 text-sm list-disc list-inside text-gray-400">
                  <li>
                    Do not accept a cash settlement before the full scope of structural damage is
                    confirmed. Hidden moisture inside walls, under flooring, and in insulation often
                    becomes visible only after drying is complete.
                  </li>
                  <li>
                    Obtain IICRC-certified drying logs and moisture readings as the basis for your
                    scope of works. Insurers take these seriously.
                  </li>
                  <li>
                    Document all contents losses with photographs, purchase receipts, serial
                    numbers, and replacement cost quotes — not just the original purchase price.
                  </li>
                  <li>
                    Understand depreciation — policies may apply depreciation to older contents. Ask
                    whether your policy covers replacement cost or indemnity (depreciated) value.
                  </li>
                  <li>
                    You have the right to seek a second opinion on the scope of damage if you
                    disagree with the insurer&apos;s assessor.
                  </li>
                </ul>
              </div>
            ),
          },
        ]}
        faqs={faqSchema.mainEntity.map((faq) => ({
          question: faq.name,
          answer: faq.acceptedAnswer.text,
        }))}
        relatedGuides={[
          {
            title: 'Document Water Damage for Insurance',
            href: '/guides/insurance/document-water-damage-insurance',
            description:
              'Step-by-step guide to photographing and documenting water damage for your claim.',
          },
          {
            title: 'Should I Take a Payout?',
            href: '/guides/insurance/should-i-take-a-payout',
            description:
              'Cash settlement vs managed repairs — which option is better for your situation?',
          },
          {
            title: 'Insurance Depreciation on Water Damage',
            href: '/guides/insurance/insurance-depreciation-water-damage',
            description:
              'How depreciation affects your payout and strategies to maximise your settlement.',
          },
          {
            title: 'When Your Insurer Delays Your Claim',
            href: '/guides/insurance/insurer-delays-your-claim',
            description: 'GICP timeframes and how to escalate delays to AFCA.',
          },
          {
            title: 'Emergency Water Extraction',
            href: '/services/emergency-water-extraction',
            description: 'Lodge an emergency claim for immediate professional water extraction.',
          },
        ]}
        cta={{ text: 'Start Your Claim', href: '/claim' }}
      />
    </>
  );
}
