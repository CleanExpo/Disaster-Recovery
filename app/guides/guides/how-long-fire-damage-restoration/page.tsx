import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Timeline: What to Expect | Disaster Recovery',
  description: 'Expert answers and solutions for "how long does fire damage restoration take". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'how long does fire damage restoration take, disaster recovery, restoration services, Australia, IICRC certified' };

export default function HowLongFireDamageRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Guides"
      title="Fire Damage Restoration Timeline: What to Expect"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<BookOpen className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Guides', href: '/guides/guides' },
        { label: 'Fire Damage Restoration Timeline: What to Expect' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
