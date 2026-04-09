import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Temporary Accommodation Insurance — Your Rights After a Disaster',
  description:
    'What temporary accommodation insurance covers after a disaster. How to claim, how long it lasts, and what to do if your insurer denies coverage. Australia 2026.',
  alternates: {
    canonical: `${NAP.url}/guides/insurance/temporary-accommodation-insurance`,
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
    name: 'Temporary Accommodation Insurance Claim Support',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Temporary Accommodation Insurance Claim Support',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Temporary Accommodation Insurance Claim Support',
  description:
    'Expert claim support for Australian homeowners pursuing temporary accommodation benefits after a disaster. Documentation, insurer dispute support, and AFCA complaint assistance.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does my home insurance cover temporary accommodation after a disaster?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most standard home and contents policies include a temporary accommodation benefit if your home is uninhabitable due to a covered event such as storm, cyclone, flood, or fire. The benefit is typically expressed as a daily rate or a percentage of your sum insured (commonly 10–20%) for a maximum period of up to 12 months. Check your Product Disclosure Statement for the exact limits, daily cap, and eligibility conditions that apply under your policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is my home considered \'uninhabitable\' for insurance purposes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uninhabitability is generally defined as: no working kitchen or bathroom facilities; no safe sleeping space; structural damage that makes the building unsafe to occupy; or a health hazard such as mould growth or sewage contamination that makes the property unfit for occupation. Uninhabitability must typically be confirmed by your insurer, a building inspector, or emergency services — do not assume your property qualifies without written confirmation, as insurers may dispute accommodation costs if uninhabitability was never formally established.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much temporary accommodation does insurance cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Temporary accommodation benefits are typically capped in one of two ways: a daily rate equivalent to your rent or mortgage repayment (up to a fixed cap, commonly $100–$300 per day), or a fixed percentage of your sum insured (typically 10–20%). Some policies impose both a daily cap and a total cap. The benefit period is usually a maximum of 12 months from the date the property became uninhabitable, though major disaster declarations can extend this. Review your Product Disclosure Statement before assuming the benefit will cover your full accommodation costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my insurer won\'t pay for temporary accommodation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your insurer refuses to pay temporary accommodation costs, they must provide written reasons. If your property is uninhabitable and accommodation is required during insurer-managed restoration works, the costs are generally owed regardless of the daily cap — failing to fund accommodation during delays caused by the insurer has been the subject of multiple AFCA determinations. Lodge a formal internal dispute with your insurer first, then escalate to AFCA if unresolved. Complaints must be lodged within 2 years of the claim decision.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can temporary accommodation benefits be extended after cyclone or flood disasters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. After major declared catastrophes including TC Alfred and TC Maila, the Insurance Code and ICA catastrophe protocols require expedited claims handling. AFCA has discretion to require extended temporary accommodation in cases where insurer-managed repairs are progressing slowly. Policyholders displaced by major disasters should document all accommodation costs, maintain all receipts, and not assume the standard policy limits are the final word if their insurer&apos;s own delays are extending the displacement period.',
      },
    },
  ],
};

export default function TemporaryAccommodationInsurancePage() {
  return (
    <>
      <Script
        id="taic-ps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="taic-svc"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="taic-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance Claims"
        title="Temporary Accommodation Insurance — Your Rights After a Disaster"
        subtitle="What temporary accommodation insurance covers, how to claim it, and what to do if your insurer denies or limits your entitlement."
        gradient="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Temporary Accommodation Insurance' },
        ]}
        sections={[
          {
            heading: 'Understanding Temporary Accommodation Benefits',
            body: (
              <>
                <p>
                  Most standard home and contents policies in Australia include a temporary
                  accommodation benefit triggered when your home becomes uninhabitable due to a
                  covered event. This benefit is one of the most important — and most frequently
                  misunderstood — components of a disaster insurance claim.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Policy trigger:</strong> The accommodation benefit activates when your
                    home is uninhabitable due to a covered event (storm, cyclone, flood, fire, or
                    water damage from an internal source). It does not apply to voluntary evacuation
                    or precautionary absence where the property remains habitable.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Uninhabitability definition:</strong> No working kitchen or bathroom,
                    no safe sleeping space, structural damage making the building unsafe, or a
                    health hazard from mould or contamination. Confirm uninhabitability in writing
                    from your insurer, a building inspector, or emergency services.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Daily rates vs lump sum:</strong> Some policies pay a daily rate
                    (commonly $100–$300/day); others pay an amount equal to your rent or mortgage
                    repayment; others express the benefit as a percentage of your sum insured
                    (typically 10–20%). Some policies use a combination of approaches with both
                    daily and total caps.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Duration limits:</strong> Most policies cap temporary accommodation
                    at 12 months from the uninhabitability date, though major catastrophe
                    declarations can extend this. The benefit ceases when your home is restored
                    to habitable condition, even if the 12 months has not elapsed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Accommodation types covered:</strong> Hotels, motels, short-term
                    rental properties, and in some cases reimbursement for staying with friends
                    or family (where the host incurs additional costs). Check your PDS for
                    eligible accommodation types.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'How to Claim Temporary Accommodation',
            body: (
              <>
                <p>
                  Acting promptly and keeping thorough records is essential for a successful
                  temporary accommodation claim:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Notify your insurer immediately:</strong> Contact your insurer as soon
                    as you are displaced and request confirmation of your temporary accommodation
                    entitlement. Get the daily cap and total cap in writing before booking
                    accommodation.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Request written uninhabitability confirmation:</strong> Ask your insurer,
                    or request an emergency services report or building inspector&apos;s letter,
                    confirming the property is uninhabitable and the date from which the
                    benefit applies.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Keep all receipts:</strong> Accommodation provider invoices, receipts,
                    and tax invoices are required to support your claim. Keep digital copies
                    stored separately from the property.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Claim weekly or monthly rather than waiting:</strong> Submit
                    accommodation receipts regularly rather than waiting until the full
                    displacement period ends. This maintains cash flow and gives the insurer
                    the opportunity to identify any issues early.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Accommodation provider invoices required:</strong> Insurers require
                    formal invoices or receipts from accommodation providers — informal
                    arrangements without documentation will generally not be reimbursed.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'When Insurers Deny Temporary Accommodation',
            body: (
              <>
                <p>
                  Temporary accommodation disputes are among the most common post-disaster
                  insurance complaints. Understanding your rights helps you challenge denials
                  effectively.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Common denial reasons:</strong> Insurer disputes uninhabitability
                    determination; accommodation booked exceeds the daily policy cap; accommodation
                    not of a type covered by the policy; policyholder&apos;s failure to notify
                    insurer before booking; or the insurer claims the property is partially
                    habitable (one bathroom functional, for example).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>How to challenge denials:</strong> Request the insurer&apos;s written
                    reasons (they are obligated to provide these). Obtain a building inspector&apos;s
                    or engineer&apos;s report confirming uninhabitability. If accommodation was
                    required because the insurer&apos;s own restoration contractor was delayed,
                    document those delays.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Australian General Insurance Code of Practice protections:</strong>
                    The Code requires insurers to handle claims promptly, provide clear
                    reasons for decisions, and not require you to bear costs that are the
                    result of insurer delays. Accommodation costs flowing from insurer-managed
                    repair delays are generally the insurer&apos;s responsibility.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>AFCA complaint process:</strong> Lodge a formal internal dispute
                    with your insurer first. If unresolved within the required timeframe, escalate
                    to AFCA. AFCA has issued multiple determinations requiring insurers to fund
                    temporary accommodation, particularly where insurer delays extended the
                    displacement period. Complaints must be lodged within 2 years of the decision.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'TC Alfred and TC Maila — Temporary Accommodation Rights',
            body: (
              <>
                <p>
                  The 2025 cyclone season — including TC Alfred (February–March 2025) and
                  TC Maila (March 2025) — resulted in widespread property displacement across
                  Queensland and northern Australia. If your displacement arose from these events,
                  specific protections and extended entitlements may apply.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>ICA catastrophe designation:</strong> Both TC Alfred and TC Maila were
                    declared ICA catastrophe events. Under the Insurance Code, catastrophe
                    designation triggers expedited claims handling obligations, including priority
                    processing of temporary accommodation requests.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Extended accommodation for major disasters:</strong> For ICA catastrophe
                    events, some insurers extended temporary accommodation beyond standard policy
                    limits as part of disaster response commitments. Check with your insurer
                    whether any catastrophe-specific extensions apply to your policy.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>AFCA expedited process for displacement claims:</strong> AFCA operates
                    an expedited process for claims arising from ICA catastrophe events, with
                    faster resolution timeframes. Policyholders displaced by TC Alfred or TC Maila
                    should reference the catastrophe designation when lodging AFCA complaints.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Government emergency accommodation vs insurance stacking:</strong>
                    Where government-funded emergency accommodation was provided, insurers may
                    offset this against their accommodation benefit obligation. The rules on
                    stacking government and insurance accommodation benefits vary by state and
                    policy. Document the source and duration of all accommodation received.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If you remain displaced from a TC Alfred or TC Maila event and your insurer
                  is disputing accommodation costs or restoration timelines, NRPG can provide
                  independent assessment support and referrals to AFCA complaint specialists.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does my home insurance cover temporary accommodation after a disaster?',
            answer:
              'Most standard home and contents policies include a temporary accommodation benefit if your home is uninhabitable due to a covered event such as storm, cyclone, flood, or fire. The benefit is typically expressed as a daily rate or a percentage of your sum insured (commonly 10–20%) for a maximum period of up to 12 months. Check your Product Disclosure Statement for the exact limits, daily cap, and eligibility conditions that apply under your policy.',
          },
          {
            question: 'When is my home considered \'uninhabitable\' for insurance purposes?',
            answer:
              'Uninhabitability is generally defined as: no working kitchen or bathroom facilities; no safe sleeping space; structural damage that makes the building unsafe to occupy; or a health hazard such as mould growth or sewage contamination that makes the property unfit for occupation. Uninhabitability must typically be confirmed by your insurer, a building inspector, or emergency services — do not assume your property qualifies without written confirmation, as insurers may dispute accommodation costs if uninhabitability was never formally established.',
          },
          {
            question: 'How much temporary accommodation does insurance cover?',
            answer:
              'Temporary accommodation benefits are typically capped in one of two ways: a daily rate equivalent to your rent or mortgage repayment (up to a fixed cap, commonly $100–$300 per day), or a fixed percentage of your sum insured (typically 10–20%). Some policies impose both a daily cap and a total cap. The benefit period is usually a maximum of 12 months from the date the property became uninhabitable, though major disaster declarations can extend this. Review your Product Disclosure Statement before assuming the benefit will cover your full accommodation costs.',
          },
          {
            question: 'What if my insurer won\'t pay for temporary accommodation?',
            answer:
              'If your insurer refuses to pay temporary accommodation costs, they must provide written reasons. If your property is uninhabitable and accommodation is required during insurer-managed restoration works, the costs are generally owed regardless of the daily cap — failing to fund accommodation during delays caused by the insurer has been the subject of multiple AFCA determinations. Lodge a formal internal dispute with your insurer first, then escalate to AFCA if unresolved. Complaints must be lodged within 2 years of the claim decision.',
          },
          {
            question: 'Can temporary accommodation benefits be extended after cyclone or flood disasters?',
            answer:
              'Yes. After major declared catastrophes including TC Alfred and TC Maila, the Insurance Code and ICA catastrophe protocols require expedited claims handling. AFCA has discretion to require extended temporary accommodation in cases where insurer-managed repairs are progressing slowly. Policyholders displaced by major disasters should document all accommodation costs, maintain all receipts, and not assume the standard policy limits are the final word if their insurer\'s own delays are extending the displacement period.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Insurance Claim',
            href: '/guides/insurance/water-damage-insurance-claim-process',
            description: 'Step-by-step guide to lodging a water damage insurance claim in Australia.',
          },
          {
            title: 'Cyclone Insurance Claim Process',
            href: '/guides/insurance/cyclone-insurance-claim-process',
            description: 'How to lodge and maximise a cyclone insurance claim in Australia.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an insurance dispute with AFCA.',
          },
        ]}
        cta={{ text: 'Get Disaster Claim Support', href: '/claim' }}
      />
    </>
  );
}
