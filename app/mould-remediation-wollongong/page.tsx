import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * Mould Remediation Wollongong
 *
 * Created: 9 April 2026
 * Context: Post-2016 Illawarra storm mould (300mm+ in 24h) remains endemic in
 * improperly dried properties. Escarpment humidity at Thirroul, Austinmer, and
 * Coledale (80%+ ambient) makes mould an ongoing challenge. Pacific salt-laden air
 * accelerates mould establishment in porous materials. Heritage terrace cavity
 * brick construction in Fairy Meadow and North Wollongong retains moisture.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Wollongong | IICRC S520 Certified Emergency',
  description:
    'Professional mould remediation across Wollongong and the Illawarra. IICRC S520-certified contractors for post-storm mould, escarpment humidity remediation, and heritage property mould. 48-hour response.',
  keywords:
    'mould remediation wollongong, mould removal wollongong, black mould wollongong, mould after flooding wollongong, illawarra mould, mould inspection wollongong NSW',
  openGraph: {
    title: 'Mould Remediation Wollongong | IICRC S520 Certified Emergency',
    description:
      'Professional mould remediation across Wollongong and the Illawarra. IICRC S520-certified contractors for post-storm mould, escarpment humidity remediation, and heritage property mould.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Wollongong&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-wollongong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-wollongong/#localbusiness`,
  name: `${NAP.name} Wollongong`,
  url: `${NAP.url}/mould-remediation-wollongong`,
  description:
    'IICRC S520-certified mould remediation contractors serving Wollongong, the Illawarra escarpment, Shellharbour, and Kiama. Post-storm and escarpment humidity mould specialists. HEPA remediation and full insurance documentation.',
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
  name: 'Mould Remediation Wollongong',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Wollongong' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Wollongong and the Illawarra to IICRC S520 standard. Physical containment, HEPA filtration, antimicrobial treatment, removal of contaminated materials, and post-clearance air sampling.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is post-flood mould covered by home insurance in Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould caused by a covered flood or storm event is generally covered under home and contents policies that include flood or storm cover. The critical factor is establishing causation — documentation showing the mould is a direct result of the water event, not pre-existing or caused by maintenance failure. IICRC-certified scope of works provides the causation evidence insurers require. If your insurer has declined or underpaid, AFCA dispute lodgement is available.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is mould so difficult to control in escarpment properties near Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Properties at the base of the Illawarra Escarpment — Thirroul, Austinmer, Coledale, and Stanwell Park — experience ambient humidity consistently above 80% due to the rainforest escarpment microclimate. At this humidity level, mould can establish and grow on any organic surface without a water damage event. Ongoing mould management requires improved ventilation, vapour barriers, and in established cases, professional IICRC S520 remediation to eliminate existing colonies before mechanical solutions can maintain control.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost in Wollongong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould remediation costs in Wollongong range from $1,500–$7,000 for Category 1 surface mould; $4,000–$18,000 for post-flood wall cavity remediation; and $8,000–$40,000+ for whole-house remediation in escarpment properties with pervasive humidity-driven mould. Heritage terrace properties in Fairy Meadow and North Wollongong requiring lime plaster removal sit at the higher end. All scopes include IICRC S520 documentation for insurance.',
      },
    },
  ],
};

export default function MouldRemediationWollongongPage() {
  return (
    <>
      <Script
        id="mrgong-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrgong-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrgong-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Wollongong"
        subtitle="IICRC S520-certified mould remediation across Wollongong, the Illawarra escarpment, Shellharbour, and Kiama. Post-storm mould specialists and escarpment humidity remediation. 48-hour response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Wollongong' },
        ]}
        sections={[
          {
            heading: 'Escarpment Humidity and Post-Flood Mould in the Illawarra',
            body: (
              <>
                <p>
                  In June 2016, an east coast low delivered more than 300mm of rainfall to the Illawarra in
                  24 hours — one of the heaviest rainfall events in the region&apos;s recorded history. Properties
                  across Wollongong, Dapto, Shellharbour, and the northern escarpment suburbs were flooded.
                  Many received surface drying treatment in the immediate aftermath but were never fully
                  assessed or remediated to IICRC S500 and S520 standards. Secondary mould from that event
                  is now endemic across improperly dried Illawarra properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The underlying environmental driver is the Illawarra Escarpment itself. Properties at the
                  base of the escarpment — particularly in Thirroul, Austinmer, Coledale, and Stanwell Park —
                  sit in a microclimate where ambient relative humidity regularly exceeds 80%. The escarpment
                  rainforest acts as a moisture catchment: fog and cloud condensation drip continuously from
                  the canopy, keeping soil and building materials damp year-round. In these conditions, mould
                  does not need a water damage event to establish — it grows on any organic material that
                  is inadequately ventilated.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Pacific Ocean proximity adds a further complication: salt-laden ocean air accelerates mould
                  establishment in porous materials. Brick, concrete, and timber weatherboards absorb salt
                  moisture from the air, creating a persistent damp substrate. Coastal properties without
                  adequate cross-ventilation and vapour management experience chronic mould regardless of
                  the absence of a water damage event.
                </p>
              </>
            ),
          },
          {
            heading: 'Wollongong&apos;s Coastal Mould Conditions',
            body: (
              <>
                <p>
                  Heritage terrace homes in Fairy Meadow and North Wollongong share construction characteristics
                  with Newcastle&apos;s inner suburbs: cavity brick walls, lime plaster finishes, and older
                  insulation materials that absorb and retain moisture far longer than modern construction.
                  Post-storm water ingress in these properties establishes mould in the wall cavity that is
                  invisible at the surface — detectable only with thermal imaging or moisture mapping equipment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Wollongong CBD and inner suburbs also contain a significant volume of older apartment and
                  unit stock where bathroom and laundry ventilation is inadequate. Chronic surface mould in
                  these properties requires professional remediation before ventilation improvements can
                  maintain a mould-free environment long-term.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-storm water ingress mould:</strong> Mould appearing 3–8 weeks after a roof
                    or window failure during a storm event. Often in ceiling voids or behind linings.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Escarpment humidity mould:</strong> Chronic mould on wall surfaces, in wardrobes,
                    and under flooring driven by ambient humidity above 80%. Most common in northern escarpment
                    suburbs without mechanical ventilation.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-flood cavity mould:</strong> Wall cavity and subfloor mould from past flood
                    events that were inadequately remediated. Requires thermal imaging to locate and S520
                    remediation to resolve.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  48-hour response across Wollongong, the Illawarra, and the South Coast:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner Wollongong:</strong> Wollongong CBD, Fairy Meadow, North Wollongong,
                  Coniston, Gwynneville
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Escarpment:</strong> Thirroul, Austinmer, Coledale, Stanwell Park,
                  Scarborough
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Wollongong:</strong> Dapto, Kembla Grange, Unanderra, Figtree,
                  Mount Warrigal
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Shellharbour:</strong> Shellharbour, Warilla, Lake Illawarra, Albion Park,
                  Albion Park Rail
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Kiama and South Coast:</strong> Kiama, Gerringong, Berry, Nowra
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge your claim at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate
                  contractor matching across any Wollongong or Illawarra suburb.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is post-flood mould covered by home insurance in Wollongong?',
            answer:
              'Mould caused by a covered flood or storm event is generally covered under home and contents policies that include flood or storm cover. The critical factor is establishing causation — documentation showing the mould is a direct result of the water event, not pre-existing or caused by maintenance failure. IICRC-certified scope of works provides the causation evidence insurers require. If your insurer has declined or underpaid, AFCA dispute lodgement is available.',
          },
          {
            question: 'Why is mould so difficult to control in escarpment properties near Wollongong?',
            answer:
              'Properties at the base of the Illawarra Escarpment — Thirroul, Austinmer, Coledale, and Stanwell Park — experience ambient humidity consistently above 80% due to the rainforest escarpment microclimate. At this humidity level, mould can establish and grow on any organic surface without a water damage event. Ongoing mould management requires improved ventilation, vapour barriers, and in established cases, professional IICRC S520 remediation to eliminate existing colonies before mechanical solutions can maintain control.',
          },
          {
            question: 'How much does mould remediation cost in Wollongong?',
            answer:
              'Mould remediation costs in Wollongong range from $1,500–$7,000 for Category 1 surface mould; $4,000–$18,000 for post-flood wall cavity remediation; and $8,000–$40,000+ for whole-house remediation in escarpment properties with pervasive humidity-driven mould. Heritage terrace properties in Fairy Meadow and North Wollongong requiring lime plaster removal sit at the higher end. All scopes include IICRC S520 documentation for insurance.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Wollongong',
            href: '/water-damage-restoration-wollongong',
            description: 'Emergency water damage restoration across Wollongong and the Illawarra.',
          },
          {
            title: 'Flood Damage Restoration Wollongong',
            href: '/flood-damage-restoration-wollongong',
            description: 'Flood damage restoration and post-flood remediation for the Illawarra.',
          },
          {
            title: 'Storm Damage Restoration Wollongong',
            href: '/storm-damage-restoration-wollongong',
            description: 'Storm damage restoration and insurance claim support for Wollongong.',
          },
          {
            title: 'Mould Remediation Sydney',
            href: '/mould-remediation-sydney',
            description: 'IICRC S520-certified mould remediation across all Sydney suburbs.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
