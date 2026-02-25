import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Loss Assessor vs Restoration Contractor: Roles Explained | Disaster Recovery',
  description: 'Expert answers and solutions for "loss assessor vs restoration contractor". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'loss assessor vs restoration contractor, disaster recovery, restoration services, Australia, IICRC certified' };

export default function LossAssessorVsContractorPage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Loss Assessor vs Restoration Contractor: Roles Explained"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Loss Assessor vs Restoration Contractor: Roles ...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
