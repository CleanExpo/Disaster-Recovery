import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getDisasterSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Coastal & Storm Surge Damage Services | 24/7 Online Emergency Response | Disaster Recovery',
  description: 'Specialised coastal property restoration from storm surge, king tides, and erosion damage. Serving All Coastal Areas. 2-4 hours response time.',
  keywords: ["coastal damage","storm surge recovery","beach erosion repair"]
};

export default function CoastalStormSurgeDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Coastal & Storm Surge Damage',
        subtitle: 'Specialised coastal property restoration from storm surge, king tides, and erosion damage',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Disasters', href: '/disasters' },
        { label: 'Coastal & Storm Surge Damage' },
      ]}
      sections={getDisasterSections({ disasterType: 'Coastal Erosion', description: 'Property restoration and protection from coastal erosion damage.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
