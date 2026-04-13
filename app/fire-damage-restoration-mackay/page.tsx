import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Mackay | TC Maila Emergency Response',
  description:
    'Fire damage restoration across Mackay and Central Queensland. IICRC S700:2025 certified. Post-TC Maila electrical fire response. priority emergency dispatch.',
  keywords:
    'fire damage restoration mackay, post cyclone fire mackay, TC Maila fire mackay, electrical fire mackay, smoke damage mackay, central queensland fire restoration',
  openGraph: {
    title: 'Fire Damage Restoration Mackay | TC Maila Emergency Response',
    description:
      'Fire damage restoration across Mackay and Central Queensland. IICRC S700:2025 certified. Post-TC Maila electrical fire response. priority emergency dispatch.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Mackay')}&service=fire-damage-restoration`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-mackay`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-mackay/#localbusiness`,
  name: `${NAP.name} Mackay`,
  url: `${NAP.url}/fire-damage-restoration-mackay`,
  description:
    '24/7 emergency fire damage restoration across Mackay and Central Queensland. IICRC S700:2025 certified contractor network for post-TC Maila electrical fires, smoke damage, and multi-peril cyclone plus fire restoration.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Mackay',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mackay',
    addressRegion: 'QLD',
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
  name: 'Fire Damage Restoration Mackay',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Mackay',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  serviceType: 'Fire Damage Restoration',
  description:
    'Professional fire and smoke damage restoration across Mackay and Central Queensland. Post-TC Maila electrical fire make-safe, multi-peril cyclone plus fire restoration, smoke damage remediation, thermal fogging, HEPA air scrubbing, and full IICRC S700:2025 insurance documentation.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What post-cyclone fire risks are specific to Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TC Maila wind damage in Mackay creates downed powerlines and arcing cables on wet surfaces — a high-risk ignition combination. Flooded switchboards in residential and commercial properties short-circuit when power is restored after inundation from the Pioneer River or storm surge. Generator-related fires are common in the Mackay region during extended power outages that follow major cyclone events.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is post-TC Maila fire damage covered by cyclone insurance in Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — fire resulting from cyclone-caused damage (downed powerlines, arcing wires, flooded switchboards) is covered under the cyclone event. The ARPC Cyclone Pool applies to Mackay (21.1°S) which is north of the Tropic of Capricorn. Document the causal chain from cyclone damage to fire ignition — photographs of the damaged electrical source, an electrician\'s report if available, and IICRC S700:2025 scope documentation that identifies the ignition cause. This documentation supports the fire damage being accepted as a cyclone-consequential claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'What IICRC standard governs fire restoration in Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "IICRC S700:2025 is the governing standard for fire and smoke restoration. Required protocols include thermal fogging, ozone treatment, and HEPA air scrubbing. In Mackay's high-humidity conditions, additional antimicrobial treatment is required to prevent post-fire mould growth — soot residues absorb atmospheric moisture rapidly and create conditions for mould colonisation within 48–72 hours if not extracted under S700:2025 protocols.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRPG handle both fire and water damage from the same TC Maila event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — TC Maila may cause simultaneous wind, water, and fire damage to a single property. NRPG provides single-contractor project management across all trades, a single unified scope of works covering all damage types, and consolidated insurance documentation. This prevents the common problem of multiple separate assessors, conflicting scopes, and delays when different trades attempt to address different perils independently.',
      },
    },
  ],
};

export default function FireDamageRestorationMackayPage() {
  return (
    <>
      <Script
        id="firermkay-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="firermkay-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="firermkay-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Mackay"
        subtitle="IICRC S700:2025 certified fire damage restoration across Mackay and Central Queensland. Post-TC Maila electrical fire response. Multi-peril cyclone and fire claim specialists. priority emergency dispatch."
        gradient="linear-gradient(135deg, #7F0000 0%, #C62828 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Mackay' },
        ]}
        sections={[
          {
            heading: 'TC Maila Fire Risk in Mackay',
            body: (
              <>
                <p>
                  Mackay&apos;s electrical infrastructure faces high-severity post-cyclone fire risk from
                  TC Maila. Downed powerlines on wet surfaces arc continuously and create ignition points
                  across suburban streets. The Pioneer River flooding that accompanies major cyclone events
                  inundates residential and commercial switchboards throughout low-lying Mackay suburbs —
                  when grid power is restored, these wet switchboards short-circuit, creating electrical
                  fires in properties that may have already sustained water damage.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Mackay&apos;s industrial port area — one of the largest coal export facilities in the
                  world — creates additional fire and chemical hazard risk in the aftermath of a major
                  cyclone. While residential properties face primarily electrical fire risk,
                  commercial and industrial properties in the port precinct may sustain chemical exposure
                  events concurrently with cyclone structural damage.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Mackay&apos;s tropical conditions — high humidity and warm post-cyclone temperatures
                  — accelerate smoke and soot penetration into building materials. Without immediate
                  IICRC S700:2025 protocol response, a fire damage event in Mackay can generate
                  concurrent smoke damage and mould remediation claims within 48&ndash;72 hours.
                </p>
              </>
            ),
          },
          {
            heading: 'Fire Damage + Water Damage — The Multi-Peril Challenge',
            body: (
              <>
                <p>
                  TC Maila-affected Mackay properties frequently sustain both fire and water damage from
                  the same event. Post-cyclone electrical fires often occur in properties that have
                  simultaneously received water ingress through cyclone-damaged roofs or storm surge
                  flooding. Firefighting water adds a further water damage component. The result is a
                  multi-peril loss requiring concurrent fire damage restoration and water damage
                  extraction.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Managing fire and water restoration concurrently requires careful sequencing: fire
                  make-safe and emergency board-up first; water extraction and moisture mapping second;
                  parallel IICRC S700:2025 (fire) and S500:2025 (water) protocols applied with coordinated
                  drying and decontamination. NRPG provides single-contractor project management across
                  all trades, preventing the delays and scope gaps that arise when fire and water
                  contractors work independently on the same property.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  A single unified insurance scope covering all TC Maila damage types prevents the
                  common insurer approach of treating fire and water damage as separate claims with
                  separate excesses. NRPG documentation covers all perils in one scope of works.
                </p>
              </>
            ),
          },
          {
            heading: 'Mackay Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  priority emergency response across Mackay and surrounding areas:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Mackay city:</strong> Mackay CBD, North Mackay, South Mackay, West Mackay
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern suburbs:</strong> Andergrove, Beaconsfield, Mount Pleasant, Ooralea,
                  Rural View, Eimeo
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern and coastal:</strong> Slade Point, Bucasia, Blacks Beach
                </p>
              </>
            ),
          },
          {
            heading: 'Fire Damage Insurance Claims — Mackay',
            body: (
              <>
                <p>
                  TC Maila is the trigger event for ARPC Cyclone Pool processing in Mackay (21.1&deg;S,
                  north of the Tropic of Capricorn). Post-cyclone electrical fires are covered as a
                  cyclone-consequential event — lodge as &ldquo;cyclone damage&rdquo; with &ldquo;fire
                  damage&rdquo; as the secondary consequence. Document the ignition cause carefully:
                  photographs of the damaged electrical source, a licensed electrician&apos;s report if
                  available, and NRPG&apos;s IICRC S700:2025 scope covering the full ignition-to-damage
                  causal chain.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Thermal fogging documentation under S700:2025 covers both visible fire damage and
                  smoke migration into adjacent areas. For Mackay properties, the smoke migration
                  report for the insurer should include HVAC decontamination scope — smoke entering
                  duct networks affects rooms with no visible fire or smoke damage and represents
                  a significant additional restoration scope that insurers may dispute without
                  S700:2025 documentation.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What post-cyclone fire risks are specific to Mackay?',
            answer:
              'TC Maila wind damage creates downed powerlines, arcing cables on wet surfaces, and flooded switchboards shorting when power is restored. Pioneer River flooding can create electrical hazards. Generator-related fires are common in the aftermath.',
          },
          {
            question: 'Is post-TC Maila fire damage covered by cyclone insurance in Mackay?',
            answer:
              'Yes — fire resulting from cyclone-caused damage (downed powerlines, arcing wires) is covered under the cyclone event. ARPC pool applies to Mackay (21.1°S). Document the causal chain from cyclone damage to fire ignition.',
          },
          {
            question: 'What IICRC standard governs fire restoration in Mackay?',
            answer:
              "IICRC S700:2025 — fire and smoke restoration standard. Requires thermal fogging, ozone treatment, HEPA air scrubbing. Mackay's humidity requires additional antimicrobial treatment to prevent post-fire mould growth.",
          },
          {
            question: 'Can NRPG handle both fire and water damage from the same TC Maila event?',
            answer:
              'Yes — TC Maila may cause simultaneous wind, water, and fire damage. NRPG provides single-contractor project management across all trades, a single scope of works, and unified insurance documentation.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Damage Restoration Mackay',
            href: '/cyclone-damage-restoration-mackay',
            description: 'Cyclone structural damage restoration across Mackay and Central Queensland.',
          },
          {
            title: 'Water Damage Restoration Mackay',
            href: '/water-damage-restoration-mackay',
            description: 'Post-cyclone and storm water damage restoration in Mackay.',
          },
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'TC Maila recovery resources for all affected QLD regions.',
          },
        ]}
        cta={{ text: 'Get TC Maila Fire Damage Help — Mackay', href: '/claim' }}
      />
    </>
  );
}
