import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | Disaster Recovery',
  description:
    'Search for disaster recovery services, locations, guides, and resources across Australia. Find the help you need for water damage, fire, mould, storm, and more.',
  alternates: { canonical: 'https://disasterrecovery.com.au/search' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
