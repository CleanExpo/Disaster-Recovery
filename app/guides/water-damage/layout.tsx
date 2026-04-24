import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Guide | Disaster Recovery',
  description:
    'Complete guide to water damage restoration in Australia. Understand water categories, drying processes, insurance claims, and when to call a certified professional.',
  keywords: [
    'water damage guide',
    'water damage restoration',
    'flood damage recovery',
    'water extraction guide',
    'water damage insurance Australia',
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/water-damage' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
