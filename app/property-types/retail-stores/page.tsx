import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Retail Store Disaster Recovery | Commercial Properties | $2200 Minimum',
  description: 'Rapid disaster recovery to minimise retail business interruption. 30 minutes priority response. 100% insurance coverage.',
  keywords: ["retail disaster recovery","shop flood damage","store restoration"]
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/retail-stores' },
};

export default function RetailStorePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Retail Store Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Assessment', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Retail Store Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Retail Stores', description: 'Retail property disaster recovery with rapid turnaround.' })}
      relatedPages={getRelatedPages('commercial')}
    />
  );
}
