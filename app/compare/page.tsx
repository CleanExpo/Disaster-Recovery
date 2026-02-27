import { Metadata } from 'next';
import Script from 'next/script';
import { Scale } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import ChildPageGrid from '@/components/seo/ChildPageGrid';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Compare Restoration Options',
  description: 'Compare disaster recovery options side by side. DIY vs professional, insurance vs cash, local vs national, and more.',
  url: 'https://disasterrecovery.com.au/compare',
  isPartOf: { '@type': 'WebSite', '@id': 'https://disasterrecovery.com.au/#website' },
};

export const metadata: Metadata = {
  title: 'Compare Restoration Options | Informed Choices',
  description: 'Compare disaster recovery options side by side. DIY vs professional, insurance vs cash, local vs national, and more. Make the right choice for your situation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/compare' },
};

export default function ComparePage() {
  const schemaStr = JSON.stringify(pageSchema);
  return (
    <>
    <Script id="compare-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
        icon: <Scale className="h-12 w-12" />,
        title: 'Disaster Recovery Comparisons',
        subtitle: 'Compare disaster recovery options side by side. DIY vs professional, insurance vs cash, local vs national — make the right choice for your situation.',
      }}
      cta={{ text: 'Get Expert Advice', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Compare' },
      ]}
      sections={[
        {
          heading: 'Comparison Guides',
          body: <ChildPageGrid category="compare" />,
        },
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
    </>
  );
}
