import { redirect } from 'next/navigation';

/** Legacy mock client portal — use /account. */
export default function ClientPortalRedirect() {
  redirect('/account');
}
