import { redirect } from 'next/navigation';

/** Nested mock /portal routes → login */
export default function LegacyPortalLayout({
  children: _children,
}: {
  children: React.ReactNode;
}) {
  redirect('/login');
}
