import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Liverpool | Emergency Services New South Wales',
  description: '24/7 disaster recovery in Liverpool, New South Wales. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function LiverpoolPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Liverpool</h1>
      <p className="text-xl">24/7 Emergency Services in Liverpool, New South Wales</p>
    </div>
  );
}