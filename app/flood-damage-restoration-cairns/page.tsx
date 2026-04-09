import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Cairns | TC Maila Emergency Recovery',
  description:
    'Flood damage restoration across Cairns and FNQ. TC Maila Category 3 floodwater decontamination. IICRC S500:2025 certified. 60-minute response post-clearance.',
  keywords:
    'flood damage restoration cairns, TC Maila flooding cairns, FNQ flood restoration, cairns flood recovery, cyclone flood cairns',
  openGraph: {
    title: 'Flood Damage Restoration Cairns | TC Maila Emergency Recovery',
    description:
      'Flood damage restoration across Cairns and FNQ. TC Maila Category 3 floodwater decontamination. IICRC S500:2025 certified. 60-minute response post-clearance.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Flood Damage Restoration')}&city=${encodeURIComponent('Cairns')}&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-cairns`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-cairns/#localbusiness`,
  name: `${NAP.name} Cairns`,
  url: `${NAP.url}/flood-damage-restoration-cairns`,
  description:
    'IICRC S500:2025 certified flood damage restoration across Cairns and Far North Queensland. TC Maila Category 3 floodwater decontamination, structural drying, and post-remediation clearance testing.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Cairns',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairns',
    addressRegion: 'QLD',
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
  name: 'Flood Damage Restoration Cairns',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Cairns',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Cairns and FNQ. TC Maila Category 3 post-cyclone floodwater decontamination, emergency extraction, moisture mapping, structural drying, and insurance documentation under IICRC S500:2025.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Cairns flooding from TC Maila covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TC Maila-driven flooding is a cyclone event under the ARPC Cyclone Pool. Lodge as "cyclone damage" AND "water ingress/flooding" separately — the ARPC pool applies to all Cairns (16.9°S) properties as Cairns is well north of the Tropic of Capricorn. Do not lodge solely as "flood" as that may fall under a different policy extension that carries separate sub-limits or exclusions. Lodging both perils correctly maximises your covered outcome.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Category 3 floodwater and why is Cairns flooding Category 3?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Category 3 water under IICRC S500:2025 is grossly contaminated water. Cyclone floodwater in Cairns mixes with overflowing sewage infrastructure, agricultural runoff from surrounding cane fields, and petroleum from submerged vehicles. Cairns\' flat coastal topography means floodwater does not drain quickly, extending contamination exposure time. IICRC S500:2025 Cat 3 protocol is required: full PPE for all contractors, complete decontamination of all structural surfaces, and mandatory removal of all porous materials (plasterboard, carpet, insulation, soft furnishings) in the flood zone.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly must TC Maila flood restoration begin in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Within 24 hours of clearance is critical. Cairns\' tropical heat (28–33°C) and humidity consistently above 80% means Category 3 floodwater creates mould colonisation within 24 hours and dangerous pathogens multiply rapidly in standing water and contaminated materials. NRPG stages contractors pre-event so that post-clearance immediate response dispatch is available. Register via disasterrecovery.com.au/claim to enter the priority queue before clearance is issued.',
      },
    },
    {
      '@type': 'Question',
      name: 'What subfloor treatment is needed for Cairns properties after cyclone flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cairns has a mix of elevated Queenslander homes and slab-on-ground construction. For elevated Queenslanders: subfloor soil decontamination is required where Category 3 floodwater reached the subfloor space — soil is treated as a porous material under S500:2025 and may require removal and replacement. For slab-on-ground: slab moisture testing is required; if moisture has penetrated the slab, injection drying and concrete antimicrobial treatment are applied. Slab drying without antimicrobial treatment is insufficient for Category 3 events.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does TC Maila flood restoration cost in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Approximate cost ranges for Cairns TC Maila flood restoration: minor water ingress (no inundation): $5,000–$15,000; ground-floor Category 3 inundation: $20,000–$60,000; multi-storey or large-footprint Category 3 inundation: $50,000–$150,000+. If your property is fully covered under an ARPC cyclone pool policy, the out-of-pocket cost is reduced to your policy excess only. Accurate scoping requires on-site moisture mapping and material assessment.',
      },
    },
  ],
};

export default function FloodDamageRestorationCairnsPage() {
  return (
    <>
      <Script
        id="fdrcns-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdrcns-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdrcns-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Cairns"
        subtitle="IICRC S500:2025 certified flood damage restoration across Cairns and Far North Queensland. TC Maila Category 3 post-cyclone floodwater decontamination. 60-minute response post-clearance. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0C2340 0%, #0D47A1 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Flood', href: '/services/water-damage/flood' },
          { label: 'Cairns' },
        ]}
        sections={[
          {
            heading: 'TC Maila Flood Damage in Cairns — The Scale',
            body: (
              <>
                <p>
                  Cairns sits on a flat coastal plain at sea level, drained by multiple creek systems
                  including Anderson Creek, the Barron River delta, Lily Creek, and Chinaman Creek. This
                  geography means that major cyclone rainfall events produce rapid, widespread inundation with
                  limited natural drainage — water accumulates faster than it disperses.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  TC Maila made landfall in Far North Queensland in the April 11&ndash;14, 2026 window as a
                  Category 4&ndash;5 cyclone. Post-cyclone flooding in Cairns results from two concurrent
                  mechanisms: direct rainfall accumulation across the flat plain, and creek system overflow as
                  catchment volumes exceed drainage capacity. Both produce Category 3 contaminated water under
                  IICRC S500:2025 — cyclone floodwater mixes with sewage infrastructure overflow, agricultural
                  runoff from the cane-farming hinterland, and petroleum from submerged vehicles.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Cairns&apos; tropical climate — ambient 28&ndash;33&deg;C and relative humidity above 80% —
                  means Category 3 contamination does not remain static. Mould colonisation begins within
                  24 hours of inundation, and dangerous pathogens multiply rapidly in standing contaminated
                  water. The post-clearance restoration window is critical: NRPG stages contractors prior to
                  the all-clear to enable immediate dispatch.
                </p>
              </>
            ),
          },
          {
            heading: 'Emergency Flood Response — Post-Clearance Protocol',
            body: (
              <>
                <p>
                  Queensland Fire and Emergency Services (QFES) clearance is required before any contractor
                  can safely access TC Maila-affected properties. NRPG pre-stages certified contractors in
                  the region prior to clearance — when QFES issues the all-clear, our dispatch queue is
                  already active. Register your property at{' '}
                  <strong>disasterrecovery.com.au/claim</strong> before clearance to enter the priority queue.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In the first 4 hours post-clearance, the NRPG response protocol covers: emergency
                  extraction of standing floodwater, thermal imaging and moisture mapping across all affected
                  areas, Category 3 contamination assessment and containment, and preparation of a full scope
                  of works for lodgement with your insurer. All S500:2025 documentation is generated
                  concurrently with the physical response — no waiting for reports before work begins.
                </p>
              </>
            ),
          },
          {
            heading: 'Cairns and FNQ Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  60-minute emergency response post-clearance across Cairns and the FNQ corridor:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Cairns metro:</strong> Cairns CBD and City, Cairns North, Manunda, Mooroobool,
                  Brinsmead, Smithfield, Freshwater, Aeroglen
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern corridor:</strong> White Rock, Edmonton, Gordonvale
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Innisfail corridor:</strong> Innisfail, South Innisfail, Mourilyan, Flying Fish
                  Point, Babinda
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Atherton Tablelands:</strong> Atherton, Mareeba, Kuranda (elevated terrain — lower
                  inundation risk, different flood profile from creek-origin flooding)
                </p>
              </>
            ),
          },
          {
            heading: 'Flood vs Water Damage vs Cyclone — Claim Categorisation Matters',
            body: (
              <>
                <p>
                  For TC Maila-affected Cairns properties, the peril categorisation of your claim directly
                  affects what coverage applies and how quickly it is processed. Cairns (16.9&deg;S) is north
                  of the Tropic of Capricorn — the ARPC Cyclone Pool applies to all residential and
                  commercial properties. Lodge TC Maila-driven damage as &ldquo;cyclone damage&rdquo; to
                  trigger ARPC processing. Additionally lodge water ingress and flooding as a secondary
                  category — do not lodge solely as &ldquo;flood&rdquo; which may fall under a separate
                  policy extension with different sub-limits.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG provides multi-peril scope documentation that covers all damage categories from the
                  single TC Maila event in one assessment package — cyclone structural damage, water ingress,
                  Category 3 inundation, and resulting mould risk are all scoped concurrently. This prevents
                  the common outcome of multiple separate assessments that delay restoration and complicate
                  insurer lodgement.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Cairns flooding from TC Maila covered by insurance?',
            answer:
              'TC Maila-driven flooding is a cyclone event under the ARPC Cyclone Pool. Lodge as "cyclone damage" AND "water ingress/flooding" separately. The ARPC pool applies to all Cairns properties (16.9°S). Do not lodge solely as "flood" — that may fall under a different policy extension. Lodging both perils correctly maximises your covered outcome.',
          },
          {
            question: 'What is Category 3 floodwater and why is Cairns flooding Category 3?',
            answer:
              "Cyclone floodwater mixes with overflowing sewage infrastructure, agricultural runoff, and petroleum from submerged vehicles. Cairns' flat topography means floodwater doesn't drain quickly. IICRC S500:2025 Cat 3 protocol requires full PPE, complete decontamination, and mandatory removal of all porous materials in the flood zone.",
          },
          {
            question: 'How quickly must TC Maila flood restoration begin in Cairns?',
            answer:
              "Within 24 hours of clearance is critical. Cairns' tropical heat (28–33°C) and 80%+ humidity means Category 3 floodwater creates mould within 24 hours and dangerous pathogens multiply rapidly. NRPG stages contractors pre-event for post-clearance immediate response.",
          },
          {
            question:
              'What subfloor treatment is needed for Cairns properties after cyclone flooding?',
            answer:
              'Cairns has a mix of elevated Queenslanders (subfloor accessible) and slab-on-ground. Queenslanders: subfloor soil decontamination required. Slab-on-ground: slab moisture testing, injection drying if moisture is penetrating the slab, concrete antimicrobial treatment.',
          },
          {
            question: 'How much does TC Maila flood restoration cost in Cairns?',
            answer:
              'Minor water ingress: $5,000–$15,000. Ground-floor Cat 3 inundation: $20,000–$60,000. Multi-storey or large Cat 3: $50,000–$150,000+. ARPC pool claim reduces out-of-pocket to excess only if fully covered.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'TC Maila recovery resources for Cairns and all FNQ-affected areas.',
          },
          {
            title: 'Cyclone Damage Restoration Cairns',
            href: '/cyclone-damage-restoration-cairns',
            description: 'Cyclone structural damage restoration across Cairns and FNQ.',
          },
          {
            title: 'Mould Remediation Cairns',
            href: '/mould-remediation-cairns',
            description: 'Post-flood tropical mould remediation across Cairns.',
          },
        ]}
        cta={{ text: 'Lodge TC Maila Flood Claim — Cairns', href: '/claim' }}
      />
    </>
  );
}
