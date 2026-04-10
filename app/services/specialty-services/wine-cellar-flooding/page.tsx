import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Wine Cellar Flood Recovery',
  description: 'Professional wine cellar flood recovery services across Australia. 24/7 emergency response for wine storage, cellar water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/wine-cellar-flooding',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can wine bottles be saved after a cellar floods?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unopened bottles with intact corks may survive brief clean water flooding with minimal damage to the wine itself, though labels are typically destroyed. The key risks are: contaminated water ingress around cork closures (if bottles were submerged with the cork below water level); label destruction; and cork degradation from extended moisture exposure. Screwcap-sealed bottles are significantly more water-resistant. Any wine showing evidence of cork contamination (discolouration, off-odour) should not be consumed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you restore a flooded wine cellar while protecting the wine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG conducts extraction with particular care around wine storage racks — avoiding vibration, which disturbs wine sediment and accelerates premature ageing. Temperature-controlled drying is critical as fluctuating temperature during restoration damages wine quality. Wine should be relocated to temperature-controlled storage during cellar restoration where possible. We minimise the exposure of wine to temperature swings, excessive light, and vibration throughout the restoration process.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a wine collection covered by insurance after cellar flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wine collections above a standard contents value are typically excluded from standard home insurance or subject to low sub-limits. High-value cellars require specialist wine insurance or a separately endorsed fine wine schedule on a home or investment policy with an agreed value based on current market valuation. We provide damage assessment and condition reporting for wine insurance claims, coordinating with specialist wine assessors.',
      },
    }
  ],
});

export default function WineCellarFloodRecoveryPage() {
  return (
    <>
      <Script id="wine-cellar-flood-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Wine Cellar Flood Recovery',
        subtitle: 'Professional wine cellar flood recovery services across Australia. 24/7 emergency response for wine storage, cellar water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Wine Cellar Flood Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Wine Cellar Flood Recovery', parentCategory: 'Specialty Services', context: 'wine storage and cellar water damage restoration' })}
      relatedPages={getRelatedPages('guides-general')}
    />
    </>
  );
}
