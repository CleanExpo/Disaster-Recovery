import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mould Remediation Geelong | IICRC S520 Coastal Humidity & Heritage Buildings',
  description:
    'Professional mould remediation across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC S520-certified contractors for coastal humidity mould, post-2010 storm structural mould, and heritage industrial building conversions. 24/7 response.',
  keywords:
    'mould remediation geelong, mould removal geelong, black mould geelong, mould heritage building geelong, surf coast mould, bellarine peninsula mould, post-storm mould geelong, geelong mould cost',
  openGraph: {
    title: 'Mould Remediation Geelong | IICRC S520 Coastal Humidity & Heritage Buildings',
    description:
      'Professional mould remediation across Geelong, the Bellarine Peninsula, and Surf Coast. IICRC S520-certified contractors for coastal humidity mould, post-2010 storm structural mould, and heritage industrial building conversions.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('Mould Remediation')}&city=${encodeURIComponent('Geelong')}&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-geelong`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-geelong/#localbusiness`,
  name: `${NAP.name} Geelong`,
  url: `${NAP.url}/mould-remediation-geelong`,
  description:
    'IICRC S520-certified mould remediation contractors serving Greater Geelong, the Bellarine Peninsula, and Surf Coast. Coastal humidity mould specialists, post-2010 storm structural mould remediation, and heritage industrial building conversion treatment. HEPA remediation and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Geelong',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Geelong',
    addressRegion: 'VIC',
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
  name: 'Mould Remediation Geelong',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Geelong',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Geelong to IICRC S520 standard. Physical containment, HEPA filtration, antimicrobial treatment, removal of contaminated materials, post-clearance air sampling, and full insurance documentation for coastal humidity mould, post-storm structural mould, and heritage building conversions.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is mould so common in Geelong homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Geelong's coastal position creates persistently elevated ambient humidity — particularly in the Bellarine Peninsula and Surf Coast suburbs where westerly and southerly ocean air is the dominant airflow. In poorly ventilated older homes, ambient humidity above 70% is sufficient to support mould growth on organic materials without any water damage event. Geelong also has a significant stock of older weatherboard and brick homes with inadequate subfloor ventilation, cavity walls without vapour control, and single-glaze windows that produce condensation in winter. These structural characteristics combine with the coastal humidity baseline to make mould endemic in many Geelong properties that lack adequate mechanical ventilation or vapour management.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is different about mould remediation in Geelong\'s heritage wool store and warehouse conversions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Geelong's waterfront precinct — including the Rippleside and Drumcondra areas — contains former wool stores and warehouses converted to residential and commercial use. These buildings have original brick and timber construction with aging or absent damp-proofing. Mould in these buildings establishes in the original fabric: within lime mortar joints, behind original timber panelling, and in subfloor timbers that were designed for industrial use and have no moisture barrier. Standard mould remediation approaches for modern construction are insufficient — specialist equipment capable of drying thick heritage masonry is required, and treatment must be compatible with the original building materials. Heritage listings may also govern what remediation methods can be applied.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost in Geelong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould remediation costs in Geelong vary by the extent and type of contamination. Indicative ranges: Category 1 surface mould (bathrooms, kitchens, isolated areas) $1,500–$7,000; post-storm wall cavity mould requiring structural drying and internal reinstatement $4,000–$18,000; heritage industrial conversion (former wool store or warehouse) with mould in original brick and timber construction $8,000–$40,000+. Surf Coast beach houses with recurring seasonal mould may require ongoing treatment cycles. All scopes include IICRC S520 documentation for insurance.',
      },
    },
  ],
};

export default function MouldRemediationGeelongPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="mrgeelong-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrgeelong-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrgeelong-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Geelong"
        subtitle="IICRC S520-certified mould remediation across Geelong, the Bellarine Peninsula, and Surf Coast. Coastal humidity mould specialists, post-2010 storm structural mould, and heritage industrial building conversions."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Geelong' },
        ]}
        sections={[
          {
            heading: "Geelong Mould Conditions — Coastal Humidity and Heritage Stock",
            body: (
              <>
                <p>
                  Geelong&apos;s coastal position at the western end of Port Phillip Bay creates
                  persistently elevated ambient humidity across the region. Westerly and southerly
                  ocean airflows from Port Phillip Bay and Bass Strait maintain humidity levels that
                  are significantly higher than inland Victorian cities, particularly in the Bellarine
                  Peninsula and Surf Coast suburbs. In poorly ventilated older homes, this ambient
                  humidity baseline is sufficient to support mould growth on organic materials without
                  any water damage event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Geelong has a substantial stock of older weatherboard and brick homes with inadequate
                  subfloor ventilation, cavity walls without vapour control, and single-glaze windows
                  that generate condensation in winter. These structural characteristics compound the
                  coastal humidity baseline to make mould endemic across many Geelong properties.
                  Older apartment and unit stock in the CBD and inner suburbs similarly suffers from
                  insufficient bathroom and laundry ventilation &mdash; a primary driver of surface
                  mould in multi-residential buildings.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Geelong&apos;s waterfront precinct &mdash; including the Rippleside and Drumcondra
                  areas &mdash; contains former wool stores and industrial warehouses converted to
                  residential and commercial use. These buildings have original brick and timber
                  construction with aging or absent damp-proofing. Mould in these properties
                  establishes deep within the original fabric: in lime mortar joints, behind original
                  timber panelling, and in subfloor timbers that lack moisture barriers. Specialist
                  remediation equipment and materials-compatible treatment methods are required.
                </p>
              </>
            ),
          },
          {
            heading: 'Post-2010 Storm Structural Mould',
            body: (
              <>
                <p>
                  The 2010 Geelong storms caused widespread water ingress across the LGA, with roof
                  failures and wind-driven rain penetration affecting thousands of properties. Many
                  received basic surface drying in the immediate aftermath but were never fully
                  assessed or remediated to IICRC S500 and S520 standards. In properties with
                  incomplete repairs, ongoing water ingress has produced persistent structural mould
                  in wall cavities, ceiling voids, and subfloors &mdash; mould that is invisible at
                  the surface and detectable only through thermal imaging and moisture mapping.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Surf Coast beach houses at Torquay, Anglesea, and Jan Juc face an additional
                  seasonal mould risk. High summer humidity followed by closed-up properties during
                  winter creates conditions where mould establishes rapidly in unventilated rooms,
                  wardrobes, and under-floor spaces. Seasonal holiday properties that are not
                  maintained through winter commonly present with significant mould growth upon
                  return in spring.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-storm structural mould:</strong> Mould in wall cavities and ceiling
                    voids from water ingress events with incomplete drying. Requires thermal imaging
                    to locate and IICRC S520 remediation to resolve.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Coastal ambient humidity mould:</strong> Chronic surface mould in
                    poorly ventilated older properties driven by Geelong&apos;s coastal humidity
                    baseline.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Heritage building mould:</strong> Mould in original brick, bluestone,
                    and timber construction in waterfront heritage conversions requiring specialist
                    treatment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Seasonal holiday home mould:</strong> Rapid mould establishment in
                    unventilated Surf Coast properties during unoccupied winter periods.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Geelong Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  IICRC S520-certified mould remediation response across Greater Geelong, Bellarine
                  Peninsula, and Surf Coast:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Geelong Metro:</strong> Geelong CBD, Newtown, South Geelong, Belmont,
                  Highton, East Geelong
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Waterfront Heritage Precinct:</strong> Rippleside, Drumcondra, Geelong
                  West
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Industrial Precinct:</strong> Corio, Norlane, North Geelong
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bellarine Peninsula:</strong> Leopold, Ocean Grove, Barwon Heads
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Surf Coast:</strong> Torquay, Jan Juc, Anglesea (extended response time
                  applies beyond Torquay)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why is mould so common in Geelong homes?',
            answer:
              "Geelong's coastal position creates persistently elevated ambient humidity — particularly in the Bellarine Peninsula and Surf Coast suburbs where westerly and southerly ocean air is the dominant airflow. In poorly ventilated older homes, ambient humidity above 70% is sufficient to support mould growth on organic materials without any water damage event. Geelong also has a significant stock of older weatherboard and brick homes with inadequate subfloor ventilation, cavity walls without vapour control, and single-glaze windows that produce condensation in winter. These structural characteristics combine with the coastal humidity baseline to make mould endemic in many Geelong properties that lack adequate mechanical ventilation or vapour management.",
          },
          {
            question: "What is different about mould remediation in Geelong's heritage wool store and warehouse conversions?",
            answer:
              "Geelong's waterfront precinct — including the Rippleside and Drumcondra areas — contains former wool stores and warehouses converted to residential and commercial use. These buildings have original brick and timber construction with aging or absent damp-proofing. Mould in these buildings establishes in the original fabric: within lime mortar joints, behind original timber panelling, and in subfloor timbers that were designed for industrial use and have no moisture barrier. Standard mould remediation approaches for modern construction are insufficient — specialist equipment capable of drying thick heritage masonry is required, and treatment must be compatible with the original building materials. Heritage listings may also govern what remediation methods can be applied.",
          },
          {
            question: 'How much does mould remediation cost in Geelong?',
            answer:
              'Mould remediation costs in Geelong vary by the extent and type of contamination. Indicative ranges: Category 1 surface mould (bathrooms, kitchens, isolated areas) $1,500–$7,000; post-storm wall cavity mould requiring structural drying and internal reinstatement $4,000–$18,000; heritage industrial conversion (former wool store or warehouse) with mould in original brick and timber construction $8,000–$40,000+. Surf Coast beach houses with recurring seasonal mould may require ongoing treatment cycles. All scopes include IICRC S520 documentation for insurance.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Geelong',
            href: '/water-damage-restoration-geelong',
            description: 'Emergency water damage restoration across Geelong and the Surf Coast.',
          },
          {
            title: 'Storm Damage Geelong',
            href: '/storm-damage-restoration-geelong',
            description: 'IICRC-certified storm damage restoration across Geelong and Bellarine Peninsula.',
          },
          {
            title: 'Mould Remediation Melbourne',
            href: '/mould-remediation-melbourne',
            description: 'IICRC S520-certified mould remediation across all Melbourne suburbs.',
          },
          {
            title: 'Mould Remediation Wollongong',
            href: '/mould-remediation-wollongong',
            description: 'IICRC S520-certified mould remediation across Wollongong and the Illawarra.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
