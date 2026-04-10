import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Roof Tarping',
  description: 'Professional emergency roof tarping services across Australia. 24/7 emergency response for temporary roof, tarp installation.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-tarping',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is emergency roof tarping and when is it needed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency roof tarping involves installing industrial-grade temporary covers over damaged or missing roof sections to prevent further water ingress after storm damage, fire, fallen trees, or hail. Tarping begins within hours to stop water entry that would otherwise spread damage to ceilings, walls, insulation, and contents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover emergency tarping?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Emergency tarping is a covered make-safe cost under most Australian home and business insurance policies. Document the damage with photographs before and after tarping. Tarping is temporary protection — permanent roof repair follows after claim approval and contractor scheduling.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does emergency tarping last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Industrial tarps installed by NRPG can remain in place for weeks to months while permanent repairs are arranged. They are secured against wind and weather. Monitor tarp condition after subsequent storms and contact your restoration contractor if any movement or degradation is observed.',
      },
    }
  ],
});

export default function EmergencyRoofTarpingPage() {
  return (
    <>
      <Script id="emergency-tarping-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Roof Tarping',
        subtitle: 'Professional emergency roof tarping services across Australia. 24/7 emergency response for temporary roof, tarp installation.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Roof Tarping' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Roof Tarping', parentCategory: 'Emergency Services', context: 'temporary roof protection and tarp installation after storm damage' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
