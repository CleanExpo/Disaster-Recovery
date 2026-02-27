import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import { LocationSchemaWrapper } from '@/components/seo/LocationSchemaWrapper';

export const metadata: Metadata = {
  title: 'Disaster Recovery Auckland | 24/7',
  description: 'Professional disaster recovery services in Auckland, New Zealand. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/auckland',
  },
};

export default function AucklandLocationPage() {
  return (
    <>
      <LocationSchemaWrapper
        city="Auckland"
        state="AKL"
        stateFullName="Auckland Region"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Auckland' },
        ]}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Auckland',
          subtitle: '24/7 Emergency Services in Auckland',
        }}
        cta={{ text: 'Emergency Response', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Auckland' },
        ]}
        sections={getLocationSections({ city: 'Auckland', state: 'AKL' })}
        relatedPages={getRelatedPages('location-auckland')}
      />
    </>
  );
}
