import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-478: Cyclone Damage Restoration Townsville
 * TC Maila impact zone — North Queensland coast
 */

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration Townsville | TC Maila Emergency Response',
  description: 'Cyclone damage restoration in Townsville and North Queensland. IICRC-certified contractors pre-positioned for TC Maila. 60-minute response post-clearance. Lodge your claim 24/7.',
  keywords: 'cyclone damage restoration townsville, cyclone damage townsville, TC Maila townsville, NQ cyclone repair, cyclone insurance claim townsville, storm damage townsville, water damage townsville',
  openGraph: {
    title: 'Cyclone Damage Restoration Townsville | TC Maila Emergency',
    description: 'IICRC-certified cyclone restoration contractors in Townsville. 60-minute post-clearance response. Lodge your TC Maila claim online 24/7.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/cyclone-damage-restoration-townsville`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/cyclone-damage-restoration-townsville/#localbusiness`,
  name: `${NAP.name} Townsville`,
  url: `${NAP.url}/cyclone-damage-restoration-townsville`,
  description: 'IICRC-certified cyclone damage restoration in Townsville. Emergency response for TC Maila structural damage, water damage, and roof repairs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Townsville', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Townsville', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cyclone Damage Restoration Townsville',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Townsville' },
  serviceType: 'Cyclone Damage Restoration',
  description: 'Professional cyclone damage restoration in Townsville: emergency make-safe, roof tarping, structural drying, water extraction, and insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Townsville in the TC Maila impact zone?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 TC Maila made landfall across the FNQ coast on 11\u201312 April 2026, with outer bands affecting the Townsville corridor. NRPG contractors are deployed for post-clearance response. Lodge your claim at disasterrecovery.com.au/claim.' },
    },
    {
      '@type': 'Question',
      name: 'How does the ARPC Cyclone Pool affect my Townsville claim?',
      acceptedAnswer: { '@type': 'Answer', text: 'Properties in NQ are covered under the ARPC Cyclone Reinsurance Pool. Your insurer processes the claim on behalf of the pool. This does not change your entitlements \u2014 you can still dispute underpayment through AFCA. NRPG provides full documentation packs to support claim lodgement.' },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG respond to cyclone damage in Townsville?',
      acceptedAnswer: { '@type': 'Answer', text: 'Within 60 minutes of emergency services confirming area clearance. Lodge your claim at disasterrecovery.com.au/claim \u2014 we queue the assignment and dispatch the moment the all-clear is issued for your suburb.' },
    },
    {
      '@type': 'Question',
      name: 'What cyclone damage is covered by home insurance?',
      acceptedAnswer: { '@type': 'Answer', text: "Cyclone wind damage and associated water ingress are covered by most standard policies in NQ. Storm surge flooding is assessed separately. Lodge as \u2018cyclone damage\u2019 and \u2018water ingress\u2019 \u2014 not just \u2018flood\u2019 \u2014 to maximise your coverage position under most PDS terms." },
    },
  ],
};

export default function CycloneDamageRestorationTownsvillePage() {
  return (
    <>
      <Script id="cdrtv-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="cdrtv-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="cdrtv-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Cyclone Damage"
        title="Cyclone Damage Restoration Townsville"
        subtitle="IICRC-certified contractors ready for TC Maila response across Townsville and North Queensland. 60-minute dispatch post-clearance. Lodge your claim online 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Townsville' },
        ]}
        sections={[
          {
            heading: 'Townsville\'s Cyclone Risk Profile',
            body: (
              <>
                <p>
                  Townsville sits at 19° south — squarely within North Queensland&apos;s cyclone belt. The city
                  has experienced more direct cyclone hits than any other Australian urban centre, with TC Yasi
                  (2011), TC Debbie (2017), and TC Kirrily (2024) all causing widespread damage across the LGA.
                  The Townsville region&apos;s flat coastal topography amplifies storm surge risk, particularly
                  for low-lying suburbs adjacent to Cleveland Bay and Ross River.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila made landfall across the FNQ coast on 11–12 April 2026. NRPG contractors are deployed
                  across the Townsville corridor for post-clearance response.
                </p>
              </>
            ),
          },
          {
            heading: 'What to Do After TC Maila — Townsville Action Plan',
            body: (
              <>
                <ol style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Wait for emergency services to confirm the all-clear.</strong> TC Maila&apos;s eye will
                    create a calm period — violent winds resume when the eye passes.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Photograph all damage before cleanup.</strong> Timestamped evidence is required for your
                    insurance claim. Include roof, walls, windows, ceilings, contents, and external structures.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge your claim within 72 hours.</strong> Lodge as "cyclone damage" and "water ingress" —
                    the ARPC Cyclone Pool applies to NQ events and affects how claims are processed.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge at disasterrecovery.com.au/claim</strong> for 60-minute emergency make-safe.
                    NRPG coordinates directly with your insurer on your behalf.
                  </li>
                </ol>
              </>
            ),
          },
          {
            heading: 'Townsville Suburbs We Cover',
            body: (
              <>
                <p>
                  <strong>City / Inner:</strong> Townsville City, South Townsville, North Ward, Belgian Gardens,
                  Mysterton, Mundingburra, Hyde Park, Rosslea
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches:</strong> Burdell, Bohle Plains, Deeragun, Rasmussen, Cranbrook,
                  Kirwan, Thuringowa, Kelso, Bushland Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Aitkenvale, Currajong, Cluden, Heatley, Hermit Park, Garbutt,
                  Stuart, Wulguru, Roseneath, Woodstock
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Islands:</strong> Magnetic Island — cyclone response coordinated via ferry services
                  post-clearance.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Was Townsville affected by TC Maila?',
            answer: 'Yes — TC Maila made landfall on the FNQ coast on 11–12 April 2026, with outer bands affecting the Townsville corridor. NRPG contractors are deployed for post-clearance response. Lodge your TC Maila claim at disasterrecovery.com.au/claim.',
          },
          {
            question: 'How does the ARPC Cyclone Pool affect my Townsville claim?',
            answer: 'Properties in NQ are covered under the ARPC Cyclone Reinsurance Pool. Your insurer processes the claim on behalf of the pool. This does not change your entitlements — you can still dispute underpayment through AFCA. NRPG provides full documentation packs to support claim lodgement.',
          },
          {
            question: 'How quickly can NRPG respond to cyclone damage in Townsville?',
            answer: 'Within 60 minutes of emergency services confirming area clearance. Lodge your claim at disasterrecovery.com.au/claim — we queue the assignment and dispatch the moment the all-clear is issued for your suburb.',
          },
          {
            question: 'What cyclone damage is covered by home insurance?',
            answer: "Cyclone wind damage and associated water ingress are covered by most standard policies in NQ. Storm surge flooding is assessed separately. Lodge as 'cyclone damage' and 'water ingress' — not just 'flood' — to maximise your coverage position under most PDS terms.",
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency — Claims Support', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila response information and claim lodgement.' },
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'Cairns cyclone restoration and FNQ contractor deployment.' },
          { title: 'Storm Damage Restoration Services', href: '/services/storm-damage', description: 'Full storm damage restoration service overview.' },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
