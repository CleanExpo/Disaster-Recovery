import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insurance Claims FAQ',
  description:
    'Answers to frequently asked insurance claim questions for disaster recovery in Australia. Covers documentation, claim timelines, excess payments and contractor billing.',
  keywords: ['insurance claims FAQ', 'disaster insurance questions', 'home insurance claim help', 'insurance billing restoration', 'property damage claim Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/insurance-claims' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
