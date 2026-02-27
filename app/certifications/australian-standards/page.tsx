import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCertificationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Australian Standards Compliant | AS/NZS compliance',
  description: 'Australian Standards Compliant restoration services. AS/NZS compliance. Qualified, certified, and compliant disaster recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/certifications/australian-standards',
  },
};

export default function AustralianStandardsCompliantPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
        icon: <Award className="h-12 w-12" />,
        title: 'Australian Standards Compliant',
        subtitle: 'AS/NZS compliance',
      }}
      cta={{ text: 'View Services', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'Australian Standards Compliant' },
      ]}
      sections={getCertificationSections({ certName: 'Australian Standards Compliance', body: 'Meeting all relevant Australian Standards for restoration.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
