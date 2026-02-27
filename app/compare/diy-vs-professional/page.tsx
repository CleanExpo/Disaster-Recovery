import { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCompareSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'DIY vs Professional Restoration | Comparison Guide | Make the Right Choice',
  description: 'Compare diy vs professional restoration. Pros, cons, costs, and expert recommendations to help you decide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/compare/diy-vs-professional' },
};

export default function DIYvsProfessionalRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
        icon: <Scale className="h-12 w-12" />,
        title: 'DIY vs Professional Restoration',
        subtitle: 'Make an Informed Decision',
      }}
      cta={{ text: 'Get Expert Advice', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare' },
        { label: 'DIY vs Professional Restoration' },
      ]}
      sections={getCompareSections({ option1: 'DIY', option2: 'Professional' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
