import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getDisasterSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Bushfire & Smoke Damage Services | 24/7 Online Emergency Response | Disaster Recovery',
  description: 'Complete bushfire recovery including smoke damage, soot removal, and structural restoration. Serving NSW, Victoria, South Australia, Tasmania, Western Australia. Immediate response time.',
  keywords: ["bushfire restoration","smoke damage cleanup","fire recovery"],
  alternates: { canonical: 'https://disasterrecovery.com.au/disasters/bushfire-restoration' },
};

export default function BushfireSmokeDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Bushfire & Smoke Damage',
        subtitle: 'Complete bushfire recovery including smoke damage, soot removal, and structural restoration',
      }}
      cta={{ text: 'Emergency Response', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Disasters', href: '/disasters' },
        { label: 'Bushfire & Smoke Damage' },
      ]}
      sections={getDisasterSections({ disasterType: 'Bushfire', description: 'Complete bushfire recovery including smoke damage, soot removal, and structural restoration.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
