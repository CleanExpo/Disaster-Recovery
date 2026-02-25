import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Category 3 Water Damage: Insurance Claims Guide | Disaster Recovery',
  description: 'Expert answers and solutions for "category 3 water damage insurance claim". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'category 3 water damage insurance claim, disaster recovery, restoration services, Australia, IICRC certified' };

export default function Category3WaterDamageInsurancePage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Category 3 Water Damage: Insurance Claims Guide"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Category 3 Water Damage: Insurance Claims Guide' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
