import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Solar Panel Water Damage',
  description: 'Professional solar panel water damage services across Australia. 24/7 emergency response for solar system, panel flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/solar-panel-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can solar panels survive water damage from hail or flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solar panels are designed to withstand rain and are typically rated to IEC 61215 standards for hail resistance (up to 25mm hail at 23m/s). However, severe hail (larger than 35-40mm) causes glass cracking and internal delamination. Flooding that submerges panels or inverter components causes damage to electrical connections and inverters even if panels appear visually intact. A post-storm performance test reveals power output reduction indicating internal damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What damage does storm or hail cause to solar panels that isn\'t visible?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Internal damage from hail impact includes: microcracks in solar cells (visible only under electroluminescence testing); delamination of the EVA encapsulant; junction box seal failure allowing moisture ingress; and bypass diode failure. These faults reduce power output progressively over time without visible exterior damage. An electroluminescence inspection within 30 days of a hail event is recommended for properties in the hail path to document damage for insurance before it self-presents as system degradation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is solar panel storm or hail damage covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Storm and hail damage to solar panels mounted on an insured dwelling is covered under most Australian home insurance policies as part of the building structures cover. Solar systems not permanently fixed (portable or temporary systems) may be covered under contents. We provide storm damage assessment reports for solar system insurance claims, coordinating with solar technicians for performance testing and scope of replacement.',
      },
    }
  ],
});

export default function SolarPanelWaterDamagePage() {
  return (
    <>
      <Script id="solar-panel-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Solar Panel Water Damage',
        subtitle: 'Professional solar panel water damage services across Australia. 24/7 emergency response for solar system, panel flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Solar Panel Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Solar Panel Water Damage', parentCategory: 'Specialty Services', context: 'solar system and panel water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
