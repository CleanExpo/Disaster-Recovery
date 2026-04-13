import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-477: Water Damage Restoration Darwin
 *
 * Created: 9 April 2026
 * Context: TC Maila — NT is in the watch zone for outer rain bands; Darwin contractors
 * are pre-positioned. Darwin has Australia's most extreme wet season water damage profile.
 * ARPC Cyclone Reinsurance Pool applies to ALL NT postcodes. ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Darwin | IICRC-Certified 24/7 Emergency',
  description:
    'Professional water damage restoration in Darwin and the NT. IICRC S500:2025 certified contractors, priority response. TC Maila watch zone — Darwin contractors pre-positioned. Post-cyclone and Wet Season water damage recovery. Lodge your claim 24/7.',
  keywords:
    'water damage restoration darwin, water damage darwin, darwin wet season water damage, cyclone water damage darwin, TC Maila darwin, darwin flood damage, post-cyclone water damage NT, ARPC cyclone pool darwin',
  openGraph: {
    title: 'Water Damage Restoration Darwin | IICRC-Certified 24/7 Emergency',
    description:
      'Emergency water damage restoration across Darwin and the NT. IICRC S500:2025 certified. priority response. TC Maila watch zone — Darwin contractors pre-positioned now.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Darwin')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-darwin`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-darwin/#localbusiness`,
  name: `${NAP.name} Darwin`,
  url: `${NAP.url}/water-damage-restoration-darwin`,
  description:
    'IICRC-certified water damage restoration contractors serving Darwin and the NT 24/7. Wet Season flood damage, post-cyclone water ingress, subfloor and highset home restoration, and full ARPC Cyclone Pool insurance documentation following IICRC S500:2025.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Darwin',
    containedInPlace: { '@type': 'State', name: 'Northern Territory' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Darwin',
    addressRegion: 'NT',
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
  name: 'Water Damage Restoration Darwin',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Darwin' },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration in Darwin: Wet Season flood damage, post-cyclone water ingress, subfloor and highset home restoration, emergency water extraction, structural drying to IICRC S500:2025, antimicrobial treatment, and full ARPC Cyclone Pool insurance documentation.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Wet Season water damage in Darwin covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — most home and contents insurance policies in Darwin cover Wet Season water damage, but the coverage category matters significantly. Wind-driven rain through failed building elements (cyclone damage), flash flooding from stormwater overflow, and burst pipes all carry different policy definitions. Darwin properties are covered under the ARPC Cyclone Reinsurance Pool for cyclone-related water ingress events. Lodge using the correct event description — 'cyclone water ingress' for post-cyclone events and 'storm damage' for intense rain events. NRPG provides full IICRC-certified documentation to support your claim.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Reinsurance Pool apply to Darwin and the NT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — the ARPC Cyclone Reinsurance Pool applies to all NT postcodes, including Darwin, Palmerston, and surrounding regions. This means cyclone-related water damage claims are processed through the Pool, which was established to ensure affordable cyclone insurance remains available in Northern Australia. For TC Maila-related events, lodge as cyclone damage and water ingress. NRPG provides the psychrometric drying logs, scope of works, and incident documentation required for ARPC Pool lodgement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly do I need to act on water damage in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In Darwin's tropical climate — 30°C+ with humidity regularly above 80% during the Wet Season — the standard 24-hour mould window from IICRC S500:2025 is effectively compressed to 12 hours or less. Mould can establish and begin colonising structural materials within half a day under active Wet Season conditions. Every hour of delay increases remediation scope and cost. NRPG provides priority emergency response across Darwin for water extraction and make-safe. Do not wait for insurer authorisation before beginning emergency extraction — most policies cover emergency works without prior approval.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Water damage restoration costs in Darwin are elevated compared to southern cities due to tropical conditions, access to specialist equipment, and post-cyclone demand surge. Indicative 2026 costs: $3,000–$15,000 for Category 1 tropical rainfall events (burst pipes, appliance overflow); $8,000–$40,000 for Category 2 storm water ingress through roof or walls; $15,000–$80,000+ for post-cyclone structural water damage requiring full strip-out and drying. Darwin's highset construction (homes on stumps) adds subfloor decontamination and electrical inspection costs. These are estimates — your assigned NRPG contractor provides a formal itemised scope after assessment.",
      },
    },
  ],
};

export default function WaterDamageRestorationDarwinPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="wdrdarwin-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdrdarwin-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdrdarwin-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Darwin"
        subtitle="Emergency water damage restoration across Darwin and the NT. IICRC S500:2025 certified technicians. priority response. TC Maila watch zone — Darwin contractors pre-positioned. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Darwin' },
        ]}
        sections={[
          {
            heading: "Darwin's Wet Season Water Damage Risk",
            body: (
              <>
                <p>
                  Darwin experiences Australia&apos;s most extreme water damage season. The Wet Season
                  (October–April) delivers 1,500–1,800mm in six months — and single storm events can
                  produce 100–200mm of rainfall within a matter of hours. Darwin&apos;s flat, low-lying
                  coastal position means stormwater drainage systems are regularly overwhelmed during
                  major events, with flash flooding affecting suburbs rapidly as overland flow
                  accumulates across the city&apos;s limited topographic relief.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The tropical climate creates a compounding risk: Category 1–3 water damage under
                  IICRC S500:2025 occurs faster and spreads further in Darwin&apos;s heat and humidity
                  than in any southern city. The standard 24-hour mould establishment window is
                  effectively 12 hours during active Wet Season conditions — 30°C+ temperatures and
                  80%+ relative humidity create near-ideal conditions for mould propagation as soon
                  as moisture is introduced into wall cavities, subfloors, or soft furnishings.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Darwin&apos;s highset construction — homes elevated on stumps or concrete piers —
                  is a defining feature of the local water damage profile. Floodwater under the
                  house affects the subfloor, electrical systems, and plumbing in ways that are
                  invisible from inside the property. Moisture trapped in subfloor timbers and
                  bearer systems can cause significant structural degradation if not extracted and
                  dried within the first 24–48 hours.
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila and Post-Cyclone Water Damage',
            body: (
              <>
                <p>
                  The NT is currently in the watch zone for TC Maila&apos;s outer rain bands. Darwin
                  NRPG contractors are pre-positioned for priority post-clearance response. Post-cyclone
                  water intrusion is the primary water damage scenario for Darwin — and it follows a
                  specific pattern that differs from standard flood events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Tracy (1974) established Darwin&apos;s current cyclone-code building standard —
                  but many pre-1975 structures remain in the inner suburbs and are built to a lower
                  standard. These properties are disproportionately exposed to wind-driven rain
                  ingress when cyclone conditions weaken roof sheeting, compromise window seals,
                  or breach external wall cladding. This type of water intrusion is covered under
                  cyclone provisions in most insurance policies — not flood provisions — and must be
                  correctly classified when lodging your claim.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The ARPC Cyclone Reinsurance Pool applies to all NT postcodes. NRPG provides the
                  full documentation package required for ARPC Pool lodgement:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Emergency water extraction and make-safe</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Structural drying to IICRC S500:2025 with psychrometric logging
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial treatment in Darwin&apos;s tropical heat and humidity
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Subfloor inspection, extraction, and drying for highset construction
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full scope of works and incident documentation for ARPC Cyclone Pool lodgement
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Darwin Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across the Darwin LGA and surrounds:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Darwin:</strong> Darwin CBD, Larrakeyah, Fannie Bay, Parap, Stuart
                  Park, Nightcliff, Rapid Creek
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern suburbs:</strong> Casuarina, Coconut Grove, Moil, Nakara,
                  Leanyer, Wanguri, Karama, Malak
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Palmerston and rural fringe:</strong> Palmerston, Humpty Doo, Howard
                  Springs, Coolalinga
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Regional (extended response):</strong> Katherine, Tennant Creek, Alice
                  Springs — contractor availability on request
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Wet Season water damage in Darwin covered by home insurance?',
            answer:
              "Yes — most home and contents insurance policies in Darwin cover Wet Season water damage, but the coverage category matters significantly. Wind-driven rain through failed building elements (cyclone damage), flash flooding from stormwater overflow, and burst pipes all carry different policy definitions. Darwin properties are covered under the ARPC Cyclone Reinsurance Pool for cyclone-related water ingress events. Lodge using the correct event description — 'cyclone water ingress' for post-cyclone events and 'storm damage' for intense rain events. NRPG provides full IICRC-certified documentation to support your claim.",
          },
          {
            question: 'Does the ARPC Cyclone Reinsurance Pool apply to Darwin and the NT?',
            answer:
              'Yes — the ARPC Cyclone Reinsurance Pool applies to all NT postcodes, including Darwin, Palmerston, and surrounding regions. This means cyclone-related water damage claims are processed through the Pool, which was established to ensure affordable cyclone insurance remains available in Northern Australia. For TC Maila-related events, lodge as cyclone damage and water ingress. NRPG provides the psychrometric drying logs, scope of works, and incident documentation required for ARPC Pool lodgement.',
          },
          {
            question: 'How quickly do I need to act on water damage in Darwin?',
            answer:
              "In Darwin's tropical climate — 30°C+ with humidity regularly above 80% during the Wet Season — the standard 24-hour mould window from IICRC S500:2025 is effectively compressed to 12 hours or less. Mould can establish and begin colonising structural materials within half a day under active Wet Season conditions. Every hour of delay increases remediation scope and cost. NRPG provides priority emergency response across Darwin for water extraction and make-safe. Do not wait for insurer authorisation before beginning emergency extraction — most policies cover emergency works without prior approval.",
          },
          {
            question: 'How much does water damage restoration cost in Darwin?',
            answer:
              "Water damage restoration costs in Darwin are elevated compared to southern cities due to tropical conditions, access to specialist equipment, and post-cyclone demand surge. Indicative 2026 costs: $3,000–$15,000 for Category 1 tropical rainfall events (burst pipes, appliance overflow); $8,000–$40,000 for Category 2 storm water ingress through roof or walls; $15,000–$80,000+ for post-cyclone structural water damage requiring full strip-out and drying. Darwin's highset construction (homes on stumps) adds subfloor decontamination and electrical inspection costs. These are estimates — your assigned NRPG contractor provides a formal itemised scope after assessment.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Water Damage Restoration Darwin',
            href: '/cyclone-water-damage-restoration-darwin',
            description:
              'Full cyclone water ingress restoration for Darwin — structural drying, mould prevention, and ARPC documentation.',
          },
          {
            title: 'Mould Remediation Darwin',
            href: '/mould-remediation-darwin',
            description:
              'Post-water damage mould remediation across Darwin — critical within 12 hours in tropical conditions.',
          },
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description:
              'Real-time TC Maila updates and 24/7 claim lodgement for FNQ and NT affected properties.',
          },
          {
            title: 'ARPC Cyclone Reinsurance Pool',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description:
              'How the ARPC Cyclone Reinsurance Pool works and what it means for your Darwin water damage claim.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
