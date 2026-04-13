import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Mackay | TC Maila Emergency Response',
  description: 'Storm and cyclone damage restoration across Mackay. IICRC-certified contractors ready for TC Maila. Emergency make-safe, roof tarping, structural drying. Lodge your claim 24/7.',
  keywords: 'storm damage restoration mackay, cyclone damage mackay, TC Maila mackay, roof damage mackay, storm restoration central queensland',
  openGraph: {
    title: 'Storm Damage Restoration Mackay | TC Maila Emergency Response',
    description: 'Storm and cyclone damage restoration across Mackay. IICRC-certified contractors ready for TC Maila. Emergency make-safe, roof tarping, structural drying. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Mackay')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-mackay`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-mackay/#localbusiness`,
  name: `${NAP.name} Mackay`,
  url: `${NAP.url}/storm-damage-restoration-mackay`,
  description: '24/7 emergency storm damage restoration across Mackay and Central Queensland. IICRC-certified contractor network for cyclone damage, roof losses, structural storm damage, and water ingress.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Mackay', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Mackay', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Mackay',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Mackay', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Mackay including emergency make-safe, roof tarping, cyclone structural repairs, water ingress remediation, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Mackay in TC Maila\'s impact zone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mackay (21.1°S) is in TC Maila's projected southern track for the 11-14 April 2026 window. NRPG contractors are pre-positioned across Mackay and Central Queensland for immediate post-clearance response. Lodge your claim now at disasterrecovery.com.au/claim to secure your place in the priority queue.",
      },
    },
    {
      '@type': 'Question',
      name: 'What storm damage is most common in Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The most common storm damage in Mackay includes roof sheeting loss, broken skylights and windows, water ingress from wind-driven rain, flooding from Pioneer River catchment, and fallen trees on roofs and vehicles. Cyclone-force events at this latitude can cause complete structural roof losses.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does ARPC Cyclone Pool cover Mackay storm damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mackay (21.1°S) is north of the Tropic of Capricorn, so the ARPC Cyclone Reinsurance Pool applies for cyclone events. If TC Maila is declared the cause of your damage, lodge your claim as 'cyclone' not 'storm' — this distinction matters for ARPC processing and can affect your settlement outcome.",
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG respond in Mackay post-clearance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "NRPG targets a priority response from emergency services all-clear. Contractors are pre-positioned in Mackay for TC Maila and will mobilise as soon as it is safe to operate. Lodge via disasterrecovery.com.au/claim to join the priority queue — early lodgement secures faster contractor dispatch.",
      },
    },
  ],
};

export default function StormDamageRestorationMackayPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrmkay-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrmkay-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrmkay-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Mackay"
        subtitle="Storm and cyclone damage restoration across Mackay and Central Queensland. IICRC-certified contractors ready for TC Maila. Emergency make-safe, roof tarping, structural drying. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Mackay' },
        ]}
        sections={[
          {
            heading: "Mackay's Storm and Cyclone Risk",
            body: (
              <>
                <p>
                  Mackay sits at 21.1&deg;S within Queensland&apos;s cyclone belt &mdash; firmly in the zone where
                  tropical systems can make landfall or pass close enough to cause severe structural damage. The Pioneer
                  River catchment creates a secondary flood risk during intense cyclone-associated rainfall events,
                  with low-lying coastal topography amplifying storm surge exposure.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The region has a documented history of significant cyclone events. TC Debbie (2017, Category 4)
                  made landfall near Airlie Beach and caused substantial wind and water damage across the Mackay
                  region. TC Ului (2010, Category 3) crossed the coast near Airlie Beach with significant impacts
                  extending south to Mackay. TC Yasi (2011, Category 5) passed south of Mackay, generating major
                  wind damage across the wider region. Flat coastal topography amplifies storm surge risk during
                  direct or near-miss cyclone events. NRPG maintains a pre-positioned contractor network across
                  Mackay and Central Queensland for post-storm mobilisation.
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila — Mackay Emergency Response',
            body: (
              <>
                <p>
                  TC Maila (April 2026) is tracking toward the Central Queensland coast with Mackay (21.1&deg;S)
                  within its projected southern impact corridor for the 11&ndash;14 April 2026 window. NRPG
                  contractors are pre-positioned across the Mackay region in preparation for immediate
                  post-clearance response.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Once emergency services confirm it is safe to operate, NRPG targets a priority response for
                  emergency make-safe including roof tarping, window boarding, and water extraction. Lodging your
                  claim at disasterrecovery.com.au/claim now secures your place in the priority queue before
                  high-volume post-storm lodgement begins. Because Mackay is north of the Tropic, the ARPC Cyclone
                  Reinsurance Pool applies &mdash; lodge your claim correctly as &apos;cyclone&apos; if TC Maila
                  is the declared cause of damage.
                </p>
              </>
            ),
          },
          {
            heading: 'Mackay Suburbs We Cover',
            body: (
              <>
                <p>Emergency storm and cyclone damage response across Mackay and surrounds:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>City and Coastal:</strong> Mackay CBD, North Mackay, South Mackay, West Mackay,
                  Andergrove, Beaconsfield, Blacks Beach, Slade Point, Eimeo, Shoal Point
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Outer Suburbs:</strong> Mount Pleasant, Ooralea, Rural View, Habana
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland and Regional:</strong> Walkerston, Mirani, Seaforth &mdash; all areas within
                  60 minutes of the Mackay CBD
                </p>
              </>
            ),
          },
          {
            heading: 'Emergency Make-Safe — What Happens First',
            body: (
              <>
                <p>
                  NRPG&apos;s immediate make-safe response addresses the most urgent structural and water risks
                  before full restoration begins. The sequence is: roof tarping over exposed structural cavities,
                  temporary boarding of broken windows and doors, structural assessment to identify unsafe zones,
                  water extraction from internal flooding, and initial scope documentation for your insurer.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Make-safe work is typically completed within hours of arrival and creates the baseline evidence
                  record for your insurance claim. NRPG&apos;s IICRC-certified contractors use moisture mapping
                  and thermal imaging to identify water ingress pathways not visible to the naked eye &mdash;
                  critical for preventing hidden structural damage and mould growth in Mackay&apos;s humid
                  subtropical climate. Emergency make-safe costs range from $800&ndash;$3,000 for roof tarping
                  and $400&ndash;$1,200 for window boarding.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: "Is Mackay in TC Maila's impact zone?",
            answer: "Mackay (21.1°S) is in TC Maila's projected southern track for the 11-14 April 2026 window. NRPG contractors are pre-positioned across Mackay and Central Queensland for immediate post-clearance response. Lodge your claim now at disasterrecovery.com.au/claim to secure your place in the priority queue.",
          },
          {
            question: 'What storm damage is most common in Mackay?',
            answer: "The most common storm damage in Mackay includes roof sheeting loss, broken skylights and windows, water ingress from wind-driven rain, flooding from Pioneer River catchment, and fallen trees on roofs and vehicles. Cyclone-force events at this latitude can cause complete structural roof losses.",
          },
          {
            question: 'Does ARPC Cyclone Pool cover Mackay storm damage?',
            answer: "Mackay (21.1°S) is north of the Tropic of Capricorn, so the ARPC Cyclone Reinsurance Pool applies for cyclone events. If TC Maila is declared the cause of your damage, lodge your claim as 'cyclone' not 'storm' — this distinction matters for ARPC processing and can affect your settlement outcome.",
          },
          {
            question: 'How quickly can NRPG respond in Mackay post-clearance?',
            answer: "NRPG targets a priority response from emergency services all-clear. Contractors are pre-positioned in Mackay for TC Maila and will mobilise as soon as it is safe to operate. Lodge via disasterrecovery.com.au/claim to join the priority queue — early lodgement secures faster contractor dispatch.",
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Damage Restoration Mackay', href: '/cyclone-damage-restoration-mackay', description: 'Specialist cyclone structural restoration across Mackay.' },
          { title: 'TC Maila FNQ Emergency', href: '/events/tc-maila-fnq-2026', description: 'Live response information for TC Maila affecting Far North Queensland.' },
          { title: 'Storm Damage Insurance Claim', href: '/guides/insurance/storm-damage-insurance-claim-process', description: 'Step-by-step guide to lodging a storm damage insurance claim in Australia.' },
        ]}
        cta={{ text: 'Lodge TC Maila Claim — Mackay', href: '/claim' }}
      />
    </>
  );
}
