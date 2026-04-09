import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disaster Recovery Services Queensland | 24/7 IICRC-Certified',
  description:
    'IICRC-certified disaster recovery and restoration contractors across Queensland. Flood damage, cyclone recovery, storm damage, fire and water restoration. Available 24/7 across all declared DRFA regions.',
  alternates: {
    canonical: `${NAP.url}/services/queensland`,
  },
  openGraph: {
    title: 'Disaster Recovery Services Queensland | 24/7',
    description:
      'Professional disaster recovery across Queensland. IICRC-certified contractors for flood, cyclone, storm and fire damage. DRFA-supported regions covered.',
    url: `${NAP.url}/services/queensland`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you cover regional and remote areas of Queensland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our contractor network includes certified professionals across metropolitan, regional and remote Queensland. Response times vary by location but we maintain coverage across all DRFA-declared LGAs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does DRFA financial assistance work in Queensland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Disaster Recovery Funding Arrangements (DRFA) is activated by the Queensland Government when a local government area is declared following a disaster. Eligible homeowners, tenants and primary producers can apply for grants to cover essential repairs. The Queensland Reconstruction Authority (QRA) publishes the current list of declared LGAs and available assistance at qld.gov.au/drfa.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help with insurance claims for cyclone damage in Queensland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our IICRC-certified contractors provide detailed scope of works, moisture mapping, photographic documentation and all reports required by insurers for cyclone damage claims. We work with all major insurers operating in Queensland.',
      },
    },
    {
      '@type': 'Question',
      name: 'What IICRC standards do your Queensland contractors follow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our contractors follow IICRC S500:2025 (Water Damage Restoration), IICRC S520:2025 (Mould Remediation), and IICRC S770 (Storm and Storm Surge Damage) standards, as applicable to the loss type.',
      },
    },
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/services/queensland/#localbusiness`,
  name: `${NAP.name} Queensland`,
  url: `${NAP.url}/services/queensland`,
  description:
    '24/7 disaster recovery and restoration services across Queensland. IICRC-certified contractor network for flood damage, cyclone recovery, storm damage, fire damage and mould remediation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'State',
    name: 'Queensland',
    containedInPlace: { '@type': 'Country', name: 'Australia' },
  },
  address: {
    '@type': 'PostalAddress',
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

export default function QueenslandServicesPage() {
  return (
    <>
      <Script
        id="qld-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="svcqld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Queensland"
        title="Disaster Recovery Services Queensland"
        subtitle="IICRC-certified restoration contractors available 24/7 across Queensland. From cyclone recovery in Far North Queensland to flood damage in South East Queensland, we cover every region."
        gradient="linear-gradient(135deg, #7B1A1A 0%, #B91C1C 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-07"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Queensland' },
        ]}
        cta={{ text: 'Start Your Claim', href: '/claim' }}
        sections={[
          {
            heading: "Queensland's Disaster Recovery Landscape",
            body: (
              <>
                <p>
                  Queensland faces more declared natural disasters than any other Australian state. The combination of
                  tropical cyclones in the north, severe thunderstorms and flooding in the south-east, and prolonged
                  drought and bushfire conditions in the inland west means property owners across QLD face a broad
                  spectrum of restoration needs throughout the year.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Queensland Reconstruction Authority (QRA) administers the{' '}
                  <a
                    href="https://www.qld.gov.au/emergency/disasters-emergencies/natural-disasters/disaster-recovery-funding-arrangements"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Disaster Recovery Funding Arrangements (DRFA)
                  </a>
                  , which activates government financial assistance for eligible property owners when a local government
                  area is declared. Our contractor network operates across all DRFA-declared LGAs, ensuring certified
                  professionals are available when and where funding is activated.
                </p>
              </>
            ),
          },
          {
            heading: 'Core Services Across Queensland',
            background: 'light',
            body: (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1rem',
                }}
              >
                {[
                  {
                    title: 'Flood Damage Restoration',
                    href: '/services/flood-damage-restoration',
                    desc: 'Emergency water extraction, structural drying and full flood recovery for homes and businesses.',
                  },
                  {
                    title: 'Cyclone Damage Restoration',
                    href: '/services/cyclone-damage-restoration',
                    desc: 'Cyclone and severe tropical weather recovery including roof tarping, debris removal and structural repair.',
                  },
                  {
                    title: 'Storm Damage Restoration',
                    href: '/services/storm-damage-restoration',
                    desc: 'Emergency storm damage repair for supercell events, hail damage and flash flooding across SEQ.',
                  },
                  {
                    title: 'Water Damage Restoration',
                    href: '/services/water-damage-restoration',
                    desc: '24/7 water extraction, psychrometric drying and mould prevention for all water intrusion events.',
                  },
                  {
                    title: 'Mould Remediation',
                    href: '/services/mould-remediation',
                    desc: 'IICRC-certified mould assessment, containment and remediation in Queensland&apos;s high-humidity environment.',
                  },
                  {
                    title: 'Structural Drying',
                    href: '/services/structural-drying',
                    desc: 'Advanced drying systems for Queensland&apos;s high-moisture post-flood and post-cyclone environments.',
                  },
                  {
                    title: 'Commercial Services',
                    href: '/services/commercial-services',
                    desc: 'Large-scale commercial disaster recovery for Queensland businesses, strata buildings and industrial facilities.',
                  },
                  {
                    title: 'Emergency Response',
                    href: '/services/emergency-response',
                    desc: '24/7 rapid emergency response with contractors positioned across the state for fast deployment.',
                  },
                ].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    style={{
                      display: 'block',
                      padding: '1.25rem',
                      background: 'white',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'var(--ag-primary-blue, #0052CC)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: 'var(--ag-text-muted, #5C6A79)',
                        lineHeight: 1.5,
                      }}
                    >
                      {s.desc}
                    </span>
                  </Link>
                ))}
              </div>
            ),
          },
          {
            heading: 'Queensland Regions We Cover',
            body: (
              <>
                <p>
                  Our contractor network covers all Queensland regions, including metropolitan, regional and remote
                  areas. Key coverage zones include:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>South East Queensland</strong> — Brisbane, Gold Coast, Sunshine Coast, Ipswich, Logan,
                    Moreton Bay, Redland, Toowoomba
                  </li>
                  <li>
                    <strong>Central Queensland</strong> — Rockhampton, Gladstone, Emerald, Longreach
                  </li>
                  <li>
                    <strong>North Queensland</strong> — Townsville, Cairns, Mackay, Bowen
                  </li>
                  <li>
                    <strong>Far North Queensland</strong> — Cairns, Port Douglas, Innisfail, Atherton Tablelands
                  </li>
                  <li>
                    <strong>Wide Bay-Burnett</strong> — Bundaberg, Maryborough, Hervey Bay, Gympie
                  </li>
                  <li>
                    <strong>South West Queensland</strong> — Roma, St George, Cunnamulla
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  For DRFA-declared LGAs, see the official QRA list at{' '}
                  <a
                    href="https://www.qld.gov.au/emergency/disasters-emergencies/natural-disasters/disaster-recovery-funding-arrangements"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    qld.gov.au/drfa
                  </a>
                  .
                </p>
              </>
            ),
          },
          {
            heading: 'Active Disaster Events in Queensland',
            background: 'light',
            body: (
              <>
                <p>
                  If your property was affected by a recent declared disaster event in Queensland, visit the
                  event-specific pages below for insurance claim guidance, DRFA financial assistance details, and
                  contractor support information.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem',
                  }}
                >
                  {[
                    {
                      title: 'Ex-Cyclone Alfred QLD 2025',
                      href: '/events/cyclone-alfred-queensland-2025',
                      desc: 'ICA Insurance Catastrophe declared. 16 DRFA-declared LGAs across SE Queensland.',
                    },
                    {
                      title: 'Cyclone Maila QLD 2026',
                      href: '/events/cyclone-maila-queensland-2026',
                      desc: 'Far North Queensland cyclone event. Recovery support and insurance claims information.',
                    },
                  ].map((e) => (
                    <Link
                      key={e.href}
                      href={e.href}
                      style={{
                        display: 'block',
                        padding: '1.25rem',
                        background: 'white',
                        borderRadius: '0.75rem',
                        textDecoration: 'none',
                        border: '1px solid rgba(185,28,28,0.2)',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontWeight: 600,
                          fontSize: '1rem',
                          color: '#B91C1C',
                          marginBottom: '0.35rem',
                        }}
                      >
                        {e.title}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.875rem',
                          color: 'var(--ag-text-muted, #5C6A79)',
                          lineHeight: 1.5,
                        }}
                      >
                        {e.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            ),
          },
          {
            heading: 'Insurance Claims Support',
            body: (
              <>
                <p>
                  Our contractors work directly with all major Australian insurers operating in Queensland. We provide
                  detailed scope of works, photographic evidence, moisture mapping reports and IICRC-standard
                  documentation that insurers require to process claims efficiently.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Disaster Recovery is an independent restoration network — we act on behalf of property owners, not
                  insurers. Our role is to restore your property to its pre-loss condition using certified methods and
                  materials.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link
                    href="/claim"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 2rem',
                      background: '#B91C1C',
                      color: 'white',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    Start Your Claim Online
                  </Link>
                </div>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Do you cover regional and remote areas of Queensland?',
            answer:
              'Yes. Our contractor network includes certified professionals across metropolitan, regional and remote Queensland. Response times vary by location but we maintain coverage across all DRFA-declared LGAs.',
          },
          {
            question: 'How does DRFA financial assistance work in Queensland?',
            answer:
              "The Disaster Recovery Funding Arrangements (DRFA) is activated by the Queensland Government when a local government area is declared following a disaster. Eligible homeowners, tenants and primary producers can apply for grants to cover essential repairs. The Queensland Reconstruction Authority (QRA) publishes the current list of declared LGAs and available assistance at qld.gov.au/drfa.",
          },
          {
            question: 'Can you help with insurance claims for cyclone damage in Queensland?',
            answer:
              'Yes. Our IICRC-certified contractors provide detailed scope of works, moisture mapping, photographic documentation and all reports required by insurers for cyclone damage claims. We work with all major insurers operating in Queensland.',
          },
          {
            question: 'What IICRC standards do your Queensland contractors follow?',
            answer:
              'Our contractors follow IICRC S500:2025 (Water Damage Restoration), IICRC S520:2025 (Mould Remediation), and IICRC S770 (Storm and Storm Surge Damage) standards, as applicable to the loss type.',
          },
        ]}
        relatedGuides={[
          { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration' },
          { title: 'Cyclone Damage Restoration', href: '/services/cyclone-damage-restoration' },
          { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration' },
          { title: 'All Services', href: '/services' },
        ]}
      />
    </>
  );
}
