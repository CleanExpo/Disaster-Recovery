import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import { LocationSchemaWrapper } from '@/components/seo/LocationSchemaWrapper';

export const metadata: Metadata = {
  title: 'Disaster Recovery Sydney | 24/7 Emergency Restoration NSW',
  description: 'Professional disaster recovery services in Sydney, New South Wales. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/sydney',
  },
};

export default function SydneyLocationPage() {
  return (
    <>
      <LocationSchemaWrapper
        city="Sydney"
        state="NSW"
        stateFullName="New South Wales"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Sydney' },
        ]}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Sydney',
          subtitle: '24/7 Emergency Services in Sydney',
        }}
        cta={{ text: 'Emergency Response', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Sydney' },
        ]}
        sections={getLocationSections({ city: 'Sydney', state: 'NSW' })}
        relatedPages={getRelatedPages('location-sydney')}
      />
    </>
  );
}
