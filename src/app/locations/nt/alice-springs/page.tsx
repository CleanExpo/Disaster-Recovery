import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Alice Springs | Emergency Services Northern Territory',
  description: '24/7 disaster recovery in Alice Springs, Northern Territory. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function AliceSpringsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Alice Springs</h1>
      <p className="text-xl">24/7 Emergency Services in Alice Springs, Northern Territory</p>
    </div>
  );
}