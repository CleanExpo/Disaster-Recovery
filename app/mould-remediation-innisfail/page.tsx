import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-481: Mould Remediation Innisfail
 *
 * Created: 9 April 2026
 * Context: Innisfail is the most cyclone-struck town in Australia. TC Maila
 * (April 2026) has impacted the Far North Queensland coast including the
 * Innisfail corridor. Wet Tropics climate (2,500-3,000mm annual rainfall,
 * 28-32°C, 80%+ humidity year-round) means mould establishes within 24 hours
 * of water intrusion. High proportion of fibro/asbestos-cement housing stock
 * requires specialist handling. ARPC Cyclone Pool applies.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Innisfail | TC Maila Post-Cyclone Specialists',
  description:
    'IICRC-certified mould remediation in Innisfail and the Cassowary Coast. TC Maila post-cyclone mould specialists. In the Wet Tropics, mould establishes within 24 hours. Fibro and asbestos-risk properties handled. Lodge your claim 24/7.',
  keywords:
    'mould remediation innisfail, mould after cyclone innisfail, TC Maila mould innisfail, post cyclone mould cassowary coast, mould remediation far north queensland',
  openGraph: {
    title: 'Mould Remediation Innisfail | TC Maila Post-Cyclone Specialists',
    description:
      'IICRC-certified mould remediation in Innisfail and the Cassowary Coast. TC Maila post-cyclone mould specialists. In the Wet Tropics, mould establishes within 24 hours. Fibro and asbestos-risk properties handled. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Innisfail&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-innisfail`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-innisfail/#localbusiness`,
  name: `${NAP.name} Innisfail`,
  url: `${NAP.url}/mould-remediation-innisfail`,
  description:
    'IICRC S520-certified mould remediation contractors serving Innisfail and the Cassowary Coast. TC Maila post-cyclone mould specialists. Fibro and asbestos-risk construction specialists. Full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Innisfail',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Innisfail',
    addressRegion: 'QLD',
    postalCode: '4860',
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
  name: 'Mould Remediation Innisfail',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Innisfail' },
  serviceType: 'Mould Remediation',
  description:
    'IICRC S520-certified mould remediation across Innisfail and the Cassowary Coast. Post-TC Maila cyclone mould specialists. Fibro wall and asbestos-risk assessment, thermal imaging moisture mapping, HEPA air scrubbing, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does mould grow after a cyclone in Innisfail?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Innisfail\u2019s Wet Tropics climate \u2014 2,500\u20133,000mm annual rainfall, 28\u201332\u00b0C temperatures, and 80%+ humidity year-round \u2014 mould can establish within 24 hours of water intrusion. Post-TC Maila, humidity during the recovery period will exceed 85%, further compressing this timeline. Act immediately once the all-clear is given.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Innisfail property has asbestos in the mould-affected areas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Properties built before 1990 in Innisfail have a high likelihood of containing asbestos-cement (fibro) sheeting in walls, ceilings, eaves, or roofing. You cannot identify asbestos by sight alone. Do not sand, drill, or disturb any fibro sheeting without a licensed asbestos assessor confirming it is safe. NRPG contractors can coordinate a licensed assessor before remediation proceeds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool cover mould remediation after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Innisfail (postcode 4860) falls within the ARPC Cyclone Reinsurance Pool catchment for North Queensland. Mould caused directly by TC Maila water ingress should be lodged as part of your cyclone damage claim. Request IICRC S520 scope documentation for mould from your remediation contractor. Insurer disputes can be escalated to AFCA with NRPG documentation support.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost in Innisfail after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs depend on the extent of water intrusion and building materials. Indicative 2026 estimates: Cat 1 residential mould $3,000\u2013$12,000; Cat 2 post-cyclone mould $8,000\u2013$40,000; whole-house post-inundation $15,000\u2013$80,000+. Fibro properties requiring asbestos assessment will incur additional costs. NRPG provides full IICRC S520 scope documentation for insurance claims.',
      },
    },
  ],
};

export default function MouldRemediationInnisfailPage() {
  return (
    <>
      <Script
        id="mrinni-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrinni-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrinni-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Innisfail"
        subtitle="IICRC S520-certified mould remediation across Innisfail and the Cassowary Coast. TC Maila post-cyclone mould specialists. In the Wet Tropics, mould establishes within 24 hours of water intrusion — act immediately."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Innisfail' },
        ]}
        sections={[
          {
            heading: "TC Maila Mould Risk \u2014 Innisfail\u2019s 24-Hour Window",
            body: (
              <>
                <p>
                  Innisfail is known as Australia&apos;s most cyclone-struck town. TC Larry (2006,
                  Category 4) caused catastrophic damage across the Cassowary Coast and recovery took
                  years &mdash; leaving many properties in incomplete restoration when TC Yasi (2011,
                  Category 5) struck again. TC Maila (April 2026) has since impacted the Far North
                  Queensland coast including the Innisfail corridor.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Innisfail&apos;s Wet Tropics climate makes post-cyclone mould uniquely dangerous.
                  With 2,500&ndash;3,000mm of annual rainfall, year-round temperatures of
                  28&ndash;32&deg;C, and humidity consistently above 80%, mould can establish on wet
                  materials within 24 hours of water intrusion &mdash; faster than in any other
                  Australian city or region. Properties still completing TC Larry or TC Yasi
                  restorations face compounded risk. NRPG IICRC S520-certified contractors are
                  pre-positioned across the Innisfail LGA and Cassowary Coast for immediate
                  post-clearance response.
                </p>
              </>
            ),
          },
          {
            heading: 'Fibro Housing and Asbestos Concerns in Post-Cyclone Mould',
            body: (
              <>
                <p>
                  Innisfail has a high proportion of fibrous cement (fibro) and asbestos-cement
                  housing stock, particularly in the older residential areas of Innisfail CBD, South
                  Innisfail, and surrounding rural properties. Fibro sheeting absorbs water readily
                  and can harbour mould at the substrate level that is not visible from the surface.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Critically, asbestos-containing materials must not be sanded, drilled, cut, or
                  disturbed without specialist assessment. Post-cyclone mould remediation that
                  involves disturbing fibro without asbestos clearance creates a serious health risk
                  and may void insurance coverage. NRPG contractors identify asbestos-risk materials
                  before any work proceeds and coordinate licensed asbestos assessors where required.
                  For rural banana and cane farming properties with limited post-cyclone access,
                  NRPG manages logistics across the broader Cassowary Coast.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost Estimates \u2014 Innisfail 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cat 1 residential mould (contained, single area):</strong>{' '}
                    $3,000&ndash;$12,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cat 2 post-cyclone mould (wind-driven rain, multiple areas):</strong>{' '}
                    $8,000&ndash;$40,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Fibro wall mould with asbestos assessment:</strong> add $1,500&ndash;$4,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Whole-house post-inundation remediation:</strong> $15,000&ndash;$80,000+
                  </li>
                </ul>
                <p style={{ marginTop: '0.75rem' }}>
                  All costs include IICRC S520-compliant scope documentation for ARPC Cyclone Pool
                  insurance claims. Rural and limited-access properties may attract additional
                  mobilisation costs.
                </p>
              </>
            ),
          },
          {
            heading: 'Innisfail and Cassowary Coast Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  24-hour response across Innisfail and the Cassowary Coast:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Innisfail:</strong> Innisfail CBD, South Innisfail, East Innisfail,
                  Innisfail Estate, Mourilyan
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>North of Innisfail:</strong> Babinda, Gordonvale, Mirriwinni
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>South of Innisfail:</strong> Silkwood, El Arish, Tully, Mission Beach,
                  Bingil Bay, Cardwell
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Rural and remote:</strong> Banana and cane farming properties across the
                  Cassowary Coast &mdash; logistics managed for limited-access post-cyclone sites
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly does mould grow after a cyclone in Innisfail?',
            answer:
              "In Innisfail\u2019s Wet Tropics climate \u2014 2,500\u20133,000mm annual rainfall, 28\u201332\u00b0C temperatures, and 80%+ humidity year-round \u2014 mould can establish within 24 hours of water intrusion. Post-TC Maila, humidity during the recovery period will exceed 85%, further compressing this timeline. Act immediately once the all-clear is given.",
          },
          {
            question: 'How do I know if my Innisfail property has asbestos in the mould-affected areas?',
            answer:
              'Properties built before 1990 in Innisfail have a high likelihood of containing asbestos-cement (fibro) sheeting in walls, ceilings, eaves, or roofing. You cannot identify asbestos by sight alone. Do not sand, drill, or disturb any fibro sheeting without a licensed asbestos assessor confirming it is safe. NRPG contractors can coordinate a licensed assessor before remediation proceeds.',
          },
          {
            question: 'Does the ARPC Cyclone Pool cover mould remediation after TC Maila?',
            answer:
              'Innisfail (postcode 4860) falls within the ARPC Cyclone Reinsurance Pool catchment for North Queensland. Mould caused directly by TC Maila water ingress should be lodged as part of your cyclone damage claim. Request IICRC S520 scope documentation for mould from your remediation contractor. Insurer disputes can be escalated to AFCA with NRPG documentation support.',
          },
          {
            question: 'How much does mould remediation cost in Innisfail after TC Maila?',
            answer:
              'Costs depend on the extent of water intrusion and building materials. Indicative 2026 estimates: Cat 1 residential mould $3,000\u2013$12,000; Cat 2 post-cyclone mould $8,000\u2013$40,000; whole-house post-inundation $15,000\u2013$80,000+. Fibro properties requiring asbestos assessment will incur additional costs. NRPG provides full IICRC S520 scope documentation for insurance claims.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila FNQ Emergency \u2014 Lodge Your Claim',
            href: '/events/tc-maila-fnq-2026',
            description: 'Emergency claim lodgement and recovery support for TC Maila across Far North Queensland.',
          },
          {
            title: 'Cyclone Damage Restoration Innisfail',
            href: '/cyclone-damage-restoration-innisfail',
            description: 'Emergency cyclone damage restoration across Innisfail and the Cassowary Coast.',
          },
          {
            title: 'Mould Remediation Cairns',
            href: '/mould-remediation-cairns',
            description: 'IICRC-certified mould remediation across Cairns and Far North Queensland.',
          },
          {
            title: 'ARPC Cyclone Reinsurance Pool Guide',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description: 'How the ARPC Cyclone Pool works for North Queensland property owners.',
          },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
