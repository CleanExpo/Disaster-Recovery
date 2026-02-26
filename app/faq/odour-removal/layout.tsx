import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Odour Removal FAQ',
  description:
    'Common questions about professional odour removal and deodorisation in Australia. Covers smoke odour, mould smells, IICRC-certified techniques and ozone treatment.',
  keywords: ['odour removal FAQ', 'smoke smell questions', 'deodorisation help', 'mould odour removal', 'odour treatment Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/odour-removal' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
