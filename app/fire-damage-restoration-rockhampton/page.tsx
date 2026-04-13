import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR: Fire Damage Restoration Rockhampton
 * Central QLD fire restoration — Mount Archer bushfire interface, Fitzroy flood electrical fire risk
 */

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Rockhampton | 24/7 IICRC Certified',
  description:
    'Fire and smoke damage restoration across Rockhampton and Central Queensland. IICRC S700:2025 certified. Bushfire interface risk, industrial fire, structural fire. priority response.',
  keywords:
    'fire damage restoration rockhampton, fire damage rockhampton, smoke damage rockhampton, central queensland fire restoration, IICRC rockhampton fire',
  openGraph: {
    title: 'Fire Damage Restoration Rockhampton | 24/7 IICRC Certified',
    description:
      'Fire and smoke damage restoration across Rockhampton and Central Queensland. IICRC S700:2025 certified. Bushfire interface risk, industrial fire, structural fire. priority response.',
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-rockhampton`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-rockhampton/#localbusiness`,
  name: `${NAP.name} Rockhampton`,
  url: `${NAP.url}/fire-damage-restoration-rockhampton`,
  description:
    '24/7 emergency fire damage restoration across Rockhampton and Central Queensland. IICRC S700:2025 certified contractor network for bushfire interface properties, post-flood electrical fires, smoke damage remediation, and multi-peril fire plus water restoration.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Rockhampton',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rockhampton',
    addressRegion: 'QLD',
    postalCode: '4700',
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
  name: 'Fire Damage Restoration Rockhampton',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Rockhampton',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  serviceType: 'Fire Damage Restoration',
  description:
    'Professional fire and smoke damage restoration across Rockhampton and Central Queensland. Bushfire interface make-safe, structural fire remediation, IICRC S700:2025 smoke migration assessment, HVAC decontamination, contents pack-out, and unified multi-peril insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What fire risks are specific to Rockhampton properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rockhampton faces several distinct fire risk categories: bushfire interface risk at the western boundary of Mount Archer National Park; electrical fires following Fitzroy River flooding (water-damaged wiring and switchboards shorting when power is restored); rural and agricultural fire risk from surrounding grazing country during summer dry conditions; and industrial fire risk from nearby agricultural and beef processing operations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Rockhampton in a Bushfire Attack Level (BAL) zone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Western Rockhampton suburbs adjacent to Mount Archer National Park may be within BAL-12.5 to BAL-29 zones. BAL rating affects building code requirements for post-fire restoration work \u2014 repairs must comply with current BAL provisions, including ember-resistant materials and construction details. NRPG coordinates BAL-compliant restoration and can advise on the applicable BAL rating for your specific property.',
      },
    },
    {
      '@type': 'Question',
      name: 'What IICRC standard governs fire restoration in Rockhampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "IICRC S700:2025 is the governing standard for fire and smoke restoration. Smoke from structural fires migrates to all connected rooms through HVAC systems and requires thermal fogging and ozone treatment. Rockhampton's subtropical humidity adds a requirement for additional antimicrobial treatment \u2014 soot residues absorb atmospheric moisture rapidly in CQ conditions and create mould-conducive conditions within 48\u201372 hours if not addressed under S700:2025 protocols.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can fire damage and flood damage occur simultaneously in Rockhampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes \u2014 post-Fitzroy River flood electrical fires are a known risk in Rockhampton. Water-damaged electrical wiring and switchboards can ignite when power is restored after flooding recedes. Firefighting water then creates secondary water damage on top of the existing flood damage. NRPG handles concurrent fire and water restoration with a single scope of works and unified insurance documentation covering all damage types.',
      },
    },
  ],
};

export default function FireDamageRestorationRockhamptonPage() {
  return (
    <>
      <Script
        id="fdrrock-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdrrock-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdrrock-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Rockhampton"
        subtitle="IICRC S700:2025 certified fire and smoke damage restoration across Rockhampton and Central Queensland. Bushfire interface, post-flood electrical fire, structural fire specialists. priority response."
        gradient="linear-gradient(135deg, #7F0000 0%, #C62828 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Rockhampton' },
        ]}
        sections={[
          {
            heading: 'Rockhampton Fire Risk Profile',
            body: (
              <>
                <p>
                  Rockhampton (23.4&deg;S) sits in Central Queensland&apos;s subtropical climate zone,
                  where fire risk combines with a flooding history to create a multi-peril risk profile
                  unique among regional Queensland cities. Western Rockhampton suburbs are adjacent to
                  Mount Archer National Park \u2014 a 3,400 hectare national park rising to 604 metres
                  directly above the residential fringe \u2014 creating a bushfire interface exposure
                  for The Range, Frenchville, and Norman Gardens.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Fitzroy River flooding history creates a distinct electrical fire risk that is
                  specific to Rockhampton: when floodwaters recede and power is restored, water-damaged
                  wiring and switchboards in inundated properties can ignite. The 2011 Rockhampton floods
                  \u2014 when floodwaters reached 9.2 metres \u2014 left thousands of properties with
                  compromised electrical systems. Similar conditions have occurred in multiple subsequent
                  flood events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Rockhampton&apos;s subtropical humidity creates additional post-fire risk: without
                  immediate IICRC S700:2025 protocol response, fire and smoke damage rapidly combines
                  with mould colonisation in Rockhampton&apos;s warm, moist climate.
                </p>
              </>
            ),
          },
          {
            heading: 'Post-Fire Restoration Process \u2014 Rocky 2026',
            body: (
              <>
                <p>
                  NRPG&apos;s fire damage restoration process in Rockhampton follows IICRC S700:2025
                  protocols adapted for Central Queensland conditions:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Emergency make-safe:</strong> Board-up, roof tarping, and site
                    safety assessment. Do not re-enter a fire-damaged property before the
                    Queensland Fire and Emergency Services (QFES) all-clear.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Smoke migration assessment:</strong> Smoke penetrates all connected
                    spaces through HVAC systems, door gaps, and ceiling voids. Full S700:2025
                    smoke migration mapping covers the entire building, not just visibly
                    fire-damaged rooms.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>HVAC decontamination:</strong> Ductwork carries smoke residues to
                    rooms with no visible fire damage. HVAC decontamination is a mandatory
                    component of S700:2025-compliant fire restoration and is required for
                    insurance documentation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Contents pack-out and cleaning:</strong> Contents salvage, pack-out
                    to a secure facility, IICRC S700:2025 cleaning, and return on project
                    completion.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Structural drying if fire suppression water present:</strong>
                    Firefighting water creates secondary water damage requiring concurrent
                    IICRC S500:2025 water extraction and structural drying alongside the fire
                    restoration scope.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Antimicrobial treatment:</strong> Rockhampton&apos;s subtropical
                    conditions require antimicrobial application to fire-affected materials to
                    prevent mould colonisation in the warm, humid post-event environment.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Rockhampton Suburbs We Cover',
            body: (
              <>
                <p>
                  priority emergency response across Rockhampton and surrounding areas:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Rockhampton CBD and inner suburbs:</strong> Rockhampton CBD, Depot Hill,
                  Allenstown, The Common, Wandal
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bushfire interface suburbs (western):</strong> The Range, Frenchville,
                  Norman Gardens, Park Avenue
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Rockhampton:</strong> North Rockhampton, Berserker, Kawana,
                  Parkhurst
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern areas:</strong> Gracemere, Etna Creek, Kabra
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Rural and regional:</strong> Mount Morgan, Gracemere rural
                </p>
              </>
            ),
          },
          {
            heading: 'Fire + Water Damage \u2014 Multi-Peril Claims in Rocky',
            body: (
              <>
                <p>
                  Rockhampton&apos;s Fitzroy River flooding history creates a multi-peril scenario
                  unique to this city: electrical fires igniting in flood-affected properties, followed
                  by firefighting water adding further water damage to an already flood-damaged
                  structure. NRPG provides a single scope of works covering all concurrent damage types:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Fire damage:</strong> Structural fire scope under IICRC S700:2025,
                    smoke migration assessment, HVAC decontamination, thermal fogging
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Firefighting water ingress:</strong> Water extraction, moisture mapping,
                    and structural drying under IICRC S500:2025 concurrent with fire scope
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Flood damage (where applicable):</strong> Pre-existing flood damage
                    documented separately for peril classification purposes
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG&apos;s unified insurance documentation package covers all perils in a single
                  scope of works, preventing the common problem of separate assessors, conflicting
                  scopes, and multiple excesses applied to concurrent perils in the same event. Lodge
                  at <a href="/claim">disasterrecovery.com.au/claim</a> for immediate dispatch.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What fire risks are specific to Rockhampton properties?',
            answer:
              'Rockhampton faces several distinct fire risk categories: bushfire interface risk at the western boundary of Mount Archer National Park; electrical fires following Fitzroy River flooding (water-damaged wiring and switchboards shorting when power is restored); rural and agricultural fire risk from surrounding grazing country during summer dry conditions; and industrial fire risk from nearby agricultural and beef processing operations.',
          },
          {
            question: 'Is Rockhampton in a Bushfire Attack Level (BAL) zone?',
            answer:
              'Western Rockhampton suburbs adjacent to Mount Archer National Park may be within BAL-12.5 to BAL-29 zones. BAL rating affects building code requirements for post-fire restoration work \u2014 repairs must comply with current BAL provisions, including ember-resistant materials and construction details. NRPG coordinates BAL-compliant restoration and can advise on the applicable BAL rating for your specific property.',
          },
          {
            question: 'What IICRC standard governs fire restoration in Rockhampton?',
            answer:
              "IICRC S700:2025 is the governing standard for fire and smoke restoration. Smoke from structural fires migrates to all connected rooms through HVAC systems and requires thermal fogging and ozone treatment. Rockhampton's subtropical humidity adds a requirement for additional antimicrobial treatment \u2014 soot residues absorb atmospheric moisture rapidly in CQ conditions and create mould-conducive conditions within 48\u201372 hours if not addressed under S700:2025 protocols.",
          },
          {
            question: 'Can fire damage and flood damage occur simultaneously in Rockhampton?',
            answer:
              'Yes \u2014 post-Fitzroy River flood electrical fires are a known risk in Rockhampton. Water-damaged electrical wiring and switchboards can ignite when power is restored after flooding recedes. Firefighting water then creates secondary water damage on top of the existing flood damage. NRPG handles concurrent fire and water restoration with a single scope of works and unified insurance documentation covering all damage types.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Rockhampton',
            href: '/water-damage-restoration-rockhampton',
            description: 'Fitzroy River flood and storm water damage restoration in Rockhampton.',
          },
          {
            title: 'Storm Damage Restoration Rockhampton',
            href: '/storm-damage-restoration-rockhampton',
            description: 'Storm and cyclone structural damage restoration across Central Queensland.',
          },
          {
            title: 'Fire Damage Restoration Cost',
            href: '/guides/cost-guides/how-much-fire-damage-restoration-cost',
            description: 'What fire damage restoration costs and how insurance covers it.',
          },
        ]}
        cta={{ text: 'Get Emergency Fire Damage Help \u2014 Rockhampton', href: '/claim' }}
      />
    </>
  );
}
