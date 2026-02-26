import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Water Damage FAQ',
  description:
    'Answers to common water damage restoration questions in Australia. Learn about drying times, IICRC-certified processes, burst pipe response and insurance documentation.',
  keywords: ['water damage FAQ', 'water damage restoration questions', 'flood damage help', 'water extraction FAQ', 'water damage insurance Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/water-damage' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
