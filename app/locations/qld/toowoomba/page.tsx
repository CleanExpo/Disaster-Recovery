import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Toowoomba',
  description: '24/7 disaster recovery in Toowoomba, Queensland. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/qld/toowoomba',
  },
};

export default function ToowoombaPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Toowoomba',
        subtitle: '24/7 Emergency Services in Toowoomba',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'QLD', href: '/locations/qld' },
        { label: 'Toowoomba' },
      ]}
      sections={getLocationSections({ city: 'Toowoomba', state: 'QLD' })}
      relatedPages={getRelatedPages('location-brisbane')}
    />
  );
}
