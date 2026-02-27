import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Rural Properties Disaster Recovery',
  description: 'Specialised disaster recovery for rural properties. Farms and country properties. IICRC-certified, 24/7 response.',
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/rural' },
};

export default function RuralPropertiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Rural Properties Disaster Recovery',
        subtitle: 'Farms and country properties',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Rural Properties Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Rural Properties', description: 'Remote and regional property disaster recovery services.' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
