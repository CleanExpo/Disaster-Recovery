import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-483: Flood Damage Restoration Wollongong
 *
 * Created: 9 April 2026
 * Context: Wollongong's flood risk is shaped by three distinct hazards: intense
 * escarpment runoff from the Illawarra Escarpment, lake level rise and storm
 * surge around Lake Illawarra, and Category 3 contamination risks in older
 * industrial suburbs. East coast lows regularly deliver 200–300mm+ in 24 hours.
 */

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Wollongong | IICRC Category 3 Emergency',
  description:
    'Professional flood damage restoration across Wollongong and the Illawarra. IICRC-certified Category 3 specialists for escarpment runoff, Lake Illawarra flooding, and industrial contamination. Lodge your claim 24/7.',
  keywords:
    'flood damage restoration wollongong, flood damage illawarra, lake illawarra flooding, illawarra escarpment flood damage, category 3 water damage wollongong, flood cleanup wollongong NSW',
  openGraph: {
    title: 'Flood Damage Restoration Wollongong | IICRC Category 3 Emergency',
    description:
      'Professional flood damage restoration across Wollongong and the Illawarra. IICRC-certified Category 3 specialists for escarpment runoff, Lake Illawarra flooding, and industrial contamination. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Flood+Damage+Restoration&city=Wollongong&service=flood-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/flood-damage-restoration-wollongong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/flood-damage-restoration-wollongong/#localbusiness`,
  name: `${NAP.name} Wollongong`,
  url: `${NAP.url}/flood-damage-restoration-wollongong`,
  description:
    'IICRC-certified Category 3 flood damage restoration contractors serving Wollongong and the Illawarra. Escarpment runoff, Lake Illawarra inundation, and industrial area contamination specialists. Full decontamination, structural drying, and insurance documentation.',
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
  name: 'Flood Damage Restoration Wollongong',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Wollongong' },
  serviceType: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration across Wollongong and the Illawarra. Category 3 inundation specialists: emergency extraction, escarpment runoff and industrial contamination decontamination, HEPA containment, structural drying, and post-remediation clearance testing.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is escarpment landslide and flood damage covered by home insurance in Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood damage from concentrated escarpment runoff entering your property during a storm event is typically covered under storm or water ingress provisions in standard policies — it is not the same as river inundation flood. Landslide or earth movement caused by the event may be subject to separate exclusions; coverage depends on your specific policy. NRPG documents and categorises all damage components to ensure the maximum claimable scope is lodged correctly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Lake Illawarra flooding covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Lake Illawarra inundation — where lake level rise or storm surge pushes water onto your property from the lake — is classified as flood under the ICA definition and requires a specific flood extension in standard policies. Stormwater runoff and rainwater entering through a breached structure during the same event is storm or water ingress and may be covered under standard provisions. NRPG's assessment separates flood and storm components for correct claim lodgement.",
      },
    },
    {
      '@type': 'Question',
      name: 'My Wollongong property is in an industrial area — does Category 3 apply to my flood damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Wollongong's older industrial suburbs — Port Kembla, Unanderra, Warrawong — have combined stormwater and industrial drainage infrastructure. Flood events in these areas frequently involve contaminated water carrying industrial residues and sewage overflow, which requires Category 3 protocols. NRPG assesses water category on-site and provides IICRC S500:2025 documentation to support the remediation scope lodged with your insurer.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does flood restoration cost in Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs depend on the flood source, inundation depth, and contamination category. Minor Category 2 flooding: $6,000–$22,000. Escarpment runoff with ground floor inundation: $15,000–$60,000. Category 3 industrial area flooding: $30,000–$100,000+. NRPG provides a full scope of works for insurance lodgement at no cost to you.',
      },
    },
  ],
};

export default function FloodDamageRestorationWollongongPage() {
  return (
    <>
      <Script
        id="fdgong-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdgong-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdgong-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="Flood Damage Restoration Wollongong"
        subtitle="IICRC-certified Category 3 flood damage restoration across Wollongong and the Illawarra. Escarpment runoff, Lake Illawarra, and industrial contamination specialists. priority response. Lodge your claim 24/7."
        gradient="linear-gradient(135deg, #0F2942 0%, #01579B 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Water Damage', href: '/services/water-damage' },
          { label: 'Wollongong Flood' },
        ]}
        sections={[
          {
            heading: 'Wollongong Flood Risk — Escarpment, Lake Illawarra, and East Coast Lows',
            body: (
              <>
                <p>
                  Wollongong&apos;s flood risk is unlike anywhere else in NSW. The city sits on a
                  narrow coastal strip between the Illawarra Escarpment and the Pacific Ocean, making
                  it exceptionally vulnerable to three distinct flood mechanisms: concentrated
                  escarpment runoff, lake inundation, and ocean-driven storm surge.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  East coast lows are the primary driver. The June 2016 Illawarra storm delivered
                  over 300mm in 24 hours, triggering widespread flash flooding, road closures, and
                  landslides across the escarpment corridor from Helensburgh to Thirroul. Properties
                  below the escarpment face the most acute risk: water concentrates as it descends
                  the steep gradient and can inundate subfloors and ground floors within minutes of
                  rainfall beginning, before council drainage systems can respond.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lake Illawarra creates a secondary flood mechanism for southern Wollongong.
                  Mullet Creek, Tom Thumb Lagoon, and the lake itself rise rapidly during storm
                  events, driving inundation across Warilla, Windang, Primbee, and Berkeley. When
                  onshore winds coincide with heavy rain, storm swell can push saltwater across
                  coastal ground floors from Thirroul to Coledale. The 1998 Wollongong storm remains
                  a benchmark event for the Kembla Grange, Unanderra, and Koonawarra areas, where
                  creek overflow caused significant Category 2 to 3 flood damage across residential
                  and light industrial properties.
                </p>
              </>
            ),
          },
          {
            heading: 'Category 3 Industrial and Escarpment Contamination',
            body: (
              <>
                <p>
                  Not all Wollongong flood events are equal from a contamination standpoint. The
                  escarpment corridor typically delivers Category 2 stormwater during moderate
                  events, escalating to Category 3 when the volume and velocity overwhelm drainage
                  and carry soil, organic matter, and roadway runoff into structures.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Wollongong&apos;s industrial heritage creates a distinct Category 3 risk in its
                  older suburbs. Port Kembla, Unanderra, and Warrawong share combined
                  stormwater and industrial drainage infrastructure &mdash; a legacy of the
                  region&apos;s steelworks era. During flood events, this infrastructure can
                  backflow industrial residues and sewage contamination directly into residential
                  flood water, requiring full Category 3 decontamination protocols:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Removal of all porous materials in the flood zone (plasterboard, insulation,
                    carpet, soft furnishings)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    HEPA containment and negative air scrubbing throughout remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial decontamination of all structural surfaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Subfloor treatment — Wollongong&apos;s older housing stock (fibro, hardwood
                    subfloor construction) retains moisture in ways that require extended drying
                    programs
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Post-remediation clearance testing before reinstatement
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Wollongong insurers require IICRC S500:2025 documentation for Category 3 claim
                  sign-off. Non-certified work cannot produce the documentation required for
                  settlement.
                </p>
              </>
            ),
          },
          {
            heading: 'Wollongong Areas We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  priority emergency response for Category 3 extraction across Greater Wollongong
                  and the Illawarra:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Lake Illawarra (lake rise and storm surge):</strong> Warilla, Windang,
                  Primbee, Berkeley, Shellharbour
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Escarpment corridor (concentrated runoff):</strong> Thirroul, Austinmer,
                  Coledale, Stanwell Park, Helensburgh, Scarborough
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inland and industrial suburbs:</strong> Kembla Grange, Unanderra,
                  Koonawarra, Dapto, Warrawong, Port Kembla
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Wollongong inner (Towradgi Creek corridor):</strong> Wollongong East,
                  Fairy Meadow, Towradgi, Corrimal
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Illawarra:</strong> Shellharbour, Albion Park Rail, Oak Flats,
                  Dunmore
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>General Illawarra coverage:</strong> All Wollongong, Shellharbour, and
                  Kiama LGAs &mdash; priority response for Category 3 extraction
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question:
              'Is escarpment landslide and flood damage covered by home insurance in Wollongong?',
            answer:
              'Flood damage from concentrated escarpment runoff entering your property during a storm event is typically covered under storm or water ingress provisions in standard policies — it is not the same as river inundation flood. Landslide or earth movement caused by the event may be subject to separate exclusions; coverage depends on your specific policy. NRPG documents and categorises all damage components to ensure the maximum claimable scope is lodged correctly.',
          },
          {
            question: 'Is Lake Illawarra flooding covered by home insurance?',
            answer:
              "Lake Illawarra inundation — where lake level rise or storm surge pushes water onto your property from the lake — is classified as flood under the ICA definition and requires a specific flood extension in standard policies. Stormwater runoff and rainwater entering through a breached structure during the same event is storm or water ingress and may be covered under standard provisions. NRPG's assessment separates flood and storm components for correct claim lodgement.",
          },
          {
            question:
              'My Wollongong property is in an industrial area — does Category 3 apply to my flood damage?',
            answer:
              "Wollongong's older industrial suburbs — Port Kembla, Unanderra, Warrawong — have combined stormwater and industrial drainage infrastructure. Flood events in these areas frequently involve contaminated water carrying industrial residues and sewage overflow, which requires Category 3 protocols. NRPG assesses water category on-site and provides IICRC S500:2025 documentation to support the remediation scope lodged with your insurer.",
          },
          {
            question: 'How much does flood restoration cost in Wollongong?',
            answer:
              'Costs depend on the flood source, inundation depth, and contamination category. Minor Category 2 flooding: $6,000–$22,000. Escarpment runoff with ground floor inundation: $15,000–$60,000. Category 3 industrial area flooding: $30,000–$100,000+. NRPG provides a full scope of works for insurance lodgement at no cost to you.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Wollongong',
            href: '/water-damage-restoration-wollongong',
            description: 'Emergency water damage restoration across all Wollongong suburbs.',
          },
          {
            title: 'Storm Damage Restoration Wollongong',
            href: '/storm-damage-restoration-wollongong',
            description: 'Storm damage restoration and insurance claim support for Wollongong.',
          },
          {
            title: 'Flood Damage Restoration Sydney',
            href: '/flood-damage-restoration-sydney',
            description:
              'Category 3 flood damage restoration across greater Sydney and western Sydney.',
          },
          {
            title: 'Flood Damage Restoration Newcastle',
            href: '/flood-damage-restoration-newcastle',
            description:
              'IICRC-certified flood damage restoration across Newcastle and the Hunter Valley.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
