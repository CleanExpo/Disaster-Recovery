import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Newcastle | Hail, Wind & ECL Repairs 24/7',
  description: 'Emergency storm damage restoration across Newcastle and the Hunter Valley. IICRC-certified contractors for east coast low damage, hail damage, roof repairs, Hunter River flooding, and structural make-safe. 24/7 response.',
  keywords: 'storm damage restoration newcastle, storm damage newcastle, hail damage newcastle, east coast low damage newcastle, hunter valley flooding, wind damage newcastle, roof damage newcastle, storm restoration hunter valley',
  openGraph: {
    title: 'Storm Damage Restoration Newcastle | Hail, Wind & ECL Repairs 24/7',
    description: 'Emergency storm damage restoration across Newcastle and the Hunter Valley. IICRC-certified contractors for east coast low damage, hail damage, roof repairs, Hunter River flooding, and structural make-safe. 24/7 response.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Newcastle')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-newcastle`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-newcastle/#localbusiness`,
  name: `${NAP.name} Newcastle`,
  url: `${NAP.url}/storm-damage-restoration-newcastle`,
  description: '24/7 emergency storm damage restoration across Newcastle and the Hunter Valley. IICRC-certified contractor network for east coast low damage, hail damage, wind damage, roof repairs, and structural make-safe.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Newcastle', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Newcastle', addressRegion: 'NSW', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Newcastle',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Newcastle', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration across Newcastle and the Hunter Valley including emergency make-safe, roof tarping, hail damage repair, east coast low structural damage, flood damage restoration, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does east coast low damage get treated differently to cyclone damage for Newcastle insurance claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool applies only to designated cyclone risk zones, which do not include Newcastle or the Hunter region. Standard home insurance policies in Newcastle cover storm and wind damage from east coast lows under the storm peril. The cyclone excess provisions do not apply. Lodge your Newcastle ECL claim as a storm or wind event — not a cyclone — and ensure your full scope is documented by an IICRC-certified contractor before sign-off.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is hail damage specifically covered by home insurance in Newcastle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Hail impact damage to roof tiles, Colorbond sheeting, skylights, gutters, and external cladding is covered under the storm damage provision of most standard Australian home insurance policies. After the 2007 Hunter supercell event, many Newcastle properties with older terracotta tile roofs were found to have hairline fractures that caused leaks months later. Request an IICRC-certified full scope inspection before accepting the insurer\'s initial assessment — incomplete scope at lodgement is the primary cause of underpaid hail claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover Hunter River flooding for properties in Maitland or East Maitland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood coverage depends on your specific policy and whether your insurer defines the event as flood (rising water from a watercourse) or storm (direct rainfall and runoff). Many properties in Maitland, East Maitland, and Morpeth have been repeatedly affected by Hunter River flooding — the June 2021 floods were the worst since 1955. Check your PDS carefully for the flood vs. storm distinction. Properties in designated flood-prone areas may have a higher flood excess or exclusion. NRPG provides IICRC-certified documentation to support claims regardless of how your insurer classifies the water source.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does storm damage restoration cost in Newcastle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Storm damage restoration costs in Newcastle depend on the severity and type of damage. Standard structural storm repairs (damaged roofing, gutters, minor water ingress) typically range from $2,500 to $15,000. Properties with hail damage combined with water ingress — common in Newcastle\'s exposed coastal and inner suburbs — range from $8,000 to $40,000. Severe east coast low events causing near-total structural loss, particularly in heritage terrace homes in Cooks Hill, Hamilton, or Islington, or in flood-affected Hunter Valley properties, can reach $20,000 to $100,000 or more. These costs are typically covered by home and contents insurance subject to policy terms and excess.',
      },
    },
  ],
};

export default function StormDamageRestorationNewcastlePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrnewc-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrnewc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="sdrnewc-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Newcastle"
        subtitle="Emergency storm damage restoration across Newcastle, the Hunter Valley, and Lake Macquarie. IICRC-certified contractors for east coast low damage, hail, roof failures, and Hunter River flooding. 24-hour response."
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Newcastle' },
        ]}
        sections={[
          {
            heading: "Newcastle Storm Risk \u2014 East Coast Lows and Hunter Flooding",
            body: (
              <>
                <p>
                  Newcastle sits at one of Australia&apos;s most storm-exposed positions on the Pacific coast. East coast
                  lows (ECLs) &mdash; the intense low-pressure systems that form offshore and track up the NSW coastline
                  &mdash; bring 100km/h+ sustained winds and rainfall events exceeding 200mm in 24 hours. Unlike
                  tropical cyclones, ECLs can persist for multiple days, generating prolonged structural loading on
                  roofs, facades, and drainage systems.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Newcastle&apos;s coastal position on the Pacific Ocean means the city faces direct storm swell
                  exposure at Nobbys Beach, Bar Beach, and Merewether. Seaspray and salt-laden wind accelerate
                  corrosion of roofing fixings and gutters &mdash; damage that is often invisible until an ECL
                  exposes compromised elements. IICRC S500:2025 and S700:2025 standards govern the water damage
                  and storm restoration work carried out by NRPG-network contractors in the region.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Beyond coastal exposure, the Hunter River catchment creates significant inland flood risk after
                  major ECL events. The June 2021 Hunter floods were the worst since 1955, inundating Maitland,
                  East Maitland, and Morpeth for multiple days. The 2015 Dungog and Hunter Valley flooding &mdash;
                  triggered by an ECL that killed four people &mdash; left the Williams River and Hunter River
                  corridors devastated. Properties in Cessnock and Kurri Kurri face combined flash flooding and
                  wind damage during major storm events.
                </p>
              </>
            ),
          },
          {
            heading: "The 2007 Hailstorm and Newcastle\u2019s ECL History",
            body: (
              <>
                <p>
                  The April 2007 Newcastle and Hunter supercell hailstorm produced AU$1.7 billion in insured losses
                  &mdash; the largest east-coast hailstorm event recorded at that time. Large hail tracked across
                  inner Newcastle suburbs including Hamilton, Cooks Hill, and the Newcastle CBD, fracturing terracotta
                  tiles, shattering skylights, and denting metal roofing and gutters across thousands of properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Newcastle&apos;s heritage housing stock amplifies storm vulnerability. Victorian-era terrace homes
                  in Cooks Hill, Hamilton, Islington, and Georgetown feature original plaster ceilings, timber
                  framing, and older roofing systems that are more susceptible to hail fractures and water ingress
                  than contemporary construction. Sustained moisture from a compromised roof in Newcastle&apos;s
                  humid coastal climate can cause plaster collapse, structural timber decay, and rapid mould
                  establishment within weeks.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The port industrial suburbs &mdash; Mayfield, Carrington, Wickham, and Tighes Hill &mdash; contain
                  large-span industrial buildings and warehouses with complex storm damage profiles: wide metal roof
                  sheeting prone to fastener failure, large uninsulated roof sections that accelerate interior water
                  damage, and heritage structures with corrugated iron subject to corrosion fatigue. NRPG contractors
                  are experienced in both residential and commercial storm damage assessment across the Newcastle region.
                </p>
              </>
            ),
          },
          {
            heading: 'Newcastle Suburbs We Cover',
            body: (
              <>
                <p>24-hour emergency storm response across the Newcastle and Hunter region:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Newcastle:</strong> Newcastle CBD, Newcastle West, Cooks Hill, Hamilton, Islington,
                  Georgetown
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Port Industrial:</strong> Mayfield, Carrington, Tighes Hill, Wickham
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner Southern:</strong> Merewether, Bar Beach, Adamstown, New Lambton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hunter Valley:</strong> Maitland, East Maitland, Cessnock, Kurri Kurri, Morpeth
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Lake Macquarie:</strong> Charlestown, Warners Bay, Belmont, Swansea
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor
                  matching across any Newcastle or Hunter Valley suburb.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does east coast low damage get treated differently to cyclone damage for Newcastle insurance claims?',
            answer: 'Yes. The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool applies only to designated cyclone risk zones, which do not include Newcastle or the Hunter region. Standard home insurance policies in Newcastle cover storm and wind damage from east coast lows under the storm peril. The cyclone excess provisions do not apply. Lodge your Newcastle ECL claim as a storm or wind event — not a cyclone — and ensure your full scope is documented by an IICRC-certified contractor before sign-off.',
          },
          {
            question: 'Is hail damage specifically covered by home insurance in Newcastle?',
            answer: "Yes. Hail impact damage to roof tiles, Colorbond sheeting, skylights, gutters, and external cladding is covered under the storm damage provision of most standard Australian home insurance policies. After the 2007 Hunter supercell event, many Newcastle properties with older terracotta tile roofs were found to have hairline fractures that caused leaks months later. Request an IICRC-certified full scope inspection before accepting the insurer's initial assessment — incomplete scope at lodgement is the primary cause of underpaid hail claims.",
          },
          {
            question: 'Does home insurance cover Hunter River flooding for properties in Maitland or East Maitland?',
            answer: "Flood coverage depends on your specific policy and whether your insurer defines the event as flood (rising water from a watercourse) or storm (direct rainfall and runoff). Many properties in Maitland, East Maitland, and Morpeth have been repeatedly affected by Hunter River flooding — the June 2021 floods were the worst since 1955. Check your PDS carefully for the flood vs. storm distinction. Properties in designated flood-prone areas may have a higher flood excess or exclusion. NRPG provides IICRC-certified documentation to support claims regardless of how your insurer classifies the water source.",
          },
          {
            question: 'What does storm damage restoration cost in Newcastle?',
            answer: "Storm damage restoration costs in Newcastle depend on the severity and type of damage. Standard structural storm repairs typically range from $2,500 to $15,000. Properties with hail damage combined with water ingress range from $8,000 to $40,000. Severe east coast low events causing near-total structural loss — particularly in heritage terrace homes in Cooks Hill, Hamilton, or Islington, or in flood-affected Hunter Valley properties — can reach $20,000 to $100,000 or more. These costs are typically covered by home and contents insurance subject to policy terms and excess.",
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Sydney', href: '/storm-damage-restoration-sydney', description: 'Emergency storm and hail damage restoration across all Sydney suburbs.' },
          { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney', description: 'IICRC-certified water damage restoration across Sydney and NSW.' },
          { title: 'Flood Damage Restoration Sydney', href: '/flood-damage-restoration-sydney', description: 'Flood damage restoration and insurance documentation across NSW.' },
          { title: 'Storm Damage Restoration Melbourne', href: '/storm-damage-restoration-melbourne', description: 'Storm and hail damage restoration across Melbourne and Victoria.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
