import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-476: Water Damage Restoration Cairns
 *
 * Created: 9 April 2026
 * Context: TC Maila generating significant rainfall accumulation across the FNQ coast.
 * Cairns is the highest-risk tropical city for water damage in Australia — wet season
 * rainfall events, cyclone ingress, and tropical mould conditions. ARPC Cyclone Pool
 * claims context. ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Cairns | IICRC-Certified 24/7 Emergency',
  description: 'Professional water damage restoration in Cairns and Far North Queensland. IICRC S500:2025 certified contractors, 60-minute response. TC Maila water damage recovery. Lodge your claim 24/7.',
  keywords: 'water damage restoration cairns, water damage cairns, FNQ water damage, cyclone water damage cairns, burst pipe cairns, TC Maila water damage, flood damage cairns FNQ',
  openGraph: {
    title: 'Water Damage Restoration Cairns | IICRC-Certified 24/7 Emergency',
    description: 'Emergency water damage restoration across Cairns and Far North Queensland. IICRC S500:2025 certified. 60-minute response. TC Maila water damage recovery available now.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Cairns')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-cairns`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-cairns/#localbusiness`,
  name: `${NAP.name} Cairns`,
  url: `${NAP.url}/water-damage-restoration-cairns`,
  description: 'IICRC-certified water damage restoration contractors serving Cairns and Far North Queensland 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation following IICRC S500:2025.',
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
  name: 'Water Damage Restoration Cairns',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Cairns' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Cairns: emergency water extraction, structural drying to IICRC S500:2025, mould remediation, contents protection, and insurance claim documentation for ARPC Cyclone Pool lodgement.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does mould grow after water damage in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In Cairns\u2019 tropical climate (30\u00b0C+ with 70\u201385% humidity year-round), mould can establish within 24 hours of water damage occurring. Post-cyclone conditions \u2014 warm temperatures, elevated humidity, and saturated materials \u2014 create ideal propagation conditions. Lodge immediately for 60-minute emergency response: delayed treatment in Cairns\u2019 climate converts a manageable water damage claim into a full mould remediation project.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is TC Maila water damage covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes \u2014 water ingress caused by cyclone wind damage to building elements (roof failure, broken windows, damaged walls) is covered under most home insurance policies as cyclone damage, processed through the ARPC Cyclone Reinsurance Pool. Lodge as \u2018cyclone damage\u2019 and \u2018water ingress\u2019 \u2014 not \u2018flood\u2019. NRPG provides full IICRC-certified documentation for ARPC pool claim lodgement.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is IICRC S500:2025 and why does it matter for my Cairns claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "ANSI/IICRC S500:2025 is the Australian standard for water damage restoration. Insurers require psychrometric drying logs that only IICRC-certified contractors can produce. Non-certified work in Cairns\u2019 tropical conditions often leaves residual moisture in wall cavities and subfloor \u2014 visible as mould appearing weeks after apparent drying. NRPG only connects you with S500:2025-certified contractors.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I lodge a water damage claim in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Lodge at disasterrecovery.com.au/claim. Photograph all damage first \u2014 timestamped evidence is critical. Lodge as \u2018cyclone damage\u2019 and \u2018water ingress\u2019 for TC Maila events. NRPG manages all insurer correspondence on your behalf and provides a full IICRC-certified documentation pack.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG help if my Cairns contractor did incomplete drying?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If a non-certified contractor dried your property and you now have mould or structural issues, NRPG performs thermal imaging moisture mapping to identify residual wet areas and provides IICRC-compliant re-remediation with documentation for insurer re-lodgement.',
      },
    },
  ],
};

export default function WaterDamageRestorationCairnsPage() {
  return (
    <>
      <Script id="wdrc-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="wdrc-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Cairns"
        subtitle="Emergency water damage restoration across Cairns and Far North Queensland. IICRC S500:2025 certified technicians. 60-minute response. TC Maila water damage recovery available now."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Cairns' },
        ]}
        sections={[
          {
            heading: 'Water Damage in Cairns — The Tropical Risk Profile',
            body: (
              <>
                <p>
                  Cairns receives between 1,800 and 2,500 mm of rainfall annually, with the wet season
                  (November–April) delivering over 80% of annual precipitation in intense, short-duration
                  rainfall events. The city&apos;s topography — flat coastal lowlands transitioning to the
                  Atherton Tablelands — means stormwater systems regularly exceed capacity during tropical
                  rain events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Low-lying suburbs including Manunda, Manoora, Westcourt, and the areas adjacent to
                  Freshwater Creek are particularly susceptible to flash flooding. Cyclone events amplify
                  the risk: TC Maila is generating significant rainfall accumulation across the FNQ coast
                  even before direct landfall.
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila Water Damage — Cairns Recovery',
            body: (
              <>
                <p>
                  Cyclone-generated water damage in Cairns follows a specific sequence: wind-driven rain
                  penetrates through failed roof sheeting, damaged windows, and breached external walls.
                  This is distinct from flooding — it is wind-driven water ingress, which is covered under
                  cyclone provisions rather than flood provisions in most policies.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG IICRC-certified contractors are pre-positioned across FNQ to provide 60-minute
                  post-clearance response for:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Emergency water extraction</li>
                  <li style={{ marginBottom: '0.5rem' }}>Structural drying to IICRC S500:2025</li>
                  <li style={{ marginBottom: '0.5rem' }}>Psychrometric documentation for insurer sign-off</li>
                  <li style={{ marginBottom: '0.5rem' }}>Antimicrobial treatment in Cairns&apos; tropical heat</li>
                  <li style={{ marginBottom: '0.5rem' }}>Full insurance documentation for ARPC Cyclone Pool lodgement</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Water Damage Restoration Cost Estimates — Cairns 2026',
            body: (
              <>
                <p>
                  Water damage costs in Cairns are elevated compared to southern cities due to the tropical
                  climate (faster mould growth), access costs for specialist equipment, and post-cyclone surge
                  pricing across the trades. Indicative 2026 costs:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipe or appliance overflow (Category 1):</strong> $3,500–$14,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress through roof or walls (Category 2):</strong> $6,000–$28,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cyclone flooding inundation (Category 3):</strong> $18,000–$70,000+
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full cyclone restoration (multi-trade):</strong> $25,000–$120,000+
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
                  60-minute emergency response across Cairns LGA:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>City/Inner:</strong> Cairns City, Cairns North, Manunda, Westcourt, Manoora,
                  Mooroobool, Edge Hill, Whitfield
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches:</strong> Machans Beach, Holloways Beach, Yorkeys Knob, Trinity
                  Beach, Trinity Park, Kewarra Beach, Clifton Beach, Palm Cove, Ellis Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Gordonvale, Edmonton, Woree, Bentley Park, White Rock,
                  Mount Sheridan, Brinsmead, Freshwater, Redlynch, Smithfield, Caravonica
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Regional:</strong> Innisfail, Babinda, Mission Beach, Tully (60–90 minute response)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly does mould grow after water damage in Cairns?',
            answer: "In Cairns' tropical climate (30°C+ with 70–85% humidity year-round), mould can establish within 24 hours of water damage occurring. Post-cyclone conditions — warm temperatures, elevated humidity, and saturated materials — create ideal propagation conditions. Lodge immediately for 60-minute emergency response: delayed treatment in Cairns' climate converts a manageable water damage claim into a full mould remediation project.",
          },
          {
            question: 'Is TC Maila water damage covered by home insurance?',
            answer: "Yes — water ingress caused by cyclone wind damage to building elements (roof failure, broken windows, damaged walls) is covered under most home insurance policies as cyclone damage, processed through the ARPC Cyclone Reinsurance Pool. Lodge as 'cyclone damage' and 'water ingress' — not 'flood'. NRPG provides full IICRC-certified documentation for ARPC pool claim lodgement.",
          },
          {
            question: 'What is IICRC S500:2025 and why does it matter for my Cairns claim?',
            answer: "ANSI/IICRC S500:2025 is the Australian standard for water damage restoration. Insurers require psychrometric drying logs that only IICRC-certified contractors can produce. Non-certified work in Cairns' tropical conditions often leaves residual moisture in wall cavities and subfloor — visible as mould appearing weeks after apparent drying. NRPG only connects you with S500:2025-certified contractors.",
          },
          {
            question: 'How do I lodge a water damage claim in Cairns?',
            answer: "Lodge at disasterrecovery.com.au/claim. Photograph all damage first — timestamped evidence is critical. Lodge as 'cyclone damage' and 'water ingress' for TC Maila events. NRPG manages all insurer correspondence on your behalf and provides a full IICRC-certified documentation pack.",
          },
          {
            question: 'Can NRPG help if my Cairns contractor did incomplete drying?',
            answer: "Yes. If a non-certified contractor dried your property and you now have mould or structural issues, NRPG performs thermal imaging moisture mapping to identify residual wet areas and provides IICRC-compliant re-remediation with documentation for insurer re-lodgement.",
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'Full cyclone damage restoration for Cairns — structural, water, and mould.' },
          { title: 'TC Maila FNQ Emergency Response', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila updates and 24/7 claim lodgement.' },
          { title: 'ARPC Cyclone Pool — FNQ Claimants Guide', href: '/guides/insurance/arpc-cyclone-reinsurance-pool', description: 'How the ARPC Cyclone Pool affects your water damage claim.' },
          { title: 'Mould After Water Damage — FNQ Tropical Guide', href: '/services/mould-remediation', description: 'Why tropical conditions accelerate mould and what to do within 48 hours.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
