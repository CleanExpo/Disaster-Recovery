import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Gym & Fitness Centre Flooding',
  description: 'Professional gym & fitness centre flooding services across Australia. 24/7 emergency response for sports facility, gym water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/gym-flooding',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a gym remain open during water damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In many cases, sections of the gym can remain operational while affected areas are isolated for restoration. Equipment not in the affected zone can often continue to be used. NRPG establishes containment and drying in the affected area while keeping unaffected zones accessible. This is coordinated with your facility manager to minimise member disruption.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does water damage affect gym flooring and equipment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rubber gym flooring absorbs water and can develop mould if not dried within 24-48 hours. Wooden flooring cups and warps. Fixed equipment may have water in motor housings — do not use until cleared by a technician. Free weights and metal equipment can be dried and sanitised. Upholstered padding and foam elements may require replacement depending on water category.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does business insurance cover gym flood damage and lost membership revenue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial property insurance covers the physical damage to the facility. Business interruption insurance may cover lost membership revenue and ongoing fixed costs during restoration. We provide full documentation to support both streams of your insurance claim.',
      },
    }
  ],
});

export default function GymFitnessCenterFloodingPage() {
  return (
    <>
      <Script id="gym-flood-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Gym & Fitness Centre Flooding',
        subtitle: 'Professional gym & fitness centre flooding services across Australia. 24/7 emergency response for sports facility, gym water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Gym & Fitness Centre Flooding' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Gym & Fitness Centre Flooding', parentCategory: 'Commercial Services', context: 'sports facility and gym water damage recovery' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
