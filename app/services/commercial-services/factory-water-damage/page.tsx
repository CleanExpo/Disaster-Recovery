import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Factory Flood Recovery',
  description: 'Professional factory flood recovery services across Australia. 24/7 emergency response for manufacturing plant, industrial water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/factory-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can production continue in a factory during water damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In many cases, yes — NRPG establishes containment zones to separate affected production areas from operational ones. Drying equipment is positioned to minimise interference with production lines. Intensive demolition or repair work is scheduled during shutdowns. We develop a site-specific business continuity plan before work begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does factory flooding affect machinery warranties or compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water exposure may void equipment manufacturer warranties. Electrical and automated machinery must be inspected and cleared by qualified technicians before reuse. In regulated industries (food manufacturing, pharmaceutical), water ingress may require regulatory notification and re-certification of affected production areas. We coordinate with your compliance team on these requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is factory flood damage covered by commercial insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Commercial property insurance typically covers factory flood damage from sudden and accidental water events including burst pipes, roof leaks, and stormwater ingress. Business interruption insurance may cover lost production revenue during restoration. We provide IICRC-certified documentation — scope of works, moisture logs, photographs — for your insurance claim.',
      },
    }
  ],
});

export default function FactoryFloodRecoveryPage() {
  return (
    <>
      <Script id="factory-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Factory Flood Recovery',
        subtitle: 'Professional factory flood recovery services across Australia. 24/7 emergency response for manufacturing plant, industrial water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Factory Flood Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Factory Flood Recovery', parentCategory: 'Commercial Services', context: 'manufacturing plant and industrial water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
