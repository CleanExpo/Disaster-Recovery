import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hydroxyl Generators | Odour elimination | Advanced Restoration Technology',
  description: 'Professional hydroxyl generators for odour elimination. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/hydroxyl-generators' },
};

export default function HydroxylGeneratorsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Hydroxyl Generators',
        subtitle: 'Professional Equipment for Odour elimination',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Hydroxyl Generators' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Hydroxyl Generators', useCase: 'safe deodorisation in occupied spaces' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
