import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Professional Moisture Meters | Water damage assessment | Advanced Restoration Technology',
  description: 'Professional professional moisture meters for water damage assessment. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/moisture-meters' },
};

export default function ProfessionalMoistureMetersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Professional Moisture Meters',
        subtitle: 'Professional Equipment for Water damage assessment',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Professional Moisture Meters' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Moisture Meters', useCase: 'measuring moisture content in building materials' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
