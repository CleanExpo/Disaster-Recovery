import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-476: Mould Remediation Brisbane
 *
 * Created: 9 April 2026
 * Context: Post-Alfred mould surge — one of the highest-volume search terms
 * in Brisbane following Ex-TC Alfred (March 2026). 132,000+ QLD claims,
 * AU$1.877B insured losses. Secondary mould damage now appearing 3-6 weeks
 * post-event. Subtropical climate creates rapid mould propagation conditions.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Brisbane | IICRC-Certified 24/7 Emergency',
  description:
    'Professional mould remediation across Brisbane. IICRC-certified contractors for post-flood, post-Alfred, and post-water damage mould. HEPA remediation, 48-hour response. Lodge your claim 24/7.',
  keywords:
    'mould remediation brisbane, mould removal brisbane, black mould brisbane, mould after flooding brisbane, alfred mould brisbane, mould inspection brisbane, toxic mould brisbane',
  openGraph: {
    title: 'Mould Remediation Brisbane | IICRC-Certified 24/7 Emergency',
    description:
      'Professional mould remediation across Brisbane. IICRC-certified contractors for post-flood, post-Alfred, and post-water damage mould. HEPA remediation, 48-hour response.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Brisbane&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-brisbane`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-brisbane/#localbusiness`,
  name: `${NAP.name} Brisbane`,
  url: `${NAP.url}/mould-remediation-brisbane`,
  description:
    'IICRC-certified mould remediation contractors serving all Brisbane suburbs. Post-Alfred mould specialists. HEPA air scrubbing, structural drying verification, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Brisbane',
    containedInPlace: { '@type': 'State', name: 'Queensland' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brisbane',
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
  name: 'Mould Remediation Brisbane',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Brisbane' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Brisbane. Post-Alfred mould specialists. HEPA air scrubbing, thermal imaging, antimicrobial treatment, containment barriers, and post-remediation clearance testing to IICRC S520.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is mould from Alfred covered by Brisbane home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould directly caused by a covered storm or water event is generally covered. The challenge is demonstrating causation — delayed reporting or incomplete drying documentation can lead to disputes. Lodge with IICRC-certified scope showing a causal link to the Alfred event.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my Brisbane property has mould in the walls?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Signs include musty odour that does not go away with cleaning, soft or bubbling plasterboard, condensation on internal windows, and mould appearing at wall-floor junctions or in corners. NRPG uses thermal imaging and HEPA air sampling to confirm mould presence in cavities before walls are opened.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I stay in my Brisbane property during mould remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depends on the extent. Minor surface remediation — yes, with HEPA containment barriers. Extensive wall cavity remediation — temporary relocation is recommended. If Alfred damage is the cause, your insurer\'s ALE benefit may cover temporary accommodation. Discuss with NRPG at initial assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is mould appearing weeks after Alfred?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Residual moisture in wall cavities, subfloor, and insulation continues to support mould growth for weeks or months after apparent surface drying. Thermal imaging frequently detects wet areas invisible to standard inspection. NRPG performs moisture verification before and after remediation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the IICRC standard for mould remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S520 is the standard for mould remediation. It governs containment, HEPA filtration, antimicrobial treatment, and post-remediation clearance testing. Insurers require S520-compliant documentation for mould claim sign-off — non-certified work may not be accepted.',
      },
    },
  ],
};

export default function MouldRemediationBrisbanePage() {
  return (
    <>
      <Script
        id="mrbne-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrbne-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrbne-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Brisbane"
        subtitle="IICRC-certified mould remediation across all Brisbane suburbs. Post-Alfred mould specialists. HEPA air scrubbing, structural drying verification, and full insurance documentation. 48-hour response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Brisbane' },
        ]}
        sections={[
          {
            heading: "Post-Alfred Mould — Brisbane's Hidden Crisis",
            body: (
              <>
                <p>
                  Ex-TC Alfred in March 2026 left 132,000+ insurance claims across QLD. PERILS confirmed
                  AU$1.877 billion in final insured losses. For Brisbane properties, the real mould risk is
                  only now becoming apparent — 3–6 weeks after the event. Incomplete structural drying
                  (insufficient equipment, rushed restoration, non-certified contractors) leaves residual
                  moisture in wall cavities and subfloor spaces.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Brisbane&apos;s subtropical humidity (averaging 65–70% year-round) creates ideal mould
                  propagation conditions: mould can establish within 24–48 hours in damp materials.
                  Properties that appeared dry immediately after Alfred may now be showing: musty odour,
                  discolouration in corners and behind furniture, soft plasterboard, and visible mould
                  colonies behind damaged walls.
                </p>
              </>
            ),
          },
          {
            heading: "Why Household Cleaning Doesn't Work on Brisbane Mould",
            body: (
              <>
                <p>
                  Surface cleaning with bleach or household products addresses visible mould but cannot
                  eliminate the root cause: moisture in wall cavities, subfloor spaces, and building
                  materials that were never properly dried. In Brisbane&apos;s climate, surface-treated mould
                  regrows within weeks because the underlying substrate remains damp.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  IICRC-certified mould remediation addresses the root cause:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Thermal imaging to locate residual moisture in wall cavities and subfloor
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    HEPA air scrubbing to capture airborne mould spores and prevent spread to unaffected
                    areas
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Antimicrobial treatment at the root level, not just the surface
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Containment barriers during remediation to prevent cross-contamination
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Post-remediation clearance testing to confirm successful remediation
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost Estimates — Brisbane 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Single-room surface mould (post-water event):</strong> $1,500–$4,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Multi-room residential mould remediation:</strong> $5,000–$20,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wall cavity and subfloor mould (requires opening walls):</strong>{' '}
                    $8,000–$35,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full property mould remediation (post-inundation):</strong> $20,000–$80,000+
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Post-Alfred supplementary mould claim:</strong> Varies — NRPG documents to
                    IICRC standard for insurer submission
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Brisbane Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  48-hour response across all Brisbane suburbs:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner City:</strong> Brisbane CBD, South Brisbane, Fortitude Valley, New Farm,
                  Newstead, Spring Hill
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner North:</strong> Ashgrove, Paddington, Red Hill, Kelvin Grove, Newmarket,
                  Keperra
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner South:</strong> West End, Highgate Hill, Moorooka, Rocklea, Yeronga,
                  Annerley
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern:</strong> Bulimba, Hawthorne, Morningside, Camp Hill, Coorparoo,
                  Norman Park
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western:</strong> Toowong, Indooroopilly, St Lucia, Graceville, Sherwood,
                  Corinda
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern:</strong> Chermside, Aspley, Stafford, Kedron, Nundah, Northgate,
                  Zillmere
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Eight Mile Plains, Sunnybank, Runcorn, Calamvale, Parkinson
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is mould from Alfred covered by Brisbane home insurance?',
            answer:
              "Mould directly caused by a covered storm or water event is generally covered. The challenge is demonstrating causation — delayed reporting or incomplete drying documentation can lead to disputes. Lodge with IICRC-certified scope showing a causal link to the Alfred event.",
          },
          {
            question: 'How do I know if my Brisbane property has mould in the walls?',
            answer:
              "Signs include musty odour that does not go away with cleaning, soft or bubbling plasterboard, condensation on internal windows, and mould appearing at wall-floor junctions or in corners. NRPG uses thermal imaging and HEPA air sampling to confirm mould presence in cavities before walls are opened.",
          },
          {
            question: 'Can I stay in my Brisbane property during mould remediation?',
            answer:
              "Depends on the extent. Minor surface remediation — yes, with HEPA containment barriers. Extensive wall cavity remediation — temporary relocation is recommended. If Alfred damage is the cause, your insurer's ALE benefit may cover temporary accommodation. Discuss with NRPG at initial assessment.",
          },
          {
            question: 'Why is mould appearing weeks after Alfred?',
            answer:
              "Residual moisture in wall cavities, subfloor, and insulation continues to support mould growth for weeks or months after apparent surface drying. Thermal imaging frequently detects wet areas invisible to standard inspection. NRPG performs moisture verification before and after remediation.",
          },
          {
            question: 'What is the IICRC standard for mould remediation?',
            answer:
              "IICRC S520 is the standard for mould remediation. It governs containment, HEPA filtration, antimicrobial treatment, and post-remediation clearance testing. Insurers require S520-compliant documentation for mould claim sign-off — non-certified work may not be accepted.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Ex-TC Alfred Recovery',
            href: '/events/ex-cyclone-alfred-recovery',
            description: 'If your Alfred claim is stuck or underpaid, NRPG can escalate.',
          },
          {
            title: 'Water Damage Restoration Brisbane',
            href: '/water-damage-restoration-brisbane',
            description: 'Emergency water damage restoration across all Brisbane suburbs.',
          },
          {
            title: 'Storm Damage Restoration Brisbane',
            href: '/storm-damage-restoration-brisbane',
            description: 'Storm damage restoration and insurance claim support for Brisbane.',
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
