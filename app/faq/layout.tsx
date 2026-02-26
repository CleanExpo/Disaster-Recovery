import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | FAQ | Disaster Recovery Australia',
    default: 'Frequently Asked Questions | Disaster Recovery Australia',
  },
  description: 'Expert answers to common disaster recovery questions. Water damage, fire damage, mould removal, insurance claims, emergency response and more.',
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
