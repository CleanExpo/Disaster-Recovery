import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import { LocationSchemaWrapper } from '@/components/seo/LocationSchemaWrapper';

export const metadata: Metadata = {
  title: 'Disaster Recovery Newcastle | 24/7',
  description: 'Professional disaster recovery services in Newcastle, New South Wales. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/newcastle',
  },
};

export default function NewcastleLocationPage() {
  return (
    <>
      <LocationSchemaWrapper
        city="Newcastle"
        state="NSW"
        stateFullName="New South Wales"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Newcastle' },
        ]}
      />
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
          { label: 'Newcastle' },
        ]}
        sections={getLocationSections({ city: 'Newcastle', state: 'NSW' })}
        relatedPages={getRelatedPages('location-newcastle')}
      />
    </>
  );
}
