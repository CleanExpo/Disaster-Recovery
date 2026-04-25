import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery NSW | 24/7 Emergency Services New South Wales',
  description:
    'IICRC-certified disaster recovery across New South Wales. Flood, storm, fire and water damage restoration in Sydney, Newcastle, Wollongong and all NSW regions. Lodge a claim online 24/7.',
  keywords: [
    'disaster recovery NSW',
    'emergency flood restoration New South Wales',
    'storm damage repair Sydney',
    'water damage restoration Newcastle',
    'fire damage Wollongong',
    'mould remediation NSW',
    'insurance claim restoration New South Wales',
    'IICRC certified NSW',
    '24/7 emergency disaster recovery NSW',
    'bushfire restoration New South Wales',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/nsw',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://disasterrecovery.com.au/locations/nsw/#localbusiness',
  name: 'Disaster Recovery — New South Wales',
  url: 'https://disasterrecovery.com.au/locations/nsw',
  description:
    '24/7 emergency disaster recovery across New South Wales. IICRC-certified contractor network for flood, storm, fire, and mould restoration.',
  priceRange: '$$',
  areaServed: [
    {
      '@type': 'City',
      name: 'Sydney',
      containedInPlace: { '@type': 'State', name: 'New South Wales' },
    },
    {
      '@type': 'City',
      name: 'Newcastle',
      containedInPlace: { '@type': 'State', name: 'New South Wales' },
    },
    {
      '@type': 'City',
      name: 'Wollongong',
      containedInPlace: { '@type': 'State', name: 'New South Wales' },
    },
    {
      '@type': 'City',
      name: 'Blacktown',
      containedInPlace: { '@type': 'State', name: 'New South Wales' },
    },
    {
      '@type': 'City',
      name: 'Central Coast',
      containedInPlace: { '@type': 'State', name: 'New South Wales' },
    },
    {
      '@type': 'City',
      name: 'Liverpool',
      containedInPlace: { '@type': 'State', name: 'New South Wales' },
    },
    {
      '@type': 'City',
      name: 'Parramatta',
      containedInPlace: { '@type': 'State', name: 'New South Wales' },
    },
    {
      '@type': 'City',
      name: 'Penrith',
      containedInPlace: { '@type': 'State', name: 'New South Wales' },
    },
  ],
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
};

const NSW_CITIES = [
  { name: 'Sydney', href: '/locations/sydney' },
  { name: 'Newcastle', href: '/locations/nsw/newcastle' },
  { name: 'Wollongong', href: '/locations/nsw/wollongong' },
  { name: 'Blacktown', href: '/locations/nsw/blacktown' },
  { name: 'Central Coast', href: '/locations/nsw/central-coast' },
  { name: 'Liverpool', href: '/locations/nsw/liverpool' },
  { name: 'Parramatta', href: '/locations/nsw/parramatta' },
  { name: 'Penrith', href: '/locations/nsw/penrith' },
];

const sections = [
  {
    heading: 'New South Wales Disaster Risks',
    body: (
      <div>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          New South Wales faces a diverse and high-frequency disaster profile. The Greater Sydney
          basin experiences severe storm cells between October and March, generating flash flooding,
          hail damage, and lightning strike. Coastal low-pressure systems drive intense rainfall
          across the Illawarra and Hunter regions. Western and northern NSW carries significant
          bushfire risk, with ember attack the primary cause of structural losses.
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
          <li>Severe storm cells and hail — particularly Greater Sydney and Hunter regions</li>
          <li>Flash flooding — low-lying suburbs in Penrith, Liverpool, and Blacktown</li>
          <li>
            Bushfire and ember attack — Blue Mountains, Northern Tablelands, and western districts
          </li>
          <li>Riverine flooding — Hunter Valley, Hawkesbury, and Macquarie floodplains</li>
          <li>Coastal erosion and storm surge — Illawarra and Central Coast</li>
        </ul>
      </div>
    ),
  },
  {
    heading: 'Emergency Assistance in NSW',
    background: 'light' as const,
    body: (
      <div>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          Following declared disaster events in New South Wales, government assistance programs
          operate through the NSW Reconstruction Authority and the Commonwealth Disaster Recovery
          Allowance scheme.
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
              NSW Reconstruction Authority Grants
            </strong>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              Financial assistance for structural repairs, temporary accommodation, and essential
              household items for NSW residents in declared disaster zones.
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
              Disaster Recovery Allowance
            </strong>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              Commonwealth short-term income support for residents and businesses whose income has
              been directly affected by a declared disaster.
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
              Insurance Dispute Support
            </strong>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              If your insurer has denied or underpaid your NSW claim, the Australian Financial
              Complaints Authority (AFCA) provides free external dispute resolution.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    heading: 'NSW Service Areas',
    body: (
      <div>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
          IICRC-certified contractors cover all major NSW population centres. Select your city for
          local service availability and suburb-level coverage maps.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '0.75rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          {NSW_CITIES.map((city) => (
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
    heading: 'What to Do After a NSW Disaster',
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
            settlement before a full assessment.
          </li>
          <li>
            <strong>Prevent further damage</strong> only as safe — keep all receipts as these costs
            are claimable.
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
          For water intrusion events, IICRC S500:2025 governs water damage restoration. For mould
          resulting from flooding or storm, IICRC S520:2025 applies. All contractors in the network
          hold current certifications to these standards.
        </p>
      </div>
    ),
  },
];

export default function NewSouthWalesPage() {
  return (
    <>
      <Script
        id="nsw-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery — New South Wales',
          subtitle: '24/7 emergency restoration across NSW. Flood, storm, fire, mould.',
        }}
        cta={{ text: 'Lodge a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'New South Wales' },
        ]}
        stats={[
          { value: '8', label: 'NSW service cities' },
          { value: '24/7', label: 'Emergency response' },
          { value: 'IICRC', label: 'Certified network' },
          { value: 'S500', label: 'Water damage standard' },
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
            title: 'Bushfire Restoration',
            href: '/services/fire-damage-restoration',
            description: 'Smoke, soot, and structural fire damage assessment and restoration.',
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
