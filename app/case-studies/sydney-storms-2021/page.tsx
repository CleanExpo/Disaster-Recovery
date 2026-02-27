import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCaseStudySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Sydney Storms 2021 | Case Study | Disaster Recovery Success Story',
  description: 'How we helped recover from Sydney Storms 2021. Real results, timelines, and restoration process.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/case-studies/sydney-storms-2021',
  },
};

export default function SydneyStorms2021Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: 'Sydney Storms 2021',
        subtitle: 'How we helped recover from Sydney Storms 2021. Real results, timelines, and restoration process.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Sydney Storms 2021' },
      ]}
      sections={getCaseStudySections({ incidentName: 'Sydney Storms 2021', details: 'Greater Sydney severe storm water damage restoration.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
