import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Total Loss vs Partial Loss Insurance — What It Means for Your Claim',
  description:
    'Understand the difference between total loss and partial loss insurance claims in Australia. How insurers assess, what you\'re entitled to, and how to dispute a partial loss decision.',
  alternates: {
    canonical: `${NAP.url}/guides/insurance/total-loss-vs-partial-loss-insurance`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  '@id': `${NAP.url}/#organization`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Total Loss and Partial Loss Insurance Claims Support',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Total Loss and Partial Loss Insurance Assessment',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Total Loss and Partial Loss Insurance Assessment',
  description:
    'Independent IICRC-certified scope assessments and replacement cost estimates for total loss and partial loss insurance claims. Supporting policyholders through AFCA dispute processes and insurer negotiations in Australia.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between total loss and partial loss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A total loss occurs when the cost to repair the property equals or exceeds the sum insured, or when the repair cost exceeds approximately 80% of the property\'s replacement value — making rebuild the more economical outcome. A partial loss is where the property is repairable within the sum insured. The distinction determines which policy provisions apply: total loss triggers replacement value or indemnity value settlement, while partial loss results in repair to pre-loss condition. Underinsurance — where the sum insured is less than the actual rebuild cost — is a critical factor that affects both categories.',
      },
    },
    {
      '@type': 'Question',
      name: 'What am I entitled to if my property is a total loss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under a replacement cost value (RCV) policy, you are entitled to the cost of rebuilding the property to an equivalent standard at current prices — not the sum insured if that figure is less than the actual rebuild cost. Under an indemnity (ACV) policy, you receive the market value of the property at the time of loss, less depreciation. You are also typically entitled to temporary accommodation while uninhabitable, debris removal, and architect or engineer fees required for the rebuild. For investment properties, loss of rent is usually covered for the period the property is uninhabitable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I dispute a total loss declaration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If your insurer declares a total loss and you believe the property can be economically repaired, request the insurer\'s written grounds for the total loss declaration — they are obligated to provide these. Commission an independent scope of works from an IICRC-certified contractor documenting the repair cost. If the repair cost is materially lower than the insurer\'s figure, lodge a formal internal dispute. AFCA can review total loss vs partial loss decisions, including disputes over betterment clauses and depreciation methodology.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a cash settlement for total loss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A cash settlement occurs when the insurer pays you the sum insured (less excess) and you manage the rebuild yourself, rather than the insurer managing the repair process. In 2026, cash settlements for total loss are often significantly less than the actual rebuild cost due to construction cost inflation — NSW and QLD building costs have risen approximately 42% since 2019. Before accepting a cash settlement, obtain an independent replacement cost estimate from a licensed builder or IICRC-certified contractor to verify the settlement amount is sufficient to complete the rebuild.",
      },
    },
  ],
};

export default function TotalLossVsPartialLossInsurancePage() {
  return (
    <>
      <Script
        id="tlpl-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="tlpl-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="tlpl-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance Claims"
        title="Total Loss vs Partial Loss Insurance"
        subtitle="What it means for your claim in Australia"
        gradient="linear-gradient(135deg, #1A237E 0%, #283593 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Total Loss vs Partial Loss' },
        ]}
        sections={[
          {
            heading: 'How Insurers Determine Total vs Partial Loss',
            body: (
              <>
                <p>
                  The total vs partial loss determination is one of the most consequential
                  decisions in a property insurance claim. It dictates the settlement pathway,
                  the applicable policy provisions, and your entitlements. Understanding how
                  insurers make this assessment — and where it can go wrong — is essential
                  before you accept any settlement.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Engineering report:</strong> For significant damage, insurers
                    typically commission a structural engineer&apos;s report assessing whether
                    the building is repairable. The engineer provides a repair cost estimate
                    which the insurer compares against the sum insured and replacement cost.
                    You are entitled to receive a copy of this report.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Repair cost vs replacement cost:</strong> If the cost to repair
                    the property to pre-loss condition exceeds the sum insured or a defined
                    threshold (commonly 80% of replacement value), the insurer will declare
                    a total loss. In a rising construction cost environment, this threshold
                    is being reached at lower levels of physical damage than in previous years.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Sum insured adequacy:</strong> If your sum insured does not
                    reflect the current rebuild cost, even a partial loss may result in a
                    shortfall. Under a replacement cost policy, you are entitled to the
                    actual rebuild cost — but if you are underinsured, the insurer may apply
                    proportional reduction (averaging) to your claim payout.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Underinsurance in Australia:</strong> According to the Insurance
                    Council of Australia 2025 data, approximately 23% of Australian
                    homeowners are underinsured by more than 50%. After major events,
                    underinsured policyholders who receive a total loss determination often
                    find the cash settlement insufficient to rebuild at current costs.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: "What You're Entitled to Under Each Category",
            body: (
              <>
                <p>
                  Your entitlements differ materially depending on whether your claim is
                  assessed as a total loss or a partial loss. Understanding the distinction
                  helps you identify underpayments before accepting settlement.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Partial loss — repair to pre-loss condition:</strong> You are
                    entitled to have the property repaired to the standard it was in
                    immediately before the insured event. This includes all damaged
                    structural elements, finishes, and services. The insurer cannot
                    apply betterment deductions simply because the repair uses new materials.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Partial loss — temporary accommodation:</strong> If the property
                    is uninhabitable during repairs, most policies provide temporary
                    accommodation cover. Confirm the daily rate and maximum period under
                    your Product Disclosure Statement.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Total loss — replacement value or indemnity value:</strong> Under
                    a replacement cost value policy, you receive the current cost to rebuild
                    to an equivalent standard. Under an indemnity policy, you receive the
                    market value at the time of loss less depreciation. Check your PDS to
                    confirm which basis applies.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Total loss — debris removal and professional fees:</strong> Most
                    policies include debris removal costs, demolition, and architect or
                    engineer fees as part of the total loss settlement. These are separate
                    to the rebuild cost — confirm they are included in any cash settlement
                    offer.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'The Underinsurance Problem in Australia',
            body: (
              <>
                <p>
                  Underinsurance is one of the most significant risks facing Australian
                  homeowners in 2026. Construction cost inflation has outpaced sum insured
                  reviews, leaving a large proportion of policyholders exposed to a shortfall
                  on total loss claims.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>ICA 2025 data:</strong> The Insurance Council of Australia 2025
                    report found that approximately 23% of Australian homeowners are
                    underinsured by more than 50% of their actual rebuild cost.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Building cost inflation:</strong> NSW and QLD residential building
                    costs have increased approximately 42% since 2019, driven by materials
                    costs, labour shortages, and supply chain disruptions. A sum insured set
                    in 2019 or 2020 is likely to be significantly below current rebuild costs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Averaging (co-insurance) clauses:</strong> Some policies contain
                    averaging clauses that reduce the payout proportionally if the sum insured
                    is less than the actual rebuild cost. For example, if your property is
                    insured for $600,000 but the rebuild cost is $900,000, an averaging clause
                    may reduce a $300,000 partial loss claim by one third to $200,000.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Independent replacement cost estimates:</strong> Before your next
                    policy renewal — or when lodging a claim — NRPG provides independent
                    replacement cost estimates based on current construction costs. These
                    estimates support accurate sum insured calculations and may support your
                    position in a total loss dispute.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Disputing a Total or Partial Loss Decision',
            body: (
              <>
                <p>
                  If you disagree with your insurer&apos;s total or partial loss determination,
                  you have formal dispute rights under the Insurance Contracts Act 1984 and the
                  General Insurance Code of Practice. Follow this escalation path:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Request the insurer&apos;s written reasoning:</strong> Your insurer
                    must provide written grounds for their assessment, including the repair
                    cost estimate, replacement cost figure, and the basis for the total/partial
                    loss determination. Request this in writing immediately.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Commission an independent IICRC-certified scope:</strong> Obtain
                    an independent scope of works from an IICRC-certified contractor. Compare
                    the repair cost in this scope against the insurer&apos;s figure. Material
                    differences — particularly in scope items missed by the insurer&apos;s
                    assessor — are grounds for a formal dispute.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Internal Dispute Resolution (IDR):</strong> Lodge a formal written
                    dispute with your insurer, providing your independent scope and any
                    supporting documentation. The insurer must respond within 30 calendar days.
                    Keep all correspondence.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>AFCA escalation:</strong> If the IDR does not resolve the dispute
                    or you receive an unsatisfactory final decision, lodge a complaint with
                    AFCA. AFCA reviews total and partial loss determinations, betterment
                    deductions, and depreciation methodology. You have 2 years from the
                    insurer&apos;s final decision to lodge. AFCA is free and its
                    determinations are binding on insurers.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Panel Assessment Request:</strong> Some insurers offer a panel
                    or independent assessment process as part of their IDR. Where available,
                    requesting this can resolve disputes without escalating to AFCA — but
                    does not waive your right to AFCA if the panel outcome is unsatisfactory.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is the difference between total loss and partial loss?',
            answer:
              "A total loss occurs when the cost to repair the property equals or exceeds the sum insured, or when the repair cost exceeds approximately 80% of the property's replacement value — making rebuild the more economical outcome. A partial loss is where the property is repairable within the sum insured. The distinction determines which policy provisions apply: total loss triggers replacement value or indemnity value settlement, while partial loss results in repair to pre-loss condition. Underinsurance — where the sum insured is less than the actual rebuild cost — is a critical factor that affects both categories.",
          },
          {
            question: "What am I entitled to if my property is a total loss?",
            answer:
              "Under a replacement cost value (RCV) policy, you are entitled to the cost of rebuilding the property to an equivalent standard at current prices — not the sum insured if that figure is less than the actual rebuild cost. Under an indemnity (ACV) policy, you receive the market value of the property at the time of loss, less depreciation. You are also typically entitled to temporary accommodation while uninhabitable, debris removal, and architect or engineer fees required for the rebuild. For investment properties, loss of rent is usually covered for the period the property is uninhabitable.",
          },
          {
            question: 'Can I dispute a total loss declaration?',
            answer:
              "Yes. If your insurer declares a total loss and you believe the property can be economically repaired, request the insurer's written grounds for the total loss declaration — they are obligated to provide these. Commission an independent scope of works from an IICRC-certified contractor documenting the repair cost. If the repair cost is materially lower than the insurer's figure, lodge a formal internal dispute. AFCA can review total loss vs partial loss decisions, including disputes over betterment clauses and depreciation methodology.",
          },
          {
            question: 'What is a cash settlement for total loss?',
            answer:
              "A cash settlement occurs when the insurer pays you the sum insured (less excess) and you manage the rebuild yourself, rather than the insurer managing the repair process. In 2026, cash settlements for total loss are often significantly less than the actual rebuild cost due to construction cost inflation — NSW and QLD building costs have risen approximately 42% since 2019. Before accepting a cash settlement, obtain an independent replacement cost estimate from a licensed builder or IICRC-certified contractor to verify the settlement amount is sufficient to complete the rebuild.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Should I Take a Payout',
            href: '/guides/insurance/should-i-take-a-payout',
            description:
              'Whether to accept an insurer cash settlement or manage your own restoration — what to consider.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an insurance dispute with AFCA.',
          },
          {
            title: 'Insurance Claim Denial Rights',
            href: '/guides/insurance/insurance-claim-denial-rights',
            description:
              'Your legal rights when an insurer denies or underpays your claim.',
          },
        ]}
        cta={{ text: 'Get Independent Damage Assessment', href: '/claim' }}
      />
    </>
  );
}
