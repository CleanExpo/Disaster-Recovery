import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Fremantle | Emergency Services Western Australia',
  description: '24/7 disaster recovery in Fremantle, Western Australia. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function FremantlePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Fremantle</h1>
      <p className="text-xl">24/7 Emergency Services in Fremantle, Western Australia</p>
    </div>
  );
}