import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Tasmania | 24/7 Emergency Services',
  description: 'Leading disaster recovery services across Tasmania. Emergency response for Bushfires, Flooding, Severe Storms, Landslides. Serving Hobart, Launceston, Devonport, Burnie and all TAS regions. Call Online Form Available 24/7.',
  keywords: [
    'disaster recovery Tasmania',
    'emergency services Hobart',
    'bushfires cleanup TAS',
    'water damage Tasmania',
    'fire damage restoration Hobart',
    ...['Sydney', 'Melbourne', 'Brisbane'].map((city: string) => `${city.toLowerCase()} disaster recovery`),
    'insurance restoration Tasmania',
    '24/7 emergency TAS'
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/tas',
  },
};

export default function TasmaniaPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Tasmania',
        subtitle: '24/7 Emergency Services in Tasmania',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'Tasmania' },
      ]}
      sections={getLocationSections({ city: 'Tasmania', state: 'TAS' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
