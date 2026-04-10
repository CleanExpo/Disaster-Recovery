import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Commercial Mould Remediation',
  description: 'Professional commercial mould remediation services across Australia. 24/7 emergency response for office mould, workplace mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/commercial-mould',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are an employer\'s obligations when mould is found in a commercial workplace?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the Work Health and Safety Act 2011 (Cth) and state equivalents, employers must provide a safe working environment. Discovery of significant mould in a workplace triggers a duty to assess the risk, control the hazard, and notify affected workers. The property may need to be partially or fully vacated during remediation. NRPG provides IICRC S520:2025-compliant clearance documentation required for WorkSafe and WHS compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you remediate mould in a commercial building without closing the business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG establishes containment zones with negative air pressure to isolate affected areas from operational spaces. HEPA air scrubbers maintain air quality in occupied zones. Intensive work is scheduled outside business hours. A staged remediation plan allows operations to continue in unaffected areas. The business continuity approach is developed with your facilities and WHS teams before work commences.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documentation do insurers require for commercial mould claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial insurers require: IICRC S520:2025 certified assessment report with identified moisture source; scope of works with line-item costings; photographic evidence of extent and severity; moisture readings pre- and post-remediation; air quality test results; and clearance report post-remediation. NRPG provides all required documentation in insurer-ready format to expedite claim approval.',
      },
    }
  ],
});

export default function CommercialMouldRemediationPage() {
  return (
    <>
      <Script id="commercial-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Commercial Mould Remediation',
        subtitle: 'Professional commercial mould remediation services across Australia. 24/7 emergency response for office mould, workplace mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Commercial Mould Remediation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Commercial Mould Remediation', parentCategory: 'Mould Remediation', context: 'office and workplace mould removal' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
