import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Kitchen Fire Damage Restoration',
  description: 'Professional kitchen fire damage restoration services across Australia. 24/7 emergency response for cooking fire, kitchen smoke damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/kitchen-fire-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a kitchen be restored after a fire or does it need full replacement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most kitchens can be partially or fully restored depending on the extent of fire and smoke damage. Cabinets, benchtops, and appliances affected only by smoke and soot can often be cleaned using ultrasonic and chemical methods. Charred or structurally compromised elements require replacement. An IICRC-certified fire restoration assessment determines what is restorable versus what must be replaced — this assessment also forms the basis of your insurance claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does kitchen fire damage restoration take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smoke and soot cleaning of a kitchen typically takes 2-5 days. If structural elements require replacement, the full scope may take 2-6 weeks depending on trades availability and insurance approval. Odour elimination using ozone treatment and thermal fogging follows structural work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover kitchen fire damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sudden and accidental kitchen fire damage is covered by most Australian home and contents policies. Contents — appliances, cookware — may be claimed under contents insurance. Obtain IICRC-certified assessment and documentation before any cleanup to support your claim.',
      },
    }
  ],
});

export default function KitchenFireDamageRestorationPage() {
  return (
    <>
      <Script id="kitchen-fire-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Kitchen Fire Damage Restoration',
        subtitle: 'Professional kitchen fire damage restoration services across Australia. 24/7 emergency response for cooking fire, kitchen smoke damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Kitchen Fire Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Kitchen Fire Damage Restoration', parentCategory: 'Fire Damage', context: 'cooking fire and kitchen smoke damage cleanup and restoration' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
