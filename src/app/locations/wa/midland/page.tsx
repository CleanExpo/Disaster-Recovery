import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Midland | Emergency Services Western Australia',
  description: '24/7 disaster recovery in Midland, Western Australia. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function MidlandPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Midland</h1>
      <p className="text-xl">24/7 Emergency Services in Midland, Western Australia</p>
    </div>
  );
}