import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-482: Mould Remediation Mackay
 * Post-cyclone mould response — TC Maila, tropical climate, IICRC S520:2023
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Mackay | Post-Cyclone IICRC Certified',
  description:
    'Professional mould remediation across Mackay. IICRC S520:2023 certified. TC Maila post-storm mould response. Act within 48 hours in tropical conditions.',
  openGraph: {
    title: 'Mould Remediation Mackay | Post-Cyclone IICRC Certified',
    description:
      'IICRC S520:2023 certified mould remediation across Mackay. TC Maila post-storm mould response. Act within 48 hours.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Mould Remediation')}&city=${encodeURIComponent('Mackay')}&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-mackay`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-mackay/#localbusiness`,
  name: `${NAP.name} Mackay`,
  url: `${NAP.url}/mould-remediation-mackay`,
  description:
    'IICRC S520:2023 certified mould remediation contractors serving Mackay 24/7. Post-cyclone mould assessment, HEPA air scrubbing, containment, anti-fungal treatment, and full insurance documentation.',
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
    postalCode: '4740',
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
  name: 'Mould Remediation Mackay',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Mackay' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation in Mackay following IICRC S520:2023: containment, HEPA air scrubbing, anti-fungal treatment, structural decontamination, and insurance documentation for post-cyclone mould claims.',
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
      name: 'How quickly does mould grow after cyclone flooding in Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mould can establish within 24\u201348 hours in Mackay\u2019s tropical climate. Temperatures of 30\u00b0C or above combined with relative humidity of 80% or higher during the wet season create ideal mould propagation conditions. After TC Maila water ingress, visible mould growth in wall cavities and ceiling spaces can appear within 72 hours without professional drying and antimicrobial treatment. Act within 48 hours of the all-clear.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is TC Maila mould remediation covered by insurance in Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mould arising directly from TC Maila cyclone damage is generally covered under home insurance policies. Lodge as \u2018cyclone damage\u2019 with \u2018secondary mould\u2019 as a separate line item \u2014 not just \u2018mould damage\u2019 in isolation. Most insurers require IICRC S520:2023 documentation from certified contractors to approve mould claims. NRPG provides the full documentation pack.",
      },
    },
    {
      '@type': 'Question',
      name: 'What mould species are common after cyclone flooding in North Queensland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The most common post-cyclone mould species in Mackay and North Queensland are: Stachybotrys chartarum (black mould, requiring sustained saturation \u2014 common in subfloor and wall cavities after cyclone inundation), Aspergillus, Cladosporium, and Penicillium. All thrive in warm, humid conditions. Stachybotrys in particular is associated with serious respiratory health effects and requires IICRC S520 containment protocol for safe removal.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I clean cyclone mould myself?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Small surface areas under 0.1m\u00b2 can be surface-cleaned with appropriate products. Anything larger requires IICRC S520 containment protocol to prevent spore dispersal. Post-cyclone mould in Mackay\u2019s climate typically involves spore spread through HVAC systems and wall cavities \u2014 DIY cleaning without containment can aerosolise spores into habitable areas, creating a larger health hazard than the original visible mould.",
      },
    },
  ],
};

export default function MouldRemediationMackayPage() {
  return (
    <>
      <Script
        id="mrmkay-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrmkay-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrmkay-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Mackay"
        subtitle="IICRC S520:2023 certified mould remediation across Mackay. Post-cyclone mould assessment and decontamination. Act within 48 hours in tropical conditions."
        gradient="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Mackay' },
        ]}
        sections={[
          {
            heading: 'Why Mackay Has Extreme Post-Cyclone Mould Risk',
            body: (
              <>
                <p>
                  Mackay&apos;s tropical climate creates baseline conditions that accelerate mould growth
                  year-round: temperatures regularly above 28°C and relative humidity exceeding 75% during
                  the wet season. After a cyclone event, these conditions combine with saturated building
                  materials to create ideal mould propagation conditions.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Following TC Debbie in 2017, many Mackay properties experienced visible mould growth
                  within 72 hours of inundation. Properties that were not professionally dried and treated
                  within the 48-hour window faced significantly larger remediation scopes weeks later, as
                  mould colonised wall cavities, insulation, and subfloor areas that were not immediately
                  visible.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  With TC Maila tracking toward the Mackay corridor in April 2026, the same 48-hour post-clearance
                  response window applies. NRPG contractors are pre-positioned for immediate deployment.
                </p>
              </>
            ),
          },
          {
            heading: 'TC Maila Mould Response — Mackay',
            body: (
              <>
                <p>
                  Immediately after the TC Maila all-clear is issued, NRPG&apos;s IICRC S520:2023-certified
                  contractors implement the full post-cyclone mould prevention and remediation protocol:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Immediate moisture mapping to identify saturated cavities before visible mould appears
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    IICRC S520:2023 containment protocol to prevent spore dispersal during remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    HEPA air scrubbing to remove airborne spores from habitable areas
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Anti-fungal treatment to subfloor, wall cavities, and ceiling spaces
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Structural drying to certified moisture levels with psychrometric documentation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full IICRC documentation pack for insurance claim lodgement
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Mackay Suburbs We Cover',
            body: (
              <>
                <p>Mould remediation response across Mackay LGA:</p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>City/Inner:</strong> Mackay CBD, North Mackay, South Mackay, Andergrove,
                  Beaconsfield, Blacks Beach, Mount Pleasant
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Outer Suburbs:</strong> Ooralea, Slade Point, Eimeo, Rural View, Shoal Point
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost Estimates — Mackay 2026',
            body: (
              <>
                <p>
                  Indicative mould remediation costs in Mackay. Post-cyclone scope is typically larger than
                  standard mould jobs due to the extent of water ingress and the accelerated growth rate in
                  tropical conditions.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Single room:</strong> $500–$3,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Moderate affected area (2–4 rooms):</strong> $3,000–$8,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Whole-house cyclone mould:</strong> $8,000–$25,000+
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly does mould grow after cyclone flooding in Mackay?',
            answer:
              "Mould can establish within 24–48 hours in Mackay's tropical climate. Temperatures of 30°C or above combined with relative humidity of 80% or higher during the wet season create ideal mould propagation conditions. After TC Maila water ingress, visible mould growth in wall cavities and ceiling spaces can appear within 72 hours without professional drying and antimicrobial treatment. Act within 48 hours of the all-clear.",
          },
          {
            question: 'Is TC Maila mould remediation covered by insurance in Mackay?',
            answer:
              "Mould arising directly from TC Maila cyclone damage is generally covered under home insurance policies. Lodge as 'cyclone damage' with 'secondary mould' as a separate line item — not just 'mould damage' in isolation. Most insurers require IICRC S520:2023 documentation from certified contractors to approve mould claims. NRPG provides the full documentation pack.",
          },
          {
            question: 'What mould species are common after cyclone flooding in North Queensland?',
            answer:
              "The most common post-cyclone mould species in Mackay and North Queensland are: Stachybotrys chartarum (black mould, requiring sustained saturation — common in subfloor and wall cavities after cyclone inundation), Aspergillus, Cladosporium, and Penicillium. All thrive in warm, humid conditions. Stachybotrys in particular is associated with serious respiratory health effects and requires IICRC S520 containment protocol for safe removal.",
          },
          {
            question: 'Can I clean cyclone mould myself?',
            answer:
              "Small surface areas under 0.1m² can be surface-cleaned with appropriate products. Anything larger requires IICRC S520 containment protocol to prevent spore dispersal. Post-cyclone mould in Mackay's climate typically involves spore spread through HVAC systems and wall cavities — DIY cleaning without containment can aerosolise spores into habitable areas, creating a larger health hazard than the original visible mould.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Cyclone Damage Restoration Mackay',
            href: '/cyclone-damage-restoration-mackay',
            description: 'Full cyclone damage restoration for Mackay — structural, water, and make-safe.',
          },
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'Real-time TC Maila updates and 24/7 claim lodgement.',
          },
          {
            title: 'Mould Remediation Cost',
            href: '/guides/cost-guides/how-much-mould-remediation-cost',
            description: 'How much does mould remediation cost in Australia?',
          },
        ]}
        cta={{ text: 'Get TC Maila Mould Assessment — Mackay', href: '/claim' }}
      />
    </>
  );
}
