import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biohazard Cleanup FAQ',
  description:
    'Answers to biohazard and trauma cleanup questions in Australia. Covers safety protocols, IICRC-certified decontamination, disposal regulations and turnaround times.',
  keywords: ['biohazard cleanup FAQ', 'trauma cleaning questions', 'biohazard decontamination help', 'hazardous waste cleanup', 'biohazard cleaning Australia'],
  alternates: { canonical: 'https://disasterrecovery.com.au/faq/biohazard-cleanup' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
