import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Wollongong | 24/7 Emergency Response',
  description:
    'Emergency fire damage restoration across Wollongong and the Illawarra. IICRC-certified contractors for Escarpment BAL zone bushfire damage, BlueScope industrial fire scenarios, and heritage terrace restoration. Available 24/7.',
  keywords:
    'fire damage restoration wollongong, fire damage wollongong, smoke damage wollongong, illawarra escarpment bushfire, bal zone fire damage, port kembla fire damage, wollongong terrace fire restoration',
  openGraph: {
    title: 'Fire Damage Restoration Wollongong | 24/7 Emergency Response',
    description:
      'Emergency fire damage restoration across Wollongong and the Illawarra. IICRC-certified contractors for Escarpment BAL zone bushfire damage, BlueScope industrial fire scenarios, and heritage terrace restoration. Available 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Fire+Damage+Restoration&city=Wollongong&service=fire-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-wollongong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-wollongong/#localbusiness`,
  name: `${NAP.name} Wollongong`,
  url: `${NAP.url}/fire-damage-restoration-wollongong`,
  description:
    '24/7 emergency fire damage restoration across Wollongong and the Illawarra. IICRC-certified contractor network for Illawarra Escarpment BAL zone bushfire damage, BlueScope Port Kembla industrial fire scenarios, and heritage terrace fire restoration in Fairy Meadow, North Wollongong, and Wollongong East.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Wollongong',
    containedInPlace: { '@type': 'State', name: 'New South Wales' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wollongong',
    addressRegion: 'NSW',
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
  name: 'Emergency Fire Damage Restoration Wollongong',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Wollongong' },
  serviceType: 'Fire Damage Restoration',
  description:
    'Professional fire and smoke damage restoration in Wollongong and the Illawarra. Services include emergency board-up, soot and smoke removal, odour elimination, Escarpment BAL zone structural assessment, industrial fire remediation, and heritage terrace reinstatement.',
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
      name: 'Does my insurance cover bushfire damage on the Illawarra Escarpment in a BAL zone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Standard Australian home and contents policies cover bushfire damage as a named peril, including properties in BAL (Bushfire Attack Level) rated zones on the Illawarra Escarpment. Properties in Helensburgh, Stanwell Park, Thirroul, and Scarborough with BAL ratings (BAL-12.5 through BAL-FZ) are typically covered for structural fire loss, smoke damage, contents, and temporary accommodation. Note: ARPC (Australian Reinsurance Pool Corporation) does not apply to fire damage — it covers cyclone and terrorism events only. Your standard home insurer is the relevant party for bushfire claims. BAL ratings affect building construction requirements but do not reduce or limit insurance coverage for fire damage.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does BlueScope industrial activity at Port Kembla affect residential fire risk in Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "BlueScope Steel's Port Kembla steelworks is Australia's largest integrated steelmaking facility and represents a significant industrial fire risk zone. While the steelworks has comprehensive internal fire safety systems, residents in Port Kembla, Cringila, and Warrawong should be aware that industrial incidents can generate substantial smoke plumes that enter residential properties. If a BlueScope-related smoke event affects your home — coating surfaces with industrial soot — this is a specialist restoration scenario. Industrial soot may contain compounds not present in residential fire smoke, requiring air quality testing before re-entry clearance and specialist cleaning methodology. Our contractors carry industrial soot assessment capability for these scenarios.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why is 1960s-era wiring in Wollongong terrace homes a fire risk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Wollongong's inner terrace housing stock — concentrated in Fairy Meadow, North Wollongong, and Wollongong East — was largely built during the 1950s and 1960s to house steelworks and industrial workers. Many of these properties retain original or minimally-updated electrical systems with rubber-insulated cables that become brittle and crack over time, creating conditions for arcing and wall-cavity fires. Wiring faults in these properties may smoulder for hours within wall cavities before flames reach living areas, making early detection difficult. Heritage terrace fire restoration in Wollongong requires structural opening of wall cavities to inspect the full extent of concealed damage, followed by full rewiring before reinstatement.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does fire damage restoration cost in Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fire damage restoration in Wollongong ranges from $4,000–$18,000 for a contained kitchen or terrace fire (soot removal, smoke odour treatment, minor repairs) to $15,000–$70,000 for structural fire damage in an Escarpment or suburban property. Escarpment properties with BAL-rated total loss or industrial-adjacent scenarios can reach $40,000–$300,000 or more depending on rebuild scope and specialist requirements. Our platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe.',
      },
    },
  ],
};

export default function FireDamageRestorationWollongongPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fdrgong-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdrgong-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdrgong-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Wollongong"
        subtitle="Emergency fire and smoke damage restoration across Wollongong and the Illawarra. IICRC-certified contractors respond as quickly as possible, 24 hours a day, 7 days a week."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Wollongong' },
        ]}
        sections={[
          {
            heading: 'Wollongong Fire Risk — Escarpment BAL Zones and Industrial BlueScope Precinct',
            body: (
              <>
                <p>
                  Wollongong&apos;s geography creates a distinctive fire risk profile. The Illawarra
                  Escarpment rises steeply immediately west and north of the coastal strip, placing
                  communities including Helensburgh, Stanwell Park, Thirroul, Scarborough, and Bulli
                  within or adjacent to bushfire-prone land. Properties on or near the Escarpment
                  carry Bushfire Attack Level (BAL) ratings — from BAL-12.5 through to BAL-FZ in
                  the most exposed locations — which acknowledge annual fire weather risk during
                  the October–January peak season. NSW Rural Fire Service fire trails and National
                  Park boundaries run immediately behind many of these communities.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  To the south, Port Kembla hosts BlueScope Steel&apos;s integrated steelworks —
                  Australia&apos;s largest steel production facility. The industrial precinct
                  represents a significant fire risk zone for adjacent residential areas in
                  Port Kembla, Cringila, Warrawong, and Coniston. Industrial smoke incidents
                  from the steelworks area require specialist residential assessment distinct
                  from standard fire damage restoration.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Kitchen fires and electrical faults in older residential stock remain the most
                  frequent cause of residential fire across greater Wollongong. The combination
                  of ageing housing and proximity to both bushland and industrial activity means
                  Wollongong&apos;s fire restoration scenarios require contractors with broad
                  capability across all fire types.
                </p>
              </>
            ),
          },
          {
            heading: 'Heritage Terrace Fire Restoration in Wollongong',
            body: (
              <>
                <p>
                  Wollongong&apos;s inner suburbs — Fairy Meadow, North Wollongong, and
                  Wollongong East — contain substantial stock of 1950s and 1960s brick terrace
                  and semi-detached housing built during the peak of BHP steelworks employment.
                  Many of these properties retain original electrical systems with rubber-insulated
                  cables that have become brittle and prone to failure.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Wall-cavity fires from aged wiring are a particular hazard in this housing stock:
                  a fault that begins within the wall framing can smoulder for extended periods
                  before breaking through to the visible surface, by which time significant concealed
                  structural damage may have occurred. Post-fire assessment in these properties
                  routinely reveals smoke penetration and charring extending well beyond the
                  initially visible damage zone.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Heritage terrace fire restoration in Wollongong typically involves:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wall cavity opening:</strong> Systematic removal of plasterboard or
                    fibrous cement lining to expose and assess the full extent of concealed smoke
                    and char damage within the timber frame.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full rewiring recommendation:</strong> Where the fire source is
                    confirmed as aged wiring, insurers and structural assessors typically recommend
                    a full rewire of the affected zones rather than partial replacement, to avoid
                    repeat ignition risk.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Masonry smoke treatment:</strong> Brick party walls and internal brick
                    chimneys absorb smoke odour into the substrate. Specialist sealing and
                    encapsulation of masonry is required before wall reinstatement.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Asbestos assessment:</strong> Pre-1985 fibrous cement sheeting in
                    Wollongong terrace homes may contain asbestos. Fire damage can release fibres
                    from previously stable bonded asbestos products. Licensed asbestos assessment
                    is required before restoration contractors proceed in properties of this era.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Areas We Cover',
            body: (
              <>
                <p>
                  Our contractor network covers the entire Wollongong LGA, Shellharbour, Kiama,
                  and the Shoalhaven.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Wollongong inner suburbs:</strong> Wollongong CBD, North Wollongong,
                  Wollongong East, Fairy Meadow, Gwynneville, Keiraville, Mount Keira,
                  Mount Saint Thomas, Figtree, Unanderra
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Escarpment and northern Illawarra:</strong> Thirroul, Austinmer,
                  Bulli, Stanwell Park, Helensburgh, Scarborough, Coledale, Coalcliff, Otford
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Port Kembla and southern:</strong> Port Kembla, Cringila, Warrawong,
                  Coniston, Windang, Lake Illawarra, Berkeley, Dapto, Koonawarra
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Shellharbour and Kiama:</strong> Shellharbour, Oak Flats, Albion Park,
                  Kiama, Gerringong, Berry
                </p>
                <p style={{ marginTop: '1rem' }}>
                  For Escarpment BAL zone properties, our contractors can coordinate with
                  licensed asbestos assessors and structural engineers experienced with
                  bushfire-affected building assessment in steeply sloped terrain.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does my insurance cover bushfire damage on the Illawarra Escarpment in a BAL zone?',
            answer:
              "Yes. Standard Australian home and contents policies cover bushfire damage as a named peril, including properties in BAL (Bushfire Attack Level) rated zones on the Illawarra Escarpment. Properties in Helensburgh, Stanwell Park, Thirroul, and Scarborough with BAL ratings (BAL-12.5 through BAL-FZ) are typically covered for structural fire loss, smoke damage, contents, and temporary accommodation. Note: ARPC (Australian Reinsurance Pool Corporation) does not apply to fire damage — it covers cyclone and terrorism events only. Your standard home insurer is the relevant party for bushfire claims. BAL ratings affect building construction requirements but do not reduce or limit insurance coverage for fire damage.",
          },
          {
            question: 'How does BlueScope industrial activity at Port Kembla affect residential fire risk in Wollongong?',
            answer:
              "BlueScope Steel's Port Kembla steelworks is Australia's largest integrated steelmaking facility and represents a significant industrial fire risk zone. While the steelworks has comprehensive internal fire safety systems, residents in Port Kembla, Cringila, and Warrawong should be aware that industrial incidents can generate substantial smoke plumes that enter residential properties. If a BlueScope-related smoke event affects your home — coating surfaces with industrial soot — this is a specialist restoration scenario. Industrial soot may contain compounds not present in residential fire smoke, requiring air quality testing before re-entry clearance and specialist cleaning methodology. Our contractors carry industrial soot assessment capability for these scenarios.",
          },
          {
            question: 'Why is 1960s-era wiring in Wollongong terrace homes a fire risk?',
            answer:
              "Wollongong's inner terrace housing stock — concentrated in Fairy Meadow, North Wollongong, and Wollongong East — was largely built during the 1950s and 1960s to house steelworks and industrial workers. Many of these properties retain original or minimally-updated electrical systems with rubber-insulated cables that become brittle and crack over time, creating conditions for arcing and wall-cavity fires. Wiring faults in these properties may smoulder for hours within wall cavities before flames reach living areas, making early detection difficult. Heritage terrace fire restoration in Wollongong requires structural opening of wall cavities to inspect the full extent of concealed damage, followed by full rewiring before reinstatement.",
          },
          {
            question: 'How much does fire damage restoration cost in Wollongong?',
            answer:
              'Fire damage restoration in Wollongong ranges from $4,000–$18,000 for a contained kitchen or terrace fire (soot removal, smoke odour treatment, minor repairs) to $15,000–$70,000 for structural fire damage in an Escarpment or suburban property. Escarpment properties with BAL-rated total loss or industrial-adjacent scenarios can reach $40,000–$300,000 or more depending on rebuild scope and specialist requirements. Our platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Wollongong',
            href: '/water-damage-restoration-wollongong',
            description: 'Water damage restoration across Wollongong and the Illawarra.',
          },
          {
            title: 'Storm Damage Wollongong',
            href: '/storm-damage-restoration-wollongong',
            description: 'Storm and wind damage restoration across Wollongong and the Illawarra Escarpment.',
          },
          {
            title: 'Flood Damage Wollongong',
            href: '/flood-damage-restoration-wollongong',
            description: 'Flood damage restoration for Illawarra flooding and coastal inundation events.',
          },
          {
            title: 'Fire Damage Sydney',
            href: '/fire-damage-restoration-sydney',
            description: 'Fire and smoke damage restoration across Greater Sydney.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
