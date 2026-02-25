import { Metadata } from 'next';
import { Settings } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Structural Drying Equipment: Rental vs Professional Service | Disaster Recovery',
  description: 'Expert answers and solutions for "structural drying equipment rental cost". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'structural drying equipment rental cost, disaster recovery, restoration services, Australia, IICRC certified' };

export default function StructuralDryingEquipmentCostPage() {
  return (
    <AgGuidePageTemplate
      category="Equipment"
      title="Structural Drying Equipment: Rental vs Professional Service"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)"
      icon={<Settings className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Equipment', href: '/guides/equipment' },
        { label: 'Structural Drying Equipment: Rental vs Professi...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
