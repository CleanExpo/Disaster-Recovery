import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Rental Properties Disaster Recovery | Investment and rental homes | Australia',
  description: 'Specialised disaster recovery for rental properties. Investment and rental homes. IICRC-certified, 24/7 response.' };

export default function RentalPropertiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Rental Properties Disaster Recovery',
        subtitle: 'Investment and rental homes',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Rental Properties Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Rental Properties', description: 'Disaster recovery coordinated between landlords, tenants, and insurers.' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
