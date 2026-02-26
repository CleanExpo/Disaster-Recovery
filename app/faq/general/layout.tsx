import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'General FAQ',
  description:
    'General frequently asked questions about disaster recovery services in Australia. Covers service areas, IICRC-certified contractors, booking and what to expect.',
  keywords: ['disaster recovery FAQ', 'restoration service questions', 'IICRC certified FAQ', 'disaster recovery cost', 'property restoration Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/general' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
