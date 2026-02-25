import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Burnie | Emergency Services Tasmania',
  description: '24/7 disaster recovery in Burnie, Tasmania. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function BurniePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Burnie',
        subtitle: '24/7 Emergency Services in Burnie',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'TAS', href: '/locations/tas' },
        { label: 'Burnie' },
      ]}
      sections={getLocationSections({ city: 'Burnie', state: 'TAS' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
