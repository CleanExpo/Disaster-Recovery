import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-476: Water Damage Restoration Adelaide
 *
 * Created: 10 April 2026
 * Context: Adelaide / SA market — Mediterranean climate, winter-concentrated rainfall,
 * ageing inner-suburb infrastructure, character home stock.
 * ACL s18 compliant.
 */

export const metadata: Metadata = {
  title: 'Water Damage Restoration Adelaide | 24/7 IICRC Certified',
  description:
    'Professional water damage restoration across Adelaide and South Australia. IICRC S500:2025 certified. priority response. Burst pipes, storm flooding, insurance claim support. Lodge 24/7.',
  keywords:
    'water damage restoration adelaide, water damage adelaide, burst pipe adelaide, flood damage adelaide, water damage repair adelaide, IICRC adelaide, structural drying adelaide, insurance claim adelaide',
  openGraph: {
    title: 'Water Damage Restoration Adelaide | 24/7 Emergency Response',
    description:
      'Emergency water damage restoration across all Adelaide suburbs. IICRC S500:2025 certified. priority response. Insurance claim support.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Adelaide')}&service=water-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-adelaide`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-adelaide/#localbusiness`,
  name: `${NAP.name} Adelaide`,
  url: `${NAP.url}/water-damage-restoration-adelaide`,
  description:
    'IICRC-certified water damage restoration contractors serving all Adelaide suburbs 24/7. Water extraction, structural drying, mould prevention, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Adelaide', containedInPlace: { '@type': 'State', name: 'South Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Adelaide', addressRegion: 'SA', addressCountry: 'AU' },
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
  name: 'Water Damage Restoration Adelaide',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Adelaide' },
  serviceType: 'Water Damage Restoration',
  description:
    'Professional water damage restoration in Adelaide: emergency water extraction, structural drying to IICRC S500:2025, mould prevention, contents protection, and full insurance claim documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
  lastReviewed: '2026-04-09',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly should water damage be treated in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Within 24\u201348 hours. Adelaide\u2019s dry-summer climate means affected materials can begin secondary damage cycles quickly \u2014 clay soils shrink and shift, and mould can establish in wall cavities within 48 hours once winter moisture is present. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does my SA home insurance cover burst pipe damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Most SA standard home and contents policies cover sudden and accidental water damage from burst pipes. However, gradual leaks or damage attributed to lack of maintenance are typically excluded. NRPG documents the sudden nature of pipe failures \u2014 including clay soil movement as a contributing cause \u2014 to support your claim.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are Adelaide character homes harder to dry after water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Sandstone and bluestone construction used in many inner-Adelaide character homes is highly porous and absorbs water differently to modern cavity-brick or timber-frame construction. Heritage plasterwork must be dried slowly to avoid cracking. NRPG technicians are trained in heritage building water damage restoration and use low-temperature drying protocols.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does water damage restoration cost in Adelaide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Water damage restoration in Adelaide ranges from approximately $2,500 for a minor burst pipe loss to $50,000+ for a category 3 sewage or flood inundation. The Disaster Recovery platform charges a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency works.",
      },
    },
  ],
};

export default function WaterDamageRestorationAdelaidePage() {
  return (
    <>
      <Script
        id="wdrade-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="wdrade-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="wdrade-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Adelaide"
        subtitle="Emergency water damage restoration across all Adelaide suburbs and South Australia. IICRC S500:2025 certified technicians. priority response, 24 hours a day."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Adelaide' },
        ]}
        sections={[
          {
            heading: 'Adelaide Water Damage Risk',
            body: (
              <>
                <p>
                  Adelaide has a Mediterranean climate characterised by dry summers and wet winters, with
                  approximately 550 mm of annual rainfall concentrated between June and August. While lower than
                  east-coast capitals, this seasonal concentration means a significant volume of water falls in a
                  short window — overwhelming stormwater infrastructure and saturating soils that have been dry
                  for months.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Torrens and Onkaparinga river catchments span large sections of the metro area, and catchment
                  events during heavy winter storms can produce rapid inundation of low-lying suburbs. The Adelaide
                  Hills face fast-moving runoff that channels into creek systems and reaches metro Adelaide within
                  hours of a storm event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Inner-suburb infrastructure presents a particular risk: ageing clay or cast-iron pipes in
                  pre-1970s housing stock are highly susceptible to burst events. Adelaide&apos;s reactive clay soils
                  expand significantly in winter and shrink in dry summers, placing cyclical stress on buried
                  pipework that can lead to sudden failures without warning.
                </p>
              </>
            ),
          },
          {
            heading: 'Common Water Damage Causes in Adelaide',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Burst pipes:</strong> Adelaide&apos;s reactive clay soils move significantly between
                    wet winters and dry summers, placing repeated stress on older copper, clay, and cast-iron
                    pipes in inner-suburb character homes. Sudden failures are common after the first significant
                    winter rains.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Roof leaks from winter storms:</strong> Ageing terracotta tile roofs common on
                    pre-1960s homes can crack or shift during heavy storms, allowing water ingress into ceiling
                    cavities and wall frames.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Appliance failures:</strong> Dishwasher, washing machine, and hot water unit failures
                    are a leading cause of category 1 water damage across all Adelaide property types.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Subfloor moisture from poor drainage:</strong> Poor drainage beneath the suspended
                    timber floors of sandstone and bluestone cottages — common across Norwood, Unley, Parkside,
                    and Prospect — creates persistent subfloor dampness that migrates upward into floorboards and
                    wall bases.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Water Damage Cost Estimates — Adelaide 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Burst pipe or appliance overflow (Cat 1):</strong> $2,500–$10,000. Emergency water
                    extraction, structural drying, plasterboard and flooring repair.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm water ingress (Cat 2):</strong> $4,000–$18,000. Moisture mapping, commercial
                    dehumidification, antimicrobial treatment, structural repairs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Sewage or floodwater inundation (Cat 3):</strong> $12,000–$50,000+. Full
                    decontamination, subfloor treatment, and restoration to pre-loss condition.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Adelaide Suburbs We Cover',
            body: (
              <>
                <p>priority emergency response across Greater Adelaide:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner / CBD:</strong> Adelaide CBD, North Adelaide, Norwood, Unley, Mitcham, Glenelg,
                  Parkside, Prospect, Kensington, Fullarton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Elizabeth, Salisbury, Para Hills, Modbury, Tea Tree Gully,
                  Golden Grove, Mawson Lakes, Pooraka
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Noarlunga, Morphett Vale, Reynella, Hallett Cove, Seaford,
                  Christies Beach, Hackham, Woodcroft
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Hills:</strong> Stirling, Aldgate, Bridgewater, Mount Barker, Crafers, Blackwood,
                  Belair
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western / Port:</strong> Port Adelaide, Semaphore, Le Fevre Peninsula, Largs Bay, Exeter,
                  Peterhead
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly should water damage be treated in Adelaide?',
            answer:
              "Within 24–48 hours. Adelaide's dry-summer climate means affected materials can begin secondary damage cycles quickly — clay soils shrink and shift, and mould can establish in wall cavities within 48 hours once winter moisture is present. Lodge at disasterrecovery.com.au/claim for priority emergency dispatch.",
          },
          {
            question: 'Does my SA home insurance cover burst pipe damage?',
            answer:
              "Most SA standard home and contents policies cover sudden and accidental water damage from burst pipes. However, gradual leaks or damage attributed to lack of maintenance are typically excluded. NRPG documents the sudden nature of pipe failures — including clay soil movement as a contributing cause — to support your claim.",
          },
          {
            question: 'Are Adelaide character homes harder to dry after water damage?',
            answer:
              'Yes. Sandstone and bluestone construction used in many inner-Adelaide character homes is highly porous and absorbs water differently to modern cavity-brick or timber-frame construction. Heritage plasterwork must be dried slowly to avoid cracking. NRPG technicians are trained in heritage building water damage restoration and use low-temperature drying protocols.',
          },
          {
            question: 'How much does water damage restoration cost in Adelaide?',
            answer:
              'Water damage restoration in Adelaide ranges from approximately $2,500 for a minor burst pipe loss to $50,000+ for a category 3 sewage or flood inundation. The Disaster Recovery platform charges a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency works.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Flood Damage Restoration Adelaide',
            href: '/flood-damage-restoration-adelaide',
            description: 'Torrens and Onkaparinga catchment flooding specialists.',
          },
          {
            title: 'Mould Remediation Adelaide',
            href: '/mould-remediation-adelaide',
            description: 'IICRC S520-certified mould remediation for Adelaide properties.',
          },
          {
            title: 'Water Damage Restoration Melbourne',
            href: '/water-damage-restoration-melbourne',
            description: 'Our Melbourne water damage restoration service.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
