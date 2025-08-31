import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery Nhulunbuy | Emergency Services Northern Territory',
  description: '24/7 disaster recovery in Nhulunbuy, Northern Territory. Water damage, fire restoration, mould removal. Call Online Form Available 24/7.',
};

export default function NhulunbuyPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery Nhulunbuy</h1>
      <p className="text-xl">24/7 Emergency Services in Nhulunbuy, Northern Territory</p>
    </div>
  );
}