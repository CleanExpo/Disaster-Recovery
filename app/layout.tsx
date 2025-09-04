import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'
import '@/styles/modern-system.css'
import '@/styles/logo-transparency.css'
import '@/styles/mobile-responsive.css'
import '@/styles/mobile-fixes.css'
import '@/styles/storm-clouds.css'
import '@/styles/enhanced-storm.css'
import '@/styles/performance-optimizations.css'
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
import { LiveChat } from '@/components/support/LiveChat'
import { AudioSystemSimple } from '@/components/audio/AudioSystemSimple'

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
    default: 'Disaster Recovery | 24/7 Emergency Restoration Services',
    template: '%s | Disaster Recovery'
  },
  description: 'Leading disaster recovery and restoration specialists. 24/7 emergency response for water damage, fire damage, mould remediation, and biohazard cleanup across all major cities.',
  keywords: 'disaster recovery, water damage restoration, fire damage, mould removal, emergency restoration, flood cleanup, storm damage, biohazard cleanup, insurance restoration',
  authors: [{ name: 'Disaster Recovery' }],
  creator: 'Disaster Recovery',
  publisher: 'Disaster Recovery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover'
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Disaster Recovery'
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://disasterrecovery.com.au',
    siteName: 'Disaster Recovery',
    title: 'Disaster Recovery | 24/7 Emergency Restoration Services',
    description: 'Leading disaster recovery and restoration specialists. 24/7 emergency response across all major cities.',
    images: [
      {
        url: '/images/disaster-recovery-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery' }
    ] },
  twitter: {
    card: 'summary_large_image',
    title: 'Disaster Recovery | 24/7 Emergency Restoration',
    description: 'Leading disaster recovery specialists. 24/7 emergency response for water, fire, mould damage.',
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
    google: 'google8f4d3e5a7b9c2d1e',
    yandex: '',
    yahoo: '',
    other: {
      'msvalidate.01': 'B3F4D7E8C9A2B1C3D4E5F6A7B8C9D0E1',
      'facebook-domain-verification': 'abcdef123456789' } },
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au' } },
  category: 'Disaster Recovery Services' }

export default function RootLayout({
  children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="msvalidate.01" content="B3F4D7E8C9A2B1C3D4E5F6A7B8C9D0E1" />
        <link rel="icon" type="image/png" href="/logos/disaster-recovery-logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logos/disaster-recovery-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logos/disaster-recovery-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logos/disaster-recovery-logo.png" />
        <link rel="shortcut icon" href="/logos/disaster-recovery-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-colour" content="#0052CC" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Disaster Recovery",
              "alternateName": "NRP - National Restoration Platform",
              "url": "https://disasterrecovery.com.au",
              "logo": "https://disasterrecovery.com.au/logos/3D%20Disaster%20Recovery%20Logo%20Image.png",
              "description": "Leading disaster recovery and restoration specialists providing 24/7 emergency response across Australia",
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
                "https://www.linkedin.com/company/disaster-recovery-au",
                "https://www.instagram.com/disasterrecoveryau",
                "https://www.youtube.com/@DisasterRecoveryAU"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+61-1300-DISASTER",
                "contactType": "Emergency Service",
                "availableLanguage": "English",
                "areaServed": "AU",
                "contactOption": "TollFree",
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
                      "description": "Specialized biohazard and trauma scene cleanup"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1247",
                "bestRating": "5"
              }
            })
          }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans`}>
        <GoogleTagManager />
        <MicrosoftClarity />
        <Providers>
          <div className="hidden lg:block">
            <UltraModernHeader />
          </div>
          <MobileNav />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <div className="pb-16 lg:pb-0">
            <UltraModernFooter />
          </div>
          <MobileFAB />
          <MobileEmergencyCTA />
          <LiveChat />
          <AudioSystemSimple />
        </Providers>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}');
          `}
        </Script>
      </body>
    </html>
  )
}
