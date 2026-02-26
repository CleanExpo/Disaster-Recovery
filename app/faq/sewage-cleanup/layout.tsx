import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sewage Cleanup FAQ',
  description:
    'Frequently asked questions about sewage damage cleanup in Australia. Covers health hazards, IICRC-certified sanitisation, category 3 water and safe re-entry.',
  keywords: ['sewage cleanup FAQ', 'sewage damage questions', 'sewage overflow help', 'category 3 water cleanup', 'sewage restoration Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/sewage-cleanup' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
