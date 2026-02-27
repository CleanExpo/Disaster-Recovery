import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getIndustrySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hospitality & Tourism Disaster Recovery',
  description: 'Hotel, resort, and tourism facility disaster recovery nationwide. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
  keywords: ["hotel disaster recovery","resort restoration","tourism facility cleanup"],
  alternates: { canonical: 'https://disasterrecovery.com.au/industries/hospitality-tourism' },
};

export default function HospitalityTourismPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Hospitality & Tourism Disaster Recovery',
        subtitle: 'Hotel, resort, and tourism facility disaster recovery nationwide. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries' },
        { label: 'Hospitality & Tourism Disaster Recovery' },
      ]}
      sections={getIndustrySections({ industryName: 'Hospitality & Tourism', context: 'Disaster recovery for hotels, restaurants, and tourism facilities.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
