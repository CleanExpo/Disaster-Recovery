import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Pool Leak Property Damage',
  description: 'Professional pool leak property damage services across Australia. 24/7 emergency response for swimming pool leak, pool water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/pool-leak-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I tell if my pool is leaking rather than just evaporating?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The bucket test distinguishes pool leaks from evaporation: fill a bucket with pool water to the same level as the pool surface, place it on a pool step, and compare water level loss after 24 hours. If the pool loses more than the bucket, the pool is leaking. A pool typically loses 3-7mm per week to evaporation in Australian conditions — losses exceeding 15-20mm per week indicate a structural or plumbing leak.',
      },
    },
    {
      '@type': 'Question',
      name: 'What damage does a pool leak cause to surrounding property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A leaking pool gradually saturates the surrounding soil, causing subsidence under paths and paving, undermining fencing footings, and introducing moisture into adjacent building footings and subfloors. Pool plumbing buried underground can leak for months before the surface effects are noticed. In severe cases, pool leaks cause significant structural damage to the house if the pool is adjacent to the building.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is pool leak damage covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The structural damage to paths, fencing, and building elements caused by a leaking pool may be claimable if the leak was sudden and accidental. Gradual pool leaks are typically excluded as maintenance issues. The pool itself (as a structure) may have specific coverage under your home insurance — check your PDS for pool inclusions. NRPG provides assessment and documentation of the resulting property damage to support your claim.',
      },
    }
  ],
});

export default function PoolLeakPropertyDamagePage() {
  return (
    <>
      <Script id="pool-leak-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Pool Leak Property Damage',
        subtitle: 'Professional pool leak property damage services across Australia. 24/7 emergency response for swimming pool leak, pool water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Pool Leak Property Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Pool Leak Property Damage', parentCategory: 'Water Damage', context: 'swimming pool leak and pool water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
