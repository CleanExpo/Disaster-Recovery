import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Mould Remediation Services | IICRC S520 Certified',
  description: 'Professional mould remediation services following IICRC S520 standards. Black mould removal, toxic mould cleanup, mould testing & inspection. Licensed technicians available 24/7.',
  keywords: [
    'mould remediation',
    'black mould removal',
    'mould removal services',
    'toxic mould cleanup',
    'IICRC S520 certified',
    'mould inspection',
    'mould testing',
    'mould remediation company',
    'professional mould removal',
    'mould contamination cleanup',
    'indoor air quality',
    'mould spore removal',
    'mould damage restoration',
    'certified mould specialists',
    'microbial remediation'
  ],
  openGraph: {
    title: 'Professional Mould Remediation | IICRC S520 Certified Specialists',
    description: 'Expert mould remediation services following IICRC S520 standards. Comprehensive black mould removal and toxic mould cleanup with 24/7 emergency response.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mould Remediation Services | IICRC S520 Certified',
    description: 'Expert mould remediation services. IICRC S520 certified technicians. Professional black mould removal available 24/7.',
  },
  alternates: {
    canonical: '/services/mould-remediation' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

export default function MoldRemediationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Mould Remediation Services',
        subtitle: 'Professional mould remediation services following IICRC S520 standards. Black mould removal, toxic mould cleanup, mould testing & inspection. Licensed technicians available 24/7.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Mould Remediation Services', parentCategory: 'Mould Remediation', context: 'IICRC S520 certified black mould removal and toxic mould cleanup' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
