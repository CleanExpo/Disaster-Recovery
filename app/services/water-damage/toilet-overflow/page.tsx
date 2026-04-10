import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Toilet Overflow Cleanup',
  description: 'Professional toilet overflow cleanup services across Australia. 24/7 emergency response for toilet flooding, bathroom water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/toilet-overflow',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What water category is a toilet overflow and what does that mean for cleanup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Toilet overflows are Category 2 or Category 3 depending on the source: an overflowing cistern (clean water) is Category 1; a toilet bowl overflow with toilet paper but no faecal matter is Category 2 (grey water); a sewage backup through the toilet bowl is Category 3 (black water). Category determines the cleanup protocol — Category 3 requires disposal of all porous materials in contact with the overflow and hospital-grade disinfection of all surfaces, per IICRC S500:2025.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much damage can a running toilet cause if the overflow goes undetected overnight?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A toilet cistern filling continuously (e.g., from a failed fill valve) can overflow at 6-15 litres per minute. Undetected overnight (8 hours), this equates to 2,800-7,200 litres — enough to saturate the entire bathroom floor, subfloor, and adjacent rooms. A running toilet that overflows a full cistern onto the floor is one of the most damaging domestic water events due to its continuous nature.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is toilet overflow damage covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sudden and accidental toilet overflow damage is covered under most Australian home insurance policies. Both the structural damage (flooring, subfloor, cabinetry) and affected contents are claimable. Failed fill valves and faulty cistern mechanisms that cause overflows are considered sudden mechanical failures — not maintenance exclusions in most policies. Act immediately: delay increases the claim scope.',
      },
    }
  ],
});

export default function ToiletOverflowCleanupPage() {
  return (
    <>
      <Script id="toilet-overflow-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Toilet Overflow Cleanup',
        subtitle: 'Professional toilet overflow cleanup services across Australia. 24/7 emergency response for toilet flooding, bathroom water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Toilet Overflow Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Toilet Overflow Cleanup', parentCategory: 'Water Damage', context: 'toilet flooding and bathroom water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
