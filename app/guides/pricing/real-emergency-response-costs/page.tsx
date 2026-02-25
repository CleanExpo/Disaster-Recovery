import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Real Emergency Response Costs - What's Actually Included | Disaster Recovery",
  description: "Professional emergency response $2,750 comprehensive service vs hidden cost competitors charging $5,000+. See what's included in transparent pricing - no shock invoices.",
  keywords: 'emergency response costs, professional restoration pricing, transparent pricing, hidden restoration fees, comprehensive emergency service',
  openGraph: {
    title: 'Real Emergency Response Costs - Transparent vs Hidden Pricing',
    description: 'What professional emergency response actually includes - no surprise invoices.',
    images: ['/images/transparent-pricing.jpg'] } };

export default function RealEmergencyResponseCostsPage() {
  return (
    <AgGuidePageTemplate
      category="Pricing"
      title="Real Emergency Response Costs - What's Actually Included"
      subtitle="Professional emergency response $2,750 comprehensive service vs hidden cost competitors. See what's included in transparent pricing."
      gradient="linear-gradient(135deg, #14532D 0%, #15803D 100%)"
      icon={<DollarSign className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Pricing', href: '/guides/pricing' },
        { label: "Real Emergency Response Costs" },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
