import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Disaster Recovery Services South Australia | 24/7 IICRC-Certified',
  description:
    'IICRC-certified disaster recovery and restoration contractors across South Australia. Storm damage, hail damage, flood recovery and bushfire restoration. Available 24/7 across Adelaide metro and all regional SA.',
  alternates: {
    canonical: `${NAP.url}/services/south-australia`,
  },
  openGraph: {
    title: 'Disaster Recovery Services South Australia | 24/7',
    description:
      'Professional disaster recovery across South Australia. IICRC-certified contractors for storm, hail, flood and bushfire damage. Adelaide metro and all regional SA.',
    url: `${NAP.url}/services/south-australia`,
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/services/south-australia/#localbusiness`,
  name: `${NAP.name} South Australia`,
  url: `${NAP.url}/services/south-australia`,
  description:
    '24/7 disaster recovery and restoration services across South Australia. IICRC-certified contractor network for storm damage, hail damage, flood recovery, bushfire restoration and water damage.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: {
    '@type': 'State',
    name: 'South Australia',
    containedInPlace: { '@type': 'Country', name: 'Australia' },
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'SA',
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

export default function SouthAustraliaServicesPage() {
  return (
    <>
      <Script
        id="sa-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AgGuidePageTemplate
        category="South Australia"
        title="Disaster Recovery Services South Australia"
        subtitle="IICRC-certified restoration contractors available 24/7 across South Australia. Storm and hail damage specialists from Adelaide metro through the Barossa, Fleurieu Peninsula, Riverland and beyond."
        gradient="linear-gradient(135deg, #1C1C3A 0%, #4338CA 100%)"
        icon={<MapPin className="h-10 w-10" />}
        lastReviewed="2026-04-07"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'South Australia' },
        ]}
        cta={{ text: 'Start Your Claim', href: '/claim' }}
        sections={[
          {
            heading: "South Australia's Disaster Risk Profile",
            body: (
              <>
                <p>
                  South Australia&apos;s disaster profile is defined by extreme heat, severe thunderstorms and
                  associated hail events, coastal storm surge, and significant bushfire risk across the Adelaide Hills,
                  Kangaroo Island, the Yorke and Eyre Peninsulas and parts of the South East. The Adelaide metro area
                  experiences several severe hail events each year capable of causing widespread roof and vehicle
                  damage.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The SA Government administers recovery assistance through{' '}
                  <a
                    href="https://www.recovery.sa.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Recovery SA
                  </a>{' '}
                  for eligible residents and businesses in declared disaster areas. Our certified contractors cover
                  all SA declared natural disaster zones.
                </p>
              </>
            ),
          },
          {
            heading: 'Core Services Across South Australia',
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
                    title: 'Storm Damage Restoration',
                    href: '/services/storm-damage-restoration',
                    desc: 'Emergency storm damage repair including roof tarping, debris removal, structural drying and full property restoration.',
                  },
                  {
                    title: 'Bushfire Damage Restoration',
                    href: '/services/bushfire-damage-restoration',
                    desc: 'Specialist bushfire recovery for the Adelaide Hills, Kangaroo Island and peninsula regions — smoke, soot and structural restoration.',
                  },
                  {
                    title: 'Flood Damage Restoration',
                    href: '/services/flood-damage-restoration',
                    desc: 'Flood recovery across the Riverland, Murraylands and coastal SA flood-affected areas.',
                  },
                  {
                    title: 'Water Damage Restoration',
                    href: '/services/water-damage-restoration',
                    desc: '24/7 water extraction, structural drying and full restoration for burst pipes, roof leaks and water intrusion.',
                  },
                  {
                    title: 'Mould Remediation',
                    href: '/services/mould-remediation',
                    desc: 'IICRC-certified mould assessment, containment and remediation for post-flood and post-storm SA properties.',
                  },
                  {
                    title: 'Commercial Services',
                    href: '/services/commercial-services',
                    desc: 'Large-scale disaster recovery for SA businesses, commercial buildings and industrial facilities.',
                  },
                  {
                    title: 'Structural Drying',
                    href: '/services/structural-drying',
                    desc: 'Advanced dehumidification and drying systems for post-storm and post-flood SA properties.',
                  },
                  {
                    title: 'Emergency Response',
                    href: '/services/emergency-response',
                    desc: '24/7 emergency response across Adelaide metro and regional South Australia.',
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
            heading: 'SA Regions We Cover',
            body: (
              <>
                <p>Our certified contractor network operates across all South Australian regions:</p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Adelaide Metropolitan</strong> — All inner, middle and outer metro LGAs including the
                    Adelaide Hills interface zone
                  </li>
                  <li>
                    <strong>Adelaide Hills & Barossa</strong> — Bushfire interface zones, winery and rural residential
                    properties
                  </li>
                  <li>
                    <strong>Fleurieu Peninsula</strong> — Victor Harbor, Yankalilla, Alexandrina — coastal storm risk
                  </li>
                  <li>
                    <strong>Kangaroo Island</strong> — Post-bushfire recovery and ongoing storm damage
                  </li>
                  <li>
                    <strong>Riverland & Murraylands</strong> — Murray River flood plains, Renmark, Berri, Murray Bridge
                  </li>
                  <li>
                    <strong>Yorke & Eyre Peninsulas</strong> — Agricultural and coastal areas, bushfire risk
                  </li>
                  <li>
                    <strong>South East SA</strong> — Mount Gambier, Naracoorte, Bordertown
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Insurance Claims Support in South Australia',
            background: 'light',
            body: (
              <>
                <p>
                  Our contractors provide all documentation required for SA insurance claims including storm, hail,
                  bushfire and flood damage. We produce IICRC-standard scope of works, photographic evidence, and
                  moisture mapping reports accepted by all major Australian insurers.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Disaster Recovery is an independent restoration network — we work on behalf of property owners,
                  not insurers. Our role is to restore your property to its pre-loss condition using certified
                  materials and methods.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link
                    href="/claim"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 2rem',
                      background: '#4338CA',
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
            question: 'Do you cover hail damage to roofs in Adelaide?',
            answer:
              'Yes. Hail damage to roofs, skylights, gutters and external cladding is a common event across Adelaide metro. Our certified contractors provide emergency tarping, damage assessment and full restoration, including insurance documentation for hail damage claims.',
          },
          {
            question: 'Can you help with Kangaroo Island bushfire recovery?',
            answer:
              'Yes. Kangaroo Island is a priority coverage zone given its significant bushfire history. Our contractors handle smoke and soot remediation, structural assessment, char removal, contents cleaning and full rebuilds for island properties.',
          },
          {
            question: 'How does Recovery SA financial assistance work?',
            answer:
              'Recovery SA administers financial assistance for SA residents and businesses in declared disaster areas, including grants for emergency accommodation, essential repairs and clean-up. Visit recovery.sa.gov.au for current declared areas and eligibility criteria.',
          },
          {
            question: 'What is the fastest way to get a contractor to my SA property?',
            answer:
              'Submit your claim via our online form at /claim. This is the fastest way to connect with an available certified contractor in your area. Our dispatch team coordinates contractor deployment based on urgency and location.',
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration' },
          { title: 'Bushfire Damage Restoration', href: '/services/bushfire-damage-restoration' },
          { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration' },
          { title: 'All Services', href: '/services' },
        ]}
      />
    </>
  );
}
