import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Industrial Dehumidifiers | Structural drying',
  description: 'Professional industrial dehumidifiers for structural drying. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/industrial-dehumidifiers' },
};

export default function IndustrialDehumidifiersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Industrial Dehumidifiers',
        subtitle: 'Professional Equipment for Structural drying',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Industrial Dehumidifiers' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Industrial Dehumidifiers', useCase: 'accelerating drying and preventing mould growth' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
