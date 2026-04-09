import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR: Cyclone Damage Restoration Karratha
 * Pilbara cyclone response — ARPC pool, TC Ilsa 2023, LNG and resources hub
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Karratha | Pilbara Emergency Response',
  description:
    'Cyclone damage restoration in Karratha, Dampier, and the Pilbara. ARPC covered. IICRC-certified contractors for the LNG and resources hub. Lodge 24/7.',
  keywords:
    'cyclone damage karratha, karratha cyclone restoration, pilbara cyclone, dampier cyclone damage, karratha storm damage, ARPC karratha',
  openGraph: {
    title: 'Cyclone Damage Restoration Karratha | Pilbara Emergency Response',
    description:
      'Cyclone damage restoration in Karratha, Dampier, and the Pilbara. ARPC covered. IICRC-certified contractors for the LNG and resources hub. Lodge 24/7.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-karratha`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-karratha/#localbusiness`,
  name: `${NAP.name} Karratha`,
  url: `${NAP.url}/cyclone-damage-restoration-karratha`,
  description:
    'IICRC-certified cyclone damage restoration in Karratha, Dampier, and the Pilbara. Emergency response for TC Ilsa-scale events, resources boom housing stock, and LNG-adjacent residential communities.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'Place',
    name: 'Karratha',
    containedInPlace: { '@type': 'State', name: 'Western Australia' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Karratha',
    addressRegion: 'WA',
    postalCode: '6714',
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
  name: 'Cyclone Damage Restoration Karratha',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'Place', name: 'Karratha' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Professional cyclone damage restoration in Karratha, Dampier, and the Pilbara: emergency make-safe, roof tarping, structural drying, water extraction, and ARPC-compliant insurance documentation.',
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
      name: 'Is Karratha in the ARPC Cyclone Reinsurance Pool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 Karratha (20.7\u00b0S) is well north of the Tropic of Capricorn. All residential properties are ARPC-covered for cyclone events. TC Ilsa (April 2023) made Category 5 landfall near Karratha and ARPC processed the associated residential claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'What cyclone events have affected Karratha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TC Orson (1989) made Category 5 landfall on the Pilbara coast. TC Ilsa (April 2023) made Category 5 landfall approximately 50km north of Karratha near Cape Keraudren, causing significant damage to Pardoo Station and surrounding pastoral properties and representing a near-miss for Karratha township. The region faces multiple annual Category 3\u20134 cyclone threats.',
      },
    },
    {
      '@type': 'Question',
      name: "Does Karratha's modern housing reduce cyclone damage?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The 2005\u20132015 resources boom produced well-engineered cyclone-rated housing across Karratha's newer suburbs. However, pool enclosures, outbuildings, and older stock in Dampier face higher risk from wind uplift. Cyclone wind ratings must match local design wind speeds \u2014 C4 applies to the Karratha region, meaning all post-repair work must comply with C4 cyclone wind rating requirements.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are LNG worker accommodation villages covered by ARPC for cyclone damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ARPC covers residential building insurance policies. Large-scale worker accommodation (dongas) operated by mining and LNG companies as commercial assets typically hold commercial property policies outside the ARPC residential pool. Separate specialist advice is required for commercial LNG-adjacent accommodation properties.',
      },
    },
  ],
};

export default function CycloneDamageRestorationKarrathaPage() {
  return (
    <>
      <Script
        id="cdrkarr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="cdrkarr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="cdrkarr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Karratha"
        subtitle="IICRC-certified cyclone damage restoration for Karratha, Dampier, and the Pilbara. TC Ilsa-tested response capability. ARPC pool covered. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Karratha' },
        ]}
        sections={[
          {
            heading: 'Karratha and the Pilbara \u2014 Cyclone Risk Profile',
            body: (
              <>
                <p>
                  Karratha (20.7&deg;S) is WA&apos;s largest Pilbara city, with a population of
                  approximately 25,000. As the hub of Australia&apos;s LNG and iron ore resources
                  sector, Karratha and the adjacent Burrup Peninsula host critical energy infrastructure
                  with national significance. The entire Karratha region sits well north of the Tropic
                  of Capricorn and is within the ARPC Cyclone Reinsurance Pool coverage zone.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Ilsa (April 2023) made Category 5 landfall approximately 50km north of Karratha
                  near Cape Keraudren, causing significant damage to Pardoo Station and outlying pastoral
                  properties. The near-miss reinforced the cyclone exposure that Karratha residents face
                  each season. The 2005&ndash;2015 resources boom produced a modern housing stock across
                  Karratha&apos;s newer suburbs, generally engineered to C4 cyclone wind rating
                  standards \u2014 but older properties in Dampier and outbuildings across the region
                  remain at higher risk.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Dampier, approximately 15km from Karratha, is the port town serving the iron ore
                  and resources operations. Its older residential stock and direct coastal exposure
                  create a distinct damage profile compared to Karratha&apos;s newer suburbs.
                </p>
              </>
            ),
          },
          {
            heading: 'Cyclone Damage Types in Karratha',
            body: (
              <>
                <p>
                  Karratha&apos;s cyclone damage profile reflects its mix of modern engineered housing
                  and older coastal community buildings:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Wind uplift on roofing:</strong> Colorbond and tile roofing are both
                    common in Karratha. At 180&ndash;200 km/h cyclone-force winds, uplift forces
                    can exceed design loads on older fastener schedules. Post-TC Ilsa inspections
                    identified partial roof panel loss on older properties in the region.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Pool enclosure damage:</strong> Pool enclosures are a near-universal
                    feature of Karratha homes and represent one of the highest-frequency damage
                    claims following cyclone events. Glass and aluminium enclosure framing
                    is vulnerable at sustained Category 3 and above wind speeds.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Outbuilding and shed loss:</strong> Freestanding sheds and outbuildings
                    in Karratha regularly sustain total loss in cyclone events. Post-loss debris
                    from these structures can cause secondary damage to main dwellings.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Driven rain water ingress:</strong> At cyclone-force wind speeds,
                    rainwater is driven horizontally through wall and roof junction gaps that
                    perform adequately in normal conditions. Water ingress into wall cavities
                    requires professional extraction to prevent mould development in Karratha&apos;s
                    warm climate.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Salt spray corrosion:</strong> Post-cyclone salt spray accelerates
                    corrosion of exposed steel, particularly in coastal Dampier and foreshore
                    Karratha properties. Rapid corrosion assessment is essential for steel-framed
                    structures following any major cyclone event.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Karratha and Dampier \u2014 Areas We Cover',
            body: (
              <>
                <p>
                  <strong>Karratha city suburbs:</strong> Karratha CBD, Baynton, Nickol, Bulgarra,
                  Millars Well, Pegs Creek
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Dampier:</strong> Dampier town, Hampton Harbour precinct, Dampier foreshore
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Roebourne and Point Samson:</strong> Roebourne township, Point Samson,
                  Cossack heritage precinct
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial areas:</strong> Karratha Industrial Estate, Burrup Peninsula
                  (commercial and industrial properties with separate policy requirements)
                </p>
              </>
            ),
          },
          {
            heading: 'Pilbara Insurance Claims \u2014 What Makes Them Different',
            body: (
              <>
                <p>
                  Karratha insurance claims following cyclone events involve several factors that
                  make them materially different from metropolitan WA claims:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>High replacement costs:</strong> Pilbara construction costs typically
                    run at approximately twice Perth metropolitan rates due to remoteness, freight,
                    and labour premiums. Insurers commonly underestimate Pilbara rebuild costs in
                    their initial assessments \u2014 ensure your sum insured reflects current
                    Karratha replacement values.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>ARPC pool processing:</strong> Lodge residential cyclone claims as
                    &apos;cyclone damage&apos; to ensure ARPC pool routing through your insurer.
                    The pool operates in the background of your existing policy.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Building code compliance after repair:</strong> All post-cyclone
                    repairs must comply with C4 cyclone wind rating requirements applicable to
                    the Karratha region. NRPG contractors are familiar with Pilbara building code
                    requirements for cyclone-rated construction.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Insurer underestimation of Pilbara costs:</strong> A common dispute
                    point in Pilbara claims is the insurer&apos;s assessment of rebuild costs
                    using metropolitan WA rates. NRPG provides detailed scope documentation
                    with Pilbara-appropriate cost rates to support your claim.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Karratha in the ARPC Cyclone Reinsurance Pool?',
            answer:
              'Yes \u2014 Karratha (20.7\u00b0S) is well north of the Tropic of Capricorn. All residential properties are ARPC-covered for cyclone events. TC Ilsa (April 2023) made Category 5 landfall near Karratha and ARPC processed the associated residential claims.',
          },
          {
            question: 'What cyclone events have affected Karratha?',
            answer:
              'TC Orson (1989) made Category 5 landfall on the Pilbara coast. TC Ilsa (April 2023) made Category 5 landfall approximately 50km north of Karratha near Cape Keraudren, causing significant damage to Pardoo Station and surrounding pastoral properties and representing a near-miss for Karratha township. The region faces multiple annual Category 3\u20134 cyclone threats.',
          },
          {
            question: "Does Karratha's modern housing reduce cyclone damage?",
            answer:
              "The 2005\u20132015 resources boom produced well-engineered cyclone-rated housing across Karratha's newer suburbs. However, pool enclosures, outbuildings, and older stock in Dampier face higher risk from wind uplift. Cyclone wind ratings must match local design wind speeds \u2014 C4 applies to the Karratha region, meaning all post-repair work must comply with C4 cyclone wind rating requirements.",
          },
          {
            question: 'Are LNG worker accommodation villages covered by ARPC for cyclone damage?',
            answer:
              'ARPC covers residential building insurance policies. Large-scale worker accommodation (dongas) operated by mining and LNG companies as commercial assets typically hold commercial property policies outside the ARPC residential pool. Separate specialist advice is required for commercial LNG-adjacent accommodation properties.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Damage Restoration Port Hedland',
            href: '/cyclone-damage-restoration-port-hedland',
            description: 'Cyclone restoration for Port Hedland and the Pilbara east.',
          },
          {
            title: 'Cyclone Damage Restoration Broome',
            href: '/cyclone-damage-restoration-broome',
            description: 'Cyclone restoration across Broome and the Kimberley.',
          },
          {
            title: 'ARPC Cyclone Reinsurance Pool',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description: 'How the ARPC pool affects your WA cyclone claim.',
          },
        ]}
        cta={{ text: 'Lodge Cyclone Claim \u2014 Karratha', href: '/claim' }}
      />
    </>
  );
}
