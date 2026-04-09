import { Metadata } from 'next';
import { Wind } from 'lucide-react';
import Script from 'next/script';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'What to Do After a Cyclone — Emergency Recovery Guide Australia',
  description:
    'What to do immediately after a cyclone in Australia. Safety, property documentation, insurance lodgement, and ARPC cyclone pool claim process for Queensland, NT, and WA.',
  keywords:
    'what to do after a cyclone australia, after cyclone recovery steps, cyclone damage insurance claim, ARPC cyclone claim, FNQ cyclone recovery',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/emergency-guides/what-to-do-after-cyclone',
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  legalName: NAP.legalName,
  url: NAP.url,
  logo: NAP.logo,
  email: NAP.email,
  sameAs: NAP.sameAs,
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  knowsAbout: [
    'Cyclone Damage Restoration',
    'ARPC Cyclone Pool Claims',
    'Emergency Make-Safe After Cyclone',
    'Post-Cyclone Mould Prevention',
    'FNQ Cyclone Recovery',
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration',
  provider: {
    '@type': 'ProfessionalService',
    name: NAP.name,
    url: NAP.url,
  },
  serviceType: 'Cyclone and Storm Damage Restoration',
  description:
    'Emergency cyclone damage restoration across tropical Australia including FNQ, NT, and northern WA. ARPC cyclone pool claim assistance, multi-peril scoping, and rapid post-clearance response.',
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  url: 'https://disasterrecovery.com.au/guides/emergency-guides/what-to-do-after-cyclone',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is it safe to go outside after a cyclone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only go outside after receiving an official all-clear from the Bureau of Meteorology (BOM) or your state emergency services. Do NOT go outside during what appears to be a break in the storm — this may be the eye of the cyclone. Violent winds resume with no warning when the eye passes. Monitor ABC Emergency Radio, the BOM app, and official DFES, QFD, or SES social media channels for the all-clear message.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do in the first 30 minutes after cyclone clearance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After receiving the official all-clear, conduct a safety check of your property from the exterior only — do not enter if structural damage is visible. Photograph all damage you can see before entering or touching anything. Check for downed powerlines and treat all powerlines as live. Smell for gas leaks and do not enter if you detect gas. If the exterior appears structurally sound, enter cautiously and notify your insurer emergency line immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I lodge a cyclone insurance claim in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call your insurer emergency line to obtain a claim reference number. For properties in far north Queensland, the Northern Territory, and northern Western Australia, the ARPC Cyclone Pool applies — lodge your claim as both "cyclone damage" AND "water ingress" as separate line items. Keep the Bureau of Meteorology tropical cyclone event reference number from the BOM website as supporting evidence. You can also lodge for contractor dispatch at disasterrecovery.com.au/claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the ARPC Cyclone Pool the same as my normal insurer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The ARPC (Australian Reinsurance Pool Corporation) is the federal government reinsurance pool that covers cyclone risk for residential and small commercial properties in cyclone-prone areas of Australia. Your existing insurer processes the claim using their normal claims process, but ARPC provides the reinsurance backstop that funds cyclone-specific payouts. The claim process is the same as a normal claim, but it is important to lodge as "cyclone damage" specifically — not "storm damage" — to ensure correct pool allocation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to mould after a cyclone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In tropical Australia, mould can establish within 24 to 48 hours in water-damaged materials at ambient temperatures of 28 to 33 degrees Celsius — common conditions after a cyclone. Acting immediately after the official clearance is critical. IICRC S500:2025 structural drying commenced within 24 hours significantly reduces mould risk. Mould arising directly from cyclone-related water ingress is covered under the same cyclone claim as primary damage — it does not need to be lodged separately.',
      },
    },
  ],
};

export default function WhatToDoAfterCyclonePage() {
  return (
    <>
      <Script
        id="wtdac-professional-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="wtdac-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wtdac-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Emergency Guides"
        title="What to Do After a Cyclone — Emergency Recovery Guide Australia"
        gradient="linear-gradient(135deg, #0C2340 0%, #37474F 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Emergency Guides', href: '/guides/emergency-guides' },
          { label: 'What to Do After a Cyclone' },
        ]}
        sections={[
          {
            heading: 'Cyclone All-Clear — First 30 Minutes Checklist',
            body: (
              <>
                <p>
                  After a cyclone, the period immediately following the official all-clear is when
                  your actions have the most impact on both your safety and your property outcome.
                  Follow these steps in order.
                </p>
                <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Confirm the official all-clear.</strong> Monitor ABC Emergency Radio, the
                    BOM app, and your state emergency services social media channels. Do not act on
                    neighbour reports or social media speculation — only on official agency announcements.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Exterior safety check from the street.</strong> Before approaching your
                    property, check for downed powerlines in the road or on your property. Do not touch
                    or approach any downed powerline — treat all as live. Look for visible structural
                    damage from the street before approaching.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Photograph everything before entering.</strong> Document all exterior damage
                    from a safe distance. Roof damage, debris impacts, water ingress points, and fallen
                    trees must be photographed before any cleanup or entry. Timestamped photos are your
                    insurance evidence.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Check gas and electricity before entering.</strong> Smell for gas before
                    opening doors — if you detect gas, do not enter and call your gas provider
                    immediately. Check the switchboard for visible damage. If the switchboard is wet or
                    charred, call an electrician before entering.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Call your insurer emergency line.</strong> Lodge your claim and obtain a
                    reference number. Specify "cyclone damage" and separately note "water ingress" for
                    ARPC pool properties. Ask for make-safe authorisation.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Lodge with NRPG for emergency dispatch.</strong> Submit your claim at
                    disasterrecovery.com.au/claim to activate contractor dispatch. NRPG has contractors
                    pre-staged in cyclone-prone regions for rapid post-clearance response.
                  </li>
                </ol>
              </>
            ),
          },
          {
            heading: 'Hours 1–24 — Emergency Response',
            body: (
              <>
                <p>
                  With the safety checks complete and your claim lodged, the next 24 hours determine
                  how much secondary damage occurs to your property.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency roof tarping and board-up.</strong> Cyclone-damaged rooflines allow
                    significant water ingress during post-cyclone rainfall. Temporary tarping of exposed
                    roof areas and boarding of breached windows and doors is the single most effective
                    action to limit secondary water damage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water extraction.</strong> Standing water from storm surge, rain ingress, and
                    structural breaches must be extracted immediately. Commercial pumps and wet vacuums
                    are required — household equipment is insufficient for significant water volumes.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 3 water assessment.</strong> Storm surge and cyclone-driven
                    floodwater is classified as Category 3 (black water) under IICRC S500:2025. This
                    requires specific PPE, antimicrobial treatment, and often removal of porous materials
                    including carpet, underlay, and insulation.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Priority mould prevention.</strong> In tropical conditions, structural drying
                    equipment (air movers and dehumidifiers) must be deployed within 24 hours to prevent
                    mould establishment. This is particularly urgent in Cairns, Townsville, Darwin, and
                    Broome where ambient temperatures accelerate mould growth.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Temporary accommodation activation.</strong> For properties requiring
                    extensive make-safe works, confirm temporary accommodation entitlements with your
                    insurer. Most policies include accommodation provisions for uninhabitable properties.
                    Keep all accommodation and meal receipts.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Your Insurance Claim — ARPC Cyclone Pool',
            body: (
              <>
                <p>
                  Cyclone insurance in parts of Australia operates differently from standard storm claims
                  due to the ARPC Cyclone Pool. Understanding this affects how you lodge and manage
                  your claim.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>ARPC pool geography.</strong> The ARPC Cyclone Pool applies to residential
                    and eligible small commercial properties in Queensland north of the Tropic of
                    Capricorn, all of the Northern Territory, and Western Australia north of the Tropic
                    of Capricorn. Properties in these areas have cyclone cover underwritten through the
                    federal ARPC scheme regardless of which private insurer holds the policy.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Claim lodgement language matters.</strong> When lodging, specify "cyclone
                    damage" as the primary peril. Also note "water ingress" as a secondary item. This
                    ensures correct allocation to the ARPC pool. Claims lodged only as "storm damage"
                    may be processed under a different claim pathway.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>BOM event reference number.</strong> Obtain the Bureau of Meteorology
                    tropical cyclone event reference number from bom.gov.au. This is your formal
                    evidence that a declared cyclone event occurred and is required by insurers for
                    ARPC pool claims.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>24-hour notification requirement.</strong> Most ARPC pool policies require
                    notification within 24 hours of the all-clear. Do not delay — lodge your claim
                    immediately after completing your safety checks.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>NRPG multi-peril scope.</strong> Cyclone events typically generate combined
                    wind, rain, and water ingress damage. NRPG contractors are experienced in preparing
                    multi-peril scopes that correctly attribute damage to each cause — critical for
                    maximising ARPC pool entitlements.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'TC Maila 2026 — FNQ Recovery',
            body: (
              <>
                <p>
                  Tropical Cyclone Maila made landfall in Far North Queensland in April 2026. If your
                  property was affected, here is what you need to know about the NRPG response in
                  this event.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>NRPG was pre-staged in the FNQ region</strong> ahead of TC Maila's
                    landfall. Contractors were positioned in Cairns, Innisfail, Tully, and Townsville
                    for immediate post-clearance deployment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Priority claim queue for TC Maila.</strong> Claims lodged through
                    disasterrecovery.com.au/claim referencing TC Maila or the BOM cyclone event
                    reference number are placed in the priority dispatch queue for the fastest possible
                    contractor match.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>60-minute post-clearance response target.</strong> For properties within
                    30km of pre-staged NRPG contractor positions, the target response time from official
                    all-clear to contractor on-site is 60 minutes.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Weeks 1–8 recovery timeline.</strong> Emergency make-safe and water
                    extraction typically occur in week 1. Structural drying, mould assessment, and
                    contents pack-out occur in weeks 1 to 3. Structural repair and rebuild scope
                    approval typically completes by week 4. Rebuild commences in weeks 4 to 8 subject
                    to insurer scope approval and materials availability.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'When is it safe to go outside after a cyclone?',
            answer:
              'Only go outside after receiving an official all-clear from the Bureau of Meteorology (BOM) or your state emergency services. Do NOT go outside during what appears to be a break in the storm — this may be the eye of the cyclone. Violent winds resume with no warning when the eye passes. Monitor ABC Emergency Radio, the BOM app, and official DFES, QFD, or SES social media channels for the all-clear message.',
          },
          {
            question: 'What should I do in the first 30 minutes after cyclone clearance?',
            answer:
              'After receiving the official all-clear, conduct a safety check of your property from the exterior only — do not enter if structural damage is visible. Photograph all damage you can see before entering or touching anything. Check for downed powerlines and treat all powerlines as live. Smell for gas leaks and do not enter if you detect gas. If the exterior appears structurally sound, enter cautiously and notify your insurer emergency line immediately.',
          },
          {
            question: 'How do I lodge a cyclone insurance claim in Australia?',
            answer:
              'Call your insurer emergency line to obtain a claim reference number. For properties in far north Queensland, the Northern Territory, and northern Western Australia, the ARPC Cyclone Pool applies — lodge your claim as both "cyclone damage" AND "water ingress" as separate line items. Keep the Bureau of Meteorology tropical cyclone event reference number from the BOM website as supporting evidence. You can also lodge for contractor dispatch at disasterrecovery.com.au/claim.',
          },
          {
            question: 'Is the ARPC Cyclone Pool the same as my normal insurer?',
            answer:
              'No. The ARPC (Australian Reinsurance Pool Corporation) is the federal government reinsurance pool that covers cyclone risk for residential and small commercial properties in cyclone-prone areas of Australia. Your existing insurer processes the claim using their normal claims process, but ARPC provides the reinsurance backstop that funds cyclone-specific payouts. The claim process is the same as a normal claim, but it is important to lodge as "cyclone damage" specifically — not "storm damage" — to ensure correct pool allocation.',
          },
          {
            question: 'What happens to mould after a cyclone?',
            answer:
              'In tropical Australia, mould can establish within 24 to 48 hours in water-damaged materials at ambient temperatures of 28 to 33 degrees Celsius — common conditions after a cyclone. Acting immediately after the official clearance is critical. IICRC S500:2025 structural drying commenced within 24 hours significantly reduces mould risk. Mould arising directly from cyclone-related water ingress is covered under the same cyclone claim as primary damage — it does not need to be lodged separately.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Preparation Checklist',
            href: '/guides/emergency/cyclone-preparation-checklist',
            description: 'How to prepare your property and family before cyclone season.',
          },
          {
            title: 'Cyclone Insurance Claim Process',
            href: '/guides/insurance/cyclone-insurance-claim-process',
            description: 'Step-by-step guide to lodging and managing a cyclone insurance claim including ARPC.',
          },
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'NRPG response and claim lodgement for Tropical Cyclone Maila April 2026.',
          },
        ]}
        cta={{ text: 'Lodge Cyclone Claim Now', href: '/claim' }}
      />
    </>
  );
}
