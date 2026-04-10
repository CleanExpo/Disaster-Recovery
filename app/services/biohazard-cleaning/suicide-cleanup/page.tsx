import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Suicide Cleanup Services',
  description: 'Professional suicide cleanup services services across Australia. 24/7 emergency response for trauma cleaning, compassionate cleanup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/suicide-cleanup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who should I contact first after a suicide at a property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact emergency services (000) first. Police and coronial authorities will need to clear and release the scene before any cleanup can begin. Do not attempt to clean the scene yourself. Once the property is released, contact a specialist trauma and biohazard cleaning service — not a general cleaner. Family members and property owners should not be present during the cleanup if possible, to protect their wellbeing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does suicide scene cleanup require specialist contractors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Suicide scenes involve blood, bodily fluids, and decomposition materials that are Category 3 biohazards. These materials may have penetrated subfloors, wall cavities, and structural elements not visible on the surface. Standard cleaning does not achieve biohazard clearance. NRPG technicians are trained in trauma-informed practice, use clinical-grade decontamination protocols, and are experienced in working with families and property managers with sensitivity and discretion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is suicide scene cleanup covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most Australian home and property insurance policies cover biohazard cleanup costs following a traumatic event at the property, including suicide, as part of the property damage claim. We provide full documentation — scope of works, disposal manifests, clearance certificates — for your insurer. Contact us and your insurer simultaneously — do not delay cleanup as decomposition rapidly escalates the restoration scope.',
      },
    }
  ],
});

export default function SuicideCleanupServicesPage() {
  return (
    <>
      <Script id="suicide-cleanup-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Suicide Cleanup Services',
        subtitle: 'Professional suicide cleanup services services across Australia. 24/7 emergency response for trauma cleaning, compassionate cleanup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Suicide Cleanup Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Suicide Cleanup Services', parentCategory: 'Biohazard Cleaning', context: 'trauma cleaning and compassionate scene remediation' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
