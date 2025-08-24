import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Mount Gambier | Emergency Services South Australia',
  description: '24/7 disaster recovery in Mount Gambier, South Australia. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function MountGambierPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Mount Gambier</h1>
      <p className="text-xl">24/7 Emergency Services in Mount Gambier, South Australia</p>
    </div>
  );
}