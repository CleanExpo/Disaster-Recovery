import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disaster Recovery Services New South Wales | 24/7 IICRC-Certified',
  description:
    'IICRC-certified disaster recovery and restoration contractors across New South Wales. Flood damage, storm damage, fire and water restoration. Available 24/7 across Sydney, Newcastle, Wollongong and regional NSW.',
  alternates: {
    canonical: `${NAP.url}/services/new-south-wales`,
  },
  openGraph: {
    title: 'Disaster Recovery Services New South Wales | 24/7',
    description:
      'Professional disaster recovery across NSW. IICRC-certified contractors for flood, storm, fire and water damage. Sydney, Newcastle, Wollongong and all regional areas.',
    url: `${NAP.url}/services/new-south-wales`,
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/services/new-south-wales/#localbusiness`,
  name: `${NAP.name} New South Wales`,
  url: `${NAP.url}/services/new-south-wales`,
  description:
    '24/7 disaster recovery and restoration services across New South Wales. IICRC-certified contractor network for flood damage, storm damage, fire damage, water damage and mould remediation.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'State',
    name: 'New South Wales',
    containedInPlace: { '@type': 'Country', name: 'Australia' },
  },
  address: {
    '@type': 'PostalAddress',
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

export default function NewSouthWalesServicesPage() {
  return (
    <>
      <Script
        id="nsw-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AgGuidePageTemplate
        category="New South Wales"
        title="Disaster Recovery Services New South Wales"
        subtitle="IICRC-certified restoration contractors available 24/7 across New South Wales. From Sydney metro to the Northern Rivers, Hunter Valley, Illawarra and beyond."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-07"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'New South Wales' },
        ]}
        cta={{ text: 'Start Your Claim', href: '/claim' }}
        sections={[
          {
            heading: "New South Wales Disaster Profile",
            body: (
              <>
                <p>
                  New South Wales experiences a diverse range of natural disasters, with the east coast particularly
                  prone to severe flooding, intense east-coast lows and tropical weather systems. The Northern Rivers
                  and Hawkesbury-Nepean Valley are among Australia&apos;s most flood-affected regions, while coastal
                  communities from Sydney to Wollongong regularly contend with storm surge, wind damage and heavy
                  rainfall events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The NSW Government activates the{' '}
                  <a
                    href="https://www.service.nsw.gov.au/campaign/natural-disaster-help"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Disaster Welfare Assistance
                  </a>{' '}
                  scheme for eligible residents in declared disaster areas. Our certified contractor network is
                  deployed across all NSW declared natural disaster local government areas.
                </p>
              </>
            ),
          },
          {
            heading: 'Core Services Across NSW',
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
                    desc: 'Emergency flood recovery across the Northern Rivers, Hunter, Hawkesbury and all affected NSW river systems.',
                  },
                  {
                    title: 'Storm Damage Restoration',
                    href: '/services/storm-damage-restoration',
                    desc: 'East-coast low and severe thunderstorm damage repair including roof tarping, structural drying and debris removal.',
                  },
                  {
                    title: 'Water Damage Restoration',
                    href: '/services/water-damage-restoration',
                    desc: '24/7 water extraction, psychrometric drying and full restoration for burst pipes, roof leaks and water intrusion.',
                  },
                  {
                    title: 'Fire Damage Restoration',
                    href: '/services/fire-damage-restoration',
                    desc: 'Complete fire, smoke and soot damage restoration including structural repairs and contents cleaning.',
                  },
                  {
                    title: 'Mould Remediation',
                    href: '/services/mould-remediation',
                    desc: 'IICRC-certified mould identification, containment and remediation following flood and water events across NSW.',
                  },
                  {
                    title: 'Structural Drying',
                    href: '/services/structural-drying',
                    desc: 'Advanced dehumidification and drying systems for post-flood structural recovery across NSW properties.',
                  },
                  {
                    title: 'Commercial Services',
                    href: '/services/commercial-services',
                    desc: 'Large-scale disaster recovery for NSW businesses, commercial buildings and strata complexes.',
                  },
                  {
                    title: 'Emergency Response',
                    href: '/services/emergency-response',
                    desc: '24/7 emergency response with rapid deployment across Sydney metro and regional NSW.',
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
            heading: 'NSW Regions We Cover',
            body: (
              <>
                <p>Our certified contractor network operates across all New South Wales regions:</p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Sydney Metropolitan</strong> — All LGAs from Penrith and the Blue Mountains to the Eastern
                    Suburbs and Northern Beaches
                  </li>
                  <li>
                    <strong>Hunter & Central Coast</strong> — Newcastle, Lake Macquarie, Maitland, Cessnock, Gosford,
                    Wyong
                  </li>
                  <li>
                    <strong>Northern Rivers</strong> — Lismore, Ballina, Byron Bay, Tweed, Richmond Valley, Kyogle
                  </li>
                  <li>
                    <strong>Illawarra & South Coast</strong> — Wollongong, Shellharbour, Kiama, Shoalhaven, Bega Valley
                  </li>
                  <li>
                    <strong>Hawkesbury-Nepean Valley</strong> — Windsor, Richmond, Penrith floodplain
                  </li>
                  <li>
                    <strong>New England & North West</strong> — Tamworth, Armidale, Moree, Narrabri
                  </li>
                  <li>
                    <strong>Riverina & Murray</strong> — Wagga Wagga, Albury, Griffith, Mildura border region
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Insurance Claims Support in NSW',
            background: 'light',
            body: (
              <>
                <p>
                  Our contractors work with all major Australian insurers handling NSW property claims. We provide
                  detailed moisture mapping, scope of works and IICRC-standard documentation to support your claim
                  from lodgement through to settlement.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Disaster Recovery is an independent restoration network — we represent property owners, not insurers.
                  Our certified professionals restore your property to its pre-loss condition using verified methods
                  that meet insurer documentation requirements.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link
                    href="/claim"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 2rem',
                      background: '#0052CC',
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
            question: 'Do you cover the Northern Rivers flood-affected areas?',
            answer:
              'Yes. Our contractor network covers all Northern Rivers LGAs including Lismore, Ballina, Byron Bay, Richmond Valley and Tweed. These areas are priority coverage zones given their ongoing flood risk profile.',
          },
          {
            question: 'How does NSW disaster financial assistance work?',
            answer:
              'The NSW Government activates disaster welfare assistance and recovery grants when LGAs are declared following major events. Eligible residents may access personal hardship assistance, essential services support and structural repair grants. Check current declared areas at service.nsw.gov.au.',
          },
          {
            question: 'What is the typical response time for emergency water damage in Sydney?',
            answer:
              'Response times vary by contractor availability and location. Our network maintains contractors positioned across Sydney metro, with priority deployment to emergency water damage calls. Contact us via the claim form for the fastest connection to an available certified contractor.',
          },
          {
            question: 'Can you handle large commercial flood events in NSW?',
            answer:
              'Yes. Our commercial services team handles large-scale flood recovery for offices, retail centres, warehouses, strata complexes and industrial facilities across NSW. We scale contractor deployment to meet the scope of the loss.',
          },
        ]}
        relatedGuides={[
          { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration' },
          { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration' },
          { title: 'Water Damage Restoration Sydney', href: '/water-damage-restoration-sydney' },
          { title: 'All Services', href: '/services' },
        ]}
      />
    </>
  );
}
