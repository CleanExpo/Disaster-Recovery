import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Immediate Steps After Flood Damage: Emergency Guide | Disaster Recovery',
  description: 'Expert answers and solutions for "what to do immediately after flood damage". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'what to do immediately after flood damage, disaster recovery, restoration services, Australia, IICRC certified' };

export default function WhatToDoAfterFloodDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Emergency Guides"
      title="Immediate Steps After Flood Damage: Emergency Guide"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency Guides', href: '/guides/emergency-guides' },
        { label: 'Immediate Steps After Flood Damage: Emergency G...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
