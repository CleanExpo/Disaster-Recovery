import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Palmerston | Emergency Services Northern Territory',
  description: '24/7 disaster recovery in Palmerston, Northern Territory. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function PalmerstonPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Palmerston</h1>
      <p className="text-xl">24/7 Emergency Services in Palmerston, Northern Territory</p>
    </div>
  );
}