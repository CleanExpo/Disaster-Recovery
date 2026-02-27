import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hotel & Accommodation Disaster Recovery | $2200',
  description: 'Minimal disruption disaster recovery for hotels and accommodation providers. Immediate response. 100% insurance coverage.',
  keywords: ["hotel disaster recovery","accommodation restoration","hospitality damage"],
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/hotels-accommodation' },
};

export default function HotelAccommodationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Hotel & Accommodation Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Hotel & Accommodation Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Hotels & Accommodation', description: 'Hospitality disaster recovery minimising guest disruption.' })}
      relatedPages={getRelatedPages('commercial')}
    />
  );
}
