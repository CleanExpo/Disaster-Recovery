import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getIndustrySections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Education & Schools Disaster Recovery',
  description: 'School and university disaster recovery with minimal disruption to learning. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
  keywords: ["school disaster recovery","university restoration","education facility cleanup"],
  alternates: { canonical: 'https://disasterrecovery.com.au/industries/education-schools' },
};

export default function EducationSchoolsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Education & Schools Disaster Recovery',
        subtitle: 'School and university disaster recovery with minimal disruption to learning. 24/7 emergency response, IICRC-certified, minimal downtime guaranteed.',
      }}
      cta={{ text: 'Get Industry Quote', href: '/quote' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries' },
        { label: 'Education & Schools Disaster Recovery' },
      ]}
      sections={getIndustrySections({ industryName: 'Education & Schools', context: 'Disaster recovery for schools, universities, and educational facilities.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
