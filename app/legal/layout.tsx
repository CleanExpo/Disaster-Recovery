import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Legal | Disaster Recovery',
    default: 'Legal Documents | Disaster Recovery',
  },
  description:
    'Legal documents, terms of service, privacy policy, and compliance documentation for Disaster Recovery.',
  robots: { index: true, follow: true },
  keywords: [
    'disaster recovery legal',
    'contractor agreements',
    'service terms',
    'privacy policy',
    'compliance documents Australia',
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/legal' },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
