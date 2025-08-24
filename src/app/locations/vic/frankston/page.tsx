import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Frankston | Emergency Services Victoria',
  description: '24/7 disaster recovery in Frankston, Victoria. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function FrankstonPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Frankston</h1>
      <p className="text-xl">24/7 Emergency Services in Frankston, Victoria</p>
    </div>
  );
}