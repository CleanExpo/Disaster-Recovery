import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Who's First? Emergency Priority Guide | Disaster Recovery",
  description:
    'Interactive guide to understand emergency response priorities after property damage. Learn who to call first, what steps to take, and how to protect your insurance claim.',
  keywords: [
    'emergency priority guide',
    'who to call first disaster',
    'emergency response order',
    'property damage first steps',
    'disaster recovery priority Australia',
  ],
  alternates: { canonical: 'https://disasterrecovery.com.au/whos-first' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
