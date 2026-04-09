import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Underinsurance in Australia — What It Means and How to Fix It',
  description:
    '23% of Australian properties are underinsured by more than 50%. What underinsurance means for disaster claims, how to check if you\'re affected, and how NRPG helps.',
  keywords:
    'underinsurance australia, underinsured property, insurance sum insured, building replacement cost australia, property underinsurance',
  alternates: {
    canonical: `${NAP.url}/guides/insurance/underinsurance-australia`,
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
    name: 'Underinsurance Assessment and Replacement Cost Estimates',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Independent Replacement Cost Assessment',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Independent Replacement Cost Assessment',
  description:
    'Independent post-event replacement cost estimates for Australian homeowners and property owners affected by underinsurance. Supporting policyholders with AFCA disputes and insurer negotiations.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is underinsurance in property insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Underinsurance occurs when your sum insured is less than the actual cost to rebuild your property to the same standard. According to ICA 2025 data, 23% of Australian homeowners are underinsured by more than 50%. A 2024 KPMG survey found the average underinsurance gap in Australia is AU$200,000 — meaning the typical underinsured homeowner faces a $200,000 shortfall if their property is a total loss.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to rebuild a house in Australia in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rebuild costs are highly variable and depend on location, design, and materials. Indicative ranges in 2026: Sydney $3,000–$5,000/m²; Melbourne $2,800–$4,500/m²; Brisbane $2,200–$3,500/m²; Perth $2,000–$3,200/m². Construction cost inflation has increased rebuild costs by 40–50% since 2019. Importantly, pool, deck, garage, landscaping, and outbuilding costs are often excluded from sum insured calculations — meaning the gap can be far larger than the per-square-metre figures suggest.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if I am underinsured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compare your sum insured against HIA or Rawlinsons cost-per-square-metre figures for your city, multiplied by your floor area and including demolition, site clearance, architect fees, outbuildings, fencing, driveways, and pools. Online calculators provided by insurers frequently underestimate rebuild costs. The safest method is an independent quantity surveyor report, which typically costs $800–$2,000 but provides a defensible figure. NRPG can provide independent replacement cost estimates after a loss event.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if my property is underinsured and I have a total loss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your insurer pays only up to your sum insured less your excess. If your rebuild costs $600,000 but you are insured for $350,000, you fund the $250,000 gap personally. There is no clawback from your insurer regardless of the reason for the underinsurance — whether that is an outdated sum insured, reliance on an online calculator, or failure to update after renovations. This is why pre-event replacement cost assessment is critical.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I fix underinsurance mid-policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — contact your insurer to increase your sum insured at any time. Most policies allow mid-term amendments for an additional premium calculated on the increase. This should be done immediately, before a loss event, as insurers will not increase your sum insured after a claim is lodged. Some insurers offer inflation-linked sum insured adjustments at renewal — check whether your policy includes this and whether the adjustment rate keeps pace with actual construction cost inflation.',
      },
    },
  ],
};

export default function UnderinsuranceAustraliaPage() {
  return (
    <>
      <Script
        id="uia-ps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="uia-svc"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="uia-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance Claims"
        title="Underinsurance in Australia — What It Means and How to Fix It"
        subtitle="23% of Australian properties are underinsured by more than 50%. Here is what that means for your claim, how to check your own position, and what to do next."
        gradient="linear-gradient(135deg, #1A237E 0%, #283593 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Underinsurance Australia' },
        ]}
        sections={[
          {
            heading: 'The Scale of Australia\'s Underinsurance Problem',
            body: (
              <>
                <p>
                  Underinsurance is one of the most significant and least-discussed risks facing
                  Australian property owners. According to the Insurance Council of Australia (ICA)
                  2025 figures, 23% of Australian homeowners are underinsured by more than 50% —
                  meaning one in four homeowners would receive less than half the cost of rebuilding
                  their property in a total loss event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  This problem has been dramatically worsened by construction cost inflation. Since
                  2019, rebuild costs in Australia have increased by 40–50% due to labour shortages,
                  supply chain disruption, and increased materials costs. A property that was
                  adequately insured in 2019 may now be underinsured by hundreds of thousands of
                  dollars without the owner ever having changed their policy.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2025 cyclone season — including TC Alfred and TC Maila — exposed the scale of
                  this problem in Queensland and Northern Australia. Many homeowners in affected
                  areas discovered, at the worst possible time, that their sum insured was
                  insufficient to rebuild.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Online calculators consistently underestimate:</strong> Most insurer-provided
                    online rebuild calculators use simplified square-metre rates that do not account
                    for demolition costs, site clearance, architect fees, or ancillary structures.
                    The ICA&apos;s own data shows online calculator users are more likely to be
                    underinsured than those who obtain independent estimates.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Renovations are frequently not reported:</strong> Many homeowners improve
                    their properties — kitchens, bathrooms, extensions, pools, decking — without
                    notifying their insurer to increase the sum insured. Each improvement that is
                    not reflected increases the underinsurance gap.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Average underinsurance gap is AU$200,000:</strong> The 2024 KPMG survey
                    found that among underinsured Australian homeowners, the average gap between sum
                    insured and actual rebuild cost is $200,000.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What Underinsurance Means for Your Claim',
            body: (
              <>
                <p>
                  When you make a claim on an underinsured property, the consequences depend on
                  whether the loss is total or partial — and whether your policy contains a
                  co-insurance clause.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Total loss — full shortfall:</strong> If your property is a total loss,
                    your insurer pays your sum insured less your excess, and you fund any gap between
                    that amount and the actual rebuild cost personally. There is no insurer liability
                    for the gap regardless of the reason for underinsurance.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Partial loss — pro-rata reduction:</strong> Some policies contain
                    co-insurance clauses that apply a pro-rata reduction to partial loss claims when
                    underinsurance is detected. Under a co-insurance clause, if you are insured for
                    60% of the actual rebuild cost, the insurer may only pay 60% of the repair cost —
                    even for a minor claim. Check your Product Disclosure Statement (PDS) for
                    co-insurance provisions.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer vs homeowner liability:</strong> Australian insurers are not
                    required to warn you that your sum insured is inadequate at policy inception or
                    renewal. The obligation to set an adequate sum insured rests entirely with the
                    policyholder. AFCA has confirmed in multiple decisions that an insurer is not
                    liable for losses exceeding the sum insured, even where the underinsurance was
                    significant and foreseeable.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Checking Your Own Sum Insured',
            body: (
              <>
                <p>
                  The most reliable way to check whether your sum insured is adequate is to compare
                  it against an independent rebuild cost estimate. There are several approaches:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>HIA cost calculator:</strong> The Housing Industry Association publishes
                    cost-per-square-metre data for each state. Multiply the applicable rate by your
                    floor area and add demolition (typically $15,000–$40,000), site clearance,
                    architect and engineering fees (typically 8–12% of construction cost), and
                    ancillary structures.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Rawlinsons Australian Construction Handbook:</strong> The industry-standard
                    cost guide used by quantity surveyors and construction professionals. More
                    detailed than online calculators but requires access to the publication.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Independent quantity surveyor report ($800–$2,000):</strong> The most
                    accurate method. A quantity surveyor will inspect your property, assess the
                    full replacement cost including demolition, site clearance, professional fees,
                    and ancillary structures, and produce a defensible report. This cost is
                    typically tax-deductible for investment properties.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>What to include in your sum insured:</strong> Structure, internal
                    fittings and fixtures, demolition costs, architect and engineer fees, council
                    fees and permits, site clearance, outbuildings (garage, shed, granny flat),
                    fencing, driveways and paths, pools, spas, and decking. Online calculators
                    frequently exclude the last six items.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Getting Independent Assessment After a Loss',
            body: (
              <>
                <p>
                  If you have suffered a loss and believe your property may be underinsured, there
                  are steps you can take to document your position and, where possible, challenge
                  the insurer&apos;s assessment.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>NRPG post-event replacement cost estimate:</strong> NRPG can provide
                    an independent replacement cost assessment following a loss event. This gives
                    you a documented figure to compare against your sum insured and the insurer&apos;s
                    settlement offer.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Documenting underinsurance for an AFCA complaint:</strong> If you believe
                    your insurer failed to alert you to known underinsurance issues — for example,
                    if you relied on the insurer&apos;s own calculator — document this carefully.
                    While AFCA has generally held that the sum insured obligation rests with the
                    policyholder, there are circumstances (such as insurer-provided underestimates)
                    where AFCA may require adjustment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Negotiating with your insurer:</strong> Even where underinsurance is
                    confirmed, there may be room to negotiate — particularly where the insurer made
                    representations about the adequacy of the sum insured. Obtain all communications
                    in writing and keep records of any guidance received from the insurer.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>AFCA&apos;s approach to underinsurance disputes:</strong> AFCA handles
                    underinsurance disputes under the General Insurance Code of Practice and relevant
                    policy terms. Complaints must be lodged within 2 years of the claim decision.
                    AFCA has issued multiple determinations requiring insurers to pay beyond the sum
                    insured in cases involving misrepresentation by the insurer about replacement
                    cost adequacy.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  The most effective protection against underinsurance is an independent replacement
                  cost assessment before a loss event. After a loss, NRPG can provide independent
                  assessment support — but the earlier you act, the stronger your position.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is underinsurance in property insurance?',
            answer:
              'Underinsurance occurs when your sum insured is less than the actual cost to rebuild your property to the same standard. According to ICA 2025 data, 23% of Australian homeowners are underinsured by more than 50%. A 2024 KPMG survey found the average underinsurance gap in Australia is AU$200,000 — meaning the typical underinsured homeowner faces a $200,000 shortfall if their property is a total loss.',
          },
          {
            question: 'How much does it cost to rebuild a house in Australia in 2026?',
            answer:
              'Rebuild costs are highly variable and depend on location, design, and materials. Indicative ranges in 2026: Sydney $3,000–$5,000/m²; Melbourne $2,800–$4,500/m²; Brisbane $2,200–$3,500/m²; Perth $2,000–$3,200/m². Construction cost inflation has increased rebuild costs by 40–50% since 2019. Importantly, pool, deck, garage, landscaping, and outbuilding costs are often excluded from sum insured calculations — meaning the gap can be far larger than the per-square-metre figures suggest.',
          },
          {
            question: 'How do I know if I am underinsured?',
            answer:
              'Compare your sum insured against HIA or Rawlinsons cost-per-square-metre figures for your city, multiplied by your floor area and including demolition, site clearance, architect fees, outbuildings, fencing, driveways, and pools. Online calculators provided by insurers frequently underestimate rebuild costs. The safest method is an independent quantity surveyor report, which typically costs $800–$2,000 but provides a defensible figure. NRPG can provide independent replacement cost estimates after a loss event.',
          },
          {
            question: 'What happens if my property is underinsured and I have a total loss?',
            answer:
              'Your insurer pays only up to your sum insured less your excess. If your rebuild costs $600,000 but you are insured for $350,000, you fund the $250,000 gap personally. There is no clawback from your insurer regardless of the reason for the underinsurance — whether that is an outdated sum insured, reliance on an online calculator, or failure to update after renovations. This is why pre-event replacement cost assessment is critical.',
          },
          {
            question: 'Can I fix underinsurance mid-policy?',
            answer:
              'Yes — contact your insurer to increase your sum insured at any time. Most policies allow mid-term amendments for an additional premium calculated on the increase. This should be done immediately, before a loss event, as insurers will not increase your sum insured after a claim is lodged. Some insurers offer inflation-linked sum insured adjustments at renewal — check whether your policy includes this and whether the adjustment rate keeps pace with actual construction cost inflation.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Total Loss vs Partial Loss',
            href: '/guides/insurance/total-loss-vs-partial-loss-insurance',
            description: 'How insurers assess total vs partial loss and what you are entitled to.',
          },
          {
            title: 'Should I Take a Payout',
            href: '/guides/insurance/should-i-take-a-payout',
            description: 'When accepting a cash settlement works in your favour — and when it does not.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an insurance dispute with AFCA.',
          },
        ]}
        cta={{ text: 'Get Independent Replacement Cost Assessment', href: '/claim' }}
      />
    </>
  );
}
