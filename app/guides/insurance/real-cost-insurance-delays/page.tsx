import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'The Real Cost of Insurance Delays - ASIC & ICA Data on Claims Crisis | Disaster Recovery',
  description: 'ASIC concerned about unresolved 2022 flood claims. ICA reports 78% of catastrophes Oct-April. Learn your Section 54 rights and how delays cost thousands in secondary damage.',
  keywords: 'insurance claim delays ASIC, ICA catastrophe report 2024, flood claims unresolved, AFCA complaints, Section 54 Insurance Contracts Act, Ex-Tropical Cyclone Jasper claims',
  openGraph: {
    title: 'Insurance Delays Crisis - ASIC & ICA Data Reveals System Failures',
    description: 'ASIC concerned about ongoing 2022 flood claims. One in 10 AFCA complaints about claims handling delays.',
    images: ['/images/insurance-delays-cost.jpg'] } };

export default function RealCostInsuranceDelaysPage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="The Real Cost of Insurance Delays - ASIC & ICA Data on Claims Crisis"
      subtitle="ASIC concerned about unresolved 2022 flood claims. ICA reports 78% of catastrophes Oct-April. Learn your Section 54 rights and how delays cost thousands in secondary damage."
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'The Real Cost of Insurance Delays - ASIC & ICA ...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
