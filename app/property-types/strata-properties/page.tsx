import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Strata Property Disaster Recovery | Strata Properties',
  description: 'Coordinated disaster recovery for strata-managed properties and common areas. 30 minutes response. 100% via strata insurance coverage.',
  keywords: ["strata disaster recovery","body corporate restoration","common area damage"],
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/strata-properties' },
};

export default function StrataPropertyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Strata Property Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Strata Property Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Strata Properties', description: 'Strata-titled property disaster recovery with body corporate coordination.' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
