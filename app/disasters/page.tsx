import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getDisasterSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import ChildPageGrid from '@/components/seo/ChildPageGrid';

export const metadata: Metadata = {
  title: 'Disaster Types & Emergency Response',
  description: 'Comprehensive disaster recovery for all types of natural disasters in Australia. Cyclones, bushfires, floods, storms, and more.',
  alternates: { canonical: 'https://disasterrecovery.com.au/disasters' },
};

export default function DisastersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: "Disaster Types & Emergency Response",
        subtitle: "Comprehensive disaster recovery for all types of natural disasters in Australia. Cyclones, bushfires, floods, storms, and more.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Disaster Types & Emergency Response" },
      ]}
      sections={[
        {
          heading: 'Australian Disaster Types',
          body: <ChildPageGrid category="disasters" />,
        },
        ...getDisasterSections({ disasterType: 'Natural Disaster', description: 'Comprehensive recovery services for all Australian disaster types.' }),
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
