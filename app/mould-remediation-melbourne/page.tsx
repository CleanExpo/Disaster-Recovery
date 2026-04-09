import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-478: Mould Remediation Melbourne
 *
 * Created: 9 April 2026
 * Context: Melbourne's cool wet winters + heritage building stock (Victorian/Edwardian
 * single brick) + flash flooding creates a distinct mould risk profile. Heritage homes
 * require specialist S520-certified remediation to protect heritage fabric while
 * eliminating mould at depth.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Melbourne | IICRC S520 Certified Emergency',
  description:
    'Professional mould remediation across Melbourne and Victoria. IICRC S520-certified contractors for post-flood, post-storm, and bushfire-smoke related mould. 48-hour response. Lodge your claim 24/7.',
  keywords:
    'mould remediation melbourne, mould removal melbourne, black mould melbourne, mould after flooding melbourne, mould inspection melbourne VIC, toxic mould melbourne',
  openGraph: {
    title: 'Mould Remediation Melbourne | IICRC S520 Certified Emergency',
    description:
      'Professional mould remediation across Melbourne and Victoria. IICRC S520-certified contractors for post-flood, post-storm, and heritage building mould. 48-hour response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Melbourne&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-melbourne`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-melbourne/#localbusiness`,
  name: `${NAP.name} Melbourne`,
  url: `${NAP.url}/mould-remediation-melbourne`,
  description:
    'IICRC S520-certified mould remediation contractors serving Melbourne and greater Victoria. Heritage building specialists. HEPA air scrubbing, thermal imaging, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Melbourne',
    containedInPlace: { '@type': 'State', name: 'Victoria' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
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
  name: 'Mould Remediation Melbourne',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Melbourne' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Melbourne and Victoria to IICRC S520 standard. Heritage building expertise. Physical containment, HEPA filtration, heritage-compatible antimicrobial treatment, and post-clearance air sampling.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is winter condensation mould covered by Melbourne home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Condensation mould from design deficiency or poor ventilation is generally not covered. Mould from a covered water event (storm, burst pipe) is covered. The causation distinction is critical — NRPG documents whether mould originated from a covered event.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Melbourne heritage home has mould in the walls?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Signs include cold internal walls in winter (indicating moisture retention), efflorescence on plaster, musty odour concentrated in specific rooms, and peeling paint with discolouration. NRPG uses thermal imaging to map moisture in heritage masonry and lath-and-plaster systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Melbourne mould affect heritage building materials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — mould penetrates lime-based plaster, historic timbers, and pressed metal ceilings deeply. Standard bleach treatment damages heritage finishes without eliminating the mould at depth. S520-certified contractors use heritage-compatible antimicrobial treatments and controlled moisture extraction.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes mould in Melbourne subfloors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subfloor mould is caused by poor ventilation — extensions blocking airbricks, landscaping raised against foundations, or subfloor insulation trapping moisture. It is typically not covered by home insurance unless caused by a covered plumbing or flooding event. NRPG identifies the source before recommending remediation scope.',
      },
    },
  ],
};

export default function MouldRemediationMelbournePage() {
  return (
    <>
      <Script
        id="mrmelb-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrmelb-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrmelb-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Melbourne"
        subtitle="IICRC S520-certified mould remediation across Melbourne and greater Victoria. Heritage building specialists. HEPA air scrubbing, thermal imaging moisture mapping, and full insurance documentation. 48-hour response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Melbourne' },
        ]}
        sections={[
          {
            heading: 'Mould in Melbourne — Cold Climate, Heritage Buildings, and Flash Flooding',
            body: (
              <>
                <p>
                  Melbourne&apos;s cool, wet winters (June–August average 15°C, 60–70% humidity) create
                  a mould risk distinct from Queensland&apos;s tropical profile. Cold surfaces in poorly
                  insulated heritage homes (Edwardian and Victorian era single brick construction) generate
                  condensation during winter, creating persistent moisture on internal surfaces.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Combined with Melbourne&apos;s flash flooding events — Kew, Hawthorn, Thornbury, and
                  Moorabbin are historically flood-prone — and the 2022–23 La Niña flooding across
                  Victoria, mould is a significant and growing structural issue across Melbourne&apos;s
                  established suburbs. Heritage buildings present specific challenges: lime-based plaster
                  retains moisture differently from modern plasterboard, and heritage finishes often mask
                  mould growth visible only via thermal imaging.
                </p>
              </>
            ),
          },
          {
            heading: 'Mould in Melbourne Heritage Homes',
            body: (
              <>
                <p>
                  Melbourne&apos;s stock of Victorian and Edwardian homes — many now valued at
                  $1M–$5M — faces specific mould vulnerabilities:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Solid brick construction</strong> (no cavity, no vapour barrier) allows
                    moisture to transfer directly from outside to inside plaster surfaces during wet
                    winters
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Original timber flooring</strong> creates subfloor moisture accumulation if
                    subfloor ventilation has been blocked by subsequent extensions or landscaping
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Pressed metal ceilings and lath-and-plaster walls</strong> absorb and retain
                    mould at depths that standard surface cleaning cannot address
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  IICRC S520-certified remediation for Melbourne heritage homes requires specialist
                  knowledge of historic construction systems to remediate without damaging heritage fabric.
                </p>
              </>
            ),
          },
          {
            heading: 'Melbourne Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  48-hour response across Melbourne and greater Victoria:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner City:</strong> Melbourne CBD, South Melbourne, Port Melbourne, Fitzroy,
                  Collingwood, Richmond, Carlton
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner East:</strong> Hawthorn, Kew, Balwyn, Camberwell, Doncaster, Box Hill,
                  Mitcham
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North:</strong> Brunswick, Coburg, Preston, Heidelberg, Northcote,
                  Fairfield
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Bayside:</strong> Brighton, Hampton, Sandringham, Cheltenham, Moorabbin
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>West:</strong> Footscray, Sunshine, Deer Park, Werribee
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Outer East:</strong> Ringwood, Croydon, Bayswater, Knox (heritage and mould
                  fringe zone)
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost — Melbourne 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Single room surface mould:</strong> $1,500–$4,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Multi-room residential remediation:</strong> $6,000–$22,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Heritage wall (lime plaster — specialist process):</strong> $8,000–$30,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full property post-flood:</strong> $20,000–$75,000+
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is winter condensation mould covered by Melbourne home insurance?',
            answer:
              'Condensation mould from design deficiency or poor ventilation is generally not covered. Mould from a covered water event (storm, burst pipe) is covered. The causation distinction is critical — NRPG documents whether mould originated from a covered event.',
          },
          {
            question: 'How do I know if my Melbourne heritage home has mould in the walls?',
            answer:
              'Signs include cold internal walls in winter (indicating moisture retention), efflorescence on plaster, musty odour concentrated in specific rooms, and peeling paint with discolouration. NRPG uses thermal imaging to map moisture in heritage masonry and lath-and-plaster systems.',
          },
          {
            question: 'Can Melbourne mould affect heritage building materials?',
            answer:
              'Yes — mould penetrates lime-based plaster, historic timbers, and pressed metal ceilings deeply. Standard bleach treatment damages heritage finishes without eliminating the mould at depth. S520-certified contractors use heritage-compatible antimicrobial treatments and controlled moisture extraction.',
          },
          {
            question: 'What causes mould in Melbourne subfloors?',
            answer:
              'Subfloor mould is caused by poor ventilation — extensions blocking airbricks, landscaping raised against foundations, or subfloor insulation trapping moisture. It is typically not covered by home insurance unless caused by a covered plumbing or flooding event. NRPG identifies the source before recommending remediation scope.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Melbourne',
            href: '/water-damage-restoration-melbourne',
            description: 'Emergency water damage restoration across all Melbourne suburbs.',
          },
          {
            title: 'Storm Damage Restoration Melbourne',
            href: '/storm-damage-restoration-melbourne',
            description: 'Storm damage restoration and insurance claim support for Melbourne.',
          },
          {
            title: 'Fire Damage Restoration Melbourne',
            href: '/fire-damage-restoration-melbourne',
            description: 'Fire and smoke damage restoration across Melbourne and Victoria.',
          },
          {
            title: 'Mould Remediation Services',
            href: '/services/mould-remediation',
            description: 'Our national mould remediation service overview.',
          },
        ]}
        cta={{ text: 'Get Emergency Mould Help', href: '/claim' }}
      />
    </>
  );
}
