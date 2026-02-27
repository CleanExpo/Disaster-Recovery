import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Weston Creek',
  description: '24/7 disaster recovery in Weston Creek, Australian Capital Territory. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/act/weston-creek',
  },
};

export default function WestonCreekPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Weston Creek',
        subtitle: '24/7 Emergency Services in Weston Creek',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'ACT', href: '/locations/act' },
        { label: 'Weston Creek' },
      ]}
      sections={getLocationSections({ city: 'Weston Creek', state: 'ACT' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
