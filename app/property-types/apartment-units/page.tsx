import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Apartment & Unit Disaster Recovery | Residential Properties | $2200 Minimum',
  description: 'Specialised disaster recovery for apartments, units, and high-rise residences. 30-45 minutes response. 95% insurance coverage.',
  keywords: ["apartment water damage","unit flood recovery","high rise restoration"]
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/apartment-units' },
};

export default function ApartmentUnitPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Apartment & Unit Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Apartment & Unit Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Apartment Units', description: 'Multi-unit residential disaster recovery specialists.' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
