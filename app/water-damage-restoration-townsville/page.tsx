import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-477: Water Damage Restoration Townsville
 *
 * Created: 9 April 2026
 * Context: TC Maila projected NQ impact window 11–14 April 2026. Townsville is a
 * high-cyclone-exposure coastal city with flat topography and storm surge risk from
 * Cleveland Bay and Ross River. Contractors pre-positioned for immediate dispatch.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Townsville | IICRC-Certified Emergency Response',
  description: 'Professional water damage restoration in Townsville and North Queensland. IICRC-certified contractors, priority response. TC Maila water damage and storm flooding specialists. Lodge your claim 24/7.',
  keywords: 'water damage restoration townsville, water damage townsville, NQ water damage, cyclone water damage townsville, burst pipe townsville, storm flooding townsville, TC Maila water damage townsville',
  openGraph: {
    title: 'Water Damage Restoration Townsville | IICRC-Certified Emergency Response',
    description: 'Emergency water damage restoration across Townsville and North Queensland. IICRC S500:2025 certified. priority response. TC Maila water damage recovery available now.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Townsville')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-townsville`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-townsville/#localbusiness`,
  name: `${NAP.name} Townsville`,
  url: `${NAP.url}/water-damage-restoration-townsville`,
  description: 'IICRC-certified water damage restoration contractors serving Townsville and North Queensland 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation following IICRC S500:2025.',
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
  name: 'Water Damage Restoration Townsville',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Townsville' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Townsville: emergency water extraction, structural drying to IICRC S500:2025, mould remediation, contents protection, and insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does TC Maila affect Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 BOM is forecasting TC Maila impacts across the NQ coast including the Townsville corridor in the 11\u201314 April 2026 window. Water damage from cyclone wind-driven rain ingress and potential storm surge are the primary residential risks. NRPG contractors are pre-positioned for immediate dispatch. Lodge your claim at disasterrecovery.com.au/claim to be first in the queue post-clearance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does storm surge water damage differ from cyclone water damage for insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cyclone wind-driven water ingress (water entering through damaged roof, broken windows, or breached walls) is covered under cyclone provisions in most standard policies, processed through the ARPC Cyclone Reinsurance Pool. Storm surge flooding (water rising from external sources \u2014 Cleveland Bay, Ross River) requires a specific flood extension. Document the breach point clearly \u2014 where the water entered and how \u2014 to ensure correct peril classification.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does structural drying take in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In Townsville\u2019s tropical climate, IICRC S500:2025 structural drying typically takes 3\u20137 days for standard residential water damage. Category 3 (cyclone or sewage) events affecting subfloor or internal wall cavities may require 7\u201314 days of commercial drying equipment. NRPG contractors log psychrometric data daily and confirm drying completion with calibrated moisture readings.",
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do immediately after water damage in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Wait for the emergency services all-clear. Then: (1) photograph all damage before touching anything; (2) stop the water source if safe to do so; (3) lodge your claim at disasterrecovery.com.au/claim; (4) do not use household fans \u2014 they spread mould spores in Townsville\u2019s humidity. NRPG will dispatch IICRC-certified contractors as soon as a certified contractor is confirmed for your area of area clearance.",
      },
    },
  ],
};

export default function WaterDamageRestorationTownsvillePage() {
  return (
    <>
      <Script id="wdrtv-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrtv-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="wdrtv-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Townsville"
        subtitle="Emergency water damage restoration across Townsville and North Queensland. IICRC S500:2025 certified technicians. priority response. TC Maila water damage recovery available now."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Townsville' },
        ]}
        sections={[
          {
            heading: 'Water Damage in Townsville — Storm Surge and Flash Flooding',
            body: (
              <>
                <p>
                  Townsville&apos;s flat coastal topography creates a specific water damage risk profile unlike
                  more elevated Queensland cities. The city&apos;s proximity to Cleveland Bay means significant
                  storm surge during cyclone events, with low-lying suburbs adjacent to the foreshore and
                  Ross River facing inundation from external water sources in addition to wind-driven rain
                  ingress.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Yasi (2011), TC Debbie (2017), and TC Kirrily (2024) all generated widespread water
                  damage claims across the Townsville LGA. TC Maila&apos;s projected NQ impact window (11–14
                  April) has NRPG contractors pre-positioned for immediate post-clearance dispatch.
                </p>
              </>
            ),
          },
          {
            heading: "Townsville's Water Damage Challenge — Heat and Humidity",
            body: (
              <>
                <p>
                  Townsville averages 320 days of sunshine per year and humidity of 65–80% — conditions that
                  accelerate both the spread of water through building materials and the growth of mould
                  following water damage. Structural drying in Townsville requires more intensive equipment
                  (higher dehumidifier capacity, increased air movement) than temperate cities to achieve
                  drying targets within acceptable timeframes.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG contractors are equipped for tropical structural drying conditions and produce the
                  psychrometric logs (daily temperature, humidity, and moisture readings) that Townsville
                  insurers require for claim sign-off.
                </p>
              </>
            ),
          },
          {
            heading: 'Water Damage Restoration Cost Estimates — Townsville 2026',
            body: (
              <>
                <p>Indicative 2026 residential restoration costs for Townsville:</p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipe or appliance overflow (Category 1):</strong> $3,000–$12,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress (Category 2):</strong> $5,000–$22,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Cyclone or storm surge inundation (Category 3):</strong> $15,000–$65,000+
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full cyclone restoration (multi-trade):</strong> $20,000–$110,000+
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Townsville Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across the Townsville LGA:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>City/Inner:</strong> Townsville City, South Townsville, North Ward, Belgian
                  Gardens, Mysterton, Mundingburra, Hyde Park, Rosslea
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches:</strong> Burdell, Bohle Plains, Deeragun, Rasmussen,
                  Cranbrook, Kirwan, Thuringowa, Kelso, Bushland Beach
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Aitkenvale, Currajong, Cluden, Heatley, Hermit Park,
                  Garbutt, Stuart, Wulguru, Roseneath, Woodstock
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Islands:</strong> Magnetic Island — coordinated via ferry post-clearance
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does TC Maila affect Townsville?',
            answer: "Yes — BOM is forecasting TC Maila impacts across the NQ coast including the Townsville corridor in the 11–14 April 2026 window. Water damage from cyclone wind-driven rain ingress and potential storm surge are the primary residential risks. NRPG contractors are pre-positioned for immediate dispatch. Lodge your claim at disasterrecovery.com.au/claim to be first in the queue post-clearance.",
          },
          {
            question: 'How does storm surge water damage differ from cyclone water damage for insurance?',
            answer: "Cyclone wind-driven water ingress (water entering through damaged roof, broken windows, or breached walls) is covered under cyclone provisions in most standard policies, processed through the ARPC Cyclone Reinsurance Pool. Storm surge flooding (water rising from external sources — Cleveland Bay, Ross River) requires a specific flood extension. Document the breach point clearly — where the water entered and how — to ensure correct peril classification.",
          },
          {
            question: 'How long does structural drying take in Townsville?',
            answer: "In Townsville's tropical climate, IICRC S500:2025 structural drying typically takes 3–7 days for standard residential water damage. Category 3 (cyclone or sewage) events affecting subfloor or internal wall cavities may require 7–14 days of commercial drying equipment. NRPG contractors log psychrometric data daily and confirm drying completion with calibrated moisture readings.",
          },
          {
            question: 'What should I do immediately after water damage in Townsville?',
            answer: "Wait for the emergency services all-clear. Then: (1) photograph all damage before touching anything; (2) stop the water source if safe to do so; (3) lodge your claim at disasterrecovery.com.au/claim; (4) do not use household fans — they spread mould spores in Townsville's humidity. NRPG will dispatch IICRC-certified contractors as soon as a certified contractor is confirmed for your area of area clearance.",
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Damage Restoration Townsville', href: '/cyclone-damage-restoration-townsville', description: 'Full cyclone damage restoration for Townsville — structural, water, and make-safe.' },
          { title: 'TC Maila FNQ Emergency Response', href: '/events/tc-maila-fnq-2026', description: 'Real-time TC Maila updates and 24/7 claim lodgement.' },
          { title: 'ARPC Cyclone Pool — FNQ Claimants Guide', href: '/guides/insurance/arpc-cyclone-reinsurance-pool', description: 'How the ARPC Cyclone Pool affects your Townsville water damage claim.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
