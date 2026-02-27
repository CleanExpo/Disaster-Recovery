import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Brisbane | 24/7',
  description: 'Emergency fire damage restoration in Brisbane. IICRC-certified contractors for smoke damage, soot removal, structural restoration. Available 24/7 with 60-minute response.',
  keywords: 'fire damage restoration brisbane, fire damage brisbane, smoke damage brisbane, soot removal brisbane, fire restoration brisbane, house fire brisbane',
  openGraph: {
    title: 'Fire Damage Restoration Brisbane | 24/7 Emergency Response',
    description: 'Emergency fire damage restoration in Brisbane. IICRC-certified contractors for smoke damage, soot removal, and structural restoration. Available 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Brisbane')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-brisbane`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-brisbane/#localbusiness`,
  name: `${NAP.name} Brisbane`,
  url: `${NAP.url}/fire-damage-restoration-brisbane`,
  description: '24/7 emergency fire damage restoration in Brisbane. IICRC-certified contractor network for smoke damage, soot removal, structural restoration, and contents cleaning across all Brisbane metro suburbs.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Brisbane', containedInPlace: { '@type': 'State', name: 'Queensland' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Brisbane', addressRegion: 'QLD', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Fire Damage Restoration Brisbane',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Brisbane' },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration in Brisbane including emergency board-up, soot removal, odour elimination, contents restoration, and structural rebuild.',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '12847', bestRating: '5', worstRating: '1' },
};

export default function FireDamageRestorationBrisbanePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrb-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrb-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Brisbane"
        subtitle="Emergency fire and smoke damage restoration across all Brisbane metro suburbs. IICRC-certified contractors respond in under 60 minutes, 24 hours a day, 7 days a week."
        gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-02-27"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Brisbane' },
        ]}
        sections={[
          {
            heading: 'Why Brisbane Properties Face Elevated Fire Risk',
            body: (
              <>
                <p>
                  Brisbane&apos;s subtropical climate creates a dual fire risk profile. During the dry season
                  (August to November), South East Queensland experiences extreme bushfire conditions — the
                  2019–2020 bushfire season saw blazes reach suburban Brisbane in areas including Mount Coot-tha,
                  The Gap, and Chapel Hill. Kitchen fires remain the number one cause of residential fire damage
                  year-round, with Queensland Fire and Emergency Services attending over 4,000 structure fires
                  statewide annually.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Brisbane&apos;s housing stock adds complexity. Queenslander-style timber homes on stumps — common
                  in Paddington, Red Hill, Ashgrove, and West End — are highly combustible due to their timber
                  framing, weatherboard cladding, and subfloor ventilation cavities that allow fire to travel
                  rapidly. Post-war fibro homes across Inala, Zillmere, and Bracken Ridge may contain asbestos
                  materials that require specialist handling after fire damage.
                </p>
              </>
            ),
          },
          {
            heading: 'Brisbane Fire Damage Restoration Cost Estimates',
            body: (
              <>
                <p>
                  Fire damage restoration costs in Brisbane depend on fire severity, smoke penetration, and whether
                  asbestos or other hazardous materials are present. Below are 2026 residential estimates.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Kitchen fire (contained):</strong> $5,000–$15,000. Smoke and soot damage to one room
                    with thermal fogging for odour elimination and cleaning of adjacent areas.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Single-room structural fire:</strong> $15,000–$40,000. Includes board-up, debris
                    removal, soot cleaning, odour treatment, and partial rebuild of affected room.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Multi-room or whole-of-house fire:</strong> $40,000–$150,000+. Full contents pack-out,
                    structural assessment, hazardous material testing, demolition of compromised elements, and
                    complete rebuild.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Smoke damage only (no structural fire):</strong> $3,000–$10,000. Common when a
                    neighbouring property fire produces smoke that penetrates through shared walls or roof spaces.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Our platform charges a $550 platform fee plus $2,200 contractor credit ($2,750 total) to begin
                  emergency make-safe. Your contractor then provides a formal contract with transparent pricing for
                  the full restoration scope. Payment plans are available through{' '}
                  <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'The Fire Restoration Process',
            body: (
              <>
                <p>
                  Professional fire damage restoration follows the IICRC S540 Standard for cleaning and deodorisation
                  after fire damage. The process is methodical and typically proceeds in these stages:
                </p>
                <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency board-up and make-safe:</strong> Securing the property against weather,
                    trespassers, and further damage. Tarping damaged roofing, boarding broken windows, and
                    isolating electrical and gas services.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural assessment:</strong> Qualified engineer inspection to determine which
                    structural elements are compromised and which can be retained.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents pack-out:</strong> Salvageable contents are catalogued, packed, and transported
                    to a specialist cleaning facility. Non-salvageable items are documented for insurance purposes.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Soot and smoke removal:</strong> HEPA vacuuming of all surfaces, chemical sponge
                    cleaning, wet cleaning, and specialist treatment for different soot types (wet vs dry soot).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Odour elimination:</strong> Thermal fogging, ozone treatment, and hydroxyl generators
                    to neutralise smoke odour embedded in building materials.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Rebuild and restoration:</strong> Replacing damaged structural elements, replastering,
                    painting, and returning the property to pre-loss condition.
                  </li>
                </ol>
              </>
            ),
          },
          {
            heading: 'Brisbane Suburbs We Cover',
            body: (
              <>
                <p>
                  Our contractor network covers every suburb across Greater Brisbane, from the CBD to the outer
                  growth corridors.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner Brisbane:</strong> Brisbane CBD, Fortitude Valley, South Brisbane, West End,
                  Paddington, Red Hill, New Farm, Kangaroo Point, Spring Hill
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Chermside, Nundah, Aspley, Albany Creek, Strathpine,
                  Brendale, Kallangur, North Lakes, Caboolture
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Mount Gravatt, Sunnybank, Eight Mile Plains, Springwood,
                  Logan, Browns Plains, Beenleigh
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Suburbs:</strong> Toowong, Indooroopilly, Kenmore, Chapel Hill, The Gap,
                  Ipswich, Springfield, Forest Lake
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Suburbs:</strong> Wynnum, Manly, Carindale, Coorparoo, Morningside,
                  Bulimba, Hawthorne, Cannon Hill
                </p>
                <p style={{ marginTop: '1rem' }}>
                  View suburb-specific pages:{' '}
                  <a href="/locations/brisbane/fire-damage-restoration">Brisbane city-wide</a>,{' '}
                  <a href="/locations/brisbane/paddington/fire-damage-restoration">Paddington</a>,{' '}
                  <a href="/locations/brisbane/west-end/fire-damage-restoration">West End</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Common Brisbane Fire Damage Scenarios',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Kitchen fires:</strong> The leading cause of residential fire in Brisbane. Cooking oil
                    fires, unattended stovetops, and faulty appliances. Damage is often contained to the kitchen
                    but smoke residue spreads throughout the property via HVAC systems and natural convection.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Electrical fires in older homes:</strong> Brisbane&apos;s pre-1980 homes often have
                    original wiring that deteriorates over time. Overloaded circuits, degraded insulation, and
                    loose connections cause fires in wall cavities that can smoulder undetected before igniting.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Bushfire ember attack:</strong> Western Brisbane suburbs (The Gap, Chapel Hill,
                    Brookfield) border bushland reserves. During extreme fire weather, embers can travel
                    kilometres ahead of the fire front, lodging in gutters, subfloor cavities, and under eaves.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Asbestos-containing materials:</strong> Pre-1990 Brisbane homes may contain asbestos
                    in eaves, wall cladding, or roofing. Fire damage to these materials creates an airborne
                    hazard requiring licensed asbestos removal before restoration can proceed.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How much does fire damage restoration cost in Brisbane?',
            answer: 'Fire damage restoration in Brisbane ranges from $5,000 for a contained kitchen fire to $150,000 or more for whole-of-house damage requiring full structural rebuild. Smoke-only damage typically costs $3,000–$10,000. The Disaster Recovery platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe.',
          },
          {
            question: 'How long does fire damage restoration take in Brisbane?',
            answer: 'Timeline depends on severity. A contained kitchen fire restoration takes 1–2 weeks. Single-room structural fire takes 3–6 weeks. Major fire damage requiring full rebuild can take 3–6 months. Brisbane\'s subtropical humidity can affect drying and odour treatment timelines. Your contractor provides a detailed timeline after the structural assessment.',
          },
          {
            question: 'Can smoke damage be fully removed from a Brisbane home?',
            answer: 'Yes. Professional smoke damage restoration using IICRC S540 protocols can fully remove smoke residue and odour from most building materials. The process involves HEPA vacuuming, chemical sponge cleaning, wet cleaning, thermal fogging, and ozone or hydroxyl treatment. Some porous materials (soft furnishings, unfinished timber) may need replacement if deeply penetrated.',
          },
          {
            question: 'Does insurance cover fire damage restoration in Brisbane?',
            answer: 'Most Australian home and contents policies cover fire damage restoration, including emergency board-up, structural repair, contents cleaning, and temporary accommodation. We bill you directly so work starts immediately without waiting for insurer approval. We provide comprehensive claims documentation including photos, structural reports, contents inventories, and itemised invoicing.',
          },
          {
            question: 'What about asbestos after a fire in a Brisbane home?',
            answer: 'Pre-1990 Brisbane homes may contain asbestos in eaves, cladding, or roofing. Fire damage can release asbestos fibres, creating an airborne hazard. Licensed asbestos assessors test for contamination before restoration begins. If asbestos is confirmed, licensed removalists handle the material under Queensland workplace health and safety regulations before restoration contractors proceed.',
          },
          {
            question: 'How quickly can you respond to a house fire in Brisbane?',
            answer: 'NRPG contractors across Brisbane respond within 60 minutes of claim lodgement for emergency board-up and make-safe. Lodge your claim at disasterrecovery.com.au/claim. Note that fire-damaged properties must be cleared by Queensland Fire and Emergency Services before any restoration work can begin.',
          },
        ]}
        relatedGuides={[
          { title: 'Fire Damage Restoration Guide', href: '/guides/fire-damage', description: 'Complete guide to the fire damage restoration process from make-safe to rebuild.' },
          { title: 'Smoke Damage Cleaning Guide', href: '/guides/fire-damage/smoke-damage-cleaning-guide', description: 'Detailed guide to professional smoke and soot removal techniques.' },
          { title: 'Brisbane Commercial Water Damage', href: '/guides/locations/brisbane/brisbane-commercial-water-damage', description: 'Brisbane-specific guide for commercial property restoration.' },
          { title: 'What Does Disaster Recovery Include?', href: '/guides/services/what-disaster-recovery-includes', description: 'Full breakdown of what our restoration service covers.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
