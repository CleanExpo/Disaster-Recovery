import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Port Lincoln | Emergency Services South Australia',
  description: '24/7 disaster recovery in Port Lincoln, South Australia. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function PortLincolnPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Port Lincoln</h1>
      <p className="text-xl">24/7 Emergency Services in Port Lincoln, South Australia</p>
    </div>
  );
}