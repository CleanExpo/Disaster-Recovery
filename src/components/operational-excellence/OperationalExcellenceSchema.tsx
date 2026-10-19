'use client';

import Script from 'next/script';

interface OperationalExcellenceSchemaProps {
  title: string;
  description: string;
  slug: string;
  faqs: { question: string; answer: string }[];
}

export function OperationalExcellenceSchema({
  title,
  description,
  slug,
  faqs,
}: OperationalExcellenceSchemaProps) {
  const baseUrl = 'https://disasterrecovery.com.au';

  const serviceSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: title,
    name: title,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Disaster Recovery',
      url: baseUrl,
    },
    areaServed: [
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'New Zealand' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${baseUrl}/operational-excellence/${slug}`,
      availableLanguage: {
        '@type': 'Language',
        name: 'English',
      },
    },
  });

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Operational Excellence',
        item: `${baseUrl}/operational-excellence`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${baseUrl}/operational-excellence/${slug}`,
      },
    ],
  });

  // Executive Partners page gets additional Organization schemas
  const orgSchemas =
    slug === 'executive-partners'
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'IICRC',
            url: 'https://www.iicrc.org',
            description:
              'Institute of Inspection, Cleaning and Restoration Certification — the global standard-setting body for the restoration industry.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'CARSI',
            url: 'https://www.carsi.com.au',
            description:
              "Cleaning and Restoration Services Industry — Australia's peak industry body for the cleaning and restoration sector.",
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'RestoreAssist',
            description:
              'Restoration intelligence platform connecting insurers, loss adjusters, and restoration companies across Australia.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'NRPG',
            description:
              'National Restoration Professionals Group — connecting vetted, certified restoration contractors across Australia and New Zealand.',
          },
        ]
      : [];

  return (
    <>
      <Script id={`oe-service-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {serviceSchema}
      </Script>
      <Script id={`oe-faq-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {faqSchema}
      </Script>
      <Script id={`oe-breadcrumb-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {breadcrumbSchema}
      </Script>
      {orgSchemas.map((org, i) => (
        <Script
          key={i}
          id={`oe-org-${slug}-${i}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(org)}
        </Script>
      ))}
    </>
  );
}
