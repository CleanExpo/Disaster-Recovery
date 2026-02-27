import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Victoria | 24/7 Emergency Services | Melbourne & All Cities',
  description: 'Leading disaster recovery services across Victoria. Emergency response for Bushfires, Flooding, Storms, Heatwaves. Serving Melbourne, Geelong, Ballarat, Bendigo and all VIC regions. Call Online Form Available 24/7.',
  keywords: [
    'disaster recovery Victoria',
    'emergency services Melbourne',
    'bushfires cleanup VIC',
    'water damage Victoria',
    'fire damage restoration Melbourne',
    ...['Sydney', 'Melbourne', 'Brisbane'].map((city: string) => `${city.toLowerCase()} disaster recovery`),
    'insurance restoration Victoria',
    '24/7 emergency VIC'
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/vic',
  },
};

export default function VictoriaPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Victoria',
        subtitle: '24/7 Emergency Services in Victoria',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'Victoria' },
      ]}
      sections={getLocationSections({ city: 'Victoria', state: 'VIC' })}
      relatedPages={getRelatedPages('location-melbourne')}
    />
  );
}
