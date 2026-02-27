import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getIndustrySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Healthcare & Medical Disaster Recovery',
  description: 'Critical disaster recovery for hospitals, clinics, aged care, and medical centres. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
  keywords: ["hospital disaster recovery","medical facility restoration","healthcare cleanup"],
  alternates: { canonical: 'https://disasterrecovery.com.au/industries/healthcare-medical' },
};

export default function HealthcareMedicalFacilitiesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Healthcare & Medical Facilities Disaster Recovery',
        subtitle: 'Critical disaster recovery for hospitals, clinics, aged care, and medical centres. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries' },
        { label: 'Healthcare & Medical Facilities Disaster Recovery' },
      ]}
      sections={getIndustrySections({ industryName: 'Healthcare & Medical', context: 'Critical disaster recovery for hospitals, clinics, and medical centres.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
