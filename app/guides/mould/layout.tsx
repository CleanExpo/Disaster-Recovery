import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mould Remediation Guide | Disaster Recovery',
  description:
    'Complete guide to mould remediation in Australia. Understand mould types, health risks, professional removal processes, prevention strategies, and insurance coverage.',
  keywords: [
    'mould remediation guide',
    'mould removal Australia',
    'black mould guide',
    'mould prevention',
    'mould insurance coverage',
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/mould' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
