import { Metadata } from 'next';
import Script from 'next/script';
import { CloudRain } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Perth | 24/7',
  description: 'Emergency flood damage restoration in Perth. IICRC-certified contractors respond in under 60 minutes across all Perth metro suburbs. Available 24/7.',
  keywords: 'flood damage restoration perth, flood damage perth, flood cleanup perth, flood recovery perth, emergency flood restoration perth, flood damage repair perth',
  openGraph: {
    title: 'Flood Damage Restoration Perth | 24/7 Emergency Response',
    description: 'Emergency flood damage restoration in Perth. IICRC-certified contractors respond in under 60 minutes. Available 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Flood Damage Restoration')}&city=${encodeURIComponent('Perth')}&service=flood-recovery`, width: 1200, height: 630 }],
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
  description: '24/7 emergency flood damage restoration in Perth. IICRC-certified contractor network for storm flooding, river inundation, burst mains, and structural drying across all Perth metro suburbs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Perth', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Perth', addressRegion: 'WA', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Flood Damage Restoration Perth',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Perth' },
  serviceType: 'Flood Damage Restoration',
  description: 'Professional flood damage restoration in Perth including emergency water extraction, structural drying, contaminated water decontamination, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function FloodDamageRestorationPerthPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrp-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrp-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Flood Recovery"
        title="Flood Damage Restoration Perth"
        subtitle="Emergency flood damage restoration across all Perth metro suburbs. IICRC-certified contractors respond in under 60 minutes, 24 hours a day, 7 days a week."
        gradient="linear-gradient(135deg, #0C4A6E 0%, #0891B2 100%)"
        icon={<CloudRain className="h-10 w-10" />}
        lastReviewed="2026-02-27"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Flood Recovery', href: '/services/flood-recovery' },
          { label: 'Perth' },
        ]}
        sections={[
          {
            heading: 'Why Perth Properties Face Unique Flood Risks',
            body: (
              <>
                <p>
                  Perth&apos;s Mediterranean climate delivers approximately 730 mm of annual rainfall, but the vast majority
                  falls between May and September — creating intense seasonal flooding pressure across the metropolitan area.
                  When months of dry weather are followed by sustained winter downpours, Perth&apos;s predominantly sandy soils
                  become saturated quickly, leading to surface ponding, stormwater overflow, and localised flash flooding.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Properties along the Swan and Canning river corridors — including suburbs like Bassendean, Bayswater,
                  Belmont, and South Perth — sit within designated flood zones where river levels can rise rapidly after
                  heavy upstream rainfall in the Darling Range catchment. The northern coastal corridor from Joondalup to
                  Wanneroo faces recurring stormwater drainage issues, with ageing infrastructure struggling to cope with
                  intensifying rainfall events. Sandy soils throughout Perth&apos;s eastern suburbs can also cause subsidence
                  after prolonged saturation, undermining foundations and cracking slabs.
                </p>
              </>
            ),
          },
          {
            heading: 'Perth Flood Damage Restoration Cost Estimates',
            body: (
              <>
                <p>
                  Flood damage restoration costs in Perth vary based on the extent of flooding, water contamination category,
                  and the materials affected. Below are indicative costs for residential properties in 2026.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Minor flood damage (single room, clean water):</strong> $2,200–$5,000. Typical after localised
                    stormwater ingress through doors or low-set windows during winter storms.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Moderate flood damage (multiple rooms, grey water):</strong> $5,000–$12,000. Common when
                    stormwater drains back up or river levels rise into subfloor areas and ground-floor living spaces.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Severe flood damage (whole-of-home, contaminated water):</strong> $12,000–$30,000+. Required
                    when Category 3 (black water) from sewage overflow or river floodwater inundates the property,
                    necessitating full decontamination under IICRC S500 protocols.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural flood damage (foundation/slab affected):</strong> $20,000+. Perth&apos;s sandy soils
                    are prone to washout and subsidence after prolonged saturation, requiring underpinning or slab
                    remediation alongside water damage restoration.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Our platform charges a $550 platform fee plus $2,200 contractor credit ($2,750 total) to begin emergency
                  make-safe. Your assigned contractor then provides a formal contract with transparent pricing for the full
                  scope of works. Payment plans are available through{' '}
                  <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'How Our Perth Contractor Network Works',
            body: (
              <>
                <p>
                  Disaster Recovery connects you with NRPG&apos;s network of IICRC-certified flood damage restoration
                  contractors across the entire Perth metropolitan area. Every contractor in the network maintains current
                  IICRC Water Restoration Technician (WRT) certification, carries minimum $20 million public liability
                  insurance, and includes Category 3 contaminated water specialists trained in ANSI/IICRC S500-2021
                  protocols.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Lodge your claim online</strong> at{' '}
                    <a href="/claim">disasterrecovery.com.au/claim</a> — no phone calls, no waiting
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Instant contractor matching</strong> — matched to the nearest available contractor within
                    your selected radius (20–100 km)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>60-minute response</strong> — emergency make-safe begins within the hour across Perth metro
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full claims documentation</strong> — timestamped photos, moisture readings, scope of works,
                    and daily drying logs provided for your insurance reimbursement
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  We bill you directly — not your insurer. This means work begins immediately without waiting for insurer
                  approval, scope disputes, or panel contractor availability. You control the process from day one.
                </p>
              </>
            ),
          },
          {
            heading: 'Perth Suburbs We Cover',
            body: (
              <>
                <p>
                  Our contractor network covers every suburb across the Greater Perth region, from Joondalup in the north
                  to Mandurah in the south, from the CBD to the Darling Range foothills.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>CBD &amp; Inner Suburbs:</strong> Perth, Northbridge, Subiaco, Mt Lawley, Leederville, West Perth,
                  East Perth, Highgate, North Perth, Victoria Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Joondalup, Wanneroo, Stirling, Scarborough, Karrinyup, Balcatta,
                  Morley, Dianella, Osborne Park, Innaloo
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Fremantle, Rockingham, Mandurah, Cockburn, Canning Vale, Willetton,
                  Murdoch, Bull Creek, Palmyra, Melville
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Suburbs:</strong> Belmont, Bayswater, Midland, Guildford, Bassendean, Maylands, Rivervale,
                  Kalamunda, Forrestfield, High Wycombe
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Flood-Prone Areas:</strong> Swan River corridor (Bassendean, Bayswater, Belmont, South Perth),
                  Canning River corridor (Cannington, Wilson, Riverton), northern coastal drainage (Wanneroo, Joondalup),
                  and low-lying suburbs prone to stormwater ponding
                </p>
              </>
            ),
          },
          {
            heading: 'Common Perth Flood Damage Scenarios',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Winter storm flash flooding:</strong> Perth&apos;s heaviest rainfall events occur between June
                    and August, when intense low-pressure systems can dump 30–50 mm in a single hour. Ageing stormwater
                    infrastructure in suburbs like Morley, Bayswater, and Cannington frequently overflows, sending
                    floodwater into homes through garages, laundries, and subfloor vents.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Swan River corridor flooding:</strong> Properties along the Swan and Canning rivers are exposed
                    to riverine flooding when sustained rainfall in the Darling Range catchment causes rapid river level
                    rises. Suburbs including Bassendean, Guildford, and South Perth can experience Category 2 or Category 3
                    water inundation requiring specialist decontamination.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Sand subsidence after saturation:</strong> Perth&apos;s Bassendean and Spearwood sand formations
                    are highly permeable but lose structural integrity when saturated for extended periods. Foundations,
                    pathways, and retaining walls can shift or crack, compounding flood damage with structural remediation
                    requirements.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Burst reticulation mains:</strong> Perth&apos;s extensive garden reticulation systems are prone
                    to pipe failures, particularly in older suburbs where PVC connections have degraded. A burst reticulation
                    main can release thousands of litres before detection, saturating subfloors and undermining slab
                    foundations — especially in the sandy soils of Perth&apos;s northern and eastern suburbs.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How much does flood damage restoration cost in Perth?',
            answer: 'Flood damage restoration in Perth typically ranges from $2,200 for minor single-room damage with clean water to $30,000 or more for severe whole-of-home flooding with contaminated water. Structural damage involving foundation subsidence in Perth\'s sandy soils can exceed $20,000. The Disaster Recovery platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe works.',
          },
          {
            question: 'Does insurance cover flood damage restoration in Perth?',
            answer: 'Most Australian home and contents insurance policies now include flood cover as standard or as an add-on, following reforms after the 2022 national flood events. Coverage depends on your specific policy and whether the damage is classified as flood, storm, or stormwater runoff. We bill you directly so work begins immediately, and provide full claims documentation — timestamped photos, moisture readings, scope of works, and daily drying logs — to support your insurance reimbursement.',
          },
          {
            question: 'How do you handle contaminated floodwater in Perth properties?',
            answer: 'Floodwater from river inundation or sewage backup is classified as Category 3 (black water) under IICRC S500-2021 standards. Our IICRC-certified contractors follow strict decontamination protocols including full extraction, antimicrobial treatment, removal of porous materials that cannot be decontaminated (carpet, underlay, plasterboard below the flood line), and structural drying with HEPA-filtered air scrubbers. All contaminated materials are disposed of in accordance with WA waste regulations.',
          },
          {
            question: 'How quickly can a flood damage restoration contractor respond in Perth?',
            answer: 'NRPG contractors across Perth metro respond within 60 minutes of claim lodgement. Lodge your claim online at disasterrecovery.com.au/claim and you are instantly matched with the nearest available IICRC-certified contractor. The service operates 24 hours a day, 7 days a week, including public holidays.',
          },
          {
            question: 'Which Perth suburbs are most at risk of flooding?',
            answer: 'Perth\'s highest flood risk suburbs include those along the Swan River corridor (Bassendean, Bayswater, Belmont, Guildford, South Perth), the Canning River corridor (Cannington, Wilson, Riverton), and low-lying northern suburbs with drainage issues (Wanneroo, Morley, Balcatta). Properties in the Bassendean sand formation are also vulnerable to subsidence after saturation. However, flash flooding from intense winter storms can affect any Perth suburb with ageing stormwater infrastructure.',
          },
          {
            question: 'How long does mould take to grow after flooding in Perth?',
            answer: 'Mould can begin colonising within 24 to 48 hours after flooding, even in Perth\'s drier climate. During the wet winter months (May to September), higher humidity slows the drying process and accelerates mould growth. Enclosed spaces such as wall cavities, subfloors, and built-in wardrobes are particularly vulnerable. Fast extraction and structural drying by IICRC-certified contractors is critical to preventing secondary mould damage, which can significantly increase restoration costs.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Cost Guide Australia 2026', href: '/guides/cost-guides/how-much-water-damage-restoration-cost', description: 'Detailed cost breakdown by water damage severity and contamination category.' },
          { title: 'How to Document Flood Damage for Insurance', href: '/guides/insurance/document-water-damage-insurance', description: 'Step-by-step guide to documenting flood damage for a successful insurance claim.' },
          { title: 'Mould After Flooding: Prevention and Remediation', href: '/guides/professional/mould-remediation-guide', description: 'How to prevent and treat mould growth after flood events in Australian properties.' },
          { title: 'What Does Disaster Recovery Include?', href: '/guides/services/what-disaster-recovery-includes', description: 'Full breakdown of what our restoration service covers from make-safe to rebuild.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
