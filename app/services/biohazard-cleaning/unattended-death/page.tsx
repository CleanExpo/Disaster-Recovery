import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Unattended Death Cleanup',
  description: 'Professional unattended death cleanup services across Australia. 24/7 emergency response for decomposition cleanup, deceased estate.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/unattended-death',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is responsible for unattended death cleanup in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Police, paramedics, and coroners are responsible for removing the deceased and conducting their investigation. Biohazard decontamination and cleanup of the property is the responsibility of the property owner, next of kin, or the estate. This is not covered by emergency services. A professional biohazard cleaning company must be engaged for safe remediation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is unattended death cleanup covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many Australian home insurance policies cover the cost of biohazard cleanup following an unattended or undiscovered death under property damage provisions. Coverage varies by policy. We provide full IICRC-certified documentation for insurance claims. Contact your insurer to confirm coverage before engaging our services.',
      },
    },
    {
      '@type': 'Question',
      name: 'What health risks does decomposition create?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Decomposition produces airborne pathogens, harmful gases, and fluids that contaminate surfaces, flooring, and subfloor materials. Exposure poses serious health risks including bacterial infection. Professional remediation requires full PPE, containment protocols, and specialised decontamination equipment. Do not attempt to clean an unattended death scene without certified biohazard training and equipment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can the property be fully restored after an unattended death?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. In most cases the property can be fully decontaminated and restored to habitable condition. Porous materials that have absorbed biological matter — carpet, underlay, soft furnishings — must be disposed of. Hard surfaces, subfloor structures, and walls can often be decontaminated and sealed. Odour elimination using ozone treatment and thermal fogging removes residual odours. We document all work with before-and-after evidence.',
      },
    },
  ],
});

export default function UnattendedDeathCleanupPage() {
  return (
    <>
      <Script id="unattended-death-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
          heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
          icon: <AlertTriangle className="h-12 w-12" />,
          title: 'Unattended Death Cleanup',
          subtitle: 'Professional unattended death cleanup services across Australia. 24/7 emergency response for decomposition cleanup, deceased estate.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
        ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
          { label: 'Unattended Death Cleanup' },
        ]}
        sections={getServiceChildSections({ serviceName: 'Unattended Death Cleanup', parentCategory: 'Biohazard Cleaning', context: 'decomposition cleanup and deceased estate remediation' })}
        relatedPages={getRelatedPages('biohazard')}
      />
    </>
  );
}
