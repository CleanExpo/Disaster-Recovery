import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Bunbury | Emergency Services Western Australia',
  description: '24/7 disaster recovery in Bunbury, Western Australia. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function BunburyPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Bunbury</h1>
      <p className="text-xl">24/7 Emergency Services in Bunbury, Western Australia</p>
    </div>
  );
}