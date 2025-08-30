import { Metadata } from 'next';
import { Award, CheckCircle, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IICRC Certified | International restoration standard | Disaster Recovery',
  description: 'IICRC Certified restoration services. International restoration standard. Qualified, certified, and compliant disaster recovery.',
};

export default function IICRCCertifiedPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">IICRC Certified</h1>
          <p className="text-xl">International restoration standard</p>
        </div>
      </section>
    </div>
  );
}