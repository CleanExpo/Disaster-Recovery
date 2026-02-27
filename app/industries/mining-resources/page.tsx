import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getIndustrySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Mining & Resources Disaster Recovery',
  description: 'Specialised disaster recovery for mining operations, processing plants, and resource facilities. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
  keywords: ["mining disaster recovery","mine site restoration","processing plant cleanup"],
  alternates: { canonical: 'https://disasterrecovery.com.au/industries/mining-resources' },
};

export default function MiningResourcesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Mining & Resources Disaster Recovery',
        subtitle: 'Specialised disaster recovery for mining operations, processing plants, and resource facilities. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
      }}
      cta={{ text: 'Get Cost Estimate', href: '/tools/cost-estimator' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries' },
        { label: 'Mining & Resources Disaster Recovery' },
      ]}
      sections={getIndustrySections({ industryName: 'Mining & Resources', context: 'Disaster recovery for mining operations and resource facilities.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
