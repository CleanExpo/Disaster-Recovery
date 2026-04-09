import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Cyclone Insurance Claim Process Australia — ARPC Pool Guide',
  description: 'How to lodge a cyclone insurance claim in Australia. ARPC Cyclone Reinsurance Pool explained, two-peril lodgement strategy, and AFCA escalation for FNQ and NT claimants.',
  keywords: 'cyclone insurance claim, ARPC cyclone reinsurance pool, cyclone insurance Australia, TC Maila claim, FNQ insurance',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/insurance/cyclone-insurance-claim-process' },
};

export default function CycloneInsuranceClaimProcessPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does the ARPC Cyclone Reinsurance Pool affect my claim entitlements?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The ARPC Cyclone Reinsurance Pool is a reinsurance arrangement between your insurer and the Australian Reinsurance Pool Corporation — it operates behind the scenes. You still deal directly with your insurer as normal; ARPC does not interact with individual claimants. Your rights under your Product Disclosure Statement, the Insurance Contracts Act, and the General Insurance Code of Practice are unchanged. The pool was designed to improve insurer capacity to pay claims in cyclone-prone regions, not to alter policyholder entitlements.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I lodge cyclone wind damage and water ingress as separate claims?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, where your policy treats them as separate perils — and many policies do. Cyclone wind damage and water ingress from wind-driven rain may have different excesses, sub-limits, or coverage conditions under your PDS. Lodging them as a single combined note can result in the insurer applying only one excess or potentially conflating two separate coverages. When lodging, specify "cyclone wind damage" as one peril and "water ingress — wind-driven rain" as a separate peril. Review your PDS definitions section before lodging, or ask your insurer explicitly whether the perils are treated separately.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a cyclone insurance claim take to resolve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After major cyclone events, assessor availability is significantly stretched — response times of 2–4 weeks or longer are common. Under the General Insurance Code of Practice, your insurer must still process your claim within the standard timeframes and keep you updated if delays occur. Lodge as soon as possible to secure your queue position. For displaced homeowners or properties with ongoing safety risks, request urgent prioritisation at lodgement — insurers are obligated to prioritise vulnerable claimants.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if my cyclone claim is underpaid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cyclone underpayment disputes are a priority category at AFCA following major weather events. If your insurer\'s settlement offer is lower than your documented repair costs, lodge a formal dispute through their Internal Dispute Resolution (IDR) process. If unresolved within 30 days or you receive an unsatisfactory final decision, escalate to AFCA within 2 years. Provide IICRC-certified scope of works documentation, Bureau of Meteorology event data, and pre-cyclone property condition evidence to support your dispute. AFCA outcomes on total loss and major structural cyclone claims significantly favour claimants with certified documentation.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="cycloneclaim-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance"
        title="Cyclone Insurance Claim Process"
        subtitle="ARPC pool, two-peril lodgement, and dispute rights for"
        gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
        icon={<Shield className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Cyclone Insurance Claim Process' },
        ]}
        sections={[
          {
            heading: 'How Cyclone Claims Work — ARPC Pool and Your Rights',
            body: (
              <>
                <p>
                  Cyclone insurance claims are processed differently from standard storm claims in
                  Australia. Since July 2023, most properties in North Queensland, the Northern
                  Territory, and northern Western Australia (north of the Tropic of Capricorn) are
                  backed by the ARPC Cyclone Reinsurance Pool. Understanding this structure — and
                  confirming that it does not change your rights — is the first step.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>ARPC Cyclone Reinsurance Pool:</strong> The pool is a backstop
                    reinsurance arrangement. Your insurer still processes your claim on the
                    pool&apos;s behalf; ARPC does not interact with claimants directly. Your
                    Product Disclosure Statement, excess, and coverage conditions remain as
                    specified in your policy.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Your rights are unchanged:</strong> The General Insurance Code of
                    Practice and the Insurance Contracts Act still apply in full. Your insurer
                    must respond within the same timeframes, provide written reasons for any
                    decision, and participate in Internal Dispute Resolution and AFCA escalation
                    as normal.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>TC Maila and Ex-TC Alfred — FNQ claims surge (2026):</strong>{' '}
                    TC Maila (April 2026) and Ex-TC Alfred (March 2026) have created a significant
                    claims surge across Far North Queensland. Loss assessors are stretched — response
                    times of 2–4 weeks are common. Lodge your claim now to secure your queue
                    position. Insurers are obligated to prioritise displaced homeowners and
                    properties with safety risks — request urgent prioritisation at lodgement if
                    applicable.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Which properties are covered:</strong> The ARPC pool applies to home
                    and strata insurance policies for properties in designated cyclone-prone regions.
                    Check your insurer&apos;s confirmation of cover letter or PDS to verify your
                    property is included. Most FNQ, NT and northern WA properties with home
                    buildings insurance are covered.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What to Document After a Cyclone',
            body: (
              <>
                <p>
                  Cyclone damage documentation requires specific attention to directional impact
                  patterns and the distinction between wind damage and water ingress — two perils
                  that may be treated separately under your policy.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Document everything before cleanup:</strong> Do not remove debris or
                    begin cleanup before photographing and filming all areas of damage. Evidence
                    removed before documentation cannot support your claim.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wind damage — directional impact patterns:</strong> Photograph damage
                    that shows the direction of wind impact — missing roof tiles blown in a
                    consistent direction, walls or fences displaced toward the same bearing, broken
                    windows on the windward side of the building. Directional patterns are key
                    cyclone-specific evidence that distinguishes storm damage from pre-existing
                    issues.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water ingress from wind-driven rain:</strong> Document water entry
                    points clearly — compromised building envelope, failed flashings, wind-blown
                    roof penetrations. Distinguish this from any rising water or external inundation,
                    which is a separate peril (flood) with different coverage conditions.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural movement:</strong> Document any wall cracking, roof
                    distortion, or subfloor movement that occurred during the cyclone event.
                    Photograph before any emergency make-safe or shoring works commence.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Bureau of Meteorology data:</strong> Download and keep the BoM event
                    record for the cyclone (wind speeds, track, timing) for your postcode. This
                    corroborates the occurrence and severity of the event if disputed by your
                    insurer.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Lodging as Two Perils and Escalating Disputes',
            body: (
              <>
                <p>
                  One of the most important strategic decisions in a cyclone claim is whether to
                  lodge cyclone wind damage and water ingress as separate perils — and how to
                  escalate if your claim is underpaid.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Two-peril lodgement strategy:</strong> Lodge &quot;cyclone wind
                    damage&quot; and &quot;water ingress — wind-driven rain&quot; as separate
                    perils in your claim. Do not combine them into a single claim note. Some
                    policies have different excess, sub-limits or exclusions for each peril.
                    Combining them risks the insurer applying a single — potentially lower —
                    sub-limit to the combined loss.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Review your PDS definitions before lodging:</strong> Check how your
                    policy defines cyclone, storm, wind, and water damage. The definitions section
                    will clarify whether separate perils have separate excesses or sub-limits. If
                    unclear, ask your insurer in writing before lodging so you have a record of
                    their advice.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>IICRC scope documentation for disputes:</strong> An IICRC-certified
                    scope of works identifying the storm peril (wind vs water ingress) for each
                    damaged component provides the benchmark for your insurer&apos;s assessment
                    and for any AFCA dispute. Our contractors produce this documentation as
                    standard.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>AFCA cyclone escalation:</strong> Cyclone underpayment disputes are
                    a priority category at AFCA after major events. Lodge with AFCA within 2 years
                    of the claim decision. AFCA has urgency provisions for displaced homeowners
                    and properties with ongoing safety risks — request urgent consideration at
                    lodgement if these apply to you.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  IICRC-certified documentation may support your claim at insurer and AFCA level,
                  though outcomes cannot be guaranteed.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does the ARPC Cyclone Reinsurance Pool affect my claim entitlements?',
            answer:
              'No. The ARPC Cyclone Reinsurance Pool is a reinsurance arrangement between your insurer and the Australian Reinsurance Pool Corporation — it operates behind the scenes. You still deal directly with your insurer as normal; ARPC does not interact with individual claimants. Your rights under your Product Disclosure Statement, the Insurance Contracts Act, and the General Insurance Code of Practice are unchanged. The pool was designed to improve insurer capacity to pay claims in cyclone-prone regions, not to alter policyholder entitlements.',
          },
          {
            question: 'Should I lodge cyclone wind damage and water ingress as separate claims?',
            answer:
              'Yes, where your policy treats them as separate perils — and many policies do. Cyclone wind damage and water ingress from wind-driven rain may have different excesses, sub-limits, or coverage conditions under your PDS. Lodging them as a single combined note can result in the insurer applying only one excess or potentially conflating two separate coverages. When lodging, specify "cyclone wind damage" as one peril and "water ingress — wind-driven rain" as a separate peril. Review your PDS definitions section before lodging, or ask your insurer explicitly whether the perils are treated separately.',
          },
          {
            question: 'How long does a cyclone insurance claim take to resolve?',
            answer:
              'After major cyclone events, assessor availability is significantly stretched — response times of 2–4 weeks or longer are common. Under the General Insurance Code of Practice, your insurer must still process your claim within the standard timeframes and keep you updated if delays occur. Lodge as soon as possible to secure your queue position. For displaced homeowners or properties with ongoing safety risks, request urgent prioritisation at lodgement — insurers are obligated to prioritise vulnerable claimants.',
          },
          {
            question: 'What if my cyclone claim is underpaid?',
            answer:
              "Cyclone underpayment disputes are a priority category at AFCA following major weather events. If your insurer's settlement offer is lower than your documented repair costs, lodge a formal dispute through their Internal Dispute Resolution (IDR) process. If unresolved within 30 days or you receive an unsatisfactory final decision, escalate to AFCA within 2 years. Provide IICRC-certified scope of works documentation, Bureau of Meteorology event data, and pre-cyclone property condition evidence to support your dispute. AFCA outcomes on total loss and major structural cyclone claims significantly favour claimants with certified documentation.",
          },
        ]}
        relatedGuides={[
          {
            title: 'ARPC Cyclone Reinsurance Pool Guide',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description: 'How the ARPC pool works and what it means for FNQ and NT policyholders.',
          },
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'Emergency information and claim guidance for TC Maila affected properties.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an insurance dispute with AFCA.',
          },
          {
            title: 'Cyclone Damage Restoration Cairns',
            href: '/cyclone-damage-restoration-cairns',
            description: 'IICRC-certified cyclone restoration services in Cairns and Far North Queensland.',
          },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
