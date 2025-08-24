import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Tuggeranong | Emergency Services Australian Capital Territory',
  description: '24/7 disaster recovery in Tuggeranong, Australian Capital Territory. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function TuggeranongPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Tuggeranong</h1>
      <p className="text-xl">24/7 Emergency Services in Tuggeranong, Australian Capital Territory</p>
    </div>
  );
}