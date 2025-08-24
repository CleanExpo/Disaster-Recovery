import { Metadata } from 'next';
import { Award, CheckCircle, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'WorkSafe Certified | Safety compliance | Disaster Recovery Australia',
  description: 'WorkSafe Certified restoration services. Safety compliance. Qualified, certified, and compliant disaster recovery.',
};

export default function WorkSafeCertifiedPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">WorkSafe Certified</h1>
          <p className="text-xl">Safety compliance</p>
        </div>
      </section>
    </div>
  );
}