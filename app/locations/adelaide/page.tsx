import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationPageContent, generateLocationSchemas } from '@/lib/location-content';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Adelaide | 24/7',
  description: 'Professional disaster recovery in Adelaide, South Australia. Bushfire risk in Hills Face Zone (BAL-29+), 526.5mm annual rainfall, heritage stone building specialists. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/adelaide',
  },
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/locations' },
  { label: 'Adelaide' },
];

export default function AdelaideLocationPage() {
  const content = getLocationPageContent('adelaide');
  if (!content) return null;

  const schemas = generateLocationSchemas(content.data, content.faqs, breadcrumbs);

  // All schema objects are built from trusted static JSON data — safe to stringify
  return (
    <>
      <script
        id="adelaide-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.service) }}
      />
      <script
        id="adelaide-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbList) }}
      />
      <script
        id="adelaide-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqPage) }}
      />
      <script
        id="adelaide-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.localBusiness) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Adelaide',
          subtitle: '24/7 Emergency Services in Adelaide, South Australia',
        }}
        cta={{ text: 'Emergency Response', href: '/claim' }}
        breadcrumbs={breadcrumbs}
        sections={content.sections}
        relatedPages={getRelatedPages('location-adelaide')}
      />
    </>
  );
}
