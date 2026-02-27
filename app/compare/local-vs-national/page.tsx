import { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCompareSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Local vs National Companies | Comparison Guide',
  description: 'Compare local vs national companies. Pros, cons, costs, and expert recommendations to help you decide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/compare/local-vs-national' },
};

export default function LocalvsNationalCompaniesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
        icon: <Scale className="h-12 w-12" />,
        title: 'Local vs National Companies',
        subtitle: 'Make an Informed Decision',
      }}
      cta={{ text: 'Get Expert Advice', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare' },
        { label: 'Local vs National Companies' },
      ]}
      sections={getCompareSections({ option1: 'Local', option2: 'National' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
