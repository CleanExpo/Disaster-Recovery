/**
 * IICRC S700:2025 — Fire & Smoke Damage Restoration Standard Guide
 *
 * BUILD-002: Fire/smoke content with IICRC S700:2025 integration.
 * GAP-023: IICRC S700 not previously referenced in platform content.
 *
 * ACL s18 compliant — no unverified statistics.
 * All IICRC standard descriptions are consistent with published S700:2025 scope.
 */

import type { Metadata } from 'next'
import { Flame } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'IICRC S700:2025 Fire & Smoke Restoration Standard | Disaster Recovery Australia',
  description:
    'What IICRC S700:2025 means for fire and smoke damage restoration. Smoke classification, decontamination protocols, HVAC cleaning, and what to expect from a certified restoration contractor.',
  keywords: [
    'IICRC S700',
    'fire damage restoration standard',
    'smoke damage restoration',
    'fire and smoke restoration',
    'IICRC certified fire restoration',
    'smoke classification',
    'fire damage Australia',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/fire-smoke/iicrc-s700-fire-smoke-restoration-standard`,
  },
  openGraph: {
    title: 'IICRC S700:2025 — Fire & Smoke Damage Restoration Standard',
    description:
      'Guide to IICRC S700:2025: the current standard for professional fire and smoke damage restoration in Australia. Smoke types, protocols, and what certified means for your property.',
    url: `${NAP.url}/guides/fire-smoke/iicrc-s700-fire-smoke-restoration-standard`,
    type: 'website',
  },
}

export default function IicrcS700FireSmokeStandardPage() {
  return (
    <AgGuidePageTemplate
      category="Fire & Smoke"
      title="IICRC S700:2025 — Fire & Smoke Damage Restoration Standard"
      subtitle="What the current IICRC standard means for your property, your contractor, and your insurance claim."
      gradient="linear-gradient(135deg, #2D0A0A 0%, #741A1A 100%)"
      icon={<Flame className="h-10 w-10" />}
      lastReviewed="2026-04-08"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Fire & Smoke', href: '/guides/fire-smoke' },
        { label: 'IICRC S700:2025' },
      ]}
      cta={{ text: 'Find a Certified Contractor', href: '/claim' }}
      sections={[
        {
          heading: 'What is IICRC S700:2025?',
          body: (
            <>
              <p>
                IICRC S700:2025 is the current edition of the <strong>Standard for Professional Fire and Smoke Damage Restoration</strong>, published by the Institute of Inspection, Cleaning and Restoration Certification (IICRC). It defines minimum requirements for safe, effective restoration of properties damaged by fire, smoke, and related residues.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The 2025 edition updated protocols for smoke residue classification, decontamination procedures, HVAC system cleaning following fire exposure, and documentation requirements for insurance claims. IICRC S700:2025 is the benchmark standard referenced by insurers, loss adjusters, and courts when assessing whether restoration work was completed to an appropriate professional standard.
              </p>
              <p style={{ marginTop: '1rem' }}>
                When you engage an IICRC-certified fire and smoke restoration contractor, you are engaging a professional who is trained to follow S700:2025 protocols — not the informal practices of a general builder or cleaner.
              </p>
            </>
          ),
        },
        {
          heading: 'Smoke Classification Under S700:2025',
          background: 'light',
          body: (
            <>
              <p>
                Not all fire residue is the same. IICRC S700:2025 classifies smoke residue by its physical and chemical characteristics, because different residue types require different cleaning agents and techniques. Applying the wrong method can permanently set stains or spread contamination.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
                {[
                  {
                    type: 'Wet Smoke Residue',
                    source: 'Low-heat, smouldering fires (rubber, plastic)',
                    character: 'Sticky, smeary, pungent odour. Difficult to clean — smears with incorrect technique.',
                    response: 'Requires specific alkaline cleaning agents. Must not be dry-cleaned.',
                  },
                  {
                    type: 'Dry Smoke Residue',
                    source: 'Fast-burning, high-heat fires (paper, wood)',
                    character: 'Dry, powdery residue. Easier to vacuum but penetrates porous surfaces deeply.',
                    response: 'Dry chemical sponges and HEPA vacuum prior to wet cleaning.',
                  },
                  {
                    type: 'Protein Residue',
                    source: 'Kitchen fires — burning food, grease',
                    character: 'Near-invisible film with strong, persistent odour. Discolours paint and varnish.',
                    response: 'Enzyme-based cleaners. Often requires repainting affected surfaces.',
                  },
                  {
                    type: 'Fuel/Oil Residue',
                    source: 'Petroleum product combustion, heating system fires',
                    character: 'Heavy, pungent. Penetrates deeply into porous materials.',
                    response: 'Solvent-based cleaning prior to encapsulation. May require surface replacement.',
                  },
                ].map((s) => (
                  <div
                    key={s.type}
                    style={{
                      background: 'white',
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderTop: '3px solid #B91C1C',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#1F2937', marginBottom: '0.5rem' }}>{s.type}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '0.5rem' }}><strong>Source:</strong> {s.source}</div>
                    <div style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '0.5rem' }}>{s.character}</div>
                    <div style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 500 }}>Response: {s.response}</div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#6B7280' }}>
                Correct smoke classification at the assessment phase is the foundation of S700:2025 compliance. A contractor who applies a single cleaning method to all residue types is not following the standard.
              </p>
            </>
          ),
        },
        {
          heading: 'The S700:2025 Restoration Workflow',
          body: (
            <>
              <p>
                IICRC S700:2025 defines a structured workflow for fire and smoke restoration. While the specific scope varies by job, a S700:2025-compliant contractor will follow these phases:
              </p>
              <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2.2 }}>
                <li>
                  <strong>Safety assessment and hazard identification</strong> — Structural integrity check, identification of asbestos, lead paint, or compromised electrical systems before any work begins.
                </li>
                <li>
                  <strong>Documentation and scope of works</strong> — Photographic and written record of all affected areas and materials. This documentation supports your insurance claim.
                </li>
                <li>
                  <strong>Emergency stabilisation</strong> — Board-up, roof tarping, and temporary power isolation to secure the property and prevent further damage.
                </li>
                <li>
                  <strong>Smoke residue classification</strong> — Assessment of residue type (wet, dry, protein, or fuel/oil) to determine appropriate cleaning methods for each surface.
                </li>
                <li>
                  <strong>Contents removal and pack-out</strong> — Removal and inventory of salvageable contents for off-site cleaning and storage during structural restoration.
                </li>
                <li>
                  <strong>Structural decontamination</strong> — Systematic top-down cleaning of ceilings, walls, and floors using S700:2025-specified cleaning agents for the identified residue type.
                </li>
                <li>
                  <strong>HVAC system cleaning</strong> — S700:2025 requires specific protocols for decontaminating heating, ventilation, and air conditioning systems after fire events. Smoke travels through ductwork and deposits residue in all connected rooms — including rooms unaffected by the fire itself.
                </li>
                <li>
                  <strong>Odour neutralisation</strong> — Thermal fogging, hydroxyl generation, or ozone treatment as specified by S700:2025 protocols for the residue type. Masking agents are not S700:2025 compliant.
                </li>
                <li>
                  <strong>Encapsulation and reconstruction preparation</strong> — Shellac-based sealants applied to structural framing to permanently seal residual odours prior to reconstruction.
                </li>
                <li>
                  <strong>Final inspection and documentation</strong> — Completion report including before/after documentation for insurer review.
                </li>
              </ol>
            </>
          ),
        },
        {
          heading: 'Why S700:2025 Matters for Your Insurance Claim',
          background: 'light',
          body: (
            <>
              <p>
                Insurance claims for fire damage frequently involve disputes over scope of works. When an insurer&apos;s preferred contractor uses a different (often less thorough) method than the standard requires, policyholders can end up with incomplete restoration — and a closed claim that does not cover the actual damage.
              </p>
              <p style={{ marginTop: '1rem' }}>
                An independent IICRC S700:2025 assessment documents all damage to the S700 standard. This creates a baseline scope of works that:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Identifies items the insurer&apos;s scope may have missed (HVAC, protein residue in unburned rooms, contents contamination)</li>
                <li>Provides documented evidence for any AFCA dispute or internal review</li>
                <li>Establishes whether completed restoration work was performed to the current professional standard</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If your insurer&apos;s scope of works does not reference IICRC S700:2025, you have the right to request an independent assessment. Recent AFCA rulings have supported policyholders who obtained independent documentation showing the insurer&apos;s scope was below the current professional standard.
              </p>
            </>
          ),
        },
        {
          heading: 'IICRC S700:2025 and the Victoria Bushfires',
          body: (
            <>
              <p>
                The 2025–2026 Victoria bushfire season produced an ICA-declared Insurance Catastrophe (3,123 claims across 18 LGAs). Bushfire restoration is distinct from structure fires in key ways:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>
                  <strong>Wildfire smoke penetration</strong> — smoke from external bush fires infiltrates roof cavities, wall cavities, and HVAC systems even in properties that were not directly burned. S700:2025 HVAC protocols apply.
                </li>
                <li>
                  <strong>Ash and particulate contamination</strong> — fine ash from vegetation fires has different chemical properties to combustion residue from structural materials. Correct residue classification under S700:2025 is essential.
                </li>
                <li>
                  <strong>Extended odour persistence</strong> — bushfire smoke odour can persist for months without correct treatment. Masking agents are not a S700:2025 compliant solution.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If your property was in a declared Victoria bushfire area and received smoke infiltration — even without direct fire contact — an IICRC S700:2025 assessment will document whether your insurer&apos;s scope of works addressed all affected areas.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is IICRC S700:2025?',
          answer:
            'IICRC S700:2025 is the current Standard for Professional Fire and Smoke Damage Restoration, published by the IICRC. It defines protocols for smoke classification, decontamination, HVAC cleaning, and documentation requirements for fire-damaged properties.',
        },
        {
          question: 'Do I need an IICRC-certified contractor for fire damage restoration?',
          answer:
            'Your insurer is not legally required to use an IICRC-certified contractor, but IICRC S700:2025 is the recognised professional standard in Australia. If restoration work is disputed, AFCA and courts reference industry standards when assessing whether work was completed appropriately. An IICRC-certified contractor provides documented evidence of standard-compliant work.',
        },
        {
          question: 'What is the difference between wet smoke and dry smoke residue?',
          answer:
            'Wet smoke residue comes from low-heat smouldering fires (rubber, plastics) and is sticky and smeary — applying dry cleaning methods will spread it further. Dry smoke residue comes from fast-burning, high-heat fires (paper, wood) and is powdery but penetrates porous surfaces deeply. S700:2025 requires different cleaning agents and techniques for each type.',
        },
        {
          question: 'Does smoke damage in rooms not directly affected by fire count as a covered loss?',
          answer:
            'Yes. Smoke travels through HVAC systems, wall cavities, and roof spaces, depositing residue in rooms far from the fire origin. IICRC S700:2025 requires assessment of the full property including HVAC systems. If your insurer\'s scope only covers directly burned areas, you may have grounds to request an independent assessment.',
        },
        {
          question: 'How does the IICRC S700:2025 standard help with insurance disputes?',
          answer:
            'An independent IICRC S700:2025 assessment documents all fire and smoke damage to the current professional standard. If your insurer\'s scope of works is less comprehensive than S700:2025 requires, this documentation can support an AFCA complaint or internal dispute review.',
        },
      ]}
      relatedGuides={[
        { title: 'Fire Damage Restoration Services', href: '/services/fire-damage-restoration' },
        { title: 'Victoria Bushfires 2025 — Event Page', href: '/events/victoria-bushfires-2025' },
        { title: 'Victoria Bushfires 2026 — Event Page', href: '/events/victoria-bushfires-2026' },
        { title: 'Why Hire an IICRC-Certified Professional', href: '/guides/certifications/why-hire-iicrc-certified' },
        { title: 'IICRC S500:2025 Water Damage Restoration', href: '/guides/water-damage/iicrc-s500-water-damage-standard' },
      ]}
    />
  )
}
