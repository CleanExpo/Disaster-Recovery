import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getFAQSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'sewage cleanup FAQ | Common Questions Answered | Expert Guide',
  description: 'Everything you need to know about sewage cleanup. Expert answers to common questions, tips, and advice.',
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/sewage-cleanup' },
};

export default function sewagecleanupFAQPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: 'Sewage cleanup FAQ',
        subtitle: 'Common questions and expert answers',
      }}
      cta={{ text: 'Get Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Sewage Cleanup' },
      ]}
      sections={getFAQSections({ topic: 'sewage-cleanup' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
