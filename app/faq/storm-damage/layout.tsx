import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Storm Damage FAQ',
  description:
    'Common questions about storm damage repair and recovery across Australia. Covers roof damage, fallen trees, emergency make-safe and IICRC-certified restoration.',
  keywords: ['storm damage FAQ', 'storm damage repair questions', 'roof damage help', 'cyclone damage restoration', 'storm recovery Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/storm-damage' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
