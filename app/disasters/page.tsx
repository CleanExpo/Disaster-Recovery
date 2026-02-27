import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getDisasterSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import ChildPageGrid from '@/components/seo/ChildPageGrid';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Disaster Types & Emergency Response',
  description: 'Comprehensive disaster recovery for all types of natural disasters in Australia. Cyclones, bushfires, floods, storms, and more.',
  url: 'https://disasterrecovery.com.au/disasters',
  isPartOf: { '@type': 'WebSite', '@id': 'https://disasterrecovery.com.au/#website' },
};

export const metadata: Metadata = {
  title: 'Disaster Types & Emergency Response',
  description: 'Comprehensive disaster recovery for all types of natural disasters in Australia. Cyclones, bushfires, floods, storms, and more.',
  alternates: { canonical: 'https://disasterrecovery.com.au/disasters' },
};

export default function DisastersPage() {
  const schemaStr = JSON.stringify(pageSchema);
  return (
    <>
    <Script id="disasters-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
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
    </>
  );
}
