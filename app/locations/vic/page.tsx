import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin, AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery Victoria | 24/7 Emergency Services VIC',
  description:
    'IICRC-certified disaster recovery across Victoria. Bushfire, storm, flood and water damage restoration in Melbourne, Geelong, Ballarat and all VIC regions. Lodge a claim online 24/7.',
  keywords: [
    'disaster recovery Victoria',
    'bushfire damage repair Melbourne',
    'storm damage restoration Victoria',
    'flood restoration Geelong',
    'water damage Ballarat',
    'mould remediation VIC',
    'insurance claim restoration Victoria',
    'IICRC certified Victoria',
    'Victoria bushfire 2025 2026 recovery',
    '24/7 emergency disaster recovery VIC',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/vic',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://disasterrecovery.com.au/locations/vic/#localbusiness',
  name: 'Disaster Recovery — Victoria',
  url: 'https://disasterrecovery.com.au/locations/vic',
  description:
    '24/7 emergency disaster recovery across Victoria. IICRC-certified contractor network for bushfire, storm, flood, and water damage restoration.',
  priceRange: '$$',
  areaServed: [
    {
      '@type': 'City',
      name: 'Melbourne',
      containedInPlace: { '@type': 'State', name: 'Victoria' },
    },
    { '@type': 'City', name: 'Geelong', containedInPlace: { '@type': 'State', name: 'Victoria' } },
    { '@type': 'City', name: 'Ballarat', containedInPlace: { '@type': 'State', name: 'Victoria' } },
    { '@type': 'City', name: 'Bendigo', containedInPlace: { '@type': 'State', name: 'Victoria' } },
    {
      '@type': 'City',
      name: 'Cranbourne',
      containedInPlace: { '@type': 'State', name: 'Victoria' },
    },
    {
      '@type': 'City',
      name: 'Dandenong',
      containedInPlace: { '@type': 'State', name: 'Victoria' },
    },
    {
      '@type': 'City',
      name: 'Frankston',
      containedInPlace: { '@type': 'State', name: 'Victoria' },
    },
    {
      '@type': 'City',
      name: 'Shepparton',
      containedInPlace: { '@type': 'State', name: 'Victoria' },
    },
  ],
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
};

const VIC_CITIES = [
  { name: 'Melbourne', href: '/locations/melbourne' },
  { name: 'Geelong', href: '/locations/vic/geelong' },
  { name: 'Ballarat', href: '/locations/vic/ballarat' },
  { name: 'Bendigo', href: '/locations/vic/bendigo' },
  { name: 'Cranbourne', href: '/locations/vic/cranbourne' },
  { name: 'Dandenong', href: '/locations/vic/dandenong' },
  { name: 'Frankston', href: '/locations/vic/frankston' },
  { name: 'Shepparton', href: '/locations/vic/shepparton' },
];

const VIC_EVENTS = [
  {
    label: 'Victoria Bushfires 2026',
    href: '/events/victoria-bushfires-2026',
    desc: 'Active recovery operations for properties affected by the 2026 Victorian bushfire season.',
  },
  {
    label: 'Victoria Bushfires 2025',
    href: '/events/victoria-bushfires-2025',
    desc: 'Ongoing restoration support for properties damaged in the 2025 Victorian bushfire events.',
  },
];

const sections = [
  {
    heading: 'Victoria Disaster Risks',
    body: (
      <div>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          Victoria&apos;s disaster profile is dominated by bushfire, severe storm, and flooding. The
          state experiences some of Australia&apos;s most intense fire weather conditions, with the
          south-east, Grampians, and ranges consistently rated extreme fire danger during summer.
          Melbourne and Geelong are exposed to rapid-onset severe storms capable of generating hail,
          damaging winds, and flash flooding in low-lying suburbs. Riverine flooding affects
          Shepparton, Bendigo, and Ballarat after sustained rainfall.
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
          <li>
            Bushfire and ember attack — Dandenong Ranges, Yarra Valley, Grampians, and East
            Gippsland
          </li>
          <li>Severe storm cells, hail, and damaging winds — Melbourne metropolitan area</li>
          <li>Flash flooding — inner Melbourne, Dandenong, and Frankston low-lying areas</li>
          <li>Riverine flooding — Goulburn, Murray, and Loddon floodplains</li>
          <li>Extreme heat events and post-fire erosion</li>
        </ul>
      </div>
    ),
  },
  {
    heading: 'Active Disaster Events in Victoria',
    background: 'light' as const,
    body: (
      <div>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
          The following declared events have active recovery operations in Victoria. If your
          property was affected, lodge a claim through the event page for priority dispatch.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {VIC_EVENTS.map((ev) => (
            <Link
              key={ev.href}
              href={ev.href}
              style={{
                display: 'block',
                padding: '1.25rem',
                background: '#fff8f0',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                border: '1px solid rgba(220, 80, 20, 0.15)',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 700,
                  color: '#c0390a',
                  marginBottom: '0.4rem',
                }}
              >
                <AlertTriangle style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
                {ev.label}
              </span>
              <span
                style={{ fontSize: '0.875rem', color: 'var(--ag-text-muted)', lineHeight: 1.5 }}
              >
                {ev.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    ),
  },
  {
    heading: 'Victoria Service Areas',
    body: (
      <div>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
          IICRC-certified contractors operate across the Melbourne metropolitan area and key
          regional Victorian centres. Select your city for local availability and suburb coverage.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '0.75rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          {VIC_CITIES.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 1.25rem',
                background: 'white',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: 600,
                color: 'var(--ag-primary-blue)',
                border: '1px solid rgba(0,0,0,0.07)',
                fontSize: '0.95rem',
              }}
            >
              <MapPin style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    ),
  },
  {
    heading: 'What to Do After a Victorian Disaster',
    background: 'light' as const,
    body: (
      <div>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: 2.2 }}>
          <li>
            <strong>Call 000</strong> if there is immediate risk to life or the property is
            structurally unsafe.
          </li>
          <li>
            <strong>Lodge a claim</strong> through this platform — takes under 90 seconds on mobile.
          </li>
          <li>
            <strong>Document all damage</strong> before any clean-up — photos, video, and written
            notes.
          </li>
          <li>
            <strong>Contact your insurer</strong> to notify them of the event. Do not accept a cash
            settlement before a full independent assessment.
          </li>
          <li>
            <strong>Prevent further damage</strong> only as safe — temporary tarps, water
            extraction. Keep all receipts as these costs are claimable.
          </li>
          <li>
            <strong>Do not dispose</strong> of damaged items until the insurer or loss assessor has
            inspected them.
          </li>
        </ol>
        <p
          style={{
            marginTop: '1rem',
            lineHeight: 1.8,
            padding: '1rem',
            background: '#f0f7ff',
            borderRadius: '0.5rem',
            borderLeft: '4px solid var(--ag-primary-blue)',
          }}
        >
          For bushfire damage, IICRC S700:2025 governs smoke and soot remediation. For associated
          water damage from firefighting, IICRC S500:2025 applies. Contractors in the network hold
          certifications to both standards.
        </p>
      </div>
    ),
  },
];

export default function VictoriaPage() {
  return (
    <>
      <Script
        id="vic-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery — Victoria',
          subtitle: '24/7 emergency restoration across VIC. Bushfire, flood, storm, mould.',
        }}
        cta={{ text: 'Lodge a Claim', href: '/claim' }}
        secondaryCta={{ text: 'View Active Events', href: '#events' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Victoria' },
        ]}
        stats={[
          { value: '8', label: 'VIC service cities' },
          { value: '24/7', label: 'Emergency response' },
          { value: 'IICRC', label: 'Certified network' },
          { value: '2', label: 'Active disaster events' },
        ]}
        sections={sections}
        relatedPages={[
          {
            title: 'Bushfire Restoration',
            href: '/services/fire-damage-restoration',
            description: 'Smoke, soot, and structural fire damage assessment and restoration.',
          },
          {
            title: 'Storm Damage Repair',
            href: '/services/storm-damage-repair',
            description: 'Emergency tarping, debris removal, and full reinstatement.',
          },
          {
            title: 'Water Damage Restoration',
            href: '/services/water-damage-restoration',
            description: 'IICRC S500:2025 compliant water extraction and structural drying.',
          },
          {
            title: 'Mould Remediation',
            href: '/services/mould-remediation',
            description: 'IICRC S520:2025 certified mould assessment and removal.',
          },
          {
            title: 'Lodge a Claim',
            href: '/claim',
            description: 'Start your insurance claim in under 90 seconds.',
          },
          {
            title: 'How Claims Work',
            href: '/guides/how-insurance-claims-work-australia',
            description: 'Step-by-step guide to lodging and managing a property insurance claim.',
          },
        ]}
      />
    </>
  );
}
