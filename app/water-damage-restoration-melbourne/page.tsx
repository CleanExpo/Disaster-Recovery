import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Melbourne | 24/7 Emergency Response | IICRC Certified',
  description: 'Emergency water damage restoration in Melbourne. IICRC-certified contractors respond in under 60 minutes across all Melbourne metro suburbs. Available 24/7.',
  keywords: 'water damage restoration melbourne, water damage melbourne, flood cleanup melbourne, burst pipe melbourne, emergency water removal melbourne, water damage repair melbourne',
  openGraph: {
    title: 'Water Damage Restoration Melbourne | 24/7 Emergency Response',
    description: 'Emergency water damage restoration in Melbourne. IICRC-certified contractors respond in under 60 minutes. Available 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Melbourne')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-melbourne`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-melbourne/#localbusiness`,
  name: `${NAP.name} Melbourne`,
  url: `${NAP.url}/water-damage-restoration-melbourne`,
  description: '24/7 emergency water damage restoration in Melbourne. IICRC-certified contractor network for burst pipes, flooding, storm damage, and structural drying across all Melbourne metro suburbs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Melbourne', containedInPlace: { '@type': 'State', name: 'Victoria' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Melbourne', addressRegion: 'VIC', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Water Damage Restoration Melbourne',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Melbourne' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Melbourne including emergency extraction, structural drying, mould prevention, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function WaterDamageRestorationMelbournePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="wdrm-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrm-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Melbourne"
        subtitle="Emergency water damage restoration across all Melbourne metro suburbs. IICRC-certified contractors respond in under 60 minutes, 24 hours a day, 7 days a week."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-02-27"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Melbourne' },
        ]}
        sections={[
          {
            heading: 'Why Melbourne Properties Face Unique Water Damage Risks',
            body: (
              <>
                <p>
                  Melbourne&apos;s volatile weather — famously &quot;four seasons in one day&quot; — creates constant
                  water damage risks. The city receives approximately 648 mm of rainfall annually, but it is the
                  distribution and intensity that causes problems. Sudden downpours overwhelm ageing stormwater
                  infrastructure, while prolonged cool-season drizzle creates persistent dampness that accelerates
                  mould growth in poorly ventilated properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Inner-city period homes across Fitzroy, Carlton, Collingwood, and Richmond are particularly vulnerable
                  to rising damp through bluestone and red-brick foundations. Melbourne&apos;s boom in high-rise
                  apartment construction (2010–2025) has also produced buildings with known plumbing defects — the
                  Victorian Building Authority has identified water ingress as the top defect category in new apartments.
                  Western suburbs including Footscray, Maribyrnong, and Werribee sit on flood-prone land adjacent to
                  the Maribyrnong River and Werribee River systems.
                </p>
              </>
            ),
          },
          {
            heading: 'Melbourne Water Damage Restoration Cost Estimates',
            body: (
              <>
                <p>
                  Restoration costs in Melbourne are competitive with national averages, though inner-city access
                  constraints (narrow laneways, limited parking for equipment trucks) can add 10–15% to project costs.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Class 1 — Minor (single room, hard surfaces):</strong> $2,200–$4,000. Common after
                    small leaks from dishwashers, washing machines, or bathroom fixtures.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Class 2 — Significant (carpet saturation, wall wicking):</strong> $4,000–$8,500.
                    Typical for burst flexi-hoses or hot water system failures in suburban homes.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Class 3 — Extensive (overhead source, multi-room):</strong> $8,500–$15,000.
                    Common during Melbourne&apos;s winter storm events when roof tiles shift or flashings fail.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Class 4 — Specialty drying (hardwood, concrete):</strong> $15,000+.
                    Required for period homes with solid timber flooring and original plaster work.
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
            heading: 'How Our Melbourne Contractor Network Works',
            body: (
              <>
                <p>
                  Disaster Recovery connects you with NRPG&apos;s network of IICRC-certified water damage restoration
                  contractors across the entire Melbourne metropolitan area. Every contractor maintains current IICRC
                  Water Restoration Technician (WRT) certification and carries minimum $20 million public liability insurance.
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
                    <strong>60-minute response</strong> — emergency make-safe begins within the hour across Melbourne metro
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full claims documentation</strong> — timestamped photos, moisture readings, scope of works,
                    and daily drying logs provided for your insurance reimbursement
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  We bill you directly — not your insurer. Work begins immediately without waiting for insurer approval,
                  scope disputes, or panel contractor availability. You control the process from day one.
                </p>
              </>
            ),
          },
          {
            heading: 'Melbourne Suburbs We Cover',
            body: (
              <>
                <p>
                  Our contractor network covers every suburb across Greater Melbourne, from the Mornington Peninsula
                  to the Yarra Ranges, from Werribee to Frankston.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Melbourne:</strong> Melbourne CBD, Fitzroy, Carlton, Collingwood, Richmond, South Yarra,
                  St Kilda, Prahran, Southbank, Docklands
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Brunswick, Coburg, Preston, Reservoir, Northcote, Thornbury,
                  Heidelberg, Bundoora, Mill Park, Epping
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Suburbs:</strong> Footscray, Maribyrnong, Sunshine, Werribee, Point Cook,
                  Williamstown, Altona, Hoppers Crossing, Tarneit
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Suburbs:</strong> Hawthorn, Camberwell, Box Hill, Doncaster, Ringwood,
                  Glen Waverley, Mount Waverley, Balwyn, Kew
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>South-Eastern Suburbs:</strong> Dandenong, Cranbourne, Berwick, Narre Warren, Frankston,
                  Mornington, Pakenham, Officer
                </p>
                <p style={{ marginTop: '1rem' }}>
                  View suburb-specific pages:{' '}
                  <a href="/locations/melbourne/south-yarra/water-damage-restoration">South Yarra</a>,{' '}
                  <a href="/locations/melbourne/richmond/water-damage-restoration">Richmond</a>,{' '}
                  <a href="/locations/melbourne/footscray/water-damage-restoration">Footscray</a>,{' '}
                  <a href="/locations/melbourne/st-kilda/water-damage-restoration">St Kilda</a>,{' '}
                  <a href="/locations/melbourne/box-hill/water-damage-restoration">Box Hill</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Common Melbourne Water Damage Scenarios',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Hot water system failures:</strong> Melbourne&apos;s older suburban homes often have
                    ageing hot water units (gas storage or electric) that corrode internally and rupture without warning,
                    flooding laundries, garages, and adjacent rooms.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Apartment defects:</strong> Many post-2015 apartments in Melbourne have documented plumbing
                    and waterproofing defects. Failed bathroom membranes, poorly sealed balconies, and defective plumbing
                    connections cause water to cascade through multiple levels.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Winter storm damage:</strong> Melbourne&apos;s cold fronts drive heavy rain and strong winds
                    that dislodge roof tiles, lift flashings, and push water through window seals. June to August is
                    peak storm damage season.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Maribyrnong River flooding:</strong> Suburbs along the Maribyrnong River (Maribyrnong,
                    Essendon, Moonee Ponds) and the Yarra River corridor experience periodic flooding during major
                    rain events, requiring Category 3 water extraction and full decontamination.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How much does water damage restoration cost in Melbourne?',
            answer: 'Water damage restoration in Melbourne typically ranges from $2,200 for minor Class 1 damage to $15,000 or more for Class 4 specialty drying. Inner-city properties may incur 10–15% higher costs due to access constraints. The Disaster Recovery platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe works.',
          },
          {
            question: 'How quickly can you respond to water damage in Melbourne?',
            answer: 'NRPG contractors across Melbourne metro respond within 60 minutes of claim lodgement. Lodge your claim online at disasterrecovery.com.au/claim for instant contractor matching. The service operates 24 hours a day, 7 days a week, including public holidays.',
          },
          {
            question: 'Does insurance cover water damage in Melbourne apartments?',
            answer: 'Most home and contents insurance policies cover sudden water damage from burst pipes, appliance failures, and storms. Building defects in newer apartments may be covered under the builder warranty or body corporate insurance. We bill you directly so work begins immediately, and provide full claims documentation to support your insurance reimbursement.',
          },
          {
            question: 'What Melbourne suburbs do you cover?',
            answer: 'Our contractor network covers every suburb across Greater Melbourne — from the Mornington Peninsula to the Yarra Ranges, from Werribee to Frankston. This includes Melbourne CBD, Fitzroy, South Yarra, Footscray, Box Hill, Dandenong, Frankston, and all suburbs in between.',
          },
          {
            question: 'How long does water damage restoration take in Melbourne?',
            answer: 'Drying time depends on damage class. Class 1 damage dries in 2–3 days. Class 2 takes 3–5 days. Class 3 requires 5–7 days. Class 4 specialty drying can take 7–14 days. Melbourne winter humidity can extend drying times by 1–2 days compared to drier months. IICRC-certified technicians monitor daily moisture readings to confirm the structure reaches dry standard.',
          },
          {
            question: 'Do I need to move out during water damage restoration in Melbourne?',
            answer: 'For Class 1 and most Class 2 damage, you can remain in the property while drying equipment operates. Class 3 and Category 3 (contaminated) water damage may require temporary relocation for health and safety reasons. Your contractor will advise during the initial make-safe assessment. If relocation is needed, the cost may be claimable under the temporary accommodation provisions in your insurance policy.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Cost Guide Australia 2026', href: '/guides/cost-guides/how-much-water-damage-restoration-cost', description: 'Detailed cost breakdown by damage class and water category.' },
          { title: 'Melbourne Apartment Flood Restoration', href: '/guides/locations/melbourne/melbourne-apartment-flood-restoration', description: 'Specific guide for apartment water damage in Melbourne.' },
          { title: 'How to Document Water Damage for Insurance', href: '/guides/insurance/document-water-damage-insurance', description: 'Step-by-step documentation guide for insurance claims.' },
          { title: 'What Does Disaster Recovery Include?', href: '/guides/services/what-disaster-recovery-includes', description: 'Full breakdown of what our restoration service covers.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
