import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Katherine | Emergency Services Northern Territory',
  description: '24/7 disaster recovery in Katherine, Northern Territory. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function KatherinePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Katherine</h1>
      <p className="text-xl">24/7 Emergency Services in Katherine, Northern Territory</p>
    </div>
  );
}