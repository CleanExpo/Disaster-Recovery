import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Data Centre Water Damage Recovery Services | Disaster Recovery',
  description: 'Expert answers and solutions for "data centre water damage recovery". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'data centre water damage recovery, disaster recovery, restoration services, Australia, IICRC certified' };

export default function DataCentreWaterDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Commercial"
      title="Data Centre Water Damage Recovery Services"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Building2 className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Commercial', href: '/guides/commercial' },
        { label: 'Data Centre Water Damage Recovery Services' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
