import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-479: Water Damage Restoration Hobart
 *
 * Created: 9 April 2026
 * Context: Hobart is exposed to intense Southern Ocean winter fronts bringing
 * 50–100mm in 24 hours. Colonial-era sandstone and brick construction requires
 * specialist lime-compatible drying. Derwent River flooding corridor affects
 * New Norfolk, Boyer, and Bridgewater. Subfloor flooding is endemic in older
 * properties with low-clearance, unprotected subfloors.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Hobart | 24/7 IICRC Certified',
  description:
    'Professional water damage restoration across all Hobart suburbs. IICRC S500:2025 certified contractors. Specialist lime-compatible drying for heritage sandstone properties. Derwent River flooding support. Lodge your claim 24/7.',
  keywords:
    'water damage restoration hobart, water damage hobart, flood damage hobart, burst pipe hobart, water damage tasmania, derwent flooding hobart, heritage water damage hobart, sandstone water damage hobart',
  openGraph: {
    title: 'Water Damage Restoration Hobart | 24/7 Emergency Response',
    description:
      'Emergency water damage restoration across all Hobart suburbs. IICRC S500:2025 certified. Specialist heritage sandstone drying. Derwent River flooding support.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Hobart')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-hobart`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-hobart/#localbusiness`,
  name: `${NAP.name} Hobart`,
  url: `${NAP.url}/water-damage-restoration-hobart`,
  description:
    'IICRC-certified water damage restoration contractors serving all Hobart suburbs 24/7. Specialist heritage sandstone and lime-compatible drying. Water extraction, structural drying, mould prevention, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Hobart',
    containedInPlace: { '@type': 'State', name: 'Tasmania' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hobart',
    addressRegion: 'TAS',
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
  name: 'Water Damage Restoration Hobart',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Hobart' },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration in Hobart: emergency water extraction, structural drying to IICRC S500:2025, specialist heritage sandstone and lime-compatible drying, mould prevention, and full insurance claim documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does home insurance cover water damage in Tasmania?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Water damage caused by sudden, accidental events — burst pipes, appliance overflow, storm-driven water ingress through a breached roof — is generally covered under standard Tasmanian home and contents policies. Gradual water damage or damage caused by a lack of maintenance is typically excluded. For heritage properties, the specialist drying and lime-compatible treatment required for sandstone and brick construction can be included in the claim scope where the underlying cause is a covered event. NRPG documents restoration to IICRC S500:2025 standard for insurer submission. Note: the ARPC Cyclone Pool does not apply to Hobart; standard private insurance applies.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is heritage sandstone water damage covered by insurance in Hobart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, where the cause of water damage is a covered event, the specialist drying scope required for sandstone properties is part of the restoration cost and should be included in the claim. Sandstone and lime mortar require low-temperature, slower drying profiles — aggressive structural drying applied at temperatures suitable for modern construction can cause spalling and mortar damage in sandstone properties. NRPG contractors experienced in Hobart heritage work apply the appropriate drying methodology and document it for insurer review.",
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly do I need to act after water damage in Hobart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Within 24–48 hours where possible. Hobart's cool, damp climate means water-affected materials dry slowly without mechanical intervention — subfloor timbers and lime plaster can remain saturated for weeks in Hobart's winter temperatures. Mould typically establishes within 48–72 hours in these conditions. The longer water remains in wall cavities and subfloor spaces, the more extensive and costly the damage. Lodge at disasterrecovery.com.au/claim for immediate dispatch.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Hobart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs depend on the extent and category of damage. Minor burst pipe or roof leak: $2,000–$10,000. Structural drying and internal repairs: $5,000–$25,000. Sandstone or heritage property full water damage restoration: $15,000–$60,000+. Where damage is caused by a covered insurance event, the restoration scope and cost is documented to IICRC S500:2025 standard for insurer submission.',
      },
    },
  ],
};

export default function WaterDamageRestorationHobartPage() {
  return (
    <>
      <Script
        id="wdrhbt-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdrhbt-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdrhbt-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Hobart"
        subtitle="Emergency water damage restoration across all Hobart suburbs and the Derwent Valley. IICRC S500:2025 certified technicians. Specialist heritage sandstone and lime-compatible drying. 24/7 response."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Hobart' },
        ]}
        sections={[
          {
            heading: 'Water Damage in Hobart — Winter Fronts and the Derwent',
            body: (
              <>
                <p>
                  Hobart&apos;s position at 42°S exposes it to Southern Ocean low-pressure systems with
                  minimal geographical buffering. Winter fronts — particularly between June and August —
                  routinely deliver 50–100mm of rainfall in 24 hours across the greater Hobart area.
                  In older stone and brick construction, this rainfall does not run off as it would from
                  a modern render-clad surface: it penetrates the building fabric, saturating internal
                  wall surfaces and cavity spaces.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Derwent River flooding corridor is a distinct and recurring water damage risk for
                  properties in New Norfolk, Boyer, and Bridgewater — approximately 30–45km north of
                  Hobart CBD. New Norfolk floods regularly in major rainfall events; properties in low-lying
                  areas along the Derwent catchment are at ongoing risk from fluvial flooding that can
                  inundate ground floors, subfloors, and outbuildings without warning.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In inner Hobart, subfloor flooding is endemic in pre-1950 housing stock. Many older
                  Hobart homes have low-clearance subfloors — sometimes only 300–400mm of clearance
                  between the ground and floor joists — with no waterproofing membrane or subfloor
                  ventilation adequate for sustained winter rain. Water accumulates under these homes
                  after extended wet periods, saturating floor joists, bearers, and any insulation
                  batts present. In Hobart&apos;s cool temperatures, this moisture does not naturally
                  evaporate between rain events, and mould follows within days.
                </p>
              </>
            ),
          },
          {
            heading: 'Heritage Sandstone and Specialist Drying',
            body: (
              <>
                <p>
                  Water damage in Hobart&apos;s heritage sandstone and colonial brick properties requires
                  a fundamentally different drying approach to modern construction. Sandstone is a
                  highly porous material: it absorbs water readily and holds it deep within its structure.
                  Lime mortar — used in all pre-1900 construction — is also moisture-sensitive. Aggressive
                  structural drying methods appropriate for modern plasterboard and lightweight framing
                  can cause spalling and mortar damage in sandstone properties if applied incorrectly.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The correct approach is a lower-temperature, extended drying profile that draws
                  moisture out of sandstone and lime materials without thermal shock. NRPG contractors
                  experienced in Hobart heritage properties apply drying equipment calibrated to heritage
                  material requirements, with psychrometric monitoring throughout the drying process.
                  This documentation is produced to IICRC S500:2025 standard for insurer review — critical
                  for properties where the heritage drying scope is materially more expensive than
                  standard structural drying.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Battery Point, Salamanca, and the heritage precincts of South Hobart and North Hobart
                  contain a high concentration of properties requiring this approach. Where Heritage
                  Tasmania guidelines apply — which they do across most of these areas — all restoration
                  work must comply with heritage overlay requirements, and NRPG coordinates with the
                  relevant authorities where structural repairs are required following water damage.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Moisture mapping across the full water pathway — including internal stone and brick
                    cavities — before drying commences
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Heritage-calibrated drying profiles: lower temperature, extended duration, continuous
                    psychrometric monitoring
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Subfloor extraction and drying for low-clearance Hobart subfloors
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    IICRC S500:2025 compliant documentation for insurer submission
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Mould prevention treatment applied during drying to prevent secondary mould
                    colonisation in Hobart&apos;s cold, damp conditions
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Hobart Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  24/7 emergency response across the greater Hobart area, the Channel, and the Derwent
                  Valley:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Heritage / Inner City:</strong> Hobart CBD, Battery Point, Salamanca, Sandy Bay,
                  South Hobart, West Hobart
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Sandy Bay, Dynnyrne, Lower Sandy Bay
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Glenorchy, Moonah, Derwent Park, Claremont
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Channel Area:</strong> Kingston, Blackmans Bay, Taroona
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Derwent Valley (flooding corridor):</strong> New Norfolk, Boyer, Bridgewater
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does home insurance cover water damage in Tasmania?',
            answer:
              "Water damage caused by sudden, accidental events — burst pipes, appliance overflow, storm-driven water ingress — is generally covered under standard Tasmanian home and contents policies. Gradual water damage or maintenance-related damage is typically excluded. For heritage properties, specialist drying and lime-compatible treatment can be included in the claim scope where the underlying cause is a covered event. NRPG documents to IICRC S500:2025 standard. Note: the ARPC Cyclone Pool does not apply to Hobart; standard private insurance applies.",
          },
          {
            question: 'Is heritage sandstone water damage covered by insurance in Hobart?',
            answer:
              "Yes, where the cause is a covered event, the specialist drying scope for sandstone properties is part of the restoration cost and should be included in the claim. Sandstone and lime mortar require low-temperature, slower drying profiles — aggressive structural drying appropriate for modern construction can cause spalling and mortar damage in sandstone properties. NRPG contractors apply the correct methodology and document it for insurer review.",
          },
          {
            question: 'How quickly do I need to act after water damage in Hobart?',
            answer:
              "Within 24–48 hours where possible. Hobart's cool, damp climate means water-affected materials dry very slowly without mechanical intervention — subfloor timbers and lime plaster can remain saturated for weeks in winter temperatures. Mould typically establishes within 48–72 hours in these conditions. The longer water remains in wall cavities and subfloor spaces, the more extensive and costly the damage. Lodge at disasterrecovery.com.au/claim for immediate dispatch.",
          },
          {
            question: 'How much does water damage restoration cost in Hobart?',
            answer:
              'Costs depend on the extent and category of damage. Minor burst pipe or roof leak: $2,000–$10,000. Structural drying and internal repairs: $5,000–$25,000. Sandstone or heritage property full water damage restoration: $15,000–$60,000+. Where damage is caused by a covered insurance event, the restoration scope and cost is documented to IICRC S500:2025 standard for insurer submission.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Restoration Hobart',
            href: '/storm-damage-restoration-hobart',
            description: 'Storm damage restoration and insurance claim support across Hobart.',
          },
          {
            title: 'Mould Remediation Hobart',
            href: '/mould-remediation-hobart',
            description: 'IICRC-certified mould remediation for Hobart heritage and residential properties.',
          },
          {
            title: 'Water Damage Restoration Melbourne',
            href: '/water-damage-restoration-melbourne',
            description: 'Our Melbourne water damage restoration service.',
          },
          {
            title: 'Flood Damage Restoration Melbourne',
            href: '/flood-damage-restoration-melbourne',
            description: 'Emergency flood damage restoration across Melbourne.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
