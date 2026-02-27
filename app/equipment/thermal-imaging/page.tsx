import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Thermal Imaging Cameras | Moisture detection',
  description: 'Professional thermal imaging cameras for moisture detection. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/thermal-imaging' },
};

export default function ThermalImagingCamerasPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Thermal Imaging Cameras',
        subtitle: 'Professional Equipment for Moisture detection',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Thermal Imaging Cameras' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Thermal Imaging Cameras', useCase: 'moisture detection and hidden damage identification' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
