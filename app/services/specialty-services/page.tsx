import { Metadata } from 'next';
import Script from 'next/script';
import { Sparkles } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: 'Specialty Restoration Services',
  description: 'Specialist disaster recovery for valuable and unique items. Document drying, electronics restoration, art conservation, antique repair, and more. IICRC-certified technicians.',
  keywords: [
    'specialty restoration services',
    'document drying',
    'electronics water damage restoration',
    'art restoration',
    'antique restoration',
    'piano water damage',
    'boat water damage',
    'caravan water damage',
    'solar panel water damage',
    'wine cellar flooding',
    'asbestos water damage',
    'specialist item restoration',
    'valuable item recovery',
    'contents restoration',
    'heritage restoration',
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/services/specialty-services' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Specialty Restoration Services',
  description: 'Specialist disaster recovery for valuable and unique items. Document drying, electronics restoration, art conservation, antique repair, and more. IICRC-certified technicians.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization', name: 'Disaster Recovery' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Specialty Item and Contents Restoration',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim', serviceType: 'Online' },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of specialty restoration does NRPG coordinate through its contractor network?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG\'s specialty restoration services cover assets and scenarios outside standard water, fire, or mould restoration: laser cleaning for heritage surfaces and architectural features; document and photograph drying and digitisation; electronics assessment and drying for water-damaged IT and AV equipment; antique and fine art conservation; wine cellar flooding and stock assessment; boat and caravan water damage; piano and musical instrument restoration; asbestos-containing material management in disaster scenarios; and solar panel assessment and replacement after storm or fire events.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are specialty subcontractors vetted for complex restoration projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG vets specialist subcontractors using the same criteria applied to all network contractors: evidence of relevant professional memberships, licensing, and insurance; site-specific Safe Work Method Statements (SWMS) for the specialist scope; references from prior comparable projects; and compliance with IICRC, AIHA, or relevant Australian Standards for the specialist discipline. For heritage and conservation work, NRPG requires contractors with demonstrated experience under state heritage authority guidelines and, where applicable, endorsement from a qualified conservation specialist.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are specialty restoration services integrated into an insurance claim scope?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Specialty services are documented separately within the overall claim scope, with itemised reports from each specialist covering assessment methodology, confirmed extent of damage, recommended treatment, and cost. For example, an electronics restoration provider will provide a component-level assessment; a fine art conservator will provide a condition report and treatment plan. These documents are submitted to the insurer\'s loss adjuster as supporting attachments to the primary IICRC-certified restoration scope, enabling comprehensive settlement of all loss components.',
      },
    }
  ],
});

export default function SpecialtyServicesPage() {
  return (
    <>
    <Script id="specialty-services-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <Script id="specialty-services-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #4A1D96 0%, #7C3AED 100%)',
        icon: <Sparkles className="h-12 w-12" />,
        title: 'Specialty Restoration Services',
        subtitle: 'Specialist disaster recovery for valuable and unique items. Document drying, electronics restoration, art conservation, antique repair, and more.',
      }}
      cta={{ text: 'Get Specialist Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-specialty-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services' },
      ]}
      sections={[
        {
          heading: 'Specialty Restoration Services',
          body: <ServiceChildLinks category="specialty-services" />,
        },
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
    </>
  );
}
