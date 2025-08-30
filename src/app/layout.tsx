import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'
import '@/styles/modern-system.css'
import { Providers } from './providers'
import UltraModernHeader from '@/components/UltraModernHeader'
import UltraModernFooter from '@/components/UltraModernFooter'
import DemoModeIndicator from '@/components/DemoModeIndicator'
import DemoModeBanner from '@/components/demo/DemoModeBanner'
import { MicrosoftClarity } from '@/components/analytics/MicrosoftClarity'
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager'

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
    default: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services',
    template: '%s | Disaster Recovery Australia'
  },
  description: 'Australia\'s leading disaster recovery and restoration specialists. 24/7 emergency response for water damage, fire damage, mould remediation, and biohazard cleanup across all major cities.',
  keywords: 'disaster recovery, water damage restoration, fire damage, mould removal, emergency restoration, flood cleanup, storm damage, biohazard cleanup, insurance restoration, Australia',
  authors: [{ name: 'Disaster Recovery Australia' }],
  creator: 'Disaster Recovery Australia',
  publisher: 'Disaster Recovery Australia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://disasterrecovery.com.au',
    siteName: 'Disaster Recovery Australia',
    title: 'Disaster Recovery Australia | 24/7 Emergency Restoration Services',
    description: 'Australia\'s leading disaster recovery and restoration specialists. 24/7 emergency response across all major cities.',
    images: [
      {
        url: '/images/disaster-recovery-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery Australia',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disaster Recovery Australia | 24/7 Emergency Restoration',
    description: 'Australia\'s leading disaster recovery specialists. 24/7 emergency response for water, fire, mould damage.',
    images: ['/images/disaster-recovery-twitter.jpg'],
    creator: '@DisasterRecovAU',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google8f4d3e5a7b9c2d1e',
    yandex: '',
    yahoo: '',
    other: {
      'msvalidate.01': 'B3F4D7E8C9A2B1C3D4E5F6A7B8C9D0E1',
      'facebook-domain-verification': 'abcdef123456789',
    },
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au',
    },
  },
  category: 'Disaster Recovery Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <head>
        <meta name="msvalidate.01" content="B3F4D7E8C9A2B1C3D4E5F6A7B8C9D0E1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/NRP favicon_32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/NRP favicon_16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/NRP favicon_512x512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-colour" content="#0052CC" />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans`}>
        <GoogleTagManager />
        <MicrosoftClarity />
        <Providers>
          <DemoModeBanner />
          <UltraModernHeader />
          <main id="main-content">
            {children}
          </main>
          <UltraModernFooter />
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
