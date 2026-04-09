import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Geelong | Barwon River & Corio Bay 24/7',
  description:
    'Emergency flood damage restoration across Geelong, the Barwon River catchment, and Bellarine Peninsula. IICRC S500:2025 Category 2–3 certified contractors for Barwon River flooding, Corio industrial flash floods, and Barwon Heads tidal events. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration geelong, flood damage geelong, barwon river flooding, corio flooding, barwon heads tidal flooding, norlane flood damage, geelong flood, bellarine peninsula flooding, geelong flood restoration cost',
  openGraph: {
    title: 'Flood Damage Restoration Geelong | Barwon River & Corio Bay 24/7',
    description:
      'Emergency flood damage restoration across Geelong, the Barwon River catchment, and Bellarine Peninsula. IICRC S500:2025 Category 2–3 certified contractors for Barwon River flooding, Corio industrial flash floods, and Barwon Heads tidal events.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Flood Damage Restoration')}&city=${encodeURIComponent('Geelong')}&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-geelong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-geelong/#localbusiness`,
  name: `${NAP.name} Geelong`,
  url: `${NAP.url}/flood-damage-restoration-geelong`,
  description:
    '24/7 emergency flood damage restoration across Greater Geelong, the Barwon River catchment, and Bellarine Peninsula. IICRC S500:2025 Category 2–3 certified contractor network for Barwon River flooding, Corio industrial precinct flash floods, Barwon Heads tidal flooding, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Geelong',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Geelong',
    addressRegion: 'VIC',
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
  name: 'Emergency Flood Damage Restoration Geelong',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Geelong',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Geelong to IICRC S500:2025 Category 2–3 standard. Emergency extraction, Category 3 contamination treatment, structural drying, subfloor remediation for Barwon River flooding, Corio industrial precinct flash floods, and Barwon Heads tidal flooding events.',
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
      name: 'Does home insurance cover Barwon River flooding in Geelong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Flood insurance coverage in Australia has historically been inconsistent — the Insurance Contracts Act 2012 introduced a standard definition of flood to reduce confusion, but coverage still depends on whether your individual policy includes flood as an insured peril. For properties in Barwon River flood-affected suburbs — including Barwon Grange, Thomson, and South Geelong — it is essential to confirm with your insurer whether flood (defined as the inundation of normally dry land by water escaping from a river, lake, or other natural watercourse) is included in your policy. Flood coverage is often an optional add-on rather than a standard inclusion. NRPG contractors provide IICRC S500:2025 Category 2–3 documentation meeting insurer requirements for Barwon River flood claims.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is tidal flooding at Barwon Heads covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Tidal flooding — inundation caused by storm surge and high tide combinations at the Barwon River estuary mouth — is generally classified as flood under the standard Australian insurance definition, provided flood is an included peril in your policy. Properties at Barwon Heads and Ocean Grove near the estuary are identified as being at elevated risk of tidal inundation during severe southerly storm events when storm surge coincides with high tide. Some insurers may apply specific exclusions or higher excesses for properties in identified tidal flood zones. Review your policy carefully and confirm coverage details with your insurer before a flood event occurs, rather than at the time of claim.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does flood damage restoration typically cost in Geelong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood damage restoration costs in Geelong depend on the flood category, extent of inundation, and property type. Indicative ranges: minor Barwon River flooding with limited ground floor inundation $5,000–$20,000; full ground floor Category 2–3 flood requiring contamination treatment, structural drying, subfloor remediation, and internal reinstatement $12,000–$50,000; industrial precinct properties in Corio or Norlane with subfloor and slab flooding requiring commercial-scale extraction and drying $30,000–$100,000+. All Category 2–3 scopes require full IICRC S500:2025 documentation and post-remediation clearance testing.',
      },
    },
  ],
};

export default function FloodDamageRestorationGeelongPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fdgeelong-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdgeelong-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdgeelong-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Geelong"
        subtitle="Emergency flood damage restoration across Geelong, the Barwon River catchment, and Bellarine Peninsula. IICRC S500:2025 Category 2–3 certified contractors for Barwon River flooding, Corio industrial flash floods, and Barwon Heads tidal events."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Flood Damage', href: '/services/water-damage' },
          { label: 'Geelong' },
        ]}
        sections={[
          {
            heading: 'Geelong Flood Risk — Barwon River and Corio Bay',
            body: (
              <>
                <p>
                  Greater Geelong faces flood risk from two primary sources: the Barwon River
                  catchment and low-lying coastal areas around Corio Bay. The Barwon River drains
                  a large catchment that includes Colac, Winchelsea, and the Otway Ranges. During
                  prolonged La Ni&ntilde;a rainfall events, the Barwon River catchment saturates
                  rapidly and river levels rise across the downstream Geelong suburbs of Barwon
                  Grange, Thomson, and South Geelong.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The 2022 La Ni&ntilde;a event significantly affected the Colac-Otway region and
                  elevated downstream flood risk across the Barwon catchment. Properties in the
                  Barwon River flood plain &mdash; particularly low-lying residential areas adjacent
                  to the river between South Geelong and Fyansford &mdash; are at documented risk
                  of inundation during sustained heavy rainfall events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Corio and Norlane present a distinct flood risk profile. The industrial precinct
                  is low-lying relative to Corio Bay, and the high groundwater table in these
                  suburbs means that industrial subfloors flood from groundwater infiltration during
                  winter rather than from direct surface inundation. Large-floor-area industrial
                  buildings in this precinct require commercial-scale extraction and drying
                  capability when groundwater enters slab and subfloor areas.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG contractors operate across Greater Geelong, the Barwon River catchment
                  suburbs, and the Bellarine Peninsula with 24-hour emergency response capability
                  for IICRC S500:2025 Category 2&ndash;3 flood events.
                </p>
              </>
            ),
          },
          {
            heading: 'Bellarine Peninsula Tidal Flooding',
            body: (
              <>
                <p>
                  The Bellarine Peninsula faces tidal flooding risk at two primary locations:
                  Barwon Heads and the lower Barwon River estuary. The estuary mouth at Barwon
                  Heads is exposed to storm surge from the south during severe southerly weather
                  systems. When storm surge coincides with a high tide, tidal inundation can
                  affect low-lying properties adjacent to the estuary at Barwon Heads and Ocean
                  Grove.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Tidal flood water is classified as Category 3 (black water) under IICRC
                  S500:2025 &mdash; it carries marine contaminants, estuarine bacteria, and
                  biological material that requires full contamination treatment rather than
                  standard drying. Category 3 remediation involves physical removal of
                  contaminated materials, antimicrobial treatment of structural elements,
                  post-clearance testing, and documentation that satisfies insurance requirements
                  for contaminated water inundation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Properties at the Barwon Heads estuary should confirm whether their home
                  insurance includes flood cover, as tidal inundation is classified as flood
                  under the standard Australian insurance definition. Flood coverage is often
                  an optional policy inclusion rather than a standard peril &mdash; review your
                  policy schedule before a flood event occurs.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Indicative costs for Bellarine Peninsula tidal flooding: minor inundation
                  with Category 3 contamination treatment $12,000&ndash;$35,000; full ground
                  floor inundation with subfloor remediation and internal reinstatement
                  $25,000&ndash;$60,000+.
                </p>
              </>
            ),
          },
          {
            heading: 'Geelong Areas We Cover',
            body: (
              <>
                <p>
                  Emergency IICRC S500:2025 Category 2&ndash;3 flood response across Greater
                  Geelong, the Barwon River catchment, and the Bellarine Peninsula:
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Barwon River Flood Plain:</strong> Barwon Grange, Thomson, South
                  Geelong, Fyansford
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Geelong Metro:</strong> Geelong CBD, Newtown, Belmont, Highton,
                  East Geelong
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial Precinct:</strong> Corio, Norlane, North Geelong
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bellarine Peninsula:</strong> Leopold, Ocean Grove, Barwon Heads
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Barwon Catchment:</strong> Winchelsea, Colac (extended response
                  time applies for Colac and outer catchment)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does home insurance cover Barwon River flooding in Geelong?',
            answer:
              "Flood insurance coverage in Australia has historically been inconsistent — the Insurance Contracts Act 2012 introduced a standard definition of flood to reduce confusion, but coverage still depends on whether your individual policy includes flood as an insured peril. For properties in Barwon River flood-affected suburbs — including Barwon Grange, Thomson, and South Geelong — it is essential to confirm with your insurer whether flood (defined as the inundation of normally dry land by water escaping from a river, lake, or other natural watercourse) is included in your policy. Flood coverage is often an optional add-on rather than a standard inclusion. NRPG contractors provide IICRC S500:2025 Category 2–3 documentation meeting insurer requirements for Barwon River flood claims.",
          },
          {
            question: 'Is tidal flooding at Barwon Heads covered by insurance?',
            answer:
              "Tidal flooding — inundation caused by storm surge and high tide combinations at the Barwon River estuary mouth — is generally classified as flood under the standard Australian insurance definition, provided flood is an included peril in your policy. Properties at Barwon Heads and Ocean Grove near the estuary are identified as being at elevated risk of tidal inundation during severe southerly storm events when storm surge coincides with high tide. Some insurers may apply specific exclusions or higher excesses for properties in identified tidal flood zones. Review your policy carefully and confirm coverage details with your insurer before a flood event occurs, rather than at the time of claim.",
          },
          {
            question: 'What does flood damage restoration typically cost in Geelong?',
            answer:
              'Flood damage restoration costs in Geelong depend on the flood category, extent of inundation, and property type. Indicative ranges: minor Barwon River flooding with limited ground floor inundation $5,000–$20,000; full ground floor Category 2–3 flood requiring contamination treatment, structural drying, subfloor remediation, and internal reinstatement $12,000–$50,000; industrial precinct properties in Corio or Norlane with subfloor and slab flooding requiring commercial-scale extraction and drying $30,000–$100,000+. All Category 2–3 scopes require full IICRC S500:2025 documentation and post-remediation clearance testing.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Geelong',
            href: '/water-damage-restoration-geelong',
            description: 'Emergency water damage restoration across Geelong and the Surf Coast.',
          },
          {
            title: 'Storm Damage Geelong',
            href: '/storm-damage-restoration-geelong',
            description: 'IICRC-certified storm damage restoration across Geelong and Bellarine Peninsula.',
          },
          {
            title: 'Flood Damage Restoration Melbourne',
            href: '/flood-damage-restoration-melbourne',
            description: 'IICRC Category 2–3 flood damage restoration across Melbourne.',
          },
          {
            title: 'Mould Remediation Geelong',
            href: '/mould-remediation-geelong',
            description: 'IICRC S520-certified mould remediation across Geelong and the Bellarine Peninsula.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
