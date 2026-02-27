import { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCompareSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Professional vs DIY Disaster Recovery',
  description: 'Compare professional disaster recovery vs DIY attempts. Understand the real costs, risks, and why professional restoration saves money.',
  alternates: { canonical: 'https://disasterrecovery.com.au/compare/professional-vs-diy' },
};

export default function ProfessionalVsDIYPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #581C87 0%, #7E22CE 100%)',
        icon: <Scale className="h-12 w-12" />,
        title: 'Professional vs DIY Restoration',
        subtitle: 'DIY attempts void insurance in 73% of cases',
      }}
      cta={{ text: 'Get Expert Advice', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare' },
        { label: 'Professional vs DIY Restoration' },
      ]}
      sections={getCompareSections({ option1: 'Professional', option2: 'DIY' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
