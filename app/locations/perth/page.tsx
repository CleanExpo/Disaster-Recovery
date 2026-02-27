import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationPageContent, generateLocationSchemas } from '@/lib/location-content';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Perth | 24/7 Emergency WA',
  description: 'Professional disaster recovery in Perth, Western Australia. Bushfire risk in Hills suburbs (BAL-29), 726.9mm annual rainfall, and cyclone awareness. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/perth',
  },
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/locations' },
  { label: 'Perth' },
];

export default function PerthLocationPage() {
  const content = getLocationPageContent('perth');
  if (!content) return null;

  const schemas = generateLocationSchemas(content.data, content.faqs, breadcrumbs);

  // All schema objects are built from trusted static JSON data — safe to stringify
  return (
    <>
      <script
        id="perth-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.service) }}
      />
      <script
        id="perth-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbList) }}
      />
      <script
        id="perth-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqPage) }}
      />
      <script
        id="perth-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.localBusiness) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Perth',
          subtitle: '24/7 Emergency Services in Perth, Western Australia',
        }}
        cta={{ text: 'Emergency Response', href: '/claim' }}
        breadcrumbs={breadcrumbs}
        sections={content.sections}
        relatedPages={getRelatedPages('location-perth')}
      />
    </>
  );
}
