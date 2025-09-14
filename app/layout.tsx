import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

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
  title: "NRP Restoration Marketplace Platform - Australia's Leading Restoration SaaS",
  description: "Australia's leading restoration marketplace platform connecting property owners with verified contractors through transparent pricing, automated workflows, and real-time project tracking. Built for scale and growth.",
  keywords: "restoration marketplace, restoration platform, property restoration, contractor network, restoration SaaS, Australia restoration, water damage, fire damage, storm damage",
  generator: "Next.js",
  authors: [{ name: "NRP Unite Group Australia" }],
  openGraph: {
    title: "NRP Restoration Marketplace Platform",
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
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
