/**
 * IICRC S500 Water Damage Restoration — IICRC Standards Guide
 *
 * Framing: "What to Expect from an IICRC-Certified Contractor" — not a standards reference.
 * Does not describe, reproduce, or characterise the content of ANSI/IICRC S500.
 * Canonical points to the authoritative category page.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Water Damage Restoration — What to Expect from an IICRC-Certified Contractor',
  description:
    'What an IICRC-certified water damage contractor does on site: inspection, extraction, structural drying, daily monitoring, and insurance-standard documentation. Disaster Recovery.',
  alternates: {
    canonical:
      'https://disasterrecovery.com.au/guides/water-damage/iicrc-s500-water-damage-restoration-standard',
  },
  openGraph: {
    title: 'Water Damage Restoration — IICRC-Certified Contractor Process',
    description:
      'What to expect from an IICRC-certified water damage restoration contractor: the on-site process, daily monitoring, and documentation your insurance claim needs.',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does an IICRC-certified water damage contractor do on site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An IICRC-certified water damage contractor will inspect and moisture-map the affected areas, remove standing water through extraction, set up structural drying equipment (air movers and dehumidifiers), monitor moisture levels daily, and produce documentation from initial assessment through to final drying clearance. The process is designed to return affected materials to a dry standard consistent with pre-loss conditions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does certification matter for a water damage insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A certified contractor produces documentation — moisture mapping, drying logs, and scope of works — in a format that insurers recognise and accept. This evidence trail shows that damage was fully identified, drying was managed professionally, and clearance targets were reached. This matters most when disputes arise about whether secondary damage (mould, structural movement) resulted from incomplete drying.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is moisture mapping and why does my claim need it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Moisture mapping is the process of recording moisture readings at specific locations throughout the affected area — including wall cavities, subfloors, and ceiling voids that are not visible from a surface inspection. A moisture map taken at initial assessment establishes the full extent of damage. Follow-up readings track drying progress. Together they form the documentary evidence that all affected areas were identified and that drying was completed, not assumed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does structural drying take after a flood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Structural drying typically takes between three and seven days depending on the extent of water intrusion, the materials affected, and the climate conditions. A certified contractor monitors progress daily and adjusts equipment accordingly. Drying is considered complete when moisture readings across all affected areas reach target levels, not when surfaces feel or appear dry. Do not remove drying equipment before a certified contractor confirms clearance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I request an independent assessment if I dispute the scope?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If you believe the scope prepared by an insurer-appointed contractor does not capture the full extent of damage, you can request an independent assessment through Disaster Recovery. An independent IICRC-certified contractor will assess the property and prepare their own moisture map and scope of works in a format suitable for AFCA review if you need to escalate a dispute.',
      },
    },
  ],
};

export default function S5002025WaterDamageRestorationPage() {
  return (
    <>
      <Script
        id="s500-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="IICRC Certification"
        title="Water Damage Restoration"
        subtitle="What to Expect from an IICRC-Certified Contractor"
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'IICRC Certification', href: '/guides/iicrc' },
          { label: 'Water Damage Restoration' },
        ]}
        sections={[
          {
            heading: 'IICRC-Certified Water Damage Contractors',
            body: (
              <>
                <p>
                  Every contractor in the Disaster Recovery network holds current IICRC
                  certification in water damage restoration. Certification is independently assessed
                  and must be renewed — it confirms that a contractor has demonstrated the knowledge
                  required to professionally remediate water-damaged properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Certification matters because it affects the quality and completeness of the work
                  — and the documentation that supports your insurance claim. What follows is what
                  you should expect from a certified contractor on site.
                </p>
              </>
            ),
          },
          {
            heading: 'The On-Site Process',
            body: (
              <>
                <p>A certified water damage contractor follows a structured sequence:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Inspection and moisture mapping</strong> — locating all affected areas
                    using moisture meters and thermal imaging, including wall cavities, subfloors,
                    and ceiling voids not visible on the surface
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water extraction</strong> — removing standing water and saturated
                    material that cannot be dried in place
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural drying setup</strong> — positioning air movers and
                    dehumidifiers to create controlled drying conditions across all affected areas
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Daily monitoring</strong> — recording moisture readings each day to
                    track drying progress and adjust equipment as needed
                  </li>
                  <li>
                    <strong>Final clearance and documentation</strong> — confirming that moisture
                    readings across all affected areas have reached target levels, and producing the
                    documentation your insurer needs
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What to Ask a Contractor Before Work Begins',
            body: (
              <>
                <p>Before a contractor starts work, ask:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Can you show me your current IICRC certification number?
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Will you provide a moisture map from the initial inspection?
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    How often will you monitor drying progress and provide readings?
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    What documentation will you produce for my insurer?
                  </li>
                  <li>How will you confirm when drying is complete?</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Flood and Cyclone Events',
            body: (
              <p>
                After a cyclone, flood, or significant storm event, properties may have multiple
                sources of water intrusion — roof damage, stormwater ingress, and rising floodwater
                can all be present simultaneously. A certified contractor assesses all sources and
                affected areas, not just the most visible damage. In post-disaster conditions,
                prompt assessment is important: the longer water remains in building materials, the
                greater the risk of secondary damage including mould growth.
              </p>
            ),
          },
          {
            heading: 'If You Disagree with the Scope',
            body: (
              <p>
                If an insurer-appointed contractor has produced a scope of works you believe
                understates the damage, an independent certified contractor can assess the property
                and prepare a separate scope. This independent documentation provides the evidence
                base for disputing a claim through AFCA (Australian Financial Complaints Authority).
                Disaster Recovery can arrange an independent assessment.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
