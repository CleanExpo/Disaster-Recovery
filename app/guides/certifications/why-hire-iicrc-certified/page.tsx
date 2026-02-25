import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Why IICRC Certification Matters for Restoration | Disaster Recovery',
  description: 'Expert answers and solutions for "why hire iicrc certified restoration company". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'why hire iicrc certified restoration company, disaster recovery, restoration services, Australia, IICRC certified' };

export default function WhyHireIicrcCertifiedPage() {
  return (
    <AgGuidePageTemplate
      category="Certifications"
      title="Why IICRC Certification Matters for Restoration"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Award className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Certifications', href: '/guides/certifications' },
        { label: 'Why IICRC Certification Matters for Restoration' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
