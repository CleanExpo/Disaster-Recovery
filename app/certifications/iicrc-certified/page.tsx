import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCertificationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'IICRC Certified | International restoration standard',
  description: 'IICRC Certified restoration services. International restoration standard. Qualified, certified, and compliant disaster recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/certifications/iicrc-certified',
  },
};

export default function IICRCCertifiedPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
        icon: <Award className="h-12 w-12" />,
        title: 'IICRC Certified',
        subtitle: 'International restoration standard',
      }}
      cta={{ text: 'View Services', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'IICRC Certified' },
      ]}
      sections={getCertificationSections({ certName: 'IICRC Certification', body: 'The international gold standard for restoration professionals.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
