import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getFAQSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'odour removal FAQ | Common Questions Answered | Expert Guide',
  description: 'Everything you need to know about odour removal. Expert answers to common questions, tips, and advice.',
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/odour-removal' },
};

export default function odourremovalFAQPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: 'Odour removal FAQ',
        subtitle: 'Common questions and expert answers',
      }}
      cta={{ text: 'Get Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Odour Removal' },
      ]}
      sections={getFAQSections({ topic: 'odour-removal' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
