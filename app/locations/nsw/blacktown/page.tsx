import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Blacktown | Emergency Services New South Wales',
  description: '24/7 disaster recovery in Blacktown, New South Wales. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function BlacktownPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Blacktown',
        subtitle: '24/7 Emergency Services in Blacktown',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'NSW', href: '/locations/nsw' },
        { label: 'Blacktown' },
      ]}
      sections={getLocationSections({ city: 'Blacktown', state: 'NSW' })}
      relatedPages={getRelatedPages('location-sydney')}
    />
  );
}
