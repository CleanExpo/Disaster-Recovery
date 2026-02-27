import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Whyalla | Emergency Services South Australia',
  description: '24/7 disaster recovery in Whyalla, South Australia. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' ,
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/sa/whyalla',
  },
};

export default function WhyallaPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Disaster Recovery Whyalla',
        subtitle: '24/7 Emergency Services in Whyalla',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: 'SA', href: '/locations/sa' },
        { label: 'Whyalla' },
      ]}
      sections={getLocationSections({ city: 'Whyalla', state: 'SA' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
