import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fire Damage FAQ',
  description:
    'Frequently asked questions about fire damage restoration in Australia. Covers smoke damage, soot removal, IICRC-certified techniques and rebuilding timelines.',
  keywords: ['fire damage FAQ', 'smoke damage questions', 'fire restoration help', 'fire damage insurance', 'smoke removal Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/fire-damage' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
