import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Gold Coast | Emergency Services Queensland',
  description: '24/7 disaster recovery in Gold Coast, Queensland. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/qld/gold-coast',
  },
};

export default function GoldCoastPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Gold Coast',
        subtitle: '24/7 Emergency Services in Gold Coast',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'QLD', href: '/locations/qld' },
        { label: 'Gold Coast' },
      ]}
      sections={getLocationSections({ city: 'Gold Coast', state: 'QLD' })}
      relatedPages={getRelatedPages('location-brisbane')}
    />
  );
}
