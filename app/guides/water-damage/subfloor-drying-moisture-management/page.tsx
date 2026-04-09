/**
 * Subfloor Drying and Moisture Management — IICRC S500:2025 Guide
 *
 * IICRC compliance: references ANSI/IICRC S500:2025 as the certification
 * benchmark held by our contractors. Describes certified contractor methods —
 * not the standard's content.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import type { Metadata } from 'next'
import Script from 'next/script'
import { Droplets } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Subfloor Drying and Moisture Management — IICRC S500:2025 Guide | Disaster Recovery Australia',
  description:
    'How IICRC S500:2025 certified contractors dry subfloors and manage moisture after flooding. Queenslander, slab-on-ground, and suspended timber floor drying methods.',
  keywords: [
    'subfloor drying australia',
    'moisture management subfloor',
    'queenslander flood damage',
    'slab on ground moisture',
    'IICRC S500 subfloor',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/water-damage/subfloor-drying-moisture-management`,
  },
  openGraph: {
    title: 'Subfloor Drying and Moisture Management — IICRC S500:2025 Guide',
    description:
      'How IICRC S500:2025 certified contractors dry subfloors and manage moisture after flooding. Queenslander, slab-on-ground, and suspended timber floor drying methods.',
    url: `${NAP.url}/guides/water-damage/subfloor-drying-moisture-management`,
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
    name: 'Water Damage Restoration',
  },
  sameAs: NAP.sameAs,
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Subfloor Drying and Moisture Management',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Subfloor Drying and Moisture Management',
  description:
    'IICRC S500:2025-certified subfloor drying for Australian construction types. Commercial drying mats, injection drying, desiccant dehumidification, and daily moisture monitoring to equilibrium moisture content targets.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does a flooded subfloor take to dry in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Drying time depends on construction type. A raised timber Queenslander typically takes 5–10 days with commercial subfloor drying mats. Slab-on-ground moisture penetration typically takes 10–21 days. Concrete moisture levels are measured with a Tramex CME5 or equivalent non-invasive meter. IICRC S500:2025 specifies equilibrium moisture content targets that must be reached before drying is considered complete.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is subfloor moisture detected?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Thermal imaging cameras reveal temperature differentials from damp areas. Pin-type moisture meters are used for timber subfloors. Non-invasive capacitance meters are used for concrete. Daily readings are required under IICRC S500:2025 protocols until the dry standard is achieved for each affected material.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is subfloor drying equipment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subfloor drying mats create sealed drying chambers under a slab, drawing moisture upward through the concrete. Desiccant dehumidifiers perform better in cool or humid subfloor environments than LGR refrigerant units. Injection drying through ports in skirting boards addresses moisture in wall cavities adjacent to the subfloor. Foil curtains isolate drying zones to concentrate equipment performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a subfloor mould after flooding if the floor above looks dry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The subfloor is often the last component to dry and the first to develop mould. Moisture trapped under flooring without adequate cross-ventilation creates mould conditions even when upper surfaces appear dry. Floor covering removal may be required to assess and dry the subfloor correctly.',
      },
    },
  ],
}

export default function SubfloorDryingMoistureManagementPage() {
  return (
    <>
      <Script
        id="sfdmm-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="sfdmm-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="sfdmm-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage Restoration"
        title="Subfloor Drying and Moisture Management — IICRC S500:2025 Guide"
        subtitle="How IICRC S500:2025 certified contractors dry subfloors and manage moisture after flooding across Australian construction types."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Water Damage', href: '/guides/water-damage' },
          { label: 'Subfloor Drying' },
        ]}
        cta={{ text: 'Book IICRC-Certified Subfloor Drying', href: '/claim' }}
        sections={[
          {
            heading: 'Australian Construction Types and Subfloor Drying',
            body: (
              <>
                <p>
                  Australia has several distinct residential construction types, each requiring a different subfloor
                  drying methodology after flooding. A one-size-fits-all approach to subfloor drying leads to
                  incomplete drying, secondary mould, and structural deterioration.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Raised timber (Queenslander)</strong> — common in Queensland, Northern NSW, and NT; timber
                    subfloor joists and bearers are suspended above ground on stumps or piers. Flood water can flow
                    beneath the structure, saturating timber members. Subfloor drying mats, cross-ventilation
                    enhancement, and desiccant dehumidifiers placed below the floor are the primary method. Drying
                    time is typically 5–10 days depending on saturation level and ambient humidity.
                  </li>
                  <li>
                    <strong>Slab-on-ground</strong> — common in Victoria, South Australia, and WA; a concrete slab
                    poured directly on compacted earth. Flood water saturates the slab and the ground beneath it.
                    Moisture migrates upward through the slab slowly — this construction type typically requires
                    10–21 days to reach equilibrium moisture content targets. Drying mats placed on the slab surface
                    are the primary extraction method.
                  </li>
                  <li>
                    <strong>Suspended concrete</strong> — common in multi-storey and modern construction; behaves
                    similarly to slab-on-ground in terms of moisture retention but with better access from below.
                  </li>
                  <li>
                    <strong>Encapsulated subfloor</strong> — a vapour barrier installed under the floor creates a
                    sealed chamber that can trap moisture if the barrier is breached during flooding. Assessment
                    requires access through the barrier or floor covering to measure moisture in the substrate below.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Climate significantly affects drying timelines. Tropical Far North Queensland with high ambient
                  humidity and warm temperatures presents different drying conditions than Melbourne with cool,
                  temperate conditions. Desiccant dehumidifiers are typically preferred in high-humidity tropical
                  environments where refrigerant (LGR) units struggle to operate efficiently.
                </p>
              </>
            ),
          },
          {
            heading: 'Subfloor Moisture Detection Methods',
            background: 'light' as const,
            body: (
              <>
                <p>
                  Accurate moisture measurement is the foundation of effective subfloor drying. IICRC S500:2025
                  certified contractors use a combination of instruments to establish baseline readings before drying
                  begins and to track daily progress to drying goals.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Thermal imaging cameras</strong> — reveal temperature differentials across floor and wall
                    surfaces caused by evaporative cooling from damp materials. Used for rapid mapping of affected
                    areas that may not be visible. Thermal imaging does not provide a moisture content reading —
                    it identifies areas requiring instrument measurement.
                  </li>
                  <li>
                    <strong>Pin-type moisture meters</strong> — inserted into timber subfloor members to measure
                    moisture content as a percentage. IICRC S500:2025 specifies target moisture content ranges for
                    timber by species; readings above these targets indicate incomplete drying.
                  </li>
                  <li>
                    <strong>Non-invasive capacitance meters</strong> — placed on the surface of concrete or flooring
                    to measure moisture content without drilling. Suitable for daily monitoring on slab-on-ground
                    construction.
                  </li>
                  <li>
                    <strong>Tramex CME5 and equivalent</strong> — a specialist concrete moisture meter providing
                    non-invasive readings on concrete slabs. Used to track moisture migration upward through slab
                    thickness during the drying process.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Daily readings are required under IICRC S500:2025 protocols, taken at the same reference points
                  each day. Progress is documented in drying logs that form part of the insurance claim file. Drying
                  is not considered complete until all readings reach target moisture content for the material type.
                </p>
              </>
            ),
          },
          {
            heading: 'Subfloor Drying Equipment and Techniques',
            body: (
              <>
                <p>
                  Equipment selection for subfloor drying depends on the construction type, the extent of saturation,
                  ambient conditions, and access constraints. IICRC S500:2025 certified contractors calculate
                  equipment requirements based on the affected area and material types rather than applying a standard
                  equipment count.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Subfloor drying mats</strong> — sealed mats placed on concrete slab surfaces create a
                    controlled drying chamber that draws moisture upward through the slab. Mats are connected to a
                    dehumidifier that extracts moisture-laden air from the chamber. Highly effective for slab-on-ground
                    construction where drying from above is the only practical option.
                  </li>
                  <li>
                    <strong>Desiccant dehumidifiers</strong> — use a desiccant rotor to adsorb moisture from air
                    and regenerate continuously. More effective than LGR refrigerant dehumidifiers in cool
                    temperatures and high-humidity environments typical of subfloor spaces. Required for tropical
                    North Queensland subfloor drying where ambient humidity is high.
                  </li>
                  <li>
                    <strong>Injection drying through ports</strong> — small access ports drilled through skirting
                    boards or floor coverings allow drying air to be injected directly into wall cavities and void
                    spaces adjacent to the subfloor. Addresses moisture trapped behind wall linings that cannot be
                    reached by surface equipment.
                  </li>
                  <li>
                    <strong>Cross-ventilation enhancement</strong> — for raised timber construction, commercial
                    axial fans are positioned to draw outside air through the underfloor space, accelerating natural
                    ventilation drying of timber members. Used in combination with dehumidification rather than as
                    a stand-alone method.
                  </li>
                  <li>
                    <strong>Foil barrier isolation</strong> — temporary foil barriers divide large subfloor areas
                    into smaller drying zones, concentrating dehumidifier output on each zone in sequence. Improves
                    drying efficiency in large-footprint buildings.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'When Floor Coverings Must Be Removed',
            background: 'light' as const,
            body: (
              <>
                <p>
                  One of the most consequential decisions in subfloor drying is whether to remove floor coverings
                  or attempt drying with coverings in place. IICRC S500:2025 provides guidance on this decision,
                  which depends on covering type, the duration of water exposure, and the subfloor substrate.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Salvageability assessment</strong> — the covering is assessed for whether it can survive
                    the drying process without permanent damage. Carpet over underlay typically retains contamination
                    and is almost always removed. Engineered timber and solid hardwood are assessed on a case-by-case
                    basis. Tiles and vinyl planks can often remain in place.
                  </li>
                  <li>
                    <strong>Removal vs dry-in-place</strong> — coverings left in place significantly slow drying of
                    the subfloor below and increase the risk of mould developing between the covering and the
                    substrate. Removal is generally recommended when water has been present for more than 24–48 hours,
                    when the subfloor is timber, or when the covering is carpet or underlay.
                  </li>
                  <li>
                    <strong>Subfloor mould risk</strong> — mould can develop between a floor covering and the
                    subfloor within 24–72 hours under warm, humid conditions. If floor coverings are retained during
                    drying and mould develops below them, the cost and scope of remediation increases substantially.
                    IICRC S500:2025 recognises this risk in its guidance on flooring decisions.
                  </li>
                  <li>
                    <strong>Documentation for insurance</strong> — the decision to remove or retain floor coverings
                    must be documented in the scope of works with the rationale recorded. If coverings are removed
                    and cannot be salvaged, replacement is a covered loss under most building and contents policies.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If you are concerned that a previous water damage restoration left floor coverings in place when
                  they should have been removed, an independent IICRC S500:2025 moisture assessment can determine
                  current subfloor moisture levels and whether secondary mould has developed below the covering.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How long does a flooded subfloor take to dry in Australia?',
            answer:
              'Drying time depends on construction type. A raised timber Queenslander typically takes 5–10 days with commercial subfloor drying mats. Slab-on-ground moisture penetration typically takes 10–21 days. Concrete moisture levels are measured with a Tramex CME5 or equivalent non-invasive meter. IICRC S500:2025 specifies equilibrium moisture content targets that must be reached before drying is considered complete.',
          },
          {
            question: 'How is subfloor moisture detected?',
            answer:
              'Thermal imaging cameras reveal temperature differentials from damp areas. Pin-type moisture meters are used for timber subfloors. Non-invasive capacitance meters are used for concrete. Daily readings are required under IICRC S500:2025 protocols until the dry standard is achieved for each affected material.',
          },
          {
            question: 'What is subfloor drying equipment?',
            answer:
              'Subfloor drying mats create sealed drying chambers under a slab, drawing moisture upward through the concrete. Desiccant dehumidifiers perform better in cool or humid subfloor environments than LGR refrigerant units. Injection drying through ports in skirting boards addresses moisture in wall cavities adjacent to the subfloor. Foil curtains isolate drying zones to concentrate equipment performance.',
          },
          {
            question: 'Can a subfloor mould after flooding if the floor above looks dry?',
            answer:
              'Yes. The subfloor is often the last component to dry and the first to develop mould. Moisture trapped under flooring without adequate cross-ventilation creates mould conditions even when upper surfaces appear dry. Floor covering removal may be required to assess and dry the subfloor correctly.',
          },
        ]}
        relatedGuides={[
          { title: 'IICRC S500 Water Damage Standard', href: '/guides/water-damage/iicrc-s500-water-damage-restoration-standard' },
          { title: 'Structural Drying Process', href: '/guides/services/structural-drying-process' },
          { title: 'Flood Damage Hardwood Floors', href: '/guides/flood-damage/flood-damage-hardwood-floors' },
        ]}
      />
    </>
  )
}
