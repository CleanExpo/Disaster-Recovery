import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Darwin | Wet Season & TC Maila Emergency',
  description:
    'Emergency flood damage restoration across Darwin and the Greater Darwin region. IICRC S500:2025 Category 2–3 certified contractors for wet season monsoonal flooding, rural Darwin agricultural contamination, and TC Maila storm flooding. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration darwin, flood damage darwin, wet season flooding darwin, darwin flood, monsoonal flooding darwin, humpty doo flood, howard springs flood, darwin flood restoration, TC Maila darwin flood',
  openGraph: {
    title: 'Flood Damage Restoration Darwin | Wet Season & TC Maila Emergency',
    description:
      'Emergency flood damage restoration across Darwin and the Greater Darwin region. IICRC S500:2025 Category 2–3 certified contractors for wet season monsoonal flooding, rural Darwin agricultural contamination, and TC Maila storm flooding. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Flood Damage Restoration')}&city=${encodeURIComponent('Darwin')}&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-darwin`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-darwin/#localbusiness`,
  name: `${NAP.name} Darwin`,
  url: `${NAP.url}/flood-damage-restoration-darwin`,
  description:
    '24/7 emergency flood damage restoration across Darwin, Palmerston, and Greater Darwin. IICRC S500:2025 Category 2–3 certified contractor network for wet season monsoonal flooding, rural Darwin agricultural contamination, and TC Maila storm flooding. Full insurance documentation provided.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Darwin',
    containedInPlace: { '@type': 'State', name: 'Northern Territory' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Darwin',
    addressRegion: 'NT',
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
  name: 'Emergency Flood Damage Restoration Darwin',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Darwin',
    containedInPlace: { '@type': 'State', name: 'Northern Territory' },
  },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Darwin to IICRC S500:2025 Category 2–3 standard. Emergency extraction, Category 3 contamination treatment, structural drying, and subfloor remediation for wet season monsoonal flooding, rural agricultural land inundation, and TC Maila storm flooding events.',
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
      name: 'Does the ARPC Cyclone Reinsurance Pool apply to wet season flooding in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ARPC Cyclone Reinsurance Pool applies to all NT postcodes and covers cyclone-related perils including storm surge, rain-on-roof, and rain-driven flooding triggered by a declared tropical system. If wet season flooding in Darwin is associated with a tropical low or cyclone event — including the outer rain bands of TC Maila (April 2026) — the damage may be classified under the cyclone peril and processed through the ARPC Pool mechanism via your private insurer. Standard wet season flooding not associated with a tropical system is processed under your flood or storm water peril. Confirming the meteorological trigger with the Bureau of Meteorology declaration is important for claim classification. NRPG contractors provide IICRC S500:2025 Category 2–3 scope documentation meeting all insurer requirements for NT flood and cyclone claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is flooding at Humpty Doo or Howard Springs classified as Category 3 contamination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — in most cases. Humpty Doo and Howard Springs are acreage rural properties located in low-lying areas north-east of Darwin that are routinely inundated during the wet season. Flood water crossing agricultural land — including paddocks used for livestock, market gardening, and rural residential land with septic systems — is classified as Category 3 (black water) under IICRC S500:2025 due to the presence of agricultural chemicals, animal waste, and biological contaminants. Category 3 remediation requires physical removal of contaminated porous materials (carpet, underlay, lower plasterboard), antimicrobial treatment of structural elements, post-remediation clearance testing, and full documentation for insurance submission. Standard drying-only approaches are not sufficient for Category 3 flood water.',
      },
    },
    {
      '@type': 'Question',
      name: "Why is Darwin's 12-hour mould window critical after wet season flooding?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Darwin's wet season climate — ambient temperatures of 28–35°C and relative humidity above 80% during the October–April monsoonal period — creates conditions where mould colonisation can begin within 12 hours of a flood event. IICRC S500:2025 identifies the 12-hour window as the critical response threshold: structural materials and contents that remain wet beyond this window have a significantly elevated probability of mould growth that requires remediation beyond standard drying. In Darwin's climate this window is considerably shorter in practical terms than in temperate cities. Immediate professional extraction and dehumidification response is not just best practice — it is the difference between a drying-only scope and a full mould remediation scope with significantly higher costs and displacement time.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does flood damage restoration cost in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood damage restoration costs in Darwin depend on the category of water, extent of inundation, and whether mould remediation is required. Indicative ranges: minor wet season flooding with limited ingress $4,000–$18,000; full ground floor inundation requiring Category 2–3 treatment, structural drying, and internal reinstatement $12,000–$50,000; tropical cyclone plus flood combined loss with structural damage and contamination treatment $30,000–$100,000+. Rural Darwin properties (Humpty Doo, Howard Springs) with Category 3 agricultural contamination typically fall in the upper ranges due to materials removal and testing requirements. All Category 3 scopes require IICRC S500:2025 documentation and post-remediation clearance testing for insurance submission.',
      },
    },
  ],
};

export default function FloodDamageRestorationDarwinPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fddarwin-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fddarwin-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fddarwin-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Darwin"
        subtitle="Emergency flood damage restoration across Darwin, Palmerston, and Greater Darwin. IICRC S500:2025 Category 2–3 certified contractors for wet season monsoonal flooding, rural Darwin agricultural contamination, and TC Maila storm flooding. 60-minute response."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Flood Damage', href: '/services/water-damage' },
          { label: 'Darwin' },
        ]}
        sections={[
          {
            heading: 'Darwin Wet Season Flooding — Monsoonal Inundation and TC Maila',
            body: (
              <>
                <p>
                  Darwin&apos;s Wet Season (October&ndash;April) brings monsoonal rainfall events
                  that regularly deliver 100&ndash;200mm within 24 hours across the Darwin CBD and
                  suburban areas. Darwin&apos;s flat coastal terrain and low-lying position mean
                  stormwater drainage infrastructure is quickly overwhelmed during extreme wet season
                  downpours, with flash flooding affecting suburbs within minutes of peak rainfall.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Tropical Cyclone Maila (April 2026) delivered significant outer rain bands across
                  the Darwin region, with storm flooding affecting Darwin CBD, inner suburbs, and
                  the northern coastal fringe. TC Maila rain-band flooding may be classified under
                  the cyclone peril through the ARPC Cyclone Reinsurance Pool &mdash; which applies
                  to all NT postcodes &mdash; if the flooding is associated with the declared
                  tropical system. NRPG contractors provide IICRC S500:2025 Category 2&ndash;3
                  scope documentation for both standard wet season flood claims and ARPC cyclone
                  peril claims.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Darwin&apos;s inner suburbs &mdash; Larrakeyah, Fannie Bay, Parap, and the CBD
                  &mdash; are subject to rapid surface flooding during extreme rainfall due to
                  the impervious urban surface and limited natural drainage. The northern suburban
                  belt (Casuarina, Nightcliff, Rapid Creek, Coconut Grove) experiences overland
                  flow flooding when stormwater drainage capacity is exceeded during heavy wet
                  season storms.
                </p>
              </>
            ),
          },
          {
            heading: 'Rural Darwin Category 3 Contamination — Humpty Doo and Howard Springs',
            body: (
              <>
                <p>
                  The rural areas north-east of Darwin &mdash; Humpty Doo, Howard Springs,
                  Coolalinga, and Berry Springs &mdash; sit in low-lying terrain that is routinely
                  inundated during wet season flooding events. Acreage properties in these areas
                  face a specific and serious contamination risk: flood water crossing agricultural
                  land is classified as Category 3 (black water) under IICRC S500:2025 due to
                  agricultural chemicals, animal waste, septic system overflow, and biological
                  contaminants that accumulate as floodwater moves across rural land.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Category 3 remediation is substantially more involved than standard flood drying.
                  It requires physical removal of all contaminated porous materials (carpet, underlay,
                  lower plasterboard courses), antimicrobial treatment of structural elements, air
                  purification, and post-remediation clearance testing before reinstatement can
                  begin. Attempting to dry Category 3 flood-affected materials in place rather than
                  removing them is a non-compliant approach that insurance assessors and certifying
                  bodies will identify at inspection.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Darwin&apos;s wet season climate creates a 12-hour mould window: with ambient
                  temperatures above 30&deg;C and relative humidity consistently above 80%,
                  mould colonisation can begin within 12 hours of a flood event. Immediate
                  professional response is critical to prevent a flood damage scope compounding
                  into a concurrent mould remediation loss.
                </p>
              </>
            ),
          },
          {
            heading: 'Darwin Suburbs We Cover',
            body: (
              <>
                <p>
                  60-minute emergency response across Darwin and Greater Darwin for IICRC S500:2025
                  Category 2&ndash;3 flood damage make-safe, extraction, and structural drying:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Darwin inner suburbs:</strong> Darwin CBD, Larrakeyah, Fannie Bay, Parap
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern suburban belt:</strong> Casuarina, Nightcliff, Rapid Creek,
                  Coconut Grove
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern suburbs:</strong> Leanyer, Wanguri, Malak, Karama
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Palmerston corridor:</strong> Palmerston City, Berrimah, Winnellie
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Rural Darwin:</strong> Humpty Doo, Howard Springs, Coolalinga,
                  Berry Springs (extended response time may apply for outer rural areas)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does the ARPC Cyclone Reinsurance Pool apply to wet season flooding in Darwin?',
            answer:
              'The ARPC Cyclone Reinsurance Pool applies to all NT postcodes and can cover wet season flooding that is triggered by a declared tropical system — including TC Maila outer rain bands. Standard wet season flooding not associated with a tropical system is processed under your flood or stormwater peril. NRPG contractors provide IICRC S500:2025 Category 2–3 documentation for both flood and ARPC cyclone peril claims.',
          },
          {
            question: 'Is flooding at Humpty Doo or Howard Springs classified as Category 3 contamination?',
            answer:
              'Yes — in most cases. Floodwater crossing agricultural land at Humpty Doo and Howard Springs is classified as Category 3 (black water) under IICRC S500:2025 due to agricultural chemicals, animal waste, and septic overflow. Category 3 remediation requires physical materials removal, antimicrobial treatment, post-remediation clearance testing, and full IICRC S500:2025 documentation for insurance submission.',
          },
          {
            question: "Why is Darwin's 12-hour mould window critical after wet season flooding?",
            answer:
              "Darwin's wet season climate — 28–35°C temperatures and 80%+ humidity — means mould colonisation can begin within 12 hours of a flood event. Beyond this window, a drying-only scope can compound into a full mould remediation scope with significantly higher costs and extended displacement time. Immediate professional extraction and dehumidification response is essential.",
          },
          {
            question: 'How much does flood damage restoration cost in Darwin?',
            answer:
              'Indicative costs: minor wet season flooding $4,000–$18,000; full ground floor inundation with Category 2–3 treatment $12,000–$50,000; tropical cyclone plus flood combined loss $30,000–$100,000+. Rural Darwin properties with Category 3 agricultural contamination typically fall in the upper range. All Category 3 scopes require IICRC S500:2025 documentation and clearance testing.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Darwin',
            href: '/water-damage-restoration-darwin',
            description: 'Emergency water damage restoration across Darwin and Greater Darwin.',
          },
          {
            title: 'Cyclone Water Damage Darwin',
            href: '/cyclone-water-damage-restoration-darwin',
            description: 'TC Maila cyclone water damage restoration across Darwin.',
          },
          {
            title: 'Mould Remediation Darwin',
            href: '/mould-remediation-darwin',
            description: 'IICRC-certified mould remediation across Darwin and surrounds.',
          },
          {
            title: 'Storm Damage Darwin',
            href: '/storm-damage-restoration-darwin',
            description: 'Emergency storm damage restoration across Darwin and the NT.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
