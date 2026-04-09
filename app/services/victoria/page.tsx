import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disaster Recovery Services Victoria | 24/7 IICRC-Certified',
  description:
    'IICRC-certified disaster recovery and restoration contractors across Victoria. Bushfire recovery, flood damage, storm damage, smoke and soot remediation. Available 24/7 across Melbourne metro and all regional Victoria.',
  alternates: {
    canonical: `${NAP.url}/services/victoria`,
  },
  openGraph: {
    title: 'Disaster Recovery Services Victoria | 24/7',
    description:
      'Professional disaster recovery across Victoria. IICRC-certified contractors for bushfire recovery, flood damage and storm damage. Melbourne metro and all regional Victoria.',
    url: `${NAP.url}/services/victoria`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can you handle bushfire smoke and soot damage in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our IICRC S520:2025-certified contractors specialise in smoke and soot remediation, including air quality testing, surface decontamination, HVAC cleaning and contents restoration for bushfire-affected properties across Victoria.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you service East Gippsland and Alpine areas after bushfires?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. East Gippsland and the Alpine Shire are priority coverage zones given their repeat bushfire history. Our contractors are deployed to these areas immediately following declared events.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Victorian emergency recovery financial assistance work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency Recovery Victoria administers financial assistance grants for eligible residents in declared disaster zones. Assistance types include essential services, emergency accommodation, structural repairs and clean-up support. Current declared areas and eligibility details are at vic.gov.au/emergency-recovery-victoria.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help with post-flood mould in Victorian properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Victoria\u2019s cool, damp climate accelerates mould growth following flood events. Our IICRC S520:2025-certified contractors provide mould assessment, containment, remediation and clearance testing for post-flood properties across the state.',
      },
    },
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/services/victoria/#localbusiness`,
  name: `${NAP.name} Victoria`,
  url: `${NAP.url}/services/victoria`,
  description:
    '24/7 disaster recovery and restoration services across Victoria. IICRC-certified contractor network for bushfire recovery, smoke and soot remediation, flood damage, storm damage, water damage and mould remediation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'State',
    name: 'Victoria',
    containedInPlace: { '@type': 'Country', name: 'Australia' },
  },
  address: {
    '@type': 'PostalAddress',
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

export default function VictoriaServicesPage() {
  return (
    <>
      <Script
        id="vic-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="svcvic-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Victoria"
        title="Disaster Recovery Services Victoria"
        subtitle="IICRC-certified restoration contractors available 24/7 across Victoria. Specialist bushfire and flood recovery from Melbourne metro through East Gippsland, Alpine and Western Victoria."
        gradient="linear-gradient(135deg, #1A3A1A 0%, #166534 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-07"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Victoria' },
        ]}
        cta={{ text: 'Start Your Claim', href: '/claim' }}
        sections={[
          {
            heading: "Victoria's Dual Disaster Risk — Bushfire and Flood",
            body: (
              <>
                <p>
                  Victoria faces a dual natural hazard profile that is unique among Australian states. High-risk
                  bushfire corridors run through East Gippsland, the Alpine region, the Dandenong Ranges and parts of
                  Western Victoria, while flood risk is concentrated along the Murray–Darling system, the Latrobe
                  Valley and coastal waterways in South Gippsland and the Surf Coast.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Victorian Government activates financial assistance through the{' '}
                  <a
                    href="https://www.vic.gov.au/emergency-recovery-victoria"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Emergency Recovery Victoria
                  </a>{' '}
                  scheme for eligible property owners in declared disaster zones. Our contractor network covers all
                  Victoria Emergency Management Commissioner (VEMC) declared areas.
                </p>
              </>
            ),
          },
          {
            heading: 'Core Services Across Victoria',
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
                    title: 'Bushfire Damage Restoration',
                    href: '/services/bushfire-damage-restoration',
                    desc: 'Specialist bushfire damage assessment, smoke and soot remediation, char removal and full structural restoration.',
                  },
                  {
                    title: 'Flood Damage Restoration',
                    href: '/services/flood-damage-restoration',
                    desc: 'Emergency flood recovery across the Latrobe Valley, Murray-Darling basin and coastal Victoria.',
                  },
                  {
                    title: 'Fire Damage Restoration',
                    href: '/services/fire-damage-restoration',
                    desc: 'Complete fire, smoke and soot restoration for residential and commercial properties across Victoria.',
                  },
                  {
                    title: 'Water Damage Restoration',
                    href: '/services/water-damage-restoration',
                    desc: '24/7 water extraction and drying for burst pipes, roof leaks and post-flood water intrusion.',
                  },
                  {
                    title: 'Mould Remediation',
                    href: '/services/mould-remediation',
                    desc: 'IICRC-certified mould assessment and remediation for post-flood and post-bushfire properties.',
                  },
                  {
                    title: 'Storm Damage Restoration',
                    href: '/services/storm-damage-restoration',
                    desc: 'Emergency storm damage repair across Melbourne metro and regional Victoria.',
                  },
                  {
                    title: 'Contents Cleaning',
                    href: '/services/specialty-services',
                    desc: 'Specialist cleaning and restoration for fire-affected and smoke-damaged contents and valuables.',
                  },
                  {
                    title: 'Emergency Response',
                    href: '/services/emergency-response',
                    desc: '24/7 rapid emergency response across Melbourne metro and regional Victoria.',
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
            heading: 'Victoria Regions We Cover',
            body: (
              <>
                <p>Our certified contractor network operates across all Victorian regions:</p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Melbourne Metropolitan</strong> — All inner, middle and outer metropolitan LGAs
                  </li>
                  <li>
                    <strong>East Gippsland & Alpine</strong> — Bairnsdale, Lakes Entrance, Alpine Shire, Wodonga,
                    Indigo, Towong — high bushfire risk zones
                  </li>
                  <li>
                    <strong>Gippsland & Latrobe Valley</strong> — Traralgon, Morwell, Sale, South Gippsland,
                    Wellington
                  </li>
                  <li>
                    <strong>Mornington Peninsula & Bass Coast</strong> — Coastal storm and flood risk
                  </li>
                  <li>
                    <strong>Macedon Ranges & Dandenong Ranges</strong> — Bushfire interface zones
                  </li>
                  <li>
                    <strong>Murray-Darling & Mallee</strong> — Mildura, Swan Hill, Echuca, Shepparton — flood plains
                  </li>
                  <li>
                    <strong>Western Victoria</strong> — Ballarat, Geelong, Warrnambool, Hamilton, Horsham
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Active Disaster Events in Victoria',
            background: 'light',
            body: (
              <>
                <p>
                  If your property was affected by a recent declared disaster event in Victoria, visit the
                  event-specific pages below for insurance claim guidance, government financial assistance details and
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
                      title: 'Victoria Bushfires 2025',
                      href: '/events/victoria-bushfires-2025',
                      desc: 'East Gippsland and Alpine bushfire recovery. Insurance claims support and contractor network.',
                    },
                    {
                      title: 'Victoria Bushfires 2026',
                      href: '/events/victoria-bushfires-2026',
                      desc: 'Most recent Victorian bushfire event. Current recovery support and claims information.',
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
                        border: '1px solid rgba(22,101,52,0.2)',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontWeight: 600,
                          fontSize: '1rem',
                          color: '#166534',
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
            heading: 'Insurance Claims Support in Victoria',
            body: (
              <>
                <p>
                  Our contractors work with all major Australian insurers handling Victorian property claims, including
                  bushfire and flood-specific policies. We provide detailed scope of works, photographic evidence,
                  moisture mapping, air quality testing and IICRC-standard documentation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Disaster Recovery is an independent restoration network — we represent property owners, not insurers.
                  Our role is to restore your property to its pre-loss condition using certified methods that meet
                  insurer requirements.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link
                    href="/claim"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 2rem',
                      background: '#166534',
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
            question: 'Can you handle bushfire smoke and soot damage in Victoria?',
            answer:
              'Yes. Our IICRC S520:2025-certified contractors specialise in smoke and soot remediation, including air quality testing, surface decontamination, HVAC cleaning and contents restoration for bushfire-affected properties across Victoria.',
          },
          {
            question: 'Do you service East Gippsland and Alpine areas after bushfires?',
            answer:
              'Yes. East Gippsland and the Alpine Shire are priority coverage zones given their repeat bushfire history. Our contractors are deployed to these areas immediately following declared events.',
          },
          {
            question: 'How does Victorian emergency recovery financial assistance work?',
            answer:
              'Emergency Recovery Victoria administers financial assistance grants for eligible residents in declared disaster zones. Assistance types include essential services, emergency accommodation, structural repairs and clean-up support. Current declared areas and eligibility details are at vic.gov.au/emergency-recovery-victoria.',
          },
          {
            question: 'Can you help with post-flood mould in Victorian properties?',
            answer:
              'Yes. Victoria&apos;s cool, damp climate accelerates mould growth following flood events. Our IICRC S520:2025-certified contractors provide mould assessment, containment, remediation and clearance testing for post-flood properties across the state.',
          },
        ]}
        relatedGuides={[
          { title: 'Bushfire Damage Restoration', href: '/services/bushfire-damage-restoration' },
          { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration' },
          { title: 'Water Damage Restoration Melbourne', href: '/water-damage-restoration-melbourne' },
          { title: 'All Services', href: '/services' },
        ]}
      />
    </>
  );
}
