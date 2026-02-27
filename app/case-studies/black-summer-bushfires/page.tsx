import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCaseStudySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Black Summer Bushfire Restoration | Case Study | Disaster Recovery Success Story',
  description: 'How we helped recover from Black Summer Bushfire Restoration. Real results, timelines, and restoration process.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/case-studies/black-summer-bushfires',
  },
};

export default function BlackSummerBushfireRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: 'Black Summer Bushfire Restoration',
        subtitle: 'How we helped recover from Black Summer Bushfire Restoration. Real results, timelines, and restoration process.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Black Summer Bushfire Restoration' },
      ]}
      sections={getCaseStudySections({ incidentName: 'Black Summer Bushfires', details: '2019-2020 bushfire recovery across multiple states.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
