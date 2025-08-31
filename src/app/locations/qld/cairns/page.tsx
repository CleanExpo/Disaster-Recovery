import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Cairns | Emergency Services Queensland',
  description: '24/7 disaster recovery in Cairns, Queensland. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function CairnsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Cairns</h1>
      <p className="text-xl">24/7 Emergency Services in Cairns, Queensland</p>
    </div>
  );
}