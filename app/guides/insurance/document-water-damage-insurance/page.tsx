import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Documenting Water Damage for Insurance Claims | Disaster Recovery',
  description: 'Expert answers and solutions for "how to document water damage for insurance claim". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'how to document water damage for insurance claim, disaster recovery, restoration services, Australia, IICRC certified' };

export default function DocumentWaterDamageInsurancePage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Documenting Water Damage for Insurance Claims"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Documenting Water Damage for Insurance Claims' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
