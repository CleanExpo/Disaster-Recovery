import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Woden Valley | Emergency Services Australian Capital Territory',
  description: '24/7 disaster recovery in Woden Valley, Australian Capital Territory. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function WodenValleyPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Woden Valley</h1>
      <p className="text-xl">24/7 Emergency Services in Woden Valley, Australian Capital Territory</p>
    </div>
  );
}