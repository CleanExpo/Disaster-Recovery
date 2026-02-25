import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Contents Pack Out & Storage During Restoration | Disaster Recovery',
  description: 'Expert answers and solutions for "contents pack out storage restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'contents pack out storage restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function ContentsPackOutStoragePage() {
  return (
    <AgGuidePageTemplate
      category="Services"
      title="Contents Pack Out & Storage During Restoration"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<Wrench className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Services', href: '/guides/services' },
        { label: 'Contents Pack Out & Storage During Restoration' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
