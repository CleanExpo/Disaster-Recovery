/**
 * IICRC S700 Fire and Smoke Restoration — IICRC Standards Guide
 *
 * Framing: "What to Expect from an IICRC-Certified Contractor" — not a standards reference.
 * Does not describe, reproduce, or characterise the content of IICRC S700.
 * Canonical points to the authoritative category page.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Fire and Smoke Restoration — What to Expect from an IICRC-Certified Contractor',
  description:
    'What an IICRC-certified fire and smoke restoration contractor does: damage assessment, soot removal, deodorisation, contents restoration, and insurance documentation.',
  alternates: {
    canonical:
      'https://disasterrecovery.com.au/guides/fire-smoke/iicrc-s700-fire-smoke-restoration-standard',
  },
  openGraph: {
    title: 'Fire and Smoke Restoration — IICRC-Certified Contractor Process',
    description:
      'What to expect from an IICRC-certified fire and smoke restoration contractor: full property assessment, structural cleaning, deodorisation, and claim documentation.',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does an IICRC-certified fire and smoke restoration contractor do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An IICRC-certified fire and smoke restoration contractor will assess the full extent of fire, smoke, soot, and fire-suppression residue damage across the property — including areas remote from the fire. They will prepare a scope of works identifying what can be restored versus replaced, clean and deodourise affected structural materials, treat HVAC systems, restore or facilitate restoration of contents, and document the process for your insurance claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does smoke damage extend beyond the area of the fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smoke and odour compounds travel through wall cavities, roof spaces, and HVAC ductwork — depositing soot and residues in areas with no visible fire damage. Rooms remote from the fire location can contain smoke residue, and odour compounds can be absorbed into porous materials throughout the building. A certified contractor inspects the entire property, not just the burn area, to establish the full scope of contamination.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can contents be restored after a fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Whether contents can be restored depends on the damage type, materials involved, and how quickly restoration begins. Contents restoration may involve ultrasonic cleaning, thermal fogging, or other specialist techniques. A certified contractor assesses contents as part of the overall scope — distinguishing items that can be restored from items requiring replacement. This distinction affects your insurance claim scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is deodorisation and why is it important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Deodorisation is the process of eliminating smoke odour from structural materials and contents — not masking it. Smoke odour compounds penetrate porous materials deeply and cannot be removed by surface cleaning alone. A certified contractor uses techniques appropriate to the residue types and materials present. If deodourisation is not completed properly, persistent odour typically returns as temperature and humidity change, requiring a second round of treatment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does fire damage documentation support an insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Insurance claims for fire damage typically involve an insurer-appointed assessor reviewing the restoration scope. Documentation from a certified contractor — pre-restoration assessment, scope of works, treatment records, and clearance confirmation — demonstrates that the scope was professionally determined. If you believe the appointed contractor's scope understates the extent of smoke damage, independent documentation from a certified contractor provides the evidence for disputing the claim through AFCA.",
      },
    },
  ],
};

export default function S7002025FireSmokeRestorationPage() {
  return (
    <>
      <Script
        id="s700-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="IICRC Certification"
        title="Fire and Smoke Restoration"
        subtitle="What to Expect from an IICRC-Certified Contractor"
        gradient="linear-gradient(135deg, #2D1B0E 0%, #BF360C 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'IICRC Certification', href: '/guides/iicrc' },
          { label: 'Fire and Smoke Restoration' },
        ]}
        sections={[
          {
            heading: 'IICRC-Certified Fire and Smoke Restoration Contractors',
            body: (
              <>
                <p>
                  Contractors in the Disaster Recovery network hold current IICRC certification in
                  fire and smoke restoration. Certification confirms that a contractor has the
                  professional knowledge to assess, scope, and restore properties after fire and
                  smoke damage — including smoke migration to areas beyond the fire location.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Fire damage is frequently underscoped because smoke and soot travel further than
                  the visible burn area. What follows describes the full process a certified
                  contractor applies.
                </p>
              </>
            ),
          },
          {
            heading: 'The On-Site Process',
            body: (
              <>
                <p>A certified fire and smoke restoration contractor follows this sequence:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full property assessment</strong> — inspecting the entire property for
                    fire, smoke, soot, and suppression residue damage, including areas with no
                    visible fire damage
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Scope preparation</strong> — documenting what can be restored and what
                    requires replacement, with clear evidence for each decision
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural cleaning</strong> — removing soot and residues from affected
                    surfaces using methods appropriate to the material and residue type
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>HVAC treatment</strong> — cleaning ductwork and air handling systems
                    that may have distributed smoke contamination through the building
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Deodourisation</strong> — eliminating smoke odour from structural
                    materials and contents using appropriate specialist techniques
                  </li>
                  <li>
                    <strong>Clearance and documentation</strong> — confirming restoration targets
                    are met and producing records for the insurance claim
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Smoke Travels Beyond the Burn Area',
            body: (
              <p>
                A common problem with fire damage scopes is underestimating how far smoke migrates.
                Smoke travels through wall cavities, roof spaces, and HVAC ductwork — depositing
                residues and odour compounds in rooms that look unaffected. Porous materials
                throughout the building absorb odour compounds even when no visible soot is present.
                A certified contractor inspects the full property and tests apparently unaffected
                areas. An understated scope leads to persistent odour after work is declared
                complete, requiring a second round of treatment.
              </p>
            ),
          },
          {
            heading: 'What to Ask a Contractor',
            body: (
              <>
                <p>Before a fire and smoke restoration contractor starts work, ask:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Can you show me your current IICRC certification number?
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Will you inspect the full property — including areas remote from the fire?
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Will you assess the HVAC system for smoke contamination?
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    How will you address contents — assessment, restoration or replacement?
                  </li>
                  <li>What documentation will you provide for my insurer at each stage?</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'If You Disagree with the Scope',
            body: (
              <p>
                If an insurer-appointed contractor has produced a scope you believe understates the
                smoke damage, an independent certified contractor can assess the property and
                prepare a separate scope. Independent documentation provides the evidence base for
                disputing a claim through AFCA. Disaster Recovery can arrange an independent
                assessment.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
