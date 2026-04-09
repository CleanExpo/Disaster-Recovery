import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Perth | IICRC Category 3 Specialists',
  description:
    'Emergency flood damage restoration across Perth. IICRC-certified Category 3 specialists for Swan River flooding, groundwater rise, and winter storm inundation. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration perth, flood damage perth, flood cleanup perth, swan river flooding, perth groundwater flooding, category 3 water damage perth, flood recovery perth, winter storm flooding perth',
  openGraph: {
    title: 'Flood Damage Restoration Perth | IICRC Category 3 Specialists',
    description:
      'Emergency flood damage restoration across Perth. IICRC-certified Category 3 specialists for Swan River flooding, groundwater rise, and winter storm inundation. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Flood+Damage+Restoration&city=Perth&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-perth`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-perth/#localbusiness`,
  name: `${NAP.name} Perth`,
  url: `${NAP.url}/flood-damage-restoration-perth`,
  description:
    'IICRC-certified Category 3 flood damage restoration contractors serving all Perth metro suburbs. Swan River and Canning River flooding specialists. Full decontamination, structural drying, groundwater remediation, and insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Perth',
    containedInPlace: { '@type': 'State', name: 'Western Australia' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Perth',
    addressRegion: 'WA',
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
  name: 'Flood Damage Restoration Perth',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Perth' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Perth. Winter storm flooding, Swan and Canning River inundation, groundwater rise, and Category 3 contamination specialists. Emergency extraction, full decontamination, HEPA containment, structural drying, and insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does Perth flood in winter despite low annual rainfall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Perth's Mediterranean climate concentrates 600–900mm of annual rainfall almost entirely into the June–September winter period. After months of dry conditions, the sandy Swan Coastal Plain soils rapidly reach saturation — triggering surface ponding, blocked drain overflow, and overland flow from the Darling Scarp into eastern suburbs. Perth also has a high shallow water table; during winter, groundwater rises and enters subfloors and basements even without surface flooding. The 2021 NW storm event demonstrated how quickly northern suburbs can experience widespread flash flooding from a single intense event.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is flood damage covered by Perth home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Australian home and contents insurance policies include flood cover as standard or as an add-on following post-2022 reforms. Perth properties are not subject to the ARPC Cyclone Pool (which applies only to Northern Australia). Coverage depends on whether your damage is classified as flood (river/groundwater inundation), storm (wind-driven rain, roof breach), or stormwater runoff. We bill you directly so work begins immediately, and provide full documentation — timestamped photos, moisture readings, scope of works, and daily drying logs — to support your insurance claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Perth property has Category 3 contamination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Category 3 (grossly contaminated) water applies when floodwater enters from external sources — Swan River or Canning River overflow, combined stormwater/sewage reticulation backup, or overland flow that has passed through streets and drains. Perth's older eastern suburbs (Bassendean, Guildford, Cannington, Bentley) have combined stormwater and sewage reticulation in some streets, meaning overland flow can carry sewage contamination. Any water that has been outside the building envelope and entered through ground-level openings should be treated as Category 3 until tested otherwise. Signs include visible sediment or discolouration, sewage odour, or confirmed overflow from a reticulation or drainage system.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does flood damage restoration cost in Perth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood damage restoration costs in Perth vary by severity and contamination category. Minor groundwater or subfloor flooding: $5,000–$18,000. Ground floor inundation (clean to grey water): $12,000–$50,000. Category 3 full remediation (overland flow, river, or sewage contamination): $30,000–$120,000+, depending on the extent of material removal required and structural drying duration. These are estimates — your assigned NRPG contractor provides a formal itemised scope after assessment.',
      },
    },
  ],
};

export default function FloodDamageRestorationPerthPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fdperth-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdperth-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdperth-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Perth"
        subtitle="IICRC-certified Category 3 flood damage restoration across Perth. Swan River and Canning River flooding specialists. Winter storm, groundwater rise, and overland flow inundation. 60-minute response. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Perth Flood' },
        ]}
        sections={[
          {
            heading: 'Perth Flood Risk — Winter Storms and Groundwater Rise',
            body: (
              <>
                <p>
                  Perth sits on the Swan Coastal Plain — a low-lying, largely sandy formation with a
                  shallow water table that rises significantly during the winter rainfall season. While
                  Perth&apos;s annual rainfall of 600–900mm is modest by eastern Australian standards, it
                  falls almost entirely between June and September. After months of dry conditions, soils
                  saturate rapidly and the water table climbs, causing groundwater to enter subfloors and
                  basements from below — even in properties that never receive surface floodwater.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Swan River corridor presents the most consistent flood risk in the metropolitan
                  area. Suburbs including Bassendean, Guildford, South Guildford, and Middle Swan sit on
                  low-lying riverside flats that experience regular inundation when the Swan River rises
                  after sustained catchment rainfall from the Darling Range. The Canning River corridor —
                  covering Cannington, Wilson, Bentley, Riverton, and Shelley — follows a similar
                  pattern, with flash flooding during heavy winter rain events regularly affecting
                  ground-floor properties and subfloors.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Perth also experiences damaging overland flow when intense rainfall exceeds the
                  capacity of stormwater infrastructure. The 2021 NW storm event produced widespread
                  property flooding across northern suburbs including Joondalup, Wanneroo, and Ellenbrook
                  within hours of onset. Perth&apos;s stormwater drainage network in older suburbs was not
                  designed for the rainfall intensities now being observed, and blocked drains regularly
                  convert minor storm events into significant inundation events in low-lying streets.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Mandurah, 60km south of Perth, has distinct estuary flooding exposure from the Peel
                  Harvey Estuary system — a low-lying, tidally influenced waterway that backs up
                  significantly during sustained winter rainfall, producing high claim density for flood
                  damage in surrounding residential areas.
                </p>
              </>
            ),
          },
          {
            heading: "Category 3 Contamination in Perth's Older Suburbs",
            body: (
              <>
                <p>
                  Under IICRC S500:2025, floodwater from rivers, overland flow, and stormwater overflow
                  is classified as Category 3 (grossly contaminated water). It carries pathogens,
                  sediment, chemicals, and biological hazards that cannot be remediated by drying alone.
                  All porous materials within the flood zone must be removed — plasterboard, insulation,
                  carpet, underlay, and soft furnishings — before decontamination and structural drying
                  can begin.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In Perth, Category 3 contamination risk is elevated in older eastern suburbs because
                  some of these areas have combined stormwater and sewage reticulation. In streets where
                  these systems share infrastructure, heavy overland flow can carry sewage contamination
                  into properties through ground-level openings, subfloor vents, and drainage points.
                  Affected suburbs include parts of Bassendean, Guildford, Cannington, and Bentley —
                  where older housing stock with subfloor construction is particularly vulnerable.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG&apos;s Perth contractors apply full Category 3 decontamination protocols where
                  contamination is confirmed or suspected:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full personal protective equipment for all contractor access during remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Removal and disposal of all porous materials in the flood zone in accordance with WA
                    waste regulations
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>HEPA containment and air scrubbing</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial decontamination of all structural surfaces and cavities
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Subfloor and wall cavity decontamination where contaminated water penetrated
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>Post-remediation clearance testing</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Category 3 events that are improperly remediated — dried only, without decontamination
                  — result in persistent mould colonisation and ongoing health risk. Perth&apos;s humid
                  winter conditions accelerate mould growth in wall cavities and subfloors that have not
                  been properly stripped and treated.
                </p>
              </>
            ),
          },
          {
            heading: 'Flood Damage Restoration Cost Estimates — Perth 2026',
            body: (
              <>
                <p>
                  Restoration costs vary significantly based on flood depth, water contamination category,
                  affected materials, and the time between inundation and extraction. The following are
                  indicative ranges for residential properties across the Perth metropolitan area in 2026.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Minor groundwater or subfloor flooding:</strong> $5,000–$18,000. Typical
                    when the winter water table rises and enters subfloor cavities or below-slab spaces.
                    Involves extraction, drying, antimicrobial treatment, and moisture monitoring.
                    Common in Swan Coastal Plain properties with suspended timber floors.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Ground floor inundation (clean to grey water):</strong> $12,000–$50,000.
                    Required when stormwater or river overflow enters living areas at ground level.
                    Scope includes material removal (carpet, underlay, lower plasterboard), structural
                    drying with dehumidifiers and air movers, and full insurance documentation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Category 3 full remediation:</strong> $30,000–$120,000+. Applies to
                    Swan River, Canning River, or overland flow inundation with confirmed or probable
                    sewage contamination. Full strip-out to structural frame, decontamination, HEPA
                    containment, and post-remediation clearance testing required before reconstruction.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  These are estimates only. Your assigned NRPG contractor provides a formal itemised
                  scope of works and contract after on-site assessment. Payment plans are available
                  through{' '}
                  <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                    Blue Fire Finance
                  </a>
                  .
                </p>
              </>
            ),
          },
          {
            heading: 'Perth Flood-Prone Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  60-minute emergency response for extraction and make-safe across the Perth metropolitan
                  region and surrounds:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Swan River corridor:</strong> Bassendean, Guildford, South Guildford, Middle
                  Swan, Caversham, Bayswater, Belmont, South Perth
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Canning River corridor:</strong> Cannington, Wilson, Bentley, Riverton,
                  Shelley, Lynwood, Parkwood
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern suburbs:</strong> Joondalup, Wanneroo, Ellenbrook, Swan area,
                  Morley, Balcatta, Stirling, Dianella
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern corridor:</strong> Mandurah, Rockingham, Baldivis, Kwinana,
                  Cockburn, Canning Vale, Willetton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern foothills:</strong> Kalamunda, Midland, Mundaring, Bickley,
                  Forrestfield, High Wycombe
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>General coverage:</strong> All Perth metro suburbs — full network available
                  for assessment and restoration
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why does Perth flood in winter despite low annual rainfall?',
            answer:
              "Perth's Mediterranean climate concentrates 600–900mm of annual rainfall almost entirely into the June–September winter period. After months of dry conditions, the sandy Swan Coastal Plain soils rapidly reach saturation — triggering surface ponding, blocked drain overflow, and overland flow from the Darling Scarp into eastern suburbs. Perth also has a high shallow water table; during winter, groundwater rises and enters subfloors and basements even without surface flooding. The 2021 NW storm event demonstrated how quickly northern suburbs can experience widespread flash flooding from a single intense event.",
          },
          {
            question: 'Is flood damage covered by Perth home insurance?',
            answer:
              'Most Australian home and contents insurance policies include flood cover as standard or as an add-on following post-2022 reforms. Perth properties are not subject to the ARPC Cyclone Pool (which applies only to Northern Australia). Coverage depends on whether your damage is classified as flood (river/groundwater inundation), storm (wind-driven rain, roof breach), or stormwater runoff. We bill you directly so work begins immediately, and provide full documentation — timestamped photos, moisture readings, scope of works, and daily drying logs — to support your insurance claim.',
          },
          {
            question: 'How do I know if my Perth property has Category 3 contamination?',
            answer:
              "Category 3 (grossly contaminated) water applies when floodwater enters from external sources — Swan River or Canning River overflow, combined stormwater/sewage reticulation backup, or overland flow that has passed through streets and drains. Perth's older eastern suburbs (Bassendean, Guildford, Cannington, Bentley) have combined stormwater and sewage reticulation in some streets, meaning overland flow can carry sewage contamination. Any water that has been outside the building envelope and entered through ground-level openings should be treated as Category 3 until tested otherwise. Signs include visible sediment or discolouration, sewage odour, or confirmed overflow from a reticulation or drainage system.",
          },
          {
            question: 'How much does flood damage restoration cost in Perth?',
            answer:
              'Flood damage restoration costs in Perth vary by severity and contamination category. Minor groundwater or subfloor flooding: $5,000–$18,000. Ground floor inundation (clean to grey water): $12,000–$50,000. Category 3 full remediation (overland flow, river, or sewage contamination): $30,000–$120,000+, depending on the extent of material removal required and structural drying duration. These are estimates — your assigned NRPG contractor provides a formal itemised scope after assessment.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Perth',
            href: '/water-damage-restoration-perth',
            description: 'Emergency water damage restoration across all Perth suburbs.',
          },
          {
            title: 'Storm Damage Restoration Perth',
            href: '/storm-damage-restoration-perth',
            description: 'Storm damage restoration and insurance claim support for Perth.',
          },
          {
            title: 'Mould Remediation Perth',
            href: '/mould-remediation-perth',
            description: 'Post-flood mould remediation across all Perth suburbs.',
          },
          {
            title: 'Flood Damage Restoration Sydney',
            href: '/flood-damage-restoration-sydney',
            description: 'Flood damage restoration across Sydney and surrounds.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
