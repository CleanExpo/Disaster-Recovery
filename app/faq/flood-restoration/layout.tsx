import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flood Restoration FAQ',
  description:
    'Common questions about flood damage restoration across Australia. Covers floodwater categories, drying equipment, IICRC-certified protocols and health precautions.',
  keywords: ['flood restoration FAQ', 'flood damage questions', 'floodwater cleanup help', 'flood recovery cost', 'flood damage Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/flood-restoration' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
