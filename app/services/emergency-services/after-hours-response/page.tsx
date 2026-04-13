import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'After Hours Emergency Response',
  description: 'Professional after hours emergency response services across Australia. 24/7 emergency response for night emergency, weekend service.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/after-hours-response',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you respond to emergencies at night, on weekends, and on public holidays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NRPG operates 24 hours a day, 365 days a year including Christmas, Easter, and all public holidays. Disasters do not observe business hours — neither do we. Lodge a claim at disasterrecovery.com.au/claim at any time and a certified technician will be dispatched as soon as a certified contractor is confirmed for your area in most metro areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the after-hours response rate higher than standard?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After-hours work may incur after-hours call-out rates under some insurance policies. We are transparent about pricing from the outset. In most cases, insurance covers emergency after-hours restoration costs — beginning make-safe immediately prevents escalating damage that would cost significantly more to repair. We document all costs for your insurer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What counts as a restoration emergency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A restoration emergency is any sudden event that threatens the safety of occupants or causes ongoing damage to property — burst pipe flooding, sewage backup, fire and smoke damage, storm damage, roof failure, or chemical spill. If water is actively flowing, a structure is unsafe, or a property is uninhabitable, that is an emergency requiring immediate response.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to notify my insurer before calling for emergency response?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Begin emergency make-safe immediately to prevent further damage — this is your right and obligation under most Australian insurance policies. You should notify your insurer as soon as practicable, but this should not delay emergency extraction or make-safe work. We document all pre-work conditions so your insurer receives complete evidence.',
      },
    },
  ],
});

export default function AfterHoursEmergencyResponsePage() {
  return (
    <>
      <Script id="after-hours-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
          heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
          icon: <Siren className="h-12 w-12" />,
          title: 'After Hours Emergency Response',
          subtitle: 'Professional after hours emergency response services across Australia. 24/7 emergency response for night emergency, weekend service.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
        ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Emergency Services', href: '/services/emergency-services' },
          { label: 'After Hours Emergency Response' },
        ]}
        sections={getServiceChildSections({ serviceName: 'After Hours Emergency Response', parentCategory: 'Emergency Services', context: 'night and weekend emergency disaster response' })}
        relatedPages={getRelatedPages('emergency')}
      />
    </>
  );
}
