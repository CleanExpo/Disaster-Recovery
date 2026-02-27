import { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getFAQSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'flood restoration FAQ | Common Questions Answered',
  description: 'Everything you need to know about flood restoration. Expert answers to common questions, tips, and advice.',
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/flood-restoration' },
};

export default function floodrestorationFAQPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: 'Flood restoration FAQ',
        subtitle: 'Common questions and expert answers',
      }}
      cta={{ text: 'Get Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Flood Restoration' },
      ]}
      sections={getFAQSections({ topic: 'flood-restoration' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
