import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Burst Pipe Emergency Services | 24/7',
  description: 'Emergency burst pipe repair and water damage restoration across Australia. 24/7 response for pipe bursts, leaks, and flooding. IICRC-certified technicians.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/burst-pipes',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much water damage can a burst pipe cause in one hour?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 20mm domestic supply pipe running at 400kPa mains pressure can discharge 1,000-2,000 litres per hour. In one hour undetected, this saturates subfloors, wall cavities, and ceilings across multiple rooms. A flexible braided appliance hose failure — the most common cause of severe domestic water damage in Australia — can empty a home\'s entire water supply into the building before anyone notices. Every minute counts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do hot water system and appliance hoses burst?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flexible braided hoses connecting dishwashers, washing machines, and under-sink plumbing have a finite lifespan of 5-10 years. The inner rubber tube degrades and can fail without visible external warning. Stainless braided hoses with an inner EPDM tube are significantly more reliable than PVC inner hoses. Annual inspection and replacement every 10 years is the recommended maintenance standard. Old chrome or copper compression fittings are also common failure points.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I try to mop up a burst pipe flood myself before the restoration team arrives?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — remove as much standing water as possible using mops, towels, and buckets. This reduces secondary damage and makes the restoration team\'s job faster. Do not use a standard wet/dry shop vacuum unless it is specifically rated for water recovery. Do not use electrical equipment in rooms with standing water. Leave wall cavities and subfloor drying to the professionals — consumer equipment cannot achieve the drying needed for structural materials.',
      },
    }
  ],
});

export default function BurstPipesPage() {
  return (
    <>
      <Script id="burst-pipes-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Burst Pipe Emergency Services',
        subtitle: 'Emergency burst pipe repair and water damage restoration across Australia. 24/7 response for pipe bursts, leaks, and flooding. IICRC-certified technicians.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Burst Pipe Emergency Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Burst Pipe Emergency Services', parentCategory: 'Water Damage', context: 'burst pipe repair and emergency water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
