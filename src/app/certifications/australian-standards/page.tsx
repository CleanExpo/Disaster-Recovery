import { Metadata } from 'next';
import { Award, CheckCircle, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Australian Standards Compliant | AS/NZS compliance | Disaster Recovery',
  description: 'Australian Standards Compliant restoration services. AS/NZS compliance. Qualified, certified, and compliant disaster recovery.' };

export default function AustralianStandardsCompliantPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Australian Standards Compliant</h1>
          <p className="text-xl">AS/NZS compliance</p>
        </div>
      </section>
    </div>
  );
}