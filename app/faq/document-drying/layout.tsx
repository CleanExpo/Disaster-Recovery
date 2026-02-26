import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Document Drying FAQ',
  description:
    'Common questions about document drying and paper recovery services in Australia. Covers freeze-drying, vacuum techniques, IICRC-certified handling and turnaround times.',
  keywords: ['document drying FAQ', 'paper recovery questions', 'freeze-drying documents', 'water damaged documents help', 'document restoration Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/document-drying' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
