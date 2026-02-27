import { Metadata } from 'next';
import QuotePage from './QuoteClient';

export const metadata: Metadata = {
  title: 'Get a Cost Estimate',
  description: 'Get a cost estimate from IICRC-certified disaster recovery contractors. Water damage, fire, mould, and storm restoration estimates based on your details.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/quote',
  },
  openGraph: {
    title: 'Get a Cost Estimate',
    description: 'Cost estimates from IICRC-certified disaster recovery contractors based on the details you provide.',
    type: 'website',
  },
};

export default function QuotePageWrapper() {
  return <QuotePage />;
}
