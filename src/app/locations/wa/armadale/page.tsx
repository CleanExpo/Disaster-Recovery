import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Armadale | Emergency Services Western Australia',
  description: '24/7 disaster recovery in Armadale, Western Australia. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function ArmadalePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Armadale</h1>
      <p className="text-xl">24/7 Emergency Services in Armadale, Western Australia</p>
    </div>
  );
}