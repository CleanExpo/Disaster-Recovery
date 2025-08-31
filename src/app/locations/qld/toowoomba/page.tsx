import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Toowoomba | Emergency Services Queensland',
  description: '24/7 disaster recovery in Toowoomba, Queensland. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function ToowoombaPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Toowoomba</h1>
      <p className="text-xl">24/7 Emergency Services in Toowoomba, Queensland</p>
    </div>
  );
}