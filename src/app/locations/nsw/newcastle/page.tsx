import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Newcastle | Emergency Services New South Wales',
  description: '24/7 disaster recovery in Newcastle, New South Wales. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function NewcastlePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Newcastle</h1>
      <p className="text-xl">24/7 Emergency Services in Newcastle, New South Wales</p>
    </div>
  );
}