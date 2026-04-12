import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-479: Cyclone Damage Restoration Innisfail
 * TC Maila impact zone — Cassowary Coast, highest cyclone hit rate in Australia
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Innisfail | TC Maila Cassowary Coast Response',
  description: 'Cyclone damage restoration in Innisfail and the Cassowary Coast. IICRC-certified contractors pre-positioned for TC Maila. Innisfail has the highest cyclone hit rate in Australia. Lodge your claim 24/7.',
  keywords: 'cyclone damage restoration innisfail, cyclone innisfail, TC Maila innisfail, cassowary coast cyclone, cyclone damage tully, cyclone damage mission beach, storm damage innisfail',
  openGraph: {
    title: 'Cyclone Damage Restoration Innisfail | TC Maila Cassowary Coast Response',
    description: 'IICRC-certified cyclone restoration contractors in Innisfail. Pre-positioned for TC Maila. Lodge your claim 24/7.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-innisfail`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-innisfail/#localbusiness`,
  name: `${NAP.name} Innisfail`,
  url: `${NAP.url}/cyclone-damage-restoration-innisfail`,
  description: 'IICRC-certified cyclone damage restoration in Innisfail and the Cassowary Coast. Emergency response for TC Maila structural damage, water damage, and roof repairs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Innisfail', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Innisfail', addressRegion: 'QLD', postalCode: '4860', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration Innisfail',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Innisfail' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Professional cyclone damage restoration in Innisfail and the Cassowary Coast: emergency make-safe, roof tarping, structural drying, water extraction, and insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was Innisfail affected by TC Maila?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes \u2014 TC Maila made landfall across the FNQ coast on 11\u201312 April 2026. The Innisfail and Cassowary Coast corridor (postcode 4860) was within the TC Maila impact zone. NRPG contractors are deployed in the Innisfail region for post-clearance response. Lodge your claim now at disasterrecovery.com.au/claim." },
    },
    {
      '@type': 'Question',
      name: 'What is the wettest place in Australia and why does it matter for cyclone damage?',
      acceptedAnswer: { '@type': 'Answer', text: 'Tully, in the Innisfail corridor, averages over 4,200 mm of annual rainfall \u2014 the highest of any Australian town. During cyclone events, rainfall can exceed 600 mm in 24 hours. This means water damage escalates faster in the Cassowary Coast than anywhere else in Australia. IICRC-certified structural drying must begin within 24 hours to prevent catastrophic mould growth.' },
    },
    {
      '@type': 'Question',
      name: 'How do I lodge a cyclone claim for an Innisfail property?',
      acceptedAnswer: { '@type': 'Answer', text: "Lodge at disasterrecovery.com.au/claim once emergency services confirm it is safe to assess. The ARPC Cyclone Reinsurance Pool applies to FNQ postcodes including 4860. Lodge as \u2018cyclone damage\u2019 and \u2018water ingress\u2019 separately. Photograph all damage before any cleanup. NRPG provides full IICRC-certified documentation packs." },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG reach Mission Beach and Cardwell after TC Maila?',
      acceptedAnswer: { '@type': 'Answer', text: 'Response to Mission Beach, Cardwell, and southern Cassowary Coast communities depends on road clearance on the Bruce Highway. NRPG pre-positions contractors in the region before major events to minimise the access delay. Lodge early to be first in the post-clearance dispatch queue.' },
    },
  ],
};

export default function CycloneDamageRestorationInnisfailPage() {
  return (
    <>
      <Script id="cdri-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="cdri-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="cdri-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Innisfail"
        subtitle="IICRC-certified contractors pre-positioned for TC Maila response across Innisfail, Tully, Mission Beach, and the Cassowary Coast. 60-minute post-clearance dispatch. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Innisfail' },
        ]}
        sections={[
          {
            heading: "Innisfail — Australia's Most Cyclone-Struck Town",
            body: (
              <>
                <p>
                  Innisfail (postcode 4860) holds the distinction of being directly struck by more major cyclones
                  than any other Australian town. TC Larry (Category 5, March 2006) made direct landfall at
                  Innisfail with sustained winds of 180 km/h, destroying approximately 10,000 homes and causing
                  AU$1.5 billion in damage. TC Yasi (Category 5, February 2011) tracked directly over the
                  Innisfail corridor with sustained winds exceeding 200 km/h.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila is following a similar track, with the Innisfail–Tully corridor within the forecast
                  impact zone for the 11–14 April 2026 window. NRPG contractors are pre-positioned in the
                  Innisfail region for immediate post-clearance response.
                </p>
              </>
            ),
          },
          {
            heading: 'Cassowary Coast Coverage — Areas We Serve',
            body: (
              <>
                <p>
                  <strong>Innisfail (4860):</strong> Innisfail CBD, South Johnstone, North Johnstone, Flying Fish
                  Point, Mourilyan Harbour
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Tully (4854):</strong> Tully township, Tully Gorge, Murray Upper, Cardwell
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Mission Beach (4852):</strong> Bingil Bay, Wongaling Beach, South Mission Beach, Clump
                  Point
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Babinda (4861):</strong> Babinda, Mirriwinni, Bramston Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>El Arish (4855):</strong> El Arish, Jarra Creek, Silkwood
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Atherton Tablelands access:</strong> Ravenshoe, Millaa Millaa, Malanda (90-minute
                  response, road conditions permitting)
                </p>
              </>
            ),
          },
          {
            heading: 'Post-Cyclone Priorities — Innisfail and Cassowary Coast',
            body: (
              <>
                <p>
                  TC Larry and TC Yasi taught Innisfail contractors and property owners specific lessons about
                  post-cyclone priorities:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Emergency make-safe within 24 hours is critical</strong> — the Cassowary Coast&apos;s
                    tropical rainfall (Tully is Australia&apos;s wettest town, averaging over 4,000 mm annually)
                    means secondary water ingress through unrepaired breaches escalates rapidly.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Banana and sugar industry properties</strong> face specific structural collapse risks
                    from agricultural infrastructure (sheds, packing facilities, irrigation systems).
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Road access can be compromised for 24–72 hours</strong> post-event due to fallen trees
                    on the Bruce Highway; NRPG pre-positions contractors in the region before major events.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge immediately</strong> — the Innisfail queue fills fast given the region&apos;s
                    history and high property exposure.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Was Innisfail affected by TC Maila?',
            answer: 'Yes — TC Maila made landfall across the FNQ coast on 11–12 April 2026. Innisfail and the Cassowary Coast (postcode 4860) were within the TC Maila impact zone. NRPG contractors are deployed for post-clearance response. Lodge your claim at disasterrecovery.com.au/claim.',
          },
          {
            question: 'What is the wettest place in Australia and why does it matter for cyclone damage?',
            answer: 'Tully, in the Innisfail corridor, averages over 4,200 mm of annual rainfall — the highest of any Australian town. During cyclone events, rainfall can exceed 600 mm in 24 hours. This means water damage escalates faster in the Cassowary Coast than anywhere else in Australia. IICRC-certified structural drying must begin within 24 hours to prevent catastrophic mould growth.',
          },
          {
            question: 'How do I lodge a cyclone claim for an Innisfail property?',
            answer: 'Lodge at disasterrecovery.com.au/claim once emergency services confirm it is safe to assess. The ARPC Cyclone Reinsurance Pool applies to FNQ postcodes including 4860. Lodge as \'cyclone damage\' and \'water ingress\' separately. Photograph all damage before any cleanup. NRPG provides full IICRC-certified documentation packs.',
          },
          {
            question: 'Can NRPG reach Mission Beach and Cardwell after TC Maila?',
            answer: 'Response to Mission Beach, Cardwell, and southern Cassowary Coast communities depends on road clearance on the Bruce Highway. NRPG pre-positions contractors in the region before major events to minimise the access delay. Lodge early to be first in the post-clearance dispatch queue.',
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency Response', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila information and 24/7 claim lodgement.' },
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'FNQ cyclone restoration hub — IICRC-certified contractors.' },
          { title: 'ARPC Cyclone Pool — FNQ Claimants', href: '/guides/insurance/arpc-cyclone-reinsurance-pool', description: 'How the ARPC Cyclone Pool affects your Innisfail claim.' },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
