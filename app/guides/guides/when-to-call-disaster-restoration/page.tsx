import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'When to Call Professional Disaster Restoration Services | Disaster Recovery',
  description: 'Expert answers and solutions for "when to call professional disaster restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'when to call professional disaster restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function WhenToCallDisasterRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Guides"
      title="When to Call Professional Disaster Restoration Services"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<BookOpen className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Guides', href: '/guides/guides' },
        { label: 'When to Call Professional Disaster Restoration ...' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
