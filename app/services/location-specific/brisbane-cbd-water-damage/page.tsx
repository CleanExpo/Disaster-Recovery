import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Brisbane CBD Water Damage',
  description: 'Professional brisbane cbd water damage services in Queensland. 24/7 emergency response for city flooding, downtown Brisbane.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/brisbane-cbd-water-damage',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes water damage events in Brisbane CBD buildings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brisbane CBD water damage events arise from several sources: extreme rainfall causing stormwater and roof drainage overwhelm in high-density buildings; plumbing failures in ageing high-rise building services; cooling tower overflow and HVAC condensate line blockages; subfloor water table intrusion during extended wet periods; and historically Brisbane River flooding in low-lying CBD precincts. The 2022 South East Queensland floods caused significant damage to basement and lower-level CBD premises. Buildings constructed before 2011 may not meet current flood-resilient design guidelines under Brisbane City Council flood amendments.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does water damage restoration in Brisbane CBD buildings differ from residential work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CBD building restoration involves additional complexity: building management approval for access to common areas, basement plant rooms, and riser cupboards; coordination with strata and body corporate for multi-tenancy buildings; compliance with commercial building codes under the NCC and BCC building regulations; insurance claim management for both building and business interruption losses; minimising disruption to building occupants and adjacent tenancies; and managing wet works within secure server rooms, plant rooms, or tenancy fit-outs containing high-value equipment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documentation is required for flood restoration insurance claims in Brisbane?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brisbane insurer documentation requirements typically include: IICRC-certified contractor assessment report with water category and Class determination; photographic evidence of all affected areas before, during, and after remediation; drying logs recording daily moisture readings; scope of works with quantities and unit rates; council flood level certificates or Flood Check reports confirming flood plain status; and a clearance report from the certifying contractor confirming drying goals have been met. Business interruption claims require additional financial documentation from the property owner or tenant.',
      },
    }
  ],
});

export default function BrisbaneCBDWaterDamagePage() {
  return (
    <>
      <Script id="brisbane-cbd-water-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Brisbane CBD Water Damage',
        subtitle: 'Professional brisbane cbd water damage services in Queensland. 24/7 emergency response for city flooding, downtown Brisbane.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Brisbane CBD Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Brisbane CBD Water Damage', parentCategory: 'Location Specific', context: 'CBD and downtown Brisbane water damage and flood restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
