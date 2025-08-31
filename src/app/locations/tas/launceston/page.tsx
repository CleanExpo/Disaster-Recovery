import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Launceston | Emergency Services Tasmania',
  description: '24/7 disaster recovery in Launceston, Tasmania. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function LauncestonPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Launceston</h1>
      <p className="text-xl">24/7 Emergency Services in Launceston, Tasmania</p>
    </div>
  );
}