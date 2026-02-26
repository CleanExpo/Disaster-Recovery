import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Legal | Disaster Recovery Australia',
    default: 'Legal Documents | Disaster Recovery Australia',
  },
  description:
    'Legal documents, terms of service, privacy policy, and compliance documentation for Disaster Recovery Australia.',
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

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
