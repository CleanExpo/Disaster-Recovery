import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Board Up Services',
  description: 'Professional emergency board up services services across Australia. 24/7 emergency response for security boarding, window boarding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-board-up',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is emergency board-up required?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency board-up is required when a property\'s windows, doors, or structural openings are compromised by storm damage, fire, break-in, or collision. Unsecured openings allow water ingress, wildlife entry, and unauthorised access — each causing additional damage and liability. Board-up should begin as soon as the area is safe to access.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover emergency board-up costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most Australian home and business insurance policies cover emergency make-safe costs including board-up as part of the property damage claim. Begin immediately to prevent secondary damage — do not wait for insurer approval. Document all conditions before and after boarding for your claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can you board up a property after storm or fire damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG dispatches emergency make-safe teams 24/7. In most metro areas response is within 60 minutes. Board-up is temporary protection — full repair or replacement of compromised openings follows once assessment and insurance approval are in place.',
      },
    }
  ],
});

export default function EmergencyBoardUpServicesPage() {
  return (
    <>
      <Script id="emergency-board-up-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Board Up Services',
        subtitle: 'Professional emergency board up services services across Australia. 24/7 emergency response for security boarding, window boarding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Board Up Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Board Up Services', parentCategory: 'Emergency Services', context: 'security boarding and window boarding after damage' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
