import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Carpet Mould Remediation',
  description: 'Professional carpet mould remediation services across Australia. 24/7 emergency response for mouldy carpet, underlay mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/carpet-mould',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can mouldy carpet be cleaned or does it need to be replaced?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Carpet that has been wet for more than 24-48 hours with Category 1 (clean) water and shows early surface mould may be restorable with professional extraction, antifungal treatment, and drying. Carpet wet with Category 2 or 3 water (grey or black water) cannot be decontaminated to a safe standard and must be disposed of. Carpet that has developed mould through the backing and underlay is not restorable regardless of water category and requires full removal.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you remove mould from carpet safely?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG technicians use containment to prevent spore spread, HEPA vacuuming of the surface, truck-mounted extraction with antifungal solution, and high-velocity drying. If the mould has penetrated the backing or underlay, the carpet is removed and disposed of as biological waste. The subfloor is treated with antifungal before new flooring is installed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is mouldy carpet covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Carpet mould following a water damage event (burst pipe, flood, roof leak) that is a covered loss is claimable under home or contents insurance. The key factors are the cause of the water event and whether the response was timely. Mould resulting from delayed drying or pre-existing moisture problems may not be covered. We document the incident timeline, cause, and drying response to support your claim.',
      },
    }
  ],
});

export default function CarpetMouldRemediationPage() {
  return (
    <>
      <Script id="carpet-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Carpet Mould Remediation',
        subtitle: 'Professional carpet mould remediation services across Australia. 24/7 emergency response for mouldy carpet, underlay mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Carpet Mould Remediation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Carpet Mould Remediation', parentCategory: 'Mould Remediation', context: 'carpet and underlay mould treatment' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
