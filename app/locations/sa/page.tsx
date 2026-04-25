import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disaster Recovery SA | 24/7 Emergency Services South Australia',
  description:
    'IICRC-certified disaster recovery across South Australia. Bushfire, storm, flood and water damage restoration in Adelaide, Mount Gambier, Port Augusta and all SA regions. Lodge a claim online 24/7.',
  keywords: [
    'disaster recovery South Australia',
    'bushfire damage repair Adelaide',
    'storm damage restoration South Australia',
    'flood restoration SA',
    'water damage Adelaide',
    'mould remediation South Australia',
    'insurance claim restoration SA',
    'IICRC certified South Australia',
    '24/7 emergency disaster recovery SA',
    'Eyre Peninsula bushfire recovery',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/sa',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://disasterrecovery.com.au/locations/sa/#localbusiness',
  name: 'Disaster Recovery — South Australia',
  url: 'https://disasterrecovery.com.au/locations/sa',
  description:
    '24/7 emergency disaster recovery across South Australia. IICRC-certified contractor network for bushfire, storm, flood, and water damage restoration.',
  priceRange: '$$',
  areaServed: [
    {
      '@type': 'City',
      name: 'Adelaide',
      containedInPlace: { '@type': 'State', name: 'South Australia' },
    },
    {
      '@type': 'City',
      name: 'Gawler',
      containedInPlace: { '@type': 'State', name: 'South Australia' },
    },
    {
      '@type': 'City',
      name: 'Mount Gambier',
      containedInPlace: { '@type': 'State', name: 'South Australia' },
    },
    {
      '@type': 'City',
      name: 'Murray Bridge',
      containedInPlace: { '@type': 'State', name: 'South Australia' },
    },
    {
      '@type': 'City',
      name: 'Port Augusta',
      containedInPlace: { '@type': 'State', name: 'South Australia' },
    },
    {
      '@type': 'City',
      name: 'Port Lincoln',
      containedInPlace: { '@type': 'State', name: 'South Australia' },
    },
    {
      '@type': 'City',
      name: 'Whyalla',
      containedInPlace: { '@type': 'State', name: 'South Australia' },
    },
  ],
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
};

const SA_CITIES = [
  { name: 'Adelaide', href: '/locations/adelaide' },
  { name: 'Gawler', href: '/locations/sa/gawler' },
  { name: 'Mount Gambier', href: '/locations/sa/mount-gambier' },
  { name: 'Murray Bridge', href: '/locations/sa/murray-bridge' },
  { name: 'Port Augusta', href: '/locations/sa/port-augusta' },
  { name: 'Port Lincoln', href: '/locations/sa/port-lincoln' },
  { name: 'Whyalla', href: '/locations/sa/whyalla' },
];

const sections = [
  {
    heading: 'South Australia Disaster Risks',
    body: (
      <div>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          South Australia faces a concentrated disaster risk profile anchored by bushfire, extreme
          heat, and storm damage. The Adelaide Hills and Mount Lofty Ranges carry high bushfire risk
          from November through March. The Eyre Peninsula and South East experience periodic
          flooding and storm surge. Adelaide itself is exposed to severe thunderstorm cells bringing
          hail, lightning, and short-duration flash flooding. Extended drought and heat conditions
          drive building movement, roof damage, and mould after even minor water intrusion.
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
          <li>
            Bushfire and ember attack — Adelaide Hills, Mount Lofty Ranges, and Eyre Peninsula
          </li>
          <li>Severe storm cells and hail — Adelaide metropolitan area</li>
          <li>Flash flooding — Gawler, northern suburbs, and low-lying metropolitan areas</li>
          <li>Riverine flooding — Murray River and Lower Lakes</li>
          <li>Extreme heat driving building movement and mould after water intrusion</li>
        </ul>
      </div>
    ),
  },
  {
    heading: 'Government Assistance — SA Disaster Programs',
    background: 'light' as const,
    body: (
      <div>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          Following declared disaster events in South Australia, assistance programs operate through
          the Department for Disaster and Emergency Services (DDES) and the Commonwealth Disaster
          Recovery Allowance scheme.
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
              SA Emergency Hardship Assistance
            </strong>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              Immediate financial assistance for essential needs including temporary accommodation,
              clothing, food, and medical items following a declared disaster event.
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
              Commonwealth short-term income support for SA residents and businesses whose income
              has been directly affected by a declared disaster event.
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
              If your insurer has denied or underpaid your SA claim, the Australian Financial
              Complaints Authority (AFCA) provides free external dispute resolution.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    heading: 'SA Service Areas',
    body: (
      <div>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>
          IICRC-certified contractors operate across metropolitan Adelaide and key regional SA
          centres. Select your city for local service availability and suburb-level coverage.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '0.75rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          {SA_CITIES.map((city) => (
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
    heading: 'What to Do After a South Australian Disaster',
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
            notes covering all affected areas.
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
          For bushfire damage, IICRC S700:2025 governs smoke and soot remediation. For water
          intrusion from firefighting or storm, IICRC S500:2025 applies. All network contractors
          hold current certifications to these standards.
        </p>
      </div>
    ),
  },
];

export default function SouthAustraliaPage() {
  return (
    <>
      <Script
        id="sa-localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery — South Australia',
          subtitle: '24/7 emergency restoration across SA. Bushfire, flood, storm, mould.',
        }}
        cta={{ text: 'Lodge a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'South Australia' },
        ]}
        stats={[
          { value: '7', label: 'SA service cities' },
          { value: '24/7', label: 'Emergency response' },
          { value: 'IICRC', label: 'Certified network' },
          { value: 'S700', label: 'Fire/smoke standard' },
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
