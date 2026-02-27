import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Government Facility Disaster Recovery | $2200',
  description: 'Approved vendor for government facility disaster recovery and restoration. Immediate priority response. 100% funded insurance coverage.',
  keywords: ["government disaster recovery","public facility restoration","council property damage"],
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/government-facilities' },
};

export default function GovernmentFacilityPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Government Facility Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Government Facility Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Government Facilities', description: 'Specialised disaster recovery for government buildings and infrastructure.' })}
      relatedPages={getRelatedPages('commercial')}
    />
  );
}
