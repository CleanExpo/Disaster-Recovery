import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'High Rise Buildings Disaster Recovery | Apartments and office towers | Australia',
  description: 'Specialised disaster recovery for high rise buildings. Apartments and office towers. IICRC-certified, 24/7 response.' };

export default function HighRiseBuildingsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'High Rise Buildings Disaster Recovery',
        subtitle: 'Apartments and office towers',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'High Rise Buildings Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'High-Rise Buildings', description: 'Multi-storey disaster recovery from 2 to 80+ floors.' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
