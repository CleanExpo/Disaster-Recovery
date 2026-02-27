import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getIndustrySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import ChildPageGrid from '@/components/seo/ChildPageGrid';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Industry-Specific Disaster Recovery',
  description: 'Specialised disaster recovery services for all Australian industries. Mining, healthcare, education, retail, agriculture, and more.',
  url: 'https://disasterrecovery.com.au/industries',
  isPartOf: { '@type': 'WebSite', '@id': 'https://disasterrecovery.com.au/#website' },
};

export const metadata: Metadata = {
  title: 'Industry-Specific Disaster Recovery',
  description: 'Specialised disaster recovery services for all Australian industries. Mining, healthcare, education, retail, agriculture, and more.',
  alternates: { canonical: 'https://disasterrecovery.com.au/industries' },
};

export default function IndustriesPage() {
  const schemaStr = JSON.stringify(pageSchema);
  return (
    <>
    <Script id="industries-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Industry-Specific Disaster Recovery',
        subtitle: 'Specialised disaster recovery services for all Australian industries. Mining, healthcare, education, retail, agriculture, and more.',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries' },
      ]}
      sections={[
        {
          heading: 'Industry Sectors We Serve',
          body: <ChildPageGrid category="industries" />,
        },
        ...getIndustrySections({ industryName: 'All Industries', context: 'Disaster recovery services tailored to every industry sector.' }),
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
    </>
  );
}
