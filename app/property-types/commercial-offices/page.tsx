import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getPropertyTypeSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Commercial Office Disaster Recovery | $2200',
  description: 'Business continuity focused disaster recovery for offices and commercial spaces. 30 minutes priority response. 100% insurance coverage.',
  keywords: ["commercial disaster recovery","office flood restoration","business continuity"],
  alternates: { canonical: 'https://disasterrecovery.com.au/property-types/commercial-offices' },
};

export default function CommercialOfficePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Commercial Office Disaster Recovery',
        subtitle: 'Insurance Coverage',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Property Types', href: '/property-types' },
        { label: 'Commercial Office Disaster Recovery' },
      ]}
      sections={getPropertyTypeSections({ propertyType: 'Commercial Offices', description: 'Office building disaster recovery with business continuity focus.' })}
      relatedPages={getRelatedPages('commercial')}
    />
  );
}
