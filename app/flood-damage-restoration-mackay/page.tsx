import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Mackay | Pioneer River Flood Recovery',
  description: 'Flood damage restoration across Mackay. Pioneer River flooding, cyclone-driven inundation, IICRC S500:2025 certified. Category 3 water decontamination. priority response.',
  openGraph: {
    title: 'Flood Damage Restoration Mackay | Pioneer River Flood Recovery',
    description: 'Flood damage restoration across Mackay. Pioneer River flooding, cyclone-driven inundation, IICRC S500:2025 certified. Category 3 water decontamination. priority response.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Flood Damage Restoration')}&city=${encodeURIComponent('Mackay')}&service=flood-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-mackay`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-mackay/#localbusiness`,
  name: `${NAP.name} Mackay`,
  url: `${NAP.url}/flood-damage-restoration-mackay`,
  description: 'Flood damage restoration across Mackay. Pioneer River flood recovery, IICRC S500:2025 Category 3 decontamination, priority emergency response 24/7.',
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
  name: 'Flood Damage Restoration Mackay',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Mackay', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  serviceType: 'Flood Damage Restoration',
  description: 'Professional flood damage restoration across Mackay including Pioneer River flood recovery, Category 3 water decontamination per IICRC S500:2025, structural drying, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Pioneer River flood risk in Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Pioneer River drains approximately 8,500 km² of Central Queensland ranges, creating significant flood risk for low-lying Mackay suburbs during major rainfall events. Major flood events include 2008, 2011 (TC Yasi rainfall), and 2017 (TC Debbie). Low-lying suburbs near the river and tidal areas face the highest risk. Cyclone-driven rainfall from TC Maila could generate significant Pioneer River flooding.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Pioneer River flooding covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pioneer River flooding requires a flood extension in your home insurance policy. Many standard QLD policies exclude river flooding. Check your Product Disclosure Statement carefully. Storm surge and overland flow from TC Maila may be covered differently from river flood — NRPG helps correctly categorise each damage type for your insurer, which can significantly affect your settlement outcome.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is Category 3 floodwater and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "River floodwater is classified as Category 3 contaminated water under IICRC S500:2025 — it contains sewage, agricultural runoff, bacteria, and other hazardous materials. Cat 3 protocol requires full decontamination, appropriate PPE, and disposal of affected porous materials. This makes it more expensive and time-consuming than Category 1 or 2 water restoration. IICRC S500:2025 compliance is required for insurance documentation.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long does flood restoration take after Pioneer River flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Water extraction typically takes 1-2 days. Structural drying for Category 3 events takes 7-14 days using IICRC S500:2025 psychrometric drying logs. Repairs and replacement materials take 4-12 weeks depending on scope. In Mackay's humid subtropical climate, accelerated drying protocols are essential to prevent secondary mould growth.",
      },
    },
  ],
};

export default function FloodDamageRestorationMackayPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrmkay-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrmkay-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdrmkay-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Flood Damage Restoration Mackay"
        subtitle="Flood damage restoration across Mackay. Pioneer River flood recovery specialists. IICRC S500:2025 certified Category 3 decontamination. priority emergency response 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #0D47A1 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Flood', href: '/services/water-damage/flood' },
          { label: 'Mackay' },
        ]}
        sections={[
          {
            heading: 'Mackay Flood Risk — Pioneer River and Cyclone Rainfall',
            body: (
              <>
                <p>
                  The Pioneer River drains approximately 8,500&nbsp;km&sup2; of Central Queensland ranges,
                  creating a significant flood pathway through Mackay&apos;s low-lying coastal suburbs. Major
                  Pioneer River flood events have occurred in 2008, 2011 (amplified by TC Yasi rainfall), and
                  2017 following TC Debbie. Low-lying suburbs near the river&apos;s lower reaches and tidal
                  areas face the highest inundation risk.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila (April 2026) presents a compound flood risk for Mackay: wind-driven rain causing
                  immediate water ingress, Pioneer River catchment flooding from intense cyclone rainfall, and
                  potential storm surge from the Pioneer River mouth. TC Debbie&apos;s 2017 passage produced
                  significant Pioneer River flooding across Mackay CBD and surrounding low-lying areas. TC
                  Maila&apos;s projected rainfall band could generate comparable or greater inundation in the
                  11&ndash;14 April 2026 window.
                </p>
              </>
            ),
          },
          {
            heading: 'Category 3 Flood Restoration — The Process',
            body: (
              <>
                <p>
                  Pioneer River floodwater is classified as Category 3 contaminated under IICRC S500:2025 &mdash;
                  it contains sewage overflows, agricultural runoff from the catchment, bacteria, and other
                  hazardous materials. Cat 3 protocol requires full personal protective equipment, systematic
                  decontamination of all affected surfaces, and removal of porous materials that cannot be safely
                  restored.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The restoration sequence for Cat 3 Mackay flood events: water extraction and hazardous waste
                  disposal, structural assessment and material salvageability review, removal of affected flooring,
                  insulation, and wall cavities as required, antimicrobial treatment and subfloor decontamination
                  (critical for Queenslander-style homes), then monitored structural drying with psychrometric
                  logging per IICRC S500:2025. Documentation generated throughout this process is required by
                  insurers for settlement of flood restoration claims.
                </p>
              </>
            ),
          },
          {
            heading: 'Mackay Suburbs We Cover',
            body: (
              <>
                <p>
                  Flood damage response across Mackay, with particular focus on Pioneer River flood-risk areas:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Highest Flood Risk:</strong> Mackay CBD, South Mackay, North Mackay, West Mackay,
                  Andergrove &mdash; low-lying areas adjacent to Pioneer River flood plain
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Coastal and Tidal Risk:</strong> Slade Point, Shoal Point, Habana &mdash; tidal
                  inundation compound risk during cyclone storm surge events
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland:</strong> Walkerston &mdash; Pioneer River upstream flood risk from
                  catchment rainfall
                </p>
              </>
            ),
          },
          {
            heading: 'Insurance Claim Support — Pioneer River Floods',
            body: (
              <>
                <p>
                  Correctly categorising flood damage is critical for maximising your insurance claim outcome.
                  A single TC Maila event can generate multiple concurrent damage types: wind-driven rain
                  through damaged building envelope (storm damage), Pioneer River overflow (river flood, requires
                  flood extension), and cyclone storm surge (separate ARPC Cyclone Pool consideration). Each
                  category may be processed differently by your insurer.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG&apos;s IICRC-certified contractors provide a single comprehensive scope of works covering
                  all concurrent water damage events &mdash; storm water, river flood, and cyclone-associated
                  inundation &mdash; with clear documentation of each damage pathway. This reduces claim disputes
                  and provides the insurer with the evidence required for correct categorisation and settlement.
                  Check your Product Disclosure Statement carefully if your Mackay property is in a Pioneer River
                  flood zone &mdash; many standard QLD home insurance policies exclude river flooding.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is the Pioneer River flood risk in Mackay?',
            answer: "The Pioneer River drains approximately 8,500 km² of Central Queensland ranges, creating significant flood risk for low-lying Mackay suburbs during major rainfall events. Major flood events include 2008, 2011 (TC Yasi rainfall), and 2017 (TC Debbie). Low-lying suburbs near the river and tidal areas face the highest risk. Cyclone-driven rainfall from TC Maila could generate significant Pioneer River flooding.",
          },
          {
            question: 'Is Pioneer River flooding covered by home insurance?',
            answer: "Pioneer River flooding requires a flood extension in your home insurance policy. Many standard QLD policies exclude river flooding. Check your Product Disclosure Statement carefully. Storm surge and overland flow from TC Maila may be covered differently from river flood — NRPG helps correctly categorise each damage type for your insurer, which can significantly affect your settlement outcome.",
          },
          {
            question: 'What is Category 3 floodwater and why does it matter?',
            answer: "River floodwater is classified as Category 3 contaminated water under IICRC S500:2025 — it contains sewage, agricultural runoff, bacteria, and other hazardous materials. Cat 3 protocol requires full decontamination, appropriate PPE, and disposal of affected porous materials. This makes it more expensive and time-consuming than Category 1 or 2 water restoration. IICRC S500:2025 compliance is required for insurance documentation.",
          },
          {
            question: 'How long does flood restoration take after Pioneer River flooding?',
            answer: "Water extraction typically takes 1-2 days. Structural drying for Category 3 events takes 7-14 days using IICRC S500:2025 psychrometric drying logs. Repairs and replacement materials take 4-12 weeks depending on scope. In Mackay's humid subtropical climate, accelerated drying protocols are essential to prevent secondary mould growth.",
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Mackay', href: '/water-damage-restoration-mackay', description: 'IICRC-certified water damage restoration across Mackay.' },
          { title: 'Flood Damage Cost Guide', href: '/guides/cost-guides/how-much-flood-damage-restoration-cost', description: 'How much does flood damage restoration cost in Australia?' },
          { title: 'TC Maila FNQ Emergency', href: '/events/tc-maila-fnq-2026', description: 'Live response information for TC Maila affecting Far North Queensland.' },
        ]}
        cta={{ text: 'Get Flood Damage Help — Mackay', href: '/claim' }}
      />
    </>
  );
}
