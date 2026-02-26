import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Electronics Restoration FAQ',
  description:
    'Answers to electronics restoration and recovery questions in Australia. Covers water-damaged devices, data recovery, IICRC-certified cleaning and success rates.',
  keywords: ['electronics restoration FAQ', 'water damaged electronics questions', 'device recovery help', 'data recovery flood', 'electronics cleaning Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/electronics-restoration' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
