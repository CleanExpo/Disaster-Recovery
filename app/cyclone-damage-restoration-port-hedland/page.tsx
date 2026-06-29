import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR: Cyclone Damage Restoration Port Hedland
 * Pilbara cyclone response — ARPC pool, TC Orson history, TC Veronica stall event
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Port Hedland | Pilbara Emergency Response',
  description:
    'Cyclone damage restoration in Port Hedland and the Pilbara. IICRC-certified contractors for the world\'s largest bulk export port. ARPC covered. Lodge 24/7.',
  keywords:
    'cyclone damage port hedland, pilbara cyclone restoration, port hedland cyclone, cyclone insurance port hedland, storm damage pilbara, ARPC port hedland',
  openGraph: {
    title: 'Cyclone Damage Restoration Port Hedland | Pilbara Emergency Response',
    description:
      'Cyclone damage restoration in Port Hedland and the Pilbara. IICRC-certified contractors for the world\'s largest bulk export port. ARPC covered. Lodge 24/7.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-port-hedland`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-port-hedland/#localbusiness`,
  name: `${NAP.name} Port Hedland`,
  url: `${NAP.url}/cyclone-damage-restoration-port-hedland`,
  description:
    'IICRC-certified cyclone damage restoration in Port Hedland and the Pilbara. Emergency response for TC Orson-scale events, TC Veronica-type stall flooding, residential and industrial cyclone structural damage.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'Place',
    name: 'Port Hedland',
    containedInPlace: { '@type': 'State', name: 'Western Australia' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Port Hedland',
    addressRegion: 'WA',
    postalCode: '6721',
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
  name: 'Cyclone Damage Restoration Port Hedland',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'Place', name: 'Port Hedland' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Professional cyclone damage restoration in Port Hedland and the Pilbara: emergency make-safe, roof tarping, structural drying, water extraction, corrosion assessment, and ARPC-compliant insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Port Hedland in the ARPC Cyclone Reinsurance Pool area?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 Port Hedland (20.3\u00b0S) is well north of the Tropic of Capricorn. The ARPC Cyclone Reinsurance Pool covers all residential properties in northern WA. Lodge your claim as \u2018cyclone damage\u2019 for correct ARPC pool processing through your existing insurer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How has Port Hedland been affected by cyclones historically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TC Orson (1989) made Category 5 landfall on the Pilbara coast \u2014 the most intense landfalling cyclone on the WA record. TC Veronica (2019) stalled offshore and produced approximately 900mm of rainfall, flooding Port Hedland. TC Christine (2013) and TC Narelle (2013) both caused significant Pilbara impacts, and the region has experienced multiple Category 3\u20134 events in recent decades. Port Hedland averages 2\u20133 cyclone threats per season.',
      },
    },
    {
      '@type': 'Question',
      name: "What is TC Veronica's relevance to Port Hedland flood insurance claims?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TC Veronica (2019) stalled offshore and produced catastrophic rainfall flooding. Some properties reported water damage not from direct cyclone wind but from prolonged flooding \u2014 categorisation for insurance purposes (cyclone vs flood) was disputed. NRPG documentation packages help resolve coverage disputes for similar events by clearly recording the causal chain from the cyclone event to each damage type.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG respond to cyclone damage in Port Hedland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG mobilises Pilbara-based and Perth-based contractors. Remote location and post-cyclone road conditions may add response time. Pre-event staging is arranged for major forecast events tracking toward Port Hedland. Lodge at disasterrecovery.com.au/claim to be first in the response queue.',
      },
    },
  ],
};

export default function CycloneDamageRestorationPortHedlandPage() {
  return (
    <>
      <Script
        id="cdrph-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="cdrph-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="cdrph-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Port Hedland"
        subtitle="IICRC-certified cyclone damage restoration for Port Hedland and the Pilbara. Pre-staged for TC Orson-scale events. ARPC pool covered. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Port Hedland' },
        ]}
        sections={[
          {
            heading: "Port Hedland's Cyclone Risk \u2014 Australia's Most Cyclone-Exposed Major Port",
            body: (
              <>
                <p>
                  Port Hedland (20.3&deg;S) sits well north of the Tropic of Capricorn on one of
                  Australia&apos;s most cyclone-exposed coastlines. The town is Australia&apos;s largest
                  bulk export port \u2014 handling iron ore, lithium, and other Pilbara resources \u2014
                  making it critical national infrastructure with no parallel in terms of cyclone exposure
                  at this scale.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Orson (1989) made Category 5 landfall on the Pilbara coast, representing the most
                  intense landfalling cyclone on WA record. TC Veronica (2019) took an unusual stalling
                  track offshore, producing approximately 900mm of rainfall and causing significant flooding
                  across Port Hedland. TC Christine and TC Narelle both made Pilbara impacts in 2013. Port
                  Hedland averages 2&ndash;3 cyclone threats per season, making it one of the most
                  consistently threatened communities in Australia.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  All residential properties in Port Hedland are covered under the ARPC Cyclone
                  Reinsurance Pool. Residential exposure includes East Hedland (the main residential
                  area), Port Hedland CBD, Wedgefield, Pretty Pool, Cooke Point, and South Hedland.
                </p>
              </>
            ),
          },
          {
            heading: 'Cyclone Damage Types Specific to Port Hedland',
            body: (
              <>
                <p>
                  Port Hedland&apos;s unique industrial and geographic context creates cyclone damage
                  types not commonly seen elsewhere in Australia:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Salt-laden cyclone winds:</strong> The proximity of Port Hedland to the open
                    ocean means cyclone winds carry extremely high salt concentrations. Salt spray
                    accelerates corrosion of steel structures and exposed metalwork in the hours and
                    days following a cyclone event \u2014 rapid corrosion assessment is critical for
                    Colorbond and steel-framed structures.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>TC Veronica-type stall flooding:</strong> Stalling cyclones offshore can
                    produce extreme rainfall totals without direct landfall wind damage. Properties at
                    lower elevations near the foreshore and creek systems face flooding risk from
                    extended stall events.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Dune system overtopping:</strong> Coastal properties near Port Hedland Beach
                    and the Spoilbank Marina area face dune overtopping risk during severe cyclone
                    storm surge events.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Iron ore and red dust contamination:</strong> Port Hedland&apos;s proximity
                    to bulk ore handling creates a unique Category 3 contamination risk \u2014 cyclone
                    floodwaters can mix with iron ore dust and particulate, creating contaminated
                    floodwater requiring specialist decontamination protocols beyond standard water
                    damage restoration.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Port Hedland and East Hedland \u2014 Areas We Cover',
            body: (
              <>
                <p>
                  <strong>Port Hedland CBD:</strong> Port Hedland town centre, Wedge Street precinct,
                  foreshore properties
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>East Hedland:</strong> East Hedland residential (the main residential area),
                  Pippingarra
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Coastal precincts:</strong> Pretty Pool, Cooke Point, Spoilbank Marina area,
                  Port Hedland Beach corridor
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial areas:</strong> Wedgefield (industrial estate)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>South Hedland:</strong> South Hedland residential and commercial, Boodarie
                </p>
              </>
            ),
          },
          {
            heading: 'Insurance Claims for Pilbara Properties',
            body: (
              <>
                <p>
                  Port Hedland cyclone insurance claims involve several considerations specific to remote
                  Pilbara locations:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>ARPC pool processing:</strong> All residential properties in Port Hedland
                    are within the ARPC Cyclone Reinsurance Pool coverage zone. Lodge as &apos;cyclone
                    damage&apos; to ensure correct pool routing through your insurer.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>WA DFES clearance:</strong> Do not re-enter a damaged property until DFES
                    declares the area safe. NRPG coordinates with DFES on post-cyclone access timing.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Remote location rebuild premiums:</strong> Pilbara construction costs are
                    significantly higher than metropolitan WA. Ensure your sum insured reflects current
                    Pilbara replacement costs \u2014 underinsurance is a common issue at claim time.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Mining company accommodation complexes:</strong> Residential properties
                    are ARPC-covered, but large-scale worker accommodation operated by mining companies
                    as commercial assets typically hold commercial policies outside the ARPC residential
                    pool. Separate specialist advice is required for these structures.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>AFCA for disputed claims:</strong> If your cyclone vs flood peril
                    classification is disputed (as occurred following TC Veronica 2019), the Australian
                    Financial Complaints Authority provides a free dispute resolution pathway.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Port Hedland in the ARPC Cyclone Reinsurance Pool area?',
            answer:
              'Yes \u2014 Port Hedland (20.3\u00b0S) is well north of the Tropic of Capricorn. The ARPC Cyclone Reinsurance Pool covers all residential properties in northern WA. Lodge your claim as \u2018cyclone damage\u2019 for correct ARPC pool processing through your existing insurer.',
          },
          {
            question: 'How has Port Hedland been affected by cyclones historically?',
            answer:
              'TC Orson (1989) made Category 5 landfall on the Pilbara coast \u2014 the most intense landfalling cyclone on the WA record. TC Veronica (2019) stalled offshore and produced approximately 900mm of rainfall, flooding Port Hedland. TC Christine (2013) and TC Narelle (2013) both caused significant Pilbara impacts, and the region has experienced multiple Category 3\u20134 events in recent decades. Port Hedland averages 2\u20133 cyclone threats per season.',
          },
          {
            question: "What is TC Veronica's relevance to Port Hedland flood insurance claims?",
            answer:
              'TC Veronica (2019) stalled offshore and produced catastrophic rainfall flooding. Some properties reported water damage not from direct cyclone wind but from prolonged flooding \u2014 categorisation for insurance purposes (cyclone vs flood) was disputed. NRPG documentation packages help resolve coverage disputes for similar events by clearly recording the causal chain from the cyclone event to each damage type.',
          },
          {
            question: 'How quickly can NRPG respond to cyclone damage in Port Hedland?',
            answer:
              'NRPG mobilises Pilbara-based and Perth-based contractors. Remote location and post-cyclone road conditions may add response time. Pre-event staging is arranged for major forecast events tracking toward Port Hedland. Lodge at disasterrecovery.com.au/claim to be first in the response queue.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Narelle WA Recovery',
            href: '/events/cyclone-narelle-western-australia-2026',
            description: 'Cyclone Narelle information and 24/7 claim lodgement for WA.',
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
        cta={{ text: 'Lodge Cyclone Claim \u2014 Port Hedland', href: '/claim' }}
      />
    </>
  );
}
