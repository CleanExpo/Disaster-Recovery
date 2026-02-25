import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Is Mould Removal Covered by Insurance in Australia? | Disaster Recovery',
  description: 'Expert answers and solutions for "is mould removal covered by insurance in australia". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'is mould removal covered by insurance in australia, disaster recovery, restoration services, Australia, IICRC certified' };

export default function MouldRemovalInsuranceCoveragePage() {
  return (
    <AgGuidePageTemplate
      category="Insurance Guides"
      title="Is Mould Removal Covered by Insurance in Australia?"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance Guides', href: '/guides/insurance-guides' },
        { label: 'Is Mould Removal Covered by Insurance in Austra...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
