import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Whyalla | Emergency Services South Australia',
  description: '24/7 disaster recovery in Whyalla, South Australia. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function WhyallaPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Whyalla</h1>
      <p className="text-xl">24/7 Emergency Services in Whyalla, South Australia</p>
    </div>
  );
}