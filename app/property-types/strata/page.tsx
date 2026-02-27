import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Strata Properties Disaster Recovery',
  description: 'Specialised disaster recovery for strata properties. Body corporate managed properties. IICRC-certified, 24/7 response.',
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/strata' },
};

export default function StrataPropertiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Strata Properties Disaster Recovery',
        subtitle: 'Body corporate managed properties',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Strata Properties Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Strata Properties', description: 'Body corporate managed property disaster recovery.' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
