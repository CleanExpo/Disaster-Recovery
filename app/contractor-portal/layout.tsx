import { redirect } from 'next/navigation';

/** Nested mock contractor-portal routes → real portal */
export default function ContractorPortalLegacyLayout({
  children: _children,
}: {
  children: React.ReactNode;
}) {
  redirect('/contractor/portal');
}
