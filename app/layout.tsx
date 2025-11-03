import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { TenantProvider } from "@/contexts/TenantContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import "../styles/modal-fixes.css"
import "../styles/landing-animations.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`font-sans ${poppins.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>
          <TenantProvider>
            <AuthProvider>
              <Suspense fallback={null}>{children}</Suspense>
              <Toaster />
              <Analytics />
            </AuthProvider>
          </TenantProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
