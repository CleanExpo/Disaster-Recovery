import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCertificationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Asbestos Removal Licensed | Class A & B asbestos | Disaster Recovery',
  description: 'Asbestos Removal Licensed restoration services. Class A & B asbestos. Qualified, certified, and compliant disaster recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/certifications/asbestos-licensed',
  },
};

export default function AsbestosRemovalLicensedPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
        icon: <Award className="h-12 w-12" />,
        title: 'Asbestos Removal Licensed',
        subtitle: 'Class A & B asbestos',
      }}
      cta={{ text: 'View Services', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'Asbestos Removal Licensed' },
      ]}
      sections={getCertificationSections({ certName: 'Asbestos Licence', body: 'Licensed asbestos identification, management, and removal.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
