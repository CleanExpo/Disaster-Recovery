import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'HEPA Air Scrubbers | Air purification | Advanced Restoration Technology',
  description: 'Professional hepa air scrubbers for air purification. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/air-scrubbers' },
};

export default function HEPAAirScrubbersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'HEPA Air Scrubbers',
        subtitle: 'Professional Equipment for Air purification',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'HEPA Air Scrubbers' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Air Scrubbers', useCase: 'filtering airborne contaminants during restoration' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
