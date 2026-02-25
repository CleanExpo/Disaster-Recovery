import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'NRP Pricing Guidance - Professional Standards & Fair Pricing Framework | Disaster Recovery',
  description: 'NRP contractor pricing guidance framework. Understand recommended service inclusions and fair pricing ranges that empower policy holders and streamline claims processing.',
  keywords: 'NRP pricing guidance, professional contractor standards, fair pricing framework, policy holder empowerment, insurance claims streamlining',
  openGraph: {
    title: 'NRP Pricing Guidance - Empowering Policy Holders',
    description: 'Professional contractor guidance framework that puts decision-making power back in the hands of policy holders and bill payers.' }
};

export default function ProfessionalResponsePricingBreakdownPage() {
  return (
    <AgGuidePageTemplate
      category="Pricing"
      title="NRP Pricing Guidance - Professional Standards & Fair Pricing Framework"
      subtitle="NRP contractor pricing guidance framework. Understand recommended service inclusions and fair pricing ranges that empower policy holders and streamline claims processing."
      gradient="linear-gradient(135deg, #14532D 0%, #15803D 100%)"
      icon={<DollarSign className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Pricing', href: '/guides/pricing' },
        { label: 'NRP Pricing Guidance - Professional Standards &...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
