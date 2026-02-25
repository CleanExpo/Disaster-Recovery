import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Crawl Space Mould Treatment | Disaster Recovery',
  description: 'Professional crawl space mould treatment services in Queensland. 24/7 emergency response for subfloor mould, under house mould.',
};

export default function CrawlSpaceMouldTreatmentPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Crawl Space Mould Treatment',
        subtitle: 'Professional crawl space mould treatment services in Queensland. 24/7 emergency response for subfloor mould, under house mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Crawl Space Mould Treatment' },
      ]}
    />
  );
}
