import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Gold Coast | 24/7',
  description: 'Emergency storm damage restoration on the Gold Coast. IICRC-certified contractors respond in under 60 minutes across all Gold Coast suburbs. Available 24/7.',
  keywords: 'storm damage restoration gold coast, storm damage gold coast, hail damage gold coast, wind damage gold coast, emergency storm repair gold coast, storm damage repair gold coast',
  openGraph: {
    title: 'Storm Damage Restoration Gold Coast | 24/7 Emergency Response',
    description: 'Emergency storm damage restoration on the Gold Coast. IICRC-certified contractors respond in under 60 minutes. Available 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Storm Damage Restoration')}&city=${encodeURIComponent('Gold Coast')}&service=storm-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/storm-damage-restoration-gold-coast`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/storm-damage-restoration-gold-coast/#localbusiness`,
  name: `${NAP.name} Gold Coast`,
  url: `${NAP.url}/storm-damage-restoration-gold-coast`,
  description: '24/7 emergency storm damage restoration on the Gold Coast. IICRC-certified contractor network for hail damage, wind damage, roof repairs, and structural restoration across all Gold Coast suburbs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Gold Coast', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Gold Coast', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Storm Damage Restoration Gold Coast',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Gold Coast' },
  serviceType: 'Storm Damage Restoration',
  description: 'Professional storm damage restoration on the Gold Coast including emergency make-safe, roof tarping, hail damage repair, structural restoration, and full insurance documentation.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function StormDamageRestorationGoldCoastPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="sdrgc-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="sdrgc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Storm Damage"
        title="Storm Damage Restoration Gold Coast"
        subtitle="Emergency storm damage restoration across all Gold Coast suburbs. IICRC-certified contractors respond in under 60 minutes, 24 hours a day, 7 days a week."
        gradient="linear-gradient(135deg, #1E3A5F 0%, #4A90D9 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-02-27"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage', href: '/services/storm-damage' },
          { label: 'Gold Coast' },
        ]}
        sections={[
          {
            heading: 'Why the Gold Coast Is One of Australia\u2019s Storm Damage Hotspots',
            body: (
              <>
                <p>
                  The Gold Coast sits within one of Australia&apos;s most active severe storm corridors, recording an average
                  of 30 to 40 thunderstorm days per year. South-East Queensland&apos;s supercell storms, most frequent between
                  October and March, produce destructive wind gusts exceeding 125 km/h, giant hailstones, and intense
                  rainfall rates that overwhelm drainage infrastructure within minutes.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Gold Coast hinterland ranges — including Springbrook, Tamborine Mountain, and the Lamington Plateau —
                  act as orographic barriers that intensify storm cells as they move eastward toward the coastal strip. This
                  terrain effect concentrates rainfall and generates localised flash flooding across suburbs from Nerang to
                  Mudgeeraba. The city&apos;s extensive canal network, while iconic, creates additional flood pathways that
                  channel stormwater directly into residential properties. High-rise buildings along the Surfers Paradise and
                  Broadbeach beachfront face elevated wind exposure, with upper floors particularly vulnerable to wind-driven
                  rain ingress through balcony doors, window seals, and rooftop plant equipment.
                </p>
              </>
            ),
          },
          {
            heading: 'Gold Coast Storm Damage Restoration Cost Estimates',
            body: (
              <>
                <p>
                  Storm damage restoration costs on the Gold Coast vary significantly depending on the severity of the event
                  and the type of damage sustained. Below are indicative costs for residential properties in 2026.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof tarping and emergency make-safe:</strong> $1,500–$5,000. Required immediately after storm
                    events to prevent secondary water damage from exposed roof areas. Costs depend on roof pitch, access
                    difficulty, and tarp coverage area.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Hail damage restoration:</strong> $5,000–$20,000. Covers roof tile replacement, gutter repair,
                    skylight replacement, and external cladding restoration. Supercell hailstorms on the Gold Coast can
                    damage every external surface in a single event.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wind structural damage:</strong> $10,000–$50,000+. Includes roof structure repair, window and
                    door replacement, fascia and soffit restoration, and structural bracing. Severe wind events can compromise
                    roof tie-downs and load-bearing connections.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Combined storm and water damage:</strong> $15,000–$60,000+. Multi-category restoration involving
                    structural repair, water extraction, drying, and mould prevention. Common after major Gold Coast storm
                    events where roof breaches lead to extensive interior water damage.
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
            heading: 'The Storm Damage Restoration Process',
            body: (
              <>
                <p>
                  Disaster Recovery connects you with NRPG&apos;s network of IICRC-certified storm damage restoration
                  contractors across the entire Gold Coast region. Every contractor in the network carries minimum $20 million
                  public liability insurance and has been vetted for quality and reliability.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency make-safe:</strong> Immediate roof tarping, board-up of broken windows and doors,
                    and securing of the property to prevent further damage from weather or unauthorised entry.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Damage assessment:</strong> Comprehensive inspection of roof, walls, ceilings, windows, and
                    structural elements. Documented with timestamped photography and detailed scope of works for your
                    insurance claim.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water extraction and drying:</strong> If storm damage has allowed water ingress, industrial
                    extraction and structural drying begins immediately to prevent mould growth within the critical 24 to
                    48 hour window.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural repair:</strong> Roof restoration, timber framing repair, window and door replacement,
                    internal lining and painting to return the property to pre-loss condition.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Final inspection:</strong> Quality assurance inspection to confirm all works meet Australian
                    building standards and manufacturer specifications. Final documentation package provided for your
                    insurance reimbursement.
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
            heading: 'Gold Coast Suburbs We Cover',
            body: (
              <>
                <p>
                  Our contractor network covers every suburb across the Gold Coast, from the northern growth corridors
                  to the southern border suburbs, from the beachfront strip to the hinterland ranges.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Beachfront:</strong> Surfers Paradise, Broadbeach, Main Beach, Mermaid Beach, Miami, Burleigh Heads,
                  Kirra, Coolangatta
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Coomera, Helensvale, Oxenford, Upper Coomera, Pimpama, Ormeau, Hope Island,
                  Sanctuary Cove
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Palm Beach, Currumbin, Tugun, Elanora, Tallebudgera, Varsity Lakes,
                  Robina, Reedy Creek
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hinterland:</strong> Nerang, Mudgeeraba, Highland Park, Gilston, Advancetown, Springbrook,
                  Mount Tamborine, Canungra
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Canal Suburbs:</strong> Broadbeach Waters, Clear Island Waters, Mermaid Waters, Isle of Capri,
                  Sorrento, Bundall, Benowa Waters
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate contractor matching
                  across any Gold Coast suburb.
                </p>
              </>
            ),
          },
          {
            heading: 'Common Gold Coast Storm Damage Scenarios',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Supercell hailstorms:</strong> South-East Queensland produces some of Australia&apos;s most
                    destructive hailstorms. Giant hailstones (5 cm+) shatter roof tiles, destroy skylights, dent metal
                    roofing, and strip external paint. A single supercell event can damage hundreds of properties across
                    the Gold Coast within minutes, overwhelming local tradesperson availability for weeks.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>High-rise wind damage:</strong> The Gold Coast&apos;s skyline of high-rise towers along the
                    beachfront faces direct exposure to storm-force winds. Upper floors experience amplified wind loads
                    that drive rain through balcony seals, shatter windows, and tear away external cladding. Roof-mounted
                    plant rooms and communications equipment are particularly vulnerable.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Tree strike damage:</strong> Mature eucalypts and hoop pines across hinterland and established
                    suburban areas become projectiles in severe storms. Falling trees and large branches cause catastrophic
                    roof damage, crush fencing and carports, and sever power lines creating secondary hazards.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Canal estate flooding:</strong> The Gold Coast&apos;s extensive canal system can act as a conduit
                    for stormwater during intense rainfall events. Properties in canal estates including Broadbeach Waters,
                    Clear Island Waters, and Isle of Capri face rising water levels that inundate ground floors, requiring
                    specialist water extraction and decontamination under IICRC S500 protocols.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How much does storm damage restoration cost on the Gold Coast?',
            answer: 'Storm damage restoration on the Gold Coast ranges from $1,500 for emergency roof tarping to $60,000 or more for combined structural and water damage from severe storm events. Costs depend on the type of damage (hail, wind, or water), the extent of property affected, and access complexity. The Disaster Recovery platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe works.',
          },
          {
            question: 'How quickly can a storm damage contractor respond on the Gold Coast?',
            answer: 'NRPG contractors across the Gold Coast respond within 60 minutes of claim lodgement. Lodge your claim online at disasterrecovery.com.au/claim and you are instantly matched with the nearest available IICRC-certified contractor. The service operates 24 hours a day, 7 days a week, including public holidays.',
          },
          {
            question: 'Does insurance cover storm damage restoration on the Gold Coast?',
            answer: 'Most Australian home and contents insurance policies cover storm damage including wind, hail, and storm-related water ingress. Flood cover from rising water is typically a separate add-on. We bill you directly so work begins immediately, and provide full claims documentation — timestamped photos, detailed scope of works, and progress reports — to support your insurance reimbursement.',
          },
          {
            question: 'What should I do immediately after storm damage to my Gold Coast property?',
            answer: 'Ensure personal safety first — stay away from fallen power lines and structurally compromised areas. If safe, place buckets under active leaks and move valuables away from water. Photograph all damage for insurance purposes. Do not attempt roof access during or after a storm. Lodge your claim at disasterrecovery.com.au/claim for a 60-minute emergency make-safe response.',
          },
          {
            question: 'How is hail damage restored on Gold Coast properties?',
            answer: 'Hail damage restoration involves a full external assessment, replacement of cracked or broken roof tiles, repair of dented metal roofing, skylight replacement, gutter and downpipe restoration, and repainting of damaged external surfaces. Interior water damage caused by hail-breached roofing is treated simultaneously with industrial extraction and structural drying equipment.',
          },
          {
            question: 'Is the Gold Coast at risk of cyclone damage?',
            answer: 'While direct cyclone hits on the Gold Coast are rare, the region regularly experiences the remnants of tropical cyclones that bring destructive winds, heavy rainfall, and storm surge risks. Ex-tropical cyclone events can produce sustained winds above 100 km/h and rainfall exceeding 200 mm in 24 hours, causing widespread property damage across the Gold Coast.',
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Cost Guide Australia 2026', href: '/guides/cost-guides/how-much-storm-damage-restoration-cost', description: 'Detailed cost breakdown for storm damage repair by severity and damage type.' },
          { title: 'How to Document Storm Damage for Insurance', href: '/guides/insurance/document-storm-damage-insurance', description: 'Step-by-step guide to documenting storm damage for a successful insurance claim.' },
          { title: 'Emergency Roof Tarping and Make-Safe Guide', href: '/guides/services/emergency-roof-tarping-make-safe', description: 'What emergency make-safe involves and why it must happen within hours of a storm event.' },
          { title: 'What Does Disaster Recovery Include?', href: '/guides/services/what-disaster-recovery-includes', description: 'Full breakdown of what our restoration service covers from make-safe to rebuild.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
