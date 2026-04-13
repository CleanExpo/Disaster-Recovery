import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-482: Flood Damage Restoration Newcastle
 *
 * Created: 9 April 2026
 * Context: The Hunter Valley is one of NSW's most flood-prone regions.
 * Maitland — 30km from Newcastle — is known as "Australia's Most Flooded City".
 * The June 2021 Hunter Valley floods inundated 18,000+ homes and businesses.
 * Agricultural land use across the valley means Category 3 contamination from
 * animal waste is a defining characteristic of Hunter flood events.
 */

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Newcastle | IICRC Category 3 Emergency',
  description:
    'Professional flood damage restoration across Newcastle and the Hunter Valley. IICRC-certified Category 3 specialists for Hunter River flooding, agricultural contamination, and urban creek inundation. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration newcastle, flood damage hunter valley, maitland flood damage, hunter river flooding damage, category 3 water damage newcastle, flood cleanup newcastle NSW',
  openGraph: {
    title: 'Flood Damage Restoration Newcastle | IICRC Category 3 Emergency',
    description:
      'Professional flood damage restoration across Newcastle and the Hunter Valley. IICRC-certified Category 3 specialists for Hunter River flooding, agricultural contamination, and urban creek inundation. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Flood+Damage+Restoration&city=Newcastle&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-newcastle`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-newcastle/#localbusiness`,
  name: `${NAP.name} Newcastle`,
  url: `${NAP.url}/flood-damage-restoration-newcastle`,
  description:
    'IICRC-certified Category 3 flood damage restoration contractors serving Newcastle, Maitland, and the Hunter Valley. Hunter River, Williams River, and urban creek flooding specialists. Full decontamination including agricultural contamination, structural drying, and insurance documentation.',
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
  name: 'Flood Damage Restoration Newcastle',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Newcastle' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Newcastle and the Hunter Valley. Category 3 inundation specialists: emergency extraction, agricultural contamination decontamination, HEPA containment, structural drying, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I still lodge a claim for the June 2021 Hunter Valley floods?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lodgement windows depend on your specific policy, but most insurers accept late claims where damage was not fully identified at the time. Hidden moisture damage — particularly in subfloors, wall cavities, and under slabs — from the 2021 floods is still presenting in Hunter Valley properties. NRPG can perform a post-flood assessment and provide documentation to support a supplementary or late claim lodgement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is agricultural Category 3 contamination covered by standard home insurance in the Hunter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Flood cover that includes inundation from the Hunter River generally covers the resulting Category 3 remediation costs, regardless of the contamination source — including animal waste from nearby agricultural properties. The insurer's scope may attempt to limit remediation to Category 2 protocols; NRPG's IICRC-certified assessment ensures the correct Category 3 scope is documented and lodged.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does Hunter River flood damage differ from storm water ingress for insurance purposes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the ICA flood definition, river inundation — water overflowing the Hunter River or its tributaries onto your property — is classified as flood and requires a specific flood extension in standard policies. Rainwater entering through a breached roof, wall, or window during the same event is storm or water ingress and is covered under standard storm provisions. Many Hunter Valley properties experienced both during 2021. NRPG delineates each component to maximise your claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does flood restoration cost in the Newcastle and Hunter Valley region?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs vary significantly by inundation depth, contamination level, and property type. Minor ground floor flooding: $6,000–$25,000. Full inundation with Category 3 decontamination: $15,000–$70,000. Rural residential properties with agricultural contamination: $40,000–$150,000+. NRPG provides a full scope of works for insurance lodgement at no cost to you.',
      },
    },
  ],
};

export default function FloodDamageRestorationNewcastlePage() {
  return (
    <>
      <Script
        id="fdnewc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdnewc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdnewc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Newcastle"
        subtitle="IICRC-certified Category 3 flood damage restoration across Newcastle, Maitland, and the Hunter Valley. Hunter River specialists — including agricultural contamination. priority response. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Newcastle Flood' },
        ]}
        sections={[
          {
            heading: "The Hunter Region's Flood History — Maitland and the 2021 Disaster",
            body: (
              <>
                <p>
                  Maitland, 30 kilometres from Newcastle&apos;s CBD, holds the grim distinction of
                  being known as &ldquo;Australia&apos;s Most Flooded City.&rdquo; The Hunter River has
                  breached its banks with catastrophic regularity &mdash; 1949, 1955, 2007, and most
                  recently June 2021, when the Hunter Valley experienced its worst flooding since 1955.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The June 2021 event inundated the Maitland CBD and surrounding residential suburbs
                  including East Maitland, Lorn, and Bolwarra. Over 18,000 homes and businesses across
                  the Hunter were affected. Properties sat under water for days, generating the full
                  spectrum of Category 3 contamination: sewage, chemical runoff, and &mdash; critically
                  for the Hunter &mdash; agricultural waste from the valley&apos;s farming properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Williams River and Paterson River corridors also carry significant risk for
                  smaller communities including Dungog, Paterson, and Vacy. The 2015 Dungog flash
                  floods were particularly severe &mdash; the Williams River delivered catastrophic
                  inundation to the town of Dungog with multiple fatalities and widespread Category 3
                  contamination throughout the township.
                </p>
              </>
            ),
          },
          {
            heading: 'Category 3 Contamination — Agricultural Flooding in the Hunter Valley',
            body: (
              <>
                <p>
                  What sets Hunter Valley flood damage apart from most other Australian urban flood
                  events is the agricultural contamination loading. The Hunter is home to a dense
                  network of chicken farms, piggeries, and cattle properties. When the Hunter River
                  and its tributaries break their banks, floodwater carries animal waste, effluent,
                  and agricultural chemical runoff directly into residential properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  This makes Category 3 contamination protocols mandatory for virtually all Hunter
                  Valley flood jobs &mdash; not just properties directly adjacent to waterways. Rural
                  residential properties on acreage require:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full removal of all porous materials in the flood zone (plasterboard, insulation,
                    carpet, soft furnishings, subfloor materials)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    HEPA containment, negative air pressure, and full respiratory PPE throughout
                    remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial decontamination of all structural surfaces with appropriate dwell
                    times
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Extended structural drying due to rural construction types (hardwood framing,
                    concrete slabs, fibro cladding)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Post-remediation clearance testing before reinstatement
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Newcastle&apos;s inner-city suburbs carry their own contamination risk. Throsby Creek
                  and Styx Creek &mdash; urban drainage channels running through Hamilton, Islington,
                  Georgetown, and Carrington &mdash; carry combined stormwater and sewage overflow
                  loads during major rain events, generating Category 3 conditions in properties along
                  both creek corridors. Hunter Valley insurers require IICRC S500:2025 documentation
                  for Category 3 claim sign-off.
                </p>
              </>
            ),
          },
          {
            heading: 'Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  priority emergency response for Category 3 extraction across Greater Newcastle and
                  the Hunter Valley:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Hunter River main flood plain (highest risk):</strong> Maitland, East
                  Maitland, Lorn, Bolwarra, Morpeth, Hinton, Seahampton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Williams and Paterson River corridor:</strong> Dungog, Paterson, Vacy,
                  Gresford, Clarence Town
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Newcastle inner suburbs (Throsby/Styx Creek):</strong> Hamilton, Islington,
                  Georgetown, Carrington, Tighes Hill
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Cessnock and Kurri Kurri corridor:</strong> Cessnock, Kurri Kurri, Aberdare,
                  Abernethy, Heddon Greta
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Lake Macquarie low-lying areas:</strong> Belmont, Swansea, Morisset,
                  Bonnells Bay, Wyee
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>General Hunter coverage:</strong> All Hunter Valley and Lake Macquarie LGAs
                  &mdash; priority response for Category 3 extraction
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Can I still lodge a claim for the June 2021 Hunter Valley floods?',
            answer:
              'Lodgement windows depend on your specific policy, but most insurers accept late claims where damage was not fully identified at the time. Hidden moisture damage — particularly in subfloors, wall cavities, and under slabs — from the 2021 floods is still presenting in Hunter Valley properties. NRPG can perform a post-flood assessment and provide documentation to support a supplementary or late claim lodgement.',
          },
          {
            question:
              'Is agricultural Category 3 contamination covered by standard home insurance in the Hunter?',
            answer:
              "Flood cover that includes inundation from the Hunter River generally covers the resulting Category 3 remediation costs, regardless of the contamination source — including animal waste from nearby agricultural properties. The insurer's scope may attempt to limit remediation to Category 2 protocols; NRPG's IICRC-certified assessment ensures the correct Category 3 scope is documented and lodged.",
          },
          {
            question:
              'How does Hunter River flood damage differ from storm water ingress for insurance purposes?',
            answer:
              "Under the ICA flood definition, river inundation — water overflowing the Hunter River or its tributaries onto your property — is classified as flood and requires a specific flood extension in standard policies. Rainwater entering through a breached roof, wall, or window during the same event is storm or water ingress and is covered under standard storm provisions. Many Hunter Valley properties experienced both during 2021. NRPG delineates each component to maximise your claim.",
          },
          {
            question:
              'How much does flood restoration cost in the Newcastle and Hunter Valley region?',
            answer:
              'Costs vary significantly by inundation depth, contamination level, and property type. Minor ground floor flooding: $6,000–$25,000. Full inundation with Category 3 decontamination: $15,000–$70,000. Rural residential properties with agricultural contamination: $40,000–$150,000+. NRPG provides a full scope of works for insurance lodgement at no cost to you.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Newcastle',
            href: '/water-damage-restoration-newcastle',
            description: 'Emergency water damage restoration across all Newcastle suburbs.',
          },
          {
            title: 'Storm Damage Restoration Newcastle',
            href: '/storm-damage-restoration-newcastle',
            description: 'Storm damage restoration and insurance claim support for Newcastle.',
          },
          {
            title: 'Flood Damage Restoration Sydney',
            href: '/flood-damage-restoration-sydney',
            description:
              'Category 3 flood damage restoration across greater Sydney and western Sydney.',
          },
          {
            title: 'Flood Damage Restoration Brisbane',
            href: '/flood-damage-restoration-brisbane',
            description:
              'IICRC-certified flood damage restoration across Brisbane and South East Queensland.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
