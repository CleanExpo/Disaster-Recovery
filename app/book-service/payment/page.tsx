import { redirect } from 'next/navigation';

/** Path B payment surface retired — ADR-014. */
export default function BookServicePaymentRedirect() {
  redirect('/claim');
}
