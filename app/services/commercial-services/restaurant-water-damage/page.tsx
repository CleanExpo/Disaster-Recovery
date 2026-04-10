import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Restaurant Water Damage',
  description: 'Professional restaurant water damage services across Australia. 24/7 emergency response for kitchen flooding, hospitality water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/restaurant-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a restaurant reopen quickly after water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timeline depends on the scope of damage and regulatory requirements. If kitchen equipment, food storage, and preparation surfaces are affected, the restaurant may need to close until health authority clearance is obtained. NRPG works to restore and certify the affected areas as quickly as possible, coordinating with your local council environmental health officer where required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do health regulations require a council inspection after restaurant flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most Australian states and territories, food businesses must notify their local council environmental health officer after a significant flooding event and obtain clearance before resuming food preparation. We provide IICRC-certified restoration reports and moisture clearance documentation that supports your council re-inspection and reopening process.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does business insurance cover a restaurant closure after flood damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Commercial property insurance covers physical damage. Business interruption insurance may cover revenue loss during closure, ongoing staff wages, and fixed costs. We provide complete documentation — scope of works, moisture logs, council clearance requirements — to support all components of your insurance claim.',
      },
    }
  ],
});

export default function RestaurantWaterDamagePage() {
  return (
    <>
      <Script id="restaurant-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Restaurant Water Damage',
        subtitle: 'Professional restaurant water damage services across Australia. 24/7 emergency response for kitchen flooding, hospitality water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Restaurant Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Restaurant Water Damage', parentCategory: 'Commercial Services', context: 'kitchen flooding and hospitality water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
