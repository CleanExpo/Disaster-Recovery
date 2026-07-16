import { redirect } from 'next/navigation';

/** Nested mock client-portal routes → /account */
export default function ClientPortalLayout({ children: _children }: { children: React.ReactNode }) {
  redirect('/account');
}
