import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recoveryn Capital Territory | 24/7 Emergency Services | Canberra & All Cities',
  description: 'Leading disaster recovery services nationwiden Capital Territory. Emergency response for Bushfires, Storms, Hail, Frost Damage. Serving Canberra, Belconnen, Tuggeranong, Gungahlin and all ACT regions. Call Online Form Available 24/7.',
  keywords: [
    'disaster recovery Australian Capital Territory',
    'emergency services Canberra',
    'bushfires cleanup ACT',
    'water damage Australian Capital Territory',
    'fire damage restoration Canberra',
    ...['Sydney', 'Melbourne', 'Brisbane'].map((city: string) => `${city.toLowerCase()} disaster recovery`),
    'insurance restoration Australian Capital Territory',
    '24/7 emergency ACT'
  ]
};

export default function AustralianCapitalTerritoryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Australian Capital Territory',
        subtitle: '24/7 Emergency Services in Australian Capital Territory',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'Australian Capital Territory' },
      ]}
      sections={getLocationSections({ city: 'Australian Capital Territory', state: 'ACT' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
