import { redirect } from 'next/navigation';

/** Mock CRM demo — production destinations are role dashboards. */
export default function CrmRedirectPage() {
  redirect('/login?callbackUrl=/admin');
}
