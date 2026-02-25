import { Metadata } from 'next';
import { Users } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Builder vs Restorer: The $15,000 Difference | Professional Restoration | Disaster Recovery',
  description: 'Why builders "rip and tear" what professional restorers save. Understand the methodology difference that can save thousands and reduce waste by 70%. 28 years industry experience.',
  keywords: 'builder vs restorer, professional restoration, rip and tear vs restore, mitigation vs demolition, restoration methodology, waste reduction',
  openGraph: {
    title: 'Builder vs Restorer: The Professional Difference That Saves Thousands',
    description: 'Restore what can be saved. Replace only what cannot be restored.',
    images: ['/images/builder-vs-restorer.jpg'] } };

export default function BuilderVsRestorerPage() {
  return (
    <AgGuidePageTemplate
      category="Professional"
      title="Builder vs Restorer: The $15,000 Difference"
      subtitle="Why builders"
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Users className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Professional', href: '/guides/professional' },
        { label: 'Builder vs Restorer: The $15,000 Difference' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
