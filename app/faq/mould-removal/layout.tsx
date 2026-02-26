import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mould Removal FAQ',
  description:
    'Expert answers to mould remediation questions for Australian properties. Covers health risks, IICRC-certified removal methods, prevention strategies and testing.',
  keywords: ['mould removal FAQ', 'mould remediation questions', 'black mould help', 'mould removal cost', 'mould prevention Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/mould-removal' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
