import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Cost Guide Australia 2026 | Disaster Recovery',
  description: 'Expert answers and solutions for "how much does water damage restoration cost in australia". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'how much does water damage restoration cost in australia, disaster recovery, restoration services, Australia, IICRC certified' };

export default function HowMuchWaterDamageRestorationCostPage() {
  return (
    <AgGuidePageTemplate
      category="Cost Guides"
      title="Water Damage Restoration Cost Guide Australia 2026"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #14532D 0%, #15803D 100%)"
      icon={<DollarSign className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Cost Guides', href: '/guides/cost-guides' },
        { label: 'Water Damage Restoration Cost Guide Australia 2026' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
