import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-478: Flood Damage Restoration Adelaide
 *
 * Created: 9 April 2026
 * Context: Adelaide flood corridors — Torrens, Onkaparinga, and Gawler rivers all originate
 * in the Adelaide Hills. Heritage wine country (Barossa Valley) and stone property flood risk.
 * ARPC Cyclone Pool does NOT apply to Adelaide. Category 3 contamination risk in older suburbs.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Adelaide | IICRC Category 3 Specialists',
  description:
    'Emergency flood damage restoration across Adelaide. IICRC-certified Category 3 specialists for Torrens, Onkaparinga and Gawler river flooding. Heritage stone property restoration. Barossa Valley and Adelaide Hills coverage. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration adelaide, flood damage adelaide, torrens river flooding adelaide, onkaparinga river flooding, adelaide hills flooding, barossa valley flood damage, category 3 water damage adelaide, heritage property flood restoration adelaide',
  openGraph: {
    title: 'Flood Damage Restoration Adelaide | IICRC Category 3 Specialists',
    description:
      'Emergency flood damage restoration across Adelaide. IICRC-certified Category 3 specialists for Torrens, Onkaparinga and Gawler river flooding. Heritage stone property and Barossa Valley specialists. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Flood+Damage+Restoration&city=Adelaide&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-adelaide`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-adelaide/#localbusiness`,
  name: `${NAP.name} Adelaide`,
  url: `${NAP.url}/flood-damage-restoration-adelaide`,
  description:
    'IICRC-certified Category 3 flood damage restoration contractors serving Adelaide and surrounding regions 24/7. Torrens, Onkaparinga and Gawler river flooding specialists. Heritage stone and heritage plaster restoration. Full decontamination, structural drying, and insurance documentation following IICRC S500:2025.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Adelaide',
    containedInPlace: { '@type': 'State', name: 'South Australia' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Adelaide',
    addressRegion: 'SA',
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
  name: 'Flood Damage Restoration Adelaide',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Adelaide: Torrens, Onkaparinga, and Gawler river inundation, Category 3 contamination remediation, heritage stone and plaster restoration, emergency extraction, full decontamination, HEPA containment, structural drying, and insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "What is the difference between flood and storm damage insurance in South Australia?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In South Australia, insurance policies distinguish between flood (river or groundwater inundation), storm (wind-driven rain, roof breach, blocked drain overflow), and stormwater runoff. Following post-2022 reforms, most Australian home insurance policies now include flood cover as standard or as an add-on — but coverage boundaries matter when lodging a claim. Adelaide properties are not subject to the ARPC Cyclone Reinsurance Pool, which applies only to Northern Australia. If your property was inundated by Torrens, Onkaparinga, or Gawler river overflow, lodge as flood. If damage was from blocked drains or overland flow during a storm, lodge as storm or stormwater damage. NRPG provides full documentation to support your insurer classification.",
      },
    },
    {
      '@type': 'Question',
      name: "Why is Category 3 contamination a risk in Adelaide's older suburbs?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Adelaide's older western and inner suburbs — including Thebarton, Torrensville, and Hindmarsh — have combined stormwater and sewer infrastructure. When heavy rainfall overwhelms these systems, overland flooding can carry sewage contamination into properties through ground-level openings, subfloor vents, and drainage points. Under IICRC S500:2025, any water from external sources that has contacted sewage reticulation is classified as Category 3 (grossly contaminated). This requires full strip-out of porous materials, HEPA containment, antimicrobial decontamination, and post-remediation clearance testing — drying alone is insufficient and will result in ongoing mould and health risk.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can heritage stone properties in the Barossa Valley be restored after flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — but heritage stone and lime-plaster construction requires specialist restoration techniques that differ significantly from standard modern builds. Barossa Valley stone cottages in Tanunda, Angaston, and Nuriootpa are typically built from local bluestone or sandstone with lime mortar and lime plaster interiors. Standard water damage drying approaches using high-temperature dehumidifiers can cause irreversible damage to lime plaster and stone mortar joints. NRPG's Adelaide contractors with heritage property experience use controlled, lower-temperature drying protocols, specialist lime-compatible antimicrobial treatments, and heritage plasterer referrals for reinstatement. Photograph all heritage fabric before work begins — this is critical for both insurance documentation and heritage council compliance.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does flood damage restoration cost in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood damage restoration costs in Adelaide vary by severity, contamination category, and property construction type. Indicative 2026 costs: $5,000–$18,000 for minor subfloor or ground floor flooding (clean water, no contamination). $12,000–$50,000 for full ground floor Category 3 inundation from river overflow or stormwater contamination, including strip-out, decontamination, and structural drying. $30,000–$120,000+ for heritage stone properties in the Barossa Valley or inner Adelaide requiring specialist lime-compatible restoration and heritage fabric remediation. These are estimates — your assigned NRPG contractor provides a formal itemised scope after assessment.',
      },
    },
  ],
};

export default function FloodDamageRestorationAdelaidePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fdadl-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdadl-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdadl-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Adelaide"
        subtitle="IICRC-certified Category 3 flood damage restoration across Adelaide and South Australia. Torrens, Onkaparinga, and Gawler river flooding specialists. Heritage stone and Barossa Valley wine country property restoration. 60-minute response. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Adelaide Flood' },
        ]}
        sections={[
          {
            heading: 'Adelaide Flood Corridors — Torrens, Onkaparinga, Gawler',
            body: (
              <>
                <p>
                  Adelaide&apos;s flood risk is shaped by three major river systems that all originate
                  in the Adelaide Hills — the Torrens, Onkaparinga, and Gawler rivers. Intense hill
                  rainfall generates rapid flood events downstream, with limited warning time for
                  affected suburbs as water moves quickly from the ranges to the flat coastal plain.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The <strong>Torrens River corridor</strong> runs through the eastern suburbs and
                  Adelaide CBD Parklands. Campbelltown, Newton, Tranmere, Payneham, Magill, and
                  St Peters experienced flash flooding during the 2016 SA statewide storm event
                  when the Torrens catchment produced rapid overland flow that exceeded drainage
                  capacity across the eastern suburbs. The Torrens corridor combines both flash
                  flood risk from sudden hill rainfall and slower river rise risk from sustained
                  catchment events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The <strong>Onkaparinga River corridor</strong> runs through the southern suburbs
                  and McLaren Vale wine country. The 2022 Onkaparinga River flooding inundated the
                  Willunga Basin significantly — McLaren Vale wine country was heavily affected,
                  with many heritage stone wineries sustaining serious water damage. Old Noarlunga,
                  Christie&apos;s Beach, Seaford, and McLaren Flat all sit within the lower
                  Onkaparinga flood zone.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The <strong>Gawler River corridor</strong> affects the northern growth corridors.
                  Two Wells, Lewiston, Angle Vale, and Hewett are exposed to Gawler River flooding
                  during significant rainfall events across the northern Mount Lofty Ranges catchment.
                  Flash flooding from overland flow in these outer northern suburbs can be rapid and
                  difficult to predict from individual property flood overlays.
                </p>
              </>
            ),
          },
          {
            heading: 'Heritage Wine Country and Stone Property Flood Damage',
            body: (
              <>
                <p>
                  The Barossa Valley — Tanunda, Angaston, and Nuriootpa — contains some of
                  Australia&apos;s most significant heritage stone buildings. Local bluestone and
                  sandstone cottages with lime mortar construction and lime plaster interiors are
                  particularly vulnerable to flood damage, and require specialist restoration
                  approaches that differ substantially from standard modern building remediation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Standard water damage drying equipment — commercial dehumidifiers operating at
                  high temperature — can cause irreversible damage to lime plaster and stone
                  mortar joints if applied without specialist knowledge. Lime plaster is vapour-
                  permeable and requires slow, controlled drying to prevent delamination and cracking.
                  Aggressive drying also draws salts to the surface of stonework, causing efflorescence
                  and long-term surface degradation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG&apos;s Adelaide and Barossa Valley contractors with heritage property
                  experience apply:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Controlled low-temperature drying protocols appropriate for lime and stone
                    construction
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Lime-compatible antimicrobial treatments that do not damage existing plaster
                    substrate
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Heritage plasterer referrals for reinstatement of damaged lime plaster surfaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Pre-works photographic documentation of all heritage fabric for insurance and
                    heritage council compliance
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full IICRC S500:2025 documentation for insurer scope of works sign-off
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Adelaide&apos;s older inner suburbs — Thebarton, Torrensville, and Hindmarsh —
                  carry a different heritage risk: combined stormwater and sewer infrastructure.
                  Overland flooding in these areas can carry Category 3 contamination into properties,
                  requiring full strip-out and decontamination rather than drying alone.
                </p>
              </>
            ),
          },
          {
            heading: 'Adelaide Areas We Cover',
            body: (
              <>
                <p>60-minute emergency response across the Adelaide metropolitan area and surrounds:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Torrens River corridor:</strong> Campbelltown, Newton, Tranmere, Payneham,
                  Magill, St Peters, Norwood, Kensington, Burnside
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Onkaparinga corridor:</strong> McLaren Vale, Willunga, Old Noarlunga,
                  Christie&apos;s Beach, Seaford, McLaren Flat, Morphett Vale
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Gawler River (north):</strong> Two Wells, Lewiston, Angle Vale, Hewett,
                  Gawler, Munno Para
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Barossa Valley (heritage):</strong> Tanunda, Angaston, Nuriootpa —
                  specialist heritage stone and lime plaster restoration
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner Adelaide:</strong> Thebarton, Torrensville, Hindmarsh, Brompton,
                  Prospect, Bowden — Category 3 contamination specialists
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>General coverage:</strong> All Adelaide metropolitan suburbs and
                  surrounding SA regions — full network available for assessment and restoration
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is the difference between flood and storm damage insurance in South Australia?',
            answer:
              "In South Australia, insurance policies distinguish between flood (river or groundwater inundation), storm (wind-driven rain, roof breach, blocked drain overflow), and stormwater runoff. Following post-2022 reforms, most Australian home insurance policies now include flood cover as standard or as an add-on — but coverage boundaries matter when lodging a claim. Adelaide properties are not subject to the ARPC Cyclone Reinsurance Pool, which applies only to Northern Australia. If your property was inundated by Torrens, Onkaparinga, or Gawler river overflow, lodge as flood. If damage was from blocked drains or overland flow during a storm, lodge as storm or stormwater damage. NRPG provides full documentation to support your insurer classification.",
          },
          {
            question: "Why is Category 3 contamination a risk in Adelaide's older suburbs?",
            answer:
              "Adelaide's older western and inner suburbs — including Thebarton, Torrensville, and Hindmarsh — have combined stormwater and sewer infrastructure. When heavy rainfall overwhelms these systems, overland flooding can carry sewage contamination into properties through ground-level openings, subfloor vents, and drainage points. Under IICRC S500:2025, any water from external sources that has contacted sewage reticulation is classified as Category 3 (grossly contaminated). This requires full strip-out of porous materials, HEPA containment, antimicrobial decontamination, and post-remediation clearance testing — drying alone is insufficient and will result in ongoing mould and health risk.",
          },
          {
            question: 'Can heritage stone properties in the Barossa Valley be restored after flooding?',
            answer:
              "Yes — but heritage stone and lime-plaster construction requires specialist restoration techniques that differ significantly from standard modern builds. Barossa Valley stone cottages in Tanunda, Angaston, and Nuriootpa are typically built from local bluestone or sandstone with lime mortar and lime plaster interiors. Standard water damage drying approaches using high-temperature dehumidifiers can cause irreversible damage to lime plaster and stone mortar joints. NRPG's Adelaide contractors with heritage property experience use controlled, lower-temperature drying protocols, specialist lime-compatible antimicrobial treatments, and heritage plasterer referrals for reinstatement. Photograph all heritage fabric before work begins — this is critical for both insurance documentation and heritage council compliance.",
          },
          {
            question: 'How much does flood damage restoration cost in Adelaide?',
            answer:
              'Flood damage restoration costs in Adelaide vary by severity, contamination category, and property construction type. Indicative 2026 costs: $5,000–$18,000 for minor subfloor or ground floor flooding (clean water, no contamination). $12,000–$50,000 for full ground floor Category 3 inundation from river overflow or stormwater contamination, including strip-out, decontamination, and structural drying. $30,000–$120,000+ for heritage stone properties in the Barossa Valley or inner Adelaide requiring specialist lime-compatible restoration and heritage fabric remediation. These are estimates — your assigned NRPG contractor provides a formal itemised scope after assessment.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Restoration Adelaide',
            href: '/storm-damage-restoration-adelaide',
            description:
              'Storm damage restoration and insurance claim support across Adelaide and SA.',
          },
          {
            title: 'Water Damage Restoration Adelaide',
            href: '/water-damage-restoration-adelaide',
            description:
              'Emergency water damage restoration for burst pipes and internal water events across Adelaide.',
          },
          {
            title: 'Mould Remediation Adelaide',
            href: '/mould-remediation-adelaide',
            description:
              'Post-flood mould remediation across Adelaide — IICRC-certified including heritage property protocols.',
          },
          {
            title: 'Flood Damage Restoration Perth',
            href: '/flood-damage-restoration-perth',
            description:
              'Flood damage restoration across Perth — Swan River and Canning River specialists.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
