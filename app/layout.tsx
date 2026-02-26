import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'
import '@/styles/logo-transparency.css'
import '@/styles/mobile-responsive.css'
import '@/styles/mobile-fixes.css'
import '@/styles/performance-optimizations.css'
import '@/styles/mobile-touch-targets.css'
import '@/styles/antigravity-design-system.css'
import { Providers } from './providers'
import UltraModernHeader from '@/components/UltraModernHeader'
import UltraModernFooter from '@/components/UltraModernFooter'
import DemoModeIndicator from '@/components/DemoModeIndicator'
import DemoModeBanner from '@/components/demo/DemoModeBanner'
import { MicrosoftClarity } from '@/components/analytics/MicrosoftClarity'
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager'
import MobileEmergencyCTA from '@/components/emergency/MobileEmergencyCTA'
import MobileNav from '@/components/mobile/MobileNav'
import MobileFAB from '@/components/mobile/MobileFAB'
import Breadcrumb from '@/components/Breadcrumb'
import NavigationIndicator from '@/components/NavigationIndicator'
import { AntigravityLayoutGuard } from '@/components/AntigravityLayoutGuard'
import LoadingIndicator from '@/components/LoadingIndicator'
import ProgressSpinner from '@/components/ProgressSpinner'
import LazyImage from '@/components/LazyImage'
import GlobalFAQSchema from '@/components/seo/GlobalFAQSchema'
import DynamicBreadcrumbSchema from '@/components/seo/DynamicBreadcrumbSchema'
// import { LiveChat } from '@/components/support/LiveChat' - Removed duplicate
// import { AudioSystemSimple } from '@/components/audio/AudioSystemSimple' - Removed non-functioning

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter'
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://disasterrecovery.com.au'),
  title: {
    default: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services | IICRC Certified',
    template: '%s | Disaster Recovery Australia'
  },
  description: 'Australia\'s leading IICRC-certified disaster restoration specialists. 24/7 emergency response for water damage, fire damage, mould remediation across Sydney, Melbourne, Brisbane, Perth, Adelaide. IICRC-certified. <10,000 certified professionals nationwide.',
  keywords: 'disaster recovery australia, water damage restoration sydney, fire damage melbourne, mould remediation brisbane, emergency restoration perth, flood cleanup adelaide, storm damage repair, biohazard cleanup, IICRC certified, insurance restoration, 24 hour emergency response, commercial restoration, residential restoration',
  authors: [{ name: 'Disaster Recovery Australia' }],
  creator: 'Disaster Recovery Australia',
  publisher: 'National Restoration Professionals Group (NRPG)',
  formatDetection: {
    email: false,
    address: false,
    telephone: false },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Disaster Recovery Australia'
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://disasterrecovery.com.au',
    siteName: 'Disaster Recovery Australia',
    title: 'Disaster Recovery Australia | 24/7 IICRC-Certified Emergency Restoration',
    description: 'Australia\'s elite network of <10,000 IICRC-certified restoration professionals. 24/7 emergency response prevents 50% of secondary damage. Trusted by major insurers.',
    images: [
      {
        url: '/images/disaster-recovery-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery Australia - Emergency Restoration Services' }
    ] },
  twitter: {
    card: 'summary_large_image',
    title: 'Disaster Recovery Australia | 24/7 Emergency Restoration',
    description: 'IICRC-certified disaster recovery. 24-48hr critical response window. Water, fire, mould damage specialists.',
    images: ['/images/disaster-recovery-twitter.jpg'],
    creator: '@DisasterRecovAU' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1 } },
  verification: {
    google: ['dDWcL2TyZJ3cNEkXAqLrpMk8Lc0Yqy0soQzmTUMubVI', 'CrxqogWzyQzp7XriWhZJT0bnxJVkilQawe-0lRQ6pqI'],
    yandex: '',
    yahoo: '',
    other: {} },
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au',
      'en-NZ': 'https://disasterrecovery.com.au',
      'x-default': 'https://disasterrecovery.com.au',
    } },
  category: 'Disaster Recovery Services' }

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="alternate" hrefLang="en-AU" href="https://disasterrecovery.com.au" />
        <link rel="alternate" hrefLang="x-default" href="https://disasterrecovery.com.au" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0052CC" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://disasterrecovery.com.au/#organization",
              "name": "Disaster Recovery Australia",
              "alternateName": "NRPG - National Restoration Professionals Group",
              "url": "https://disasterrecovery.com.au",
              "logo": "https://disasterrecovery.com.au/logos/3D%20Disaster%20Recovery%20Logo%20Image.png",
              "description": "Australia's elite network of IICRC-certified disaster restoration specialists. 24/7 emergency response preventing secondary damage across all major cities and regional areas.",
              "areaServed": {
                "@type": "Country",
                "name": "Australia"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": -25.2744,
                  "longitude": 133.7751
                },
                "geoRadius": "4000000"
              },
              "sameAs": [
                "https://www.facebook.com/DisasterRecoveryAU",
                "https://www.instagram.com/disasterrecoveryau"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "url": "https://disasterrecovery.com.au/claim",
                "contactType": "Online Claims",
                "availableLanguage": "English",
                "areaServed": "AU",
                "availableHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AU",
                "addressRegion": "QLD",
                "addressLocality": "Brisbane"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Disaster Recovery Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Water Damage Restoration",
                      "description": "24/7 emergency water damage restoration and flood recovery"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Fire Damage Restoration",
                      "description": "Complete fire and smoke damage restoration services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mould Remediation",
                      "description": "Professional mould removal and remediation services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Biohazard Cleanup",
                      "description": "Specialised biohazard and trauma scene cleanup"
                    }
                  }
                ]
              }
            })
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://disasterrecovery.com.au/#website",
              "url": "https://disasterrecovery.com.au",
              "name": "Disaster Recovery Australia",
              "description": "Australia's leading disaster recovery and restoration platform. 24/7 emergency response for water damage, fire damage, mould remediation, and more.",
              "publisher": {
                "@id": "https://disasterrecovery.com.au/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://disasterrecovery.com.au/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "inLanguage": "en-AU"
            })
          }}
        />
        <Script
          id="emergency-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EmergencyService",
              "@id": "https://disasterrecovery.com.au/#business",
              "name": "Disaster Recovery",
              "image": "https://disasterrecovery.com.au/images/disaster-recovery-og.jpg",
              "url": "https://disasterrecovery.com.au",
              "priceRange": "$2200+",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AU",
                "addressRegion": "Australia"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -25.2744,
                "longitude": 133.7751
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              },
              "areaServed": [
                { "@type": "State", "name": "New South Wales" },
                { "@type": "State", "name": "Victoria" },
                { "@type": "State", "name": "Queensland" },
                { "@type": "State", "name": "Western Australia" },
                { "@type": "State", "name": "South Australia" },
                { "@type": "State", "name": "Tasmania" },
                { "@type": "State", "name": "Northern Territory" },
                { "@type": "State", "name": "Australian Capital Territory" }
              ]
            })
          }}
        />
        <GlobalFAQSchema />
        <DynamicBreadcrumbSchema />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans`}>
        <a href="#main-content" className="skip-to-main sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-blue-600 focus:text-white focus:no-underline focus:min-w-[200px] focus:min-h-[44px] focus:text-center focus:flex focus:items-center focus:justify-center">
          Skip to main content
        </a>
        <GoogleTagManager />
        <MicrosoftClarity />
        <Providers>
          <AntigravityLayoutGuard>
            <div className="hidden lg:block">
              <UltraModernHeader />
            </div>
            <MobileNav />
            <Breadcrumb />
          </AntigravityLayoutGuard>
          <NavigationIndicator />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <AntigravityLayoutGuard>
            <div className="pb-16 lg:pb-0">
              <UltraModernFooter />
            </div>
            <MobileFAB />
            <MobileEmergencyCTA />
          </AntigravityLayoutGuard>
          <LoadingIndicator />
          <ProgressSpinner />
          <LazyImage />
          {/* <LiveChat /> - Reserved for future version */}
          {/* <AudioSystemSimple /> - Removed as not functioning properly */}
        </Providers>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-98HWF2NV95'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-98HWF2NV95'}');
          `}
        </Script>
      </body>
    </html>
  )
}
