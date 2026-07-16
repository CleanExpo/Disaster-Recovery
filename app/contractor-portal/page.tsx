import { redirect } from 'next/navigation';

/** Legacy mock contractor portal — use /contractor/portal. */
export default function ContractorPortalRedirect() {
  redirect('/contractor/portal');
}
