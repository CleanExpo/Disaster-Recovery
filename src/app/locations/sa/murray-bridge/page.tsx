import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Murray Bridge | Emergency Services South Australia',
  description: '24/7 disaster recovery in Murray Bridge, South Australia. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function MurrayBridgePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Murray Bridge</h1>
      <p className="text-xl">24/7 Emergency Services in Murray Bridge, South Australia</p>
    </div>
  );
}