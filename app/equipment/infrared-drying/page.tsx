import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Infrared Drying Systems | Targeted drying | Advanced Restoration Technology',
  description: 'Professional infrared drying systems for targeted drying. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/infrared-drying' },
};

export default function InfraredDryingSystemsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Infrared Drying Systems',
        subtitle: 'Professional Equipment for Targeted drying',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Infrared Drying Systems' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Infrared Drying Systems', useCase: 'deep material drying without demolition' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
