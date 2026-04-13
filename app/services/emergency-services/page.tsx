import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: '24/7 Emergency Services | Rapid Disaster Response',
  description: '24/7 emergency disaster response services across Australia. Immediate response for water, fire, storm, and hazardous material incidents.',
  keywords: [
    'emergency restoration services',
    '24/7 emergency response',
    'emergency water extraction',
    'emergency board up',
    'emergency tarping',
    'disaster response team',
    'emergency plumbing response',
    'emergency drying services',
    'after hours emergency response',
    'emergency sanitisation',
    'priority response team',
    'emergency power restoration',
    'flood emergency response',
    'storm emergency services',
    'emergency disaster recovery',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How fast do you respond to a disaster emergency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG dispatches certified technicians as soon as a certified contractor is confirmed for your area of lodgement in major metropolitan areas. After-hours and regional response is available 24/7. Emergency make-safe — tarping, board-up, and water extraction — is completed on the first dispatch.',
      },
    },
    {
      '@type': 'Question',
      name: 'What counts as an emergency for disaster restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Burst pipes, sewage backup, storm inundation, fire damage, structural collapse risk, biohazard contamination, and any event causing active water intrusion or immediate health and safety risk qualifies as an emergency. Call or lodge online immediately — do not wait for insurance approval before requesting emergency make-safe.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need insurer approval before emergency services start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Under the General Insurance Code of Practice, your insurer must accept or deny a claim within 10 business days of receiving full information. Emergency make-safe work can and should begin immediately to prevent escalating damage. Document everything and notify your insurer as soon as practicable.',
      },
    },
    {
      '@type': 'Question',
      name: 'What emergency services do you provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency water extraction, structural drying deployment, emergency board-up and tarping, emergency plumbing containment, biohazard sanitisation, sewage cleanup, storm make-safe, fire damage containment, and emergency power restoration coordination.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is emergency disaster response available on weekends and public holidays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NRPG operates 24 hours a day, 7 days a week, 365 days a year including all public holidays. Lodge online at disasterrecovery.com.au/claim or call the emergency line at any time.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '24/7 Emergency Disaster Response',
  description: '24/7 emergency disaster response services across Australia. Immediate response for water, fire, storm, and hazardous material incidents.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization', name: 'Disaster Recovery' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Emergency Disaster Response',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim', serviceType: 'Online' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export default function EmergencyServicesPage() {
  return (
    <>
    <Script id="emergency-services-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <Script id="emergency-services-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: '24/7 Emergency Disaster Response',
        subtitle: '24/7 emergency disaster response services across Australia. Immediate response for water, fire, storm, and hazardous material incidents.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Flood & Water Emergencies' },
      ]}
      sections={[
        {
          heading: 'Emergency Response Services',
          body: <ServiceChildLinks category="emergency-services" />,
        },
      ]}
    />
    </>
  );
}
