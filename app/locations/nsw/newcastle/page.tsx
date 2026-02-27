import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Newcastle',
  description: '24/7 disaster recovery in Newcastle, New South Wales. Water damage, fire restoration, mould removal. Lodge a claim online 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/nsw/newcastle',
  },
};

export default function NewcastlePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Newcastle',
        subtitle: '24/7 Emergency Services in Newcastle',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'NSW', href: '/locations/nsw' },
        { label: 'Newcastle' },
      ]}
      sections={getLocationSections({ city: 'Newcastle', state: 'NSW' })}
      relatedPages={getRelatedPages('location-sydney')}
    />
  );
}
