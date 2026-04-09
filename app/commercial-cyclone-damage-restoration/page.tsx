import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Commercial Cyclone Damage Restoration | IICRC-Certified Contractors FNQ',
  description: 'Commercial cyclone damage restoration for FNQ businesses, strata buildings, and industrial properties. IICRC-certified contractors, 60-minute post-clearance response. TC Maila commercial response active.',
  keywords: 'commercial cyclone damage restoration, cyclone damage commercial property, business cyclone damage FNQ, strata cyclone damage, industrial cyclone restoration, TC Maila commercial',
  openGraph: {
    title: 'Commercial Cyclone Damage Restoration | IICRC-Certified Contractors FNQ',
    description: 'Commercial cyclone damage restoration for FNQ businesses, strata buildings, and industrial properties. IICRC-certified contractors, 60-minute post-clearance response. TC Maila commercial response active.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Commercial Cyclone Damage Restoration')}&city=${encodeURIComponent('FNQ')}&service=commercial-cyclone-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/commercial-cyclone-damage-restoration`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/commercial-cyclone-damage-restoration/#localbusiness`,
  name: `${NAP.name} Commercial`,
  url: `${NAP.url}/commercial-cyclone-damage-restoration`,
  description: 'IICRC-certified commercial cyclone damage restoration contractors serving FNQ businesses, strata buildings, retail premises, and industrial properties. TC Maila commercial response active.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'Place', name: 'Far North Queensland' },
  address: { '@type': 'PostalAddress', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Cyclone Damage Restoration',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Far North Queensland' },
  serviceType: 'Commercial Cyclone Damage Restoration',
  description: 'Commercial cyclone damage restoration across FNQ: strata and multi-dwelling properties, business interruption documentation, IICRC-certified scope assessment, and full insurance claim documentation for commercial, retail, hospitality, and industrial properties.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does commercial insurance cover all cyclone damage?',
      acceptedAnswer: { '@type': 'Answer', text: "Most commercial policies cover direct cyclone wind damage and associated water ingress. Business interruption is covered only if you have a BI extension \u2014 check your policy schedule. Strata properties typically have building cover through the owners corporation policy, but lot-specific contents and fit-out require individual cover. Lodge as \u2018cyclone damage\u2019 and \u2018water ingress\u2019 separately from any BI claim." },
    },
    {
      '@type': 'Question',
      name: 'How are strata cyclone claims handled?',
      acceptedAnswer: { '@type': 'Answer', text: 'Strata cyclone claims involve the owners corporation (body corporate) insurance for common areas and the building structure, plus individual lot owner policies for fit-out and contents. NRPG provides separate documentation packs for the owners corporation and for individual lot owners. We coordinate directly with the strata manager and relevant insurers to streamline the process.' },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG respond to large-scale commercial losses?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes. NRPG\u2019s network includes contractors with commercial restoration capacity for multi-storey buildings, large-footprint industrial properties, and hospitality venues. Project management is provided for losses requiring multi-trade coordination across structural, water, and mould remediation scopes." },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG mobilise for commercial cyclone damage?',
      acceptedAnswer: { '@type': 'Answer', text: 'Within 60 minutes of emergency services issuing the all-clear for the affected area. Commercial properties are prioritised for emergency make-safe to allow the earliest possible re-opening. Lodge your commercial claim at disasterrecovery.com.au/claim to be first in the queue post-clearance.' },
    },
  ],
};

export default function CommercialCycloneDamageRestorationPage() {
  return (
    <>
      <Script id="ccdr-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="ccdr-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="ccdr-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Commercial Restoration"
        title="Commercial Cyclone Damage Restoration"
        subtitle="IICRC-certified commercial restoration contractors for FNQ businesses, strata buildings, retail premises, and industrial properties. TC Maila response active. Lodge your commercial claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #1B5E20 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Commercial' },
        ]}
        sections={[
          {
            heading: 'Commercial Cyclone Damage — A Different Risk Profile',
            body: (
              <p>
                Commercial properties face unique cyclone damage scenarios compared to residential. Larger roof spans,
                flat roofs, extensive glazing, mechanical plant, and the cost of business interruption all amplify
                both direct damage costs and claim complexity. FNQ businesses — particularly in hospitality, tourism,
                retail, and agriculture — face specific TC Maila exposure due to the region&apos;s economic dependence
                on outdoor and tourism infrastructure.
              </p>
            ),
          },
          {
            heading: 'Strata and Multi-Dwelling Cyclone Restoration',
            body: (
              <>
                <p>
                  Strata properties present the most complex cyclone restoration scenarios: competing owners corporation
                  obligations, multiple insurers, body corporate decisions required before repairs can proceed, and
                  shared infrastructure damage affecting multiple lots simultaneously.
                </p>
                <p style={{ marginTop: '1rem' }}>NRPG provides:</p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>IICRC-certified scope assessment across all affected lots</li>
                  <li style={{ marginBottom: '0.5rem' }}>Coordination with body corporate managers and strata insurers</li>
                  <li style={{ marginBottom: '0.5rem' }}>Separate documentation packs per lot for individual owners</li>
                  <li style={{ marginBottom: '0.5rem' }}>Priority sequencing of common area vs lot-level works</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Business Interruption and Commercial Claim Documentation',
            body: (
              <>
                <p>
                  Commercial cyclone claims have two components that must be documented separately: property damage
                  (structural, contents, fit-out) and business interruption (loss of revenue during closure). NRPG
                  provides full property damage scope documentation. For BI claims, ensure your accountant has access
                  to the last 3 years of financials before the loss event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge property and BI claims simultaneously — delayed BI lodgement can be disputed by insurers as
                  a separate notification obligation.
                </p>
              </>
            ),
          },
          {
            heading: 'FNQ Commercial Properties — TC Maila Coverage',
            body: (
              <>
                <p>NRPG provides commercial restoration services across:</p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cairns CBD (4870)</strong> — hospitality, retail, commercial office
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Port Douglas (4877)</strong> — tourism and hospitality precinct
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Townsville (4810–4814)</strong> — industrial, commercial, government
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Innisfail Corridor (4860)</strong> — agriculture, sugar industry, commercial
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Daintree/Cape Tribulation (4873/4895)</strong> — eco-tourism and accommodation
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Response times for commercial properties are coordinated with business owners to minimise operational
                  disruption. Emergency make-safe is prioritised to allow re-opening where structurally safe.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does commercial insurance cover all cyclone damage?',
            answer: 'Most commercial policies cover direct cyclone wind damage and associated water ingress. Business interruption is covered only if you have a BI extension — check your policy schedule. Strata properties typically have building cover through the owners corporation policy, but lot-specific contents and fit-out require individual cover. Lodge as \'cyclone damage\' and \'water ingress\' separately from any BI claim.',
          },
          {
            question: 'How are strata cyclone claims handled?',
            answer: 'Strata cyclone claims involve the owners corporation (body corporate) insurance for common areas and the building structure, plus individual lot owner policies for fit-out and contents. NRPG provides separate documentation packs for the owners corporation and for individual lot owners. We coordinate directly with the strata manager and relevant insurers to streamline the process.',
          },
          {
            question: 'Can NRPG respond to large-scale commercial losses?',
            answer: "Yes. NRPG's network includes contractors with commercial restoration capacity for multi-storey buildings, large-footprint industrial properties, and hospitality venues. Project management is provided for losses requiring multi-trade coordination across structural, water, and mould remediation scopes.",
          },
          {
            question: 'How quickly can NRPG mobilise for commercial cyclone damage?',
            answer: 'Within 60 minutes of emergency services issuing the all-clear for the affected area. Commercial properties are prioritised for emergency make-safe to allow the earliest possible re-opening. Lodge your commercial claim at disasterrecovery.com.au/claim to be first in the queue post-clearance.',
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'FNQ cyclone restoration — IICRC-certified contractors.' },
          { title: 'TC Maila FNQ Emergency Response', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila response information.' },
          { title: 'Storm Damage Restoration Cost Guide', href: '/guides/cost-guides/how-much-storm-damage-restoration-cost', description: 'Full cyclone damage cost breakdown by property type.' },
        ]}
        cta={{ text: 'Lodge Commercial Claim Now', href: '/claim' }}
      />
    </>
  );
}
