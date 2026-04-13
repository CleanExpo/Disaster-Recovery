import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Newcastle | 24/7 Emergency Response',
  description:
    'Emergency fire damage restoration across Newcastle and the Hunter region. IICRC-certified contractors for industrial fire scenarios, heritage terrace restoration, and Upper Hunter bushfire damage. Available 24/7.',
  keywords:
    'fire damage restoration newcastle, fire damage newcastle, smoke damage newcastle, industrial fire newcastle, heritage terrace fire newcastle, upper hunter bushfire, hunter region fire restoration',
  openGraph: {
    title: 'Fire Damage Restoration Newcastle | 24/7 Emergency Response',
    description:
      'Emergency fire damage restoration across Newcastle and the Hunter region. IICRC-certified contractors for industrial fire scenarios, heritage terrace restoration, and Upper Hunter bushfire damage. Available 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Fire+Damage+Restoration&city=Newcastle&service=fire-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-newcastle`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-newcastle/#localbusiness`,
  name: `${NAP.name} Newcastle`,
  url: `${NAP.url}/fire-damage-restoration-newcastle`,
  description:
    '24/7 emergency fire damage restoration across Newcastle and the Hunter region. IICRC-certified contractor network for industrial fire scenarios, heritage inner-suburb terrace restoration, kitchen and electrical fires, and Upper Hunter bushfire damage.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Newcastle',
    containedInPlace: { '@type': 'State', name: 'New South Wales' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Newcastle',
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
  name: 'Emergency Fire Damage Restoration Newcastle',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Newcastle' },
  serviceType: 'Fire Damage Restoration',
  description:
    'Professional fire and smoke damage restoration in Newcastle. Services include emergency board-up, soot and smoke removal, odour elimination, heritage terrace reinstatement, contents restoration, and industrial fire scene remediation.',
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
      name: 'Is Upper Hunter bushfire damage covered by home insurance in NSW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Standard Australian home and contents policies cover bushfire damage as a named peril. Upper Hunter properties in Cessnock, Singleton, and Muswellbrook are typically covered for structural fire loss, smoke damage, contents, and temporary accommodation. ARPC (Australian Reinsurance Pool Corporation) does not apply to fire damage — it covers cyclone and terrorism events only. Your standard home insurer is the relevant party for bushfire claims in the Hunter Valley.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does fire damage restoration work after an industrial fire near the Newcastle precinct?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Industrial fire scenes — particularly in the Mayfield, Carrington, and adjacent industrial precinct — involve additional complexity beyond residential restoration. Smoke from industrial fires may contain chemical compounds from stored materials, plastics, or industrial residues that require specialist air quality testing before re-entry. Our contractors carry equipment for industrial soot composition assessment, HEPA-grade air filtration during cleanup, and full personal protective equipment for first-entry scenarios. We coordinate with WorkSafe NSW requirements for any fire scenes involving commercial premises.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are heritage terraces in Newcastle at elevated fire risk from old wiring?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Newcastle's inner suburbs — Cooks Hill, Hamilton, Islington, and Wickham — contain a significant stock of pre-1960s terrace homes. Many retain original or partially-updated wiring including single-wire earth return (SWER) configurations and rubber-insulated cables that degrade with age. These systems are susceptible to arcing and smouldering fires within wall cavities before flames become visible. Heritage terrace fire restoration requires careful structural assessment to preserve original materials where possible, coordination with Heritage NSW where properties are listed, and specialist smoke removal from sandstone, exposed brick, and original timber flooring.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does fire damage restoration cost in Newcastle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fire damage restoration in Newcastle ranges from $4,000–$18,000 for a contained kitchen or electrical fire (soot removal, smoke odour treatment, minor repairs) to $15,000–$70,000 for structural fire damage in a terrace or suburban home. Industrial or heritage properties with significant structural damage or specialist material requirements can reach $40,000–$200,000 or more. Our platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe.',
      },
    },
  ],
};

export default function FireDamageRestorationNewcastlePage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="fdrnewc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdrnewc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdrnewc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Newcastle"
        subtitle="Emergency fire and smoke damage restoration across Newcastle, the Hunter Valley, and Upper Hunter. IICRC-certified contractors respond as quickly as possible, 24 hours a day, 7 days a week."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Newcastle' },
        ]}
        sections={[
          {
            heading: 'Newcastle Fire Risk — Industrial Heritage and Upper Hunter Bushfires',
            body: (
              <>
                <p>
                  Newcastle carries a fire risk profile shaped by its industrial history and its
                  proximity to the Upper Hunter&apos;s bushfire-prone landscape. The city&apos;s
                  industrial precinct — centred on Mayfield, Carrington, and the former BHP
                  Steelworks site — represents one of NSW&apos;s most significant concentrations
                  of industrial fire hazard. While BHP&apos;s steelmaking operations ceased in 1999,
                  the area retains chemical storage, heavy manufacturing, and port-related industrial
                  activity. Industrial fires in this precinct involve specialist restoration scenarios
                  distinct from residential work: chemical residue in smoke, structural steel
                  assessment, and WorkSafe NSW compliance.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  To the north-west, the Upper Hunter — Cessnock, Singleton, and Muswellbrook —
                  experienced significant bushfire activity during the 2019–20 Black Summer. The
                  combination of mining operations, dry inland conditions, and extensive rural
                  property stock creates ongoing fire weather risk in the Hunter Valley. Properties
                  along ridge lines and in rural-residential zones face annual elevated fire danger
                  during August–November.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Kitchen and electrical fires remain the dominant residential fire cause across
                  greater Newcastle&apos;s suburban areas. In coastal suburbs like The Hill,
                  Bar Beach, and Hamilton South, the density of period housing stock creates
                  localised risk clusters where older wiring and compact lot boundaries allow
                  fire to spread quickly between properties.
                </p>
              </>
            ),
          },
          {
            heading: 'Heritage Terrace Fire Restoration in Newcastle Inner Suburbs',
            body: (
              <>
                <p>
                  Newcastle&apos;s inner-suburb terrace housing stock — concentrated in Cooks Hill,
                  Hamilton, Islington, Georgetown, and Wickham — presents specific fire restoration
                  challenges. Many of these pre-1960s terrace homes retain original or partially
                  updated wiring. Single-wire earth return (SWER) configurations and rubber-insulated
                  cables that have degraded over decades are prone to arcing and smouldering fires
                  within wall cavities before flames reach living spaces.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Heritage terrace fire restoration differs from standard residential work in several
                  key ways:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural assessment of original materials:</strong> Sandstone foundations,
                    exposed brick party walls, and original timber joinery must be assessed for
                    structural integrity before demolition decisions are made. Restoration over
                    replacement is often both the insurer&apos;s preference and a Heritage NSW
                    requirement for listed properties.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Smoke penetration in original materials:</strong> Sandstone and exposed
                    brick absorb smoke odour deeply. Standard chemical sponge cleaning is
                    insufficient — specialist masonry treatment and extended HEPA vacuuming are
                    required before sealing.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Party wall scenarios:</strong> Terrace homes share structural walls with
                    neighbours. Fire or smoke damage that crosses a party wall boundary triggers a
                    multi-ownership restoration scenario requiring separate claim documentation for
                    each affected property.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Heritage listing compliance:</strong> Properties on the NSW State Heritage
                    Register or Newcastle City Council heritage schedules require restoration
                    methodology approval before work commences. Our network includes contractors
                    with heritage residential experience.
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
                  Our contractor network covers greater Newcastle, Lake Macquarie, Maitland, and
                  the Hunter Valley.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Newcastle inner suburbs:</strong> Newcastle CBD, The Hill, Cooks Hill,
                  Hamilton, Hamilton North, Hamilton East, Islington, Wickham, Carrington,
                  Mayfield, Waratah, Adamstown, Bar Beach, Merewether
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Lake Macquarie:</strong> Charlestown, Warners Bay, Belmont, Gateshead,
                  Morisset, Toronto, Cardiff, Eleebana, Speers Point
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Maitland and Hunter Valley:</strong> Maitland, East Maitland, Cessnock,
                  Kurri Kurri, Singleton, Muswellbrook, Rutherford, Thornton, Branxton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Port Stephens and northern Hunter:</strong> Raymond Terrace, Medowie,
                  Nelson Bay, Anna Bay, Salamander Bay, Tomaree Peninsula
                </p>
                <p style={{ marginTop: '1rem' }}>
                  For Upper Hunter bushfire scenes, our contractors can coordinate licensed asbestos
                  assessors for older rural properties, particularly fibro-clad farm buildings
                  and rural residential homes built before 1985.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Upper Hunter bushfire damage covered by home insurance in NSW?',
            answer:
              "Yes. Standard Australian home and contents policies cover bushfire damage as a named peril. Upper Hunter properties in Cessnock, Singleton, and Muswellbrook are typically covered for structural fire loss, smoke damage, contents, and temporary accommodation. ARPC (Australian Reinsurance Pool Corporation) does not apply to fire damage — it covers cyclone and terrorism events only. Your standard home insurer is the relevant party for bushfire claims in the Hunter Valley.",
          },
          {
            question: 'How does fire damage restoration work after an industrial fire near the Newcastle precinct?',
            answer:
              'Industrial fire scenes — particularly in the Mayfield, Carrington, and adjacent industrial precinct — involve additional complexity beyond residential restoration. Smoke from industrial fires may contain chemical compounds from stored materials, plastics, or industrial residues that require specialist air quality testing before re-entry. Our contractors carry equipment for industrial soot composition assessment, HEPA-grade air filtration during cleanup, and full personal protective equipment for first-entry scenarios. We coordinate with WorkSafe NSW requirements for any fire scenes involving commercial premises.',
          },
          {
            question: 'Why are heritage terraces in Newcastle at elevated fire risk from old wiring?',
            answer:
              "Newcastle's inner suburbs — Cooks Hill, Hamilton, Islington, and Wickham — contain a significant stock of pre-1960s terrace homes. Many retain original or partially-updated wiring including single-wire earth return (SWER) configurations and rubber-insulated cables that degrade with age. These systems are susceptible to arcing and smouldering fires within wall cavities before flames become visible. Heritage terrace fire restoration requires careful structural assessment to preserve original materials where possible, coordination with Heritage NSW where properties are listed, and specialist smoke removal from sandstone, exposed brick, and original timber flooring.",
          },
          {
            question: 'How much does fire damage restoration cost in Newcastle?',
            answer:
              'Fire damage restoration in Newcastle ranges from $4,000–$18,000 for a contained kitchen or electrical fire (soot removal, smoke odour treatment, minor repairs) to $15,000–$70,000 for structural fire damage in a terrace or suburban home. Industrial or heritage properties with significant structural damage or specialist material requirements can reach $40,000–$200,000 or more. Our platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Newcastle',
            href: '/water-damage-restoration-newcastle',
            description: 'Water damage restoration across Newcastle and the Hunter region.',
          },
          {
            title: 'Storm Damage Newcastle',
            href: '/storm-damage-restoration-newcastle',
            description: 'Storm and wind damage restoration across Newcastle and Lake Macquarie.',
          },
          {
            title: 'Flood Damage Newcastle',
            href: '/flood-damage-restoration-newcastle',
            description: 'Flood damage restoration for Hunter River and coastal flooding events.',
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
