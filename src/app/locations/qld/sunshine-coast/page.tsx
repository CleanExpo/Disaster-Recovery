import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Sunshine Coast | Emergency Services Queensland',
  description: '24/7 disaster recovery in Sunshine Coast, Queensland. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function SunshineCoastPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Sunshine Coast</h1>
      <p className="text-xl">24/7 Emergency Services in Sunshine Coast, Queensland</p>
    </div>
  );
}