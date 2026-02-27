import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Northern Territory | 24/7 Emergency Services | Darwin & All Cities',
  description: 'Leading disaster recovery services across Northern Territory. Emergency response for Cyclones, Flooding, Bushfires, Extreme Heat. Serving Darwin, Palmerston, Alice Springs, Katherine and all NT regions. Call Online Form Available 24/7.',
  keywords: [
    'disaster recovery Northern Territory',
    'emergency services Darwin',
    'cyclones cleanup NT',
    'water damage Northern Territory',
    'fire damage restoration Darwin',
    ...['Sydney', 'Melbourne', 'Brisbane'].map((city: string) => `${city.toLowerCase()} disaster recovery`),
    'insurance restoration Northern Territory',
    '24/7 emergency NT'
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/nt',
  },
};

export default function NorthernTerritoryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Northern Territory',
        subtitle: '24/7 Emergency Services in Northern Territory',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'Northern Territory' },
      ]}
      sections={getLocationSections({ city: 'Northern Territory', state: 'NT' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
