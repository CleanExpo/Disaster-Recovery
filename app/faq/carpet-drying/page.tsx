import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getFAQSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'carpet drying FAQ | Common Questions Answered | Expert Guide',
  description: 'Everything you need to know about carpet drying. Expert answers to common questions, tips, and advice.',
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/carpet-drying' },
};

export default function carpetdryingFAQPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: 'Carpet drying FAQ',
        subtitle: 'Common questions and expert answers',
      }}
      cta={{ text: 'Get Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Carpet Drying' },
      ]}
      sections={getFAQSections({ topic: 'carpet-drying' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
