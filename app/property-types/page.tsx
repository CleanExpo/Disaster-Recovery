import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import ChildPageGrid from '@/components/seo/ChildPageGrid';

export const metadata: Metadata = {
  title: 'Property Type Disaster Recovery',
  description: 'Specialised disaster recovery for all property types. Residential homes, commercial offices, strata properties, government facilities.',
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types' },
};

export default function PropertyTypesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: "Property Type Disaster Recovery",
        subtitle: "Specialised disaster recovery for all property types. Residential homes, commercial offices, strata properties, government facilities.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Property Type Disaster Recovery" },
      ]}
      sections={[
        {
          heading: 'All Property Types',
          body: <ChildPageGrid category="property-types" />,
        },
        ...getPropertyTypeSections({ propertyType: 'All Property Types', description: 'Disaster recovery for every type of property across Australia.' }),
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
