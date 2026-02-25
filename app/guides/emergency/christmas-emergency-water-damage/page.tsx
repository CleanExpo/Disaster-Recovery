import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Christmas Day Water Damage Emergency Services | Disaster Recovery',
  description: 'Expert answers and solutions for "christmas day water damage emergency". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'christmas day water damage emergency, disaster recovery, restoration services, Australia, IICRC certified' };

export default function ChristmasEmergencyWaterDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Emergency"
      title="Christmas Day Water Damage Emergency Services"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency', href: '/guides/emergency' },
        { label: 'Christmas Day Water Damage Emergency Services' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
