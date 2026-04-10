import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Fallen Tree Damage Cleanup',
  description: 'Professional fallen tree damage cleanup services across Australia. 24/7 emergency response for tree removal, storm tree damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/tree-damage-cleanup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'A tree fell on my house — what do I do first?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ensure everyone is safe and evacuate the affected area if the structural integrity is uncertain. Do not re-enter rooms where the tree has penetrated — roof sections may be unstable. Turn off electricity and gas at the mains if it is safe to do so. Call emergency services if the tree has caused gas leaks, downed powerlines, or immediate structural danger. Photograph all damage before any cleanup begins, then call your insurer and an emergency make-safe contractor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is responsible if a neighbour\'s tree falls on my property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most Australian states and territories, liability depends on whether the tree owner knew or should have known the tree was a risk (diseased, dead, or previously reported). If the neighbour had no knowledge of any defect, the damage falls on the property owner\'s insurance as a sudden and accidental event. NRPG provides documentation of the damage and entry point, which supports both insurance claims and legal proceedings if liability is disputed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover tree removal and structural repair after storm damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Australian home insurance policies cover the cost of removing a tree that has fallen on an insured structure (roof, fence, wall) and the cost of repairing the resulting structural damage. Tree removal from the garden only (without structural impact) is generally not covered. Confirm with your insurer whether arborist costs for the fallen tree are included in your claim scope.',
      },
    }
  ],
});

export default function FallenTreeDamageCleanupPage() {
  return (
    <>
      <Script id="tree-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Fallen Tree Damage Cleanup',
        subtitle: 'Professional fallen tree damage cleanup services across Australia. 24/7 emergency response for tree removal, storm tree damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Fallen Tree Damage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Fallen Tree Damage Cleanup', parentCategory: 'Storm Damage', context: 'fallen tree removal and storm tree damage repair' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
