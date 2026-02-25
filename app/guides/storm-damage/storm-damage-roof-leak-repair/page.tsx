import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Storm Damage Roof Leak Repairs | Disaster Recovery',
  description: 'Expert answers and solutions for "storm damage roof leak emergency repair". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'storm damage roof leak emergency repair, disaster recovery, restoration services, Australia, IICRC certified' };

export default function StormDamageRoofLeakRepairPage() {
  return (
    <AgGuidePageTemplate
      category="Storm Damage"
      title="Emergency Storm Damage Roof Leak Repairs"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E293B 0%, #475569 100%)"
      icon={<CloudLightning className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Storm Damage', href: '/guides/storm-damage' },
        { label: 'Emergency Storm Damage Roof Leak Repairs' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
