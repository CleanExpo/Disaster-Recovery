import { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCompareSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Insurance Claim vs Cash Payment | Comparison Guide | Make the Right Choice',
  description: 'Compare insurance claim vs cash payment. Pros, cons, costs, and expert recommendations to help you decide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/compare/insurance-vs-cash' },
};

export default function InsuranceClaimvsCashPaymentPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
        icon: <Scale className="h-12 w-12" />,
        title: 'Insurance Claim vs Cash Payment',
        subtitle: 'Make an Informed Decision',
      }}
      cta={{ text: 'Get Expert Advice', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare' },
        { label: 'Insurance Claim vs Cash Payment' },
      ]}
      sections={getCompareSections({ option1: 'Insurance', option2: 'Cash' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
