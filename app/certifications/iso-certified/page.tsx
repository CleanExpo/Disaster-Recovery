import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCertificationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'ISO Certified | Quality management | Disaster Recovery',
  description: 'ISO Certified restoration services. Quality management. Qualified, certified, and compliant disaster recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/certifications/iso-certified',
  },
};

export default function ISOCertifiedPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #312E81 0%, #4338CA 100%)',
        icon: <Award className="h-12 w-12" />,
        title: 'ISO Certified',
        subtitle: 'Quality management',
      }}
      cta={{ text: 'View Services', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'ISO Certified' },
      ]}
      sections={getCertificationSections({ certName: 'ISO Certification', body: 'International quality management and environmental standards.' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
