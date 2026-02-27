import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Port Augusta',
  description: '24/7 disaster recovery in Port Augusta, South Australia. Water damage, fire restoration, mould removal. Lodge a claim online 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/sa/port-augusta',
  },
};

export default function PortAugustaPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Port Augusta',
        subtitle: '24/7 Emergency Services in Port Augusta',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'SA', href: '/locations/sa' },
        { label: 'Port Augusta' },
      ]}
      sections={getLocationSections({ city: 'Port Augusta', state: 'SA' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
