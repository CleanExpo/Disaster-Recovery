import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Townsville | Emergency Services Queensland',
  description: '24/7 disaster recovery in Townsville, Queensland. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function TownsvillePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Townsville</h1>
      <p className="text-xl">24/7 Emergency Services in Townsville, Queensland</p>
    </div>
  );
}