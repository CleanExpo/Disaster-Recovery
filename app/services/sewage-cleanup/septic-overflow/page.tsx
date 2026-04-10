import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Septic Tank Overflow Cleanup',
  description: 'Professional septic tank overflow cleanup services across Australia. 24/7 emergency response for septic backup, tank overflow.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/septic-overflow',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes a septic system to overflow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Septic system overflows are caused by: tank reaching capacity (requiring pump-out); excessive water use overwhelming the tank and leach field; blocked inlet or outlet baffles; leach field failure due to saturation, root intrusion, or biomat accumulation; and damaged or cracked tank allowing groundwater ingress. In rural properties after heavy rain, saturated soils around the leach field prevent absorption, causing sewage to surface.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a septic overflow a health emergency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Septic overflow involves Category 3 (black water) contamination containing human pathogens. Surface overflow on a property presents a direct health risk to occupants and a serious risk to groundwater, waterways, and neighbouring properties. Contact a licensed plumber and wastewater contractor immediately. In most states, uncontrolled sewage discharge is a regulatory breach — contact your local council or EPA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is septic overflow damage covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coverage depends on the cause. Sudden and accidental septic system failure — such as a tank collapse or unexpected leach field failure — may be covered under home insurance. Overflow from a full tank that was not maintained is generally excluded as a maintenance issue. NRPG provides causation assessment and documentation to support your claim and assist in determining whether a sudden failure event has occurred.',
      },
    }
  ],
});

export default function SepticTankOverflowCleanupPage() {
  return (
    <>
      <Script id="septic-overflow-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Septic Tank Overflow Cleanup',
        subtitle: 'Professional septic tank overflow cleanup services across Australia. 24/7 emergency response for septic backup, tank overflow.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Septic Tank Overflow Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Septic Tank Overflow Cleanup', parentCategory: 'Sewage Cleanup', context: 'septic system backup and tank overflow' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
