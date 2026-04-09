import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-477: Mould Remediation Perth
 *
 * Created: 9 April 2026
 * Context: Perth's Mediterranean climate drives a distinct mould profile —
 * winter rain events (May–September, 600–900mm annual rainfall) saturate
 * subfloors and wall cavities in poorly ventilated housing. Boom-era fibrous
 * cement (fibro) construction (1970s–1990s) is highly porous and mould-prone.
 * Post-fire mould in Perth Hills BAL-zone properties is an additional risk
 * following fire suppression water use and extended rebuilding delays.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Perth | IICRC-Certified 24/7 Emergency',
  description:
    'Professional mould remediation across Perth. IICRC-certified contractors for post-winter-flooding, post-fire, and water-damage mould. HEPA remediation, 48-hour response. Lodge your claim 24/7.',
  keywords:
    'mould remediation perth, mould removal perth, black mould perth, mould after flooding perth, mould inspection perth, toxic mould perth, mould remediation perth hills, fibro mould perth',
  openGraph: {
    title: 'Mould Remediation Perth | IICRC-Certified 24/7 Emergency',
    description:
      'Professional mould remediation across Perth. IICRC-certified contractors for post-winter-flooding, post-fire, and water-damage mould. HEPA remediation, 48-hour response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Perth&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-perth`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-perth/#localbusiness`,
  name: `${NAP.name} Perth`,
  url: `${NAP.url}/mould-remediation-perth`,
  description:
    'IICRC-certified mould remediation contractors serving all Perth suburbs and the Perth Hills. Post-winter-flood and post-fire mould specialists. HEPA air scrubbing, structural drying verification, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Perth',
    containedInPlace: { '@type': 'State', name: 'Western Australia' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Perth',
    addressRegion: 'WA',
    addressCountry: 'AU',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mould Remediation Perth',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Perth' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Perth and the Perth Hills. Post-winter-flood and post-fire mould specialists. HEPA air scrubbing, thermal imaging, antimicrobial treatment, containment barriers, and post-remediation clearance testing to IICRC S520.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is mould so common in Perth homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Perth's Mediterranean climate concentrates 600–900mm of annual rainfall into the May–September winter period. This creates sustained subfloor and wall cavity moisture in homes with inadequate cross-ventilation or drainage. Boom-era fibrous cement (fibro) construction from the 1970s–1990s is particularly vulnerable — fibro is porous and absorbs moisture readily, providing an ideal substrate for mould colonisation. Hot summer temperatures (regularly exceeding 40°C) in residually damp materials then accelerate mould growth.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Perth home insurance cover mould after winter flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mould directly caused by a covered storm or water event is generally covered under standard home and contents policies. Demonstrating causation is critical — insurers may dispute mould claims where drying was inadequate or where damage was not reported promptly. NRPG documents mould remediation to IICRC S520 standard with moisture mapping and photographic evidence to support insurer submissions. Note: the ARPC Cyclone Pool does not apply to Perth; standard private insurance applies.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the IICRC S520 standard for mould remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S520 is the professional standard for mould remediation. It governs containment protocols, HEPA filtration requirements, antimicrobial treatment methods, and post-remediation clearance testing. Insurers require S520-compliant documentation for mould claim sign-off. Work performed by non-certified contractors may not meet insurer requirements and can result in claim rejection.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can mould grow after a bushfire in Perth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Fire suppression operations — including aerial and ground-based water bombing — saturate affected structures. Properties in Perth Hills BAL (Bushfire Attack Level) zones often have extended rebuilding timelines, meaning water-saturated materials remain undried for weeks or months. This creates ideal mould conditions: damp building materials, limited ventilation during restoration, and Perth Hills humidity in winter months. NRPG provides post-fire mould assessment and remediation alongside fire damage restoration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost in Perth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs depend on the extent and category of contamination. Category 1 (minor surface mould, single room): $1,800–$8,000. Category 2 (multi-room or wall cavity mould): $4,000–$20,000. Post-fire or post-flood full-property remediation: $10,000–$60,000+. Where mould is caused by a covered insurance event, the remediation scope and cost is documented to IICRC S520 standard for insurer submission.',
      },
    },
  ],
};

export default function MouldRemediationPerthPage() {
  return (
    <>
      <Script
        id="mrperth-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrperth-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrperth-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Perth"
        subtitle="IICRC-certified mould remediation across all Perth suburbs and the Perth Hills. Post-winter-flood and post-fire mould specialists. HEPA air scrubbing, structural drying verification, and full insurance documentation. 48-hour response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Perth' },
        ]}
        sections={[
          {
            heading: "Perth's Mould Risk — Mediterranean Climate and Wet Winters",
            body: (
              <>
                <p>
                  Perth&apos;s Mediterranean climate is deceptively mould-prone. While summers are hot and
                  dry, the May–September winter period delivers 600–900mm of concentrated rainfall — most
                  of Perth&apos;s annual total arriving in five months. During this window, subfloor spaces
                  and wall cavities in homes with inadequate drainage or cross-ventilation accumulate
                  significant moisture. If that moisture is not removed by mechanical drying, mould
                  establishes within 24–48 hours.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Perth&apos;s housing stock adds a specific vulnerability: a large proportion of homes
                  built during the 1970s–1990s construction boom used fibrous cement (fibro) sheeting for
                  walls and eaves. Fibro is a porous material that absorbs moisture readily, holds it for
                  extended periods, and provides an ideal substrate for mould colonisation. The 2021 Perth
                  storm event caused widespread flooding across north-western suburbs, and many
                  fibro-clad properties in those areas are still presenting with recurring mould years
                  later — evidence of incomplete structural drying at the time of the original event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Compounding the problem: Perth&apos;s summer temperatures regularly exceed 40°C. In
                  materials that were damp during winter and never fully dried, the heat of summer
                  accelerates mould growth dramatically. Properties that show no visible mould in June
                  can have significant wall cavity colonisation by February.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Thermal imaging to locate residual moisture in subfloor, fibro wall cavities, and
                    ceiling spaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    HEPA air scrubbing to capture airborne mould spores and prevent spread during
                    remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial treatment at the substrate level — not just surface application
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Containment barriers to protect unaffected areas during work
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Post-remediation clearance testing to IICRC S520 for insurer documentation
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Post-Fire Mould in Perth Hills',
            body: (
              <>
                <p>
                  The Perth Hills — encompassing Kalamunda, Mundaring, Roleystone, and surrounding
                  communities — carry significant bushfire risk. Following a fire event, the immediate
                  focus is on fire damage. But mould is the delayed consequence that many Perth Hills
                  property owners underestimate.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Fire suppression operations — aerial water bombing, ground crews, and residential
                  sprinkler activation — introduce large volumes of water into affected structures. This
                  water saturates wall framing, insulation, subfloor timbers, and any fibro cladding. In
                  properties within BAL (Bushfire Attack Level) zones, rebuilding timelines are often
                  extended — BAL compliance assessments, council approvals, and contractor availability
                  can delay restoration for months. During this period, water-saturated materials sit
                  undried, and mould establishes throughout the structure.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Perth Hills winters amplify this risk: if fire suppression occurs in summer and
                  restoration is delayed into the May–September wet period, the property is exposed to
                  additional moisture ingress on top of existing suppression water. The result is
                  frequently extensive mould throughout the structure before a single piece of rebuilding
                  work has begun.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG provides post-fire mould assessment and full remediation for Perth Hills
                  properties. Mould scope is documented to IICRC S520 standard for fire insurance
                  claim submission, and remediation is coordinated alongside any fire damage restoration
                  scope where applicable.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost Estimates — Perth 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 1 — minor surface mould, single room (post-winter moisture):</strong>{' '}
                    $1,800–$8,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 2 — multi-room or wall cavity mould (fibro or plasterboard):</strong>{' '}
                    $4,000–$20,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-fire or post-flood full-property remediation:</strong> $10,000–$60,000+
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Perth Hills BAL-zone post-fire mould:</strong> Varies — NRPG documents to
                    IICRC S520 standard for fire insurance claim submission
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurance-covered mould events:</strong> NRPG prepares full scope
                    documentation for insurer submission. The ARPC Cyclone Pool does not apply to Perth
                    — standard private insurance applies.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Cost estimates are indicative only and depend on property size, extent of
                  contamination, material type (fibro vs. plasterboard), and whether structural opening
                  is required. All NRPG remediation is performed to IICRC S520 standard with post-remediation
                  clearance testing.
                </p>
              </>
            ),
          },
          {
            heading: 'Perth Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  48-hour response across the greater Perth metropolitan area and the Perth Hills:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner West:</strong> Perth CBD, West Perth, Subiaco, Nedlands, Claremont,
                  Cottesloe, Fremantle, Scarborough
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner / Mid West:</strong> Leederville, Mount Lawley, Northbridge, Inglewood,
                  Bayswater, Victoria Park, South Perth
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Joondalup, Wanneroo, Yanchep, Two Rocks,
                  Clarkson, Butler, Quinns Rocks
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern / Hills:</strong> Midland, Kalamunda, Mundaring, Roleystone,
                  Armadale, Byford, Serpentine
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Corridor:</strong> Rockingham, Mandurah, Baldivis, Kwinana,
                  Cockburn, Hamilton Hill, Fremantle South
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why is mould so common in Perth homes?',
            answer:
              "Perth's Mediterranean climate concentrates 600–900mm of annual rainfall into the May–September winter period. Homes with inadequate subfloor ventilation or drainage accumulate sustained moisture during this window. Fibrous cement (fibro) construction from the 1970s–1990s is particularly vulnerable — fibro is porous and absorbs moisture readily. Hot summer temperatures exceeding 40°C in residually damp materials then accelerate mould growth significantly.",
          },
          {
            question: 'Does Perth home insurance cover mould after winter flooding?',
            answer:
              "Mould directly caused by a covered storm or water event is generally covered under standard home and contents policies. Demonstrating causation is critical — insurers may dispute mould claims where drying was inadequate or damage was not reported promptly. NRPG documents mould remediation to IICRC S520 standard with moisture mapping and photographic evidence to support insurer submissions. Note: the ARPC Cyclone Pool does not apply to Perth; standard private insurance applies.",
          },
          {
            question: 'What is the IICRC S520 standard for mould remediation?',
            answer:
              'IICRC S520 is the professional standard for mould remediation. It governs containment protocols, HEPA filtration requirements, antimicrobial treatment methods, and post-remediation clearance testing. Insurers require S520-compliant documentation for mould claim sign-off. Work performed by non-certified contractors may not meet insurer requirements and can result in claim rejection.',
          },
          {
            question: 'Can mould grow after a bushfire in Perth?',
            answer:
              'Yes. Fire suppression operations saturate structures with large volumes of water. Properties in Perth Hills BAL zones often have extended rebuilding timelines, leaving water-saturated materials undried for months. This creates ideal mould conditions. If fire suppression occurs in summer and restoration delays push into the May–September wet period, additional winter moisture compounds the problem. NRPG provides post-fire mould assessment and remediation alongside fire damage restoration.',
          },
          {
            question: 'How much does mould remediation cost in Perth?',
            answer:
              'Costs depend on the extent and category of contamination. Category 1 (minor surface mould, single room): $1,800–$8,000. Category 2 (multi-room or wall cavity mould): $4,000–$20,000. Post-fire or post-flood full-property remediation: $10,000–$60,000+. Where mould is caused by a covered insurance event, the remediation scope and cost is documented to IICRC S520 standard for insurer submission.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Restoration Perth',
            href: '/storm-damage-restoration-perth',
            description: 'Storm damage restoration and insurance claim support across Perth.',
          },
          {
            title: 'Fire Damage Restoration Perth',
            href: '/fire-damage-restoration-perth',
            description: 'Post-fire restoration for Perth Hills and metropolitan Perth properties.',
          },
          {
            title: 'Flood Damage Restoration Perth',
            href: '/flood-damage-restoration-perth',
            description: 'Emergency flood damage restoration across all Perth suburbs.',
          },
          {
            title: 'Water Damage Restoration Perth',
            href: '/water-damage-restoration-perth',
            description: 'Emergency water damage restoration across all Perth suburbs.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
