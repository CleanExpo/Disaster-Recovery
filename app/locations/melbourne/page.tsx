import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationPageContent, generateLocationSchemas } from '@/lib/location-content';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Melbourne | 24/7 Emergency Restoration VIC',
  description: 'Professional disaster recovery in Melbourne, Victoria. 578.3mm annual rainfall, flash flooding along Maribyrnong River, and bushfire risk in outer suburbs. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response for 4.9M+ residents.',
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/locations' },
  { label: 'Melbourne' },
];

export default function MelbourneLocationPage() {
  const content = getLocationPageContent('melbourne');
  if (!content) return null;

  const schemas = generateLocationSchemas(content.data, content.faqs, breadcrumbs);

  // All schema objects are built from trusted static JSON data — safe to stringify
  return (
    <>
      <script
        id="melbourne-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.service) }}
      />
      <script
        id="melbourne-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbList) }}
      />
      <script
        id="melbourne-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqPage) }}
      />
      <script
        id="melbourne-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.localBusiness) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Melbourne',
          subtitle: '24/7 Emergency Services in Melbourne, Victoria',
        }}
        cta={{ text: 'Emergency Response', href: '/claim' }}
        breadcrumbs={breadcrumbs}
        sections={content.sections}
        relatedPages={getRelatedPages('location-melbourne')}
      />
    </>
  );
}
