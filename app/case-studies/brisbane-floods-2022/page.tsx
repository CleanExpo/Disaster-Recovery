import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCaseStudySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Brisbane Floods 2022 Recovery | Case Study | Disaster Recovery Success Story',
  description: 'How we helped recover from Brisbane Floods 2022 Recovery. Real results, timelines, and restoration process.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/case-studies/brisbane-floods-2022',
  },
};

export default function BrisbaneFloods2022RecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: 'Brisbane Floods 2022 Recovery',
        subtitle: 'How we helped recover from Brisbane Floods 2022 Recovery. Real results, timelines, and restoration process.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Brisbane Floods 2022 Recovery' },
      ]}
      sections={getCaseStudySections({ incidentName: 'Brisbane Floods 2022 Recovery', details: 'South East Queensland flood restoration.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
