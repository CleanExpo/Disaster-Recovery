import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Weston Creek | Emergency Services Australian Capital Territory',
  description: '24/7 disaster recovery in Weston Creek, Australian Capital Territory. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function WestonCreekPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Weston Creek</h1>
      <p className="text-xl">24/7 Emergency Services in Weston Creek, Australian Capital Territory</p>
    </div>
  );
}