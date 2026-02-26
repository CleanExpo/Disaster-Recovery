import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emergency Plumbing FAQ',
  description:
    'Frequently asked questions about emergency plumbing and burst pipe response in Australia. Covers after-hours callouts, shut-off procedures and water damage prevention.',
  keywords: ['emergency plumbing FAQ', 'burst pipe questions', 'after-hours plumber help', 'plumbing emergency', 'emergency plumber Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/emergency-plumbing' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
