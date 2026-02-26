import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emergency Response FAQ',
  description:
    'Frequently asked questions about 24/7 emergency disaster response in Australia. Covers response times, make-safe procedures and IICRC-certified emergency teams.',
  keywords: ['emergency response FAQ', 'disaster emergency help', '24/7 emergency restoration', 'emergency response time', 'disaster recovery Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/emergency-response' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
