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
  title: "NRPG Restoration Marketplace Platform - Australia's Leading Restoration SaaS",
  description: "Australia's leading restoration marketplace platform connecting property owners with verified contractors through transparent pricing, automated workflows, and real-time project tracking. Built for scale and growth.",
  keywords: "restoration marketplace, restoration platform, property restoration, contractor network, restoration SaaS, Australia restoration, water damage, fire damage, storm damage",
  generator: "Next.js",
  authors: [{ name: "NRPG Unite Group Australia" }],
  openGraph: {
    title: "NRPG Restoration Marketplace Platform",
    description: "Australia's leading restoration marketplace platform connecting property owners with verified contractors",
    type: "website",
    locale: "en_AU",
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
