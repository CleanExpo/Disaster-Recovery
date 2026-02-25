import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getDisasterSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Major Flood Recovery Services | 24/7 Online Emergency Response | Disaster Recovery',
  description: 'Comprehensive flood damage restoration, water extraction, and mould prevention. Serving Queensland, Northern NSW, Victoria. 1-2 hours response time.',
  keywords: ["flood recovery","water damage restoration","flood cleanup"]
};

export default function MajorFloodRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Major Flood Recovery',
        subtitle: 'Comprehensive flood damage restoration, water extraction, and mould prevention',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Disasters', href: '/disasters' },
        { label: 'Major Flood Recovery' },
      ]}
      sections={getDisasterSections({ disasterType: 'Flood', description: 'Specialist flood recovery including water extraction, drying, and mould prevention.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
