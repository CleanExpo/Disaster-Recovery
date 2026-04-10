import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hot Water System Burst Damage',
  description: 'Professional hot water system burst damage services across Australia. 24/7 emergency response for hot water tank leak, heater flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/hot-water-system-burst',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much water does a hot water system hold and how much damage can it cause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Australian domestic hot water systems hold between 50 litres (small electric) and 400 litres (large gas or heat pump storage systems). A failed storage unit can release its entire volume in minutes. Unlike mains pressure burst pipes, the release is a fixed volume — but 200-400 litres of scalding hot water in a roof space or laundry causes severe and immediate structural damage to flooring, ceiling, and adjacent wall cavities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do hot water systems fail suddenly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hot water system failures are caused by: relief valve activation due to excessive pressure or temperature (may drain continuously if valve sticks open); corrosion of the cylinder wall or sacrificial anode failure causing slow leaks that accelerate to failure; pipe fitting failure at the connections; and age-related cylinder failure (most storage systems have a 10-15 year lifespan). Annual anode inspection and replacement significantly extends service life and prevents sudden cylinder failure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover burst hot water system damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The water damage caused by a suddenly failed or burst hot water system is covered under most Australian home insurance policies. The hot water unit itself is generally not covered (it is considered a maintenance item). Make-safe and structural drying costs are claimable. Document the failed unit with photographs before it is removed — the failure mode (burst tank, failed valve, pipe connection failure) is relevant to the claim.',
      },
    }
  ],
});

export default function HotWaterSystemBurstDamagePage() {
  return (
    <>
      <Script id="hot-water-burst-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Hot Water System Burst Damage',
        subtitle: 'Professional hot water system burst damage services across Australia. 24/7 emergency response for hot water tank leak, heater flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Hot Water System Burst Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Hot Water System Burst Damage', parentCategory: 'Water Damage', context: 'hot water tank leak and heater flooding cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
