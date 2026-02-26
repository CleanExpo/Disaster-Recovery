import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carpet Drying FAQ',
  description:
    'Common questions about professional carpet drying and restoration in Australia. Covers drying timelines, equipment used, IICRC-certified methods and mould prevention.',
  keywords: ['carpet drying FAQ', 'wet carpet questions', 'carpet restoration help', 'carpet flood damage', 'carpet drying Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/carpet-drying' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
