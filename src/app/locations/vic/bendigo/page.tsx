import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Bendigo | Emergency Services Victoria',
  description: '24/7 disaster recovery in Bendigo, Victoria. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function BendigoPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Bendigo</h1>
      <p className="text-xl">24/7 Emergency Services in Bendigo, Victoria</p>
    </div>
  );
}