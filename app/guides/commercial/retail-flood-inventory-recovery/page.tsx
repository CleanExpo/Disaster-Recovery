import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Retail Store Flood: Inventory Recovery Process | Disaster Recovery',
  description: 'Expert answers and solutions for "retail store flood damage inventory recovery". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'retail store flood damage inventory recovery, disaster recovery, restoration services, Australia, IICRC certified' };

export default function RetailFloodInventoryRecoveryPage() {
  return (
    <AgGuidePageTemplate
      category="Commercial"
      title="Retail Store Flood: Inventory Recovery Process"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Building2 className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Commercial', href: '/guides/commercial' },
        { label: 'Retail Store Flood: Inventory Recovery Process' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
