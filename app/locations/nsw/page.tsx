import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery New South Wales | 24/7 Emergency Services | Sydney & All Cities',
  description: 'Leading disaster recovery services across New South Wales. Emergency response for Bushfires, Flooding, Storms, Coastal Erosion. Serving Sydney, Newcastle, Wollongong, Central Coast and all NSW regions. Call Online Form Available 24/7.',
  keywords: [
    'disaster recovery New South Wales',
    'emergency services Sydney',
    'bushfires cleanup NSW',
    'water damage New South Wales',
    'fire damage restoration Sydney',
    ...['Sydney', 'Melbourne', 'Brisbane'].map((city: string) => `${city.toLowerCase()} disaster recovery`),
    'insurance restoration New South Wales',
    '24/7 emergency NSW'
  ]
};

export default function NewSouthWalesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery New South Wales',
        subtitle: '24/7 Emergency Services in New South Wales',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'New South Wales' },
      ]}
      sections={getLocationSections({ city: 'New South Wales', state: 'NSW' })}
      relatedPages={getRelatedPages('location-sydney')}
    />
  );
}
