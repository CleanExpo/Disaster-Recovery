import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCaseStudySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Townsville Floods 2019 | Case Study | Disaster Recovery Success Story',
  description: 'How we helped recover from Townsville Floods 2019. Real results, timelines, and restoration process.' };

export default function TownsvilleFloods2019Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: 'Townsville Floods 2019',
        subtitle: 'How we helped recover from Townsville Floods 2019. Real results, timelines, and restoration process.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Townsville Floods 2019' },
      ]}
      sections={getCaseStudySections({ incidentName: 'Townsville Floods 2019', details: 'Monsoonal flooding recovery in Townsville.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
