import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "What's Included in Disaster Recovery Services | Disaster Recovery",
  description: 'Expert answers and solutions for "what does disaster recovery service include". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'what does disaster recovery service include, disaster recovery, restoration services, Australia, IICRC certified' };

export default function WhatDisasterRecoveryIncludesPage() {
  return (
    <AgGuidePageTemplate
      category="Services"
      title="What's Included in Disaster Recovery Services"
      subtitle="Expert answers and solutions for what disaster recovery services include. IICRC certified professionals available 24/7 nationwide."
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<Wrench className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Services', href: '/guides/services' },
        { label: "What's Included in DR Services" },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
