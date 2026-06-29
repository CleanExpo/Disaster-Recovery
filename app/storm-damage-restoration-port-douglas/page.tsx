import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-478: Storm/Cyclone Damage Restoration Port Douglas
 * TC Maila — Port Douglas/Daintree direct impact corridor
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Port Douglas | TC Maila Emergency',
  description: 'Cyclone and storm damage restoration in Port Douglas, Mossman, and the Daintree coast. IICRC-certified contractors ready for TC Maila response. Lodge your claim 24/7.',
  keywords: 'cyclone damage port douglas, storm damage port douglas, TC Maila port douglas, water damage port douglas, cyclone restoration mossman, daintree cyclone damage',
  openGraph: {
    title: 'Cyclone Damage Restoration Port Douglas | TC Maila Response',
    description: 'Emergency cyclone damage restoration for Port Douglas, Mossman, and the Daintree. IICRC-certified, priority response post-clearance.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-port-douglas`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-port-douglas/#localbusiness`,
  name: `${NAP.name} Port Douglas`,
  url: `${NAP.url}/storm-damage-restoration-port-douglas`,
  description: 'IICRC-certified cyclone and storm damage restoration in Port Douglas, Mossman, and the Daintree Coast. TC Maila emergency response ready.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Port Douglas', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Port Douglas', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration Port Douglas',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Port Douglas' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Emergency cyclone and storm damage restoration for Port Douglas, Mossman, and the Daintree: structural make-safe, water extraction, roof tarping, and insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Port Douglas in the TC Maila direct impact zone?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 Port Douglas and the Daintree Coast are in TC Maila\u2019s forecast impact corridor. BOM is projecting landfall-level conditions for postcode 4877 in the 11\u201312 April window. NRPG contractors are pre-staged in the region for immediate post-clearance response.' },
    },
    {
      '@type': 'Question',
      name: 'How do I lodge a cyclone damage claim for a Port Douglas property?',
      acceptedAnswer: { '@type': 'Answer', text: 'Lodge at disasterrecovery.com.au/claim once emergency services confirm it is safe to assess your property. Photograph all damage first. The ARPC Cyclone Pool applies to FNQ postcodes \u2014 lodge as "cyclone damage" and "water ingress" separately.' },
    },
    {
      '@type': 'Question',
      name: 'Will road closures affect response time in the Daintree?',
      acceptedAnswer: { '@type': 'Answer', text: 'Potentially yes \u2014 the Daintree River Ferry and the single highway north can be disrupted by cyclone debris. NRPG pre-positions contractors in the region before major events. Lodge your claim early to be first in the queue once access is restored.' },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover mould after tropical flooding in Port Douglas?',
      acceptedAnswer: { '@type': 'Answer', text: 'Mould arising directly from a covered cyclone or storm event is generally covered under standard policies. However, insurer-appointed assessors sometimes dispute mould coverage if they claim it resulted from delayed reporting. Lodge early and request IICRC-certified assessment to document the causal link.' },
    },
  ],
};

export default function StormDamageRestorationPortDouglasPage() {
  return (
    <>
      <Script id="sdrpd-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrpd-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrpd-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Port Douglas"
        subtitle="Emergency cyclone and storm damage restoration for Port Douglas, Mossman, Daintree, and Cape Tribulation. IICRC-certified contractors ready for TC Maila. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Port Douglas' },
        ]}
        sections={[
          {
            heading: 'Port Douglas and the Daintree — TC Maila Direct Impact Zone',
            body: (
              <>
                <p>
                  Port Douglas (postcode 4877) and the Daintree Coast sit directly in TC Maila&apos;s projected
                  track. The region&apos;s isolation — a single highway corridor connecting Port Douglas to Cairns,
                  and limited road access beyond Mossman into the Daintree — means post-cyclone contractor response
                  depends on early pre-positioning. NRPG contractors are staged in the region ahead of TC Maila&apos;s
                  forecast landfall window.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Daintree Rainforest&apos;s dense canopy creates significant tree-fall risk during Cat 4–5
                  events. Properties in Daintree Village, Cape Tribulation, and the communities north of the
                  Daintree River crossing face additional access delays as roads may be blocked by fallen timber
                  for 24–72 hours post-event.
                </p>
              </>
            ),
          },
          {
            heading: 'Areas We Cover',
            body: (
              <>
                <p>
                  <strong>Port Douglas (4877):</strong> Four Mile Beach, Macrossan Street precinct, Mowbray,
                  Whyanbeel, Wonga Beach, Newell Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Mossman (4873):</strong> Mossman township, Mossman Gorge, Lower Daintree
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Daintree Coast (4873/4895):</strong> Daintree Village, Cape Tribulation, Thornton Beach,
                  Cow Bay — response subject to road clearance post-event
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Innisfail Corridor (4860):</strong> Innisfail, Mourilyan, Silkwood, Tully, Mission
                  Beach, El Arish
                </p>
              </>
            ),
          },
          {
            heading: 'Cyclone Damage Unique to the Daintree Coast',
            body: (
              <>
                <p>
                  Properties in the Port Douglas and Daintree region face cyclone damage scenarios specific to
                  tropical rainforest environments:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Tree-fall structural damage:</strong> Massive rainforest trees (&gt;30m) can cause
                    catastrophic roof and wall collapse. Emergency structural assessment must precede any
                    internal access.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Extreme rainfall flooding:</strong> The Daintree receives the highest annual rainfall
                    in Australia (4,000–8,000 mm). Cyclone rainfall events can exceed 500 mm in 24 hours,
                    inundating low-lying properties and compromising septic systems and subfloors.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Isolation and access delays:</strong> Road closures post-cyclone may delay contractor
                    access. NRPG pre-positions locally to minimise response time once roads clear.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Port Douglas in the TC Maila direct impact zone?',
            answer: 'Yes — Port Douglas and the Daintree Coast are in TC Maila\'s forecast impact corridor. BOM is projecting landfall-level conditions for postcode 4877 in the 11–12 April window. NRPG contractors are pre-staged in the region for immediate post-clearance response.',
          },
          {
            question: 'How do I lodge a cyclone damage claim for a Port Douglas property?',
            answer: 'Lodge at disasterrecovery.com.au/claim once emergency services confirm it is safe to assess your property. Photograph all damage first. The ARPC Cyclone Pool applies to FNQ postcodes — lodge as "cyclone damage" and "water ingress" separately.',
          },
          {
            question: 'Will road closures affect response time in the Daintree?',
            answer: 'Potentially yes — the Daintree River Ferry and the single highway north can be disrupted by cyclone debris. NRPG pre-positions contractors in the region before major events. Lodge your claim early to be first in the queue once access is restored.',
          },
          {
            question: 'Does home insurance cover mould after tropical flooding in Port Douglas?',
            answer: 'Mould arising directly from a covered cyclone or storm event is generally covered under standard policies. However, insurer-appointed assessors sometimes dispute mould coverage if they claim it resulted from delayed reporting. Lodge early and request IICRC-certified assessment to document the causal link.',
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency — Lodge Your Claim Now', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila updates and 24/7 claim lodgement.' },
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'Cairns cyclone restoration hub — FNQ contractor network.' },
          { title: 'Mould After Flooding — FNQ Tropical Climate Guide', href: '/services/mould-remediation', description: 'Act within 48 hours in tropical conditions.' },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
