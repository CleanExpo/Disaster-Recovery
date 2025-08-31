import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Ballarat | Emergency Services Victoria',
  description: '24/7 disaster recovery in Ballarat, Victoria. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function BallaratPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Ballarat</h1>
      <p className="text-xl">24/7 Emergency Services in Ballarat, Victoria</p>
    </div>
  );
}