import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin, AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery WA | 24/7 Emergency Services Western Australia',
  description:
    'IICRC-certified disaster recovery across Western Australia. Cyclone, bushfire, storm and water damage restoration in Perth, Bunbury, Geraldton and all WA regions. Lodge a claim online 24/7.',
  keywords: [
    'disaster recovery Western Australia',
    'emergency cyclone restoration WA',
    'bushfire damage repair Perth',
    'storm damage restoration Western Australia',
    'water damage Perth',
    'mould remediation WA',
    'insurance claim restoration Western Australia',
    'IICRC certified WA',
    'Cyclone Narelle recovery',
    '24/7 emergency disaster recovery WA',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/wa',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://disasterrecovery.com.au/locations/wa/#localbusiness',
  name: 'Disaster Recovery — Western Australia',
  url: 'https://disasterrecovery.com.au/locations/wa',
  description:
    '24/7 emergency disaster recovery across Western Australia. IICRC-certified contractor network for cyclone, bushfire, storm, and water damage restoration.',
  priceRange: '$$',
  areaServed: [
    {
      '@type': 'City',
      name: 'Perth',
      containedInPlace: { '@type': 'State', name: 'Western Australia' },
    },
    {
      '@type': 'City',
      name: 'Armadale',
      containedInPlace: { '@type': 'State', name: 'Western Australia' },
    },
    {
      '@type': 'City',
      name: 'Bunbury',
      containedInPlace: { '@type': 'State', name: 'Western Australia' },
    },
    {
      '@type': 'City',
      name: 'Fremantle',
      containedInPlace: { '@type': 'State', name: 'Western Australia' },
    },
    {
      '@type': 'City',
      name: 'Joondalup',
      containedInPlace: { '@type': 'State', name: 'Western Australia' },
    },
    {
      '@type': 'City',
      name: 'Mandurah',
      containedInPlace: { '@type': 'State', name: 'Western Australia' },
    },
    {
      '@type': 'City',
      name: 'Midland',
      containedInPlace: { '@type': 'State', name: 'Western Australia' },
    },
    {
      '@type': 'City',
      name: 'Rockingham',
      containedInPlace: { '@type': 'State', name: 'Western Australia' },
    },
  ],
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
};

const WA_CITIES = [
  { name: 'Perth', href: '/locations/perth' },
  { name: 'Armadale', href: '/locations/wa/armadale' },
  { name: 'Bunbury', href: '/locations/wa/bunbury' },
  { name: 'Fremantle', href: '/locations/wa/fremantle' },
  { name: 'Joondalup', href: '/locations/wa/joondalup' },
  { name: 'Mandurah', href: '/locations/wa/mandurah' },
  { name: 'Midland', href: '/locations/wa/midland' },
  { name: 'Rockingham', href: '/locations/wa/rockingham' },
];

const WA_EVENTS = [
  {
    label: 'Cyclone Narelle — WA 2026',
    href: '/events/cyclone-narelle-western-australia-2026',
    desc: 'Active recovery operations for properties affected by TC Narelle across Western Australia.',
  },
  {
    label: 'Cyclone Narelle — Event Hub',
    href: '/events/cyclone-narelle-wa',
    desc: 'Claim support, contractor dispatch, and insurance guidance for TC Narelle damage.',
  },
];

const sections = [
  {
    heading: 'Western Australia Disaster Risks',
    body: (
      <div>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          Western Australia spans a vast geographic range from the tropical cyclone belt of the
          Pilbara and Kimberley to the fire-prone south-west. Tropical cyclones tracking south along
          the WA coast are the state&apos;s highest-consequence disaster type, capable of delivering
          storm surge, 200+ km/h winds, and days of intense rainfall. The Perth metropolitan area is
          exposed to severe thunderstorm events, bushfire from the Darling Scarp, and occasional
          flash flooding in low-lying suburbs.
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
          <li>Tropical cyclone wind damage and storm surge — Pilbara, Kimberley, and coastal WA</li>
          <li>Bushfire and ember attack — Perth Hills, South West, and Wheatbelt regions</li>
          <li>Severe storm cells and hail — Perth metropolitan area</li>
          <li>Flash flooding — Armadale, Midland, and low-lying metropolitan suburbs</li>
          <li>Extreme heat events driving mould and timber damage</li>
        </ul>
      </div>
    ),
  },
  {
    heading: 'Active Disaster Events in WA',
    background: 'light' as const,
    body: (
      <div>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
          The following declared events have active recovery operations in Western Australia. If
          your property was affected, lodge a claim through the event page for priority dispatch.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {WA_EVENTS.map((ev) => (
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
    heading: 'WA Service Areas',
    body: (
      <div>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
          IICRC-certified contractors operate across the Perth metropolitan area and regional WA
          centres. Select your city for local service availability and suburb-level coverage.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '0.75rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          {WA_CITIES.map((city) => (
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
    heading: 'What to Do After a WA Disaster',
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
            <strong>Contact your insurer</strong> to notify them. Do not accept a cash settlement
            before a full assessment.
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
          For cyclone damage in WA, the ARPC Cyclone Reinsurance Pool applies. Your insurer is
          required to pass pool premium savings to policyholders in cyclone-exposed regions. IICRC
          S220 governs structural drying following cyclone damage.
        </p>
      </div>
    ),
  },
];

export default function WesternAustraliaPage() {
  return (
    <>
      <Script
        id="wa-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery — Western Australia',
          subtitle: '24/7 emergency restoration across WA. Cyclone, fire, flood, storm.',
        }}
        cta={{ text: 'Lodge a Claim', href: '/claim' }}
        secondaryCta={{ text: 'View Active Events', href: '#events' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Western Australia' },
        ]}
        stats={[
          { value: '8', label: 'WA service cities' },
          { value: '24/7', label: 'Emergency response' },
          { value: 'IICRC', label: 'Certified network' },
          { value: '2', label: 'Active disaster events' },
        ]}
        sections={sections}
        relatedPages={[
          {
            title: 'Cyclone Damage Restoration',
            href: '/services/cyclone-damage-restoration',
            description: 'Structural drying and reinstatement for cyclone-affected properties.',
          },
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
