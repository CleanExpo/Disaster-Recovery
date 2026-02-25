import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Bendigo | Emergency Services Victoria',
  description: '24/7 disaster recovery in Bendigo, Victoria. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function BendigoPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Bendigo',
        subtitle: '24/7 Emergency Services in Bendigo',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'VIC', href: '/locations/vic' },
        { label: 'Bendigo' },
      ]}
      sections={getLocationSections({ city: 'Bendigo', state: 'VIC' })}
      relatedPages={getRelatedPages('location-melbourne')}
    />
  );
}
