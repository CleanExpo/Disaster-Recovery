import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Sunshine Coast | Emergency Services Queensland',
  description: '24/7 disaster recovery in Sunshine Coast, Queensland. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/qld/sunshine-coast',
  },
};

export default function SunshineCoastPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Sunshine Coast',
        subtitle: '24/7 Emergency Services in Sunshine Coast',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'QLD', href: '/locations/qld' },
        { label: 'Sunshine Coast' },
      ]}
      sections={getLocationSections({ city: 'Sunshine Coast', state: 'QLD' })}
      relatedPages={getRelatedPages('location-brisbane')}
    />
  );
}
