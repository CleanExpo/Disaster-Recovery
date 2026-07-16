import { redirect } from 'next/navigation';

/** Path B “payment held / KPI release” success surface retired — ADR-014. */
export default function BookServiceSuccessRedirect() {
  redirect('/claim');
}
