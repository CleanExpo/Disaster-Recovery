import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Sydney | 24/7',
  description: 'Emergency water damage restoration in Sydney. IICRC-certified contractors respond in under 60 minutes across all Sydney metro suburbs. Available 24/7.',
  keywords: 'water damage restoration sydney, water damage sydney, flood cleanup sydney, burst pipe sydney, emergency water removal sydney, water damage repair sydney',
  openGraph: {
    title: 'Water Damage Restoration Sydney | 24/7 Emergency Response',
    description: 'Emergency water damage restoration in Sydney. IICRC-certified contractors respond in under 60 minutes. Available 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Water Damage Restoration')}&city=${encodeURIComponent('Sydney')}&service=water-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/water-damage-restoration-sydney`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/water-damage-restoration-sydney/#localbusiness`,
  name: `${NAP.name} Sydney`,
  url: `${NAP.url}/water-damage-restoration-sydney`,
  description: '24/7 emergency water damage restoration in Sydney. IICRC-certified contractor network for burst pipes, flooding, storm damage, and structural drying across all Sydney metro suburbs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Sydney', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Sydney', addressRegion: 'NSW', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Water Damage Restoration Sydney',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Sydney' },
  serviceType: 'Water Damage Restoration',
  description: 'Professional water damage restoration in Sydney including emergency extraction, structural drying, mould prevention, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function WaterDamageRestorationSydneyPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="wdrs-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="wdrs-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="Water Damage Restoration Sydney"
        subtitle="Emergency water damage restoration across all Sydney metro suburbs. IICRC-certified contractors respond in under 60 minutes, 24 hours a day, 7 days a week."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-02-27"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Sydney' },
        ]}
        sections={[
          {
            heading: 'Why Sydney Properties Are Vulnerable to Water Damage',
            body: (
              <>
                <p>
                  Sydney&apos;s combination of ageing infrastructure, intense east-coast storms, and high-density living makes
                  water damage one of the most common property emergencies across the metro area. The Greater Sydney region
                  receives an average of 1,215 mm of rainfall annually, with the wettest months (February to June) regularly
                  producing flash flooding events that overwhelm stormwater systems.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Inner-city terrace houses in Surry Hills, Newtown, and Paddington are particularly susceptible to rising
                  damp and subfloor moisture due to their sandstone foundations and lack of modern damp-proof courses. High-rise
                  apartments across Parramatta, Chatswood, and Sydney CBD face burst pipe risks from ageing copper plumbing in
                  buildings constructed before 2000. Western Sydney suburbs including Penrith, Blacktown, and Liverpool sit
                  within the Hawkesbury-Nepean flood plain — one of Australia&apos;s highest-risk flood zones.
                </p>
              </>
            ),
          },
          {
            heading: 'Sydney Water Damage Restoration Cost Estimates',
            body: (
              <>
                <p>
                  Water damage restoration costs in Sydney reflect the city&apos;s higher labour rates and the logistical
                  complexity of working in high-density areas. Below are indicative costs for residential properties in 2026.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Class 1 — Minor (single room, hard surfaces):</strong> $2,200–$4,500. Common after small appliance
                    leaks or minor pipe bursts in kitchens and bathrooms.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Class 2 — Significant (carpet/underlay saturation):</strong> $4,500–$9,000. Typical for burst
                    flexi-hoses in Sydney apartments, where water wicks through carpet and up walls within hours.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Class 3 — Extensive (overhead source, multi-room):</strong> $9,000–$16,000. Common during Sydney&apos;s
                    east-coast lows when roof penetrations cause ceiling collapse and multi-level damage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Class 4 — Specialty drying (hardwood, concrete, plaster):</strong> $16,000+. Required for heritage
                    homes with solid timber flooring and lath-and-plaster walls.
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
            heading: 'How Our Sydney Contractor Network Works',
            body: (
              <>
                <p>
                  Disaster Recovery connects you with NRPG&apos;s network of IICRC-certified water damage restoration
                  contractors across the entire Sydney metropolitan area. Every contractor in the network maintains current
                  IICRC Water Restoration Technician (WRT) certification, carries minimum $20 million public liability
                  insurance, and has been vetted for quality and reliability.
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
                    <strong>60-minute response</strong> — emergency make-safe begins within the hour across Sydney metro
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
            heading: 'Sydney Suburbs We Cover',
            body: (
              <>
                <p>
                  Our contractor network covers every suburb across the Greater Sydney region, from the Northern Beaches
                  to Sutherland Shire, from the Eastern Suburbs to the Blue Mountains fringe.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Sydney:</strong> Sydney CBD, Surry Hills, Darlinghurst, Newtown, Pyrmont, Glebe, Ultimo,
                  Redfern, Chippendale, Haymarket
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>North Shore &amp; Northern Beaches:</strong> Chatswood, North Sydney, Mosman, Manly, Dee Why,
                  Hornsby, St Ives, Turramurra, Lindfield
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Sydney:</strong> Parramatta, Blacktown, Penrith, Liverpool, Bankstown, Fairfield,
                  Auburn, Ryde, Strathfield
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Suburbs:</strong> Bondi, Randwick, Coogee, Maroubra, Double Bay, Rose Bay, Vaucluse
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>South Sydney:</strong> Hurstville, Kogarah, Sutherland, Cronulla, Miranda, Caringbah, Engadine
                </p>
                <p style={{ marginTop: '1rem' }}>
                  View suburb-specific pages for detailed local information:{' '}
                  <a href="/locations/sydney/haymarket/water-damage-restoration">Haymarket</a>,{' '}
                  <a href="/locations/sydney/parramatta/water-damage-restoration">Parramatta</a>,{' '}
                  <a href="/locations/sydney/chatswood/water-damage-restoration">Chatswood</a>,{' '}
                  <a href="/locations/sydney/bondi/water-damage-restoration">Bondi</a>,{' '}
                  <a href="/locations/sydney/penrith/water-damage-restoration">Penrith</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Common Sydney Water Damage Scenarios',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Burst flexi-hoses in apartments:</strong> The single most common cause of water damage claims
                    in Sydney. Braided stainless-steel flexi-hoses under sinks and behind washing machines have a 10-year
                    lifespan but are often forgotten until they fail. A burst hose in a 15th-floor apartment can cascade
                    water through multiple levels.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>East-coast low storms:</strong> Sydney&apos;s most destructive weather events drive horizontal
                    rain through window seals, balcony doors, and roof flashings. The 2022 and 2024 flood events caused
                    billions in insured losses across the Sydney basin.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Rising damp in heritage terraces:</strong> Older properties without modern damp-proof courses
                    absorb ground moisture through sandstone and brick foundations, causing plaster damage, timber rot,
                    and mould growth in subfloor cavities.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Stormwater ingress in Western Sydney:</strong> Suburbs in the Hawkesbury-Nepean catchment
                    (Windsor, Richmond, Penrith) experience overland flooding during heavy rainfall events, with
                    Category 3 (black water) requiring specialist decontamination under IICRC S500 protocols.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How much does water damage restoration cost in Sydney?',
            answer: 'Water damage restoration in Sydney typically ranges from $2,200 for minor Class 1 damage (single room, hard surfaces) to $16,000 or more for Class 4 specialty drying of hardwood floors and heritage materials. Sydney costs reflect higher labour rates and logistical complexity in high-density areas. The Disaster Recovery platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe works.',
          },
          {
            question: 'How quickly can a water damage restoration contractor respond in Sydney?',
            answer: 'NRPG contractors across Sydney metro respond within 60 minutes of claim lodgement. Lodge your claim online at disasterrecovery.com.au/claim and you are instantly matched with the nearest available IICRC-certified contractor. The service operates 24 hours a day, 7 days a week, including public holidays.',
          },
          {
            question: 'Does insurance cover water damage restoration in Sydney?',
            answer: 'Most Australian home and contents insurance policies cover sudden and accidental water damage such as burst pipes, appliance failures, and storm damage. Flood cover is typically a separate add-on. We bill you directly so work begins immediately, and provide full claims documentation — timestamped photos, moisture readings, scope of works, and daily drying logs — to support your insurance reimbursement.',
          },
          {
            question: 'What suburbs in Sydney do you cover for water damage restoration?',
            answer: 'Our contractor network covers every suburb across Greater Sydney — from the Northern Beaches to Sutherland Shire, from the Eastern Suburbs to the Blue Mountains fringe. This includes Sydney CBD, Parramatta, Blacktown, Penrith, Liverpool, Chatswood, Hornsby, Manly, Bondi, Hurstville, and all suburbs in between.',
          },
          {
            question: 'What should I do immediately after water damage in my Sydney property?',
            answer: 'Stop the water source if safe (turn off mains or isolate the burst pipe). Move valuables to dry areas and photograph all damage for insurance. Do not use electrical appliances in wet areas. Lodge your claim at disasterrecovery.com.au/claim for a 60-minute emergency response. Mould can begin growing within 24 to 48 hours in Sydney humidity, so fast action is critical.',
          },
          {
            question: 'Are your Sydney water damage contractors IICRC certified?',
            answer: 'Yes. Every contractor in the NRPG network maintains current IICRC Water Restoration Technician (WRT) certification, carries minimum $20 million public liability insurance, and has been vetted for quality and reliability. IICRC certification ensures contractors follow ANSI/IICRC S500-2021 standards for water damage restoration.',
          },
        ]}
        relatedGuides={[
          { title: 'Water Damage Restoration Cost Guide Australia 2026', href: '/guides/cost-guides/how-much-water-damage-restoration-cost', description: 'Detailed cost breakdown by damage class and water category.' },
          { title: 'How to Document Water Damage for Insurance', href: '/guides/insurance/document-water-damage-insurance', description: 'Step-by-step guide to documenting damage for a successful insurance claim.' },
          { title: 'Sydney CBD Emergency Water Extraction', href: '/guides/locations/sydney/sydney-cbd-emergency-water-extraction', description: 'Location-specific guide for Sydney CBD commercial and residential water emergencies.' },
          { title: 'What Does Disaster Recovery Include?', href: '/guides/services/what-disaster-recovery-includes', description: 'Full breakdown of what our restoration service covers from make-safe to rebuild.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
