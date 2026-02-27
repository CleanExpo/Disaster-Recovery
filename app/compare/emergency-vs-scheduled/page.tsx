import { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCompareSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency vs Scheduled Service | Comparison Guide | Make the Right Choice',
  description: 'Compare emergency vs scheduled service. Pros, cons, costs, and expert recommendations to help you decide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/compare/emergency-vs-scheduled' },
};

export default function EmergencyvsScheduledServicePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
        icon: <Scale className="h-12 w-12" />,
        title: 'Emergency vs Scheduled Service',
        subtitle: 'Make an Informed Decision',
      }}
      cta={{ text: 'Get Expert Advice', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare' },
        { label: 'Emergency vs Scheduled Service' },
      ]}
      sections={getCompareSections({ option1: 'Emergency', option2: 'Scheduled' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
