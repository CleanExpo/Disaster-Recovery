import { Metadata } from 'next';
import { Clock, Phone, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'New Year Emergency Services | December 31 - January 2 | 24/7 Disaster Recovery',
  description: 'Emergency disaster recovery services available December 31 - January 2. No call-out fees, immediate response across Australia.',
};

export default function NewYearEmergencyPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-red-900 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <Clock className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">New Year Emergency Services</h1>
          <p className="text-xl mb-2">Available December 31 - January 2</p>
          <p className="text-2xl mb-8">No Extra Charges • Same Day Response</p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
            <Phone className="mr-2" /> Call 1300 DISASTER Now
          </Button>
        </div>
      </section>
    </div>
  );
}