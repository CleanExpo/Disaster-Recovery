import { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCompareSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Cheap vs Quality Restoration | Comparison Guide',
  description: 'Compare cheap vs quality restoration. Pros, cons, costs, and expert recommendations to help you decide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/compare/cheap-vs-quality' },
};

export default function CheapvsQualityRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
        icon: <Scale className="h-12 w-12" />,
        title: 'Cheap vs Quality Restoration',
        subtitle: 'Make an Informed Decision',
      }}
      cta={{ text: 'Get Expert Advice', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare' },
        { label: 'Cheap vs Quality Restoration' },
      ]}
      sections={getCompareSections({ option1: 'Cheap', option2: 'Quality' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
