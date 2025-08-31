import { Metadata } from 'next';
import { Clock, AlertTriangle, MessageSquare} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Public Holiday Emergency Services | All Australian Holidays | 24/7 Disaster Recovery',
  description: 'Emergency disaster recovery services available All Australian Holidays. No call-out fees, immediate response nationwide.' };

export default function PublicHolidayEmergencyPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-red-900 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Clock className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Public Holiday Emergency Services</h1>
          <p className="text-xl mb-2">Available All Australian Holidays</p>
          <p className="text-2xl mb-8">No Extra Charges • Same Day Response</p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
            <MessageSquare className="mr-2" /> Call Online Form Available 24/7 Now
          </Button>
        </div>
      </section>
    </div>
  );
}