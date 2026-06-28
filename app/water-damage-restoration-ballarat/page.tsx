import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-476: Water Damage Restoration Ballarat
 *
 * Created: 10 April 2026
 * Context: Ballarat — Victoria's largest inland city, high heritage building stock,
 * alpine climate with burst pipe and roof loading risk in winter.
 * ACL s18 compliant. ARPC Cyclone Pool does NOT apply to VIC.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Ballarat | 24/7 IICRC Certified',
  description: 'Professional water damage restoration across Ballarat and regional Victoria. IICRC S500:2025 certified. priority response. Burst pipes, storm flooding, heritage restoration. Lodge 24/7.',
  keywords: 'water damage restoration ballarat, water damage ballarat, burst pipe ballarat, flood damage ballarat, heritage restoration ballarat, IICRC ballarat, water damage repair ballarat, structural drying ballarat',
  openGraph: {
    title: 'Water Damage Restoration Ballarat | 24/7 Emergency Response',
    description: 'Emergency water damage restoration across Ballarat and regional Victoria. IICRC S500:2025 certified. priority response. Heritage building specialists.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Ballarat')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-ballarat`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-ballarat/#localbusiness`,
  name: `${NAP.name} Ballarat`,
  url: `${NAP.url}/water-damage-restoration-ballarat`,
  description: 'IICRC-certified water damage restoration contractors serving Ballarat and regional Victoria 24/7. Water extraction, structural drying, heritage material restoration, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Ballarat', containedInPlace: { '@type': 'State', name: 'Victoria' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Ballarat', addressRegion: 'VIC', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration Ballarat',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Ballarat' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Ballarat: emergency water extraction, structural drying to IICRC S500:2025, heritage material treatment, mould prevention, and full insurance claim documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does cold weather affect water damage in Ballarat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Ballarat's cold winters create several distinct water damage risks. Freezing temperatures cause burst pipes as water expands inside uninsulated pipe runs — common in older Victorian-era homes. Heavy snowfall loads can stress and breach ageing roofs, allowing water ingress into ceiling cavities. Cold, damp conditions also slow the natural evaporation rate, meaning hidden moisture in wall cavities and subfloor persists far longer than in warmer climates. IICRC-certified drying protocols account for ambient temperature and humidity when calculating drying times.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover heritage restoration costs in Ballarat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Standard building insurance policies cover restoration to pre-loss condition, which for heritage properties means like-for-like replacement of heritage materials. Bluestone, heritage plasterwork, Baltic pine floors, and Federation-era joinery can significantly increase scope costs compared to modern equivalents. Insurers may attempt to substitute modern materials — NRPG provides IICRC-certified documentation and heritage material assessments to support full like-for-like reinstatement claims. Heritage council planning requirements may also apply, which NRPG factors into the restoration scope.",
      },
    },
    {
      '@type': 'Question',
      name: 'What causes most water damage in Ballarat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The most common causes of water damage in Ballarat are burst pipes during winter freeze events (particularly in properties with older or uninsulated pipe runs), roof failure from snow loading or storm damage, and stormwater ingress during Ballarat's cold wet winters when annual rainfall exceeds 650mm. Older heritage homes with slate or terracotta tile roofs are particularly susceptible to water ingress from displaced or cracked tiles. Subfloor flooding from saturated ground is also common in lower-lying areas.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Ballarat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Water damage restoration in Ballarat ranges from approximately $2,500 for a minor burst pipe (Category 1) up to $50,000+ for Category 3 sewage or floodwater inundation. Heritage properties typically add 30–50% to standard restoration costs due to the specialist materials and techniques required. The Disaster Recovery platform charges a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency works.",
      },
    },
  ],
};

export default function WaterDamageRestorationBallaratPage() {
  return (
    <>
      <Script id="wdrblt-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrblt-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="wdrblt-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Ballarat"
        subtitle="Emergency water damage restoration across Ballarat and regional Victoria. IICRC S500:2025 certified technicians. priority response, 24 hours a day. Heritage building specialists."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Ballarat' },
        ]}
        sections={[
          {
            heading: 'Ballarat Water Damage Risk',
            body: (
              <>
                <p>
                  Ballarat&apos;s alpine climate brings cold, wet winters with annual rainfall exceeding 650 mm and
                  significant snowfall events that create roof loading pressure on ageing structures. Victoria&apos;s
                  largest inland city outside Melbourne carries a substantial heritage building stock — Victorian-era
                  bluestone and brick construction that was not designed to accommodate modern waterproofing expectations.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Winter freeze events pose a particular risk. Uninsulated pipe runs in older homes are vulnerable to
                  bursting as water expands inside supply lines during overnight frosts. Heavy snowfall can load and
                  displace roof tiles or stress ageing slate, allowing water ingress into ceiling cavities that spreads
                  into wall framing before it is detected. Cold ambient temperatures also slow natural drying rates,
                  meaning water trapped in subfloor and wall cavities can persist for weeks without professional
                  intervention.
                </p>
              </>
            ),
          },
          {
            heading: 'Heritage Building Restoration in Ballarat',
            body: (
              <>
                <p>
                  An extensive heritage overlay covers much of central Ballarat, encompassing significant residential
                  and commercial precincts. Victorian-era bluestone walls, heritage plasterwork, Baltic pine and
                  hardwood timber floors, and Federation-style joinery features require specialist restoration
                  treatment that differs substantially from modern construction methods.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  NRPG contractors apply IICRC S500:2025 drying protocols adapted for heritage porous materials.
                  Bluestone has different moisture absorption and release characteristics to modern concrete block;
                  traditional lime plaster responds differently to forced-air drying than contemporary plasterboard.
                  Getting this wrong can cause irreversible damage — salt crystallisation in bluestone, delamination
                  of heritage render, and cupping or cracking of heritage timber floors.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Heritage council planning requirements may also apply to reinstatement works. NRPG provides
                  documentation aligned with like-for-like reinstatement obligations and supports insurer negotiations
                  for full heritage-compliant scope approval.
                </p>
              </>
            ),
          },
          {
            heading: 'Water Damage Cost Estimates — Ballarat 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipe or appliance overflow (Cat 1):</strong> $2,500–$10,000. Water extraction,
                    drying, plasterboard and flooring repair.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress (Cat 2):</strong> $4,500–$18,000. Moisture mapping, commercial
                    drying, antimicrobial treatment, structural repairs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Sewage or floodwater inundation (Cat 3):</strong> $12,000–$50,000+. Decontamination,
                    subfloor treatment, full restoration to pre-loss condition.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Heritage restoration premium:</strong> 30–50% above standard scope costs for
                    like-for-like reinstatement of heritage materials, specialist techniques, and heritage
                    council compliance.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Ballarat Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across Ballarat and the surrounding region:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Ballarat:</strong> Ballarat CBD, Ballarat East, Ballarat Central, Wendouree,
                  Sebastopol
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Outer Ballarat:</strong> Delacombe, Canadian, Mount Clear, Alfredton, Lucas
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Regional:</strong> Creswick, Daylesford, Clunes, Beaufort, Skipton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Ararat Corridor:</strong> Ararat and surrounding townships within the extended
                  service area
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How does cold weather affect water damage in Ballarat?',
            answer: "Ballarat's cold winters create several distinct water damage risks. Freezing temperatures cause burst pipes as water expands inside uninsulated pipe runs — common in older Victorian-era homes. Heavy snowfall loads can stress and breach ageing roofs, allowing water ingress into ceiling cavities. Cold, damp conditions also slow the natural evaporation rate, meaning hidden moisture in wall cavities and subfloor persists far longer than in warmer climates. IICRC-certified drying protocols account for ambient temperature and humidity when calculating drying times.",
          },
          {
            question: 'Does insurance cover heritage restoration costs in Ballarat?',
            answer: "Standard building insurance policies cover restoration to pre-loss condition, which for heritage properties means like-for-like replacement of heritage materials. Bluestone, heritage plasterwork, Baltic pine floors, and Federation-era joinery can significantly increase scope costs compared to modern equivalents. Insurers may attempt to substitute modern materials — NRPG provides IICRC-certified documentation and heritage material assessments to support full like-for-like reinstatement claims.",
          },
          {
            question: 'What causes most water damage in Ballarat?',
            answer: "The most common causes of water damage in Ballarat are burst pipes during winter freeze events, roof failure from snow loading or storm damage, and stormwater ingress during Ballarat's cold wet winters (650mm+ annual rainfall). Older heritage homes with slate or terracotta tile roofs are particularly susceptible to water ingress from displaced or cracked tiles. Subfloor flooding from saturated ground is also common in lower-lying areas.",
          },
          {
            question: 'How much does water damage restoration cost in Ballarat?',
            answer: "Water damage restoration in Ballarat ranges from approximately $2,500 for a minor burst pipe (Category 1) up to $50,000+ for Category 3 sewage or floodwater inundation. Heritage properties typically add 30–50% to standard restoration costs due to the specialist materials and techniques required. The Disaster Recovery platform charges a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency works.",
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Melbourne', href: '/water-damage-restoration-melbourne', description: 'Our Melbourne water damage restoration service.' },
          { title: 'Water Damage Restoration Geelong', href: '/water-damage-restoration-geelong', description: 'Our Geelong water damage restoration service.' },
          { title: 'Mould Remediation Melbourne', href: '/mould-remediation-melbourne', description: 'Prevent and remediate mould after water damage in Melbourne and regional Victoria.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
