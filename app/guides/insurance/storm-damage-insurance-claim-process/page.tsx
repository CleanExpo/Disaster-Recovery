import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Storm Damage Insurance Claim Process Australia',
  description: 'Step-by-step guide to lodging and winning a storm insurance claim in Australia. IICRC-certified documentation to counter insurer underpayment.',
  keywords: 'storm damage insurance claim, storm insurance claim process, Australia, IICRC certified, AFCA escalation',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/insurance/storm-damage-insurance-claim-process' },
};

export default function StormDamageInsuranceClaimProcessPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does a storm insurance claim take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under the General Insurance Code of Practice, your insurer must respond within 10 business days of receiving all required information. However, storm claims — particularly total loss or major structural damage claims — often take 4–12 weeks from lodgement to final payment. Having comprehensive IICRC-certified documentation ready from the outset is the single most effective way to reduce delays and dispute timeframes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if the insurer says my storm damage is pre-existing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '"Pre-existing damage" is the most common reason insurers use to reduce storm claim payouts. Your insurer bears the burden of proof for this exclusion. Counter it with timestamped pre-storm photos (from Google Street View, real estate listings, or your own records), a scope of works from an IICRC-certified contractor identifying storm-specific damage patterns (directional impact, wind-driven water ingress), and if necessary, an independent building report. If the dispute continues, lodge with AFCA.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I choose my own repairer for a storm insurance claim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Under the Insurance Contracts Act and the General Insurance Code of Practice, you have the right to use a repairer of your choice. Your insurer may recommend their own preferred contractors, but you are not required to use them. If you use an IICRC-certified contractor through the Disaster Recovery platform, they produce documentation that meets insurer requirements — reducing the risk of disputes over whether work was completed to the required standard.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I escalate my storm insurance claim to AFCA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Escalate to AFCA if your insurer: denies your claim and you disagree with the reason; accepts your claim but the settlement offer is lower than your documented costs; delays beyond the timeframes set in the General Insurance Code of Practice; or fails to respond to your formal dispute (Internal Dispute Resolution). You must lodge with AFCA within 2 years of the original claim decision. AFCA is free and binding on insurers — policyholders who provide IICRC-certified documentation have significantly higher dispute success rates.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="stormclaim-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance"
        title="Storm Damage Insurance Claim Process"
        subtitle="Step-by-step guide to lodging and winning"
        gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
        icon={<Shield className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Storm Damage Insurance Claim Process' },
        ]}
        sections={[
          {
            heading: 'The Storm Insurance Claim Process — Step by Step',
            body: (
              <>
                <p>
                  Storm claims are the most frequently disputed insurance claims in Australia.
                  Insurers deploy 72-hour response teams after major weather events — teams whose
                  job is to assess and, where possible, narrow the scope of payouts. Understanding
                  the process and building your evidence from the first hour gives you the best
                  chance of a full settlement.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 1 — Emergency make-safe:</strong> Before anything else, make your
                    property safe and prevent further damage. Tarp damaged roofing, board up broken
                    windows, and extract any standing water. Most policies require you to take
                    reasonable steps to mitigate loss — failure to do so can give your insurer
                    grounds to reduce your claim. Keep all receipts for make-safe costs; these are
                    typically claimable.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 2 — Evidence documentation before cleanup:</strong> Photograph and
                    video every area of damage before cleaning, moving debris, or engaging
                    tradespeople. Capture directional damage patterns (wind and rain entry points),
                    water ingress tracks on walls and ceilings, damaged roofing, fencing, and
                    contents. Timestamp all footage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 3 — Lodge your claim within 72 hours:</strong> Contact your
                    insurer by phone or their online portal as soon as reasonably possible. Provide
                    your policy number, a description of the event and initial photos. Early
                    lodgement secures your place in the assessment queue — critical after major
                    events when assessor availability is stretched.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 4 — Insurer-appointed assessor visit:</strong> Your insurer will
                    send a loss assessor to inspect your property. This assessor works for the
                    insurer, not you — they are incentivised to narrow the scope of works. Prepare
                    your own IICRC-certified scope of works documentation before this visit to
                    counter any underscoping.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 5 — Scope agreed or disputed:</strong> If your scope aligns with
                    the insurer&apos;s assessment, works proceed. If you disagree with the
                    insurer&apos;s scope or valuation, lodge a formal dispute through their
                    Internal Dispute Resolution (IDR) process — this is the required step before
                    escalating to AFCA.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Steps 6–8 — Builder/contractor appointed, works completed, final
                    sign-off:</strong> Once the scope is agreed, restoration work is scheduled and
                    completed. Ensure your contractor provides a completion report with final
                    inspection sign-off before you accept settlement.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What Insurers Dispute and How to Counter It',
            body: (
              <>
                <p>
                  After major storm events, certain dispute categories appear repeatedly. Knowing
                  them in advance — and building your documentation to pre-empt them — significantly
                  improves your settlement outcome.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Pre-existing damage:</strong> Insurers frequently attribute storm
                    damage to pre-existing deterioration. Counter with timestamped pre-storm
                    photos, real estate listing images, Google Street View history, and an
                    IICRC-certified contractor scope identifying storm-specific damage patterns
                    such as directional wind impact and wind-driven water ingress.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Maintenance exclusion:</strong> Policies typically exclude damage
                    arising from lack of maintenance — for example, old or cracked roof tiles that
                    failed during a storm. Your insurer must prove the exclusion applies; it does
                    not apply simply because a component is aged. A professional building report
                    identifying the storm event as the proximate cause strengthens your position.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Gradual deterioration exclusion:</strong> This exclusion applies to
                    damage that built up over time rather than from a sudden event. If your damage
                    is clearly storm-caused (broken tiles, structural movement, water ingress
                    correlated with the storm event), document the sudden onset and the specific
                    weather event date with Bureau of Meteorology data.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Our IICRC-certified contractors provide independent scope documentation prepared
                  to the standard insurers and AFCA adjudicators rely on. This documentation may
                  support your claim, though outcomes cannot be guaranteed.
                </p>
              </>
            ),
          },
          {
            heading: 'Escalating Through AFCA',
            body: (
              <>
                <p>
                  The Australian Financial Complaints Authority (AFCA) is the external dispute
                  resolution body for insurance disputes in Australia. It is free to use, and its
                  determinations are binding on insurers. Understanding the escalation pathway
                  gives you leverage even before you need to use it.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Complete Internal Dispute Resolution (IDR) first:</strong> Before
                    lodging with AFCA, you must have raised a formal dispute with your insurer and
                    either received their final decision or waited 30 days without resolution.
                    Keep all written correspondence.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Lodge within 2 years:</strong> AFCA accepts complaints lodged within
                    2 years of the insurer&apos;s final decision on your claim. Do not delay
                    if you believe you have been underpaid.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>IICRC documentation in AFCA disputes:</strong> Total loss and major
                    structural damage disputes significantly favour policyholders who provide
                    IICRC-certified scope of works documentation. AFCA adjudicators assess whether
                    the insurer&apos;s scope and valuation were reasonable — an independent
                    certified scope provides the benchmark.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Urgency provisions:</strong> AFCA has urgency provisions for
                    claimants who are displaced from their home, experiencing financial hardship,
                    or whose property poses an ongoing safety risk. Request urgent consideration
                    at lodgement if these apply to you.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How long does a storm insurance claim take?',
            answer:
              'Under the General Insurance Code of Practice, your insurer must respond within 10 business days of receiving all required information. However, storm claims — particularly total loss or major structural damage claims — often take 4–12 weeks from lodgement to final payment. Having comprehensive IICRC-certified documentation ready from the outset is the single most effective way to reduce delays and dispute timeframes.',
          },
          {
            question: 'What if the insurer says my storm damage is pre-existing?',
            answer:
              '"Pre-existing damage" is the most common reason insurers use to reduce storm claim payouts. Your insurer bears the burden of proof for this exclusion. Counter it with timestamped pre-storm photos (from Google Street View, real estate listings, or your own records), a scope of works from an IICRC-certified contractor identifying storm-specific damage patterns (directional impact, wind-driven water ingress), and if necessary, an independent building report. If the dispute continues, lodge with AFCA.',
          },
          {
            question: 'Can I choose my own repairer for a storm insurance claim?',
            answer:
              'Yes. Under the Insurance Contracts Act and the General Insurance Code of Practice, you have the right to use a repairer of your choice. Your insurer may recommend their own preferred contractors, but you are not required to use them. If you use an IICRC-certified contractor through the Disaster Recovery platform, they produce documentation that meets insurer requirements — reducing the risk of disputes over whether work was completed to the required standard.',
          },
          {
            question: 'When should I escalate my storm insurance claim to AFCA?',
            answer:
              'Escalate to AFCA if your insurer: denies your claim and you disagree with the reason; accepts your claim but the settlement offer is lower than your documented costs; delays beyond the timeframes set in the General Insurance Code of Practice; or fails to respond to your formal dispute (Internal Dispute Resolution). You must lodge with AFCA within 2 years of the original claim decision. AFCA is free and binding on insurers — policyholders who provide IICRC-certified documentation have significantly higher dispute success rates.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Document Storm Damage for Insurance',
            href: '/guides/insurance/document-storm-damage-insurance',
            description: 'How to photograph and document storm damage to support your claim.',
          },
          {
            title: 'Insurance Claim Denial Rights',
            href: '/guides/insurance/insurance-claim-denial-rights',
            description: 'Your legal rights when an insurer denies or underpays your claim.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an insurance dispute with AFCA.',
          },
          {
            title: 'Storm Damage Restoration Cost Guide',
            href: '/guides/cost-guides/how-much-storm-damage-restoration-cost',
            description: 'What storm damage restoration costs in Australia in 2025.',
          },
        ]}
        cta={{ text: 'Lodge Your Claim Now', href: '/claim' }}
      />
    </>
  );
}
