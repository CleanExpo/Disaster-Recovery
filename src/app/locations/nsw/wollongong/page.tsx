import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Wollongong | Emergency Services New South Wales',
  description: '24/7 disaster recovery in Wollongong, New South Wales. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function WollongongPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Wollongong</h1>
      <p className="text-xl">24/7 Emergency Services in Wollongong, New South Wales</p>
    </div>
  );
}