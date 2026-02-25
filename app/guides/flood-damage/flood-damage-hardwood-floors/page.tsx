import { Metadata } from 'next';
import { Waves } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Restoring Flood Damaged Hardwood Floors | Disaster Recovery',
  description: 'Expert answers and solutions for "flood damage hardwood floor restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'flood damage hardwood floor restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function FloodDamageHardwoodFloorsPage() {
  return (
    <AgGuidePageTemplate
      category="Flood Damage"
      title="Restoring Flood Damaged Hardwood Floors"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)"
      icon={<Waves className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Flood Damage', href: '/guides/flood-damage' },
        { label: 'Restoring Flood Damaged Hardwood Floors' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
