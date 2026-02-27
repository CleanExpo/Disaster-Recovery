import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEquipmentSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Ultrasonic Cleaning | Contents restoration',
  description: 'Professional ultrasonic cleaning for contents restoration. Latest technology for faster, better restoration results.',
  alternates: { canonical: 'https://disasterrecovery.com.au/equipment/ultrasonic-cleaning' },
};

export default function UltrasonicCleaningPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Settings className="h-12 w-12" />,
        title: 'Ultrasonic Cleaning',
        subtitle: 'Professional Equipment for Contents restoration',
      }}
      cta={{ text: 'Learn More', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Equipment', href: '/equipment' },
        { label: 'Ultrasonic Cleaning' },
      ]}
      sections={getEquipmentSections({ equipmentName: 'Ultrasonic Cleaning', useCase: 'precision cleaning of fire and smoke damaged contents' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
