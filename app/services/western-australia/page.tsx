import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disaster Recovery Services Western Australia | 24/7 IICRC-Certified',
  description:
    'IICRC-certified disaster recovery and restoration contractors across Western Australia. Cyclone recovery, storm damage, flood restoration and bushfire recovery. Available 24/7 across Perth metro and all regional WA.',
  alternates: {
    canonical: `${NAP.url}/services/western-australia`,
  },
  openGraph: {
    title: 'Disaster Recovery Services Western Australia | 24/7',
    description:
      'Professional disaster recovery across Western Australia. IICRC-certified contractors for cyclone, storm, flood and bushfire damage. Perth metro and all regional WA.',
    url: `${NAP.url}/services/western-australia`,
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/services/western-australia/#localbusiness`,
  name: `${NAP.name} Western Australia`,
  url: `${NAP.url}/services/western-australia`,
  description:
    '24/7 disaster recovery and restoration services across Western Australia. IICRC-certified contractor network for cyclone recovery, storm damage, flood restoration, bushfire recovery and water damage.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'State',
    name: 'Western Australia',
    containedInPlace: { '@type': 'Country', name: 'Australia' },
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'WA',
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

export default function WesternAustraliaServicesPage() {
  return (
    <>
      <Script
        id="wa-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AgGuidePageTemplate
        category="Western Australia"
        title="Disaster Recovery Services Western Australia"
        subtitle="IICRC-certified restoration contractors available 24/7 across Western Australia. Cyclone and storm recovery specialists from Perth metro through the Pilbara, Kimberley, Gascoyne and the South West."
        gradient="linear-gradient(135deg, #0F2942 0%, #0E7490 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-07"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Western Australia' },
        ]}
        cta={{ text: 'Start Your Claim', href: '/claim' }}
        sections={[
          {
            heading: "Western Australia's Cyclone and Storm Risk Profile",
            body: (
              <>
                <p>
                  Western Australia is Australia&apos;s most cyclone-exposed state. The Pilbara, Kimberley and
                  Gascoyne regions are directly in the cyclone belt, receiving an average of several tropical cyclones
                  per season. Communities from Broome through Port Hedland, Karratha, Carnarvon and Geraldton face
                  recurring cyclone and severe tropical weather damage each year.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Perth metro and the South West are subject to intense winter storms, flooding and bushfire events.
                  The WA Government administers recovery assistance through{' '}
                  <a
                    href="https://www.dfes.wa.gov.au/recovery"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DFES Recovery WA
                  </a>{' '}
                  and the{' '}
                  <a
                    href="https://www.wa.gov.au/organisation/department-of-communities/disaster-recovery-allowance"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WA Disaster Recovery Allowance
                  </a>{' '}
                  for eligible residents in declared disaster areas.
                </p>
              </>
            ),
          },
          {
            heading: 'Core Services Across Western Australia',
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
                    title: 'Cyclone Damage Restoration',
                    href: '/services/cyclone-damage-restoration',
                    desc: 'Specialist cyclone recovery for the Pilbara, Kimberley and Gascoyne — structural repair, water extraction and full restoration.',
                  },
                  {
                    title: 'Storm Damage Restoration',
                    href: '/services/storm-damage-restoration',
                    desc: 'Emergency storm damage repair for Perth metro winter storms, severe weather and wind damage events.',
                  },
                  {
                    title: 'Flood Damage Restoration',
                    href: '/services/flood-damage-restoration',
                    desc: 'Flood recovery for cyclone-associated flooding, riverine flooding and urban flash flood events across WA.',
                  },
                  {
                    title: 'Bushfire Damage Restoration',
                    href: '/services/bushfire-damage-restoration',
                    desc: 'Bushfire recovery for the Perth Hills, South West and Wheatbelt — smoke remediation, soot removal and structural restoration.',
                  },
                  {
                    title: 'Water Damage Restoration',
                    href: '/services/water-damage-restoration',
                    desc: '24/7 emergency water extraction and structural drying for all water intrusion events across WA.',
                  },
                  {
                    title: 'Mould Remediation',
                    href: '/services/mould-remediation',
                    desc: 'IICRC S520-certified mould assessment and remediation for post-cyclone and post-flood WA properties.',
                  },
                  {
                    title: 'Commercial Services',
                    href: '/services/commercial-services',
                    desc: 'Large-scale commercial disaster recovery for WA mining, resource and commercial building sectors.',
                  },
                  {
                    title: 'Emergency Response',
                    href: '/services/emergency-response',
                    desc: '24/7 emergency response across Perth metro and regional Western Australia.',
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
            heading: 'WA Regions We Cover',
            body: (
              <>
                <p>Our certified contractor network operates across all Western Australian regions:</p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Perth Metropolitan</strong> — All metro LGAs from Mandurah to Two Rocks, including the
                    Perth Hills interface zone
                  </li>
                  <li>
                    <strong>South West</strong> — Bunbury, Busselton, Margaret River, Manjimup — storm and flood risk
                  </li>
                  <li>
                    <strong>Gascoyne & Mid West</strong> — Carnarvon, Geraldton, Meekatharra — cyclone and storm
                  </li>
                  <li>
                    <strong>Pilbara</strong> — Karratha, Port Hedland, Newman — severe cyclone zone
                  </li>
                  <li>
                    <strong>Kimberley</strong> — Broome, Kununurra, Derby, Wyndham — tropical wet season and cyclone
                  </li>
                  <li>
                    <strong>Wheatbelt</strong> — Northam, Merredin, Narrogin — bushfire and storm
                  </li>
                  <li>
                    <strong>Goldfields & Esperance</strong> — Kalgoorlie, Esperance — coastal storm risk
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Active Disaster Events in Western Australia',
            background: 'light',
            body: (
              <>
                <p>
                  If your property was affected by a recent declared disaster event in Western Australia, visit the
                  event-specific page below for insurance claim guidance, government financial assistance and
                  contractor support information.
                </p>
                <div style={{ marginTop: '1rem' }}>
                  <Link
                    href="/events/cyclone-narelle-western-australia-2026"
                    style={{
                      display: 'block',
                      padding: '1.25rem',
                      background: 'white',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      border: '1px solid rgba(14,116,144,0.2)',
                      maxWidth: '400px',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: '#0E7490',
                        marginBottom: '0.35rem',
                      }}
                    >
                      Cyclone Narelle WA 2026
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: 'var(--ag-text-muted, #5C6A79)',
                        lineHeight: 1.5,
                      }}
                    >
                      Western Australia cyclone event. Recovery support, insurance claims and contractor network.
                    </span>
                  </Link>
                </div>
              </>
            ),
          },
          {
            heading: 'Insurance Claims Support in Western Australia',
            background: 'light',
            body: (
              <>
                <p>
                  Our contractors provide all documentation required for WA insurance claims, including cyclone
                  damage assessments, storm scope of works, moisture mapping reports and IICRC-standard
                  documentation accepted by all major Australian insurers.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Disaster Recovery is an independent restoration network — we work on behalf of property owners,
                  not insurers. Our role is to restore your property to its pre-loss condition using certified
                  methods and materials.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link
                    href="/claim"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 2rem',
                      background: '#0E7490',
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
            question: 'Do you service Pilbara and Kimberley cyclone damage?',
            answer:
              'Yes. The Pilbara and Kimberley are our highest-priority cyclone deployment zones in WA. Our certified contractors are positioned for rapid response to Karratha, Port Hedland, Broome and surrounds during and after cyclone events.',
          },
          {
            question: 'Can you handle mining camp and industrial facility damage in WA?',
            answer:
              'Yes. Our commercial services team has experience with mining sector facilities, processing plants and worker accommodation across regional WA. We provide large-scale restoration for industrial and commercial properties.',
          },
          {
            question: 'How does WA disaster financial assistance work?',
            answer:
              'DFES Recovery WA and the WA Government administer financial assistance for eligible residents and businesses in declared disaster areas. Assistance may include emergency accommodation, structural repair grants and essential services support. Visit dfes.wa.gov.au/recovery for current declared areas and eligibility.',
          },
          {
            question: 'What Perth metro storm damage do you cover?',
            answer:
              'We cover all Perth metro storm damage including wind damage, roof damage, flooding, fallen trees, storm surge on coastal properties and all associated water damage. Our Perth network provides 24/7 emergency response and full restoration services.',
          },
        ]}
        relatedGuides={[
          { title: 'Cyclone Damage Restoration', href: '/services/cyclone-damage-restoration' },
          { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration' },
          { title: 'Flood Damage Restoration Perth', href: '/flood-damage-restoration-perth' },
          { title: 'All Services', href: '/services' },
        ]}
      />
    </>
  );
}
