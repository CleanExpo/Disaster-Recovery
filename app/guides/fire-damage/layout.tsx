import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Guide | Disaster Recovery',
  description:
    'Complete guide to fire and smoke damage restoration in Australia. Learn about assessment, cleanup, smoke odour removal, and navigating insurance claims after a fire.',
  keywords: [
    'fire damage guide',
    'smoke damage restoration',
    'fire restoration process',
    'fire damage insurance',
    'smoke removal guide Australia',
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/fire-damage' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
