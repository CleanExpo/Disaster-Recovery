import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-480: Cyclone Damage Restoration Mackay
 * TC Maila impact zone — Mackay, Whitsundays, Central Queensland coast
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Mackay | TC Maila NQ Response',
  description: 'Cyclone damage restoration in Mackay and the Whitsundays. IICRC-certified contractors for TC Maila response. Emergency make-safe, roof tarping, structural drying. Lodge your claim 24/7.',
  keywords: 'cyclone damage restoration mackay, cyclone damage mackay, TC Maila mackay, whitsundays cyclone damage, storm damage mackay, cyclone insurance mackay NQ',
  openGraph: {
    title: 'Cyclone Damage Restoration Mackay | TC Maila NQ Response',
    description: 'IICRC-certified cyclone restoration contractors in Mackay and the Whitsundays. Emergency make-safe and structural restoration. Lodge your claim 24/7.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-mackay`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-mackay/#localbusiness`,
  name: `${NAP.name} Mackay`,
  url: `${NAP.url}/cyclone-damage-restoration-mackay`,
  description: 'IICRC-certified cyclone damage restoration in Mackay and the Whitsundays. Emergency response for TC Maila structural damage, water damage, and roof repairs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Mackay', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Mackay', addressRegion: 'QLD', postalCode: '4740', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration Mackay',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Mackay' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Professional cyclone damage restoration in Mackay and the Whitsundays: emergency make-safe, roof tarping, structural drying, water extraction, and insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was Mackay affected by TC Maila?',
      acceptedAnswer: { '@type': 'Answer', text: "TC Maila made landfall across the FNQ coast on 11\u201312 April 2026. Outer bands and associated weather systems affected the Mackay and Whitsundays corridor. If your Mackay or Whitsundays property sustained damage from TC Maila, lodge at disasterrecovery.com.au/claim for IICRC-certified post-clearance response." },
    },
    {
      '@type': 'Question',
      name: 'How does the ARPC Cyclone Pool apply to Mackay?',
      acceptedAnswer: { '@type': 'Answer', text: "Properties in Mackay and the Whitsundays are covered under the ARPC Cyclone Reinsurance Pool for standard home and small business policies. Lodge as \u2018cyclone damage\u2019 and \u2018water ingress\u2019 to ensure correct pool classification. NRPG provides full claims documentation packs for ARPC pool lodgement." },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG reach Whitsunday Island properties?',
      acceptedAnswer: { '@type': 'Answer', text: 'Response to Whitsunday Island properties is coordinated via marine transport (Shute Harbour or Abel Point Marina) post-clearance. Lodge your claim early \u2014 island response requires additional logistics coordination and is sequenced after mainland clearance is confirmed.' },
    },
    {
      '@type': 'Question',
      name: 'What should Mackay homeowners do after TC Maila?',
      acceptedAnswer: { '@type': 'Answer', text: 'Wait for emergency services to confirm the all-clear before inspecting your property. Photograph all damage before touching anything \u2014 timestamped images are required for your insurance claim. Lodge at disasterrecovery.com.au/claim for immediate IICRC-certified contractor dispatch once the all-clear is issued for your suburb.' },
    },
  ],
};

export default function CycloneDamageRestorationMackayPage() {
  return (
    <>
      <Script id="cdrm-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="cdrm-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="cdrm-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Mackay"
        subtitle="IICRC-certified contractors for TC Maila response across Mackay, the Whitsundays, and Central Queensland coast. Emergency make-safe and structural restoration. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Mackay' },
        ]}
        sections={[
          {
            heading: "Mackay's Cyclone History and TC Maila Risk",
            body: (
              <>
                <p>
                  Mackay sits at 21° south latitude, within Queensland&apos;s primary cyclone belt. The city has
                  experienced major cyclone impacts from TC Ada (1970), TC Joy (1990), and received significant
                  impacts from TC Debbie (2017), which made landfall near Airlie Beach and caused extensive damage
                  across the Whitsunday and Mackay regions.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila made landfall across the FNQ coast on 11–12 April 2026. Outer bands and associated
                  weather affected the Mackay and Whitsundays corridor. NRPG contractors are available for
                  post-clearance response across Mackay and the Whitsundays.
                </p>
              </>
            ),
          },
          {
            heading: 'Mackay and Whitsundays Coverage',
            body: (
              <>
                <p>
                  <strong>Mackay (4740–4741):</strong> Mackay City, North Mackay, West Mackay, South Mackay, East
                  Mackay, Andergrove, Rural View, Beaconsfield, Blacks Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Whitsundays (4802):</strong> Airlie Beach, Cannonvale, Proserpine, Shute Harbour, Bowen
                  (4805)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Sarina (4737), Marian (4753), Mirani (4754), Finch Hatton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Offshore:</strong> Whitsunday Islands — response coordinated via marine transport
                  post-clearance
                </p>
              </>
            ),
          },
          {
            heading: 'Industrial and Commercial Cyclone Damage — Mackay',
            body: (
              <>
                <p>
                  Mackay&apos;s sugar, coal, and port infrastructure creates specific commercial cyclone restoration
                  requirements beyond residential scope: large-span industrial sheds, port facilities, and
                  agricultural processing plant. NRPG coordinates multi-trade commercial restoration for industrial
                  losses, with project management for combined structural, water, and equipment damage claims.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  For residential properties, the same IICRC-certified make-safe and water extraction process
                  applies as across all FNQ and NQ coverage zones.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Was Mackay affected by TC Maila?',
            answer: 'TC Maila made landfall across the FNQ coast on 11–12 April 2026. Outer bands and associated weather systems affected the Mackay and Whitsundays corridor. If your Mackay or Whitsundays property sustained damage, lodge at disasterrecovery.com.au/claim for IICRC-certified post-clearance response.',
          },
          {
            question: 'How does the ARPC Cyclone Pool apply to Mackay?',
            answer: 'Properties in Mackay and the Whitsundays are covered under the ARPC Cyclone Reinsurance Pool for standard home and small business policies. Lodge as \'cyclone damage\' and \'water ingress\' to ensure correct pool classification. NRPG provides full claims documentation packs for ARPC pool lodgement.',
          },
          {
            question: 'Can NRPG reach Whitsunday Island properties?',
            answer: 'Response to Whitsunday Island properties is coordinated via marine transport (Shute Harbour or Abel Point Marina) post-clearance. Lodge your claim early — island response requires additional logistics coordination and is sequenced after mainland clearance is confirmed.',
          },
          {
            question: 'What should Mackay homeowners do after TC Maila?',
            answer: 'Wait for emergency services to confirm the all-clear before inspecting your property. Photograph all damage before touching anything — timestamped images are required for your insurance claim. Lodge at disasterrecovery.com.au/claim for immediate IICRC-certified contractor dispatch once the all-clear is issued for your suburb.',
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency Response', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila response and 24/7 claim lodgement.' },
          { title: 'Cyclone Damage Restoration Townsville', href: '/cyclone-damage-restoration-townsville', description: 'Townsville NQ cyclone restoration — IICRC-certified contractors.' },
          { title: 'Commercial Cyclone Damage Restoration', href: '/commercial-cyclone-damage-restoration', description: 'Commercial, strata, and industrial cyclone damage restoration.' },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
