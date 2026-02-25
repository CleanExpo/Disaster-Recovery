'use client';

import Script from 'next/script';

interface KnowledgeSchemaProps {
  title: string;
  description: string;
  slug: string;
  faqs: { question: string; answer: string }[];
  datePublished?: string;
}

export function KnowledgeSchema({
  title,
  description,
  slug,
  faqs,
  datePublished = '2025-01-15',
}: KnowledgeSchemaProps) {
  const baseUrl = 'https://disaster-recovery-seven-virid.vercel.app';

  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Organization',
      name: 'Disaster Recovery',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Disaster Recovery',
      url: baseUrl,
    },
    datePublished,
    dateModified: '2025-06-01',
    mainEntityOfPage: `${baseUrl}/knowledge/${slug}`,
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
        name: 'Knowledge Base',
        item: `${baseUrl}/knowledge`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${baseUrl}/knowledge/${slug}`,
      },
    ],
  });

  return (
    <>
      <Script id={`article-schema-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {articleSchema}
      </Script>
      <Script id={`faq-schema-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {faqSchema}
      </Script>
      <Script id={`breadcrumb-schema-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {breadcrumbSchema}
      </Script>
    </>
  );
}
