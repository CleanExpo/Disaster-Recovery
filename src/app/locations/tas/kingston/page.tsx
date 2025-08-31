import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Kingston | Emergency Services Tasmania',
  description: '24/7 disaster recovery in Kingston, Tasmania. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.' };

export default function KingstonPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Kingston</h1>
      <p className="text-xl">24/7 Emergency Services in Kingston, Tasmania</p>
    </div>
  );
}