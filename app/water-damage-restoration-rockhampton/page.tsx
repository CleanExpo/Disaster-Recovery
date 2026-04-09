import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-483: Water Damage Restoration Rockhampton
 * Fitzroy River flood recovery, Central Queensland, ARPC Cyclone Pool
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Rockhampton | 24/7 IICRC Certified',
  description:
    'Professional water damage restoration across Rockhampton and Central Queensland. IICRC S500:2025 certified. Fitzroy River flood recovery. 60-minute emergency response.',
  keywords:
    'water damage restoration rockhampton, water damage rockhampton, fitzroy river flood, burst pipe rockhampton, storm flooding rockhampton, IICRC rockhampton central queensland',
  openGraph: {
    title: 'Water Damage Restoration Rockhampton | 24/7 IICRC Certified',
    description:
      'Emergency water damage restoration across Rockhampton and Central Queensland. IICRC S500:2025 certified. Fitzroy River flood recovery. 60-minute response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Rockhampton')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-rockhampton`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-rockhampton/#localbusiness`,
  name: `${NAP.name} Rockhampton`,
  url: `${NAP.url}/water-damage-restoration-rockhampton`,
  description:
    'IICRC-certified water damage restoration contractors serving Rockhampton and Central Queensland 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation following IICRC S500:2025. Fitzroy River flood recovery specialists.',
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
  name: 'Water Damage Restoration Rockhampton',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Rockhampton' },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration in Rockhampton: emergency water extraction, structural drying to IICRC S500:2025, Fitzroy River flood recovery, Category 3 contaminated water treatment, and insurance claim documentation.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes most water damage in Rockhampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Fitzroy River flooding is the dominant water damage risk in Rockhampton. The city has experienced significant flood events in 2011 (9.2m peak), 2013 (8.3m), and 2023 (8.1m). Secondary risks include cyclone-driven rainfall accumulation in the catchment, burst pipes, and storm water ingress through ageing building envelopes. The Fitzroy River catchment drains approximately 142,000 km\u00b2 of Central Queensland, meaning upstream rainfall events can cause Rockhampton flooding even during fine conditions in the city.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Rockhampton in the ARPC Cyclone Pool area?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Rockhampton (23.4\u00b0S) sits just north of the Tropic of Capricorn (23.5\u00b0S), placing it within the ARPC Cyclone Reinsurance Pool coverage zone. For cyclone-origin water damage, lodge as \u2018cyclone damage\u2019 rather than just \u2018water damage\u2019 to ensure correct pool classification. NRPG provides full IICRC-certified documentation packs for ARPC pool lodgement.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Rockhampton flood insurance differ from standard water damage cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Fitzroy River flooding is classified as \u2018flood\u2019 under most Product Disclosure Statements and requires a flood extension in your policy to be covered. Storm water ingress and burst pipes are standard water damage and covered under most policies. Cyclone-driven rainfall causing drains to back up can be disputed between flood and storm categories. NRPG categorises your damage correctly at the time of assessment to maximise your claim outcome and resolve insurer categorisation disputes with supporting documentation.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I lodge a Fitzroy River flood damage claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Photograph all damage with timestamps before touching anything. Note BOM flood peak records for the event date to establish that the Fitzroy River inundated your property. Lodge as \u2018flood damage\u2019 if river water entered your property; also lodge \u2018storm water ingress\u2019 separately if storm-driven water entered through the building envelope independently of the river flood. NRPG manages insurer correspondence and provides IICRC-certified documentation packs.",
      },
    },
  ],
};

export default function WaterDamageRestorationRockhamptonPage() {
  return (
    <>
      <Script
        id="wdrrock-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdrrock-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdrrock-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Rockhampton"
        subtitle="Emergency water damage restoration across Rockhampton and Central Queensland. IICRC S500:2025 certified technicians. Fitzroy River flood recovery. 60-minute emergency response."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Rockhampton' },
        ]}
        sections={[
          {
            heading: "Rockhampton's Water Damage Profile — The Fitzroy River",
            body: (
              <>
                <p>
                  Rockhampton&apos;s water damage risk is defined by the Fitzroy River, one of Australia&apos;s
                  largest river systems. The Fitzroy catchment drains approximately 142,000 km² of Central
                  Queensland, meaning rainfall across a vast inland area can generate devastating floods in
                  Rockhampton with relatively little warning.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  This century alone, Rocky has experienced three major Fitzroy River flood events:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>2011:</strong> 9.2m peak — the highest since 1991, inundating low-lying suburbs
                    including Depot Hill
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>2013:</strong> 8.3m peak — repeat flooding for many 2011-affected properties
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>2023:</strong> 8.1m peak — significant inundation across Depot Hill, The Range,
                    and Frenchville
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Properties in Depot Hill, The Range, and Frenchville face repeated inundation risk from
                  Fitzroy River events. NRPG IICRC-certified contractors have extensive experience with
                  Category 3 contaminated floodwater treatment in these suburbs.
                </p>
              </>
            ),
          },
          {
            heading: 'Fitzroy River Flood vs Storm Water Damage — Important Distinction',
            body: (
              <>
                <p>
                  The distinction between flood and storm water damage significantly affects your insurance
                  claim in Rockhampton:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Fitzroy River inundation</strong> = &apos;flood&apos; cover — requires a flood
                    extension in your policy
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm drainage overflow</strong> = &apos;stormwater&apos; — generally covered
                    under standard policies
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cyclone rainfall causing drain backflow</strong> = disputed category; requires
                    careful documentation
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG assessors categorise your specific damage correctly at the time of inspection,
                  providing documentation that resolves insurer categorisation disputes and maximises
                  your coverage outcome. Many Rockhampton properties experience both flood inundation
                  and storm water ingress simultaneously during major events — these must be lodged
                  as separate line items.
                </p>
              </>
            ),
          },
          {
            heading: 'Rockhampton Suburbs We Cover',
            body: (
              <>
                <p>60-minute emergency response across the Rockhampton LGA:</p>
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
            heading: 'Central Queensland Water Damage Cost Estimates 2026',
            body: (
              <>
                <p>
                  Indicative water damage restoration costs in Rockhampton and Central Queensland.
                  Fitzroy River flood events generate Category 3 (contaminated) water damage requiring
                  more extensive treatment protocols than clean water events.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipe (Category 1):</strong> $3,000–$12,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress (Category 2):</strong> $5,000–$20,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Fitzroy River inundation (Category 3 contaminated):</strong> $15,000–$60,000+
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What causes most water damage in Rockhampton?',
            answer:
              "Fitzroy River flooding is the dominant water damage risk in Rockhampton. The city has experienced significant flood events in 2011 (9.2m peak), 2013 (8.3m), and 2023 (8.1m). Secondary risks include cyclone-driven rainfall accumulation in the catchment, burst pipes, and storm water ingress through ageing building envelopes. The Fitzroy River catchment drains approximately 142,000 km² of Central Queensland, meaning upstream rainfall events can cause Rockhampton flooding even during fine conditions in the city.",
          },
          {
            question: 'Is Rockhampton in the ARPC Cyclone Pool area?',
            answer:
              "Rockhampton (23.4°S) sits just north of the Tropic of Capricorn (23.5°S), placing it within the ARPC Cyclone Reinsurance Pool coverage zone. For cyclone-origin water damage, lodge as 'cyclone damage' rather than just 'water damage' to ensure correct pool classification. NRPG provides full IICRC-certified documentation packs for ARPC pool lodgement.",
          },
          {
            question: 'Does Rockhampton flood insurance differ from standard water damage cover?',
            answer:
              "Fitzroy River flooding is classified as 'flood' under most Product Disclosure Statements and requires a flood extension in your policy to be covered. Storm water ingress and burst pipes are standard water damage and covered under most policies. Cyclone-driven rainfall causing drains to back up can be disputed between flood and storm categories. NRPG categorises your damage correctly at the time of assessment to maximise your claim outcome and resolve insurer categorisation disputes with supporting documentation.",
          },
          {
            question: 'How do I lodge a Fitzroy River flood damage claim?',
            answer:
              "Photograph all damage with timestamps before touching anything. Note BOM flood peak records for the event date to establish that the Fitzroy River inundated your property. Lodge as 'flood damage' if river water entered your property; also lodge 'storm water ingress' separately if storm-driven water entered through the building envelope independently of the river flood. NRPG manages insurer correspondence and provides IICRC-certified documentation packs.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Damage Restoration Rockhampton',
            href: '/cyclone-damage-restoration-rockhampton',
            description: 'Cyclone damage restoration for Rockhampton and Central Queensland.',
          },
          {
            title: 'Flood Damage Restoration Brisbane',
            href: '/flood-damage-restoration-brisbane',
            description: 'Flood damage restoration across Brisbane and South East Queensland.',
          },
          {
            title: 'Water Damage Cost Guide',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'How much does water damage restoration cost in Australia?',
          },
        ]}
        cta={{ text: 'Get Emergency Water Damage Help — Rockhampton', href: '/claim' }}
      />
    </>
  );
}
