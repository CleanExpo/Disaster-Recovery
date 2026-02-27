import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Heritage Buildings Disaster Recovery',
  description: 'Specialised disaster recovery for heritage buildings. Protected and historical properties. IICRC-certified, 24/7 response.',
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/heritage' },
};

export default function HeritageBuildingsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Heritage Buildings Disaster Recovery',
        subtitle: 'Protected and historical properties',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Heritage Buildings Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Heritage Properties', description: 'Conservation-grade disaster recovery for heritage-listed buildings.' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
