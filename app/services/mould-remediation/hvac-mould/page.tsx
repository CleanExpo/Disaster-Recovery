import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Air Conditioning Mould Removal',
  description: 'Professional air conditioning mould removal services across Australia. 24/7 emergency response for AC duct mould, HVAC contamination.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/hvac-mould',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does mould grow in HVAC and air conditioning systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HVAC systems accumulate mould when: condensate drain pans overflow or block; cooling coils operate in humid conditions without adequate drainage; return air filters are not regularly replaced; ductwork has moisture ingress from roof leaks or condensation on uninsulated ducts in humid climates; or systems are shut down for extended periods in warm humid conditions. Mould in HVAC systems distributes spores throughout all connected spaces every time the system operates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can an HVAC system be cleaned after mould or does it need full replacement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many HVAC systems can be professionally cleaned and decontaminated without full replacement. NRPG coordinates HVAC mould remediation involving: replacement of contaminated filters and drain pan; coil cleaning with antifungal solution; duct inspection via camera; and HEPA vacuuming of accessible ductwork. If ductwork is severely contaminated or has penetrations allowing moisture ingress, replacement of affected duct sections is required. Post-remediation air quality testing confirms clearance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I turn off my air conditioning if I suspect HVAC mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Stop operating the system immediately — continued use distributes mould spores to all connected rooms. Do not run the system again until a qualified HVAC technician and mould remediation contractor have assessed it. We recommend scheduling an indoor air quality test alongside the HVAC inspection to establish baseline spore counts before and after remediation.',
      },
    }
  ],
});

export default function AirConditioningMouldRemovalPage() {
  return (
    <>
      <Script id="hvac-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Air Conditioning Mould Removal',
        subtitle: 'Professional air conditioning mould removal services across Australia. 24/7 emergency response for AC duct mould, HVAC contamination.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Air Conditioning Mould Removal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Air Conditioning Mould Removal', parentCategory: 'Mould Remediation', context: 'HVAC and air conditioning duct mould removal' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
