import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Darwin | Dry Season Grassfire & Smoke Emergency',
  description:
    'Emergency fire damage restoration across Darwin and Greater Darwin. IICRC S700:2025 certified contractors for dry season grassfire interface properties, smoke damage in tropical heat, and structural fire restoration. Lodge your claim 24/7.',
  keywords:
    'fire damage restoration darwin, fire damage darwin, smoke damage darwin, grassfire darwin, dry season fire darwin, humpty doo fire, howard springs grassfire, darwin fire restoration, darwin smoke damage',
  openGraph: {
    title: 'Fire Damage Restoration Darwin | Dry Season Grassfire & Smoke Emergency',
    description:
      'Emergency fire damage restoration across Darwin and Greater Darwin. IICRC S700:2025 certified contractors for dry season grassfire interface properties, smoke damage in tropical heat, and structural fire restoration. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Darwin')}&service=fire-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-darwin`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-darwin/#localbusiness`,
  name: `${NAP.name} Darwin`,
  url: `${NAP.url}/fire-damage-restoration-darwin`,
  description:
    '24/7 emergency fire damage restoration across Darwin, Palmerston, and Greater Darwin. IICRC S700:2025 certified contractor network for dry season grassfire interface properties, tropical smoke damage remediation, and structural fire restoration.',
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
  name: 'Emergency Fire Damage Restoration Darwin',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Darwin',
    containedInPlace: { '@type': 'State', name: 'Northern Territory' },
  },
  serviceType: 'Fire Damage Restoration',
  description:
    'Professional fire and smoke damage restoration across Darwin to IICRC S700:2025 standard. Emergency make-safe, smoke extraction, soot remediation, odour elimination, and structural restoration for dry season grassfire interface properties, kitchen and electrical fires, and structural fires in tropical conditions.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does home insurance cover grassfire damage to Darwin suburban fringe properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — fire damage to residential properties, including damage caused by grassfire ember attack or direct flame contact, is covered as a fire event under the fire peril in standard home insurance policies. The Darwin suburban fringe — Humpty Doo, Howard Springs, Acacia Hills, and Bees Creek — borders dry season grasslands that burn regularly from May to October. Properties in these areas face genuine ember attack risk during high fire-danger days when low humidity (10–20%), high temperatures (32–38°C), and strong trade winds combine. Unlike cyclone damage, fire damage is not covered under the ARPC Cyclone Reinsurance Pool — it is processed directly through your private insurer's fire peril. Document all damage with photographs before any clean-up and contact your insurer to lodge a claim immediately.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool apply to fire damage in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — the ARPC Cyclone Reinsurance Pool covers cyclone-related perils including wind, storm surge, and rain-driven flooding triggered by a tropical system, but it does not apply to fire damage. Fire is a separate peril processed directly through your private insurer, regardless of the season or whether a cyclone or storm event is occurring nearby. This is a common point of confusion in Darwin where multiple perils can occur in proximity. If your property sustains both cyclone damage and a separate fire event, you may have two concurrent claims — a cyclone claim (potentially through the ARPC mechanism) and a separate fire claim through your private insurer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Darwin\'s tropical climate affect smoke damage after a fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Darwin's dry season fire conditions — temperatures of 32–38°C and relative humidity as low as 10–20% — mean smoke and soot particles penetrate porous building materials (plasterboard, timber, soft furnishings) very rapidly after a fire event. The low humidity during the dry season allows fine soot particles to travel further and penetrate more deeply than in temperate climates. Paradoxically, when the wet season follows, the transition to high humidity (80%+) then activates any residual soot and smoke deposits — creating conditions for rapid secondary mould colonisation in materials that were not fully remediated. IICRC S700:2025 protocols — HEPA extraction, chemical dry sponging, and thermal fogging — are required to fully address smoke penetration in Darwin's climate.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does fire damage restoration cost in Darwin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fire damage restoration costs in Darwin depend on the fire source, extent of damage, and whether smoke has penetrated structural materials. Indicative ranges: kitchen or electrical fire (single room) $5,000–$20,000; structural fire across multiple rooms $15,000–$70,000; grassfire interface total loss (Humpty Doo, Howard Springs, Acacia Hills) $40,000–$200,000+. Properties where dry season fire damage is followed by wet season mould colonisation in inadequately remediated areas may face additional mould remediation costs. NRPG provides a full IICRC S700:2025 scope of works for insurer submission.',
      },
    },
  ],
};

export default function FireDamageRestorationDarwinPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fdrdarwin-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdrdarwin-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdrdarwin-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Darwin"
        subtitle="Emergency fire damage restoration across Darwin, Palmerston, and Greater Darwin. IICRC S700:2025 certified contractors for dry season grassfire interface properties, structural fires, and smoke damage in tropical conditions. priority response."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Darwin' },
        ]}
        sections={[
          {
            heading: 'Darwin Fire Risk — Dry Season Grassfires and Pre-Tracy Heritage',
            body: (
              <>
                <p>
                  Darwin&apos;s Dry Season (May&ndash;October) creates extreme fire weather
                  conditions: relative humidity drops to 10&ndash;20%, temperatures reach
                  32&ndash;38&deg;C, and persistent trade winds create fire-spread conditions
                  across the dry grasslands surrounding Darwin&apos;s suburban fringe. The areas
                  of Humpty Doo, Howard Springs, Acacia Hills, and Bees Creek border extensive
                  dry season grasslands that burn regularly &mdash; properties in these areas face
                  genuine ember attack risk on high fire-danger days.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Darwin&apos;s rebuilt post&ndash;TC Tracy (1974) residential stock is
                  predominantly modern cyclone-code construction with steel roofing and concrete
                  masonry &mdash; more resistant to ember attack than older timber construction.
                  However, older pre-code structures in Parap, Fannie Bay, and Larrakeyah retain
                  more traditional tropical vernacular materials and are more vulnerable to fire
                  from both ember attack and internal ignition sources.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The ARPC Cyclone Reinsurance Pool does not apply to fire damage &mdash; fire
                  is a separate peril processed directly through your private insurer regardless
                  of the season or surrounding weather conditions. Where a property sustains both
                  cyclone wind damage and a separate fire event, two concurrent claims through
                  separate pathways may apply.
                </p>
              </>
            ),
          },
          {
            heading: 'Fire and Smoke Damage in Tropical Heat',
            body: (
              <>
                <p>
                  Darwin&apos;s dry season fire conditions &mdash; temperatures of 32&ndash;38&deg;C
                  and relative humidity as low as 10&ndash;20% &mdash; allow smoke and soot
                  particles to penetrate porous building materials more rapidly and deeply than
                  in temperate Australian cities. Fine soot travels further in dry air and embeds
                  more deeply into plasterboard, timber framing, and soft furnishings than
                  humidity-laden southern conditions would allow.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Critically, when Darwin&apos;s wet season arrives following a dry season fire
                  event, the transition to 80%+ relative humidity activates any residual soot and
                  smoke deposits that were not fully extracted. This creates ideal conditions for
                  secondary mould colonisation in materials that appear visually clean but retain
                  smoke residues. A single dry season fire damage scope that is not fully
                  remediated under IICRC S700:2025 protocols can compound into a concurrent mould
                  remediation loss when the wet season begins.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG deploys HEPA air scrubbers, chemical dry sponging, and thermal fogging
                  protocols calibrated for Darwin&apos;s extreme climate conditions to fully
                  address smoke penetration and prevent secondary mould activation during the
                  wet season transition.
                </p>
              </>
            ),
          },
          {
            heading: 'Darwin Areas We Cover',
            body: (
              <>
                <p>
                  priority emergency response across Darwin and surrounds for fire damage
                  make-safe and structural assessment:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Darwin inner suburbs:</strong> Darwin CBD, Larrakeyah, Fannie Bay,
                  Parap
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern suburban belt:</strong> Casuarina, Nightcliff, Rapid Creek,
                  Coconut Grove
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Palmerston and industrial:</strong> Palmerston, Berrimah, Winnellie
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Grassfire interface:</strong> Humpty Doo, Howard Springs, Acacia Hills,
                  Bees Creek (extended response time may apply for outer rural areas)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does home insurance cover grassfire damage to Darwin suburban fringe properties?',
            answer:
              'Yes — fire damage including grassfire ember attack and direct flame contact is covered under the fire peril in standard home insurance policies. The Darwin suburban fringe (Humpty Doo, Howard Springs, Acacia Hills, Bees Creek) borders dry season grasslands with genuine ember attack risk. Fire damage is not covered under the ARPC Cyclone Pool — it is processed directly through your private insurer.',
          },
          {
            question: 'Does the ARPC Cyclone Pool apply to fire damage in Darwin?',
            answer:
              'No — the ARPC Cyclone Pool covers cyclone wind, storm surge, and rain flooding triggered by a tropical system, but does not apply to fire damage. Fire is processed directly through your private insurer. If your property sustains both cyclone damage and a separate fire event, you may have two concurrent claims through separate pathways.',
          },
          {
            question: "How does Darwin's tropical climate affect smoke damage after a fire?",
            answer:
              "Darwin's dry season conditions (32–38°C, 10–20% humidity) allow soot to penetrate deeply into porous materials. When the wet season follows, residual smoke deposits activate mould colonisation in inadequately remediated areas. IICRC S700:2025 protocols — HEPA extraction, chemical sponging, and thermal fogging — are required to prevent dry season fire damage compounding into a wet season mould claim.",
          },
          {
            question: 'How much does fire damage restoration cost in Darwin?',
            answer:
              'Indicative costs: kitchen or electrical fire (single room) $5,000–$20,000; structural fire across multiple rooms $15,000–$70,000; grassfire interface total loss $40,000–$200,000+. NRPG provides a full IICRC S700:2025 scope of works for insurer submission.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Darwin',
            href: '/storm-damage-restoration-darwin',
            description: 'Emergency storm damage restoration across Darwin and the NT.',
          },
          {
            title: 'Water Damage Darwin',
            href: '/water-damage-restoration-darwin',
            description: 'Emergency water damage restoration across Darwin and Greater Darwin.',
          },
          {
            title: 'Cyclone Water Damage Darwin',
            href: '/cyclone-water-damage-restoration-darwin',
            description: 'TC Maila cyclone water damage restoration across Darwin.',
          },
          {
            title: 'Fire Damage Cairns',
            href: '/fire-damage-restoration-cairns',
            description: 'Post-TC Maila fire damage restoration across Cairns and FNQ.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
