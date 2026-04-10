import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Crime Scene Cleanup | 24/7 Response',
  description: 'Professional crime scene cleanup services across Australia. 24/7 emergency response for forensic cleaning, trauma cleanup. Discreet, compassionate, IICRC-certified.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/crime-scene-cleanup',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does crime scene cleanup involve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Crime scene cleanup involves the safe removal and disposal of biological matter — blood, tissue, and bodily fluids — using PPE and EPA-registered antimicrobial agents. Technicians decontaminate all affected surfaces, remove contaminated materials for disposal according to biohazard waste regulations, and restore the property to a safe and habitable condition. This is not performed by police or emergency services — it is the responsibility of the property owner or next of kin.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is crime scene cleanup covered by insurance in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many Australian home and contents policies cover crime scene cleanup costs under property damage or trauma cleaning provisions. Coverage depends on your policy and the circumstances. We provide full IICRC-certified documentation to support your insurance claim. Contact your insurer to confirm coverage before work begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'How discreet is your crime scene cleanup service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All trauma and crime scene cleaning is conducted with complete discretion. Unmarked vehicles are available on request. Technicians arrive without identifying signage and operate without attracting attention. We understand these circumstances involve grief and sensitivity — our team is trained to work with compassion and professionalism at all times.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to be present during crime scene cleanup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do not need to be present. We can collect keys or access the property through your insurer, estate executor, or property manager. Many families choose not to return to the property until cleanup is fully complete. We will provide a completion report with photographic evidence that the property has been fully decontaminated.',
      },
    },
  ],
});

export default function CrimeSceneCleanupPage() {
  return (
    <>
      <Script id="crime-scene-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
          heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
          icon: <AlertTriangle className="h-12 w-12" />,
          title: 'Crime Scene Cleanup Services',
          subtitle: 'Professional crime scene cleanup services across Australia. 24/7 emergency response for forensic cleaning, trauma cleanup. Discreet, compassionate, IICRC-certified.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
        ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
          { label: 'Crime Scene Cleanup' },
        ]}
        sections={getServiceChildSections({ serviceName: 'Crime Scene Cleanup', parentCategory: 'Biohazard Cleaning', context: 'forensic cleaning and trauma scene remediation' })}
        relatedPages={getRelatedPages('biohazard')}
      />
    </>
  );
}
