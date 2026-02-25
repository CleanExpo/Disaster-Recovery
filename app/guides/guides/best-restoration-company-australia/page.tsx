import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Best Restoration Companies in Australia: How to Choose | Disaster Recovery',
  description: 'Expert answers and solutions for "which restoration company is best in australia". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'which restoration company is best in australia, disaster recovery, restoration services, Australia, IICRC certified' };

export default function BestRestorationCompanyAustraliaPage() {
  return (
    <AgGuidePageTemplate
      category="Guides"
      title="Best Restoration Companies in Australia: How to Choose"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<BookOpen className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Guides', href: '/guides/guides' },
        { label: 'Best Restoration Companies in Australia: How to...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
