import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import { LocationSchemaWrapper } from '@/components/seo/LocationSchemaWrapper';

export const metadata: Metadata = {
  title: 'Disaster Recovery Gold Coast | 24/7',
  description: 'Professional disaster recovery services on the Gold Coast, Queensland. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/gold-coast',
  },
};

export default function GoldCoastLocationPage() {
  return (
    <>
      <LocationSchemaWrapper
        city="Gold Coast"
        state="QLD"
        stateFullName="Queensland"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Gold Coast' },
        ]}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Gold Coast',
          subtitle: '24/7 Emergency Services in Gold Coast',
        }}
        cta={{ text: 'Emergency Response', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Gold Coast' },
        ]}
        sections={getLocationSections({ city: 'Gold Coast', state: 'QLD' })}
        relatedPages={getRelatedPages('location-gold-coast')}
      />
    </>
  );
}
