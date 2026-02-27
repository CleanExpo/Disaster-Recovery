import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Healthcare Facility Disaster Recovery | $2200',
  description: 'Specialised disaster recovery for hospitals, clinics, and medical facilities. Immediate response. 100% insurance coverage.',
  keywords: ["healthcare disaster recovery","hospital restoration","medical facility damage"],
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/healthcare-facilities' },
};

export default function HealthcareFacilityPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Healthcare Facility Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Healthcare Facility Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Healthcare Facilities', description: 'Critical disaster recovery for hospitals, clinics, and aged care.' })}
      relatedPages={getRelatedPages('commercial')}
    />
  );
}
