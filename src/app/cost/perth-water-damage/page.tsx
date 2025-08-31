import { Metadata } from 'next';
import { DollarSign, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Perth water damage Cost | Pricing Guide 2024 | Free Quotes',
  description: 'How much does water damage cost in Perth? Average prices, insurance coverage, payment plans. Get free quote now.' };

export default function PerthwaterdamageCostPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-green-800 to-teal-800 text-white py-20">
        <div className="container mx-auto px-4">
          <DollarSign className="h-16 w-16 text-green-300 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Perth Water damage Cost</h1>
          <p className="text-xl mb-8">Transparent Pricing • Insurance Coverage • Free Quotes</p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <Calculator className="mr-2" /> Get Free Quote
          </Button>
        </div>
      </section>
    </div>
  );
}