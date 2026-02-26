import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ceiling Repairs FAQ',
  description:
    'Answers to ceiling repair and water-damaged ceiling questions in Australia. Covers sagging ceilings, plasterboard replacement, drying processes and safety concerns.',
  keywords: ['ceiling repair FAQ', 'water damaged ceiling questions', 'sagging ceiling help', 'plasterboard replacement', 'ceiling restoration Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/ceiling-repairs' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
