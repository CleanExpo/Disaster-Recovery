import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Chimney Fire Damage Cleanup',
  description: 'Professional chimney fire damage cleanup services across Australia. 24/7 emergency response for flue fire, chimney restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/chimney-fire-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What happens during a chimney fire and what damage does it cause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A chimney fire occurs when creosote or soot deposits inside the chimney flue ignite, producing intense heat that can crack or collapse the flue liner, spread to surrounding timber framing, and fill the property with smoke. Damage includes structural damage to the chimney and firebox, smoke and soot contamination throughout the property, and risk of hidden structural fire spread in wall and ceiling cavities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a structural inspection after a chimney fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A chimney fire must be inspected by a licensed chimney professional and a structural engineer before the fireplace is used again. Hidden structural damage — cracked flue tiles, compromised mortar, fire spread to timber framing — is common and not visible without inspection. Insurance will require professional assessment documentation before approving restoration costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is chimney fire damage covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Chimney fires are typically covered as accidental fire events under Australian home insurance policies. Damage to the chimney structure, surrounding walls, and smoke contamination throughout the property is claimable. Do not use the fireplace again until the chimney is professionally inspected and certified safe.',
      },
    }
  ],
});

export default function ChimneyFireDamageCleanupPage() {
  return (
    <>
      <Script id="chimney-fire-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Chimney Fire Damage Cleanup',
        subtitle: 'Professional chimney fire damage cleanup services across Australia. 24/7 emergency response for flue fire, chimney restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Chimney Fire Damage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Chimney Fire Damage Cleanup', parentCategory: 'Fire Damage', context: 'flue fire damage repair and chimney restoration services' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
