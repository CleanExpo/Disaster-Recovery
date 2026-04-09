import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-478: Mould Remediation Adelaide
 *
 * Created: 9 April 2026
 * Context: Adelaide's Mediterranean climate creates a distinct mould profile —
 * hot dry summers (38–45°C) combined with wet winters (600–900mm concentrated
 * June–August) trap moisture in building fabric, then amplify it with summer heat.
 * 1960s–1980s brick-veneer construction in northern suburbs (Modbury, Tea Tree Gully,
 * Salisbury, Elizabeth) has endemic subfloor mould from poor ventilation. Heritage
 * properties in North Adelaide, Unley, and Burnside require specialist treatment.
 * Post-fire mould in Adelaide Hills properties is an additional risk following fire
 * suppression water use.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Adelaide | IICRC-Certified 24/7 Emergency',
  description:
    'Professional mould remediation across Adelaide. IICRC-certified contractors for post-winter moisture, heritage properties, subfloor mould, and post-fire damage. HEPA remediation, 48-hour response. Lodge your claim 24/7.',
  keywords:
    'mould remediation adelaide, mould removal adelaide, black mould adelaide, subfloor mould adelaide, heritage mould remediation adelaide, mould after rain adelaide, mould remediation adelaide hills, mould inspection adelaide',
  openGraph: {
    title: 'Mould Remediation Adelaide | IICRC-Certified 24/7 Emergency',
    description:
      'Professional mould remediation across Adelaide. IICRC-certified contractors for post-winter moisture, heritage properties, subfloor mould, and post-fire damage. HEPA remediation, 48-hour response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Adelaide&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-adelaide`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-adelaide/#localbusiness`,
  name: `${NAP.name} Adelaide`,
  url: `${NAP.url}/mould-remediation-adelaide`,
  description:
    'IICRC-certified mould remediation contractors serving all Adelaide suburbs, the Adelaide Hills, and the beach strip. Heritage property specialists. Subfloor mould, HVAC mould, and post-fire mould remediation. HEPA air scrubbing, structural drying verification, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Adelaide',
    containedInPlace: { '@type': 'State', name: 'South Australia' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Adelaide',
    addressRegion: 'SA',
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
  name: 'Mould Remediation Adelaide',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Adelaide and the Adelaide Hills. Heritage property specialists. Subfloor, HVAC, and post-fire mould remediation to IICRC S520. HEPA air scrubbing, thermal imaging, antimicrobial treatment, containment barriers, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is mould so common in Adelaide homes despite the dry climate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Adelaide's dry climate is misleading. The June–August winter period delivers 600–900mm of concentrated rainfall, saturating subfloors and wall cavities in homes with inadequate ventilation — a widespread issue in 1960s–1980s brick-veneer construction common in suburbs like Modbury, Tea Tree Gully, Salisbury, Elizabeth, and Christie's Beach. Moisture trapped in building fabric during winter is then amplified by summer heat (38–45°C), accelerating mould growth dramatically in structures that were never properly dried. HVAC systems used heavily during hot summers also distribute mould spores if condensation builds up in poorly maintained units.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does SA home insurance cover mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould directly caused by a covered storm or water event is generally covered under standard home and contents policies. Demonstrating causation is critical — insurers may dispute mould claims where drying was inadequate or where damage was not reported promptly. NRPG documents mould remediation to IICRC S520 standard with moisture mapping and photographic evidence to support insurer submissions. Note: the ARPC Cyclone Pool does not apply to Adelaide — standard private insurance applies for storm and water damage claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes heritage property mould remediation different in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Adelaide's heritage precincts — North Adelaide, Unley, Burnside, Norwood, and Kensington — contain a high concentration of period properties with lime-render walls, horsehair plaster, and solid masonry construction. These materials respond very differently to moisture than modern plasterboard. Horsehair plaster is highly absorbent and can harbour deep mould growth that surface treatment alone will not resolve. Lime render is sensitive to aggressive antimicrobial chemicals that may damage historic finishes. Specialist mould remediation in heritage properties requires material-specific protocols, careful containment, and treatment methods that address the substrate without causing further damage to period fabric.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs depend on the extent and category of contamination. Category 1 (minor surface mould, single room): $1,800–$8,000. Category 2 (multi-room or wall cavity mould, including subfloor): $4,000–$20,000. Heritage property or post-fire full-property remediation: $10,000–$60,000+. Where mould is caused by a covered insurance event, the remediation scope and cost is documented to IICRC S520 standard for insurer submission.',
      },
    },
  ],
};

export default function MouldRemediationAdelaidePage() {
  return (
    <>
      <Script
        id="mradl-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mradl-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mradl-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Adelaide"
        subtitle="IICRC-certified mould remediation across all Adelaide suburbs, the Adelaide Hills, and the beach strip. Heritage property specialists. Subfloor, HVAC, and post-fire mould remediation. HEPA air scrubbing, structural drying verification, and full insurance documentation. 48-hour response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Adelaide' },
        ]}
        sections={[
          {
            heading: "Adelaide's Mould Risk — Mediterranean Climate and Building Stock",
            body: (
              <>
                <p>
                  Adelaide&apos;s Mediterranean climate is deceptively mould-prone. Summers are hot and
                  dry — regularly reaching 38–45°C — but the June–August winter period delivers
                  600–900mm of concentrated rainfall, representing most of the city&apos;s annual total
                  arriving in just three months. During this window, subfloor spaces and wall cavities in
                  homes with poor drainage or inadequate cross-ventilation accumulate significant
                  moisture. If that moisture is not removed by mechanical drying, mould establishes
                  within 24–48 hours.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Adelaide&apos;s housing stock has a specific structural vulnerability: a large
                  proportion of homes built during the 1960s–1980s in northern suburbs — Modbury, Tea
                  Tree Gully, Salisbury, Elizabeth, and Christie&apos;s Beach — used brick-veneer
                  construction with subfloor cavities and inadequate ventilation. Subfloor mould is
                  endemic in these areas. The September 2016 SA statewide blackout storm drove
                  widespread water ingress and roof damage across greater Adelaide; many partial
                  restorations from that event left hidden moisture in building fabric that continues to
                  drive recurring mould years later.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  HVAC systems compound the problem. Adelaide&apos;s extreme summer heat drives heavy air
                  conditioning use — but poorly maintained ducted systems accumulate condensation in
                  ducts and fan coils, distributing mould spores throughout the home with every cooling
                  cycle. Properties with both subfloor moisture and contaminated HVAC systems require
                  coordinated remediation of both pathways to prevent recontamination.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Thermal imaging to locate residual moisture in subfloor voids, wall cavities, and
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
                    HVAC inspection and mould decontamination where duct systems are implicated
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
            heading: 'Heritage and Period Properties — Specialist Mould Treatment in Adelaide',
            body: (
              <>
                <p>
                  Adelaide has one of the highest concentrations of heritage-listed residential
                  properties in Australia. The inner precincts of North Adelaide, Unley, Burnside,
                  Norwood, and Kensington contain significant numbers of period homes built with
                  lime-render walls, horsehair plaster ceilings and internal walls, solid masonry, and
                  timber subfloor framing. These materials behave very differently from modern
                  plasterboard construction when exposed to moisture and mould.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Horsehair plaster is highly absorbent. Unlike plasterboard, which can be cut out and
                  replaced, horsehair plaster holds deep mould growth that surface treatment alone will
                  not resolve. Attempting standard plasterboard remediation protocols on horsehair
                  plaster typically drives mould deeper into the substrate rather than removing it.
                  Specialist assessment is required to determine whether in-place treatment is viable or
                  whether controlled removal is necessary to protect structural integrity.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lime render — common on external and internal masonry walls in heritage Adelaide
                  properties — is chemically sensitive. Aggressive antimicrobial products used in
                  standard remediation can degrade historic lime finishes and accelerate spalling.
                  Material-specific protocols are essential. Where heritage fabric cannot be disturbed,
                  NRPG uses penetrating treatment methods that address the mould at depth without
                  stripping historic surfaces.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  For properties under Heritage Overlay in the City of Adelaide or relevant council
                  heritage controls, any remediation scope involving structural opening or material
                  removal may require heritage consent. NRPG coordinates documentation to support
                  council applications where required.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost Estimates — Adelaide 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 1 — minor surface mould, single room (post-winter moisture):</strong>{' '}
                    $1,800–$8,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>
                      Category 2 — multi-room, wall cavity, or subfloor mould (brick-veneer):
                    </strong>{' '}
                    $4,000–$20,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Heritage property remediation (North Adelaide, Unley, Burnside):</strong>{' '}
                    $10,000–$60,000+
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-fire mould (Adelaide Hills — Stirling, Hahndorf, Lobethal, Aldgate):</strong>{' '}
                    Varies — NRPG documents to IICRC S520 standard for fire insurance claim submission
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurance-covered mould events:</strong> NRPG prepares full scope
                    documentation for insurer submission. The ARPC Cyclone Pool does not apply to
                    Adelaide — standard private insurance applies.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Cost estimates are indicative only and depend on property size, extent of
                  contamination, material type (heritage vs. modern), subfloor access, and whether
                  structural opening is required. All NRPG remediation is performed to IICRC S520
                  standard with post-remediation clearance testing.
                </p>
              </>
            ),
          },
          {
            heading: 'Adelaide Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  48-hour response across the greater Adelaide metropolitan area, the Hills, and the
                  southern coast:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner / Heritage:</strong> North Adelaide, Unley, Burnside, Norwood,
                  Kensington, Adelaide CBD, Prospect, Parkside, Malvern
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Modbury, Tea Tree Gully, Salisbury, Elizabeth,
                  Golden Grove, Mawson Lakes, Para Hills, Ingle Farm
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Christie&apos;s Beach, Morphett Vale, Onkaparinga,
                  Noarlunga, Hallett Cove, Aberfoyle Park, Flagstaff Hill
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Adelaide Hills:</strong> Stirling, Hahndorf, Lobethal, Aldgate, Bridgewater,
                  Crafers, Mylor, Mount Barker
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Beach Strip:</strong> Glenelg, Brighton, Somerton Park, Henley Beach,
                  Semaphore, Port Adelaide, Largs Bay
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why is mould so common in Adelaide homes despite the dry climate?',
            answer:
              "Adelaide's dry climate is misleading. The June–August winter period delivers 600–900mm of concentrated rainfall, saturating subfloors and wall cavities in 1960s–1980s brick-veneer homes with poor ventilation — endemic in suburbs like Modbury, Tea Tree Gully, Salisbury, Elizabeth, and Christie's Beach. Summer heat (38–45°C) then amplifies mould growth in materials that were never properly dried. HVAC systems used heavily during hot summers also distribute mould spores if condensation builds up in poorly maintained units.",
          },
          {
            question: 'Does SA home insurance cover mould?',
            answer:
              "Mould directly caused by a covered storm or water event is generally covered under standard home and contents policies. Demonstrating causation is critical — insurers may dispute mould claims where drying was inadequate or damage was not reported promptly. NRPG documents mould remediation to IICRC S520 standard with moisture mapping and photographic evidence to support insurer submissions. Note: the ARPC Cyclone Pool does not apply to Adelaide — standard private insurance applies.",
          },
          {
            question: 'What makes heritage property mould remediation different in Adelaide?',
            answer:
              "Adelaide's heritage precincts contain period properties with lime-render walls, horsehair plaster, and solid masonry construction. Horsehair plaster is highly absorbent and holds deep mould growth that surface treatment cannot resolve. Lime render is sensitive to aggressive antimicrobial products that can damage historic finishes. Specialist protocols are required — material-specific treatment methods, careful containment, and in some cases coordination with heritage consent processes. NRPG has experience with heritage fabric across North Adelaide, Unley, Burnside, Norwood, and Kensington.",
          },
          {
            question: 'How much does mould remediation cost in Adelaide?',
            answer:
              'Costs depend on the extent and category of contamination. Category 1 (minor surface mould, single room): $1,800–$8,000. Category 2 (multi-room, wall cavity, or subfloor mould): $4,000–$20,000. Heritage property or post-fire full-property remediation: $10,000–$60,000+. Where mould is caused by a covered insurance event, the remediation scope and cost is documented to IICRC S520 standard for insurer submission.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Restoration Adelaide',
            href: '/storm-damage-restoration-adelaide',
            description: 'Storm damage restoration and insurance claim support across Adelaide.',
          },
          {
            title: 'Water Damage Restoration Adelaide',
            href: '/water-damage-restoration-adelaide',
            description: 'Emergency water damage restoration across all Adelaide suburbs.',
          },
          {
            title: 'Mould Remediation Melbourne',
            href: '/mould-remediation-melbourne',
            description: 'IICRC-certified mould remediation across all Melbourne suburbs.',
          },
          {
            title: 'Mould Remediation Perth',
            href: '/mould-remediation-perth',
            description: 'IICRC-certified mould remediation across Perth and the Perth Hills.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
