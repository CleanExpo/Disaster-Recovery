import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Warehouse Roof Leak Damage Restoration | Disaster Recovery',
  description: 'Expert answers and solutions for "warehouse roof leak damage restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'warehouse roof leak damage restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function WarehouseRoofLeakRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Commercial"
      title="Warehouse Roof Leak Damage Restoration"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Building2 className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Commercial', href: '/guides/commercial' },
        { label: 'Warehouse Roof Leak Damage Restoration' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
