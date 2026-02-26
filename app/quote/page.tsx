import { Metadata } from 'next';
import QuotePage from './QuoteClient';

export const metadata: Metadata = {
  title: 'Get a Free Quote | Disaster Recovery Australia',
  description: 'Request a free quote from IICRC-certified disaster recovery contractors. Water damage, fire, mould, and storm restoration quotes within 30 minutes.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/quote',
  },
  openGraph: {
    title: 'Get a Free Quote | Disaster Recovery Australia',
    description: 'Free quotes from IICRC-certified disaster recovery contractors within 30 minutes.',
    type: 'website',
  },
};

export default function QuotePageWrapper() {
  return <QuotePage />;
}
