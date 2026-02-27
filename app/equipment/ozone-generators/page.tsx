import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Ozone Generators | Deodorisation | Advanced Restoration Technology',
  description: 'Professional ozone generators for deodorisation. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/ozone-generators' },
};

export default function OzoneGeneratorsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Ozone Generators',
        subtitle: 'Professional Equipment for Deodorisation',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Ozone Generators' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Ozone Generators', useCase: 'eliminating odours and neutralising contaminants' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
