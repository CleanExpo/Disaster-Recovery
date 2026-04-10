import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Redlands Storm Damage',
  description: 'Professional redlands storm damage services in Queensland. 24/7 emergency response for bayside damage, island restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/redlands-storm-damage',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of storm damage are most common in the Redlands area?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Redland City area — including Redland Bay, Victoria Point, Thornlands, and the Bay Islands — experiences storm damage primarily from: severe thunderstorm cells and hail events during the summer storm season (October-March); tropical-influenced heavy rainfall causing stormwater and creek flooding; coastal storm surge on low-lying island and foreshore areas; and wind damage from east coast low pressure systems causing roof cladding, fence, and tree damage across the bayside suburbs. Older housing stock in areas like Cleveland and Ormiston is particularly vulnerable to wind uplift damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Redlands\' proximity to Moreton Bay affect storm damage risk and restoration logistics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Redlands\' eastern boundary adjoins Moreton Bay, exposing coastal properties to sea-spray, wind-driven rain, and storm surge. Bay-facing properties experience accelerated roof and cladding deterioration from salt exposure, creating pre-existing vulnerabilities that become significant damage pathways during storm events. The Bay Islands — accessible only by ferry or barge — present particular challenges for emergency response and materials logistics during major events, requiring pre-planning of access routes and barge schedules for restoration equipment and crews.',
      },
    },
    {
      '@type': 'Question',
      name: 'What temporary protection measures are standard after storm damage in Redlands?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard emergency temporary protection for Redlands storm damage includes: emergency tarping of breached roof areas using specialist storm tarps secured with timber battens (not secured directly to roof tiles or capping); board-up of broken or compromised glazing; temporary fencing around structurally unsafe structures; and for Bay Islands properties, barge logistics planning for equipment and crew. All temporary protective works are documented with photographs and included in the insurance claim scope as Emergency Mitigation Measures, which are separately claimable under most storm policies.',
      },
    }
  ],
});

export default function RedlandsStormDamagePage() {
  return (
    <>
      <Script id="redlands-storm-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Redlands Storm Damage',
        subtitle: 'Professional redlands storm damage services in Queensland. 24/7 emergency response for bayside damage, island restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Redlands Storm Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Redlands Storm Damage', parentCategory: 'Location Specific', context: 'bayside and island storm damage restoration in the Redlands' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
