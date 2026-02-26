import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCaseStudySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Case Studies | Disaster Recovery Australia',
  description: 'Real disaster recovery case studies from across Australia. Bushfires, floods, cyclones, and storms — see how certified contractors restored properties.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/case-studies',
  },
  openGraph: {
    title: 'Case Studies | Disaster Recovery Australia',
    description: 'Real disaster recovery case studies from bushfires, floods, cyclones, and storms across Australia.',
    type: 'website',
  },
};

export default function CaseStudiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: 'Case studies',
        subtitle: '',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Case Studies' },
      ]}
      sections={getCaseStudySections({ incidentName: 'Disaster Recovery Case Studies', details: 'Real-world examples of our restoration work across Australia.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
