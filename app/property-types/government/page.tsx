import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Government Facilities Disaster Recovery | Federal, state, local government | Australia',
  description: 'Specialised disaster recovery for government facilities. Federal, state, local government. IICRC-certified, 24/7 response.' };

export default function GovernmentFacilitiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Government Facilities Disaster Recovery',
        subtitle: 'Federal, state, local government',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Government Facilities Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Government Properties', description: 'Government facility disaster recovery meeting compliance requirements.' })}
      relatedPages={getRelatedPages('commercial')}
    />
  );
}
