import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Townsville Flood Restoration',
  description: 'Professional townsville flood restoration services in Queensland. 24/7 emergency response for north QLD flooding, tropical recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/townsville-flood-restoration',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Townsville\'s flood history and risk profile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Townsville\'s most significant modern flood event occurred in late January to February 2019, when a monsoon trough delivered over 1,000mm of rainfall in 10 days — causing Ross River Dam to spill at maximum capacity and inundating over 20,000 properties across low-lying suburbs including Idalia, Hermit Park, Mundingburra, and Vincent. The event was the most severe urban flooding in Townsville\'s recorded history. Flood risk zones are mapped by Townsville City Council\'s FloodWise Property Report system, which property owners and buyers can access for specific site risk information.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does North Queensland\'s monsoonal climate affect flood restoration timelines in Townsville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Townsville\'s monsoon season (December-April) delivers the majority of the region\'s average 1,100mm annual rainfall in concentrated burst events. Restoration projects initiated during the wet season face ongoing moisture ingress risk, requiring active temporary protection throughout the drying phase. Townsville\'s high ambient humidity (70-85% RH during the wet season) significantly increases the drying equipment capacity required per IICRC S500 psychrometric protocols, extending drying timelines and increasing equipment costs compared to dry season restorations. Project managers must account for ongoing weather risk in all scheduling and protection planning.',
      },
    },
    {
      '@type': 'Question',
      name: 'What government assistance programs have supported Townsville flood victims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Following the 2019 Townsville floods, assistance programs included: the Commonwealth Government\'s Disaster Recovery Payment (a lump sum for eligible uninsured losses) and Disaster Recovery Allowance (for income lost due to the disaster); Queensland Government\'s Rapid Repair program providing immediate safety repairs to private residences; and Townsville City Council\'s community recovery grants. The Queensland Government\'s Resilient Homes Fund — introduced following the 2022 SE Queensland floods — may also apply to eligible Townsville properties in high-risk flood zones. Contact the Queensland Disaster Hub (disasters.qld.gov.au) or Services Australia for current program availability.',
      },
    }
  ],
});

export default function TownsvilleFloodRestorationPage() {
  return (
    <>
      <Script id="townsville-flood-restoration-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Townsville Flood Restoration',
        subtitle: 'Professional townsville flood restoration services in Queensland. 24/7 emergency response for north QLD flooding, tropical recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Townsville Flood Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Townsville Flood Restoration', parentCategory: 'Location Specific', context: 'north Queensland tropical flood recovery and water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
