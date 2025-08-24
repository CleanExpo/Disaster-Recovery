import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Blacktown | Emergency Services New South Wales',
  description: '24/7 disaster recovery in Blacktown, New South Wales. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function BlacktownPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Blacktown</h1>
      <p className="text-xl">24/7 Emergency Services in Blacktown, New South Wales</p>
    </div>
  );
}