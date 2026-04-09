import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mould Remediation Canberra | IICRC S520 Certified — Post-Hailstorm & Heritage',
  description:
    'Professional mould remediation across Canberra and the ACT. IICRC S520-certified contractors for post-2020 hailstorm mould, condensation mould in cold-climate homes, and government/heritage building mould. Lodge your claim 24/7.',
  keywords:
    'mould remediation canberra, mould removal canberra, black mould canberra ACT, post-hailstorm mould canberra, mould inspection canberra, government housing mould ACT, mould after storm canberra',
  openGraph: {
    title: 'Mould Remediation Canberra | IICRC S520 Certified — Post-Hailstorm & Heritage',
    description:
      'Professional mould remediation across Canberra and the ACT. IICRC S520-certified contractors for post-2020 hailstorm mould, condensation mould, and government/heritage building mould. Lodge your claim 24/7.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Canberra&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-canberra`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-canberra/#localbusiness`,
  name: `${NAP.name} Canberra`,
  url: `${NAP.url}/mould-remediation-canberra`,
  description:
    'IICRC S520-certified mould remediation contractors serving Canberra and the ACT. Post-hailstorm mould specialists. Government housing and heritage building expertise. HEPA air scrubbing, thermal imaging, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Canberra',
    containedInPlace: { '@type': 'State', name: 'Australian Capital Territory' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Canberra',
    addressRegion: 'ACT',
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
  name: 'Mould Remediation Canberra',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: {
    '@type': 'City',
    name: 'Canberra',
    containedInPlace: { '@type': 'State', name: 'Australian Capital Territory' },
  },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Canberra and the ACT to IICRC S520 standard. Post-2020 hailstorm mould, cold-climate condensation mould, government housing mould, and heritage building remediation. Physical containment, HEPA filtration, and post-clearance air sampling.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why do Canberra homes get mould even though the climate is dry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Canberra's climate paradox is that very dry summers contrast sharply with cold wet winters. In winter, cold external surfaces — uninsulated walls, roof cavities, subfloor framing — cause warm indoor air to condense when it contacts those surfaces. This condensation moisture, especially in poorly ventilated spaces, creates the conditions for mould growth even in a generally low-humidity climate. Homes with incomplete or damaged roof insulation following the 2020 hailstorm are particularly vulnerable.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is post-hailstorm mould covered by Canberra home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Mould directly caused by a covered water event — including the January 2020 hailstorm — is generally covered by home insurance provided you can establish the causal link between the water event and the mould growth. If incomplete hailstorm roof repairs have allowed ongoing water ingress, the resulting mould may be part of the original or a continuing claim. NRPG documents the causation link through IICRC S520-standard assessment, which is the evidence base your insurer requires. If your claim is disputed, AFCA can be engaged at no cost.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does mould remediation cost in Canberra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical Canberra mould remediation costs: Category 1 single room or isolated surface mould $1,500–$7,000; post-hailstorm roof cavity and wall mould (multiple areas) $4,000–$18,000; government housing or heritage building remediation $8,000–$35,000. Heritage-listed buildings typically attract a premium due to specialist material requirements. NRPG provides an itemised scope before work commences.',
      },
    },
  ],
};

export default function MouldRemediationCanberraPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script
        id="mrcbr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrcbr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrcbr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Canberra"
        subtitle="IICRC S520-certified mould remediation across Canberra and the ACT. Post-2020 hailstorm mould specialists. Government housing and heritage building expertise. HEPA air scrubbing, thermal imaging moisture mapping, and full insurance documentation."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Canberra' },
        ]}
        sections={[
          {
            heading: "Canberra's Mould Conditions — Cold Surfaces and Post-Hailstorm Water Ingress",
            body: (
              <>
                <p>
                  Canberra&apos;s climate creates mould risk through a mechanism different from tropical
                  Australian cities. The ACT&apos;s dry summers (relative humidity 30–50%) contrast sharply
                  with cold, wet winters (June&ndash;August, overnight temperatures frequently below 0&deg;C).
                  When warm, moist indoor air contacts cold, uninsulated surfaces &mdash; roof cavities, subfloor
                  framing, poorly insulated external walls &mdash; condensation forms. In enclosed or poorly
                  ventilated spaces, this condensation moisture accumulates over winter and creates persistent
                  mould growth conditions.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The January 2020 ACT hailstorm has compounded this structural vulnerability across thousands
                  of Canberra homes. Properties with incomplete or temporary hailstorm roof repairs have
                  experienced ongoing water ingress into roof cavities and ceiling spaces. Over five years, that
                  intermittent water ingress has resulted in widespread mould establishment in roof insulation,
                  timber framing, and cavity wall spaces &mdash; often undetected until visible staining or
                  odour appears inside the home.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould in ACT Government Housing',
            background: 'light' as const,
            body: (
              <>
                <p>
                  The ACT government housing stock &mdash; concentrated in Tuggeranong, Belconnen, and
                  Gungahlin &mdash; includes a significant proportion of aging residential buildings with
                  inadequate insulation and ventilation. Mould behind plasterboard, in subfloor spaces, and
                  within wall cavities is a documented issue across this housing stock.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Key mould risk factors in ACT government and older residential housing:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Aging bulk insulation</strong> that has settled or been disturbed loses thermal
                    barrier effectiveness, increasing surface condensation on roof and wall framing
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Single-glazed windows</strong> common in pre-2000 ACT housing create cold glass
                    surfaces that generate condensation, tracking down window reveals and into wall cavities
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Subfloor spaces</strong> in older Canberra homes with perimeter gardens or
                    raised landscaping develop mould from persistent ground moisture with limited airflow
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG&apos;s IICRC S520-certified remediation includes thermal imaging assessment to map
                  hidden moisture and mould beyond the visible surface, ensuring the remediation scope
                  addresses the full extent of growth rather than surface treatment only.
                </p>
              </>
            ),
          },
          {
            heading: 'Canberra Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  Response across Canberra and the ACT:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner Canberra:</strong> Canberra CBD/Civic, Barton, Griffith, Kingston,
                  Manuka, Forrest, Deakin, Yarralumla
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Suburbs:</strong> Bruce, Mitchell, Gungahlin, Belconnen, Holt,
                  Macquarie, Flynn, Florey (2020 hailstorm impact zone)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern Suburbs:</strong> Tuggeranong, Wanniassa, Weston Creek, Banks,
                  Conder, Gordon, Kambah
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North / Inner South:</strong> Ainslie, Braddon, Turner, Reid,
                  Narrabundah, Fyshwick, Woden, Phillip
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Queanbeyan (NSW border):</strong> Queanbeyan, Jerrabomberra, Karabar
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: "Why do Canberra homes get mould even though the climate is dry?",
            answer:
              "Canberra's climate paradox is that very dry summers contrast sharply with cold wet winters. In winter, cold external surfaces — uninsulated walls, roof cavities, subfloor framing — cause warm indoor air to condense when it contacts those surfaces. This condensation moisture, especially in poorly ventilated spaces, creates the conditions for mould growth even in a generally low-humidity climate. Homes with incomplete or damaged roof insulation following the 2020 hailstorm are particularly vulnerable.",
          },
          {
            question: 'Is post-hailstorm mould covered by Canberra home insurance?',
            answer:
              "Mould directly caused by a covered water event — including the January 2020 hailstorm — is generally covered by home insurance provided you can establish the causal link between the water event and the mould growth. If incomplete hailstorm roof repairs have allowed ongoing water ingress, the resulting mould may be part of the original or a continuing claim. NRPG documents the causation link through IICRC S520-standard assessment, which is the evidence base your insurer requires. If your claim is disputed, AFCA can be engaged at no cost.",
          },
          {
            question: 'How much does mould remediation cost in Canberra?',
            answer:
              'Typical Canberra mould remediation costs: Category 1 single room or isolated surface mould $1,500–$7,000; post-hailstorm roof cavity and wall mould (multiple areas) $4,000–$18,000; government housing or heritage building remediation $8,000–$35,000. Heritage-listed buildings typically attract a premium due to specialist material requirements. NRPG provides an itemised scope before work commences.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Storm Damage Restoration Canberra',
            href: '/storm-damage-restoration-canberra',
            description: 'IICRC-certified storm damage restoration across Canberra and the ACT.',
          },
          {
            title: 'Water Damage Restoration Canberra',
            href: '/water-damage-restoration-canberra',
            description: 'Emergency water damage restoration across Canberra and the ACT.',
          },
          {
            title: 'Mould Remediation Melbourne',
            href: '/mould-remediation-melbourne',
            description: 'IICRC S520-certified mould remediation across Melbourne and Victoria.',
          },
          {
            title: 'Mould Remediation Sydney',
            href: '/mould-remediation-sydney',
            description: 'Professional mould remediation across Sydney.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
