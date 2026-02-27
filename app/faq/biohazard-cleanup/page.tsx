import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getFAQSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'biohazard cleanup FAQ | Common Questions Answered | Expert Guide',
  description: 'Everything you need to know about biohazard cleanup. Expert answers to common questions, tips, and advice.',
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/biohazard-cleanup' },
};

export default function biohazardcleanupFAQPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: 'Biohazard cleanup FAQ',
        subtitle: 'Common questions and expert answers',
      }}
      cta={{ text: 'Get Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Biohazard Cleanup' },
      ]}
      sections={getFAQSections({ topic: 'biohazard-cleanup' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
