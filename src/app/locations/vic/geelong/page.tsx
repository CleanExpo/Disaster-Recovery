import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Geelong | Emergency Services Victoria',
  description: '24/7 disaster recovery in Geelong, Victoria. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function GeelongPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Geelong</h1>
      <p className="text-xl">24/7 Emergency Services in Geelong, Victoria</p>
    </div>
  );
}