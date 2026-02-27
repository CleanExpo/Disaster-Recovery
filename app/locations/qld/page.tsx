import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Queensland | 24/7 Emergency Services',
  description: 'Leading disaster recovery services across Queensland. Emergency response for Cyclones, Flooding, Severe Storms, Storm Surge. Serving Brisbane, Gold Coast, Sunshine Coast, Townsville and all QLD regions. Call Online Form Available 24/7.',
  keywords: [
    'disaster recovery Queensland',
    'emergency services Brisbane',
    'cyclones cleanup QLD',
    'water damage Queensland',
    'fire damage restoration Brisbane',
    ...['Sydney', 'Melbourne', 'Brisbane'].map((city: string) => `${city.toLowerCase()} disaster recovery`),
    'insurance restoration Queensland',
    '24/7 emergency QLD'
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/qld',
  },
};

export default function QueenslandPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Queensland',
        subtitle: '24/7 Emergency Services in Queensland',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'Queensland' },
      ]}
      sections={getLocationSections({ city: 'Queensland', state: 'QLD' })}
      relatedPages={getRelatedPages('location-brisbane')}
    />
  );
}
