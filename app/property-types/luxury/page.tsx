import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Luxury Properties Disaster Recovery',
  description: 'Specialised disaster recovery for luxury properties. High-value estates and homes. IICRC-certified, 24/7 response.',
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/luxury' },
};

export default function LuxuryPropertiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Luxury Properties Disaster Recovery',
        subtitle: 'High-value estates and homes',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Luxury Properties Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Luxury Properties', description: 'Premium disaster recovery for high-value residential properties.' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
