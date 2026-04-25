import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Storm Damage Restoration Guide | Disaster Recovery',
  description:
    'Complete guide to storm damage restoration in Australia. Learn about emergency response, roof damage, hail damage repair, insurance claims, and cyclone recovery.',
  keywords: [
    'storm damage guide',
    'storm damage restoration',
    'hail damage repair',
    'cyclone recovery guide',
    'storm damage insurance Australia',
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/storm-damage' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
