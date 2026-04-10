import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Bathroom Mould Remediation',
  description: 'Professional bathroom mould remediation services across Australia. 24/7 emergency response for shower mould, bathroom ceiling mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/bathroom-mould',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does bathroom mould keep coming back after cleaning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Surface mould returns because the underlying moisture source has not been addressed. Grout lines and silicone joints allow moisture to penetrate behind tiles, where mould grows on the substrate. Bleach-based surface cleaners kill visible mould but do not penetrate to remove the root structure (hyphae) embedded in grout or behind tiles. Professional mould remediation identifies the moisture source, removes contaminated materials, and treats the substrate with penetrating antifungal agents.',
      },
    },
    {
      '@type': 'Question',
      name: 'When does bathroom mould require professional remediation versus DIY cleaning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DIY cleaning with commercial antifungal products is appropriate for surface mould on glazed tiles covering less than 1 square metre with no underlying moisture problem. Professional remediation is required when: mould covers more than 1 square metre; mould is present behind tiles or in wall cavities; grout or silicone shows widespread mould penetration; or occupants are experiencing respiratory symptoms. IICRC S520:2025 defines the scope threshold for professional intervention.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is bathroom mould covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould resulting from a sudden and accidental water event — a burst pipe, tap failure, or roof leak — is typically covered as consequential damage. Mould resulting from long-term inadequate ventilation or maintenance neglect is generally excluded as a maintenance issue. We provide moisture source assessment reports that document the causation for your insurance claim.',
      },
    }
  ],
});

export default function BathroomMouldRemediationPage() {
  return (
    <>
      <Script id="bathroom-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Bathroom Mould Remediation',
        subtitle: 'Professional bathroom mould remediation services across Australia. 24/7 emergency response for shower mould, bathroom ceiling mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Bathroom Mould Remediation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Bathroom Mould Remediation', parentCategory: 'Mould Remediation', context: 'bathroom mould removal and prevention' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
