import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Insurance Approved Restoration Contractors | Disaster Recovery',
  description: 'Expert answers and solutions for "insurance approved restoration contractors australia". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'insurance approved restoration contractors australia, disaster recovery, restoration services, Australia, IICRC certified' };

export default function InsuranceApprovedContractorsPage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Insurance Approved Restoration Contractors"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Insurance Approved Restoration Contractors' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
