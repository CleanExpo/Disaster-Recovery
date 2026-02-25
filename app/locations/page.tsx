import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Service Locations | Disaster Recovery Australia-Wide',
  description: 'Find disaster recovery services across all Australian states and territories. 24/7 emergency response nationwide.',
};

export default function LocationsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Service Locations',
        subtitle: 'Find disaster recovery services across all Australian states and territories',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations' },
      ]}
      sections={[
        {
          heading: 'Browse by State & Territory',
          body: (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'New South Wales', href: '/locations/nsw' },
                { name: 'Victoria', href: '/locations/vic' },
                { name: 'Queensland', href: '/locations/qld' },
                { name: 'Western Australia', href: '/locations/wa' },
                { name: 'South Australia', href: '/locations/sa' },
                { name: 'Tasmania', href: '/locations/tas' },
                { name: 'Northern Territory', href: '/locations/nt' },
                { name: 'Australian Capital Territory', href: '/locations/act' },
              ].map((loc) => (
                <Link key={loc.href} href={loc.href} style={{ display: 'block', padding: '1rem', background: 'white', borderRadius: '0.75rem', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.08)', fontWeight: 600, color: 'var(--ag-primary-blue, #0052CC)' }}>
                  {loc.name}
                </Link>
              ))}
            </div>
          ),
        },
        {
          heading: 'Browse by Major City',
          body: (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Sydney', href: '/locations/sydney' },
                { name: 'Melbourne', href: '/locations/melbourne' },
                { name: 'Brisbane', href: '/locations/brisbane' },
                { name: 'Perth', href: '/locations/perth' },
                { name: 'Adelaide', href: '/locations/adelaide' },
                { name: 'Gold Coast', href: '/locations/gold-coast' },
                { name: 'Newcastle', href: '/locations/newcastle' },
                { name: 'Auckland (NZ)', href: '/locations/auckland' },
              ].map((loc) => (
                <Link key={loc.href} href={loc.href} style={{ display: 'block', padding: '1rem', background: 'white', borderRadius: '0.75rem', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.08)', fontWeight: 600, color: 'var(--ag-primary-blue, #0052CC)' }}>
                  {loc.name}
                </Link>
              ))}
            </div>
          ),
        },
        ...getLocationSections({ city: 'Australia', state: 'National' }),
      ]}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
