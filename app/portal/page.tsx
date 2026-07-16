import { redirect } from 'next/navigation';

/** Legacy mock portal — send users to login for role routing. */
export default function PortalRedirect() {
  redirect('/login');
}
