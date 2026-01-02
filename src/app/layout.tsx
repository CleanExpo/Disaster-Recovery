import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://disaster-recovery-nrpg.com'),
  title: {
    default: 'Disaster Recovery NRPG - Complete Emergency Preparedness Platform',
    template: '%s | Disaster Recovery NRPG',
  },
  description:
    'Comprehensive disaster recovery and emergency preparedness platform. Access expert guides, interactive tools, and AI-powered assistance for earthquakes, floods, fires, and all disaster types.',
  keywords: [
    'disaster recovery',
    'emergency preparedness',
    'earthquake safety',
    'flood preparedness',
    'wildfire safety',
    'hurricane preparedness',
    'emergency planning',
    'disaster supplies',
    'evacuation planning',
    'family emergency plan',
  ],
  authors: [{ name: 'Disaster Recovery NRPG' }],
  creator: 'Disaster Recovery NRPG',
  publisher: 'Disaster Recovery NRPG',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://disaster-recovery-nrpg.com',
    title: 'Disaster Recovery NRPG - Complete Emergency Preparedness Platform',
    description:
      'Comprehensive disaster recovery and emergency preparedness platform. Access expert guides, interactive tools, and AI-powered assistance.',
    siteName: 'Disaster Recovery NRPG',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery NRPG',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disaster Recovery NRPG - Complete Emergency Preparedness Platform',
    description:
      'Comprehensive disaster recovery and emergency preparedness platform. Access expert guides, interactive tools, and AI-powered assistance.',
    images: ['/og-image.jpg'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://api.stripe.com" />

        {/* Critical CSS - inline first paint styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for first paint */
              *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor}
              html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:${GeistSans.style.fontFamily},ui-sans-serif,system-ui,sans-serif}
              body{margin:0;line-height:inherit}
              .loading{opacity:0;animation:fadeIn 0.3s ease-in forwards}
              @keyframes fadeIn{to{opacity:1}}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased loading">
        <Providers>
          {children}
          {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
        </Providers>

        {/* Vercel Analytics */}
        <Analytics />

        {/* Web Vitals tracking */}
        <Script
          id="web-vitals"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;

                // Initialize web vitals
                import('web-vitals').then(({ getCLS, getFCP, getFID, getLCP, getTTFB }) => {
                  function sendToAnalytics(metric) {
                    // Send to Vercel Analytics
                    if (window.va) {
                      window.va('event', {
                        name: 'Web Vitals',
                        data: {
                          name: metric.name,
                          value: metric.value,
                          rating: metric.rating,
                          delta: metric.delta,
                        }
                      });
                    }

                    // Send to custom endpoint
                    if (navigator.sendBeacon) {
                      navigator.sendBeacon(
                        '/api/analytics/web-vitals',
                        JSON.stringify(metric)
                      );
                    }
                  }

                  getCLS(sendToAnalytics);
                  getFCP(sendToAnalytics);
                  getFID(sendToAnalytics);
                  getLCP(sendToAnalytics);
                  getTTFB(sendToAnalytics);
                });
              })();
            `,
          }}
        />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/geist-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/geist-mono.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}
