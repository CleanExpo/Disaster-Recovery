import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { TenantProvider } from "@/contexts/TenantContext"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-jakarta",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://disasterrecoverynrpg.com.au'),
  title: {
    default: "NRPG | 1300 309 361 | National Restoration Professionals Group Australia",
    template: "%s | NRPG Disaster Recovery Australia",
  },
  description: "24/7 emergency disaster recovery in major Australian cities. Connect with IICRC-certified restoration contractors for flood, fire, storm & water damage. Professional restoration standards. Call 1300 309 361.",
  keywords: [
    // Primary Australian keywords
    "disaster recovery australia",
    "emergency restoration australia",
    "flood restoration sydney",
    "fire damage restoration melbourne",
    "water damage restoration brisbane",
    "storm damage repair perth",
    "mold remediation adelaide",

    // Service-specific
    "24/7 emergency restoration",
    "verified restoration contractors",
    "IICRC certified restorers",
    "professional restoration",
    "water damage cleanup",
    "fire damage repair",
    "trauma cleanup australia",
    "biohazard restoration",

    // Local modifiers
    "same day restoration services",
    "emergency water extraction",
    "insurance approved contractors",
    "property disaster recovery",

    // Brand
    "NRPG",
    "National Restoration Professionals Group",
    "1300 309 361",
  ],
  authors: [
    { name: "NRPG Unite Group Australia", url: "https://disasterrecoverynrpg.com.au" }
  ],
  creator: "NRPG Australia",
  publisher: "National Restoration Professionals Group",
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
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://disasterrecoverynrpg.com.au",
    siteName: "NRPG - National Restoration Professionals Group",
    title: "NRPG | 1300 309 361 | Australia's Emergency Restoration Network",
    description: "24/7 disaster recovery. IICRC-certified contractors. Flood, fire, storm & water damage restoration in major cities. Professional standards. Call 1300 309 361.",
    images: [
      {
        url: "/images/og-nrpg-main.jpg",
        width: 1200,
        height: 630,
        alt: "NRPG - National Emergency Restoration Network Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRPG | Emergency Restoration Australia | 1300 309 361",
    description: "24/7 disaster recovery. Verified contractors. Flood, fire, storm damage restoration in major cities. Call 1300 309 361.",
    images: ["/images/twitter-nrpg.jpg"],
    creator: "@NRPGAustralia",
  },
  alternates: {
    canonical: "https://disasterrecoverynrpg.com.au",
  },
  verification: {
    google: "google-site-verification-code-here",
    other: {
      "msvalidate.01": "bing-verification-code-here",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`font-sans ${jakarta.variable} ${spaceGrotesk.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <TenantProvider>
              <Suspense fallback={null}>{children}</Suspense>
              <Analytics />
            </TenantProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
