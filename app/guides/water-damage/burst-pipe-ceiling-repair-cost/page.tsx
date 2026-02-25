import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Burst Pipe Ceiling Damage: Repair Costs & Process | Disaster Recovery',
  description: 'Expert answers and solutions for "burst pipe water damage ceiling repair cost". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'burst pipe water damage ceiling repair cost, disaster recovery, restoration services, Australia, IICRC certified' };

export default function BurstPipeCeilingRepairCostPage() {
  return (
    <AgGuidePageTemplate
      category="Water Damage"
      title="Burst Pipe Ceiling Damage: Repair Costs & Process"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
      icon={<Droplets className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Water Damage', href: '/guides/water-damage' },
        { label: 'Burst Pipe Ceiling Damage: Repair Costs & Process' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
