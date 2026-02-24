import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    images?: { url: string; alt: string }[]
    type?: string
  }
  structuredData?: any
}

export function generateSEO(config: SEOConfig): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://disasterrecovery.com.au'
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords.join(', '),
    alternates: {
      canonical: config.canonical || baseUrl },
    openGraph: {
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      url: config.canonical || baseUrl,
      siteName: 'Disaster Recovery',
      images: config.openGraph?.images || [
        {
          url: `${baseUrl}/images/disaster-recovery-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Disaster Recovery - 24/7 Online Emergency Response' },
      ],
      locale: 'en_AU',
      type: (config.openGraph?.type || 'website') as 'website' | 'article' },
    twitter: {
      card: 'summary_large_image',
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      images: config.openGraph?.images?.map(img => img.url) || [`${baseUrl}/images/disaster-recovery-og.jpg`] },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1 } } }
}

// Schema.org structured data generators
export interface BusinessLocationInfo {
  streetAddress?: string
  postalCode?: string
  city: string
  state: string
  stateFullName: string
  latitude: number
  longitude: number
  areaServed: string[]
}

export const generateLocalBusinessSchema = (businessInfo: BusinessLocationInfo) => ({
  '@context': 'https://schema.org',
  '@type': 'DamageRestorationService',
  '@id': 'https://disasterrecovery.com.au/#organization',
  name: 'Disaster Recovery',
  url: 'https://disasterrecovery.com.au',
  logo: {
    '@type': 'ImageObject',
    url: 'https://disasterrecovery.com.au/logos/3D%20Disaster%20Recovery%20Logo%20Image.png',
    width: 250,
    height: 60 },
  image: 'https://disasterrecovery.com.au/images/disaster-recovery-og.jpg',
  description: `${businessInfo.city}, ${businessInfo.stateFullName}'s trusted 24/7 emergency disaster recovery and restoration specialists. Water damage, fire damage, mould remediation, and biohazard cleaning services.`,
  email: 'info@disasterrecovery.com.au',
  address: {
    '@type': 'PostalAddress',
    streetAddress: businessInfo.streetAddress,
    addressLocality: businessInfo.city,
    addressRegion: businessInfo.state,
    postalCode: businessInfo.postalCode,
    addressCountry: 'AU' },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: businessInfo.latitude,
    longitude: businessInfo.longitude },
  areaServed: businessInfo.areaServed.map(name => ({ '@type': 'City', name })),
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59' },
  sameAs: [
    'https://www.facebook.com/DisasterRecoveryAU',
    'https://www.linkedin.com/company/disaster-recovery-au',
    'https://www.instagram.com/disasterrecoveryau',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Disaster Recovery Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Water Damage Restoration',
          description: 'Emergency water extraction, drying, and restoration services' } },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fire Damage Restoration',
          description: 'Smoke, soot, and fire damage cleanup and restoration' } },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mould Remediation',
          description: 'Professional mould inspection, removal, and prevention' } },
    ] },
 })

export const generateServiceSchema = (service: {
  name: string
  description: string
  image?: string
  provider?: any
  areaServed?: string[]
  availableChannel?: any
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: service.name,
  name: service.name,
  description: service.description,
  provider: service.provider || {
    '@type': 'Organization',
    name: 'Disaster Recovery Australia',
    url: 'https://disasterrecovery.com.au' },
  areaServed: service.areaServed || ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Hobart', 'Darwin', 'Newcastle'],
  availableChannel: service.availableChannel || {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://disasterrecovery.com.au/claim',
    availableLanguage: {
      '@type': 'Language',
      name: 'English' } },
  termsOfService: 'https://disasterrecovery.com.au/terms',
  image: service.image })

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer } })) })

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url })) })

export const generateArticleSchema = (article: {
  headline: string
  description: string
  image?: string
  author?: string
  datePublished: string
  dateModified?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.headline,
  description: article.description,
  image: article.image,
  author: {
    '@type': 'Person',
    name: article.author || 'Disaster Recovery Team' },
  publisher: {
    '@type': 'Organization',
    name: 'Disaster Recovery Australia',
    logo: {
      '@type': 'ImageObject',
      url: 'https://disasterrecovery.com.au/logos/3D%20Disaster%20Recovery%20Logo%20Image.png' } },
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://disasterrecovery.com.au' } })