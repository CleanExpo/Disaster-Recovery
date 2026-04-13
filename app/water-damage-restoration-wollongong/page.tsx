import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * Water Damage Restoration Wollongong
 *
 * Created: 9 April 2026
 * Context: The Illawarra receives some of Australia's highest rainfall intensity
 * per storm event due to orographic lifting over the Illawarra Escarpment.
 * The 2016 storm (300mm+ in 24h) and persistent Lake Illawarra shoreline
 * flooding create sustained demand for certified water damage restoration.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Wollongong | 24/7 IICRC Certified',
  description: 'Professional water damage restoration across Wollongong and the Illawarra. IICRC S500:2025 certified contractors respond as quickly as possible. Escarpment runoff, Lake Illawarra flooding, storm swell water ingress. Lodge your claim 24/7.',
  keywords: 'water damage restoration wollongong, water damage wollongong, flood damage wollongong, burst pipe wollongong, illawarra escarpment flood, lake illawarra flooding, water damage repair wollongong, IICRC wollongong, storm damage wollongong',
  openGraph: {
    title: 'Water Damage Restoration Wollongong | 24/7 Emergency Response',
    description: 'Emergency water damage restoration across Wollongong and the Illawarra. IICRC S500:2025 certified. priority response. Escarpment runoff, coastal storm swell, and Lake Illawarra flooding specialists.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Wollongong')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-wollongong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-wollongong/#localbusiness`,
  name: `${NAP.name} Wollongong`,
  url: `${NAP.url}/water-damage-restoration-wollongong`,
  description: 'IICRC-certified water damage restoration contractors serving Wollongong and the Illawarra 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation following IICRC S500:2025.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Wollongong', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Wollongong', addressRegion: 'NSW', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration Wollongong',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Wollongong' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Wollongong and the Illawarra: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, contents protection, and full insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is escarpment landslide and debris water damage covered by home insurance in Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Water damage caused by escarpment runoff entering your property through storm-driven overland flow is typically classified as either storm water ingress or flood (overland flow) depending on the mechanism. Properties in Thirroul, Stanwell Park, Scarborough, and Coledale that experienced water and debris from the escarpment during the 2016 Illawarra storm had mixed outcomes at claims time depending on policy wording. NRPG documents the precise mechanism of water entry — including photographs, meteorological data, and IICRC moisture mapping — to correctly categorise damage and support your claim.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does salt water intrusion from Pacific Ocean storm swell cause additional damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — significantly. Salt-laden water from east-facing Pacific storm swell events accelerates corrosion of metal fixings, studs, lintels, and electrical components far beyond what fresh water causes. Wollongong suburbs with direct eastern ocean exposure — including North Wollongong, Wollongong East, and Fairy Meadow — are at elevated risk during large swell events. NRPG technicians treat salt-affected materials with specialist antimicrobial and neutralising treatments, and document the salt contamination in detail for insurers, as secondary corrosion damage can emerge months after the initial event.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover Lake Illawarra flooding in Warilla and Windang?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Properties along the Lake Illawarra shoreline — including Warilla, Windang, and Primbee — are at high risk from flooding via Mullet Creek, Tom Thumb Lagoon, and Lake Illawarra surge events. This type of inundation is typically classified as flood (overland flow or storm surge into a water body) rather than storm water ingress. Whether it is covered depends on whether your policy includes a flood extension. NRPG assesses the mechanism of inundation and provides full documentation to support your claim, including escalation to AFCA if your insurer disputes coverage.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Water damage restoration in Wollongong ranges from $2,500–$12,000 for Category 1 losses such as burst pipes or appliance overflow, $6,000–$30,000 for Category 2 storm and escarpment runoff ingress, and $15,000–$70,000 or more for Category 3 or multi-trade losses involving Lake Illawarra inundation. Properties on sloping escarpment land with subfloor voids, and post-war homes in the Illawarra, often require additional subfloor treatment and structural drying that increases total costs. The Disaster Recovery platform charges a $2,750 initial commitment to begin emergency works.",
      },
    },
  ],
};

export default function WaterDamageRestorationWollongongPage() {
  return (
    <>
      <Script id="wdrgong-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrgong-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="wdrgong-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Wollongong"
        subtitle="Emergency water damage restoration across Wollongong and the Illawarra. IICRC S500:2025 certified technicians. priority response, 24 hours a day. Escarpment runoff, coastal storm swell, and Lake Illawarra flooding specialists."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Wollongong' },
        ]}
        sections={[
          {
            heading: 'Wollongong Water Damage Risk — Escarpment, Ocean, and Lake Illawarra',
            body: (
              <>
                <p>
                  Wollongong sits in one of the most geographically complex water damage environments in Australia.
                  The Illawarra Escarpment rises to over 600 metres immediately west of the coastal plain, acting as
                  an orographic barrier that forces moisture-laden onshore winds upward, triggering some of the
                  continent&apos;s most intense localised rainfall per storm event. When these rainfall events combine
                  with east-facing Pacific Ocean exposure and the catchment dynamics of Lake Illawarra, Mullet Creek,
                  and Tom Thumb Lagoon, the result is a tripartite water damage risk that affects virtually every
                  suburb in the LGA differently.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Northern escarpment suburbs — Thirroul, Austinmer, Coledale, and Stanwell Park — receive both
                  direct Pacific storm swell exposure and escarpment runoff during major events. Many properties in
                  these areas were built on sloping hillside land with subfloor voids that accumulate runoff from
                  upslope neighbours and council drainage. Post-war fibro and brick homes in the Illawarra have
                  ageing damp-proof courses and subfloor ventilation that may not be adequate to handle sustained
                  moisture intrusion.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Wollongong&apos;s coastal humidity runs at 70–80% year-round — among the highest of any Australian
                  coastal city. This ambient moisture level means mould establishes in water-affected materials
                  within 48 hours of a water event, and incomplete drying creates conditions for persistent mould
                  colonisation that can cause ongoing health and structural problems. IICRC S500:2025 requires
                  psychrometric monitoring throughout the drying phase to confirm materials have returned to
                  equilibrium moisture content before sign-off.
                </p>
              </>
            ),
          },
          {
            heading: '2016 Illawarra Storm and Orographic Rainfall',
            body: (
              <>
                <p>
                  In June 2016, a severe east coast low impacted the Illawarra, delivering over 300 mm of rainfall
                  in 24 hours across parts of the escarpment. The event triggered multiple landslides from the
                  escarpment, carrying water, debris, and saturated soil into residential areas including Thirroul,
                  Stanwell Park, and Scarborough. Properties that had never previously flooded were inundated, and
                  the combination of fresh water, escarpment sediment, and organic matter created complex Category 2
                  and Category 3 contamination scenarios.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Orographic lifting — the mechanism by which the escarpment forces warm, moist Pacific air upward
                  rapidly — means Wollongong can receive rainfall totals two to three times higher than the Sydney
                  basin during the same storm event. This amplification effect is well-documented by the Bureau of
                  Meteorology and means that insurers and restoration contractors must treat Illawarra storm events
                  with a different risk profile to other NSW coastal cities.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Salt-laden water driven horizontally by east-facing storm swell events adds a secondary damage
                  vector for beachside properties. Salt accelerates corrosion of metal fixings, structural
                  steelwork, and electrical components beyond the immediate water damage, and can cause significant
                  secondary losses if not treated with specialist antimicrobial and neutralising protocols.
                  NRPG technicians document all salt-affected materials separately for insurer review.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lake Illawarra flooding from Mullet Creek and Tom Thumb Lagoon presents a distinct risk for
                  southern suburbs. During prolonged rainfall events, the lake&apos;s receiving capacity is exceeded
                  and shoreline properties in Warilla, Windang, and Primbee are inundated from below-ground water
                  table rise and overland flow simultaneously. This dual-mechanism flooding is among the most
                  challenging claim documentation scenarios, requiring precise moisture mapping and clear
                  mechanism-of-entry evidence.
                </p>
              </>
            ),
          },
          {
            heading: 'Wollongong Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across Wollongong and the Illawarra:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Wollongong Inner City:</strong> Wollongong CBD, North Wollongong, Wollongong East,
                  Fairy Meadow, Gwynneville, Keiraville, Mount Keira, Figtree
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Escarpment Corridor:</strong> Thirroul, Austinmer, Coledale, Scarborough,
                  Stanwell Park, Stanwell Tops, Coalcliff, Clifton, Woonona, Bulli
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inland Suburbs:</strong> Dapto, Kembla Grange, Unanderra, Cordeaux Heights,
                  Mount Ousley, Farmborough Heights, Horsley, Albion Park Rail
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Lake Illawarra and Southern Suburbs:</strong> Shellharbour, Lake Illawarra,
                  Warilla, Windang, Primbee, Warrawong, Port Kembla, Barrack Heights
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Far South Illawarra:</strong> Kiama, Gerringong, Berry, Jamberoo, Gerroa,
                  Nowra, Bomaderry
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is escarpment landslide and debris water damage covered by home insurance in Wollongong?',
            answer: "Water damage caused by escarpment runoff entering your property through storm-driven overland flow is typically classified as either storm water ingress or flood (overland flow) depending on the mechanism. Properties in Thirroul, Stanwell Park, Scarborough, and Coledale that experienced water and debris from the escarpment during the 2016 Illawarra storm had mixed outcomes at claims time depending on policy wording. NRPG documents the precise mechanism of water entry — including photographs, meteorological data, and IICRC moisture mapping — to correctly categorise damage and support your claim.",
          },
          {
            question: 'Does salt water intrusion from Pacific Ocean storm swell cause additional damage?',
            answer: "Yes — significantly. Salt-laden water from east-facing Pacific storm swell events accelerates corrosion of metal fixings, studs, lintels, and electrical components far beyond what fresh water causes. Wollongong suburbs with direct eastern ocean exposure — including North Wollongong, Wollongong East, and Fairy Meadow — are at elevated risk during large swell events. NRPG technicians treat salt-affected materials with specialist antimicrobial and neutralising treatments, and document the salt contamination in detail for insurers, as secondary corrosion damage can emerge months after the initial event.",
          },
          {
            question: 'Does home insurance cover Lake Illawarra flooding in Warilla and Windang?',
            answer: "Properties along the Lake Illawarra shoreline — including Warilla, Windang, and Primbee — are at high risk from flooding via Mullet Creek, Tom Thumb Lagoon, and Lake Illawarra surge events. This type of inundation is typically classified as flood (overland flow or storm surge into a water body) rather than storm water ingress. Whether it is covered depends on whether your policy includes a flood extension. NRPG assesses the mechanism of inundation and provides full documentation to support your claim, including escalation to AFCA if your insurer disputes coverage.",
          },
          {
            question: 'How much does water damage restoration cost in Wollongong?',
            answer: "Water damage restoration in Wollongong ranges from $2,500–$12,000 for Category 1 losses such as burst pipes or appliance overflow, $6,000–$30,000 for Category 2 storm and escarpment runoff ingress, and $15,000–$70,000 or more for Category 3 or multi-trade losses involving Lake Illawarra inundation. Properties on sloping escarpment land with subfloor voids, and post-war homes in the Illawarra, often require additional subfloor treatment and structural drying that increases total costs. The Disaster Recovery platform charges a $2,750 initial commitment to begin emergency works.",
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Wollongong', href: '/storm-damage-restoration-wollongong', description: 'East coast low and escarpment storm damage restoration across the Illawarra.' },
          { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney', description: 'Our Sydney water damage restoration service.' },
          { title: 'Flood Damage Restoration Sydney', href: '/flood-damage-restoration-sydney', description: 'Flood damage restoration and claim support across Sydney.' },
          { title: 'Mould Remediation Sydney', href: '/mould-remediation-sydney', description: 'IICRC-certified mould remediation after water damage.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
