import { Metadata } from 'next';
import { Award, CheckCircle, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Asbestos Removal Licensed | Class A & B asbestos | Disaster Recovery Australia',
  description: 'Asbestos Removal Licensed restoration services. Class A & B asbestos. Qualified, certified, and compliant disaster recovery.',
};

export default function AsbestosRemovalLicensedPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Asbestos Removal Licensed</h1>
          <p className="text-xl">Class A & B asbestos</p>
        </div>
      </section>
    </div>
  );
}