import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Drone Roof Inspection | Damage assessment | Advanced Restoration Technology',
  description: 'Professional drone roof inspection for damage assessment. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/drone-inspection' },
};

export default function DroneRoofInspectionPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Drone Roof Inspection',
        subtitle: 'Professional Equipment for Damage assessment',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Drone Roof Inspection' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Drone Inspection', useCase: 'aerial damage assessment for roofs and large structures' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
