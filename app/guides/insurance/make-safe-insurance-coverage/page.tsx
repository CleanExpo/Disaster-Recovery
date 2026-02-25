import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Make Safe Services: What Insurance Covers | Disaster Recovery',
  description: 'Expert answers and solutions for "make safe services insurance coverage". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'make safe services insurance coverage, disaster recovery, restoration services, Australia, IICRC certified' };

export default function MakeSafeInsuranceCoveragePage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Make Safe Services: What Insurance Covers"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Make Safe Services: What Insurance Covers' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
