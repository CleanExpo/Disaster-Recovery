import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contents Restoration FAQ',
  description:
    'Frequently asked questions about contents restoration and salvage in Australia. Covers furniture, valuables, IICRC-certified cleaning techniques and pack-out services.',
  keywords: ['contents restoration FAQ', 'salvage questions', 'furniture restoration help', 'pack-out service', 'contents cleaning Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/contents-restoration' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
