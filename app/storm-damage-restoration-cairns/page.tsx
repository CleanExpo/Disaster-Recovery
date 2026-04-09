import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Cairns | Roof Repair, Wind and Hail Damage',
  description: 'Emergency storm damage restoration in Cairns and Far North Queensland. IICRC-certified contractors for wind damage, roof repairs, and structural make-safe. TC Maila storm response available. Lodge your claim 24/7.',
  keywords: 'storm damage restoration cairns, storm damage cairns, roof damage cairns FNQ, wind damage cairns, hail damage cairns, storm restoration far north queensland',
  openGraph: {
    title: 'Storm Damage Restoration Cairns | Roof Repair, Wind and Hail Damage',
    description: 'Emergency storm damage restoration in Cairns and Far North Queensland. IICRC-certified contractors for wind damage, roof repairs, and structural make-safe. TC Maila storm response available. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Cairns')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-cairns`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-cairns/#localbusiness`,
  name: `${NAP.name} Cairns`,
  url: `${NAP.url}/storm-damage-restoration-cairns`,
  description: 'Emergency storm damage restoration across Cairns and Far North Queensland. IICRC-certified contractors for wind damage, roof failures, structural make-safe, and TC Maila response.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Cairns', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Cairns', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Storm Damage Restoration Cairns',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Cairns', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration in Cairns and Far North Queensland: emergency make-safe, roof tarping, structural wind damage assessment, water damage remediation, and full insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is storm damage in Cairns covered differently from cyclone damage?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes \u2014 cyclone events use ARPC Cyclone Pool provisions; non-cyclone storm events use standard storm provisions under your home insurance policy. NRPG ensures correct peril classification for each event, which affects how your claim is processed and what excess applies.' },
    },
    {
      '@type': 'Question',
      name: 'What is the most common storm damage in Cairns?',
      acceptedAnswer: { '@type': 'Answer', text: 'Roof sheeting displacement from wind uplift \u2014 Cairns\u2019 cyclone-rated construction uses specific fastening systems but non-conforming or older properties are vulnerable. Also common: guttering failure from debris load, and water ingress through roof-wall junctions during intense rainfall events.' },
    },
    {
      '@type': 'Question',
      name: 'How quickly can Cairns storm damage escalate to mould?',
      acceptedAnswer: { '@type': 'Answer', text: 'In Cairns\u2019 tropical climate \u2014 30\u00b0C+ with 70\u201385% humidity \u2014 mould establishes within 24 hours of unaddressed water ingress. Lodge immediately for same-day emergency make-safe and water extraction. IICRC-certified structural drying prevents secondary mould damage from compounding the original claim.' },
    },
    {
      '@type': 'Question',
      name: 'Does emergency make-safe in Cairns require ARPC Cyclone Pool approval?',
      acceptedAnswer: { '@type': 'Answer', text: 'Emergency make-safe to prevent ongoing damage is generally approved immediately by FNQ insurers as it limits the total claim value. NRPG provides same-day make-safe with full documentation for insurer sign-off. For cyclone events, make-safe costs are captured under the ARPC Cyclone Pool provision.' },
    },
  ],
};

export default function StormDamageRestorationCairnsPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrcns-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrcns-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrcns-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Cairns"
        subtitle="Emergency storm damage restoration across Cairns and Far North Queensland. IICRC-certified contractors for wind damage, roof failures, structural make-safe, and TC Maila response. 60-minute post-clearance dispatch."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Cairns' },
        ]}
        sections={[
          {
            heading: 'Storm Damage in Cairns — Beyond Cyclone Season',
            body: (
              <>
                <p>
                  Cairns experiences storm damage year-round, not just during cyclone events. The wet season
                  (November&ndash;April) produces intense afternoon convective storms capable of generating wind
                  gusts exceeding 80 km/h, golf ball-sized hail, and flash flooding from overwhelmed stormwater
                  systems. These non-cyclone storm events cause widespread roof damage, window failure, and fence
                  collapse across the LGA.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila (Cat 5, April 2026) represents the extreme end of the storm damage spectrum &mdash; with
                  NRPG contractors pre-positioned for 60-minute post-clearance response for the April 11&ndash;14
                  impact window.
                </p>
              </>
            ),
          },
          {
            heading: 'What NRPG Covers for Cairns Storm Damage',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Emergency make-safe:</strong> roof tarping and temporary boarding within 60 minutes of
                    clearance to prevent secondary water ingress in Cairns&apos; tropical rainfall
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Structural wind damage assessment:</strong> IICRC-certified scope covering roof sheeting,
                    fascia, guttering, windows, and external cladding
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Water damage from storm ingress:</strong> IICRC S500:2025 structural drying, moisture
                    mapping, antimicrobial treatment in Cairns&apos; tropical conditions
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Insurance documentation:</strong> full scope documentation for storm damage claims under
                    ARPC Cyclone Pool provisions (cyclone events) or standard storm provisions (non-cyclone events)
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Multi-trade coordination:</strong> for losses requiring structural, water, and mould
                    trades simultaneously
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Cairns Suburbs We Cover',
            body: (
              <>
                <p>
                  60-minute emergency response across all Cairns suburbs and the Far North Queensland corridor.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>City/Inner:</strong> Cairns City, Cairns North, Manunda, Westcourt, Manoora, Edge Hill,
                  Whitfield, Mooroobool
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches:</strong> Machans Beach, Holloways Beach, Yorkeys Knob, Trinity Beach,
                  Palm Cove, Clifton Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Gordonvale, Edmonton, Woree, Bentley Park, Mount Sheridan, Brinsmead,
                  Freshwater, Redlynch, Smithfield
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is storm damage in Cairns covered differently from cyclone damage?',
            answer: 'Yes — cyclone events use ARPC Cyclone Pool provisions; non-cyclone storm events use standard storm provisions under your home insurance policy. NRPG ensures correct peril classification for each event, which affects how your claim is processed and what excess applies.',
          },
          {
            question: 'What is the most common storm damage in Cairns?',
            answer: 'Roof sheeting displacement from wind uplift — Cairns\' cyclone-rated construction uses specific fastening systems but non-conforming or older properties are vulnerable. Also common: guttering failure from debris load, and water ingress through roof-wall junctions during intense rainfall events.',
          },
          {
            question: 'How quickly can Cairns storm damage escalate to mould?',
            answer: 'In Cairns\' tropical climate — 30°C+ with 70–85% humidity — mould establishes within 24 hours of unaddressed water ingress. Lodge immediately for same-day emergency make-safe and water extraction. IICRC-certified structural drying prevents secondary mould damage from compounding the original claim.',
          },
          {
            question: 'Does emergency make-safe in Cairns require ARPC Cyclone Pool approval?',
            answer: 'Emergency make-safe to prevent ongoing damage is generally approved immediately by FNQ insurers as it limits the total claim value. NRPG provides same-day make-safe with full documentation for insurer sign-off. For cyclone events, make-safe costs are captured under the ARPC Cyclone Pool provision.',
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'IICRC-certified cyclone damage restoration — TC Maila response active.' },
          { title: 'Water Damage Restoration Cairns', href: '/water-damage-restoration-cairns', description: 'Storm water ingress and flooding — IICRC S500:2025 structural drying.' },
          { title: 'TC Maila FNQ Emergency Response', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila response information for FNQ property owners.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
