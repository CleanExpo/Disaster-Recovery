import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery South | 24/7 Emergency Services',
  description: 'Leading disaster recovery services across South Australia. Emergency response for Bushfires, Heatwaves, Flooding, Severe Storms. Serving Adelaide, Mount Gambier, Whyalla, Murray Bridge and all SA regions. Call Online Form Available 24/7.',
  keywords: [
    'disaster recovery South Australia',
    'emergency services Adelaide',
    'bushfires cleanup SA',
    'water damage South Australia',
    'fire damage restoration Adelaide',
    ...['Sydney', 'Melbourne', 'Brisbane'].map((city: string) => `${city.toLowerCase()} disaster recovery`),
    'insurance restoration South Australia',
    '24/7 emergency SA'
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/sa',
  },
};

export default function SouthAustraliaPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery South Australia',
        subtitle: '24/7 Emergency Services in South Australia',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'South Australia' },
      ]}
      sections={getLocationSections({ city: 'South Australia', state: 'SA' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
