import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Alice Springs',
  description: '24/7 disaster recovery in Alice Springs, Northern Territory. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/nt/alice-springs',
  },
};

export default function AliceSpringsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Alice Springs',
        subtitle: '24/7 Emergency Services in Alice Springs',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'NT', href: '/locations/nt' },
        { label: 'Alice Springs' },
      ]}
      sections={getLocationSections({ city: 'Alice Springs', state: 'NT' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
