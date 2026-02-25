import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Office Water Damage: Minimising Business Interruption | Disaster Recovery',
  description: 'Expert answers and solutions for "office building water damage business interruption". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'office building water damage business interruption, disaster recovery, restoration services, Australia, IICRC certified' };

export default function OfficeWaterDamageBusinessInterruptionPage() {
  return (
    <AgGuidePageTemplate
      category="Commercial"
      title="Office Water Damage: Minimising Business Interruption"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Building2 className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Commercial', href: '/guides/commercial' },
        { label: 'Office Water Damage: Minimising Business Interr...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
