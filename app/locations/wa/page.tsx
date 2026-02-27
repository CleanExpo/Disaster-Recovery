import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Western Australia | 24/7 Emergency Services | Perth & All Cities',
  description: 'Leading disaster recovery services across Western Australia. Emergency response for Bushfires, Cyclones, Flooding, Severe Storms. Serving Perth, Fremantle, Mandurah, Bunbury and all WA regions. Call Online Form Available 24/7.',
  keywords: [
    'disaster recovery Western Australia',
    'emergency services Perth',
    'bushfires cleanup WA',
    'water damage Western Australia',
    'fire damage restoration Perth',
    ...['Sydney', 'Melbourne', 'Brisbane'].map((city: string) => `${city.toLowerCase()} disaster recovery`),
    'insurance restoration Western Australia',
    '24/7 emergency WA'
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/wa',
  },
};

export default function WesternAustraliaPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Western Australia',
        subtitle: '24/7 Emergency Services in Western Australia',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'Western Australia' },
      ]}
      sections={getLocationSections({ city: 'Western Australia', state: 'WA' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
