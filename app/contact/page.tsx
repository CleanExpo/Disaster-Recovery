import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// Lazy-loaded: ContactClient ships framer-motion. Kept SSR-on so the
// contact page metadata + body still server-render for SEO.
const ModernContactPage = dynamic(() => import('./ContactClient'));

export const metadata: Metadata = {
  title: 'Contact Us | 24/7 Emergency Line',
  description:
    'Get immediate emergency help for property damage. Contact our 24/7 online response team. Certified restoration specialists respond as soon as a certified contractor is confirmed for your area.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/contact',
  },
  openGraph: {
    title: 'Contact Us | 24/7 Emergency Line',
    description:
      'Get immediate emergency help for property damage. 24/7 online response with certified restoration specialists.',
    type: 'website',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Disaster Recovery',
  url: 'https://disasterrecovery.com.au/contact',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://disasterrecovery.com.au/#organization',
    name: 'Disaster Recovery',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'emergency',
      url: 'https://disasterrecovery.com.au/claim',
      availableLanguage: 'English',
      areaServed: { '@type': 'Country', name: 'Australia' },
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ModernContactPage />
    </>
  );
}
