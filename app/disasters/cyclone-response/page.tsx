import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getDisasterSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Cyclone Damage Recovery Services | 24/7 Online Emergency Response | Disaster Recovery',
  description: 'Expert cyclone damage restoration including structural repairs, water extraction, and debris removal. Serving Far North Queensland, Northern Territory, North Western Australia. 2-4 hours response time.',
  keywords: ["cyclone damage","tropical storm recovery","wind damage repair"]
};

export default function CycloneDamageRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Cyclone Damage Recovery',
        subtitle: 'Expert cyclone damage restoration including structural repairs, water extraction, and debris removal',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Disasters', href: '/disasters' },
        { label: 'Cyclone Damage Recovery' },
      ]}
      sections={getDisasterSections({ disasterType: 'Cyclone', description: 'Cyclone damage response and restoration for wind, rain, and storm surge damage.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
