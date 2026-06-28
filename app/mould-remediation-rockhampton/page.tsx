import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-484: Mould Remediation Rockhampton
 * Post-Fitzroy flood mould — Category 3 contaminated water, IICRC S520:2023
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Rockhampton | Fitzroy Flood Recovery',
  description:
    'Professional mould remediation across Rockhampton. IICRC S520:2023 certified. Fitzroy River flood mould treatment. Act within 48 hours in CQ\'s subtropical climate.',
  openGraph: {
    title: 'Mould Remediation Rockhampton | Fitzroy Flood Recovery',
    description:
      'IICRC S520:2023 certified mould remediation in Rockhampton. Fitzroy River flood mould treatment. Category 3 contaminated water protocols.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Mould Remediation')}&city=${encodeURIComponent('Rockhampton')}&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-rockhampton`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-rockhampton/#localbusiness`,
  name: `${NAP.name} Rockhampton`,
  url: `${NAP.url}/mould-remediation-rockhampton`,
  description:
    'IICRC S520:2023 certified mould remediation contractors serving Rockhampton 24/7. Post-Fitzroy River flood mould treatment, Category 3 contaminated water protocols, HEPA air scrubbing, containment, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Rockhampton',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rockhampton',
    addressRegion: 'QLD',
    postalCode: '4700',
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
  name: 'Mould Remediation Rockhampton',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Rockhampton' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation in Rockhampton following IICRC S520:2023: Category 3 contaminated water mould treatment, containment, HEPA air scrubbing, anti-fungal decontamination, and insurance documentation for post-Fitzroy flood mould claims.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does mould grow after Fitzroy River flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mould can begin establishing within 24\u201348 hours of flooding in Rockhampton\u2019s subtropical climate. Post-Fitzroy flood mould growth is accelerated by the nature of Category 3 contaminated floodwater, which carries sewage, agricultural runoff, and organic material from the catchment. These contaminants provide rich nutrients for rapid mould growth in building materials. Properties not professionally dried and treated within 48 hours of flood recession face significantly larger remediation scopes.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Fitzroy River flood mould covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mould arising from a covered flood event is generally included in the flood claim. However, if flood cover was excluded from your policy, mould arising from the same flood event may also be excluded. It is critical to check your PDS for flood cover before assuming mould remediation will be covered. NRPG provides detailed documentation to support coverage arguments and helps you understand what is and is not covered under your specific policy.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the health risk from post-flood mould in Rockhampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Fitzroy River floodwater is Category 3 contaminated \u2014 it carries sewage, agricultural chemicals, and pathogenic organisms from its 142,000 km\u00b2 catchment. Post-flood mould in Rockhampton properties often includes pathogenic species that are more hazardous than typical household mould. IICRC S520 PPE and full containment protocol are required for remediation. Do not re-enter mould-affected areas after Fitzroy River flooding without a professional assessment.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long does post-flood mould remediation take in Rockhampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Timelines depend on the extent of mould affected areas: single room 1\u20132 days; moderate multi-room remediation 3\u20135 days; whole-house post-flood remediation 1\u20132 weeks. Rockhampton\u2019s Queenslander-style elevated homes with accessible subfloors add 2\u20133 additional days for subfloor treatment, as Category 3 floodwater contamination in the subfloor area requires complete decontamination before the building is safe to reoccupy.",
      },
    },
  ],
};

export default function MouldRemediationRockhamptonPage() {
  return (
    <>
      <Script
        id="mrrock-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrrock-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrrock-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Rockhampton"
        subtitle="IICRC S520:2023 certified mould remediation across Rockhampton. Fitzroy River flood mould treatment. Category 3 contaminated water protocols. Act within 48 hours."
        gradient="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Rockhampton' },
        ]}
        sections={[
          {
            heading: 'Post-Fitzroy Flood Mould — The Rocky Risk',
            body: (
              <>
                <p>
                  Fitzroy River floodwater is classified as Category 3 contaminated water — it carries sewage
                  overflow from the river&apos;s 142,000 km² catchment, agricultural runoff from Central
                  Queensland farming land, and industrial effluent. When this water inundates Rockhampton
                  properties, it deposits organic contaminants in building materials that provide ideal
                  nutrients for accelerated mould growth.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Rockhampton&apos;s subtropical climate — warm temperatures and elevated humidity — accelerates
                  mould establishment after flooding. The city&apos;s substantial stock of Queenslander-style
                  elevated homes provides accessible subfloor spaces that retain floodwater and moisture long
                  after surface areas appear dry, creating hidden mould colonisation that may not be visible
                  for weeks without thermal imaging assessment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Post-flood mould following the 2011, 2013, and 2023 Fitzroy River events affected thousands
                  of Rockhampton properties. Many remediation failures resulted from inadequate treatment of
                  Category 3 contaminated materials, leading to recurring mould growth within months.
                </p>
              </>
            ),
          },
          {
            heading: 'The 48-Hour Window in Rockhampton',
            body: (
              <>
                <p>
                  Following Fitzroy River flood recession, the 48-hour treatment window is critical. NRPG
                  IICRC S520:2023-certified contractors prioritise flood-zone suburbs — Depot Hill and
                  The Range — for immediate post-flood mould prevention response:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Thermal imaging moisture mapping to identify saturated cavities before mould appears
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Category 3 decontamination of all flood-affected surfaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    IICRC S520:2023 containment to prevent spore dispersal during remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>HEPA air scrubbing across all affected areas</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Anti-fungal treatment to subfloor, wall cavities, and ceiling spaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full IICRC documentation pack for insurance claim lodgement
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Rockhampton Suburbs We Cover',
            body: (
              <>
                <p>Mould remediation response across the Rockhampton LGA:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>City/Inner (flood-risk priority):</strong> Rockhampton CBD, Depot Hill,
                  The Range, Frenchville, Norman Gardens, Park Avenue
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>North Rockhampton:</strong> Berserker, Kawana, Koongal, North Rockhampton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>South/West:</strong> Allenstown, Wandal, Gracemere, Southside, Rockyview
                </p>
              </>
            ),
          },
          {
            heading: "Mould Remediation Cost Estimates — Rocky 2026",
            body: (
              <>
                <p>
                  Post-Fitzroy River flood mould remediation costs are typically higher than standard mould
                  jobs due to the Category 3 contamination level, which requires additional decontamination
                  protocols and PPE beyond standard mould remediation procedures.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-Fitzroy flood — single room:</strong> $1,500–$5,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Multi-room:</strong> $5,000–$15,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Whole-house Category 3 flood mould:</strong> $15,000–$40,000+
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly does mould grow after Fitzroy River flooding?',
            answer:
              "Mould can begin establishing within 24–48 hours of flooding in Rockhampton's subtropical climate. Post-Fitzroy flood mould growth is accelerated by the nature of Category 3 contaminated floodwater, which carries sewage, agricultural runoff, and organic material from the catchment. These contaminants provide rich nutrients for rapid mould growth in building materials. Properties not professionally dried and treated within 48 hours of flood recession face significantly larger remediation scopes.",
          },
          {
            question: 'Is Fitzroy River flood mould covered by insurance?',
            answer:
              "Mould arising from a covered flood event is generally included in the flood claim. However, if flood cover was excluded from your policy, mould arising from the same flood event may also be excluded. It is critical to check your PDS for flood cover before assuming mould remediation will be covered. NRPG provides detailed documentation to support coverage arguments and helps you understand what is and is not covered under your specific policy.",
          },
          {
            question: 'What is the health risk from post-flood mould in Rockhampton?',
            answer:
              "Fitzroy River floodwater is Category 3 contaminated — it carries sewage, agricultural chemicals, and pathogenic organisms from its 142,000 km² catchment. Post-flood mould in Rockhampton properties often includes pathogenic species that are more hazardous than typical household mould. IICRC S520 PPE and full containment protocol are required for remediation. Do not re-enter mould-affected areas after Fitzroy River flooding without a professional assessment.",
          },
          {
            question: 'How long does post-flood mould remediation take in Rockhampton?',
            answer:
              "Timelines depend on the extent of mould affected areas: single room 1–2 days; moderate multi-room remediation 3–5 days; whole-house post-flood remediation 1–2 weeks. Rockhampton's Queenslander-style elevated homes with accessible subfloors add 2–3 additional days for subfloor treatment, as Category 3 floodwater contamination in the subfloor area requires complete decontamination before the building is safe to reoccupy.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Rockhampton',
            href: '/water-damage-restoration-rockhampton',
            description: 'Emergency water damage restoration across Rockhampton and Central Queensland.',
          },
          {
            title: 'Cyclone Damage Restoration Rockhampton',
            href: '/cyclone-damage-restoration-rockhampton',
            description: 'Cyclone damage restoration for Rockhampton and Central Queensland.',
          },
          {
            title: 'Mould Remediation Cost',
            href: '/guides/cost-guides/how-much-mould-remediation-cost',
            description: 'How much does mould remediation cost in Australia?',
          },
        ]}
        cta={{ text: 'Get Flood Mould Assessment — Rockhampton', href: '/claim' }}
      />
    </>
  );
}
