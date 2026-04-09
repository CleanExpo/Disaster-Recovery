import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-477: Mould Remediation Sydney
 *
 * Created: 9 April 2026
 * Context: Sydney coastal humidity + storm season creates persistent post-water-damage
 * mould risk. Heritage inner-city terrace construction retains moisture long after
 * surface drying, generating wall-cavity mould 3-8 weeks post-event.
 */

export const metadata: Metadata = {
  title: 'Mould Remediation Sydney | IICRC-Certified Emergency Response',
  description:
    'Professional mould remediation across Sydney. IICRC S520-certified contractors for post-storm, post-flood, and structural mould. HEPA remediation, insurance documentation. Lodge your claim 24/7.',
  keywords:
    'mould remediation sydney, mould removal sydney, black mould sydney, mould after flooding sydney, mould inspection sydney, toxic mould sydney NSW',
  openGraph: {
    title: 'Mould Remediation Sydney | IICRC-Certified Emergency Response',
    description:
      'Professional mould remediation across Sydney. IICRC S520-certified contractors for post-storm, post-flood, and structural mould. HEPA remediation, insurance documentation.',
    images: [
      {
        url: `${NAP.url}/api/og?title=Mould+Remediation&city=Sydney&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/mould-remediation-sydney`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/mould-remediation-sydney/#localbusiness`,
  name: `${NAP.name} Sydney`,
  url: `${NAP.url}/mould-remediation-sydney`,
  description:
    'IICRC S520-certified mould remediation contractors serving all Sydney suburbs. Post-storm and post-flood mould specialists. HEPA air scrubbing, containment barriers, and full insurance documentation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'City',
    name: 'Sydney',
    containedInPlace: { '@type': 'State', name: 'New South Wales' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
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
  name: 'Mould Remediation Sydney',
  provider: {
    '@type': 'Organization',
    name: NAP.name,
    '@id': `${NAP.url}/#organization`,
  },
  areaServed: { '@type': 'City', name: 'Sydney' },
  serviceType: 'Mould Remediation',
  description:
    'Professional mould remediation across Sydney to IICRC S520 standard. Physical containment, HEPA filtration, antimicrobial treatment, removal of contaminated materials, and post-clearance air sampling.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I know if Sydney storm damage has caused mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Signs include musty odour, discolouration in corners or behind furniture, soft plasterboard, and condensation on internal windows appearing 2–6 weeks after storm water ingress.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Sydney home insurance cover mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould caused by a covered storm or water event is generally covered. Mould from long-term neglect or maintenance failure is generally not covered. Documentation of causation is critical to claim acceptance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I remediate mould myself in Sydney?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Surface-visible mould in a limited area can be managed with appropriate PPE. Mould in wall cavities, HVAC systems, or subfloor requires professional IICRC S520 remediation. DIY attempts can spread spores and may void your insurance claim if documentation is inadequate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fastest mould remediation response in Sydney?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG dispatches IICRC-certified mould assessors within 48 hours of lodgement. Emergency make-safe (containment and HEPA air scrubbing) can begin within 60 minutes for severe cases. Lodge at disasterrecovery.com.au/claim.',
      },
    },
  ],
};

export default function MouldRemediationSydneyPage() {
  return (
    <>
      <Script
        id="mrsyd-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mrsyd-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mrsyd-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mould Remediation"
        title="Mould Remediation Sydney"
        subtitle="IICRC S520-certified mould remediation across all Sydney suburbs. Post-storm and post-flood mould specialists. HEPA air scrubbing, containment barriers, and full insurance documentation. 48-hour response."
        gradient="linear-gradient(135deg, #1B2A1B 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Mould Remediation', href: '/services/mould-remediation' },
          { label: 'Sydney' },
        ]}
        sections={[
          {
            heading: 'Mould in Sydney — Coastal Humidity and Storm Damage',
            body: (
              <>
                <p>
                  Sydney&apos;s coastal location and humidity (averaging 65% year-round in the eastern
                  suburbs) makes post-water-damage mould growth a significant risk. Sydney&apos;s storm
                  season (October–April) generates regular water ingress events through aged roofing and
                  window systems in the established inner suburbs.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Heritage terrace homes and apartment buildings in the inner west and eastern suburbs
                  have construction characteristics — solid brick walls with cavity fill, timber flooring,
                  plasterboard linings — that retain moisture long after apparent surface drying. The most
                  common mould scenario in Sydney: storm water ingress inadequately remediated by a
                  non-certified contractor, with mould appearing in wall cavities 3–8 weeks later.
                </p>
              </>
            ),
          },
          {
            heading: 'IICRC S520 Mould Remediation — Sydney Standard',
            body: (
              <>
                <p>
                  IICRC S520 governs how mould remediation must be performed in Australia. Key
                  requirements:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Physical containment barriers with negative air pressure
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>HEPA filtration to capture airborne spores</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Removal and disposal of all contaminated porous materials (plasterboard, insulation,
                    flooring) where mould has penetrated beyond the surface
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>Antimicrobial treatment</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Post-clearance air sampling to confirm spore levels have returned to background
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG connects Sydney property owners with S520-certified contractors — contractors
                  who can produce the remediation documentation Sydney insurers require.
                </p>
              </>
            ),
          },
          {
            heading: 'Sydney Suburbs We Cover',
            body: (
              <>
                <p style={{ marginBottom: '0.75rem' }}>
                  48-hour response across all Sydney suburbs:
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Inner West:</strong> Glebe, Newtown, Leichhardt, Marrickville, Ashfield,
                  Burwood, Strathfield
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>North Shore:</strong> Chatswood, Lane Cove, North Sydney, Willoughby, Ryde,
                  Meadowbank
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern Suburbs:</strong> Randwick, Bondi, Coogee, Surry Hills, Paddington
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Beaches:</strong> Manly, Dee Why, Narrabeen, Mona Vale, Newport
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Western Suburbs:</strong> Parramatta, Blacktown, Penrith, Liverpool,
                  Campbelltown
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>South Sydney:</strong> Hurstville, Kogarah, Rockdale, Sutherland, Miranda,
                  Cronulla
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Remediation Cost — Sydney 2026',
            body: (
              <>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Single room surface mould:</strong> $1,500–$4,500
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Multi-room residential remediation:</strong> $6,000–$25,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Wall cavity (with opening):</strong> $10,000–$40,000
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Full property post-flooding:</strong> $25,000–$90,000+
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How do I know if Sydney storm damage has caused mould?',
            answer:
              'Signs include musty odour, discolouration in corners or behind furniture, soft plasterboard, and condensation on internal windows appearing 2–6 weeks after storm water ingress.',
          },
          {
            question: 'Does Sydney home insurance cover mould?',
            answer:
              'Mould caused by a covered storm or water event is generally covered. Mould from long-term neglect or maintenance failure is generally not covered. Documentation of causation is critical to claim acceptance.',
          },
          {
            question: 'Can I remediate mould myself in Sydney?',
            answer:
              'Surface-visible mould in a limited area can be managed with appropriate PPE. Mould in wall cavities, HVAC systems, or subfloor requires professional IICRC S520 remediation. DIY attempts can spread spores and may void your insurance claim if documentation is inadequate.',
          },
          {
            question: 'What is the fastest mould remediation response in Sydney?',
            answer:
              'NRPG dispatches IICRC-certified mould assessors within 48 hours of lodgement. Emergency make-safe (containment and HEPA air scrubbing) can begin within 60 minutes for severe cases. Lodge at disasterrecovery.com.au/claim.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Sydney',
            href: '/water-damage-restoration-sydney',
            description: 'Emergency water damage restoration across all Sydney suburbs.',
          },
          {
            title: 'Storm Damage Restoration Sydney',
            href: '/storm-damage-restoration-sydney',
            description: 'Storm damage restoration and insurance claim support for Sydney.',
          },
          {
            title: 'Mould Remediation Services',
            href: '/services/mould-remediation',
            description: 'Our national mould remediation service overview.',
          },
          {
            title: 'Fire Damage Restoration Sydney',
            href: '/fire-damage-restoration-sydney',
            description: 'Fire damage restoration and smoke remediation across Sydney.',
          },
        ]}
        cta={{ text: 'Get Emergency Mould Help', href: '/claim' }}
      />
    </>
  );
}
