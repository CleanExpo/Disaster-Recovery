import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Section 54 Insurance Contracts Act: Your Right to Choose Contractors | Disaster Recovery',
  description: 'Complete guide to Section 54 of the Insurance Contracts Act 1984 - your legal right to choose qualified emergency contractors. Protect yourself from insurer preferred contractor requirements.',
  keywords: 'Section 54 Insurance Contracts Act, choose your own contractor, emergency mitigation rights, insurance law Australia, policyholder rights',
  openGraph: {
    title: 'Section 54: Your Legal Right to Choose Emergency Contractors',
    description: 'Understanding your protected rights under Australian insurance law.',
    images: ['/images/section-54-rights.jpg'] } };

export default function Section54ContractorRightsPage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Section 54 Insurance Contracts Act: Your Right to Choose Contractors"
      subtitle="Complete guide to Section 54 of the Insurance Contracts Act 1984 - your legal right to choose qualified emergency contractors. Protect yourself from insurer preferred contractor requirements."
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Section 54 Insurance Contracts Act: Your Right ...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
