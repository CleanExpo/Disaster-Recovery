import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hail Damage Restoration',
  description: 'Professional hail damage restoration services across Australia. 24/7 emergency response for hailstorm damage, ice damage repair.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/hail-damage-repair',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What building elements are most vulnerable to hail damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most hail-vulnerable elements are: roof tiles (cracking and fracture), roof sheeting (denting on steel, cracking on fibreglass), skylights and polycarbonate roofing, gutters and downpipes, solar panels, air conditioning condensers, soft metal flashings, and painted cladding. Even hail that does not cause immediately visible structural damage can fracture roof tiles or crack coatings in ways that become water ingress paths in subsequent rain events.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you assess hail damage to a roof?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG conducts a systematic roof inspection using thermal imaging to identify areas of moisture ingress through cracked tiles or damaged flashings, combined with physical inspection of every roof element. Impact damage to tiles is identified by tapping (hollow sound indicates fracture). Roof sheeting dent mapping documents the extent and density of impact damage. This assessment forms the basis of the insurance scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is hail damage always visible immediately or can it be hidden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some hail damage is immediately visible (broken tiles, smashed skylights). Cracked tile glazing and hairline tile fractures may not be visible from ground level and only manifest as leaks during subsequent rain. Hail damage to solar panels often shows internally (delamination, microcracking) without obvious external damage but causes measurable power output loss. A professional post-hail inspection within 30 days of the event is recommended for all properties in the hail path.',
      },
    }
  ],
});

export default function HailDamageRestorationPage() {
  return (
    <>
      <Script id="hail-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Hail Damage Restoration',
        subtitle: 'Professional hail damage restoration services across Australia. 24/7 emergency response for hailstorm damage, ice damage repair.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Hail Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Hail Damage Restoration', parentCategory: 'Storm Damage', context: 'hailstorm and ice damage repair' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
