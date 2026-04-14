import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-603: IICRC S700:2025 Fire & Smoke Damage Restoration — Policyholder Guide
 *
 * First-mover opportunity: S700 is a first edition published 2025.
 * Framing: "What to Expect from a Certified Contractor"
 * Do NOT reproduce the IICRC S700 standard itself.
 * Cover: smoke odour disputes (major insurer tactic), S700 documentation, clearance testing.
 *
 * ACL s18 compliant — no guarantee language, no first-person business language.
 */

export const metadata: Metadata = {
  title: 'IICRC S700:2025 Fire & Smoke Damage Restoration — What It Means for Your Claim',
  description:
    'IICRC S700:2025 is the first edition of the Fire and Smoke Damage Restoration standard, published in 2025. This guide explains smoke odour documentation, what certified contractors must assess and record, how S700 methodology supports disputed fire and smoke damage claims, and the AFCA pathway for smoke damage disputes in Australia.',
  keywords:
    'IICRC S700 fire smoke damage, S700 2025 standard, fire damage restoration Australia, smoke damage insurance claim, smoke odour dispute insurance, smoke damage documentation, IICRC certified fire restoration, bushfire smoke claim Australia',
  openGraph: {
    title: 'IICRC S700:2025 Fire & Smoke Damage Restoration — What It Means for Your Claim',
    description:
      'IICRC S700:2025 first edition fire and smoke damage standard explained for policyholders. Smoke odour documentation, insurer dispute tactics, clearance testing, and AFCA pathways for smoke damage claims in Australia.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('IICRC S700 Fire & Smoke Damage Guide')}&city=${encodeURIComponent('Australia')}&service=fire-smoke-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/standards/iicrc-s700-fire-smoke`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is IICRC S700:2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S700:2025 is the first edition of the Standard for Professional Fire and Smoke Damage Restoration, published in 2025 by the Institute of Inspection, Cleaning and Restoration Certification. It defines technical requirements for assessment, documentation, restoration, and clearance of fire and smoke-damaged property.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do insurers dispute smoke odour claims specifically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smoke odour disputes are common because odour is not visually quantifiable. Insurers frequently argue that odour is subjective, that standard cleaning is sufficient, or that residual odour is acceptable. S700 methodology provides objective documentation tools \u2014 including air quality measurement, surface contamination testing, and HVAC system assessment \u2014 that establish smoke contamination on a measurable rather than subjective basis.',
      },
    },
    {
      '@type': 'Question',
      name: 'My property was not directly in a fire but smoke entered from a nearby bushfire. Is that a covered loss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smoke ingress from a nearby fire or bushfire event is typically a covered loss under home insurance when caused by a covered peril (fire or bushfire). S700 methodology documents smoke contamination including soot deposition, odour-causing compound distribution in HVAC systems, and surface contamination levels, supporting the claim even when there is no direct structural fire damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is clearance testing for smoke damage and who conducts it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smoke damage clearance testing verifies that restoration has successfully reduced smoke contamination \u2014 soot, odour compounds, and airborne particles \u2014 to acceptable levels. Under S700 methodology, clearance is documented through air quality measurement and surface testing conducted after restoration, by a qualified party who did not perform the restoration. Clearance documentation is part of the completion record.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: NAP.url },
    { '@type': 'ListItem', position: 2, name: 'Standards', item: `${NAP.url}/standards` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'IICRC S700 Fire & Smoke Damage',
      item: `${NAP.url}/standards/iicrc-s700-fire-smoke`,
    },
  ],
};

export default function IICRCS700Page() {
  return (
    <>
      <Script
        id="s700-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="s700-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AgGuidePageTemplate
        category="IICRC Standards"
        title="IICRC S700:2025 Fire & Smoke Damage Restoration — What It Means for Your Claim"
        subtitle="IICRC S700:2025 is the first edition of the fire and smoke damage restoration standard, published in 2025. This guide covers smoke odour documentation, what certified contractors must assess, clearance testing, and how S700 methodology supports disputed fire and smoke damage claims in Australia."
        gradient="linear-gradient(135deg, #7B1C1C 0%, #B71C1C 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Standards', href: '/standards' },
          { label: 'IICRC S700 Fire & Smoke Damage' },
        ]}
        sections={[
          {
            heading: 'What Is IICRC S700:2025?',
            body: (
              <>
                <p>
                  The IICRC S700 Standard for Professional Fire and Smoke Damage Restoration is the first
                  published standard specifically addressing fire and smoke damage restoration. Released in
                  2025, S700 fills a long-standing gap — prior to S700, fire and smoke restoration in
                  Australia operated under informal industry guidelines without a consolidated benchmark
                  standard.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  S700 establishes technical requirements for assessment, documentation, restoration, and
                  clearance of fire and smoke-damaged property. As the first edition, S700 represents the
                  current state of industry knowledge, including updated methodology for smoke odour
                  documentation — the most common source of fire damage claim disputes in Australia.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In the Australian insurance claims context, S700 provides certified contractors and
                  policyholders with a technical framework for documenting smoke damage on an objective,
                  measurable basis — replacing subjective assessments with documented contamination
                  measurements.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>IICRC official information:</strong>{' '}
                  <a
                    href="https://www.iicrc.org/standards"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    iicrc.org/standards
                  </a>
                </p>
              </>
            ),
          },
          {
            heading: 'Smoke Odour Disputes — The Most Common Insurer Tactic',
            body: (
              <>
                <p>
                  Smoke odour disputes are the most frequently contested element of fire and bushfire
                  damage claims in Australia. Insurers dispute smoke odour claims using several recurring
                  arguments:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>"Odour is subjective"</strong> — S700 methodology provides objective
                    documentation through air quality sampling and odour compound measurement. This
                    replaces subjective assessments with documented contamination levels, making odour
                    claims verifiable rather than arguable.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>"Standard cleaning is sufficient"</strong> — smoke odour compounds penetrate
                    porous materials including timber framing, plasterboard, carpet underlay, and HVAC
                    ductwork. S700 methodology assesses penetration depth and identifies when surface
                    cleaning alone is insufficient to remove odour-causing compounds from affected
                    materials.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>"The HVAC system is not affected"</strong> — smoke travels through HVAC
                    systems and distributes contamination throughout a building. S700 assessment includes
                    HVAC system inspection and duct cleaning requirements as a standard element, not an
                    optional add-on.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>"Residual odour is acceptable"</strong> — S700 clearance testing establishes
                    whether restoration has achieved acceptable contamination levels by measurement, not
                    by contractor self-assessment. Residual odour above clearance levels documents
                    incomplete remediation.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What a Certified S700 Contractor Documents',
            body: (
              <>
                <p>
                  An S700-compliant fire and smoke damage assessment produces documentation covering:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Soot and char inventory</strong> — photographic and written documentation of
                    all areas with soot deposition or char damage, including concealed spaces accessible
                    by investigation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Smoke penetration assessment</strong> — identification of smoke penetration
                    into building materials and cavities, distinguishing surface contamination from
                    deep penetration requiring material replacement.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>HVAC system assessment</strong> — inspection of all HVAC components including
                    ductwork, filters, and mechanical units for smoke contamination requiring cleaning
                    or replacement.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Air quality baseline measurement</strong> — pre-restoration air quality
                    measurement establishing contamination levels for comparison against post-restoration
                    clearance testing.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Scope of works</strong> — itemised materials requiring cleaning, treatment,
                    or replacement, with technical justification for each decision based on S700 methodology.
                  </li>
                </ul>
                <p style={{ marginTop: '0.75rem', fontStyle: 'italic', fontSize: '0.875rem', color: '#555' }}>
                  NRPG collects your contact and property details to coordinate contractor matching. See our{' '}
                  <a href="/privacy">Privacy Policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Bushfire Smoke Claims — Properties Not Directly Burnt',
            body: (
              <>
                <p>
                  A significant number of bushfire insurance claims in Australia involve properties that
                  were not directly in the fire path but suffered smoke and soot contamination from nearby
                  or regional bushfire activity. S700 is particularly relevant for this scenario because:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>No structural fire damage does not mean no covered loss</strong> — smoke
                    ingress from a covered bushfire peril is a covered loss regardless of whether the
                    structure itself burned. S700 methodology documents smoke contamination independently
                    of structural damage.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>HVAC contamination distribution</strong> — in smoke-ingress events, HVAC
                    systems draw smoke through the entire building, creating contamination across all
                    zones even if smoke entered through only one area. Full HVAC assessment is essential.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Duration of smoke exposure matters</strong> — extended smoke exposure during
                    multi-day bushfire events deposits contamination that requires professional remediation
                    rather than domestic cleaning. S700 methodology distinguishes cosmetic from structural
                    contamination.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Smoke-only bushfire claims are frequently under-scoped in initial insurer assessments.
                  Independent S700 assessment establishes the full contamination extent, including HVAC
                  systems and penetrated materials.
                </p>
              </>
            ),
          },
          {
            heading: 'Clearance Testing and What It Proves',
            body: (
              <>
                <p>
                  S700 clearance testing verifies that restoration has reduced smoke and soot contamination
                  to acceptable levels by measurement. Clearance testing under S700 methodology:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Is conducted after restoration and before contractor demobilisation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Compares post-restoration air quality and surface readings against the pre-restoration
                    baseline measurements.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Documents whether odour compounds and airborne particulates have been reduced to
                    acceptable levels across all treated areas, including HVAC system discharge air.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If your insurer's contractor completed fire or smoke restoration without clearance testing,
                  you have no documented basis for knowing whether remediation met S700 requirements. If
                  odour persists after restoration, the absence of clearance testing supports a
                  supplementary scope claim — the contractor cannot demonstrate that the work met the
                  applicable technical standard.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  AFCA handles disputed smoke damage claims at{' '}
                  <a
                    href="https://www.afca.org.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    afca.org.au
                  </a>
                  . Lodgement is free. NRPG does not control claim outcomes — AFCA and your insurer
                  determine final decisions.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is IICRC S700:2025?',
            answer:
              'IICRC S700:2025 is the first edition of the Standard for Professional Fire and Smoke Damage Restoration, published in 2025 by the Institute of Inspection, Cleaning and Restoration Certification. It defines technical requirements for assessment, documentation, restoration, and clearance of fire and smoke-damaged property.',
          },
          {
            question: 'Why do insurers dispute smoke odour claims specifically?',
            answer:
              'Smoke odour disputes are common because odour is not visually quantifiable. Insurers frequently argue that odour is subjective or that standard cleaning is sufficient. S700 methodology provides objective documentation tools \u2014 air quality measurement, surface contamination testing, and HVAC system assessment \u2014 that establish smoke contamination on a measurable rather than subjective basis.',
          },
          {
            question: 'My property was not directly in a fire but smoke entered from a nearby bushfire. Is that covered?',
            answer:
              'Smoke ingress from a nearby fire or bushfire event is typically a covered loss under home insurance when caused by a covered peril. S700 methodology documents smoke contamination including soot deposition, odour-causing compound distribution in HVAC systems, and surface contamination levels, supporting the claim even without direct structural fire damage.',
          },
          {
            question: 'What is clearance testing for smoke damage and who conducts it?',
            answer:
              'Smoke damage clearance testing verifies that restoration has successfully reduced smoke contamination to acceptable levels. Under S700 methodology, clearance is documented through air quality measurement and surface testing conducted after restoration, by a qualified party who did not perform the restoration. Clearance documentation is part of the completion record.',
          },
        ]}
        relatedGuides={[
          {
            title: 'IICRC S500 Water Damage Standard',
            href: '/standards/iicrc-s500-water-damage',
            description: 'What IICRC S500:2025 means for your flood or water damage claim.',
          },
          {
            title: 'IICRC S520 Mould Remediation Standard',
            href: '/standards/iicrc-s520-mold-remediation',
            description: 'IICRC S520:2025 mould remediation — what to expect from a certified contractor.',
          },
          {
            title: 'Victoria Bushfires 2026',
            href: '/events/victoria-bushfires-2026',
            description: 'Victoria Bushfires 2026 — PERILS AU$786M, Parliamentary inquiry, claim support.',
          },
          {
            title: 'Victoria Hub',
            href: '/vic',
            description: 'Victoria disaster recovery hub — bushfire claims and certified contractor network.',
          },
          {
            title: 'Underinsurance in Australia',
            href: '/guides/insurance/underinsurance-australia',
            description: 'Understanding underinsurance and policy sum insured adequacy.',
          },
        ]}
        cta={{ text: 'Request an S700-Compliant Fire & Smoke Damage Assessment', href: '/claim' }}
      />
    </>
  );
}
