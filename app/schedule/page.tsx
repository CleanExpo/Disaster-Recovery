import { Metadata } from 'next';
import SchedulePage from './ScheduleClient';

export const metadata: Metadata = {
  title: 'Schedule Restoration Service | Disaster Recovery',
  description: 'Book your disaster restoration service online. Choose your date, time, and service type. IICRC-certified contractors across Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/schedule',
  },
  openGraph: {
    title: 'Schedule Restoration Service | Disaster Recovery',
    description: 'Book disaster restoration services online. Choose date, time, and service type.',
    type: 'website',
  },
};

export default function SchedulePageWrapper() {
  return <SchedulePage />;
}
