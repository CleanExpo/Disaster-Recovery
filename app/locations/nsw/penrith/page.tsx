import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Penrith | Emergency Services New South Wales',
  description: '24/7 disaster recovery in Penrith, New South Wales. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function PenrithPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Penrith',
        subtitle: '24/7 Emergency Services in Penrith',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'NSW', href: '/locations/nsw' },
        { label: 'Penrith' },
      ]}
      sections={getLocationSections({ city: 'Penrith', state: 'NSW' })}
      relatedPages={getRelatedPages('location-sydney')}
    />
  );
}
