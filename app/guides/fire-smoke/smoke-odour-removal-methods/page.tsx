/**
 * Smoke Odour Removal Methods — What IICRC S700 Certified Contractors Use
 *
 * IICRC compliance: references ANSI/IICRC S700:2025 as the certification
 * benchmark held by our contractors. Describes certified contractor methods —
 * not the standard's content.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import type { Metadata } from 'next'
import Script from 'next/script'
import { Wind } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Smoke Odour Removal Methods — What IICRC S700 Certified Contractors Use | Disaster Recovery Australia',
  description:
    'How IICRC S700:2025 certified contractors remove smoke odour after fire damage. Thermal fogging, ozone treatment, hydroxyl generators, and HEPA air scrubbing explained.',
  keywords: [
    'smoke odour removal',
    'thermal fogging fire damage',
    'ozone treatment smoke',
    'hydroxyl generator smoke removal',
    'IICRC S700 smoke restoration',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/fire-smoke/smoke-odour-removal-methods`,
  },
  openGraph: {
    title: 'Smoke Odour Removal Methods — What IICRC S700 Certified Contractors Use',
    description:
      'How IICRC S700:2025 certified contractors remove smoke odour after fire damage. Thermal fogging, ozone treatment, hydroxyl generators, and HEPA air scrubbing explained.',
    url: `${NAP.url}/guides/fire-smoke/smoke-odour-removal-methods`,
    type: 'website',
  },
}

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
    name: 'Fire and Smoke Restoration',
  },
  sameAs: NAP.sameAs,
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Smoke Odour Removal',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Smoke Odour Removal',
  description:
    'IICRC S700:2025-certified smoke odour removal using thermal fogging, ozone treatment, hydroxyl generators, and HEPA air scrubbing. Full deodorisation documentation for insurance sign-off.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I remove smoke odour myself after a house fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Surface cleaning may reduce visible soot but smoke odours penetrate porous materials (plasterboard, timber, insulation) and HVAC systems. DIY methods like candles or air fresheners mask odours temporarily. Permanent removal requires IICRC S700:2025 professional deodorisation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is thermal fogging for smoke odour removal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Thermal fogging heats a deodorising solvent into fine fog particles that penetrate the same porous materials the smoke entered. It matches smoke molecule penetration depth, making it most effective for post-fire odour in structural materials. It is not suitable if residents remain on-site during treatment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an ozone generator and when is it used for smoke odour?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ozone (O₃) oxidises smoke molecules at a molecular level and is highly effective for absorbed smoke odour in soft furnishings, carpet, and timber. Treatment must be done in an unoccupied space — ozone is harmful at treatment concentrations. A 4–24 hour treatment is followed by a ventilation period before re-occupancy.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does smoke odour removal take after a house fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A single room typically takes 1–3 days including thermal fogging and airing. A whole house takes 5–10 days. Contents may require separate off-site treatment. HVAC decontamination adds 1–2 additional days. IICRC S700:2025 documentation is issued on completion for insurance sign-off.',
      },
    },
  ],
}

export default function SmokeOdourRemovalMethodsPage() {
  return (
    <>
      <Script
        id="sorm-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="sorm-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="sorm-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire and Smoke Restoration"
        title="Smoke Odour Removal Methods — What IICRC S700 Certified Contractors Use"
        subtitle="How IICRC S700:2025 certified contractors remove smoke odour after fire damage using thermal fogging, ozone treatment, hydroxyl generators, and HEPA air scrubbing."
        gradient="linear-gradient(135deg, #37474F 0%, #546E7A 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Fire Smoke', href: '/guides/fire-smoke' },
          { label: 'Smoke Odour Removal Methods' },
        ]}
        cta={{ text: 'Book IICRC-Certified Smoke Remediation', href: '/claim' }}
        sections={[
          {
            heading: 'Why Smoke Odour is Hard to Remove',
            body: (
              <>
                <p>
                  Smoke particles produced by a house fire range from 0.4 to 0.7 microns in diameter — small enough to
                  penetrate porous building materials including plasterboard, timber framing, insulation batts, and
                  ceiling cavities. Unlike surface soot, which can be wiped away, smoke compounds absorb into the
                  molecular structure of these materials and off-gas odour long after visible residue is cleaned.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  A further complication is the HVAC system. Smoke drawn into return air ducts during a fire is
                  distributed throughout the building, depositing residue in ductwork, on coils, and in every room
                  served by the system. This is why properties can have strong smoke odour in rooms remote from the
                  fire origin.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The type of material burned also affects the odour compounds produced:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li><strong>Protein fires</strong> (cooking fires, animal matter) — produce a near-invisible but highly penetrating residue with strong, acrid odour</li>
                  <li><strong>Synthetic fires</strong> (plastics, rubber, foam furniture) — produce heavy, oily soot with pungent petrochemical odour</li>
                  <li><strong>Paper and wood fires</strong> — produce dry, powdery residue with a more familiar smoke odour that is easier to treat</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Each fire type requires a different deodorisation approach. IICRC S700:2025-certified contractors are
                  trained to identify the fire type and select appropriate methods for the specific odour compounds present.
                </p>
              </>
            ),
          },
          {
            heading: 'Professional Smoke Odour Removal Methods',
            background: 'light' as const,
            body: (
              <>
                <p>
                  IICRC S700:2025 certified contractors use a combination of deodorisation methods depending on the
                  materials affected, the severity of odour penetration, and whether the property is occupied during
                  treatment.
                </p>

                <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '1.1rem' }}>
                  Thermal Fogging
                </h3>
                <p>
                  A petroleum-based or water-based deodorising solvent is heated through a fogging machine to create
                  very fine particles — typically 0.5–5 microns — that suspend in air and penetrate the same porous
                  surfaces that absorbed smoke. The fog follows the exact pathways the smoke took, reaching inside wall
                  cavities, ceiling spaces, and the grain of timber. Thermal fogging is most effective for structural
                  deodorisation where soot has penetrated framing and cavities. The property must be unoccupied during
                  treatment and ventilated thoroughly before re-entry.
                </p>

                <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '1.1rem' }}>
                  Ozone Treatment
                </h3>
                <p>
                  Ozone generators produce O₃ molecules that react with and oxidise smoke compounds at a molecular
                  level, breaking the odour-causing chemical bonds. Ozone is highly effective for absorbed smoke odour
                  in soft furnishings, carpet, drapes, and timber surfaces. Treatment requires an unoccupied property
                  — ozone at treatment concentrations is harmful to people, pets, and plants. A typical treatment runs
                  4–24 hours followed by a ventilation period before re-occupancy. Ozone is not suitable for
                  properties with rubber seals or certain sensitive materials.
                </p>

                <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '1.1rem' }}>
                  Hydroxyl Generators
                </h3>
                <p>
                  Hydroxyl generators produce OH radicals using UV light and water vapour, which break down odour
                  molecules continuously over time. Unlike ozone, hydroxyl treatment is safe for occupied spaces —
                  people, pets, and sensitive materials can remain on-site during treatment. Hydroxyl generators work
                  more slowly than ozone (treatments typically run 3–7 days continuously) but can be used in
                  situations where ozone treatment is not safe. They are particularly useful for ongoing odour control
                  during the restoration phase.
                </p>

                <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '1.1rem' }}>
                  HEPA Air Scrubbing
                </h3>
                <p>
                  HEPA air scrubbers filter airborne particles — including smoke soot at sub-micron levels — from the
                  air within a confined space. Air scrubbers address airborne contamination but do not treat odour
                  compounds absorbed into structural materials. They are used in combination with fogging or ozone
                  treatment to reduce airborne particle load and improve air quality during and after deodorisation.
                  HEPA filtration is also used during the demolition and cleaning phases to prevent re-contamination.
                </p>
              </>
            ),
          },
          {
            heading: 'IICRC S700:2025 Deodorisation Protocol',
            body: (
              <>
                <p>
                  ANSI/IICRC S700:2025 is the professional standard for fire and smoke damage restoration in Australia.
                  Certified contractors follow a structured deodorisation protocol that ensures complete treatment and
                  produces the documentation your insurer requires to close the claim.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li><strong>Why certification matters</strong> — an IICRC S700:2025-certified contractor is trained to identify all affected materials, select appropriate deodorisation methods for each surface type, and treat the full extent of smoke migration — not just the burned room</li>
                  <li><strong>Insurance documentation</strong> — a certified job produces a written scope of works, treatment records, and a completion report confirming deodorisation to standard; this documentation is required for insurance sign-off</li>
                  <li><strong>Post-treatment clearance</strong> — clearance testing confirms odour levels have been reduced to acceptable levels before the claim is closed</li>
                  <li><strong>HVAC decontamination</strong> — IICRC S700:2025 includes HVAC system assessment and decontamination as a required component where the system was operating during or after the fire</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  For the full ANSI/IICRC S700:2025 standard, visit{' '}
                  <a href="https://iicrc.org/s700/" target="_blank" rel="noopener noreferrer">
                    iicrc.org
                  </a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Smoke Odour in HVAC Systems',
            background: 'light' as const,
            body: (
              <>
                <p>
                  HVAC systems are a primary vector for smoke cross-contamination. When a fire occurs in a property
                  with a ducted system operating, smoke is drawn into return air grilles and circulated throughout
                  every room served by the system — depositing soot on coils, inside ductwork, and on supply
                  diffusers throughout the property.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Even when the system was not operating during the fire, smoke can enter ductwork through supply
                  and return grilles by diffusion, especially in a smoke-filled environment over hours.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  HVAC decontamination after a fire involves:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li><strong>Duct cleaning and fogging</strong> — physical cleaning of accessible ductwork followed by thermal fogging through the duct system to deodorise internal surfaces</li>
                  <li><strong>Coil and air handler cleaning</strong> — evaporator and condenser coils are cleaned and treated to remove smoke residue that would otherwise re-contaminate the air on every heating and cooling cycle</li>
                  <li><strong>Filter replacement</strong> — all filters are replaced; existing filters that captured smoke particles must be discarded, not cleaned</li>
                  <li><strong>Post-treatment air quality testing</strong> — air quality is tested after HVAC decontamination to confirm particulate and VOC levels are within acceptable ranges before the system is returned to service</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Failing to decontaminate the HVAC system is one of the most common reasons smoke odour returns
                  after restoration work is completed. Each time the system operates, residual smoke compounds in
                  the ductwork are recirculated into the living space.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Can I remove smoke odour myself after a house fire?',
            answer:
              'Surface cleaning may reduce visible soot but smoke odours penetrate porous materials (plasterboard, timber, insulation) and HVAC systems. DIY methods like candles or air fresheners mask odours temporarily. Permanent removal requires IICRC S700:2025 professional deodorisation.',
          },
          {
            question: 'What is thermal fogging for smoke odour removal?',
            answer:
              'Thermal fogging heats a deodorising solvent into fine fog particles that penetrate the same porous materials the smoke entered. It matches smoke molecule penetration depth, making it most effective for post-fire odour in structural materials. It is not suitable if residents remain on-site during treatment.',
          },
          {
            question: 'What is an ozone generator and when is it used for smoke odour?',
            answer:
              'Ozone (O₃) oxidises smoke molecules at a molecular level and is highly effective for absorbed smoke odour in soft furnishings, carpet, and timber. Treatment must be done in an unoccupied space — ozone is harmful at treatment concentrations. A 4–24 hour treatment is followed by a ventilation period before re-occupancy.',
          },
          {
            question: 'How long does smoke odour removal take after a house fire?',
            answer:
              'A single room typically takes 1–3 days including thermal fogging and airing. A whole house takes 5–10 days. Contents may require separate off-site treatment. HVAC decontamination adds 1–2 additional days. IICRC S700:2025 documentation is issued on completion for insurance sign-off.',
          },
        ]}
        relatedGuides={[
          { title: 'IICRC S700 Fire Smoke Standard', href: '/guides/fire-smoke/iicrc-s700-fire-smoke-restoration-standard' },
          { title: 'Smoke Damage Cleaning Guide', href: '/guides/fire-damage/smoke-damage-cleaning-guide' },
          { title: 'Fire Damage Insurance Claim', href: '/guides/insurance/fire-damage-insurance-claim-process' },
        ]}
      />
    </>
  )
}
