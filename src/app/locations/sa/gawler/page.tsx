import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Gawler | Emergency Services South Australia',
  description: '24/7 disaster recovery in Gawler, South Australia. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function GawlerPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Gawler</h1>
      <p className="text-xl">24/7 Emergency Services in Gawler, South Australia</p>
    </div>
  );
}