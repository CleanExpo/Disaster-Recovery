import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCertificationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'WorkSafe Certified | Safety compliance',
  description: 'WorkSafe Certified restoration services. Safety compliance. Qualified, certified, and compliant disaster recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/certifications/worksafe-certified',
  },
};

export default function WorkSafeCertifiedPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
        icon: <Award className="h-12 w-12" />,
        title: 'WorkSafe Certified',
        subtitle: 'Safety compliance',
      }}
      cta={{ text: 'View Services', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'WorkSafe Certified' },
      ]}
      sections={getCertificationSections({ certName: 'WorkSafe Certification', body: 'Current workplace health and safety compliance.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
