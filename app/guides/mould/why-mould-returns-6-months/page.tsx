import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Why Mould Returns Within 6 Months - VBA Research Shows 92% Have Water Defects | Disaster Recovery',
  description: 'Victorian Building Authority research reveals 92% of insurance claims have water-related defects. One in three Australian homes affected by mould. Learn the 7 reasons professional remediation fails.',
  keywords: 'mould returns after removal, Victorian Building Authority mould research, ABCB condensation management, AS-IICRC S520:2025 standard, professional mould removal problems',
  openGraph: {
    title: 'VBA Research: 92% of Insurance Claims Have Water Defects Leading to Mould',
    description: 'Victorian Building Authority data reveals the mould crisis affecting one in three Australian homes.',
    images: ['/images/mould-remediation-failure.jpg'] } };

export default function WhyMouldReturnsPage() {
  return (
    <AgGuidePageTemplate
      category="Mould"
      title="Why Mould Returns Within 6 Months - VBA Research Shows 92% Have Water Defects"
      subtitle="Victorian Building Authority research reveals 92% of insurance claims have water-related defects. One in three Australian homes affected by mould. Learn the 7 reasons professional remediation fails."
      gradient="linear-gradient(135deg, #14532D 0%, #15803D 100%)"
      icon={<Bug className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Mould', href: '/guides/mould' },
        { label: 'Why Mould Returns Within 6 Months - VBA Researc...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
