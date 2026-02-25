import { Metadata } from 'next';
import { Users } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'NRPG Best Practices Guide - Professional Standards for Disaster Recovery | Disaster Recovery',
  description: 'Comprehensive guide to National Restoration Professionals Group best practices, mandatory procedures, and professional standards for emergency response and disaster recovery contractors.',
  keywords: 'NRPG best practices, professional standards, disaster recovery procedures, emergency response protocols, contractor certification, industry standards',
  openGraph: {
    title: 'NRPG Best Practices Guide - Professional Standards',
    description: 'Official guide to professional standards and mandatory procedures for NRPG contractors in emergency response and disaster recovery.' }
};

export default function NRPBestPracticesGuidePage() {
  return (
    <AgGuidePageTemplate
      category="Professional"
      title="NRPG Best Practices Guide - Professional Standards for Disaster Recovery"
      subtitle="Comprehensive guide to National Restoration Professionals Group best practices, mandatory procedures, and professional standards for emergency response and disaster recovery contractors."
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Users className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Professional', href: '/guides/professional' },
        { label: 'NRPG Best Practices Guide - Professional Standa...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
