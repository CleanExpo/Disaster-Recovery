import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationPageContent, generateLocationSchemas } from '@/lib/location-content';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Brisbane | 24/7 Emergency Restoration QLD',
  description: 'Professional disaster recovery in Brisbane, Queensland. 997.7mm annual rainfall, 2011 and 2022 flood history, subtropical mould risk. IICRC-certified contractors for water damage, fire damage, mould remediation. 24/7 emergency response across Brookwater, Eagle Farm, Indooroopilly and all suburbs.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/brisbane',
  },
};

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/locations' },
  { label: 'Brisbane' },
];

export default function BrisbaneLocationPage() {
  const content = getLocationPageContent('brisbane');
  if (!content) return null;

  const schemas = generateLocationSchemas(content.data, content.faqs, breadcrumbs);

  // All schema objects are built from trusted static JSON data — safe to stringify
  return (
    <>
      <script
        id="brisbane-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.service) }}
      />
      <script
        id="brisbane-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbList) }}
      />
      <script
        id="brisbane-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqPage) }}
      />
      <script
        id="brisbane-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.localBusiness) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Brisbane',
          subtitle: '24/7 Emergency Services in Brisbane, Queensland',
        }}
        cta={{ text: 'Emergency Response', href: '/claim' }}
        breadcrumbs={breadcrumbs}
        sections={content.sections}
        relatedPages={getRelatedPages('location-brisbane')}
      />
    </>
  );
}
