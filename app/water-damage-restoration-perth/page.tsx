import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-476: Water Damage Restoration Perth
 *
 * Created: 9 April 2026
 * Note: Complements the existing flood-damage-restoration-perth page.
 * Covers different search queries: burst pipes, appliance overflow, storm water ingress.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Perth | IICRC-Certified 24/7 Emergency',
  description:
    'Professional water damage restoration across Perth and Western Australia. IICRC S500:2025 certified contractors, priority response. Burst pipes, storm flooding, and water ingress specialists. Lodge your claim 24/7.',
  keywords:
    'water damage restoration perth, water damage perth, burst pipe perth, storm water damage perth, water damage repair perth WA, IICRC perth, flood damage restoration perth',
  openGraph: {
    title: 'Water Damage Restoration Perth | IICRC-Certified 24/7 Emergency',
    description:
      'Professional water damage restoration across Perth and Western Australia. IICRC S500:2025 certified contractors, priority response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Perth')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-perth`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-perth/#localbusiness`,
  name: `${NAP.name} Perth`,
  url: `${NAP.url}/water-damage-restoration-perth`,
  description:
    'IICRC-certified water damage restoration contractors serving Perth and Western Australia 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Perth', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Perth', addressRegion: 'WA', addressCountry: 'AU' },
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
  name: 'Water Damage Restoration Perth',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Perth' },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration in Perth: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, contents protection, and full insurance claim documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does water damage need to be treated in Perth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Within 24\u201348 hours. Perth\u2019s summer heat (35\u00b0C+) and low humidity accelerate surface drying but can trap moisture in wall cavities and subfloor, creating hidden mould growth. In winter, cool and wet conditions slow structural drying and extend the window for mould establishment. Lodge immediately for priority emergency response \u2014 early treatment prevents the damage from escalating.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is water damage from Perth storms covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes \u2014 storm water ingress through damaged building elements (failed roof, broken windows, breached walls) is covered under the storm damage provision of most standard home insurance policies in WA. Overland flow flooding from external sources requires a specific flood extension. Lodge as \u2018storm water ingress\u2019 to ensure the correct peril is applied.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool apply to Perth properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ARPC Cyclone Pool applies to WA properties north of the Tropic of Capricorn. Greater Perth metropolitan properties are not within the pool zone, but are covered by standard home insurance policies for cyclone-related damage. For Pilbara and Kimberley properties, the pool applies \u2014 lodge as "cyclone damage" and "water ingress".',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between the water damage and flood damage pages for Perth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage covers sudden internal water loss (burst pipes, appliance overflow) and storm water ingress through breached building elements. Our flood damage page covers external flood inundation from rivers or overland flow. Both require IICRC-certified restoration \u2014 the policy peril classification determines which coverage applies. NRPG helps identify the correct category for your Perth claim.',
      },
    },
  ],
};

export default function WaterDamageRestorationPerthPage() {
  return (
    <>
      <Script
        id="wdrperth-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdrperth-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdrperth-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Perth"
        subtitle="Emergency water damage restoration across Perth and Western Australia. IICRC S500:2025 certified technicians. priority response, 24 hours a day. Burst pipes, storm flooding, and cyclone water damage specialists."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Perth' },
        ]}
        sections={[
          {
            heading: 'Water Damage in Perth — Storms, Burst Pipes, and Tropical Cyclones',
            body: (
              <>
                <p>
                  Perth experiences water damage from three primary sources. Summer thunderstorms (November–April)
                  generate flash flooding, overwhelmed stormwater systems, and wind-driven rain ingress through aged
                  roof and window systems. Burst pipes and appliance failures cause Category 1 water damage year-round
                  — particularly in ageing residential stock across Perth&apos;s established inner suburbs. Tropical cyclones
                  tracking down the WA coast can bring significant wind and water damage to Perth&apos;s northern corridor
                  and properties in the Pilbara and Kimberley regions. The ARPC Cyclone Reinsurance Pool applies to WA
                  properties north of the Tropic of Capricorn.
                </p>
              </>
            ),
          },
          {
            heading: "IICRC S500:2025 — Why It Matters for Perth Claims",
            body: (
              <>
                <p>
                  IICRC S500:2025 is the Australian standard for water damage restoration. Perth&apos;s Mediterranean
                  climate (hot, dry summers and wet winters) creates specific drying challenges — in summer, the low
                  ambient humidity accelerates surface drying while deeper structural moisture remains trapped, creating
                  ideal conditions for mould in wall cavities. In winter, the reverse problem applies: cool, wet
                  conditions slow structural drying and require longer dehumidifier run times. NRPG contractors use
                  calibrated psychrometric logging to confirm drying targets are met regardless of seasonal conditions
                  — providing the documented evidence Perth insurers require for claim sign-off.
                </p>
              </>
            ),
          },
          {
            heading: 'Water Damage Restoration Cost Estimates — Perth 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipe or appliance overflow (Category 1):</strong> $3,000–$12,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress through roof or windows (Category 2):</strong> $5,000–$22,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Sewage or floodwater inundation (Category 3):</strong> $15,000–$60,000+
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Combined water and structural loss (post-storm):</strong> $20,000–$100,000+
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Perth Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across the Perth metropolitan area:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City/North:</strong> Perth CBD, Northbridge, Leederville, Mount Lawley, Highgate,
                  Subiaco, Claremont
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Joondalup, Wanneroo, Burns Beach, Yanchep, Two Rocks, Mindarie
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern:</strong> Midland, Kalamunda, Armadale, Byford, Serpentine, Mundaring
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Fremantle, Cockburn, Rockingham, Mandurah (90 min)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western:</strong> Cottesloe, Swanbourne, City Beach, Scarborough, Trigg, Floreat
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly does water damage need to be treated in Perth?',
            answer:
              "Within 24–48 hours. Perth's summer heat (35°C+) and low humidity accelerate surface drying but can trap moisture in wall cavities and subfloor, creating hidden mould growth. In winter, cool and wet conditions slow structural drying and extend the window for mould establishment. Lodge immediately for priority emergency response — early treatment prevents the damage from escalating.",
          },
          {
            question: 'Is water damage from Perth storms covered by home insurance?',
            answer:
              "Yes — storm water ingress through damaged building elements (failed roof, broken windows, breached walls) is covered under the storm damage provision of most standard home insurance policies in WA. Overland flow flooding from external sources requires a specific flood extension. Lodge as 'storm water ingress' to ensure the correct peril is applied.",
          },
          {
            question: 'Does the ARPC Cyclone Pool apply to Perth properties?',
            answer:
              'The ARPC Cyclone Pool applies to WA properties north of the Tropic of Capricorn. Greater Perth metropolitan properties are not within the pool zone, but are covered by standard home insurance policies for cyclone-related damage. For Pilbara and Kimberley properties, the pool applies — lodge as "cyclone damage" and "water ingress".',
          },
          {
            question: 'What is the difference between the water damage and flood damage pages for Perth?',
            answer:
              'Water damage covers sudden internal water loss (burst pipes, appliance overflow) and storm water ingress through breached building elements. Our flood damage page covers external flood inundation from rivers or overland flow. Both require IICRC-certified restoration — the policy peril classification determines which coverage applies. NRPG helps identify the correct category for your Perth claim.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Flood Damage Restoration Perth',
            href: '/flood-damage-restoration-perth',
            description: 'External flood inundation restoration for Perth properties.',
          },
          {
            title: 'Storm Damage Restoration Services',
            href: '/services/storm-damage',
            description: 'Full storm damage restoration service overview.',
          },
          {
            title: 'Water Damage Restoration Melbourne',
            href: '/water-damage-restoration-melbourne',
            description: 'IICRC-certified water damage restoration in Melbourne.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
