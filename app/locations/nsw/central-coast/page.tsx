import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Central Coast | Emergency Services New South Wales',
  description: '24/7 disaster recovery in Central Coast, New South Wales. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function CentralCoastPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Central Coast</h1>
      <p className="text-xl">24/7 Emergency Services in Central Coast, New South Wales</p>
    </div>
  );
}