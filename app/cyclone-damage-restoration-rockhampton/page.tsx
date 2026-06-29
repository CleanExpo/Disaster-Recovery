import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Rockhampton | ARPC Pool Boundary Zone',
  description: 'Cyclone damage restoration in Rockhampton and Central Queensland. On the Tropic of Capricorn — in the ARPC Cyclone Reinsurance Pool zone. TC Maila CQ response. IICRC-certified contractors. Lodge your claim 24/7.',
  keywords: 'cyclone damage restoration rockhampton, storm damage rockhampton, TC Maila rockhampton, central queensland cyclone, rockhampton flood damage, cyclone insurance rockhampton CQ',
  openGraph: {
    title: 'Cyclone Damage Restoration Rockhampton | ARPC Pool Boundary Zone',
    description: 'Cyclone damage restoration in Rockhampton and Central Queensland. On the Tropic of Capricorn — in the ARPC Cyclone Reinsurance Pool zone. TC Maila CQ response. IICRC-certified contractors. Lodge your claim 24/7.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-rockhampton`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-rockhampton/#localbusiness`,
  name: `${NAP.name} Rockhampton`,
  url: `${NAP.url}/cyclone-damage-restoration-rockhampton`,
  description: 'IICRC-certified cyclone damage restoration in Rockhampton and Central Queensland. Rockhampton sits on the Tropic of Capricorn — within the ARPC Cyclone Pool zone. TC Maila CQ response available.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Rockhampton', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Rockhampton', addressRegion: 'QLD', postalCode: '4700', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration Rockhampton',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Rockhampton' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Professional cyclone damage restoration in Rockhampton and Central Queensland: emergency make-safe, roof tarping, structural drying, water extraction, and ARPC-compliant insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Rockhampton in the ARPC Cyclone Pool zone?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 Rockhampton sits on the Tropic of Capricorn, which is within the ARPC Cyclone Reinsurance Pool geographic coverage zone. For TC Maila-related events, lodge your claim as cyclone damage and water ingress (not flood or storm) to ensure correct pool classification. NRPG provides full ARPC-compliant documentation packs for Rockhampton homeowners.' },
    },
    {
      '@type': 'Question',
      name: 'Did TC Maila affect Rockhampton?',
      acceptedAnswer: { '@type': 'Answer', text: "TC Maila\u2019s southern projection includes the Rockhampton corridor for the 13\u201316 April 2026 window. Even if TC Maila passes north of direct Rockhampton impact, the system will generate strong wind and rain bands extending well south of the eye. Rockhampton and Capricorn Coast properties should prepare for cyclone-force wind gusts and heavy rainfall regardless of the exact track." },
    },
    {
      '@type': 'Question',
      name: 'How does flood risk interact with cyclone damage in Rockhampton?',
      acceptedAnswer: { '@type': 'Answer', text: 'Fitzroy River flooding is a significant secondary risk during cyclone events in Rockhampton \u2014 it is a separate peril from cyclone wind damage. The 2011 Rockhampton floods were partially cyclone-driven. It is important to document wind damage and flooding separately for insurance purposes: cyclone wind damage is processed under the ARPC pool, while flood damage is assessed under your flood provision. NRPG documents both perils separately in our claims packs.' },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG reach Rockhampton?',
      acceptedAnswer: { '@type': 'Answer', text: 'NRPG targets a priority response for Rocky metro properties. Capricorn Coast (Yeppoon, Emu Park) is approximately 60 minutes. Gladstone is approximately 90 minutes. Emerald requires coordinated response with a 3-hour lead time. Lodge at disasterrecovery.com.au/claim immediately after the all-clear to secure your position in the response queue.' },
    },
  ],
};

export default function CycloneDamageRestorationRockhamptonPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="cdrrck-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="cdrrck-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="cdrrck-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Rockhampton"
        subtitle="IICRC-certified cyclone damage restoration in Rockhampton and Central Queensland. Rockhampton sits on the Tropic of Capricorn \u2014 within the ARPC Cyclone Pool zone. TC Maila CQ response available. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Rockhampton' },
        ]}
        sections={[
          {
            heading: 'Rockhampton \u2014 On the Boundary of Cyclone Australia',
            body: (
              <>
                <p>
                  Rockhampton (postcode 4700) sits precisely on the Tropic of Capricorn at 23.4&deg; south latitude
                  &mdash; the exact geographic boundary that defines cyclone versus non-cyclone Australia. Properties in
                  and around Rockhampton are within the ARPC Cyclone Reinsurance Pool zone.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Marcia (2015) made landfall near Shoalwater Bay, north of Rockhampton, generating Category 5
                  conditions and causing significant structural damage across the region. TC Maila (April 2026)
                  has impacted the Far North Queensland coast — outer rain bands from such systems can extend
                  well south of the eye into the Rockhampton corridor. For current warning status, refer to bom.gov.au.
                </p>
              </>
            ),
          },
          {
            heading: 'Central Queensland Coverage',
            body: (
              <>
                <p>
                  <strong>Rocky/City (4700&ndash;4702):</strong> Rockhampton CBD, North Rockhampton, Berserker,
                  Frenchville, The Range, Wandal, Parkhurst
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Park Avenue, Gracemere, Allenstown, Depot Hill, The Common
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Capricorn Coast:</strong> Yeppoon, Emu Park, Keppel Sands, Rosslyn Bay (60-min)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Corridor:</strong> Gracemere, Etna Creek, Kabra, The Caves
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Gladstone (4680):</strong> Gladstone, Barney Point, South Gladstone, Boyne Island (90-min)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Emerald (4720):</strong> Coordinated response, 3-hour lead time
                </p>
              </>
            ),
          },
          {
            heading: 'ARPC Cyclone Pool \u2014 Rockhampton Homeowners',
            body: (
              <>
                <p>
                  Rockhampton properties within postcode 4700&ndash;4702 are within the ARPC Cyclone Pool geographic
                  coverage zone. Lodge as cyclone damage and water ingress (not flood or storm) for TC Maila-related
                  events. The pool applies regardless of the exact intensity at landfall &mdash; if BOM designates a
                  tropical cyclone as the cause of damage, the pool provisions apply.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG provides full ARPC-compliant documentation packs for Rockhampton and Central Queensland
                  properties. Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate
                  IICRC-certified contractor dispatch.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Rockhampton in the ARPC Cyclone Pool zone?',
            answer: 'Yes — Rockhampton sits on the Tropic of Capricorn, which is within the ARPC Cyclone Reinsurance Pool geographic coverage zone. For TC Maila-related events, lodge your claim as cyclone damage and water ingress (not flood or storm) to ensure correct pool classification. NRPG provides full ARPC-compliant documentation packs for Rockhampton homeowners.',
          },
          {
            question: 'Did TC Maila affect Rockhampton?',
            answer: "TC Maila (April 2026) has impacted the Far North Queensland coast. Cyclone outer rain bands can extend well south of the eye — Rockhampton and Capricorn Coast properties may experience strong wind gusts and heavy rainfall. For current warning status, refer to bom.gov.au. Lodge any TC Maila-related claims at disasterrecovery.com.au/claim.",
          },
          {
            question: 'How does flood risk interact with cyclone damage in Rockhampton?',
            answer: 'Fitzroy River flooding is a significant secondary risk during cyclone events in Rockhampton — it is a separate peril from cyclone wind damage. The 2011 Rockhampton floods were partially cyclone-driven. It is important to document wind damage and flooding separately for insurance purposes: cyclone wind damage is processed under the ARPC pool, while flood damage is assessed under your flood provision. NRPG documents both perils separately in our claims packs.',
          },
          {
            question: 'How quickly can NRPG reach Rockhampton?',
            answer: 'NRPG targets a priority response for Rocky metro properties. Capricorn Coast (Yeppoon, Emu Park) is approximately 60 minutes. Gladstone is approximately 90 minutes. Emerald requires coordinated response with a 3-hour lead time. Lodge at disasterrecovery.com.au/claim immediately after the all-clear to secure your position in the response queue.',
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency Response', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila response and 24/7 claim lodgement.' },
          { title: 'Cyclone Damage Restoration Mackay', href: '/cyclone-damage-restoration-mackay', description: 'Cyclone restoration across Mackay and the Whitsundays.' },
          { title: 'ARPC Cyclone Reinsurance Pool', href: '/guides/insurance/arpc-cyclone-reinsurance-pool', description: 'What the ARPC Cyclone Pool covers and how to lodge correctly.' },
        ]}
        cta={{ text: 'Lodge Your Claim Now', href: '/claim' }}
      />
    </>
  );
}
