import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-481: Water Damage Restoration Mackay
 * TC Maila southern zone — Mackay, Pioneer River, Whitsunday coast
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Mackay | 24/7 IICRC Certified',
  description:
    'Professional water damage restoration across Mackay and the Whitsunday coast. IICRC S500:2025 certified. priority response. Cyclone and storm flood recovery support.',
  keywords:
    'water damage restoration mackay, water damage mackay, burst pipe mackay, storm flooding mackay, TC Maila mackay, IICRC mackay',
  openGraph: {
    title: 'Water Damage Restoration Mackay | 24/7 IICRC Certified',
    description:
      'Emergency water damage restoration across Mackay and the Whitsunday coast. IICRC S500:2025 certified. priority response. TC Maila water damage recovery.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Mackay')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-mackay`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-mackay/#localbusiness`,
  name: `${NAP.name} Mackay`,
  url: `${NAP.url}/water-damage-restoration-mackay`,
  description:
    'IICRC-certified water damage restoration contractors serving Mackay and the Whitsunday coast 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation following IICRC S500:2025.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Mackay',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mackay',
    addressRegion: 'QLD',
    postalCode: '4740',
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
  name: 'Water Damage Restoration Mackay',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Mackay' },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration in Mackay: emergency water extraction, structural drying to IICRC S500:2025, mould remediation, contents protection, and insurance claim documentation for ARPC Cyclone Pool lodgement.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly should water damage be treated in Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Water damage should be treated within 24\u201348 hours of occurring. Mackay\u2019s tropical climate means mould establishes faster than in southern cities \u2014 warm temperatures and high baseline humidity accelerate spore growth in saturated materials. Cyclone rainfall events can bring 400\u2013600mm in 48 hours, saturating wall cavities, subfloors, and insulation. Every hour of delayed treatment increases remediation costs and health risk.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does TC Maila affect Mackay properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mackay is in TC Maila\u2019s projected southern track zone in the 11\u201314 April 2026 window. Even where the primary landfall is further north, Mackay properties face tropical cyclone conditions including destructive winds and rainfall. NRPG contractors are pre-positioned for post-clearance response. Lodge your claim now at disasterrecovery.com.au/claim so you are prioritised immediately after the all-clear.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does the ARPC Cyclone Pool apply to Mackay water damage claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mackay (21.1\u00b0S) is north of the Tropic of Capricorn, placing it firmly within the ARPC Cyclone Reinsurance Pool zone. For TC Maila water damage, lodge as both \u2018cyclone damage\u2019 and \u2018water ingress\u2019 separately \u2014 not just \u2018water damage\u2019 \u2014 to maximise coverage under pool provisions. NRPG provides full IICRC-certified documentation packs for ARPC pool lodgement.",
      },
    },
    {
      '@type': 'Question',
      name: 'What causes most water damage in Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The dominant causes of water damage in Mackay are: cyclone-driven water ingress through failed roof sheeting and breached building envelopes; storm flooding from the Pioneer River catchment during intense rainfall events; burst pipes during post-cyclone temperature swings as infrastructure is stressed; and secondary water entry caused by cyclone wind damage to roofing, gutters, and external walls.',
      },
    },
  ],
};

export default function WaterDamageRestorationMackayPage() {
  return (
    <>
      <Script
        id="wdrmkay-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdrmkay-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdrmkay-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Mackay"
        subtitle="Emergency water damage restoration across Mackay and the Whitsunday coast. IICRC S500:2025 certified technicians. priority response. Cyclone and storm flood recovery support."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Mackay' },
        ]}
        sections={[
          {
            heading: "Mackay's Water Damage Risk Profile",
            body: (
              <>
                <p>
                  Mackay sits within Queensland&apos;s primary tropical rainfall belt, receiving approximately
                  1,500 mm annually with the wet season delivering the majority in intense, short-duration events.
                  Single cyclone systems can deposit 400–600 mm across the Mackay region within 48 hours, rapidly
                  overwhelming stormwater infrastructure and inundating low-lying properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Pioneer River catchment presents a recurring flood risk for Mackay&apos;s inner suburbs.
                  TC Debbie in 2017 caused widespread water damage across the Mackay and Whitsunday regions,
                  demonstrating how cyclone-driven rainfall events can simultaneously generate water ingress,
                  roof damage, and river flooding across the same properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila in 2026 is tracking within Mackay&apos;s projected impact corridor. NRPG contractors
                  are pre-positioned for post-clearance emergency response across the Mackay LGA.
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila — Mackay Response',
            body: (
              <>
                <p>
                  Mackay is within TC Maila&apos;s projected southern zone for the 11–14 April 2026 forecast
                  window. Even if the primary landfall occurs north of Mackay, the city faces tropical cyclone
                  conditions: destructive winds, heavy rainfall, and Pioneer River flooding risk from inland
                  rainfall accumulation across the catchment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG IICRC-certified contractors are pre-positioned across the Mackay region to provide
                  priority post-clearance response for:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Emergency water extraction and containment</li>
                  <li style={{ marginBottom: '0.5rem' }}>Structural drying to IICRC S500:2025</li>
                  <li style={{ marginBottom: '0.5rem' }}>Psychrometric documentation for insurer sign-off</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial treatment in Mackay&apos;s tropical climate
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full ARPC Cyclone Pool documentation for claim lodgement
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim now at disasterrecovery.com.au/claim to be prioritised immediately after
                  the all-clear is issued.
                </p>
              </>
            ),
          },
          {
            heading: 'Mackay Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across the Mackay LGA:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>City/Inner:</strong> Mackay CBD, North Mackay, South Mackay, West Mackay,
                  Andergrove, Beaconsfield, Blacks Beach, Mount Pleasant
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Outer Suburbs:</strong> Ooralea, Slade Point, Eimeo, Rural View, Shoal Point,
                  Habana
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Regional:</strong> Walkerston, Mirani (60–90 minute response)
                </p>
              </>
            ),
          },
          {
            heading: 'Water Damage Restoration Cost Estimates — Mackay 2026',
            body: (
              <>
                <p>
                  Indicative costs for water damage restoration in Mackay. Post-cyclone surge demand may
                  affect pricing and availability — lodge early to secure priority contractor dispatch.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipe (Category 1):</strong> $3,000–$12,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress (Category 2):</strong> $5,000–$20,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cyclone inundation (Category 3):</strong> $15,000–$60,000+
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly should water damage be treated in Mackay?',
            answer:
              "Water damage should be treated within 24–48 hours of occurring. Mackay's tropical climate means mould establishes faster than in southern cities — warm temperatures and high baseline humidity accelerate spore growth in saturated materials. Cyclone rainfall events can bring 400–600mm in 48 hours, saturating wall cavities, subfloors, and insulation. Every hour of delayed treatment increases remediation costs and health risk.",
          },
          {
            question: 'Does TC Maila affect Mackay properties?',
            answer:
              "Mackay is in TC Maila's projected southern track zone in the 11–14 April 2026 window. Even where the primary landfall is further north, Mackay properties face tropical cyclone conditions including destructive winds and rainfall. NRPG contractors are pre-positioned for post-clearance response. Lodge your claim now at disasterrecovery.com.au/claim so you are prioritised immediately after the all-clear.",
          },
          {
            question: 'How does the ARPC Cyclone Pool apply to Mackay water damage claims?',
            answer:
              "Mackay (21.1°S) is north of the Tropic of Capricorn, placing it firmly within the ARPC Cyclone Reinsurance Pool zone. For TC Maila water damage, lodge as both 'cyclone damage' and 'water ingress' separately — not just 'water damage' — to maximise coverage under pool provisions. NRPG provides full IICRC-certified documentation packs for ARPC pool lodgement.",
          },
          {
            question: 'What causes most water damage in Mackay?',
            answer:
              "The dominant causes of water damage in Mackay are: cyclone-driven water ingress through failed roof sheeting and breached building envelopes; storm flooding from the Pioneer River catchment during intense rainfall events; burst pipes during post-cyclone temperature swings as infrastructure is stressed; and secondary water entry caused by cyclone wind damage to roofing, gutters, and external walls.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Damage Restoration Mackay',
            href: '/cyclone-damage-restoration-mackay',
            description: 'Full cyclone damage restoration for Mackay — structural, water, and make-safe.',
          },
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'Real-time TC Maila updates and 24/7 claim lodgement.',
          },
          {
            title: 'Water Damage Cost Guide',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'How much does water damage restoration cost in Australia?',
          },
        ]}
        cta={{ text: 'Get Emergency Water Damage Help — Mackay', href: '/claim' }}
      />
    </>
  );
}
