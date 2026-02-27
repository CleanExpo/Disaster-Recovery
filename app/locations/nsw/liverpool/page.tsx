import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Liverpool',
  description: '24/7 disaster recovery in Liverpool, New South Wales. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/nsw/liverpool',
  },
};

export default function LiverpoolPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Liverpool',
        subtitle: '24/7 Emergency Services in Liverpool',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'NSW', href: '/locations/nsw' },
        { label: 'Liverpool' },
      ]}
      sections={getLocationSections({ city: 'Liverpool', state: 'NSW' })}
      relatedPages={getRelatedPages('location-sydney')}
    />
  );
}
