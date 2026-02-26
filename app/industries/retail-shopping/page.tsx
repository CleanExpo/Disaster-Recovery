import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getIndustrySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Retail & Shopping Centres Disaster Recovery | Specialised Industrial Restoration | Australia',
  description: 'Rapid restoration for retail stores and shopping centres to minimise business interruption. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
  keywords: ["retail disaster recovery","shopping centre restoration","store cleanup"]
};

export default function RetailShoppingCentersPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Retail & Shopping Centres Disaster Recovery',
        subtitle: 'Rapid restoration for retail stores and shopping centres to minimise business interruption. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries' },
        { label: 'Retail & Shopping Centres Disaster Recovery' },
      ]}
      sections={getIndustrySections({ industryName: 'Retail & Shopping', context: 'Disaster recovery for retail stores and shopping centres.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
