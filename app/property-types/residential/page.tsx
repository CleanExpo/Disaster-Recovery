import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Residential Properties Disaster Recovery',
  description: 'Specialised disaster recovery for residential properties. Houses, units, apartments. IICRC-certified, 24/7 response.',
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/residential' },
};

export default function ResidentialPropertiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Residential Properties Disaster Recovery',
        subtitle: 'Houses, units, apartments',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Residential Properties Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Residential Properties', description: 'Home disaster recovery for houses and residential buildings.' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
