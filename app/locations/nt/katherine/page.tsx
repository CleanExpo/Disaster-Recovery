import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Katherine',
  description: '24/7 disaster recovery in Katherine, Northern Territory. Water damage, fire restoration, mould removal. Lodge a claim online 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/nt/katherine',
  },
};

export default function KatherinePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Katherine',
        subtitle: '24/7 Emergency Services in Katherine',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'NT', href: '/locations/nt' },
        { label: 'Katherine' },
      ]}
      sections={getLocationSections({ city: 'Katherine', state: 'NT' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
