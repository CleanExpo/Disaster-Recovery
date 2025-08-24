import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Devonport | Emergency Services Tasmania',
  description: '24/7 disaster recovery in Devonport, Tasmania. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function DevonportPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Devonport</h1>
      <p className="text-xl">24/7 Emergency Services in Devonport, Tasmania</p>
    </div>
  );
}