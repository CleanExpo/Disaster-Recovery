import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCertificationSections } from '@/lib/content-sections';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Mandatory OH&S training and industry certifications for Disaster Recovery contractors. IICRC, WorkSafe, ISO, HAZMAT, and asbestos licensing requirements.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/certifications',
  },
  openGraph: {
    title: 'Certifications',
    description: 'Mandatory OH&S training and certifications for Disaster Recovery contractors.',
    type: 'website',
  },
};

export default function CertificationsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
        icon: <Award className="h-12 w-12" />,
        title: "Certifications",
        subtitle: "Mandatory OH&S training and industry certifications required for all Disaster Recovery contractors. IICRC, WorkSafe, ISO, HAZMAT, and asbestos licensing.",
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Certifications" },
      ]}
      sections={getCertificationSections({ certName: 'Professional Certifications', body: 'Our network maintains the highest industry certifications.' })}
      relatedPages={[
        { title: 'Minimum Training Requirements', href: '/certifications/minimum-training-requirements', description: 'Mandatory OH&S training courses for all site technicians.' },
        { title: 'IICRC Certification', href: '/certifications/iicrc-certified', description: 'The international gold standard for restoration professionals.' },
        { title: 'HAZMAT Certification', href: '/certifications/hazmat-certified', description: 'Hazardous materials handling credentials and requirements.' },
        { title: 'WorkSafe Certification', href: '/certifications/worksafe-certified', description: 'State-specific workplace health and safety accreditation.' },
        { title: 'Asbestos Licensing', href: '/certifications/asbestos-licensed', description: 'Asbestos handling and removal licensing requirements.' },
        { title: 'Australian Standards', href: '/certifications/australian-standards', description: 'Compliance with AS/NZS standards for restoration work.' },
      ]}
    />
  );
}
