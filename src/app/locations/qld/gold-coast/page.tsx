import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Gold Coast | Emergency Services Queensland',
  description: '24/7 disaster recovery in Gold Coast, Queensland. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function GoldCoastPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Gold Coast</h1>
      <p className="text-xl">24/7 Emergency Services in Gold Coast, Queensland</p>
    </div>
  );
}