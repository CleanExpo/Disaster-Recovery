import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin, AlertTriangle, Phone } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery Queensland | 24/7 Emergency Services QLD',
  description:
    'IICRC-certified disaster recovery across Queensland. Cyclone, flood, fire and storm damage restoration in Brisbane, Gold Coast, Townsville, Cairns and all QLD regions. Lodge a claim online 24/7.',
  keywords: [
    'disaster recovery Queensland',
    'emergency flood restoration QLD',
    'cyclone damage repair Queensland',
    'water damage Brisbane',
    'storm restoration Gold Coast',
    'mould remediation Townsville',
    'fire damage Cairns',
    'insurance claim restoration QLD',
    'IICRC certified Queensland',
    '24/7 emergency disaster recovery',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/qld',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://disasterrecovery.com.au/locations/qld/#localbusiness',
  name: 'Disaster Recovery — Queensland',
  url: 'https://disasterrecovery.com.au/locations/qld',
  description:
    '24/7 emergency disaster recovery across Queensland. IICRC-certified contractor network for cyclone, flood, fire, storm and mould restoration.',
  priceRange: '$$',
  areaServed: [
    {
      '@type': 'City',
      name: 'Brisbane',
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    },
    {
      '@type': 'City',
      name: 'Gold Coast',
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    },
    {
      '@type': 'City',
      name: 'Sunshine Coast',
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    },
    {
      '@type': 'City',
      name: 'Townsville',
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    },
    { '@type': 'City', name: 'Cairns', containedInPlace: { '@type': 'State', name: 'Queensland' } },
    { '@type': 'City', name: 'Mackay', containedInPlace: { '@type': 'State', name: 'Queensland' } },
    {
      '@type': 'City',
      name: 'Rockhampton',
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    },
    {
      '@type': 'City',
      name: 'Toowoomba',
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    },
  ],
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
};

const QLD_CITIES = [
  { name: 'Brisbane', href: '/locations/brisbane' },
  { name: 'Gold Coast', href: '/locations/qld/gold-coast' },
  { name: 'Sunshine Coast', href: '/locations/qld/sunshine-coast' },
  { name: 'Townsville', href: '/locations/qld/townsville' },
  { name: 'Cairns', href: '/locations/qld/cairns' },
  { name: 'Mackay', href: '/locations/qld/mackay' },
  { name: 'Rockhampton', href: '/locations/qld/rockhampton' },
  { name: 'Toowoomba', href: '/locations/qld/toowoomba' },
];

const QLD_EVENTS = [
  {
    label: 'TC Alfred — FNQ 2026',
    href: '/events/cyclone-alfred-fnq-2026',
    desc: 'Active recovery support for cyclone-affected Far North Queensland properties.',
  },
  {
    label: 'TC Maila — FNQ 2026',
    href: '/events/tc-maila-fnq-2026',
    desc: 'Claim support and contractor dispatch for TC Maila-affected properties.',
  },
  {
    label: 'TC Maila — Queensland 2026',
    href: '/events/cyclone-maila-queensland-2026',
    desc: 'Statewide recovery operations for TC Maila damage claims.',
  },
  {
    label: 'Queensland Floods 2026',
    href: '/events/queensland-floods-2026',
    desc: 'Flood damage assessment and restoration for the 2026 QLD flood event.',
  },
  {
    label: 'Queensland Floods 2025',
    href: '/events/queensland-floods-2025',
    desc: 'Ongoing restoration support for properties damaged in the 2025 flooding.',
  },
];

const sections = [
  {
    heading: 'Queensland Disaster Risks',
    body: (
      <div>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          Queensland carries the highest annual disaster risk profile of any Australian state. The
          tropical north faces cyclone season from November through April, bringing sustained winds,
          storm surge, and rainfall events that can exceed 600mm in 24 hours. South-east Queensland
          experiences severe storm cells, flash flooding, and hail damage year-round. Elevated
          humidity drives mould growth within 24–48 hours of a water intrusion event — faster than
          in any other state.
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
          <li>Cyclone wind and storm surge damage (Cat 1–5)</li>
          <li>Tropical and flash flooding — including sewage-contaminated Category 3 water</li>
          <li>Severe storm cells, lightning strike, and hail</li>
          <li>Rapid mould growth in subtropical and tropical conditions</li>
          <li>Bushfire and ember attack in western and southern QLD</li>
        </ul>
      </div>
    ),
  },
  {
    heading: 'Government Assistance — Active Programs',
    background: 'light' as const,
    body: (
      <div>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          Following declared disaster events in Queensland, several government assistance programs
          may be available to affected homeowners and renters. These are administered through the
          Queensland Reconstruction Authority (QRA) and the Commonwealth Disaster Recovery Allowance
          scheme.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <strong
              style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--ag-primary-blue)' }}
            >
              Personal Hardship Assistance
            </strong>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              QRA grants for essential household items, temporary accommodation, and structural
              repairs. Applications for recent events close 27 April 2026.
            </p>
          </div>
          <div
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <strong
              style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--ag-primary-blue)' }}
            >
              Structural Assistance Grants — up to $80,000
            </strong>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              Available for primary residences with major structural damage not fully covered by
              insurance. Requires damage assessment documentation.
            </p>
          </div>
          <div
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <strong
              style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--ag-primary-blue)' }}
            >
              ARPC Cyclone Reinsurance Pool
            </strong>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              The Australian Reinsurance Pool Corporation pool holds more than $1 billion in cyclone
              reinsurance capacity. Your insurer is required to pass premium savings to
              policyholders in QLD.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    heading: 'Active Disaster Events in Queensland',
    body: (
      <div>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
          The following declared events have active recovery operations. If your property was
          affected, lodge a claim through the event page for priority dispatch.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {QLD_EVENTS.map((ev) => (
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
    heading: 'Queensland Service Areas',
    background: 'light' as const,
    body: (
      <div>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
          Verified IICRC-certified contractors operate across all major Queensland population
          centres. Select your city below for local services, contractor availability, and
          suburb-level coverage.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '0.75rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          {QLD_CITIES.map((city) => (
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
    heading: 'What to Do After a Queensland Disaster',
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
            <strong>Document all damage</strong> before any clean-up — photos and video, including
            hidden areas like roof cavities and subfloor.
          </li>
          <li>
            <strong>Contact your insurer</strong> to notify them of the event — but do not accept a
            cash settlement until damage is fully assessed.
          </li>
          <li>
            <strong>Prevent further damage</strong> only as far as is safe — temporary roof tarps,
            water extraction — keep all receipts for these costs as they are claimable.
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
          For cyclone damage, IICRC S220 standards apply to structural drying. For water intrusion,
          IICRC S500:2025 governs water damage restoration. Contractors in the NRPG network are
          certified to the latest published standards.
        </p>
      </div>
    ),
  },
];

export default function QueenslandPage() {
  return (
    <>
      <Script
        id="qld-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery — Queensland',
          subtitle: '24/7 emergency restoration across QLD. Cyclone, flood, fire, storm.',
        }}
        cta={{ text: 'Lodge a Claim', href: '/claim' }}
        secondaryCta={{ text: 'View Active Events', href: '#events' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Queensland' },
        ]}
        stats={[
          { value: '8', label: 'QLD service cities' },
          { value: '24/7', label: 'Emergency response' },
          { value: 'IICRC', label: 'Certified network' },
          { value: '5', label: 'Active disaster events' },
        ]}
        sections={sections}
        relatedPages={[
          {
            title: 'Water Damage Restoration',
            href: '/services/water-damage-restoration',
            description: 'IICRC S500:2025 compliant water extraction and structural drying.',
          },
          {
            title: 'Storm Damage Repair',
            href: '/services/storm-damage-repair',
            description: 'Emergency tarping, debris removal, and full reinstatement.',
          },
          {
            title: 'Mould Remediation',
            href: '/services/mould-remediation',
            description: 'IICRC S520:2025 certified mould assessment and removal.',
          },
          {
            title: 'Cyclone Damage Restoration',
            href: '/services/cyclone-damage-restoration',
            description: 'Structural drying and reinstatement for cyclone-affected properties.',
          },
          {
            title: 'Lodge a Claim',
            href: '/claim',
            description: 'Start your insurance claim in under 90 seconds.',
          },
          {
            title: 'How Claims Work',
            href: '/guides/how-insurance-claims-work-australia',
            description:
              'Step-by-step guide to lodging and managing a property insurance claim in Australia.',
          },
        ]}
      />
    </>
  );
}
