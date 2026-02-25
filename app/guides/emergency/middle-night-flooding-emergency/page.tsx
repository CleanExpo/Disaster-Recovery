import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Middle of Night Flooding: Emergency Response | Disaster Recovery',
  description: 'Expert answers and solutions for "middle of night flooding emergency help". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'middle of night flooding emergency help, disaster recovery, restoration services, Australia, IICRC certified' };

export default function MiddleNightFloodingEmergencyPage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="Middle of Night Flooding: Emergency Response"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: 'Middle of Night Flooding: Emergency Response' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
