import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Understanding Depreciation in Water Damage Claims | Disaster Recovery',
  description: 'Expert answers and solutions for "insurance claim water damage depreciation". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'insurance claim water damage depreciation, disaster recovery, restoration services, Australia, IICRC certified' };

export default function InsuranceDepreciationWaterDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Understanding Depreciation in Water Damage Claims"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Understanding Depreciation in Water Damage Claims' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
