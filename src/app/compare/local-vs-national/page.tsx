import { Metadata } from 'next';
import { Scale, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Local vs National Companies | Comparison Guide | Make the Right Choice',
  description: 'Compare local vs national companies. Pros, cons, costs, and expert recommendations to help you decide.',
};

export default function LocalvsNationalCompaniesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-900 to-pink-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <Scale className="h-16 w-16 text-purple-300 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Local vs National Companies</h1>
          <p className="text-xl">Make an Informed Decision</p>
        </div>
      </section>
    </div>
  );
}