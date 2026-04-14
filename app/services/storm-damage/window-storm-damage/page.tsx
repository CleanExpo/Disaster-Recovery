import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Storm Window Damage',
  description: 'Professional storm window damage services across Australia. 24/7 emergency response for broken windows, glass damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/window-storm-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Should I cover broken storm windows with temporary boarding before the restoration contractor arrives?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — temporary boarding is critical. A broken window exposes the interior to further rain ingress, wind damage to contents, and wildlife and unauthorised entry. Use heavy-duty polythene sheeting or timber ply secured over the opening. Do not use single sheets of glass to replace broken panes temporarily — only safety glass or polycarbonate. NRPG can provide emergency boarding as part of storm make-safe — lodge a claim and a coordinator will connect you with the nearest available contractor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can impact-damaged window frames be repaired or do they need full replacement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aluminium window frames that have been bent or racked by wind pressure or impact cannot be safely repaired — they must be replaced. Timber frames with minor damage may be repairable if the frame is structurally sound and weather-tight sealing can be re-established. In cyclone-rated areas, replacement windows must meet the wind load requirements for the cyclone design wind speed applicable to the location.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is storm window damage covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Window breakage and frame damage from a sudden storm event is covered under most Australian home and business insurance policies as a storm damage claim. Contents damage from subsequent rain entry through broken windows is also claimable. Make-safe boarding costs are claimable as emergency make-safe expenses. Document all damage with photographs before boarding and before any glass disposal.',
      },
    }
  ],
});

export default function StormWindowDamagePage() {
  return (
    <>
      <Script id="window-storm-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Storm Window Damage',
        subtitle: 'Professional storm window damage services across Australia. 24/7 emergency response for broken windows, glass damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Storm Window Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Storm Window Damage', parentCategory: 'Storm Damage', context: 'broken window and glass damage from storms' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
