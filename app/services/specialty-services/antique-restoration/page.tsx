import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Antique Water Damage Restoration',
  description: 'Professional antique water damage restoration services across Australia. 24/7 emergency response for heritage items, valuable restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/antique-restoration',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can antique furniture be restored after water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many antique furniture pieces can be restored after water damage if treated promptly. Solid timber construction responds better than veneered or laminated pieces. Immediate priorities are controlled slow drying (antiques must never be force-dried), gentle cleaning of water marks, and specialist re-finishing by a conservator. Joint weakening and veneer lifting are addressed with appropriate adhesives and clamping. Do not place antiques near heaters or in direct sun for rapid drying — this causes irreversible splitting and veneer loss.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you prevent antique furniture from warping after water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Controlled, slow drying is critical. Remove the piece from the wet environment immediately. Clean surface water gently with soft cloths — do not scrub. Store in a consistent temperature environment (ideally 18-22°C, 40-55% RH). Use weights or clamping to maintain shape during drying. Drawers should be removed for separate drying. Rapid or uneven drying is the primary cause of antique timber warping and joint failure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are antiques covered by home insurance after fire or water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Antiques require specialist valuation to be adequately covered. Most standard home insurance policies cover contents at replacement value, but antiques may be irreplaceable — a listed or separately insured schedule with an agreed value is preferable. We provide condition and treatment reports for antiques submitted for restoration that support your insurance claim and replacement value assessment.',
      },
    }
  ],
});

export default function AntiqueWaterDamageRestorationPage() {
  return (
    <>
      <Script id="antique-restoration-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Antique Water Damage Restoration',
        subtitle: 'Professional antique water damage restoration services across Australia. 24/7 emergency response for heritage items, valuable restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Antique Water Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Antique Water Damage Restoration', parentCategory: 'Specialty Services', context: 'heritage item and valuable antique restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
