import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Negative Air Machines | Containment | Advanced Restoration Technology',
  description: 'Professional negative air machines for containment. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/negative-air-machines' },
};

export default function NegativeAirMachinesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Negative Air Machines',
        subtitle: 'Professional Equipment for Containment',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Negative Air Machines' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Negative Air Machines', useCase: 'containing contamination with negative pressure' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
